import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

const app = express();
const port = process.env.PORT || 5174;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = process.env.DATA_DIR || __dirname;
const uploadsDir = path.join(dataDir, 'uploads');
const ordersDir = path.join(dataDir, 'orders');
const notifyWebhookUrl = process.env.NOTIFY_WEBHOOK_URL || '';
const notifyWebhookToken = process.env.NOTIFY_WEBHOOK_TOKEN || '';
const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN || '';
const telegramChatId = process.env.TELEGRAM_CHAT_ID || '';
const emailTo = process.env.EMAIL_TO || 'saadbarghouth11@gmail.com';
const emailFrom = process.env.EMAIL_FROM || '';
const emailReplyTo = process.env.EMAIL_REPLY_TO || '';
const smtpHost = process.env.SMTP_HOST || '';
const smtpPort = Number(process.env.SMTP_PORT || 587);
const smtpUser = process.env.SMTP_USER || '';
const smtpPass = process.env.SMTP_PASS || '';
const smtpSecure = String(process.env.SMTP_SECURE || '').toLowerCase() === 'true';
const aiProvider = (process.env.AI_PROVIDER || 'auto').toLowerCase();
const claudeApiKey = process.env.CLAUDE_API_KEY || '';
const openaiApiKey = process.env.OPENAI_API_KEY || '';
const geminiApiKey = process.env.GEMINI_API_KEY || '';
const claudeModel = process.env.CLAUDE_MODEL || 'claude-3-5-sonnet-20240620';
const openaiModel = process.env.OPENAI_MODEL || 'gpt-4o-mini';
const geminiModel = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
const aiMaxTokens = Number(process.env.AI_MAX_TOKENS || 700);

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
if (!fs.existsSync(ordersDir)) {
  fs.mkdirSync(ordersDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    cb(null, `${Date.now()}-${safeName}`);
  }
});

const upload = multer({ storage });

const corsOrigin = process.env.CORS_ORIGIN || '*';
app.use(cors({ origin: corsOrigin }));
app.use(express.json({ limit: '2mb' }));
app.use('/uploads', express.static(uploadsDir));

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/chat', async (req, res) => {
  const message = String(req.body && req.body.message ? req.body.message : '').trim();
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }
  const history = normalizeHistory(req.body && req.body.history ? req.body.history : []);
  try {
    const result = await callProviders(message, history);
    if (!result.reply) {
      return res.status(500).json({ error: 'Empty response from AI provider' });
    }
    return res.json({ reply: result.reply, provider: result.provider });
  } catch (error) {
    const messageText = error && error.message ? error.message : 'AI request failed';
    return res.status(500).json({ error: messageText });
  }
});

const buildNotificationMessage = (order) => {
  const details = order.details || {};
  const lines = [
    'New Nemora order',
    `ID: ${order.id}`,
    `Created: ${order.createdAt}`,
    `Name: ${details.name || '-'}`,
    `Phone: ${details.phone || '-'}`,
    `Address: ${details.address || '-'}`,
    `Brand: ${details.brandName || '-'}`,
    `Brand link: ${details.brandWebsite || '-'}`,
    `Brand social: ${details.brandSocial || '-'}`,
    `Quantity: ${details.quantity || '-'}`,
    `Shape: ${details.shape || '-'}`,
    `Technique: ${details.technique || '-'}`,
    `Embroidery: ${details.embroidery || '-'}`,
    `Size: ${details.size || '-'}`,
    `Color: ${details.color || '-'}`,
    `Notes: ${details.notes || '-'}`,
    `File: ${order.fileUrl}`,
    `Order: ${order.orderUrl || '-'}`
  ];
  return lines.join('\n');
};

const escapeHtml = (value) => {
  return String(value || '').replace(/[&<>"]/g, (char) => {
    if (char === '&') return '&amp;';
    if (char === '<') return '&lt;';
    if (char === '>') return '&gt;';
    return '&quot;';
  });
};

