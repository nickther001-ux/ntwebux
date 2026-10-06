export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const d = req.body || {};
  const { name, email, lang, scanResult } = d;
  const isFr = lang === 'fr';
  const key = process.env.RESEND_API_KEY;

  if (!key) return res.status(500).json({ error: 'Missing RESEND_API_KEY' });
  if (!email || !scanResult) return res.status(400).json({ error: 'Missing email or scanResult' });

  const firstName = (name || '').split(' ')[0] || (isFr ? 'Bonjour' : 'Hello');
  const score = scanResult.complianceScore;
  const scoreColor = score >= 80 ? '#10B981' : score >= 50 ? '#F59E0B' : '#EF4444';
  const riskLabel = score >= 80
    ? (isFr ? 'Faible risque' : 'Low Risk')
    : score >= 50
    ? (isFr ? 'Risque modéré' : 'Moderate Risk')
    : (isFr ? 'Alerte critique' : 'Critical Alert');

  const f = scanResult.structuralFailures || {};

  // --- FIX INSTRUCTIONS per failure ---
  const fixes = [];

  if (f.html_lang_missing_or_incorrect) {
    fixes.push({
      title: isFr ? '1. Déclarer la langue racine en français' : '1. Declare French as root language',
      why: isFr
        ? `Actuellement : <code>lang="${f.html_lang_missing_or_incorrect.current_lang}"</code>. L'OQLF considère que la langue déclarée dans la balise HTML signale la langue de priorité du site.`
        : `Currently: <code>lang="${f.html_lang_missing_or_incorrect.current_lang}"</code>. OQLF treats the HTML lang attribute as the signal of the site's priority language.`,
      how: isFr
        ? `Dans votre fichier HTML principal, modifiez : <code>&lt;html lang="fr-CA"&gt;</code>`
        : `In your main HTML file, change the opening tag to: <code>&lt;html lang="fr-CA"&gt;</code>`,
      time: isFr ? '2 minutes' : '2 minutes'
    });
  }

  if (f.hreflang_alternate_fr_missing) {
    fixes.push({
      title: isFr ? '2. Ajouter les balises bilingues hreflang' : '2. Add bilingual hreflang tags',
      why: isFr
        ? 'Sans balises hreflang, Google et les auditeurs ne peuvent pas distinguer vos versions FR et EN.'
        : 'Without hreflang tags, Google and auditors cannot distinguish your FR and EN versions.',
      how: isFr
        ? `Dans la section <code>&lt;head&gt;</code> de chaque page, ajoutez :<br><br><code>&lt;link rel="alternate" hreflang="fr-CA" href="https://votresite.com/fr/" /&gt;<br>&lt;link rel="alternate" hreflang="en-CA" href="https://votresite.com/en/" /&gt;<br>&lt;link rel="alternate" hreflang="x-default" href="https://votresite.com/fr/" /&gt;</code>`
        : `In the <code>&lt;head&gt;</code> of every page, add:<br><br><code>&lt;link rel="alternate" hreflang="fr-CA" href="https://yoursite.com/fr/" /&gt;<br>&lt;link rel="alternate" hreflang="en-CA" href="https://yoursite.com/en/" /&gt;<br>&lt;link rel="alternate" hreflang="x-default" href="https://yoursite.com/fr/" /&gt;</code>`,
      time: isFr ? '15 minutes' : '15 minutes'
    });
  }

  if (f.meta_description_missing) {
    fixes.push({
      title: isFr ? '3. Ajouter une méta-description en français' : '3. Add a French meta description',
      why: isFr
        ? "Aucune méta-description n'a été détectée. Elle est affichée dans les résultats Google et jugée par l'OQLF."
        : 'No meta description was detected. It appears in Google results and is reviewed by OQLF.',
      how: isFr
        ? `Dans la section <code>&lt;head&gt;</code> :<br><br><code>&lt;meta name="description" content="[Décrivez votre entreprise en français, 150-160 caractères]" /&gt;</code>`
        : `In the <code>&lt;head&gt;</code>:<br><br><code>&lt;meta name="description" content="[Describe your business in French, 150-160 chars]" /&gt;</code>`,
      time: isFr ? '5 minutes' : '5 minutes'
    });
  } else if (f.meta_description_not_french) {
    fixes.push({
      title: isFr ? '3. Traduire la méta-description en français' : '3. Translate meta description to French',
      why: isFr
        ? `Votre méta-description actuelle semble ne pas être en français : <em>"${f.meta_description_not_french.text}"</em>`
        : `Your current meta description does not appear to be in French: <em>"${f.meta_description_not_french.text}"</em>`,
      how: isFr
        ? "Remplacez le contenu par une description française de 150-160 caractères qui résume votre offre."
        : 'Replace it with a 150–160 character French description of your offering.',
      time: isFr ? '5 minutes' : '5 minutes'
    });
  }

  if (f.french_text_density_insufficient) {
    const pct = Math.round(f.french_text_density_insufficient.measured_density * 100);
    fixes.push({
      title: isFr ? '4. Augmenter la densité du contenu français' : '4. Increase French content density',
      why: isFr
        ? `Densité française mesurée : ${pct}%. L'OQLF exige que le français soit au moins aussi présent que les autres langues sur une page.`
        : `Measured French density: ${pct}%. OQLF requires French to be at least as prominent as other languages on a page.`,
      how: isFr
        ? "Assurez-vous que la page d'accueil chargée par défaut soit la version française (pas un sélecteur EN/FR), que tous les menus, titres, boutons et textes marketing soient en français, et que la version anglaise soit accessible via un lien secondaire."
        : 'Ensure the default homepage loads the French version (not a FR/EN selector), that menus, headings, buttons and marketing copy are in French, and that the English version lives behind a secondary link.',
      time: isFr ? '1 à 3 heures selon la taille du site' : '1 to 3 hours depending on site size'
    });
  }

  const fixesHtml = fixes.length === 0
    ? `<div style="background:#D1FAE5;border-left:4px solid #10B981;padding:16px;border-radius:6px;">
         <p style="margin:0;font-size:14px;color:#065F46;">
           ${isFr ? '✓ Félicitations — aucun correctif majeur requis. Votre site satisfait les 4 vérifications principales.' : '✓ Congratulations — no major fixes required. Your site passes all 4 primary checks.'}
         </p>
       </div>`
    : fixes.map(fix => `
        <div style="background:#FAFBFC;border:1px solid #E5E7EB;border-radius:10px;padding:20px;margin-bottom:14px;">
          <h4 style="margin:0 0 10px 0;font-size:15px;font-weight:700;color:#1a1a1a;">${fix.title}</h4>
          <p style="margin:0 0 10px 0;font-size:13px;color:#4B5563;line-height:1.5;">${fix.why}</p>
          <div style="background:white;border-radius:6px;padding:12px;font-size:12px;color:#1a1a1a;line-height:1.6;border:1px solid #E5E7EB;overflow-x:auto;">
            <strong style="color:#0066FF;">${isFr ? 'Correctif :' : 'How to fix:'}</strong><br>
            ${fix.how}
          </div>
          <p style="margin:10px 0 0 0;font-size:11px;color:#9CA3AF;">
            ⏱ ${isFr ? 'Temps estimé :' : 'Estimated time:'} ${fix.time}
          </p>
        </div>
      `).join('');

  const checkRow = (label, failed, pts) => `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #eee;font-size:14px;color:#1a1a1a;">${label}</td>
      <td style="padding:12px 0;border-bottom:1px solid #eee;text-align:right;font-size:13px;font-weight:600;color:${failed ? '#EF4444' : '#10B981'};">
        ${failed ? (isFr ? `Échec (0/${pts})` : `Fail (0/${pts})`) : (isFr ? `Réussite (${pts}/${pts})` : `Pass (${pts}/${pts})`)}
      </td>
    </tr>`;

  // --- 1. Admin notification ---
  const adminHtml = `
    <h2>Nouveau lead — Bill 96 Scanner</h2>
    <p><strong>Nom:</strong> ${name || '—'}</p>
    <p><strong>Courriel:</strong> ${email}</p>
    <p><strong>Langue:</strong> ${isFr ? 'FR' : 'EN'}</p>
    <p><strong>Site scanné:</strong> ${scanResult.url}</p>
    <p><strong>Entreprise:</strong> ${scanResult.businessName || '—'}</p>
    <p><strong>Score:</strong> <span style="color:${scoreColor};font-weight:bold;">${score}%</span> — ${riskLabel}</p>
    <p><strong>Téléphone détecté:</strong> ${scanResult.contactPhone || '—'}</p>
    <p><strong>Courriel détecté sur le site:</strong> ${scanResult.contactEmail || '—'}</p>
  `;

  try {
    const adminRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'NT Web UX <noreply@ntwebux.com>',
        to: ['info@ntwebux.com'],
        reply_to: email,
        subject: `Bill 96 Lead — ${name || email} · Score ${score}%`,
        html: adminHtml
      })
    });
    if (!adminRes.ok) {
      const err = await adminRes.text();
      return res.status(500).json({ error: 'Admin email failed', detail: err });
    }
  } catch (e) {
    return res.status(500).json({ error: 'Admin email failed', detail: String(e) });
  }

  // --- 2. Client report + fix plan ---
  const clientSubject = isFr
    ? `Votre rapport Bill 96 + plan de correction — ${score}%`
    : `Your Bill 96 report + fix plan — ${score}%`;

  const mailtoLink = `mailto:info@ntwebux.com?subject=${encodeURIComponent(
    isFr ? `Demande d'aide Bill 96 — ${scanResult.url}` : `Bill 96 help request — ${scanResult.url}`
  )}&body=${encodeURIComponent(
    isFr
      ? `Bonjour,\n\nMon site ${scanResult.url} a un score de conformité de ${score}%. J'aimerais discuter des étapes pour le corriger.\n\nMerci,`
      : `Hello,\n\nMy website ${scanResult.url} scored ${score}% on the compliance check. I'd like to discuss how to fix it.\n\nThanks,`
  )}`;

  const clientHtml = `
    <div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;max-width:640px;margin:0 auto;background:#f7f8fa;padding:24px;color:#1a1a1a;">
      <div style="background:white;border-radius:12px;padding:32px;">

        <p style="margin:0 0 8px 0;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#4A8FB0;font-weight:600;">
          ${isFr ? 'Rapport de conformité Loi 96' : 'Bill 96 Compliance Report'}
        </p>
        <h1 style="margin:0 0 24px 0;font-size:24px;font-weight:800;color:#1a1a1a;">
          ${scanResult.businessName}
        </h1>

        <div style="background:#f7f8fa;border-radius:12px;padding:24px;text-align:center;margin-bottom:28px;">
          <div style="font-size:56px;font-weight:800;color:${scoreColor};line-height:1;">${score}<span style="font-size:28px;">%</span></div>
          <div style="font-size:14px;font-weight:600;color:#1a1a1a;margin-top:8px;">${riskLabel}</div>
          <div style="font-size:12px;color:#666;margin-top:4px;">${scanResult.url}</div>
        </div>

        <p style="font-size:15px;line-height:1.6;color:#1a1a1a;">
          ${isFr ? `Bonjour ${firstName},` : `Hello ${firstName},`}
        </p>
        <p style="font-size:15px;line-height:1.6;color:#1a1a1a;">
          ${isFr
            ? `Voici le rapport complet de <strong>${scanResult.url}</strong> selon les règlements OQLF (Loi 96), ainsi qu'un plan de correction étape par étape.`
            : `Here is the full report for <strong>${scanResult.url}</strong> against OQLF regulations (Bill 96), along with a step-by-step fix plan.`}
        </p>

        <h3 style="font-size:14px;font-weight:700;margin:28px 0 8px 0;color:#1a1a1a;">
          ${isFr ? 'Détail des vérifications' : 'Audit breakdown'}
        </h3>
        <table style="width:100%;border-collapse:collapse;">
          ${checkRow(isFr ? 'Langue racine HTML' : 'HTML root language', !!f.html_lang_missing_or_incorrect, 40)}
          ${checkRow(isFr ? 'Liens alternatifs bilingues (hreflang)' : 'Bilingual alternate links (hreflang)', !!f.hreflang_alternate_fr_missing, 30)}
          ${checkRow(isFr ? 'Méta-description française' : 'French meta description', !!(f.meta_description_missing || f.meta_description_not_french), 15)}
          ${checkRow(isFr ? 'Densité du texte français' : 'French text density', !!f.french_text_density_insufficient, 15)}
        </table>

        ${score < 80 ? `
          <div style="background:#FEF3C7;border-left:4px solid #F59E0B;padding:16px;border-radius:6px;margin:28px 0 20px 0;">
            <p style="margin:0;font-size:13px;line-height:1.5;color:#78350F;">
              <strong>${isFr ? 'Risque réglementaire :' : 'Regulatory risk:'}</strong>
              ${isFr
                ? ' les sites non conformes sont exposés à des signalements OQLF et à des amendes pouvant aller jusqu\'à 30 000 $ pour une entreprise (90 000 $ en cas de récidive).'
                : ' non-compliant sites face OQLF complaints and fines up to $30,000 for businesses ($90,000 for repeat offenses).'}
            </p>
          </div>
        ` : ''}

        <h3 style="font-size:16px;font-weight:700;margin:32px 0 16px 0;color:#1a1a1a;">
          ${isFr ? '🛠 Plan de correction' : '🛠 Fix plan'}
        </h3>
        ${fixesHtml}

        <div style="background:#EFF6FF;border:1px solid #BFDBFE;border-radius:10px;padding:24px;margin:28px 0 16px 0;text-align:center;">
          <h4 style="margin:0 0 8px 0;font-size:16px;font-weight:700;color:#1a1a1a;">
            ${isFr ? 'Préférez que nous le fassions pour vous ?' : 'Prefer we handle it for you?'}
          </h4>
          <p style="margin:0 0 16px 0;font-size:13px;color:#4B5563;line-height:1.5;">
            ${isFr
              ? 'Nous corrigeons tous les points ci-dessus en 72 heures, sans que vous ayez à toucher au code.'
              : 'We fix all of the above in 72 hours — you never touch the code.'}
          </p>
          <a href="https://ntwebux.com/pricing" style="display:inline-block;background:#0066FF;color:white;text-decoration:none;padding:12px 28px;border-radius:100px;font-weight:700;font-size:14px;margin:4px;">
            ${isFr ? 'Voir les forfaits' : 'See pricing'}
          </a>
          <a href="${mailtoLink}" style="display:inline-block;background:white;color:#0066FF;text-decoration:none;padding:12px 28px;border-radius:100px;font-weight:700;font-size:14px;border:1px solid #0066FF;margin:4px;">
            ${isFr ? 'Nous contacter' : 'Contact us'}
          </a>
        </div>

        <hr style="border:none;border-top:1px solid #eee;margin:28px 0 20px 0;">

        <p style="font-size:13px;color:#666;line-height:1.5;margin:0;">
          ${isFr ? 'Cordialement,' : 'Kind regards,'}<br>
          <strong style="color:#1a1a1a;">${isFr ? "L'équipe NT Web UX" : "The NT Web UX team"}</strong><br>
          ${isFr ? 'Agence web bilingue' : 'Bilingual web agency'}<br>
          <a href="https://ntwebux.com" style="color:#0066FF;text-decoration:none;">ntwebux.com</a>
        </p>
      </div>
      <p style="text-align:center;font-size:11px;color:#999;margin-top:16px;line-height:1.5;">
        ${isFr
          ? 'Rapport généré automatiquement. Il reflète l\'état public de votre page d\'accueil au moment du scan.<br>Cet audit est une orientation technique et ne remplace pas un avis juridique.'
          : 'Report generated automatically. Reflects the public state of your homepage at scan time.<br>This audit is technical guidance and does not constitute legal advice.'}
      </p>
    </div>
  `;

  fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'NT Web UX <noreply@ntwebux.com>',
      to: [email],
      reply_to: 'info@ntwebux.com',
      subject: clientSubject,
      html: clientHtml
    })
  }).catch(() => {});

  return res.status(200).json({ ok: true });
}
