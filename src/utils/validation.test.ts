import test from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizeUkPostcode,
  isValidUkPostcode,
  checkPostcodeCoverage,
  isValidUkPhone,
  isValidEmail,
  validateQuoteStep,
  validateFullQuoteDraft,
  validatePhotoCandidates,
  MAX_IMAGE_BYTES,
} from './validation.ts';

test('normalizeUkPostcode formats full UK postcodes cleanly', () => {
  assert.equal(normalizeUkPostcode('bb50lu'), 'BB5 0LU');
  assert.equal(normalizeUkPostcode(' bb1 2ab '), 'BB1 2AB');
  assert.equal(normalizeUkPostcode('OL14 7AA'), 'OL14 7AA');
});

test('isValidUkPostcode validates Lancashire and North West postcodes', () => {
  assert.equal(isValidUkPostcode('BB5 0LU'), true);
  assert.equal(isValidUkPostcode('BB1 1AA'), true);
  assert.equal(isValidUkPostcode('OL14'), true);
  assert.equal(isValidUkPostcode(''), false);
  assert.equal(isValidUkPostcode('12345'), false);
});

test('checkPostcodeCoverage identifies primary Accrington/Lancashire vs secondary areas', () => {
  const accrington = checkPostcodeCoverage('BB5 0LU');
  assert.equal(accrington.valid, true);
  assert.equal(accrington.tier, 'primary');
  assert.equal(accrington.outwardCode, 'BB5');

  const todmorden = checkPostcodeCoverage('OL14 5AA');
  assert.equal(todmorden.valid, true);
  assert.equal(todmorden.tier, 'secondary');
  assert.equal(todmorden.outwardCode, 'OL14');

  const invalid = checkPostcodeCoverage('NOT_A_POSTCODE');
  assert.equal(invalid.valid, false);
  assert.equal(invalid.tier, 'invalid');
});

test('isValidUkPhone validates UK mobile and landline numbers', () => {
  assert.equal(isValidUkPhone('07512 781329'), true);
  assert.equal(isValidUkPhone('+44 7512 781329'), true);
  assert.equal(isValidUkPhone('01254 123456'), true);
  assert.equal(isValidUkPhone('12345'), false);
});

test('isValidEmail validates standard email addresses', () => {
  assert.equal(isValidEmail('homeowner@example.co.uk'), true);
  assert.equal(isValidEmail('jpdroofingltd@outlook.com'), true);
  assert.equal(isValidEmail('invalid-email'), false);
});

test('validateQuoteStep and validateFullQuoteDraft enforce step-by-step and full rules', () => {
  const emptyDraft = {
    serviceNeeded: '',
    postcode: '',
    propertyType: '',
    problemDescription: '',
    urgency: '',
    fullName: '',
    phone: '',
    email: '',
    preferredContact: '',
    consentGiven: false,
  };

  const step1Errors = validateQuoteStep(1, emptyDraft);
  assert.ok(step1Errors.serviceNeeded);

  const step2Errors = validateQuoteStep(2, {
    ...emptyDraft,
    postcode: 'INVALID',
    problemDescription: 'Too short',
  });
  assert.ok(step2Errors.postcode);
  assert.ok(step2Errors.propertyType);
  assert.ok(step2Errors.problemDescription);
  assert.ok(step2Errors.urgency);

  const validDraft = {
    serviceNeeded: 'Roof Repair',
    postcode: 'BB5 0LU',
    propertyType: 'Terraced House',
    problemDescription: 'Slipped slate tiles near chimney stack causing damp patch after heavy rain.',
    urgency: 'Urgent (Within 48 Hours)',
    fullName: 'Sarah Jenkins',
    phone: '07512 781329',
    email: 'sarah@example.co.uk',
    preferredContact: 'Phone Call',
    consentGiven: true,
  };

  const fullErrors = validateFullQuoteDraft(validDraft);
  assert.equal(Object.keys(fullErrors).length, 0);
});

test('validatePhotoCandidates enforces MIME types, file size, and maximum photo count', () => {
  assert.deepEqual(
    validatePhotoCandidates(0, [{ name: 'roof.jpg', type: 'image/jpeg', size: 1024 * 500 }]),
    { valid: true }
  );

  const tooMany = validatePhotoCandidates(3, [{ name: 'extra.jpg', type: 'image/jpeg', size: 1000 }]);
  assert.equal(tooMany.valid, false);

  const badType = validatePhotoCandidates(0, [{ name: 'doc.pdf', type: 'application/pdf', size: 1000 }]);
  assert.equal(badType.valid, false);

  const tooLarge = validatePhotoCandidates(0, [
    { name: 'huge.png', type: 'image/png', size: MAX_IMAGE_BYTES + 100 },
  ]);
  assert.equal(tooLarge.valid, false);
});