const buildEmailHtml = (order, previewCid = '') => {
  const details = order.details || {};
  const rows = [
    ['ID', order.id],
    ['Created', order.createdAt],
    ['Name', details.name || '-'],
    ['Phone', details.phone || '-'],
    ['Address', details.address || '-'],
    ['Brand', details.brandName || '-'],
    ['Brand link', details.brandWebsite || '-'],
    ['Brand social', details.brandSocial || '-'],
    ['Quantity', details.quantity || '-'],
    ['Shape', details.shape || '-'],
    ['Technique', details.technique || '-'],
    ['Embroidery', details.embroidery || '-'],
    ['Size', details.size || '-'],
    ['Color', details.color || '-'],
    ['Notes', details.notes || '-'],
    ['File', order.fileUrl ? order.fileUrl : '-'],
    ['Order', order.orderUrl || '-']
  ];
  const rowHtml = rows
    .map(([label, value]) => {
      const isLink = label === 'File' || label === 'Order';
      const safeValue = escapeHtml(value);
      const cell = isLink && value && value !== '-' ? `<a href="${safeValue}">${safeValue}</a>` : safeValue;
      return `<tr><td style="padding:6px 10px;color:#6b7280;font-weight:600;">${escapeHtml(label)}</td><td style="padding:6px 10px;color:#111827;">${cell}</td></tr>`;
    })
    .join('');
  const previewHtml = previewCid
    ? `
        <div style="margin-top:16px;">
          <div style="margin-bottom:8px;color:#6b7280;font-weight:600;">Design preview</div>
          <img src="cid:${escapeHtml(previewCid)}" alt="Design preview" style="max-width:100%; border-radius:12px; border:1px solid #e5e7eb;" />
        </div>
      `
    : '';
  return `
    <div style="font-family:Arial, sans-serif; background:#f8fafc; padding:24px;">
      <div style="max-width:680px; margin:0 auto; background:#ffffff; border-radius:12px; padding:24px; border:1px solid #e5e7eb;">
        <h2 style="margin:0 0 16px; color:#111827;">New Nemora order</h2>
        <table style="width:100%; border-collapse:collapse;">
          ${rowHtml}
        </table>
        ${previewHtml}
      </div>
    </div>
  `;
};

const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp']);

const resolveUploadPath = (fileUrl) => {
  if (!fileUrl) return '';
  const rawUrl = String(fileUrl);
  let pathname = rawUrl;
  try {
    pathname = new URL(rawUrl).pathname;
  } catch (error) {
    pathname = rawUrl;
  }
  const baseName = path.basename(pathname);
  if (!baseName) return '';
  return path.join(uploadsDir, baseName);
};

const getOrderAttachment = (order) => {
  const fileUrl = order.fileUrl;
  const localPath = resolveUploadPath(fileUrl);
  if (!localPath || !fs.existsSync(localPath)) return null;
  const ext = path.extname(localPath).toLowerCase();
  const attachment = {
    filename: order.fileName || path.basename(localPath),
    path: localPath
  };
  if (imageExtensions.has(ext)) {
    attachment.cid = `design-${order.id}`;
  }
  return attachment;
};

let emailTransporter = null;
const getEmailTransporter = () => {
  if (!smtpHost) return null;
  if (!emailTransporter) {
    const config = {
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure
    };
    if (smtpUser && smtpPass) {
      config.auth = { user: smtpUser, pass: smtpPass };
    }
    emailTransporter = nodemailer.createTransport(config);
  }
  return emailTransporter;
};

const sendEmailNotification = async (order) => {
  const transporter = getEmailTransporter();
  if (!transporter || !emailTo) return;
  const subject = `Nemora order ${order.id}`;
  const attachment = getOrderAttachment(order);
  const previewCid = attachment && attachment.cid ? attachment.cid : '';
  const mail = {
    from: emailFrom || smtpUser || 'no-reply@nemora.com',
    to: emailTo,
    subject,
    text: buildNotificationMessage(order),
    html: buildEmailHtml(order, previewCid)
  };
  if (attachment) {
    mail.attachments = [attachment];
  }
  if (emailReplyTo) {
    mail.replyTo = emailReplyTo;
  }
  await transporter.sendMail(mail);
};

