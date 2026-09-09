import 'dotenv/config';
import express from 'express';
import nodemailer from 'nodemailer';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const port = Number(process.env.PORT || 3001);
const recipient = 'aglcreatives@gmail.com';

app.use(express.json({ limit: '32kb' }));

const clean = (value: unknown, maxLength = 4000) => typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character] || character));
const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const createTransport = () => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) return null;
  const smtpPort = Number(SMTP_PORT);
  if (!Number.isInteger(smtpPort) || smtpPort < 1 || smtpPort > 65535) return null;
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: smtpPort,
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
};

const sendInquiry = async (subject: string, fields: Array<[string, string]>) => {
  const transport = createTransport();
  if (!transport) throw new Error('Email delivery is not configured.');
  const rows = fields.map(([label, value]) => `<tr><td style="padding:10px 14px;border-bottom:1px solid #e7e1d8;color:#31574f;font-weight:700;vertical-align:top">${escapeHtml(label)}</td><td style="padding:10px 14px;border-bottom:1px solid #e7e1d8;color:#173b35;white-space:pre-wrap">${escapeHtml(value || 'Not provided')}</td></tr>`).join('');
  await transport.sendMail({
    from: process.env.MAIL_FROM || process.env.SMTP_USER,
    to: recipient,
    replyTo: fields.find(([label]) => label === 'Email')?.[1] || undefined,
    subject,
    text: fields.map(([label, value]) => `${label}: ${value || 'Not provided'}`).join('\n'),
    html: `<div style="max-width:680px;margin:0 auto;font-family:Arial,sans-serif;background:#fffdf8;color:#173b35"><div style="padding:26px 30px;background:#31574f;color:#fff"><p style="margin:0;color:#ffb35c;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase">AGL Creatives</p><h1 style="margin:10px 0 0;font-size:24px">${escapeHtml(subject)}</h1></div><div style="padding:24px 30px"><table style="border-collapse:collapse;width:100%;font-size:14px">${rows}</table></div><div style="padding:16px 30px;background:#f2eee7;color:#5f6b63;font-size:12px">Submitted from the AGL Creatives website.</div></div>`,
  });
};

app.post('/api/inquiries/quote', async (req, res) => {
  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const name = clean(body.name, 120);
  const email = clean(body.email, 180);
  const company = clean(body.company, 180);
  const quantity = clean(body.quantity, 120);
  const requirements = clean(body.requirements, 4000);
  if (!name || !isEmail(email) || !quantity || !requirements) return res.status(400).json({ message: 'Please complete all required fields.' });
  try {
    await sendInquiry(`New quote request from ${name}`, [['Full name', name], ['Email', email], ['Company / brand', company], ['Expected quantity', quantity], ['Requirements', requirements]]);
    res.status(201).json({ message: 'Quote request sent.' });
  } catch (error) {
    console.error('Quote inquiry email failed:', error);
    res.status(503).json({ message: 'We could not send your request right now. Please call +91 7982214262.' });
  }
});

app.post('/api/inquiries/contact', async (req, res) => {
  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const name = clean(body.fullName, 120);
  const email = clean(body.email, 180);
  const phone = clean(body.phone, 60);
  const projectType = clean(body.projectType, 120);
  const message = clean(body.message, 4000);
  if (!name || !isEmail(email) || !message) return res.status(400).json({ message: 'Please complete all required fields.' });
  try {
    await sendInquiry(`New contact inquiry from ${name}`, [['Full name', name], ['Email', email], ['Phone', phone], ['Project type', projectType], ['Project details', message]]);
    res.status(201).json({ message: 'Contact inquiry sent.' });
  } catch (error) {
    console.error('Contact inquiry email failed:', error);
    res.status(503).json({ message: 'We could not send your request right now. Please call +91 7982214262.' });
  }
});

app.post('/api/newsletter', async (req, res) => {
  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const email = clean(body.email, 180);
  if (!isEmail(email)) return res.status(400).json({ message: 'Please enter a valid email address.' });
  try {
    await sendInquiry(`New newsletter subscription: ${email}`, [['Subscriber email', email], ['Subscription type', 'Website newsletter']]);
    res.status(201).json({ message: 'Subscription received.' });
  } catch (error) {
    console.error('Newsletter email failed:', error);
    res.status(503).json({ message: 'We could not complete the subscription right now. Please try again later.' });
  }
});

app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (error instanceof SyntaxError && 'body' in error) {
    return res.status(400).json({ message: 'Please send a valid JSON request.' });
  }

  console.error('Unhandled API error:', error);
  return res.status(500).json({ message: 'Our inquiry service is temporarily unavailable. Please try again later.' });
});

// Serve the single-page app for direct links such as /request-quote.
// API routes above remain available, while React Router handles page routing.
const root = path.dirname(fileURLToPath(import.meta.url));
const distDirectory = path.join(root, 'dist');
app.use(express.static(distDirectory));
app.get('*', (_req, res) => res.sendFile(path.join(distDirectory, 'index.html')));

app.listen(port, () => console.log(`AGL inquiry server listening on http://localhost:${port}`));
