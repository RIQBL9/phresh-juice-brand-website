# Phresh MCR 🌿
> Cold-pressed juices · Wellness boosters · Manchester made
 
Live site: [phreshmcr.uk](https://phreshmcr.uk)
 
---
 
## Tech Stack
 
- **Framework:** React (Vite)
- **Hosting:** Vercel
- **Domain & Email:** Namecheap (Titan Private Email)
- **Payments:** Stripe
- **Newsletter:** MailerLite
---
 
## Features
 
- 🛒 Add to cart system with quantity selectors
- 📦 Bundle builder (5, 10, 15, 20 juices) with flavour selection
- 💳 Stripe Checkout with postcode-based delivery pricing
- 📬 MailerLite newsletter signup with welcome email automation
- 🎉 10% off popup for new visitors
- 🏷️ Discount code support at checkout
- ✅ Success and cancel pages after payment
- 📱 Fully responsive on mobile
---
 
## Juices
 
| # | Ingredients |
|---|-------------|
| 1 | Apple · Beetroot · Carrot · Lemon · Cucumber |
| 2 | Apple · Celery · Lemon · Cucumber · Lime |
| 3 | Seeded Grape |
| 4 | Ginger · Lime · Lemon |
| 5 | Watermelon · Lemon · Lime |
 
---
 
## Delivery
 
| Location | Cost |
|----------|------|
| Manchester (M postcodes) | Free |
| Rest of UK | £10.99 Next Day |
 
---
 
## Environment Variables
 
Set these in Vercel under **Settings → Environment Variables:**
 
```
STRIPE_SECRET_KEY=sk_live_xxxx
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_xxxx
VITE_SITE_URL=https://phreshmcr.uk
MAILERLITE_API_KEY=xxxx
```
 
> ⚠️ Never commit these to GitHub. Make sure `.env` is in `.gitignore`
 
---
 
## Serverless Functions
 
| File | Purpose |
|------|---------|
| `api/subscribe.js` | Handles newsletter signups → MailerLite |
| `api/checkout.js` | Creates Stripe Checkout session |
| `api/validate-coupon.js` | Validates Stripe discount codes |
 
---
 
## Email
 
- **Custom email:** hello@phreshmcr.uk
- **Provider:** Namecheap Private Email (Titan)
- **Login:** [privateemail.com](https://privateemail.com)
**IMAP Settings:**
```
Server: mail.privateemail.com
Port: 993
SSL: On
```
 
**SMTP Settings:**
```
Server: mail.privateemail.com
Port: 465
SSL: On
```
 
---
 
## Deployment
 
Pushes to the `main` branch on GitHub automatically deploy to Vercel.
 
To manually redeploy:
- Go to Vercel → Phresh project → Deployments
- Click the three dots on the latest deployment → Redeploy
---
 
## DNS Records (Namecheap)
 
| Type | Host | Value |
|------|------|-------|
| A | @ | 216.198.79.1 |
| CNAME | www | 8a679fd7a9c886ec.vercel-dns-017.com. |
| Mail Settings | — | Private Email (auto configured) |
 
---
 
## Discount Codes
 
Managed in **Stripe Dashboard → Products → Coupons**
 
| Code | Discount | Limit |
|------|----------|-------|
| PHRESH10FREE | 100% off | 10 uses |
 
---
 
*Built for Phresh MCR, Manchester UK* 🌿
 