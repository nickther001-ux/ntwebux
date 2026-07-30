import { db, contactsTable } from "@workspace/db";

// Custom type for scan results
interface ScanResult {
  url: string;
  businessName: string;
  status: string;
  score: number;
  email: string;
  phone: string;
  failures: string;
  metaDescription: string;
  failuresJson: any;
}

const FR_STOPWORDS = new Set(["le", "la", "les", "de", "des", "en", "un", "une", "et", "est", "que", "qui", "dans", "pour", "sur", "avec", "nous", "vous", "ils", "elles", "se", "y", "ce", "par", "mais", "ou", "où", "donc", "or", "ni", "car"]);
const EN_STOPWORDS = new Set(["the", "be", "to", "of", "and", "a", "in", "that", "have", "it", "for", "not", "on", "with", "he", "as", "you", "do", "at", "this", "but", "his", "by", "from", "they", "we", "say", "her", "she", "or", "an", "will", "my", "one", "all", "would", "there", "their", "what"]);

const DEFAULT_DOMAINS = [
  "ntwebux.com",
  "audreyrh.com",
  "mcgill.ca",
  "concordia.ca",
  "lapresse.ca"
];

function cleanBusinessName(title: string) {
  if (!title) return "Unknown Business";
  const parts = title.split(/\s*[-|•–—]\s*/);
  const name = parts[0].trim();
  return name.length > 1 ? name : title.trim();
}

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

async function auditDomain(url: string): Promise<ScanResult> {
  const targetUrl = url.startsWith("http") ? url : `https://${url}`;
  
  try {
    const res = await fetch(targetUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
      signal: AbortSignal.timeout(12000)
    });
    
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    
    const html = await res.text();
    
    // 1. Business Name (Regex)
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const titleText = titleMatch ? titleMatch[1].trim() : "";
    const businessName = cleanBusinessName(titleText);
    
    // 2. HTML Lang Check (Regex)
    const langMatch = html.match(/<html[^>]*lang=["']([^"']+)["']/i);
    const htmlLang = langMatch ? langMatch[1].toLowerCase() : "";
    const hasHtmlLangFr = ["fr", "fr-ca", "fr-fr"].some(val => htmlLang.includes(val));
    const htmlLangScore = hasHtmlLangFr ? 40.0 : 0.0;
    
    // 3. Alternate Hreflang (Regex)
    const hreflangMatches = [...html.matchAll(/<link[^>]*rel=["']alternate["'][^>]*hreflang=["']([^"']+)["']/gi)];
    const hreflangs = hreflangMatches.map(m => m[1].toLowerCase());
    const hasHreflangFr = hreflangs.some(hl => ["fr", "fr-ca", "fr-fr"].some(val => hl.includes(val)));
    const hreflangScore = hasHreflangFr ? 30.0 : 0.0;
    
    // 4. Meta Description translation (Regex)
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i) ||
                      html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i);
    const metaDesc = descMatch ? descMatch[1].trim() : "";
    
    let metaDescScore = 0.0;
    let metaDescIsFr = false;
    if (metaDesc) {
      const check = analyzeTextLanguage(metaDesc);
      metaDescIsFr = check.isFrench;
      metaDescScore = metaDescIsFr ? 15.0 : 5.0;
    }
    
    // 5. Content density (Regex strip scripts, styles, HTML tags)
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    const bodyHtml = bodyMatch ? bodyMatch[1] : html;
    const bodyText = bodyHtml.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, "")
                             .replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, "")
                             .replace(/<[^>]+>/g, " ")
                             .replace(/\s+/g, " ")
                             .trim();
                             
    const checkDensity = analyzeTextLanguage(bodyText);
    const density = checkDensity.density;
    let densityScore = 15.0 * Math.min(density / 0.25, 1.0);
    densityScore = Math.round(densityScore * 100) / 100;
    
    const complianceScore = Math.min(htmlLangScore + hreflangScore + metaDescScore + densityScore, 100.0);
    
    // Scrape Contacts (Emails & Phones)
    const emails = bodyText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
    const contactEmail = emails[0] || "Not Found";
    
    const phones = bodyText.match(/\+?1?\s*\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g) || [];
    const contactPhone = phones[0] || "Not Found";
    
    const failures: string[] = [];
    const failuresJson: any = {};
    if (!hasHtmlLangFr) {
      failures.push("HTML lang!=fr");
      failuresJson.html_lang_missing_or_incorrect = { current_lang: htmlLang, required: "fr" };
    }
    if (!hasHreflangFr) {
      failures.push("Missing French Hreflang");
      failuresJson.hreflang_alternate_fr_missing = { found_hreflangs: Array.from(new Set(hreflangs)) };
    }
    if (!metaDesc) {
      failures.push("Missing Meta Desc");
      failuresJson.meta_description_missing = true;
    } else if (!metaDescIsFr) {
      failures.push("Meta Desc not French");
      failuresJson.meta_description_not_french = { text: metaDesc.slice(0, 80) };
    }
    if (density < 0.20) {
      failures.push("Low French text density");
      failuresJson.french_text_density_insufficient = { measured_density: density, threshold: 0.20 };
    }
    
    return {
      url,
      businessName,
      status: "Success",
      score: complianceScore,
      email: contactEmail,
      phone: contactPhone,
      failures: failures.join(", ") || "Fully Compliant",
      metaDescription: metaDesc,
      failuresJson
    };
  } catch (err: any) {
    return {
      url,
      businessName: "Unknown",
      status: `Error: ${err.message || err}`,
      score: 0.0,
      email: "N/A",
      phone: "N/A",
      failures: "Scan Failed",
      metaDescription: "",
      failuresJson: { error: err.message || err }
    };
  }
}

