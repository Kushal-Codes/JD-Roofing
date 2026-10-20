import React, { useState, useEffect } from 'react';
import {
  Wrench,
  Home,
  Layers,
  Droplets,
  Flame,
  CloudLightning,
  HelpCircle,
  Upload,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Phone,
  Lock,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/siteConfig';
import {
  QuoteFormDraft,
  ValidationErrors,
  validateQuoteStep,
  validateFullQuoteDraft,
  validatePhotoCandidates,
  checkPostcodeCoverage,
  normalizeUkPostcode,
} from '../utils/validation';

interface QuoteFormProps {
  preselectedService?: string | null;
  preselectedUrgency?: string | null;
  onClearPreselection?: () => void;
}

interface UploadedPhotoPreview {
  name: string;
  type: string;
  size: number;
  dataUrl: string;
}

const STEP_1_OPTIONS = [
  {
    id: 'Roof Repair',
    label: 'Roof Repair',
    desc: 'Slipped slates, broken tiles, leaks, ridge mortar or lead flashing',
    icon: Wrench,
  },
  {
    id: 'New Roof',
    label: 'New Roof',
    desc: 'Full strip-and-reslate or interlocking tile roof replacement',
    icon: Home,
  },
  {
    id: 'Flat Roof',
    label: 'Flat Roof',
    desc: 'EPDM rubber, GRP fibreglass or felt for extensions, bays & garages',
    icon: Layers,
  },
  {
    id: 'Guttering',
    label: 'Guttering',
    desc: 'uPVC fascias, soffits, dry verge, guttering & downpipes',
    icon: Droplets,
  },
  {
    id: 'Chimney Work',
    label: 'Chimney Work',
    desc: 'Chimney repointing, lead aprons, stepped flashing & flaunching',
    icon: Flame,
  },
  {
    id: 'Storm Damage',
    label: 'Storm Damage',
    desc: 'Urgent weather damage, active water ingress or dislodged ridge tiles',
    icon: CloudLightning,
  },
  {
    id: 'Not Sure',
    label: 'Not Sure',
    desc: 'Need an honest roof inspection and advice from Jordan & the team',
    icon: HelpCircle,
  },
];

const PROPERTY_TYPES = [
  'Terraced House',
  'Semi-Detached House',
  'Detached House',
  'Bungalow',
  'Commercial / Industrial Property',
  'Other Property Type',
];

const URGENCY_OPTIONS = [
  'Emergency / Active Leak',
  'Urgent (Within 48 Hours)',
  'Soon (Within 1–2 Weeks)',
  'Planning Ahead / Gathering Quotes',
];

const CONTACT_METHODS = ['Phone Call', 'Email', 'WhatsApp / SMS'];

export const QuoteForm: React.FC<QuoteFormProps> = ({
  preselectedService,
  preselectedUrgency,
  onClearPreselection,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [draft, setDraft] = useState<QuoteFormDraft>({
    serviceNeeded: 'Roof Repair',
    postcode: '',
    propertyType: 'Terraced House',
    problemDescription: '',
    urgency: 'Soon (Within 1–2 Weeks)',
    fullName: '',
    phone: '',
    email: '',
    preferredContact: 'Phone Call',
    consentGiven: true,
    honeypot: '',
  });

  const [photos, setPhotos] = useState<UploadedPhotoPreview[]>([]);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitServerError, setSubmitServerError] = useState<string | null>(null);
  const [submittedResult, setSubmittedResult] = useState<{
    referenceId: string;
    createdAt: string;
    serviceNeeded: string;
    postcode: string;
    urgency: string;
    photoCount: number;
  } | null>(null);

  useEffect(() => {
    if (preselectedService) {
      setDraft((prev) => ({
        ...prev,
        serviceNeeded: preselectedService,
        urgency: preselectedUrgency || prev.urgency,
      }));
      setSubmittedResult(null);
      setErrors({});
      if (onClearPreselection) {
        onClearPreselection();
      }
    }
  }, [preselectedService, preselectedUrgency, onClearPreselection]);

  const postcodeStatus = draft.postcode.trim()
    ? checkPostcodeCoverage(draft.postcode)
    : null;

  const handleNextStep = () => {
    const stepErrors = validateQuoteStep(currentStep, draft);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setCurrentStep((prev) => Math.min(4, prev + 1));
  };

  const handlePrevStep = () => {
    setErrors({});
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    const candidates = Array.from(fileList).map((f) => ({
      name: f.name,
      type: f.type,
      size: f.size,
      fileObj: f,
    }));

    const check = validatePhotoCandidates(photos.length, candidates);
    if (!check.valid) {
      setErrors((prev) => ({ ...prev, photos: check.error }));
      e.target.value = '';
      return;
    }

    setErrors((prev) => ({ ...prev, photos: undefined }));

    candidates.forEach((item) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setPhotos((prev) => [
            ...prev.slice(0, 2),
            {
              name: item.name,
              type: item.type,
              size: item.size,
              dataUrl: reader.result as string,
            },
          ]);
        }
      };
      reader.readAsDataURL(item.fileObj);
    });

    e.target.value = '';
  };

  const handleRemovePhoto = (idx: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== idx));
    setErrors((prev) => ({ ...prev, photos: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitServerError(null);

    const allErrors = validateFullQuoteDraft(draft);
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      if (allErrors.serviceNeeded) setCurrentStep(1);
      else if (allErrors.postcode || allErrors.propertyType || allErrors.problemDescription || allErrors.urgency) {
        setCurrentStep(2);
      } else {
        setCurrentStep(4);
      }
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'quote',
          ...draft,
          postcode: normalizeUkPostcode(draft.postcode),
          photos: photos.map((p) => ({
            name: p.name,
            type: p.type,
            size: p.size,
            dataUrl: p.dataUrl,
          })),
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.ok) {
        setSubmitServerError(
          data.error || 'Unable to submit your enquiry right now. Please call 07512 781329 directly.'
        );
        setIsSubmitting(false);
        return;
      }

      setSubmittedResult({
        referenceId: data.referenceId,
        createdAt: data.createdAt,
        serviceNeeded: draft.serviceNeeded,
        postcode: normalizeUkPostcode(draft.postcode),
        urgency: draft.urgency,
        photoCount: photos.length,
      });
      setIsSubmitting(false);
    } catch {
      setSubmitServerError(
        'Network error while sending your quote request. Please call Jordan & the team directly on 07512 781329.'
      );
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="quote"
      aria-labelledby="quote-heading"
      className="py-20 lg:py-28 bg-[#0B0F14] text-white border-b border-[#E2DFD7]"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Guidance & Direct Telephone Option */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#F59E0B]">
                FREE NO-OBLIGATION ROOFING ENQUIRY
              </p>
              <h2
                id="quote-heading"
                className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight text-white leading-[1.12]"
              >
                LET&apos;S GET YOUR ROOF SORTED.
              </h2>
              <p className="text-base text-white/80 leading-relaxed">
                Complete the 4-step form to tell Jordan and the JPD Roofing team about your property. We will review your details, arrange a convenient time to inspect the roof if needed, and provide a clear written quotation.
              </p>
            </div>

            {/* Process Checklist */}
            <div className="bg-[#131920] border border-white/15 p-6 rounded-sm space-y-4">
              <h3 className="font-display text-xs font-bold uppercase tracking-wider text-[#F59E0B]">
                What Happens After You Enquire
              </h3>
              <ol className="space-y-3 text-sm text-white/85">
                <li className="flex items-start gap-3">
                  <span className="font-mono-tabular font-bold text-[#22C55E]">01.</span>
                  <span>Jordan reviews your property postcode, description and any uploaded photographs.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-mono-tabular font-bold text-[#22C55E]">02.</span>
                  <span>We contact you via your preferred method to arrange a site assessment at a time that suits you.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-mono-tabular font-bold text-[#22C55E]">03.</span>
                  <span>You receive an honest explanation of the issue and a competitive, no-obligation written quote.</span>
                </li>
              </ol>
            </div>

            {/* Direct Call Fallback Card */}
            <div className="bg-[#131920] border border-white/15 p-6 rounded-sm space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-white/70">
                Prefer to Speak Directly?
              </p>
              <a
                href={BUSINESS_CONFIG.phone.telHref}
                className="inline-flex items-center gap-3 text-xl sm:text-2xl font-mono-tabular font-bold text-white hover:text-[#F59E0B] transition-colors"
              >
                <Phone className="w-5 h-5 text-[#D44D27]" />
                <span>{BUSINESS_CONFIG.phone.display}</span>
              </a>
              <p className="text-xs text-white/70 leading-relaxed">
                {BUSINESS_CONFIG.hours.standardDisplay} · 57 Wordsworth Road, Accrington BB5 0LU
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Multi-Step Quotation Card (Pure Architectural White) */}
          <div className="lg:col-span-7 bg-white text-[#0F1419] border border-[#E2DFD7] rounded-sm p-6 sm:p-8 lg:p-10 shadow-2xl shadow-black/40">
            {submittedResult ? (
              <div
                data-testid="quote-confirmation"
                className="space-y-6 py-4"
              >
                <div className="inline-flex items-center gap-2 text-[#15803D] font-bold text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Enquiry Logged Successfully</span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F1419]">
                  Thank You, {draft.fullName}. Your Enquiry Has Been Received.
                </h3>

                <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
                  Jordan and the JPD Roofing Ltd team have received your request. Please keep your reference number below for your records.
                </p>

                <div className="bg-[#F6F5F1] border border-[#E2DFD7] p-5 rounded-sm space-y-3">
                  <div className="flex items-center justify-between border-b border-[#E2DFD7] pb-2.5 text-sm">
                    <span className="text-[#4B5563]">Enquiry Reference:</span>
                    <span className="font-mono-tabular font-bold text-[#0F1419]">
                      {submittedResult.referenceId}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-[#E2DFD7] pb-2.5 text-sm">
                    <span className="text-[#4B5563]">Service Requested:</span>
                    <span className="font-bold text-[#0F1419]">{submittedResult.serviceNeeded}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-[#E2DFD7] pb-2.5 text-sm">
                    <span className="text-[#4B5563]">Property Postcode:</span>
                    <span className="font-mono-tabular font-bold text-[#0F1419]">
                      {submittedResult.postcode}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#4B5563]">Urgency &amp; Photos:</span>
                    <span className="font-semibold text-[#0F1419]">
                      {submittedResult.urgency} · {submittedResult.photoCount} photo(s) attached
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#4B5563] bg-[#F6F5F1] border border-[#E2DFD7] p-4 rounded-sm leading-relaxed">
                  <strong className="text-[#0F1419]">Please note:</strong> Submitting this form registers an initial roofing enquiry and is not a confirmed booking or fixed-price quotation. If your roof has an active leak requiring immediate attention, please call us directly on{' '}
                  <a href={BUSINESS_CONFIG.phone.telHref} className="font-bold text-[#0F1419] underline">
                    {BUSINESS_CONFIG.phone.display}
                  </a>.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <a
                    href={BUSINESS_CONFIG.phone.telHref}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#D44D27] hover:bg-[#B83D1B] text-white font-display font-bold text-xs uppercase tracking-wider rounded-sm transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call {BUSINESS_CONFIG.phone.display} Now</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedResult(null);
                      setCurrentStep(1);
                    }}
                    className="inline-flex items-center justify-center px-5 py-3.5 border border-[#E2DFD7] hover:border-[#0F1419] text-xs font-bold uppercase tracking-wider text-[#0F1419] rounded-sm transition-colors cursor-pointer"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-8">
                {/* Step Progress Bar */}
                <div className="space-y-3 border-b border-[#E2DFD7] pb-6">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#4B5563]">
                    <span>Step 0{currentStep} of 04</span>
                    <span className="text-[#0F1419]">
                      {currentStep === 1 && '1. Select Service'}
                      {currentStep === 2 && '2. Property Details'}
                      {currentStep === 3 && '3. Upload Photos (Optional)'}
                      {currentStep === 4 && '4. Contact Information'}
                    </span>
                  </div>

                  {/* Interactive Stepper Buttons */}
                  <div className="grid grid-cols-4 gap-2" role="group" aria-label="Quote form steps">
                    {[1, 2, 3, 4].map((stepNum) => (
                      <button
                        key={stepNum}
                        type="button"
                        onClick={() => {
                          if (stepNum < currentStep) {
                            setErrors({});
                            setCurrentStep(stepNum);
                          }
                        }}
                        aria-label={`Step ${stepNum}`}
                        className={`h-2 rounded-xs transition-colors ${
                          stepNum === currentStep
                            ? 'bg-[#D44D27]'
                            : stepNum < currentStep
                            ? 'bg-[#15803D] cursor-pointer'
                            : 'bg-[#ECEAE3]'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* STEP 1: WHAT DO YOU NEED? */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0F1419]">
                        Step 1: What do you need?
                      </h3>
                      <p className="text-sm text-[#4B5563]">
                        Select the option that best matches your roofing requirement.
                      </p>
                    </div>

                    <div
                      role="radiogroup"
                      aria-label="What roofing service do you need?"
                      className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                    >
                      {STEP_1_OPTIONS.map((option) => {
                        const IconComponent = option.icon;
                        const isSelected = draft.serviceNeeded === option.id;
                        return (
                          <button
                            key={option.id}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            onClick={() => {
                              setDraft((prev) => ({ ...prev, serviceNeeded: option.id }));
                              setErrors((prev) => ({ ...prev, serviceNeeded: undefined }));
                            }}
                            className={`p-4 text-left rounded-sm border transition-all cursor-pointer flex items-start gap-3.5 ${
                              isSelected
                                ? 'bg-[#0F1419] text-white border-[#0F1419] shadow-sm'
                                : 'bg-[#F9F8F5] text-[#0F1419] border-[#E2DFD7] hover:bg-white hover:border-[#0F1419]/40'
                            }`}
                          >
                            <IconComponent
                              className={`w-5 h-5 shrink-0 mt-0.5 ${
                                isSelected ? 'text-[#F59E0B]' : 'text-[#0F1419]/70'
                              }`}
                            />
                            <div className="space-y-1">
                              <p className="font-display font-bold text-sm">{option.label}</p>
                              <p
                                className={`text-xs leading-snug ${
                                  isSelected ? 'text-white/80' : 'text-[#4B5563]'
                                }`}
                              >
                                {option.desc}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {errors.serviceNeeded && (
                      <p role="alert" className="text-xs font-bold text-red-700 flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errors.serviceNeeded}</span>
                      </p>
                    )}

                    <div className="pt-2 flex justify-end">
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#D44D27] hover:bg-[#B83D1B] text-white font-display font-bold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                      >
                        <span>Continue to Property Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: TELL US ABOUT YOUR PROPERTY */}
                {currentStep === 2 && (
                  <div className="space-y-5">
                    <div className="space-y-1">
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0F1419]">
                        Step 2: Tell us about your property
                      </h3>
                      <p className="text-sm text-[#4B5563]">
                        Selected Service: <strong className="text-[#0F1419]">{draft.serviceNeeded}</strong>
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Postcode */}
                      <div className="space-y-1.5">
                        <label htmlFor="quote-postcode" className="block text-xs font-bold uppercase tracking-wider text-[#0F1419]">
                          Property Postcode *
                        </label>
                        <input
                          id="quote-postcode"
                          type="text"
                          value={draft.postcode}
                          onChange={(e) => {
                            setDraft((prev) => ({ ...prev, postcode: e.target.value }));
                            setErrors((prev) => ({ ...prev, postcode: undefined }));
                          }}
                          placeholder="e.g. BB5 0LU"
                          className="w-full px-3.5 py-2.5 bg-[#F6F5F1] focus:bg-white border border-[#E2DFD7] rounded-sm text-sm text-[#0F1419] focus:outline-2 focus:outline-[#0F1419]"
                        />
                        {errors.postcode && (
                          <p role="alert" className="text-xs font-bold text-red-700">
                            {errors.postcode}
                          </p>
                        )}
                        {!errors.postcode && postcodeStatus && postcodeStatus.valid && (
                          <p className="text-xs text-[#0F1419] inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D] shrink-0" />
                            <span className="font-bold text-[#15803D]">{postcodeStatus.areaName}</span>
                          </p>
                        )}
                      </div>

                      {/* Property Type */}
                      <div className="space-y-1.5">
                        <label htmlFor="quote-property-type" className="block text-xs font-bold uppercase tracking-wider text-[#0F1419]">
                          Property Type *
                        </label>
                        <select
                          id="quote-property-type"
                          value={draft.propertyType}
                          onChange={(e) => {
                            setDraft((prev) => ({ ...prev, propertyType: e.target.value }));
                            setErrors((prev) => ({ ...prev, propertyType: undefined }));
                          }}
                          className="w-full px-3.5 py-2.5 bg-[#F6F5F1] focus:bg-white border border-[#E2DFD7] rounded-sm text-sm text-[#0F1419] focus:outline-2 focus:outline-[#0F1419]"
                        >
                          {PROPERTY_TYPES.map((pt) => (
                            <option key={pt} value={pt}>
                              {pt}
                            </option>
                          ))}
                        </select>
                        {errors.propertyType && (
                          <p role="alert" className="text-xs font-bold text-red-700">
                            {errors.propertyType}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Urgency */}
                    <div className="space-y-1.5">
                      <label htmlFor="quote-urgency" className="block text-xs font-bold uppercase tracking-wider text-[#0F1419]">
                        How urgent is the issue? *
                      </label>
                      <select
                        id="quote-urgency"
                        value={draft.urgency}
                        onChange={(e) => {
                          setDraft((prev) => ({ ...prev, urgency: e.target.value }));
                          setErrors((prev) => ({ ...prev, urgency: undefined }));
                        }}
                        className="w-full px-3.5 py-2.5 bg-[#F6F5F1] focus:bg-white border border-[#E2DFD7] rounded-sm text-sm text-[#0F1419] focus:outline-2 focus:outline-[#0F1419]"
                      >
                        {URGENCY_OPTIONS.map((u) => (
                          <option key={u} value={u}>
                            {u}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Brief Problem Description */}
                    <div className="space-y-1.5">
                      <label htmlFor="quote-description" className="block text-xs font-bold uppercase tracking-wider text-[#0F1419]">
                        Brief Problem or Project Description *
                      </label>
                      <textarea
                        id="quote-description"
                        rows={4}
                        value={draft.problemDescription}
                        onChange={(e) => {
                          setDraft((prev) => ({ ...prev, problemDescription: e.target.value }));
                          setErrors((prev) => ({ ...prev, problemDescription: undefined }));
                        }}
                        placeholder="Describe the issue (e.g. damp patch near chimney, slipped slates after wind, bay roof replacement, or full re-roof quote)..."
                        className="w-full px-3.5 py-2.5 bg-[#F6F5F1] focus:bg-white border border-[#E2DFD7] rounded-sm text-sm text-[#0F1419] focus:outline-2 focus:outline-[#0F1419]"
                      />
                      {errors.problemDescription && (
                        <p role="alert" className="text-xs font-bold text-red-700">
                          {errors.problemDescription}
                        </p>
                      )}
                    </div>

                    <div className="pt-2 flex items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="inline-flex items-center gap-2 px-4 py-3 border border-[#E2DFD7] hover:border-[#0F1419] text-xs font-bold uppercase tracking-wider text-[#0F1419] rounded-sm transition-colors cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#D44D27] hover:bg-[#B83D1B] text-white font-display font-bold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                      >
                        <span>Continue to Photos</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: UPLOAD PHOTOS */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0F1419]">
                        Step 3: Upload photos (Optional)
                      </h3>
                      <p className="text-sm text-[#4B5563]">
                        If you have safe ground-level or loft photographs of the roofing issue, attach up to 3 images (JPG, PNG or WebP, max 5MB each). Please never climb onto a roof to take photos.
                      </p>
                    </div>

                    <div className="border-2 border-dashed border-[#E2DFD7] bg-[#F6F5F1] p-6 rounded-sm text-center space-y-3">
                      <Upload className="w-7 h-7 text-[#D44D27] mx-auto" />
                      <div className="space-y-1">
                        <label
                          htmlFor="quote-photo-upload"
                          className="inline-block px-4 py-2 bg-[#0F1419] hover:bg-[#D44D27] text-white text-xs font-bold uppercase tracking-wider rounded-sm cursor-pointer transition-colors"
                        >
                          Select Photographs from Device
                        </label>
                        <input
                          id="quote-photo-upload"
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          multiple
                          onChange={handlePhotoUpload}
                          className="sr-only"
                        />
                        <p className="text-xs text-[#4B5563] pt-1">
                          Accepted formats: JPG, PNG, WebP · Maximum 5MB per photo · Up to 3 photos
                        </p>
                      </div>
                    </div>

                    {errors.photos && (
                      <p role="alert" className="text-xs font-bold text-red-700 flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errors.photos}</span>
                      </p>
                    )}

                    {/* Preview Thumbnails */}
                    {photos.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {photos.map((photo, idx) => (
                          <div
                            key={`${photo.name}-${idx}`}
                            className="bg-white border border-[#E2DFD7] p-2.5 rounded-sm space-y-2"
                          >
                            <img
                              src={photo.dataUrl}
                              alt={`Uploaded preview ${idx + 1}: ${photo.name}`}
                              className="w-full h-28 object-cover rounded-xs"
                            />
                            <div className="flex items-center justify-between gap-2 text-xs">
                              <span className="truncate font-medium text-[#0F1419]">{photo.name}</span>
                              <button
                                type="button"
                                onClick={() => handleRemovePhoto(idx)}
                                aria-label={`Remove photo ${photo.name}`}
                                className="text-red-700 hover:text-red-900 p-1 cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-start gap-2.5 bg-[#F6F5F1] border border-[#E2DFD7] p-3.5 rounded-sm text-xs text-[#4B5563]">
                      <Lock className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-[#0F1419]">Private &amp; Secure Upload:</strong> Uploaded photographs are stored privately for Jordan’s inspection only and are never publicly exposed.
                      </span>
                    </div>

                    <div className="pt-2 flex items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="inline-flex items-center gap-2 px-4 py-3 border border-[#E2DFD7] hover:border-[#0F1419] text-xs font-bold uppercase tracking-wider text-[#0F1419] rounded-sm transition-colors cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#D44D27] hover:bg-[#B83D1B] text-white font-display font-bold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                      >
                        <span>{photos.length > 0 ? 'Continue to Contact Details' : 'Skip Photos & Continue'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 4: CONTACT DETAILS */}
                {currentStep === 4 && (
                  <div className="space-y-5">
                    <div className="space-y-1">
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0F1419]">
                        Step 4: Your Contact Details
                      </h3>
                      <p className="text-sm text-[#4B5563]">
                        How should Jordan and the JPD Roofing team get in touch with you?
                      </p>
                    </div>

                    {/* Honeypot field hidden from screen readers and human users */}
                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="quote-company-website">Website</label>
                      <input
                        id="quote-company-website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={draft.honeypot || ''}
                        onChange={(e) => setDraft((prev) => ({ ...prev, honeypot: e.target.value }))}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="quote-fullname" className="block text-xs font-bold uppercase tracking-wider text-[#0F1419]">
                          Full Name *
                        </label>
                        <input
                          id="quote-fullname"
                          type="text"
                          autoComplete="name"
                          value={draft.fullName}
                          onChange={(e) => {
                            setDraft((prev) => ({ ...prev, fullName: e.target.value }));
                            setErrors((prev) => ({ ...prev, fullName: undefined }));
                          }}
                          placeholder="e.g. David Farrer"
                          className="w-full px-3.5 py-2.5 bg-[#F6F5F1] focus:bg-white border border-[#E2DFD7] rounded-sm text-sm text-[#0F1419] focus:outline-2 focus:outline-[#0F1419]"
                        />
                        {errors.fullName && (
                          <p role="alert" className="text-xs font-bold text-red-700">
                            {errors.fullName}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="quote-phone" className="block text-xs font-bold uppercase tracking-wider text-[#0F1419]">
                          Telephone / Mobile Number *
                        </label>
                        <input
                          id="quote-phone"
                          type="tel"
                          autoComplete="tel"
                          value={draft.phone}
                          onChange={(e) => {
                            setDraft((prev) => ({ ...prev, phone: e.target.value }));
                            setErrors((prev) => ({ ...prev, phone: undefined }));
                          }}
                          placeholder="e.g. 07512 781329"
                          className="w-full px-3.5 py-2.5 bg-[#F6F5F1] focus:bg-white border border-[#E2DFD7] rounded-sm text-sm text-[#0F1419] focus:outline-2 focus:outline-[#0F1419]"
                        />
                        {errors.phone && (
                          <p role="alert" className="text-xs font-bold text-red-700">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="quote-email" className="block text-xs font-bold uppercase tracking-wider text-[#0F1419]">
                          Email Address *
                        </label>
                        <input
                          id="quote-email"
                          type="email"
                          autoComplete="email"
                          value={draft.email}
                          onChange={(e) => {
                            setDraft((prev) => ({ ...prev, email: e.target.value }));
                            setErrors((prev) => ({ ...prev, email: undefined }));
                          }}
                          placeholder="you@example.co.uk"
                          className="w-full px-3.5 py-2.5 bg-[#F6F5F1] focus:bg-white border border-[#E2DFD7] rounded-sm text-sm text-[#0F1419] focus:outline-2 focus:outline-[#0F1419]"
                        />
                        {errors.email && (
                          <p role="alert" className="text-xs font-bold text-red-700">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="quote-preferred-contact" className="block text-xs font-bold uppercase tracking-wider text-[#0F1419]">
                          Preferred Contact Method *
                        </label>
                        <select
                          id="quote-preferred-contact"
                          value={draft.preferredContact}
                          onChange={(e) =>
                            setDraft((prev) => ({ ...prev, preferredContact: e.target.value }))
                          }
                          className="w-full px-3.5 py-2.5 bg-[#F6F5F1] focus:bg-white border border-[#E2DFD7] rounded-sm text-sm text-[#0F1419] focus:outline-2 focus:outline-[#0F1419]"
                        >
                          {CONTACT_METHODS.map((cm) => (
                            <option key={cm} value={cm}>
                              {cm}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* GDPR Privacy Consent */}
                    <div className="space-y-1.5 pt-1">
                      <label className="flex items-start gap-2.5 text-xs text-[#4B5563] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={draft.consentGiven}
                          onChange={(e) => {
                            setDraft((prev) => ({ ...prev, consentGiven: e.target.checked }));
                            setErrors((prev) => ({ ...prev, consentGiven: undefined }));
                          }}
                          className="mt-0.5 accent-[#0F1419]"
                        />
                        <span>
                          I consent to JPD Roofing Ltd using these contact and property details solely to respond to my roofing enquiry and provide a quotation. We never share or sell your data to third parties.
                        </span>
                      </label>
                      {errors.consentGiven && (
                        <p role="alert" className="text-xs font-bold text-red-700">
                          {errors.consentGiven}
                        </p>
                      )}
                    </div>

                    <div className="bg-[#F6F5F1] border border-[#E2DFD7] p-3.5 rounded-sm text-xs text-[#4B5563] leading-relaxed">
                      <strong className="text-[#0F1419]">Enquiry Notice:</strong> Submitting this form registers a free, no-obligation enquiry and is not a confirmed booking or fixed-price quotation.
                    </div>

                    {submitServerError && (
                      <div role="alert" className="p-3.5 bg-red-50 border border-red-300 text-xs text-red-800 rounded-sm">
                        {submitServerError}
                      </div>
                    )}

                    <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="inline-flex items-center justify-center gap-2 px-4 py-3 border border-[#E2DFD7] hover:border-[#0F1419] text-xs font-bold uppercase tracking-wider text-[#0F1419] rounded-sm transition-colors cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#D44D27] hover:bg-[#B83D1B] disabled:opacity-60 text-white font-display font-bold text-sm uppercase tracking-wider rounded-sm transition-colors cursor-pointer shadow-md"
                      >
                        <span>{isSubmitting ? 'SENDING ENQUIRY...' : 'REQUEST MY FREE QUOTE'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
