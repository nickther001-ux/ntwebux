export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const d = req.body || {};
  const key = process.env.RESEND_API_KEY;
  if (!key) return res.status(500).json({ error: 'Missing RESEND_API_KEY' });

  // Determine language: explicit lang field, or detect from message content
  const isFr = d.lang
    ? d.lang === 'fr'
    : /[àâçéèêëîïôùûü]|bonjour|merci|salut/i.test((d.message || '') + ' ' + (d.name || ''));

  // 1. Admin notification
  const adminHtml = `
    <h2>Nouveau message — Formulaire contact</h2>
    <p><strong>Nom:</strong> ${d.name || '—'}</p>
    <p><strong>Courriel:</strong> ${d.email || '—'}</p>
    <p><strong>Téléphone:</strong> ${d.phone || '—'}</p>
    <p><strong>Message:</strong></p>
    <p>${(d.message || '—').replace(/\n/g, '<br>')}</p>
  `;

  try {
    const adminRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'NT Web UX <noreply@ntwebux.com>',
        to: ['info@ntwebux.com'],
        reply_to: d.email,
        subject: `Contact — ${d.name || 'Visiteur'}`,
        html: adminHtml
      })
    });
    if (!adminRes.ok) {
      const err = await adminRes.text();
      return res.status(500).json({ error: 'Email failed', detail: err });
    }
  } catch (e) {
    return res.status(500).json({ error: 'Email failed', detail: String(e) });
  }

  // 2. Client confirmation — single language, professional
  const firstName = (d.name || '').split(' ')[0] || (isFr ? 'Bonjour' : 'Hello');

  const clientSubject = isFr
    ? `Nous avons bien reçu votre message`
    : `We've received your message`;

  const clientHtml = isFr ? `
    <div style="font-family: -apple-system, Segoe UI, Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a; line-height: 1.6;">
      <p>Bonjour ${firstName},</p>

      <p>Merci de nous avoir contactés. Votre message est bien reçu et sera lu attentivement.</p>

      <p>Je vous reviens personnellement dans les 24 heures ouvrables.</p>

      <p>Pour toute précision ou information complémentaire, vous pouvez simplement répondre à ce courriel.</p>

      <p>Cordialement,</p>

      <p style="margin-top: 24px;">
        <strong>Nickson Thermidor</strong><br>
        NT Web UX<br>
        <a href="https://ntwebux.com" style="color: #0066FF; text-decoration: none;">ntwebux.com</a>
      </p>
    </div>
  ` : `
    <div style="font-family: -apple-system, Segoe UI, Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a; line-height: 1.6;">
      <p>Hello ${firstName},</p>

      <p>Thank you for getting in touch. Your message has been received and will be reviewed carefully.</p>

      <p>I'll personally get back to you within 24 business hours.</p>

      <p>If you'd like to share any additional details, feel free to reply directly to this email.</p>

      <p>Kind regards,</p>

      <p style="margin-top: 24px;">
        <strong>Nickson Thermidor</strong><br>
        NT Web UX<br>
        <a href="https://ntwebux.com" style="color: #0066FF; text-decoration: none;">ntwebux.com</a>
      </p>
    </div>
  `;

  if (d.email) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'NT Web UX <noreply@ntwebux.com>',
          to: [d.email],
          reply_to: 'info@ntwebux.com',
          subject: clientSubject,
          html: clientHtml
        })
      });
    } catch (e) {
      console.error('Client confirmation failed:', e);
    }
  }

  return res.status(200).json({ ok: true });
}
