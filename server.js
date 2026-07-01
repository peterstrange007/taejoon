// Simple Express backend for pre-booking integration.
require('dotenv').config();

const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json({ limit: '32kb' }));
app.get('/services.html', (req, res) => res.sendFile(path.join(__dirname, 'care.html')));
app.use(express.static(path.join(__dirname)));

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || '';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || '';
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'contact@taejoon.in';
const PREBOOK_ENABLED = process.env.PREBOOK_ENABLED === 'true';
const SMS_PROVIDER = process.env.SMS_PROVIDER || '';
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || '';
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || '';
const TWILIO_SMS_FROM = process.env.TWILIO_SMS_FROM || '';
const TWILIO_WHATSAPP_FROM = process.env.TWILIO_WHATSAPP_FROM || '';

const razor = RAZORPAY_KEY_ID && RAZORPAY_KEY_SECRET
  ? new Razorpay({ key_id: RAZORPAY_KEY_ID, key_secret: RAZORPAY_KEY_SECRET })
  : null;

const PRICE_RUPEES = 4999;
const DISCOUNT_PERCENT = 15;
const ORDER_RULES = {
  student: { min: 1, max: 2 },
  parent: { min: 2, max: 5 },
  institute: { min: 10, max: 500 }
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function computeUnitPaise() {
  return Math.round(PRICE_RUPEES * 100 * (100 - DISCOUNT_PERCENT) / 100);
}

function badRequest(message) {
  const error = new Error(message);
  error.statusCode = 400;
  return error;
}

function normalizeOrder(body = {}) {
  const type = String(body.type || '').trim();
  const quantity = Number(body.quantity || 0);
  const name = String(body.name || '').trim();
  const mobile = String(body.mobile || '').trim();
  const address = String(body.address || '').trim();
  const email = String(body.email || '').trim();

  if (!ORDER_RULES[type]) throw badRequest('Invalid order type');
  if (!Number.isInteger(quantity)) throw badRequest('Quantity must be a whole number');
  if (quantity < ORDER_RULES[type].min) throw badRequest('Quantity below minimum');
  if (quantity > ORDER_RULES[type].max) throw badRequest('Quantity above allowed maximum');
  if (!name) throw badRequest('Name is required');
  if (!/^[0-9]{7,15}$/.test(mobile)) throw badRequest('Mobile number is invalid');
  if (!EMAIL_PATTERN.test(email)) throw badRequest('Email is invalid');
  if (!address) throw badRequest('Address is required');

  return {
    type,
    variant: String(body.variant || 'core').trim(),
    name,
    org: String(body.org || '').trim(),
    dob: String(body.dob || '').trim(),
    occupation: String(body.occupation || '').trim(),
    mobile,
    email,
    address,
    quantity
  };
}

function csvValue(value) {
  const text = String(value ?? '').replace(/\r?\n/g, ' ');
  const safeText = /^[=+\-@]/.test(text) ? `'${text}` : text;
  return `"${safeText.replace(/"/g, '""')}"`;
}

function normalizePhone(to) {
  const text = String(to || '').trim();
  if (text.startsWith('whatsapp:')) return text;
  return text.startsWith('+') ? text : `+${text}`;
}

function safeCompare(a, b) {
  const left = Buffer.from(String(a || ''));
  const right = Buffer.from(String(b || ''));
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

// Minimal CSV storage.
const ORDERS_CSV = path.join(__dirname, 'orders.csv');
if (!fs.existsSync(ORDERS_CSV)) {
  fs.writeFileSync(ORDERS_CSV, 'timestamp,type,variant,name,organization,dob,occupation,mobile,email,address,quantity,amount_rupees,razorpay_order_id,razorpay_payment_id\n');
}

const CONTACTS_CSV = path.join(__dirname, 'contacts.csv');
if (!fs.existsSync(CONTACTS_CSV)) {
  fs.writeFileSync(CONTACTS_CSV, 'timestamp,name,email,message\n');
}

function appendOrder(meta, orderId, paymentId) {
  const amountRupees = (computeUnitPaise() * meta.quantity / 100).toFixed(2);
  const row = [
    new Date().toISOString(),
    meta.type,
    meta.variant,
    meta.name,
    meta.org,
    meta.dob,
    meta.occupation,
    meta.mobile,
    meta.email,
    meta.address,
    meta.quantity,
    amountRupees,
    orderId || '',
    paymentId || ''
  ].map(csvValue).join(',') + '\n';

  fs.appendFileSync(ORDERS_CSV, row);
  return { row, amountRupees };
}

function buildOrderMessage(meta, amountRupees, orderId) {
  return [
    `Taejoon ALIF pre-book confirmed`,
    `Name: ${meta.name}`,
    `Type: ${meta.type}`,
    `Variant: ${meta.variant}`,
    `Quantity: ${meta.quantity}`,
    `Amount: INR ${amountRupees}`,
    `Order: ${orderId || 'pending'}`
  ].join('\n');
}

async function sendOrderNotifications(meta, amountRupees, orderId, row) {
  const customerMessage = buildOrderMessage(meta, amountRupees, orderId);
  const adminMessage = `${customerMessage}\n\nCSV row:\n${row}`;

  await Promise.allSettled([
    sendEmail(CONTACT_EMAIL, `New pre-book order from ${meta.name}`, adminMessage),
    sendEmail(meta.email, 'Your Taejoon ALIF pre-book confirmation', customerMessage),
    sendSms(meta.mobile, customerMessage),
    sendWhatsapp(meta.mobile, customerMessage)
  ]);
}

function normalizeContact(body = {}) {
  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const message = String(body.message || '').trim();

  if (!name) throw badRequest('Name is required');
  if (!EMAIL_PATTERN.test(email)) throw badRequest('Email is invalid');
  if (!message) throw badRequest('Message is required');

  return { name, email, message };
}

function appendContact(contact) {
  const row = [
    new Date().toISOString(),
    contact.name,
    contact.email,
    contact.message
  ].map(csvValue).join(',') + '\n';

  fs.appendFileSync(CONTACTS_CSV, row);
  return row;
}

app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'taejoon-api' });
});

