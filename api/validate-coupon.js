import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { code } = req.body;
  try {
    const coupon = await stripe.coupons.retrieve(code);
    if (coupon.valid) {
      res.status(200).json({ valid: true, discount: coupon });
    } else {
      res.status(200).json({ valid: false });
    }
  } catch {
    res.status(200).json({ valid: false });
  }
}
