import { Resend } from 'resend';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { firstName, lastName, email, phone, service, message } = req.body || {};
  if (!email) return res.status(400).json({ error: 'Email is required' });

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY missing');
    return res.status(500).json({ error: 'Email service not configured' });
  }

  const fullName = `${firstName || ''} ${lastName || ''}`.trim() || 'NT Web UX Lead';
  const subject = `📧 Contact — ${service || 'General Inquiry'} | ${fullName}`;

  const html = `<!doctype html><html><body style="font-family:-apple-system,sans-serif;background:#f8fafc;margin:0;padding:24px;"><div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;"><div style="background:linear-gradient(135deg,#0066ff,#00c8ff);padding:24px 28px;color:#fff;"><div style="font-size:11px;letter-spacing:0.14em;text-transform:uppercase;opacity:0.8;margin-bottom:4px;">Contact Form</div><div style="font-size:22px;font-weight:800;">${fullName}</div></div><div style="padding:24px 28px;color:#0f172a;font-size:15px;line-height:1.6;"><p style="margin:0 0 8px;"><strong>Email:</strong> <a href="mailto:${email}" style="color:#0066ff;text-decoration:none;">${email}</a></p><p style="margin:0 0 8px;"><strong>Phone:</strong> ${phone || 'Not provided'}</p><p style="margin:0 0 16px;"><strong>Service:</strong> ${service || 'General'}</p><div style="background:#f1f5f9;border-left:3px solid #0066ff;padding:14px 16px;border-radius:6px;margin-top:16px;white-space:pre-wrap;">${message || 'No message provided'}</div></div></div></body></html>`;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: 'NT Web UX <onboarding@resend.dev>',
      to: 'support@ntwebux.com',
      reply_to: email,
      subject,
      html,
    });

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ success: true, id: data?.id });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