const USERS_JSON = path.join(__dirname, 'users.json');
const SHOP_ORDERS_CSV = path.join(__dirname, 'shop-orders.csv');
if (!fs.existsSync(USERS_JSON)) fs.writeFileSync(USERS_JSON, '[]');
if (!fs.existsSync(SHOP_ORDERS_CSV)) fs.writeFileSync(SHOP_ORDERS_CSV, 'timestamp,order_id,email,total,status\n');
const SHOP_PRODUCTS = [
  { id: 'core', name: 'ALIF Core', category: 'dictionary', price: 4249, stock: 48 },
  { id: 'vision', name: 'ALIF Vision', category: 'camera', price: 5949, stock: 31 },
  { id: 'voice', name: 'ALIF Voice', category: 'voice', price: 5099, stock: 22 },
  { id: 'solar', name: 'ALIF Solar', category: 'solar', price: 6799, stock: 16 },
  { id: 'mini', name: 'ALIF Mini', category: 'dictionary', price: 3399, stock: 54 },
  { id: 'pro', name: 'ALIF Pro', category: 'camera', price: 8499, stock: 9 }
];
const tokenSecret = process.env.JWT_SECRET || RAZORPAY_KEY_SECRET || 'local-development-secret';
function issueToken(user) {
  const payload = Buffer.from(JSON.stringify({ sub: user.id, email: user.email, exp: Date.now() + 86400000 })).toString('base64url');
  const signature = crypto.createHmac('sha256', tokenSecret).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}
app.get('/api/products', (req, res) => res.json({ ok: true, products: SHOP_PRODUCTS }));
app.post('/api/auth/register', (req, res) => {
  const name = String(req.body.name || '').trim(), email = String(req.body.email || '').trim().toLowerCase(), password = String(req.body.password || '');
  if (!name || !EMAIL_PATTERN.test(email) || password.length < 8) return res.status(400).json({ message: 'Use a valid name, email and password of at least 8 characters' });
  const users = JSON.parse(fs.readFileSync(USERS_JSON, 'utf8'));
  if (users.some(user => user.email === email)) return res.status(409).json({ message: 'An account already exists for this email' });
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 120000, 32, 'sha256').toString('hex');
  const user = { id: crypto.randomUUID(), name, email, salt, hash, createdAt: new Date().toISOString() };
  users.push(user); fs.writeFileSync(USERS_JSON, JSON.stringify(users, null, 2));
  res.status(201).json({ ok: true, token: issueToken(user), user: { name, email } });
});
app.post('/api/auth/login', (req, res) => {
  const email = String(req.body.email || '').trim().toLowerCase(), password = String(req.body.password || '');
  const users = JSON.parse(fs.readFileSync(USERS_JSON, 'utf8')), user = users.find(item => item.email === email);
  if (!user) return res.status(401).json({ message: 'Email or password is incorrect' });
  const hash = crypto.pbkdf2Sync(password, user.salt, 120000, 32, 'sha256').toString('hex');
  if (!safeCompare(hash, user.hash)) return res.status(401).json({ message: 'Email or password is incorrect' });
  res.json({ ok: true, token: issueToken(user), user: { name: user.name, email } });
});
app.post('/api/shop/orders', (req, res) => {
  const email = String(req.body.email || '').trim(), items = Array.isArray(req.body.items) ? req.body.items : [];
  if (!EMAIL_PATTERN.test(email) || !items.length) return res.status(400).json({ message: 'Email and cart items are required' });
  const total = items.reduce((sum, id) => sum + (SHOP_PRODUCTS.find(product => product.id === id)?.price || 0), 0);
  const orderId = `TJ${Date.now().toString().slice(-8)}`;
  fs.appendFileSync(SHOP_ORDERS_CSV, [new Date().toISOString(), orderId, email, total, 'confirmed'].map(csvValue).join(',') + '\n');
  res.status(201).json({ ok: true, orderId, total });
});

