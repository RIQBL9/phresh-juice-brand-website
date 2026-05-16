import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { code } = req.body;
  try {
    // Look up as a promotion code first (the customer-facing code e.g. "PHRESH10FREE")
    const promoCodes = await stripe.promotionCodes.list({ code, limit: 1, active: true });
    if (promoCodes.data.length > 0) {
      const promo = promoCodes.data[0];
      return res.status(200).json({
        valid: true,
        discount: promo.coupon,
        promotionCodeId: promo.id,
      });
    }

    // Fall back to looking up as a raw coupon ID
    const coupon = await stripe.coupons.retrieve(code);
    if (coupon.valid) {
      return res.status(200).json({ valid: true, discount: coupon, promotionCodeId: null });
    }

    return res.status(200).json({ valid: false });
  } catch (error) {
    console.error('Coupon validation error:', error.message);
    return res.status(200).json({ valid: false });
  }
}
