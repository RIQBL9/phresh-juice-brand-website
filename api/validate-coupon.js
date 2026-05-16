import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code } = req.body;
  const normalised = (code ?? '').trim().toUpperCase();
  console.log('[validate-coupon] received code:', normalised);

  try {
    // Fetch all active promotion codes and match case-insensitively
    const promoCodes = await stripe.promotionCodes.list({ limit: 100, active: true });
    console.log('[validate-coupon] total active promo codes:', promoCodes.data.length);
    promoCodes.data.forEach((p) => console.log('[validate-coupon] found:', p.code));

    const match = promoCodes.data.find(
      (p) => p.code.toUpperCase() === normalised
    );

    if (match) {
      console.log('[validate-coupon] matched:', match.id, match.code);
      return res.status(200).json({
        valid: true,
        discount: match.coupon,
        promotionCodeId: match.id,
      });
    }

    console.log('[validate-coupon] no match found for:', normalised);
    return res.status(200).json({ valid: false });
  } catch (error) {
    console.error('[validate-coupon] error:', error.message);
    return res.status(200).json({ valid: false, _debug: error.message });
  }
}