const sendNotifications = async (order) => {
  const message = buildNotificationMessage(order);
  const tasks = [];

  if (notifyWebhookUrl) {
    const headers = {
      'Content-Type': 'application/json'
    };
    if (notifyWebhookToken) {
      headers.Authorization = `Bearer ${notifyWebhookToken}`;
    }
    tasks.push(fetch(notifyWebhookUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({ text: message, order })
    }));
  }

  if (telegramBotToken && telegramChatId) {
    tasks.push(fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: telegramChatId,
        text: message
      })
    }));
  }

  tasks.push(sendEmailNotification(order));

  if (tasks.length) {
    await Promise.allSettled(tasks);
  }
};

const normalizeProvider = (value) => {
  const key = String(value || '').toLowerCase();
  if (['openai', 'gpt', 'chatgpt'].includes(key)) return 'openai';
  if (['claude', 'anthropic'].includes(key)) return 'claude';
  if (['gemini', 'google'].includes(key)) return 'gemini';
  return 'auto';
};

const systemPrompt = [
  'You are Nemora AI assistant for a fashion and apparel brand.',
  'Answer the user question clearly and helpfully.',
  'Always respond in two sections labeled "Arabic:" and "English:".',
  'Keep both sections consistent and concise.'
].join(' ');

const normalizeHistory = (history) => {
  if (!Array.isArray(history)) return [];
  return history
    .slice(-6)
    .map((item) => {
      const role = item && item.role === 'assistant' ? 'assistant' : 'user';
      const content = String(item && item.content ? item.content : '').trim();
      return { role, content };
    })
    .filter((item) => item.content.length > 0);
};

const callClaude = async (message, history) => {
  if (!claudeApiKey) throw new Error('Claude API key missing');
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': claudeApiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: claudeModel,
      max_tokens: aiMaxTokens,
      temperature: 0.6,
      system: systemPrompt,
      messages: [...history, { role: 'user', content: message }]
    })
  });
  const data = await response.json();
  if (!response.ok) {
    const errorMessage = data && data.error && data.error.message ? data.error.message : 'Claude request failed';
    throw new Error(errorMessage);
  }
  const text = data && Array.isArray(data.content) ? data.content.map((part) => part.text || '').join('') : '';
  return text.trim();
};

const callOpenAI = async (message, history) => {
  if (!openaiApiKey) throw new Error('OpenAI API key missing');
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${openaiApiKey}`
    },
    body: JSON.stringify({
      model: openaiModel,
      temperature: 0.6,
      max_tokens: aiMaxTokens,
      messages: [
        { role: 'system', content: systemPrompt },
        ...history,
        { role: 'user', content: message }
      ]
    })
  });
  const data = await response.json();
  if (!response.ok) {
    const errorMessage = data && data.error && data.error.message ? data.error.message : 'OpenAI request failed';
    throw new Error(errorMessage);
  }
  const text = data && data.choices && data.choices[0] && data.choices[0].message ? data.choices[0].message.content : '';
  return String(text || '').trim();
};

const callGemini = async (message, history) => {
  if (!geminiApiKey) throw new Error('Gemini API key missing');
  const contents = [
    ...history.map((item) => ({
      role: item.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: item.content }]
    })),
    { role: 'user', parts: [{ text: message }] }
  ];
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${geminiApiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      systemInstruction: { parts: [{ text: systemPrompt }] },
      generationConfig: {
        temperature: 0.6,
        maxOutputTokens: aiMaxTokens
      }
    })
  });
  const data = await response.json();
  if (!response.ok) {
    const errorMessage = data && data.error && data.error.message ? data.error.message : 'Gemini request failed';
    throw new Error(errorMessage);
  }
  const parts = data && data.candidates && data.candidates[0] && data.candidates[0].content ? data.candidates[0].content.parts : [];
  const text = Array.isArray(parts) ? parts.map((part) => part.text || '').join('') : '';
  return text.trim();
};

const getProviderSequence = () => {
  const preferred = normalizeProvider(aiProvider);
  if (preferred !== 'auto') return [preferred];
  return ['claude', 'openai', 'gemini'];
};

const callProviders = async (message, history) => {
  const sequence = getProviderSequence();
  let lastError = null;
  for (const provider of sequence) {
    try {
      if (provider === 'claude') return { provider, reply: await callClaude(message, history) };
      if (provider === 'openai') return { provider, reply: await callOpenAI(message, history) };
      if (provider === 'gemini') return { provider, reply: await callGemini(message, history) };
    } catch (error) {
      lastError = error;
    }
  }
  if (lastError) {
    throw lastError;
  }
  throw new Error('No AI provider configured');
};

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const publicBase = process.env.PUBLIC_URL || `${req.protocol}://${req.get('host')}`;
  const url = `${publicBase}/uploads/${req.file.filename}`;
  return res.json({ url, filename: req.file.originalname });
});

