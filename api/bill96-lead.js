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
  const checkRow = (label, failed, pts) => `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #eee;font-size:14px;color:#1a1a1a;">${label}</td>
      <td style="padding:12px 0;border-bottom:1px solid #eee;text-align:right;font-size:13px;font-weight:600;color:${failed ? '#EF4444' : '#10B981'};">
        ${failed ? (isFr ? `Échec (0/${pts})` : `Fail (0/${pts})`) : (isFr ? `Réussite (${pts}/${pts})` : `Pass (${pts}/${pts})`)}
      </td>
    </tr>`;

  // 1. Admin notification
  const adminHtml = `
    <h2>Nouveau lead — Bill 96 Scanner</h2>
    <p><strong>Nom:</strong> ${name || '—'}</p>
    <p><strong>Courriel:</strong> ${email}</p>
    <p><strong>Langue:</strong> ${isFr ? 'FR' : 'EN'}</p>
    <p><strong>Site scanné:</strong> ${scanResult.url}</p>
    <p><strong>Entreprise détectée:</strong> ${scanResult.businessName || '—'}</p>
    <p><strong>Score:</strong> <span style="color:${scoreColor};font-weight:bold;">${score}%</span> — ${riskLabel}</p>
    <p><strong>Téléphone détecté:</strong> ${scanResult.contactPhone || '—'}</p>
    <p><strong>Courriel détecté sur site:</strong> ${scanResult.contactEmail || '—'}</p>
    <hr>
    <p><strong>Failures:</strong></p>
    <ul>
      ${f.html_lang_missing_or_incorrect ? '<li>HTML lang incorrect</li>' : ''}
      ${f.hreflang_alternate_fr_missing ? '<li>hreflang FR manquant</li>' : ''}
      ${f.meta_description_missing ? '<li>Meta description manquante</li>' : ''}
      ${f.meta_description_not_french ? '<li>Meta description non française</li>' : ''}
      ${f.french_text_density_insufficient ? `<li>Densité FR insuffisante (${Math.round(f.french_text_density_insufficient.measured_density*100)}%)</li>` : ''}
    </ul>
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

  // 2. Client audit report
  const clientSubject = isFr
    ? `Votre rapport Bill 96 — ${scanResult.businessName} (${score}%)`
    : `Your Bill 96 Report — ${scanResult.businessName} (${score}%)`;

  const clientHtml = `
    <div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;max-width:600px;margin:0 auto;background:#f7f8fa;padding:24px;color:#1a1a1a;">
      <div style="background:white;border-radius:12px;padding:32px;">

        <p style="margin:0 0 8px 0;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#4A8FB0;font-weight:600;">
          ${isFr ? 'Rapport de conformité Loi 96' : 'Bill 96 Compliance Report'}
        </p>
        <h1 style="margin:0 0 24px 0;font-size:24px;font-weight:800;color:#1a1a1a;">
          ${scanResult.businessName}
        </h1>

        <!-- Score block -->
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
            ? `Voici le rapport d'audit complet de <strong>${scanResult.url}</strong> selon les règlements de l'OQLF (Loi 96).`
            : `Here is the complete audit report for <strong>${scanResult.url}</strong> based on OQLF regulations (Bill 96).`}
        </p>

        <!-- Checks table -->
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
          <div style="background:#FEF3C7;border-left:4px solid #F59E0B;padding:16px;border-radius:6px;margin:28px 0;">
            <p style="margin:0;font-size:13px;line-height:1.5;color:#78350F;">
              <strong>${isFr ? 'Risque réglementaire :' : 'Regulatory risk:'}</strong>
              ${isFr
                ? ' les sites non conformes sont exposés à des signalements OQLF et à des amendes pouvant aller jusqu\'à 30 000 $ pour une entreprise.'
                : ' non-compliant sites face OQLF complaints and fines up to $30,000 for businesses.'}
            </p>
          </div>
        ` : ''}

        <!-- CTA -->
        <div style="text-align:center;margin:32px 0 16px 0;">
          <a href="https://ntwebux.com/pricing" style="display:inline-block;background:#0066FF;color:white;text-decoration:none;padding:14px 32px;border-radius:100px;font-weight:700;font-size:15px;">
            ${isFr ? 'Corriger en 72h — à partir de 1 497$' : 'Fix in 72h — starting at $1,497'}
          </a>
        </div>
        <p style="text-align:center;font-size:13px;color:#666;margin:0;">
          ${isFr ? 'Ou répondez à ce courriel pour un appel gratuit de 15 minutes.' : 'Or reply to this email for a free 15-minute consultation.'}
        </p>

        <hr style="border:none;border-top:1px solid #eee;margin:32px 0 20px 0;">

        <p style="font-size:13px;color:#666;line-height:1.5;margin:0;">
          ${isFr ? 'Cordialement,' : 'Kind regards,'}<br>
          <strong style="color:#1a1a1a;">Nickson Thermidor</strong><br>
          NT Web UX<br>
          <a href="https://ntwebux.com" style="color:#0066FF;text-decoration:none;">ntwebux.com</a>
        </p>
      </div>
      <p style="text-align:center;font-size:11px;color:#999;margin-top:16px;">
        ${isFr
          ? 'Audit généré automatiquement. Il reflète l\'état public de votre page d\'accueil au moment du scan.'
          : 'Report generated automatically. Reflects the public state of your homepage at scan time.'}
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
