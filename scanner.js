import cheerio from 'cheerio';
import { db } from './database.js';

const FR_STOPWORDS = new Set(["le", "la", "les", "de", "des", "en", "un", "une", "et", "est", "que", "qui", "dans", "pour", "sur", "avec", "nous", "vous", "ils", "elles", "se", "y", "ce", "par", "mais", "ou", "où", "donc", "or", "ni", "car"]);
const EN_STOPWORDS = new Set(["the", "be", "to", "of", "and", "a", "in", "that", "have", "it", "for", "not", "on", "with", "he", "as", "you", "do", "at", "this", "but", "his", "by", "from", "they", "we", "say", "her", "she", "or", "an", "will", "my", "one", "all", "would", "there", "their", "what"]);

export function cleanBusinessName(title) {
  if (!title) return "Unknown Business";
  const parts = title.split(/\s*[-|•–—]\s*/);
  const name = parts[0].trim();
  return name.length > 1 ? name : title.trim();
}

export function analyzeTextLanguage(text) {
  if (!text) return { density: 0.0, isFrench: false };
  const words = text.toLowerCase().match(/\b[a-z]{2,}\b/g) || [];
  if (words.length === 0) return { density: 0.0, isFrench: false };

  let frCount = 0;
  let enCount = 0;
  for (const w of words) {
    if (FR_STOPWORDS.has(w)) frCount++;
    if (EN_STOPWORDS.has(w)) enCount++;
  }
  const total = frCount + enCount;
  if (total === 0) return { density: 0.0, isFrench: false };
  const density = frCount / total;
  return { density: Math.round(density * 1000) / 1000, isFrench: density >= 0.25 };
}

export async function scanWebsite(url) {
  let targetUrl = url;
  if (!/^https?:\/\//i.test(url)) targetUrl = 'https://' + url;

  const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
  };

  let htmlContent = '';
  try {
    const res = await fetch(targetUrl, { headers, signal: AbortSignal.timeout(12000) });
    if (!res.ok) throw new Error(`HTTP Status ${res.status}`);
    htmlContent = await res.text();
  } catch (e) {
    const result = {
      url: targetUrl,
      business_name: "Connection Error",
      compliance_score: 0.0,
      structural_failures: { connection_failed: true, reason: e.message },
      contact_email: null,
      contact_phone: null,
      meta_description: null
    };
    await db.createScannerLead(result);
    return result;
  }

  const $ = cheerio.load(htmlContent);
  const titleText = $('title').first().text().trim() || "";
  const businessName = cleanBusinessName(titleText);
  const metaDesc = $('meta[name="description"]').first().attr('content')?.trim() || 
                   $('meta[property="og:description"]').first().attr('content')?.trim() || "";

  const bodyText = $('body').text() || "";
  const emails = bodyText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
  const contactEmail = emails[0] || null;

  const phones = bodyText.match(/\+?1?\s*\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g) || [];
  const contactPhone = phones[0] || null;

  const htmlLang = $('html').first().attr('lang')?.toLowerCase() || "";
  const hasHtmlLangFr = ['fr', 'fr-ca', 'fr-fr'].some(val => htmlLang.includes(val));
  const htmlLangScore = hasHtmlLangFr ? 40.0 : 0.0;

  const hreflangs = [];
  $('link[rel="alternate"]').each((_, elem) => {
    const hl = $(elem).attr('hreflang')?.toLowerCase();
    if (hl) hreflangs.push(hl);
  });
  const hasHreflangFr = hreflangs.some(hl => ['fr', 'fr-ca', 'fr-fr'].some(val => hl.includes(val)));
  const hreflangScore = hasHreflangFr ? 30.0 : 0.0;

  let metaDescScore = 0.0;
  let metaDescIsFr = false;
  if (metaDesc) {
    const langCheck = analyzeTextLanguage(metaDesc);
    metaDescIsFr = langCheck.isFrench;
    metaDescScore = metaDescIsFr ? 15.0 : 5.0;
  }

  const langCheck = analyzeTextLanguage(bodyText);
  const density = langCheck.density;
  let densityScore = 15.0 * Math.min(density / 0.25, 1.0);
  densityScore = Math.round(densityScore * 100) / 100;

  const complianceScore = Math.min(htmlLangScore + hreflangScore + metaDescScore + densityScore, 100.0);

  const failures = {};
  if (!hasHtmlLangFr) failures.html_lang_missing_or_incorrect = { current_lang: htmlLang || "none", required: "fr" };
  if (!hasHreflangFr) failures.hreflang_alternate_fr_missing = { found_hreflangs: Array.from(new Set(hreflangs)) };
  if (!metaDesc) failures.meta_description_missing = true;
  else if (!metaDescIsFr) failures.meta_description_not_french = { text: metaDesc.slice(0, 80) };
  if (density < 0.20) failures.french_text_density_insufficient = { measured_density: density, threshold: 0.20 };

  const auditResult = {
    url: targetUrl,
    businessName,
    complianceScore,
    structuralFailures: failures,
    contactEmail,
    contactPhone,
    metaDescription: metaDesc || null
  };

  await db.createScannerLead({
    url: targetUrl,
    businessName,
    complianceScore,
    structuralFailures: failures,
    contactEmail,
    contactPhone,
    metaDescription: metaDesc || null
  });

  return auditResult;
}

if (process.argv[1] && process.argv[1].includes('scanner.js')) {
  const url = process.argv[2];
  if (url) {
    scanWebsite(url).then(r => console.log(JSON.stringify(r, null, 2)));
  }
}
