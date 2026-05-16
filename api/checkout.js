import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { items, shipping, metadata } = req.body;

  if (!items || !items.length) {
    return res.status(400).json({ error: 'No items provided' });
  }

  const lineItems = items.map((item) => ({
    price_data: {
      currency: 'gbp',
      product_data: {
        name: item.juices ? `${item.name} (${item.juices})` : item.name,
      },
      unit_amount: item.price,
    },
    quantity: item.quantity,
  }));

  if (shipping > 0) {
    lineItems.push({
      price_data: {
        currency: 'gbp',
        product_data: { name: 'UK Next Day Delivery' },
        unit_amount: 1099,
      },
      quantity: 1,
    });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      shipping_address_collection: {
        allowed_countries: ['GB'],
      },
      metadata: {
        customer_name: metadata?.customer_name ?? '',
        customer_phone: metadata?.customer_phone ?? '',
        delivery_postcode: metadata?.delivery_postcode ?? '',
        delivery_notes: metadata?.delivery_notes ?? '',
        bundle_selections: metadata?.bundle_selections ?? '',
      },
      success_url: `${process.env.VITE_SITE_URL}/success`,
      cancel_url: `${process.env.VITE_SITE_URL}/cancel`,
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Stripe error:', err.message);
    res.status(500).json({ error: err.message });
  }
}
