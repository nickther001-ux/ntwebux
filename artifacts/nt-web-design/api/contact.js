export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { firstName, lastName, email, phone, service, message } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: 'c4b7aadc-73a9-4932-884a-3876a0139512',
        subject: `New Lead: ${service || 'Contact Form'} — NT Digital Group`,
        from_name: `${firstName || ''} ${lastName || ''}`.trim() || 'NT WebUX Lead',
        name: `${firstName || ''} ${lastName || ''}`.trim(),
        email,
        phone: phone || 'Not provided',
        service: service || 'General Inquiry',
        message: message || 'No message provided',
        botcheck: '',
      }),
    });

    const data = await response.json();

    if (data.success) {
      return res.status(200).json({ success: true, message: 'Message sent successfully' });
    } else {
      return res.status(500).json({ error: 'Failed to send message', details: data });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
