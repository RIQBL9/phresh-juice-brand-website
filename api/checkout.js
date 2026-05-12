import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { items } = req.body;

  if (!items || !items.length) {
    return res.status(400).json({ error: 'No items provided' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item) => ({
        price_data: {
          currency: 'gbp',
          product_data: { name: item.name },
          unit_amount: item.price,
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.VITE_SITE_URL}/success`,
      cancel_url: `${process.env.VITE_SITE_URL}/cancel`,
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Stripe error:', err.message);
    res.status(500).json({ error: err.message });
  }
}
