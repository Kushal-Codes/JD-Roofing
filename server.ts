import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import {
  validateFullQuoteDraft,
  normalizeUkPostcode,
  isValidUkPhone,
  isValidEmail,
} from './src/utils/validation.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface StoredEnquiry {
  referenceId: string;
  createdAt: string;
  type: 'quote' | 'callback';
  serviceNeeded: string;
  postcode: string;
  propertyType: string;
  problemDescription: string;
  urgency: string;
  fullName: string;
  phone: string;
  email: string;
  preferredContact: string;
  photoCount: number;
  photoMetadata: Array<{ name: string; type: string; sizeBytes: number }>;
  webhookForwarded: boolean;
}

const DATA_DIR = path.join(__dirname, '.data');
const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json');

function loadStoredEnquiries(): StoredEnquiry[] {
  try {
    if (fs.existsSync(ENQUIRIES_FILE)) {
      const raw = fs.readFileSync(ENQUIRIES_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // Ignore read error and start fresh
  }
  return [];
}

function saveStoredEnquiry(record: StoredEnquiry, privatePhotos?: Array<{ name: string; type: string; sizeBytes: number; dataUrl?: string }>) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const existing = loadStoredEnquiries();
    existing.unshift(record);
    fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(existing.slice(0, 200), null, 2), 'utf-8');

    // Store private photo attachments separately if provided, never exposed via public GET routes
    if (privatePhotos && privatePhotos.length > 0) {
      const privateDir = path.join(DATA_DIR, 'private_uploads');
      if (!fs.existsSync(privateDir)) {
        fs.mkdirSync(privateDir, { recursive: true });
      }
      fs.writeFileSync(
        path.join(privateDir, `${record.referenceId}.json`),
        JSON.stringify({ referenceId: record.referenceId, uploadedAt: record.createdAt, photos: privatePhotos }, null, 2),
        'utf-8'
      );
    }
  } catch (err) {
    console.error('Failed to persist enquiry locally:', err);
  }
}

