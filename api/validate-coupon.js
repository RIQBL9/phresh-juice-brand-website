import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code } = req.body;
  console.log('[validate-coupon] received code:', code);
  console.log('[validate-coupon] key prefix:', process.env.STRIPE_SECRET_KEY?.slice(0, 8));

  try {
    const promoCodes = await stripe.promotionCodes.list({ code, limit: 5 });
    console.log('[validate-coupon] promo codes found:', promoCodes.data.length);
    promoCodes.data.forEach((p) => {
      console.log('[validate-coupon] promo:', p.id, 'code:', p.code, 'active:', p.active, 'coupon valid:', p.coupon?.valid);
    });

    const activePromo = promoCodes.data.find((p) => p.active && p.coupon?.valid);
    if (activePromo) {
      return res.status(200).json({
        valid: true,
        discount: activePromo.coupon,
        promotionCodeId: activePromo.id,
      });
    }

    // Fall back to raw coupon ID
    console.log('[validate-coupon] no active promo found, trying coupon retrieve...');
    const coupon = await stripe.coupons.retrieve(code);
    console.log('[validate-coupon] coupon:', coupon.id, 'valid:', coupon.valid);
    if (coupon.valid) {
      return res.status(200).json({ valid: true, discount: coupon, promotionCodeId: null });
    }

    return res.status(200).json({ valid: false });
  } catch (error) {
    console.error('[validate-coupon] error:', error.message);
    return res.status(200).json({ valid: false });
  }
}
