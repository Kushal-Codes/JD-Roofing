import type { IncomingMessage, ServerResponse } from 'http';
import {
  validateFullQuoteDraft,
  normalizeUkPostcode,
  isValidUkPhone,
  isValidEmail,
} from '../src/utils/validation';

interface VercelRequest extends IncomingMessage {
  body?: Record<string, unknown> | string;
}

interface VercelResponse extends ServerResponse {
  status?: (code: number) => VercelResponse;
  json?: (data: unknown) => VercelResponse;
}

function sendJson(res: VercelResponse, statusCode: number, payload: unknown) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

async function parseRequestBody(req: VercelRequest): Promise<Record<string, unknown>> {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }
  if (typeof req.body === 'string' && req.body.trim().length > 0) {
    try {
      return JSON.parse(req.body) as Record<string, unknown>;
    } catch {
      return {};
    }
  }
  return new Promise((resolve) => {
    let raw = '';
    req.on('data', (chunk: Buffer | string) => {
      raw += chunk.toString();
    });
    req.on('end', () => {
      if (!raw) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(raw) as Record<string, unknown>);
      } catch {
        resolve({});
      }
    });
    req.on('error', () => resolve({}));
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    sendJson(res, 405, { ok: false, error: 'Method Not Allowed' });
    return;
  }

  const body = await parseRequestBody(req);

  if (body.honeypot && String(body.honeypot).trim().length > 0) {
    sendJson(res, 200, {
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
      sendJson(res, 400, { ok: false, error: 'Please enter your name.' });
      return;
    }
    if (!isValidUkPhone(phone)) {
      sendJson(res, 400, {
        ok: false,
        error: 'Please enter a valid UK phone number (e.g. 07512 781329).',
      });
      return;
    }
    if (message.length < 5) {
      sendJson(res, 400, {
        ok: false,
        error: 'Please include a brief note about how we can help.',
      });
      return;
    }

    const refNum = Math.floor(1000 + Math.random() * 9000);
    const referenceId = `JPD-CB-${refNum}`;
    const createdAt = new Date().toISOString();

    sendJson(res, 201, {
      ok: true,
      referenceId,
      createdAt,
      postcode,
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
    sendJson(res, 400, {
      ok: false,
      error: firstError || 'Please check the form fields and try again.',
      errors: validationErrors,
    });
    return;
  }

  const rawPhotos = Array.isArray(body.photos) ? body.photos.slice(0, 3) : [];
  const refNum = Math.floor(10000 + Math.random() * 90000);
  const referenceId = `JPD-${new Date().getFullYear()}-${refNum}`;
  const createdAt = new Date().toISOString();

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
          photoCount: rawPhotos.length,
        }),
      });
      webhookForwarded = whRes.ok;
    } catch {
      webhookForwarded = false;
    }
  }

  sendJson(res, 201, {
    ok: true,
    referenceId,
    createdAt,
    webhookForwarded,
    summary: {
      serviceNeeded: draft.serviceNeeded,
      postcode: draft.postcode,
      propertyType: draft.propertyType,
      urgency: draft.urgency,
      preferredContact: draft.preferredContact,
      photoCount: rawPhotos.length,
    },
  });
}
