export interface QuoteFormDraft {
  serviceNeeded: string;
  postcode: string;
  propertyType: string;
  problemDescription: string;
  urgency: string;
  fullName: string;
  phone: string;
  email: string;
  preferredContact: string;
  consentGiven: boolean;
  honeypot?: string;
}

export interface ValidationErrors {
  serviceNeeded?: string;
  postcode?: string;
  propertyType?: string;
  problemDescription?: string;
  urgency?: string;
  fullName?: string;
  phone?: string;
  email?: string;
  preferredContact?: string;
  consentGiven?: string;
  photos?: string;
}

export interface PostcodeCoverageResult {
  valid: boolean;
  formattedPostcode: string;
  outwardCode: string;
  tier: 'primary' | 'secondary' | 'enquiry' | 'invalid';
  areaName: string;
  message: string;
}

const UK_POSTCODE_REGEX = /^([A-Z]{1,2}\d[A-Z\d]?)\s*(\d[A-Z]{2})?$/i;
const UK_OUTWARD_ONLY_REGEX = /^([A-Z]{1,2}\d[A-Z\d]?)$/i;

const PRIMARY_PREFIXES: Record<string, string> = {
  BB5: 'Accrington & Oswaldtwistle (Home Base)',
  BB1: 'Blackburn East & Rishton',
  BB2: 'Blackburn West & Mellor',
  BB3: 'Darwen & Lower Eccleshill',
  BB4: 'Rossendale, Haslingden & Rawtenstall',
  BB6: 'Great Harwood, Langho & Ribble Valley',
  BB7: 'Clitheroe & Whalley (Ribble Valley)',
  BB8: 'Colne & Pendle',
  BB9: 'Nelson & Barrowford',
  BB10: 'Burnley East',
  BB11: 'Burnley Central',
  BB12: 'Padiham & Read',
};

const SECONDARY_PREFIXES: Record<string, string> = {
  OL11: 'Rochdale South',
  OL12: 'Rochdale North & Whitworth',
  OL13: 'Bacup',
  OL14: 'Todmorden & Calderbrook',
  OL15: 'Littleborough',
  OL16: 'Rochdale Central & Milnrow',
  WN1: 'Wigan Central',
  WN2: 'Wigan East & Hindley',
  WN3: 'Wigan South',
  WN4: 'Ashton-in-Makerfield',
  WN5: 'Wigan West & Orrell',
  WN6: 'Standish & Shevington',
  PR1: 'Preston Central',
  PR2: 'Preston North & Ribbleton',
  PR5: 'Bamber Bridge & Walton-le-Dale',
  PR6: 'Chorley',
  PR7: 'Chorley & Euxton',
  BL0: 'Ramsbottom',
  BL1: 'Bolton North',
  BL2: 'Bolton East',
  BL7: 'Turton & Edgworth',
  BL8: 'Bury North & Tottington',
  BL9: 'Bury East',
};

export function normalizeUkPostcode(raw: string): string {
  const cleaned = raw.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (!cleaned) return '';
  const fullMatch = cleaned.match(/^([A-Z]{1,2}\d[A-Z\d]?)(\d[A-Z]{2})$/);
  if (fullMatch) {
    return `${fullMatch[1]} ${fullMatch[2]}`;
  }
  return cleaned;
}

export function isValidUkPostcode(raw: string): boolean {
  const trimmed = raw.trim();
  if (!trimmed) return false;
  return UK_POSTCODE_REGEX.test(trimmed);
}

export function checkPostcodeCoverage(raw: string): PostcodeCoverageResult {
  const trimmed = raw.trim().toUpperCase();
  if (!trimmed) {
    return {
      valid: false,
      formattedPostcode: '',
      outwardCode: '',
      tier: 'invalid',
      areaName: '',
      message: 'Please enter a valid UK postcode or outward code (e.g. BB5 0LU or BB5).',
    };
  }

  const normalized = normalizeUkPostcode(trimmed);
  const fullMatch = normalized.match(/^([A-Z]{1,2}\d[A-Z\d]?)\s+(\d[A-Z]{2})$/);
  const outwardMatch = normalized.match(UK_OUTWARD_ONLY_REGEX);

  const outwardCode = fullMatch ? fullMatch[1] : outwardMatch ? outwardMatch[1] : '';

  if (!outwardCode) {
    return {
      valid: false,
      formattedPostcode: normalized,
      outwardCode: '',
      tier: 'invalid',
      areaName: '',
      message: 'Please check the postcode format (for example BB5 0LU, BB1, or OL14).',
    };
  }

  if (PRIMARY_PREFIXES[outwardCode]) {
    return {
      valid: true,
      formattedPostcode: normalized,
      outwardCode,
      tier: 'primary',
      areaName: PRIMARY_PREFIXES[outwardCode],
      message: `Core coverage area (${PRIMARY_PREFIXES[outwardCode]}). JPD Roofing Ltd regularly carries out roof repairs, re-roofs and roofline work in ${outwardCode}.`,
    };
  }

  if (SECONDARY_PREFIXES[outwardCode]) {
    return {
      valid: true,
      formattedPostcode: normalized,
      outwardCode,
      tier: 'secondary',
      areaName: SECONDARY_PREFIXES[outwardCode],
      message: `Active North West service area (${SECONDARY_PREFIXES[outwardCode]}). JPD Roofing Ltd covers ${outwardCode} for roof replacements, flat roofs and repairs.`,
    };
  }

  const letters = outwardCode.match(/^[A-Z]+/)?.[0] || '';
  if (['BB', 'OL', 'WN', 'PR', 'BL', 'M', 'LA', 'FY', 'SK'].includes(letters)) {
    return {
      valid: true,
      formattedPostcode: normalized,
      outwardCode,
      tier: 'secondary',
      areaName: `North West (${outwardCode})`,
      message: `Within our wider Lancashire & North West operating radius (${outwardCode}). Request a quote and Jordan will confirm availability for your property.`,
    };
  }

  return {
    valid: true,
    formattedPostcode: normalized,
    outwardCode,
    tier: 'enquiry',
    areaName: `UK Postcode (${outwardCode})`,
    message: `${outwardCode} is outside our immediate Accrington & East Lancashire core radius, though we can review larger projects on request.`,
  };
}