app.post('/orders', (req, res) => {
  const { fileUrl, fileName, details } = req.body || {};
  if (!fileUrl || !details) {
    return res.status(400).json({ error: 'Missing order data' });
  }
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const publicBase = process.env.PUBLIC_URL || `${req.protocol}://${req.get('host')}`;
  const orderUrl = `${publicBase}/orders/${id}`;
  const order = {
    id,
    fileUrl,
    fileName: fileName || '',
    details,
    orderUrl,
    createdAt: new Date().toISOString()
  };
  const orderPath = path.join(ordersDir, `${id}.json`);
  fs.writeFileSync(orderPath, JSON.stringify(order, null, 2), 'utf-8');
  sendNotifications(order).catch((error) => {
    console.error('Notification failed', error);
  });
  return res.json({ id, url: orderUrl });
});

app.get('/orders/:id', (req, res) => {
  const orderPath = path.join(ordersDir, `${req.params.id}.json`);
  if (!fs.existsSync(orderPath)) {
    return res.status(404).send('Order not found');
  }
  const order = JSON.parse(fs.readFileSync(orderPath, 'utf-8'));
  const safe = (value) => String(value || '').replace(/[<>]/g, '');
  const details = order.details || {};
  const html = `
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Nemora Order ${safe(order.id)}</title>
        <style>
          body { font-family: Arial, sans-serif; background: #0b1220; color: #f8fafc; padding: 24px; }
          .card { max-width: 720px; margin: 0 auto; background: #111827; border-radius: 16px; padding: 24px; }
          h1 { margin: 0 0 16px; }
          .row { margin-bottom: 10px; color: #cbd5f5; }
          a { color: #60a5fa; }
          img { max-width: 100%; border-radius: 12px; margin-top: 16px; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>Nemora Order</h1>
          <div class="row"><strong>ID:</strong> ${safe(order.id)}</div>
          <div class="row"><strong>Created:</strong> ${safe(order.createdAt)}</div>
          <div class="row"><strong>Name:</strong> ${safe(details.name)}</div>
          <div class="row"><strong>Phone:</strong> ${safe(details.phone)}</div>
          <div class="row"><strong>Address:</strong> ${safe(details.address)}</div>
          <div class="row"><strong>Brand:</strong> ${safe(details.brandName)}</div>
          <div class="row"><strong>Brand link:</strong> ${safe(details.brandWebsite)}</div>
          <div class="row"><strong>Brand social:</strong> ${safe(details.brandSocial)}</div>
          <div class="row"><strong>Quantity:</strong> ${safe(details.quantity)}</div>
          <div class="row"><strong>Shape:</strong> ${safe(details.shape)}</div>
          <div class="row"><strong>Technique:</strong> ${safe(details.technique)}</div>
          <div class="row"><strong>Embroidery:</strong> ${safe(details.embroidery)}</div>
          <div class="row"><strong>Size:</strong> ${safe(details.size)}</div>
          <div class="row"><strong>Color:</strong> ${safe(details.color)}</div>
          <div class="row"><strong>Notes:</strong> ${safe(details.notes)}</div>
          <div class="row"><strong>File:</strong> <a href="${safe(order.fileUrl)}">${safe(order.fileName || order.fileUrl)}</a></div>
          <div class="row"><strong>Order:</strong> <a href="${safe(order.orderUrl)}">${safe(order.orderUrl)}</a></div>
          <img src="${safe(order.fileUrl)}" alt="Design preview" />
        </div>
      </body>
    </html>
  `;
  return res.set('Content-Type', 'text/html').send(html);
});

app.listen(port, () => {
  console.log(`Upload server listening on ${port}`);
});