app.get('/api/create-order', (req, res) => {
  res.status(405).json({
    ok: false,
    message: 'Use the pre-book form to submit this endpoint with POST.'
  });
});

app.post('/api/create-order', async (req, res) => {
  try {
    if (!PREBOOK_ENABLED) {
      return res.status(503).json({ message: 'Pre-booking is not open yet' });
    }

    const body = normalizeOrder(req.body);
    const amount = computeUnitPaise() * body.quantity;

    if (!razor) {
      return res.json({
        orderId: `order_fake_${Date.now()}`,
        amount,
        currency: 'INR',
        keyId: '',
        mock: true
      });
    }

    const order = await razor.orders.create({
      amount,
      currency: 'INR',
      receipt: `rcpt_${Date.now()}`,
      payment_capture: 1
    });

    return res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: RAZORPAY_KEY_ID
    });
  } catch (err) {
    console.error(err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
});

app.post('/api/verify', async (req, res) => {
  try {
    if (!PREBOOK_ENABLED) {
      return res.status(503).json({ ok: false, message: 'Pre-booking is not open yet' });
    }

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, meta } = req.body;
    const normalizedMeta = normalizeOrder(meta);

    if (!RAZORPAY_KEY_SECRET) {
      const { row } = appendOrder(normalizedMeta, razorpay_order_id, razorpay_payment_id);
      const amountRupees = (computeUnitPaise() * normalizedMeta.quantity / 100).toFixed(2);
      sendOrderNotifications(normalizedMeta, amountRupees, razorpay_order_id, row).catch((err) => console.error(err));
      return res.json({ ok: true });
    }

    const generatedSignature = crypto
      .createHmac('sha256', RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (!safeCompare(generatedSignature, razorpay_signature)) {
      return res.status(400).json({ ok: false, message: 'Signature mismatch' });
    }

    const { row, amountRupees } = appendOrder(normalizedMeta, razorpay_order_id, razorpay_payment_id);
    sendOrderNotifications(normalizedMeta, amountRupees, razorpay_order_id, row).catch((err) => console.error(err));

    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(err.statusCode || 500).json({ ok: false, message: err.message });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const contact = normalizeContact(req.body);
    const row = appendContact(contact);
    const message = [
      'New Taejoon website inquiry',
      `Name: ${contact.name}`,
      `Email: ${contact.email}`,
      '',
      contact.message,
      '',
      `CSV row: ${row}`
    ].join('\n');

    await sendEmail(CONTACT_EMAIL, `Website inquiry from ${contact.name}`, message);
    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(err.statusCode || 500).json({ ok: false, message: err.message });
  }
});

app.get('/admin/orders.csv', (req, res) => {
  if (!fs.existsSync(ORDERS_CSV)) return res.status(404).send('No orders yet');
  res.download(ORDERS_CSV);
});

app.get('/admin/contacts.csv', (req, res) => {
  if (!fs.existsSync(CONTACTS_CSV)) return res.status(404).send('No contacts yet');
  res.download(CONTACTS_CSV);
});

async function sendEmail(to, subject, text) {
  const transportUrl = process.env.SMTP_URL;
  if (!transportUrl) return Promise.resolve();
  const transporter = nodemailer.createTransport(transportUrl);
  return transporter.sendMail({ from: process.env.EMAIL_FROM || CONTACT_EMAIL, to, subject, text });
}

async function sendTwilioMessage(to, from, body) {
  if (SMS_PROVIDER !== 'twilio' || !TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !from) {
    return Promise.resolve();
  }

  const auth = Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString('base64');
  const params = new URLSearchParams({ To: normalizePhone(to), From: from, Body: body });
  const url = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Twilio message failed: ${message}`);
  }
}

async function sendSms(to, body) {
  return sendTwilioMessage(to, TWILIO_SMS_FROM, body);
}

async function sendWhatsapp(to, body) {
  if (!TWILIO_WHATSAPP_FROM) return Promise.resolve();
  return sendTwilioMessage(`whatsapp:${normalizePhone(to)}`, TWILIO_WHATSAPP_FROM, body);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server listening on', PORT));
