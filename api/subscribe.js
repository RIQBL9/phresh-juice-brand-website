export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  try {
    const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.MAILERLITE_API_KEY}`,
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      console.error('MailerLite error:', response.status);
      return res.status(500).json({ error: 'Subscription failed' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('subscribe error:', error.message);
    return res.status(500).json({ error: 'Subscription failed' });
  }
}
