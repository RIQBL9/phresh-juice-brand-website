import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code } = req.body;
  const normalised = (code ?? '').trim().toUpperCase();
  const normalisedHex = Buffer.from(normalised).toString('hex');
  console.log('[v6] received code:', normalised, 'hex:', normalisedHex);

  try {
    const promoCodes = await stripe.promotionCodes.list({ limit: 100 });
    console.log('[v6] total promo codes:', promoCodes.data.length);

    for (const p of promoCodes.data) {
      const promoHex = Buffer.from(p.code).toString('hex');
      const promoUpper = p.code.toUpperCase();
      const isMatch = promoUpper === normalised;
      console.log(`[v6] promo: "${p.code}" hex:${promoHex} active:${p.active} match:${isMatch}`);
      if (isMatch) {
        return res.status(200).json({
          valid: true,
          discount: p.coupon,
          promotionCodeId: p.id,
        });
      }
    }

    console.log('[v6] no match found');
    return res.status(200).json({ valid: false });
  } catch (error) {
    console.error('[v6] error:', error.message);
    return res.status(200).json({ valid: false, _debug: error.message });
  }
}
