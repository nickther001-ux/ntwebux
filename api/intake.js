import { Resend } from 'resend';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const d = req.body || {};
  if (!d.email) return res.status(400).json({ error: 'Email is required' });

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: 'Email service not configured' });
  }

  const isFr = d.lang === 'fr';
  const planName = d.plan?.name || 'Starter';
  const emoji = d.method === 'WhatsApp' ? '💬' : d.method === 'Email' ? '📧' : '📞';
  const subject = `${emoji} ${isFr ? 'Nouveau lead' : 'New lead'} — ${d.business || d.name || 'Unnamed'} | ${planName}`;

  const row = (label, value) => value
    ? `<tr><td style="padding:6px 12px;color:#64748b;font-size:13px;width:160px;">${label}</td><td style="padding:6px 12px;color:#0f172a;font-size:14px;font-weight:500;">${Array.isArray(value) ? value.join(', ') : value}</td></tr>`
    : '';

  const html = `<!doctype html><html><body style="font-family:-apple-system,sans-serif;background:#f8fafc;margin:0;padding:24px;"><div style="max-width:640px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;"><div style="background:linear-gradient(135deg,#0066ff,#00c8ff);padding:28px 32px;color:#fff;"><div style="font-size:12px;letter-spacing:0.14em;text-transform:uppercase;opacity:0.75;margin-bottom:6px;">${isFr ? 'Nouveau lead' : 'New lead'} · NT Web UX</div><div style="font-size:24px;font-weight:800;line-height:1.2;">${d.business || d.name || 'Unnamed Business'}</div><div style="margin-top:6px;font-size:14px;opacity:0.85;">${planName}</div></div><div style="padding:20px 24px;"><table style="width:100%;border-collapse:collapse;">${row('Name', d.name)}${row('Business', d.business)}${row('Email', `<a href="mailto:${d.email}" style="color:#0066ff;text-decoration:none;">${d.email}</a>`)}${row('Phone', d.phone)}${row('City', d.city)}${row('Site type', d.siteType)}${row('Style', d.style)}${row('Visual styles', d.visualStyles)}${row('Goals', d.goals)}${row('Description', d.description)}${row('Has logo', d.hasLogo)}${row('Has content', d.hasContent)}${row('Existing site', d.hasExistingSite)}${row(isFr ? 'Méthode' : 'Method', `<strong style="color:#0066ff;">${d.method || '-'}</strong>`)}${row('Best time', d.bestTime)}</table>${d.notes ? `<div style="margin-top:16px;background:#f1f5f9;border-left:3px solid #0066ff;padding:12px 14px;border-radius:6px;color:#334155;font-size:14px;line-height:1.5;white-space:pre-wrap;">${d.notes}</div>` : ''}</div></div></body></html>`;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: 'NT Web UX <onboarding@resend.dev>',
      to: 'support@ntwebux.com',
      reply_to: d.email,
      subject,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: error.message || 'Email send failed' });
    }

    return res.status(200).json({ success: true, method: d.method || 'Email', id: data?.id });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
