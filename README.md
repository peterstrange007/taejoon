# Taejoon Pre-booking (Local)

This workspace adds a simple pre-booking flow and a minimal Node.js backend to create Razorpay orders, verify payments, store orders as CSV, and send optional confirmation emails.

Files added/changed:
- `prebook.html`, `prebook.js`, `prebook-success.html` — frontend flow for pre-booking
- `products.html`, `index.html` — added Pre-book buttons linking to prebook page
- `server.js` — minimal Express backend (order creation + verification)
- `package.json`, `.env.example`, `README.md`

Quick start (node/npm required):

1. Copy `.env.example` to `.env` and fill values (Razorpay credentials and SMTP if you want email):

```
RAZORPAY_KEY_ID=rzp_test_xxx
RAZORPAY_KEY_SECRET=your_secret
PREBOOK_ENABLED=false
SMTP_URL=smtp://user:pass@smtp.example.com:587
EMAIL_FROM=orders@taejoon.in
CONTACT_EMAIL=contact@taejoon.in
PORT=3000
SMS_PROVIDER=twilio
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_SMS_FROM=+10000000000
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
```

2. Install dependencies and start:

```bash
npm install
npm start
```

3. Open `http://localhost:3000/prebook.html` to test.

Contact form:
- Contact inquiries submit to `/api/contact`.
- Each inquiry is emailed to `CONTACT_EMAIL` and appended to `contacts.csv`.
- Download contact inquiries from `/admin/contacts.csv`.

Notes and limitations:
- Razorpay requires server-side `key_secret` to create orders and verify signatures — keep it secret.
- Pre-booking is disabled unless `PREBOOK_ENABLED=true`.
- If Razorpay keys are not configured the server returns a "fake" order id for local testing; verification is then mocked.
- Email sending uses `SMTP_URL` (nodemailer transport). SMS and WhatsApp confirmations use Twilio when the Twilio environment variables are configured.
- Orders are appended to `orders.csv` in the project root; download at `/admin/orders.csv`.
- Student orders allow 1-2 devices, parent orders allow 2-5 devices, and institute/organization orders allow 10-500 devices per checkout. Customers can place another checkout if they need more.

cPanel deployment:
- Use cPanel's Node.js App/Setup Node.js App feature, not static-only hosting, because forms and Razorpay verification require `server.js`.
- Set the application startup file to `server.js`.
- Set Node.js version to 18 or newer.
- Add the environment variables from `.env.example` in cPanel.
- Run `npm install` from cPanel's terminal or dependency installer, then restart the Node app.
- Make sure your app URL serves this project root so `/api/contact`, `/api/create-order`, `/api/verify`, and `/admin/orders.csv` resolve correctly.

If you want, I can:
- Add Twilio integration for WhatsApp/SMS notifications (requires Twilio credentials).
- Harden server for production, add order receipts and admin UI.
- Add server-side input validation and rate-limiting.

