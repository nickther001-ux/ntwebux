import { Resend } from 'resend';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    siteType, style, visualStyles, name, business, industry, description,
    city, goals, hasLogo, hasContent, hasExistingSite, existingUrl,
    email, phone, bestTime, method, notes,
    plan, lang,
  } = req.body || {};

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const isFr = lang === 'fr';
  const planName = plan?.name || 'Starter';
  const planPrice = plan?.price || '';
  const emoji = method === 'WhatsApp' ? '💬' : method === 'Email' ? '📧' : '📞';

  const subject = `${emoji} ${isFr ? 'Nouveau lead' : 'New lead'} — ${business || name || 'Unnamed'} | ${planName}`;

  const row = (label, value) => value
    ? `<tr><td style="padding:6px 12px;color:#64748b;font-size:13px;width:160px;">${label}</td><td style="padding:6px 12px;color:#0f172a;font-size:14px;font-weight:500;">${Array.isArray(value) ? value.join(', ') : value}</td></tr>`
    : '';

  const html = `<!doctype html><html><body style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;background:#f8fafc;margin:0;padding:24px;"><div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;"><div style="background:linear-gradient(135deg,#0066ff,#00c8ff);padding:28px 32px;color:#fff;"><div style="font-size:12px;letter-spacing:0.14em;text-transform:uppercase;opacity:0.75;margin-bottom:6px;">${isFr ? 'Nouveau lead' : 'New lead'} · NT Web UX</div><div style="font-size:24px;font-weight:800;line-height:1.2;">${business || name || 'Unnamed Business'}</div><div style="margin-top:6px;font-size:14px;opacity:0.85;">${planName} ${planPrice ? '· ' + planPrice : ''}</div></div><div style="padding:20px 24px;"><div style="font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#64748b;font-weight:700;margin-bottom:10px;">Contact</div><table style="width:100%;border-collapse:collapse;margin-bottom:20px;">${row('Name / Nom', name)}${row('Business / Entreprise', business)}${row('Email', `<a href="mailto:${email}" style="color:#0066ff;text-decoration:none;">${email}</a>`)}${row('Phone / Tél', phone ? `<a href="tel:${phone}" style="color:#0066ff;text-decoration:none;">${phone}</a>` : '')}${row('City / Ville', city)}${row('Industry', industry)}</table><div style="font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#64748b;font-weight:700;margin-bottom:10px;">${isFr ? 'Projet' : 'Project'}</div><table style="width:100%;border-collapse:collapse;margin-bottom:20px;">${row('Site type', siteType)}${row('Style', style)}${row('Visual styles', visualStyles)}${row('Goals / Objectifs', goals)}${row('Description', description)}</table><div style="font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#64748b;font-weight:700;margin-bottom:10px;">${isFr ? 'Préparation' : 'Readiness'}</div><table style="width:100%;border-collapse:collapse;margin-bottom:20px;">${row('Has logo', hasLogo)}${row('Has content', hasContent)}${row('Existing site', hasExistingSite)}${row('Existing URL', existingUrl)}</table><div style="font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#64748b;font-weight:700;margin-bottom:10px;">${isFr ? 'Comment les rejoindre' : 'How to reach them'}</div><table style="width:100%;border-collapse:collapse;margin-bottom:20px;">${row(isFr ? 'Méthode préférée' : 'Preferred method', `<strong style="color:#0066ff;">${method || '-'}</strong>`)}${row('Best time / Moment', bestTime)}</table>${notes ? `<div style="font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#64748b;font-weight:700;margin-bottom:10px;">${isFr ? 'Notes' : 'Notes'}</div><div style="background:#f1f5f9;border-left:3px solid #0066ff;padding:12px 14px;border-radius:6px;color:#334155;font-size:14px;line-height:1.5;white-space:pre-wrap;">${notes}</div>` : ''}<div style="margin-top:28px;padding-top:16px;border-top:1px solid #e2e8f0;font-size:12px;color:#94a3b8;text-align:center;">${isFr ? 'Soumis via' : 'Submitted via'} ntwebux.com · ${new Date().toLocaleString(isFr ? 'fr-CA' : 'en-CA', { timeZone: 'America/Toronto' })}</div></div></div></body></html>`;

  const toEmail = 'nickson.t@ntwebux.com';

  // Try Resend first
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: 'NT Web UX <onboarding@resend.dev>',
        to: toEmail,
        reply_to: email,
        subject,
        html,
      });
      return res.status(200).json({
        success: true,
        method: method || 'Email',
        provider: 'resend',
      });
    } catch (err) {
      console.error('Resend failed, falling back:', err.message);
    }
  }

  // Fallback: Web3Forms
  try {
    const r = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: 'c4b7aadc-73a9-4932-884a-3876a0139512',
        subject,
        from_name: name || business || 'NT Web UX Lead',
        name: name || '',
        email,
        phone: phone || 'Not provided',
        service: siteType || 'General Inquiry',
        plan: planName,
        preferred_method: method || 'Not specified',
        best_time: bestTime || 'Not specified',
        city: city || '',
        goals: Array.isArray(goals) ? goals.join(', ') : (goals || ''),
        visual_styles: Array.isArray(visualStyles) ? visualStyles.join(', ') : (visualStyles || ''),
        has_logo: hasLogo || '',
        has_content: hasContent || '',
        existing_site: hasExistingSite || '',
        existing_url: existingUrl || '',
        notes: notes || '',
        language: lang || '',
      }),
    });
    const data = await r.json();
    if (data.success) {
      return res.status(200).json({
        success: true,
        method: method || 'Email',
        provider: 'web3forms',
      });
    }
    return res.status(500).json({ error: 'Submission failed', details: data });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
