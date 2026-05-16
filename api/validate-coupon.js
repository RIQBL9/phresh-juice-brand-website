import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code } = req.body;
  const normalised = (code ?? '').trim().toUpperCase();
  if (!normalised) {
    return res.status(400).json({ valid: false });
  }

  try {
    const promoCodes = await stripe.promotionCodes.list({ limit: 100, active: true });

    for (const p of promoCodes.data) {
      if (p.code.toUpperCase() === normalised) {
        const coupon = p.coupon;
        const discountText = coupon?.percent_off
          ? `${coupon.percent_off}% off`
          : coupon?.amount_off
          ? `£${(coupon.amount_off / 100).toFixed(2)} off`
          : 'discount applied';
        return res.status(200).json({
          valid: true,
          discountText,
          promotionCodeId: p.id,
        });
      }
    }

    return res.status(200).json({ valid: false });
  } catch (error) {
    console.error('validate-coupon error:', error.message);
    return res.status(200).json({ valid: false });
  }
}
