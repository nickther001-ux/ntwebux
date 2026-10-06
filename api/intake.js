export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const d = req.body || {};
  const isFr = d.lang === 'fr';
  const key = process.env.RESEND_API_KEY;
  if (!key) return res.status(500).json({ error: 'Missing RESEND_API_KEY' });

  const methodLabel = {
    whatsapp: isFr ? 'WhatsApp' : 'WhatsApp',
    email: isFr ? 'Courriel' : 'Email',
    phone: isFr ? 'Appel téléphonique' : 'Phone call',
    video: isFr ? 'Appel vidéo' : 'Video call'
  }[d.method] || d.method || '—';

  // 1. Admin notification
  const adminHtml = `
    <h2>Nouvelle demande — Lancement 72h</h2>
    <p><strong>Nom:</strong> ${d.name || '—'}</p>
    <p><strong>Entreprise:</strong> ${d.company || '—'}</p>
    <p><strong>Courriel:</strong> ${d.email || '—'}</p>
    <p><strong>Téléphone:</strong> ${d.phone || '—'}</p>
    <p><strong>Méthode préférée:</strong> ${methodLabel}</p>
    <p><strong>Langue:</strong> ${isFr ? 'Français' : 'English'}</p>
    <p><strong>Projet:</strong></p>
    <p>${(d.project || '—').replace(/\n/g, '<br>')}</p>
  `;

  try {
    const adminRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'NT Web UX <noreply@ntwebux.com>',
        to: ['info@ntwebux.com'],
        reply_to: d.email,
        subject: `Nouvelle demande — ${d.name || 'Client'} (${d.company || 'N/A'})`,
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

  // 2. Client confirmation — single language, professional tone
  const firstName = (d.name || '').split(' ')[0] || (isFr ? 'Bonjour' : 'Hello');

  const clientSubject = isFr
    ? `Nous avons bien reçu votre demande`
    : `We've received your request`;

  const clientHtml = isFr ? `
    <div style="font-family: -apple-system, Segoe UI, Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a; line-height: 1.6;">
      <p>Bonjour ${firstName},</p>

      <p>Merci d'avoir pris le temps de nous écrire. Votre demande concernant <strong>${d.company || 'votre projet'}</strong> est bien enregistrée.</p>

      <p>Je reviens vers vous par <strong>${methodLabel.toLowerCase()}</strong> dans les 24 prochaines heures pour discuter de vos besoins et confirmer les prochaines étapes.</p>

      <p>Si entre-temps vous souhaitez ajouter des précisions, répondez simplement à ce courriel.</p>

      <p>Au plaisir d'échanger,</p>

      <p style="margin-top: 24px;">
        <strong>Nickson Thermidor</strong><br>
        NT Web UX<br>
        <a href="https://ntwebux.com" style="color: #0066FF; text-decoration: none;">ntwebux.com</a>
      </p>
    </div>
  ` : `
    <div style="font-family: -apple-system, Segoe UI, Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a; line-height: 1.6;">
      <p>Hello ${firstName},</p>

      <p>Thank you for reaching out. Your request regarding <strong>${d.company || 'your project'}</strong> has been received.</p>

      <p>I'll be in touch by <strong>${methodLabel.toLowerCase()}</strong> within the next 24 hours to discuss your needs and confirm the next steps.</p>

      <p>If you'd like to add any details in the meantime, feel free to reply to this email.</p>

      <p>Looking forward to speaking with you,</p>

      <p style="margin-top: 24px;">
        <strong>Nickson Thermidor</strong><br>
        NT Web UX<br>
        <a href="https://ntwebux.com" style="color: #0066FF; text-decoration: none;">ntwebux.com</a>
      </p>
    </div>
  `;

  // Fire-and-forget
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
