import { Router, type IRouter } from "express";

const router: IRouter = Router();

const FR_STOPWORDS = new Set(["le", "la", "les", "de", "des", "en", "un", "une", "et", "est", "que", "qui", "dans", "pour", "sur", "avec", "nous", "vous", "ils", "elles", "se", "y", "ce", "par", "mais", "ou", "où", "donc", "or", "ni", "car"]);
const EN_STOPWORDS = new Set(["the", "be", "to", "of", "and", "a", "in", "that", "have", "it", "for", "not", "on", "with", "he", "as", "you", "do", "at", "this", "but", "his", "by", "from", "they", "we", "say", "her", "she", "or", "an", "will", "my", "one", "all", "would", "there", "their", "what"]);

// Heuristic language analyzer
function analyzeTextLanguage(text: string) {
  if (!text) return { density: 0, isFrench: false };
  const words = text.toLowerCase().match(/\b[a-z]{2,}\b/g) || [];
  if (words.length === 0) return { density: 0, isFrench: false };

  let frCount = 0;
  let enCount = 0;
  for (const w of words) {
    if (FR_STOPWORDS.has(w)) frCount++;
    if (EN_STOPWORDS.has(w)) enCount++;
  }
  const total = frCount + enCount;
  if (total === 0) return { density: 0, isFrench: false };
  const density = frCount / total;
  return {
    density: Math.round(density * 100) / 100,
    isFrench: density >= 0.25
  };
}

function cleanBusinessName(title: string) {
  if (!title) return "Unknown Business";
  const parts = title.split(/\s*[-|•–—]\s*/);
  const name = parts[0].trim();
  return name.length > 1 ? name : title.trim();
}

// Lazy loaded database references
let db: any = null;
let contactsTable: any = null;

async function getDb() {
  if (!process.env.DATABASE_URL) return null;
  if (db) return db;
  try {
    const mod = await import("@workspace/db");
    db = mod.db;
    contactsTable = mod.contactsTable;
    return db;
  } catch (e) {
    console.error("Drizzle load error in Compliance Scanner:", e);
    return null;
  }
}

// Scraper logic built with regex to avoid external package overhead
async function runAudit(url: string) {
  let targetUrl = url;
  if (!/^https?:\/\//i.test(url)) {
    targetUrl = "https://" + url;
  }

  const res = await fetch(targetUrl, {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
    signal: AbortSignal.timeout(12000)
  });
  if (!res.ok) throw new Error(`HTTP fetch failed with status ${res.status}`);
  const html = await res.text();

  // 1. Scrape Title for business name
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : "";
  const businessName = cleanBusinessName(title);

  // 2. Audit <html lang="...">
  const langMatch = html.match(/<html[^>]*lang=["']([^"']+)["']/i);
  const htmlLang = langMatch ? langMatch[1].toLowerCase() : "";
  const hasHtmlLangFr = ["fr", "fr-ca", "fr-fr"].some(val => htmlLang.includes(val));
  const htmlLangScore = hasHtmlLangFr ? 40.0 : 0.0;

  // 3. Audit alternate hreflang tags
  const hreflangMatches = [...html.matchAll(/<link[^>]*rel=["']alternate["'][^>]*hreflang=["']([^"']+)["']/gi)];
  const hreflangs = hreflangMatches.map(m => m[1].toLowerCase());
  const hasHreflangFr = hreflangs.some(hl => ["fr", "fr-ca", "fr-fr"].some(val => hl.includes(val)));
  const hreflangScore = hasHreflangFr ? 30.0 : 0.0;

  // 4. Audit Meta Description
  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i) ||
                    html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i);
  const metaDesc = descMatch ? descMatch[1].trim() : "";

  let metaDescScore = 0.0;
  let metaDescIsFr = false;
  if (metaDesc) {
    const langCheck = analyzeTextLanguage(metaDesc);
    metaDescIsFr = langCheck.isFrench;
    metaDescScore = metaDescIsFr ? 15.0 : 5.0;
  }

  // 5. Audit content density
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const bodyHtml = bodyMatch ? bodyMatch[1] : html;
  const bodyText = bodyHtml.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, "")
                           .replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, "")
                           .replace(/<[^>]+>/g, " ")
                           .replace(/\s+/g, " ")
                           .trim();
  const bodyLang = analyzeTextLanguage(bodyText);
  const density = bodyLang.density;
  let densityScore = 15.0 * Math.min(density / 0.25, 1.0);
  densityScore = Math.round(densityScore * 100) / 100;

  const complianceScore = Math.min(htmlLangScore + hreflangScore + metaDescScore + densityScore, 100.0);

  // Failure payload
  const failures: Record<string, any> = {};
  if (!hasHtmlLangFr) {
    failures.html_lang_missing_or_incorrect = { current_lang: htmlLang || "none", required: "fr" };
  }
  if (!hasHreflangFr) {
    failures.hreflang_alternate_fr_missing = { found_hreflangs: Array.from(new Set(hreflangs)) };
  }
  if (!metaDesc) {
    failures.meta_description_missing = true;
  } else if (!metaDescIsFr) {
    failures.meta_description_not_french = { text: metaDesc.slice(0, 80) };
  }
  if (density < 0.20) {
    failures.french_text_density_insufficient = { measured_density: density, threshold: 0.20 };
  }

  // Contact info
  const emails = bodyText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
  const contactEmail = emails[0] || null;

  const phones = bodyText.match(/\+?1?\s*\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g) || [];
  const contactPhone = phones[0] || null;

  return {
    url: targetUrl,
    businessName,
    complianceScore,
    structuralFailures: failures,
    contactEmail,
    contactPhone,
    metaDescription: metaDesc || null
  };
}

// POST endpoint to trigger compliance scan
router.post("/v1/scanner/scan", async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const result = await runAudit(url);

    // Save lead profile directly to existing contacts table
    const database = await getDb();
    if (database && contactsTable) {
      let emailDomain = "scanned-site.com";
      try {
        emailDomain = new URL(result.url).hostname.replace("www.", "");
      } catch {}
      const fallbackEmail = `info@${emailDomain}`;

      await database.insert(contactsTable).values({
        firstName: result.businessName,
        lastName: "Compliance Lead",
        email: result.contactEmail || fallbackEmail,
        phone: result.contactPhone || null,
        service: "Bill 96 Compliance Audit",
        message: JSON.stringify({
          score: result.complianceScore,
          failures: result.structuralFailures,
          metaDescription: result.metaDescription
        })
      });
    }

    res.status(200).json(result);
  } catch (err: any) {
    console.error("[complianceScanner] Audit request failed:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