// Simple IP rate-limit map to prevent spam
const rateLimitMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes
  const maxRequests = 12;
  const recent = (rateLimitMap.get(ip) || []).filter((ts) => now - ts < windowMs);
  if (recent.length >= maxRequests) {
    return true;
  }
  recent.push(now);
  rateLimitMap.set(ip, recent);
  return false;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '18mb' }));

  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      business: 'JPD Roofing Ltd',
      webhookConfigured: Boolean(process.env.ENQUIRY_WEBHOOK_URL),
      notificationEmail: process.env.OWNER_NOTIFICATION_EMAIL || 'jpdroofingltd@outlook.com',
    });
  });

  // Public summary of submitted enquiries in this environment (without private contact/photo payloads)
  app.get('/api/enquiries/summary', (_req, res) => {
    const items = loadStoredEnquiries().slice(0, 10).map((item) => ({
      referenceId: item.referenceId,
      createdAt: item.createdAt,
      type: item.type,
      serviceNeeded: item.serviceNeeded,
      outwardPostcode: item.postcode.split(' ')[0] || item.postcode,
      propertyType: item.propertyType,
      urgency: item.urgency,
      photoCount: item.photoCount,
    }));
    res.json({ count: items.length, recentEnquiries: items });
  });

  app.post('/api/enquiries', async (req, res) => {
    const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
    if (isRateLimited(clientIp)) {
      res.status(429).json({
        ok: false,
        error: 'Too many requests submitted recently. Please call 07512 781329 directly for immediate assistance.',
      });
      return;
    }

    const body = req.body || {};

    // Honeypot check
    if (body.honeypot && String(body.honeypot).trim().length > 0) {
      res.status(200).json({
        ok: true,
        referenceId: 'JPD-FILTERED',
        message: 'Enquiry received.',
      });
      return;
    }

    const enquiryType = body.type === 'callback' ? 'callback' : 'quote';

    if (enquiryType === 'callback') {
      const fullName = String(body.fullName || '').trim();
      const phone = String(body.phone || '').trim();
      const message = String(body.problemDescription || '').trim();
      const postcode = normalizeUkPostcode(String(body.postcode || 'BB5'));

      if (fullName.length < 2) {
        res.status(400).json({ ok: false, error: 'Please enter your name.' });
        return;
      }
      if (!isValidUkPhone(phone)) {
        res.status(400).json({ ok: false, error: 'Please enter a valid UK phone number (e.g. 07512 781329).' });
        return;
      }
      if (message.length < 5) {
        res.status(400).json({ ok: false, error: 'Please include a brief note about how we can help.' });
        return;
      }

      const refNum = Math.floor(1000 + Math.random() * 9000);
      const referenceId = `JPD-CB-${refNum}`;
      const record: StoredEnquiry = {
        referenceId,
        createdAt: new Date().toISOString(),
        type: 'callback',
        serviceNeeded: String(body.serviceNeeded || 'General Roofing Callback'),
        postcode: postcode || 'Accrington Area',
        propertyType: 'Not Specified',
        problemDescription: message,
        urgency: String(body.urgency || 'Standard Callback'),
        fullName,
        phone,
        email: String(body.email || '').trim(),
        preferredContact: 'Phone Call',
        photoCount: 0,
        photoMetadata: [],
        webhookForwarded: false,
      };

      saveStoredEnquiry(record);
      res.status(201).json({
        ok: true,
        referenceId,
        createdAt: record.createdAt,
        message: 'Your callback request has been logged for Jordan and the JPD Roofing team.',
      });
      return;
    }

    const draft = {
      serviceNeeded: String(body.serviceNeeded || ''),
      postcode: normalizeUkPostcode(String(body.postcode || '')),
      propertyType: String(body.propertyType || ''),
      problemDescription: String(body.problemDescription || ''),
      urgency: String(body.urgency || ''),
      fullName: String(body.fullName || ''),
      phone: String(body.phone || ''),
      email: String(body.email || ''),
      preferredContact: String(body.preferredContact || 'Phone Call'),
      consentGiven: Boolean(body.consentGiven),
    };

    const validationErrors = validateFullQuoteDraft(draft);
    if (Object.keys(validationErrors).length > 0) {
      const firstError = Object.values(validationErrors)[0];
      res.status(400).json({
        ok: false,
        error: firstError || 'Please check the form fields and try again.',
        errors: validationErrors,
      });
      return;
    }

    const rawPhotos = Array.isArray(body.photos) ? body.photos.slice(0, 3) : [];
    const sanitizedPhotos: Array<{ name: string; type: string; sizeBytes: number; dataUrl?: string }> = rawPhotos
      .filter((p: unknown): p is Record<string, unknown> => Boolean(p && typeof p === 'object'))
      .map((p: Record<string, unknown>) => ({
        name: String(p.name || 'roof-photo.jpg').slice(0, 120),
        type: String(p.type || 'image/jpeg'),
        sizeBytes: Number(p.size || 0),
        dataUrl: typeof p.dataUrl === 'string' && p.dataUrl.startsWith('data:image/') ? p.dataUrl : undefined,
      }));

    const refNum = Math.floor(10000 + Math.random() * 90000);
    const referenceId = `JPD-${new Date().getFullYear()}-${refNum}`;

    let webhookForwarded = false;
    if (process.env.ENQUIRY_WEBHOOK_URL && isValidEmail(draft.email)) {
      try {
        const whRes = await fetch(process.env.ENQUIRY_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            referenceId,
            business: 'JPD Roofing Ltd',
            ...draft,
            photoCount: sanitizedPhotos.length,
          }),
        });
        webhookForwarded = whRes.ok;
      } catch {
        webhookForwarded = false;
      }
    }

    const record: StoredEnquiry = {
      referenceId,
      createdAt: new Date().toISOString(),
      type: 'quote',
      serviceNeeded: draft.serviceNeeded,
      postcode: draft.postcode,
      propertyType: draft.propertyType,
      problemDescription: draft.problemDescription,
      urgency: draft.urgency,
      fullName: draft.fullName,
      phone: draft.phone,
      email: draft.email,
      preferredContact: draft.preferredContact,
      photoCount: sanitizedPhotos.length,
      photoMetadata: sanitizedPhotos.map(({ name, type, sizeBytes }) => ({ name, type, sizeBytes })),
      webhookForwarded,
    };

    saveStoredEnquiry(record, sanitizedPhotos);

    res.status(201).json({
      ok: true,
      referenceId,
      createdAt: record.createdAt,
      webhookForwarded,
      summary: {
        serviceNeeded: record.serviceNeeded,
        postcode: record.postcode,
        propertyType: record.propertyType,
        urgency: record.urgency,
        preferredContact: record.preferredContact,
        photoCount: record.photoCount,
      },
    });
  });

  let viteMiddleware: express.RequestHandler | null = null;
  const distPath = path.join(__dirname, 'dist');

  if (process.env.NODE_ENV !== 'production') {
    app.use((req, res, next) => {
      if (viteMiddleware) {
        return viteMiddleware(req, res, next);
      }
      // Fallback to built dist assets during the brief moment Vite initializes
      if (fs.existsSync(distPath)) {
        return express.static(distPath)(req, res, () => {
          const indexFile = path.join(distPath, 'index.html');
          if (fs.existsSync(indexFile)) {
            res.sendFile(indexFile);
          } else {
            next();
          }
        });
      }
      next();
    });
  } else {
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`JPD Roofing Ltd server running on http://localhost:${PORT}`);
  });

  if (process.env.NODE_ENV !== 'production') {
    try {
      const { createServer: createViteServer } = await import('vite');
      const vite = await createViteServer({
        server: {
          middlewareMode: true,
          hmr: process.env.DISABLE_HMR !== 'true',
          watch: process.env.DISABLE_HMR === 'true' ? null : {},
        },
        appType: 'spa',
      });
      viteMiddleware = vite.middlewares;
    } catch (err) {
      console.error('Vite middleware initialization error:', err);
    }
  }
}

startServer();
