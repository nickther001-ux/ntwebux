import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, service, message } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  try {
    await resend.emails.send({
      from: 'NT Digital Group <noreply@ntwebux.com>',
      to: 'support@ntwebux.com',
      subject: `New Lead: ${service || 'Contact Form'} — ${name || email}`,
      html: `
        <h2>New Lead — ntwebux.com</h2>
        <p><b>Name:</b> ${name || 'Not provided'}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone || 'Not provided'}</p>
        <p><b>Service:</b> ${service || 'Not provided'}</p>
        <p><b>Message:</b> ${message || 'Not provided'}</p>
      `,
      reply_to: email,
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