async function saveLeadsToDatabase(results: ScanResult[]) {
  if (!process.env.DATABASE_URL) {
    console.log("⚠️ DATABASE_URL environment variable is missing. Skipping database save.");
    return;
  }
  
  console.log("🔌 Connecting to Supabase via Drizzle DDL to commit leads...");
  try {
    let count = 0;
    for (const r of results) {
      if (r.status === "Success") {
        let domain = "scanned-site.com";
        try {
          domain = new URL(r.url.startsWith("http") ? r.url : `https://${r.url}`).hostname.replace("www.", "");
        } catch {}
        
        const fallbackEmail = `info@${domain}`;
        const email = r.email === "Not Found" ? fallbackEmail : r.email;
        const phone = r.phone === "Not Found" ? null : r.phone;
        
        // Drizzle Upsert using Drizzle insert
        await db.insert(contactsTable).values({
          firstName: r.businessName,
          lastName: "Compliance Lead",
          email,
          phone,
          service: "Bill 96 Compliance Audit (Batch Scrape)",
          message: JSON.stringify({
            score: r.score,
            failures: r.failuresJson,
            metaDescription: r.metaDescription
          })
        });
        count++;
      }
    }
    console.log(`💾 Successfully saved ${count} compliance leads to the Supabase database!`);
  } catch (e) {
    console.error("❌ Failed to commit leads to database via Drizzle:", e);
  }
}

async function main() {
  console.log("🚀 Starting NT WebUX Async Batch Prospect Scraper (TypeScript)...");
  
  // Use testing list of target domains
  const domains = DEFAULT_DOMAINS;
  console.log(`📊 Loaded ${domains.length} targets to scan.`);
  
  const tasks = domains.map(domain => auditDomain(domain));
  const results = await Promise.all(tasks);
  
  // Sort results by score (lowest score first)
  results.sort((a, b) => a.score - b.score);
  
  // Save to Database
  await saveLeadsToDatabase(results);
  
  console.log("\n================ OUTBOUND TARGET LEADS ================");
  console.log(`${"Domain".padEnd(22)} | ${"Score".padEnd(6)} | ${"Email".padEnd(24)} | Failures`);
  console.log("-".repeat(75));
  for (const r of results) {
    if (r.status === "Success") {
      console.log(`${r.url.padEnd(22)} | ${r.score.toString().padEnd(5)}% | ${r.email.padEnd(24)} | ${r.failures.slice(0, 20)}`);
    }
  }
  console.log("=======================================================\n");
  
  process.exit(0);
}

main().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