export function isValidUkPhone(raw: string): boolean {
  const digits = raw.replace(/[\s\-().]/g, '');
  if (/^0[12378]\d{8,9}$/.test(digits)) return true;
  if (/^\+44[12378]\d{8,9}$/.test(digits)) return true;
  if (/^0044[12378]\d{8,9}$/.test(digits)) return true;
  return false;
}

export function isValidEmail(raw: string): boolean {
  const trimmed = raw.trim();
  if (!trimmed) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed);
}

export function validateQuoteStep(step: number, draft: QuoteFormDraft): ValidationErrors {
  const errors: ValidationErrors = {};

  if (step === 1) {
    if (!draft.serviceNeeded || !draft.serviceNeeded.trim()) {
      errors.serviceNeeded = 'Please select the type of roofing work you need.';
    }
  }

  if (step === 2) {
    if (!draft.postcode || !isValidUkPostcode(draft.postcode)) {
      errors.postcode = 'Please enter a valid UK property postcode (e.g. BB5 0LU).';
    }
    if (!draft.propertyType || !draft.propertyType.trim()) {
      errors.propertyType = 'Please select your property type.';
    }
    if (!draft.problemDescription || draft.problemDescription.trim().length < 10) {
      errors.problemDescription = 'Please describe the roofing issue or work required (at least 10 characters).';
    }
    if (!draft.urgency || !draft.urgency.trim()) {
      errors.urgency = 'Please let us know how urgent the issue is.';
    }
  }

  if (step === 4) {
    if (!draft.fullName || draft.fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name.';
    }
    if (!draft.phone || !isValidUkPhone(draft.phone)) {
      errors.phone = 'Please enter a valid UK telephone or mobile number (e.g. 07512 781329).';
    }
    if (!draft.email || !isValidEmail(draft.email)) {
      errors.email = 'Please enter a valid email address so we can send your written quotation.';
    }
    if (!draft.preferredContact || !draft.preferredContact.trim()) {
      errors.preferredContact = 'Please select your preferred contact method.';
    }
    if (!draft.consentGiven) {
      errors.consentGiven = 'Please confirm that JPD Roofing Ltd may contact you regarding this enquiry.';
    }
  }

  return errors;
}

export function validateFullQuoteDraft(draft: QuoteFormDraft): ValidationErrors {
  return {
    ...validateQuoteStep(1, draft),
    ...validateQuoteStep(2, draft),
    ...validateQuoteStep(4, draft),
  };
}

export interface PhotoUploadCandidate {
  name: string;
  type: string;
  size: number;
}

const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/jpg', 'image/png', 'image/webp']);
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5MB per photo
export const MAX_PHOTO_COUNT = 3;

export function validatePhotoCandidates(
  existingCount: number,
  candidates: PhotoUploadCandidate[]
): { valid: boolean; error?: string } {
  if (existingCount + candidates.length > MAX_PHOTO_COUNT) {
    return {
      valid: false,
      error: `You can attach up to ${MAX_PHOTO_COUNT} photographs per enquiry.`,
    };
  }

  for (const file of candidates) {
    if (!ALLOWED_IMAGE_TYPES.has(file.type.toLowerCase())) {
      return {
        valid: false,
        error: `"${file.name}" is not a supported image type. Please upload JPG, PNG or WebP images only.`,
      };
    }
    if (file.size > MAX_IMAGE_BYTES) {
      return {
        valid: false,
        error: `"${file.name}" exceeds the 5MB file size limit per photograph.`,
      };
    }
  }

  return { valid: true };
}
