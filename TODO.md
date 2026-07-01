# TODO - Premium Xiaomi-Style Full-Stack Website

## Step 1 — Repo understanding
- [x] Read existing HTML pages: `index.html`, `products.html`, `about.html`, `contact.html`
- [x] Read existing frontend motion/style: `styles.css`, `script.js`
- [x] Read backend: `server.js`

## Step 2 — Architecture decision
- [x] Choose React/Next.js + Tailwind migration (option A)

## Step 3 — Next.js app scaffold
- [ ] Create `frontend/` Next.js project
- [ ] Add TailwindCSS
- [ ] Move/alias static assets (use existing `assets/`)

## Step 4 — Backend modularization
- [ ] Refactor `server.js` into `backend/` structure
- [ ] Add product/user/order/cart persistence (DB: MongoDB or PostgreSQL)

## Step 5 — API implementation (full-stack)
- [ ] Auth: JWT register/login middleware + routes
- [ ] Products: list + detail endpoints
- [ ] Cart: add/remove/update + checkout endpoint
- [ ] Orders: create on checkout + fetch for user
- [ ] Admin: inventory/orders/queries endpoints

## Step 6 — Frontend implementation
- [ ] Home page: hero, featured carousel, animated Shop Now, category links, login/register modal
- [ ] Products page: grid, hover animations, filters, quick view modal
- [ ] Product detail page: image gallery + 360° spin fallback viewer + specs table + add to cart
- [ ] About Us: story/mission/vision + leadership + timeline animation
- [ ] Services: warranty/support/FAQs + repair booking form
- [ ] Store: ecommerce catalog + description + cart/checkout
- [ ] Contact Us: map embed + enquiry form

## Step 7 — SEO + schema
- [ ] Add meta tags and schema.org JSON-LD

## Step 8 — Payments
- [ ] Dummy secure payment flow (server-validated) with Razorpay-ready hooks

## Step 9 — QA
- [ ] Run local dev servers + smoke tests for: auth, cart, checkout, admin, contact

## Step 10 — Deployment docs
- [ ] Provide Vercel/Netlify + Heroku/AWS instructions

