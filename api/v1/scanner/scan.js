export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'URL is required' });

  // Normalize URL
  let targetUrl = url.trim();
  if (!targetUrl.startsWith('http')) targetUrl = 'https://' + targetUrl;

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NTWebUX-Scanner/1.0; +https://ntwebux.com/bill96)',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'fr-CA,fr;q=0.9,en;q=0.8',
      },
      redirect: 'follow',
      signal: AbortSignal.timeout(10000),
    });

    const html = await response.text();
    const lower = html.toLowerCase();

    // --- 1. HTML lang attribute ---
    const langMatch = html.match(/<html[^>]*lang=["']([^"']+)["']/i);
    const htmlLang = langMatch ? langMatch[1].toLowerCase() : null;
    const html_lang_missing_or_incorrect = (!htmlLang || !htmlLang.startsWith('fr'))
      ? { current_lang: htmlLang || 'missing', required: 'fr' }
      : undefined;

    // --- 2. hreflang alternate fr ---
    const hreflangMatches = [...html.matchAll(/hreflang=["']([^"']+)["']/gi)].map(m => m[1]);
    const hasFrHreflang = hreflangMatches.some(h => h.startsWith('fr'));
    const hreflang_alternate_fr_missing = !hasFrHreflang
      ? { found_hreflangs: hreflangMatches }
      : undefined;

    // --- 3. Meta description ---
    const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']description["']/i);
    const metaDescription = metaDescMatch ? metaDescMatch[1] : null;
    const meta_description_missing = !metaDescription ? true : undefined;

    // --- 4. Meta description not French ---
    const frenchWords = ['le','la','les','de','du','des','un','une','et','est','en','que','qui','pour','sur','avec','plus','tout','par','au','aux','nous','vous','ils','elle','son','ses','notre','votre','leur','leurs','cette','ces','mon','ma','mes','ton','ta','tes','avoir','être','faire','dire','aller','voir','savoir','vouloir','venir','prendre','donner','parler','aimer','trouver','penser','aussi','très','bien','comme','mais','ou','si','car','donc','or','ni','ne','pas','plus','jamais','rien','personne','site','web','service','entreprise','client','page','information','contact','produit','prix','offre','solution','qualité','résultat','équipe','projet'];
    let frenchWordCount = 0;
    if (metaDescription) {
      const words = metaDescription.toLowerCase().split(/\s+/);
      frenchWordCount = words.filter(w => frenchWords.includes(w)).length;
    }
    const meta_description_not_french = (metaDescription && frenchWordCount < 2)
      ? { text: metaDescription }
      : undefined;

    // --- 5. French text density ---
    const bodyText = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').toLowerCase();
    const allWords = bodyText.split(/\s+/).filter(w => w.length > 2);
    const frenchWordMatches = allWords.filter(w => frenchWords.includes(w)).length;
    const density = allWords.length > 0 ? frenchWordMatches / allWords.length : 0;
    const french_text_density_insufficient = density < 0.08
      ? { measured_density: Math.round(density * 100) / 100, threshold: 0.08 }
      : undefined;

    // --- 6. Extract contact info ---
    const emailMatch = html.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const phoneMatch = html.match(/(\+?1?\s?)?(\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4})/);

    // --- 7. Business name heuristic ---
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const businessName = titleMatch ? titleMatch[1].split(/[|\-–]/)[0].trim() : new URL(targetUrl).hostname;

    // --- 8. Compliance score ---
    const failures = [
      html_lang_missing_or_incorrect,
      hreflang_alternate_fr_missing,
      meta_description_missing,
      meta_description_not_french,
      french_text_density_insufficient,
    ].filter(Boolean).length;
    const complianceScore = Math.round(((5 - failures) / 5) * 100);

    return res.status(200).json({
      url: targetUrl,
      businessName,
      complianceScore,
      structuralFailures: {
        ...(html_lang_missing_or_incorrect && { html_lang_missing_or_incorrect }),
        ...(hreflang_alternate_fr_missing && { hreflang_alternate_fr_missing }),
        ...(meta_description_missing && { meta_description_missing }),
        ...(meta_description_not_french && { meta_description_not_french }),
        ...(french_text_density_insufficient && { french_text_density_insufficient }),
      },
      contactEmail: emailMatch ? emailMatch[0] : null,
      contactPhone: phoneMatch ? phoneMatch[0] : null,
      metaDescription,
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message.includes('timeout')
        ? 'The target website took too long to respond.'
        : `Could not reach ${targetUrl}. The site may be blocking external requests.`,
    });
  }
}
