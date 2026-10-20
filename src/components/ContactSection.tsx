import React, { useState } from 'react';
import {
  Phone,
  MapPin,
  Clock,
  ExternalLink,
  CheckCircle2,
  ArrowRight,
  Mail,
} from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/siteConfig';
import { isValidUkPhone } from '../utils/validation';

interface ContactSectionProps {
  onOpenFullQuoteForm: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenFullQuoteForm }) => {
  const [cbName, setCbName] = useState('');
  const [cbPhone, setCbPhone] = useState('');
  const [cbPostcode, setCbPostcode] = useState('');
  const [cbMessage, setCbMessage] = useState('');
  const [cbError, setCbError] = useState<string | null>(null);
  const [cbSubmitting, setCbSubmitting] = useState(false);
  const [cbSuccessRef, setCbSuccessRef] = useState<string | null>(null);

  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCbError(null);

    if (cbName.trim().length < 2) {
      setCbError('Please enter your name.');
      return;
    }
    if (!isValidUkPhone(cbPhone)) {
      setCbError('Please enter a valid UK telephone or mobile number (e.g. 07512 781329).');
      return;
    }
    if (cbMessage.trim().length < 5) {
      setCbError('Please add a brief note about your roofing enquiry.');
      return;
    }

    setCbSubmitting(true);
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'callback',
          fullName: cbName.trim(),
          phone: cbPhone.trim(),
          postcode: cbPostcode.trim() || 'BB5',
          problemDescription: cbMessage.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setCbError(data.error || 'Could not log callback request. Please call 07512 781329.');
        setCbSubmitting(false);
        return;
      }
      setCbSuccessRef(data.referenceId);
      setCbSubmitting(false);
    } catch {
      setCbError('Network issue—please call us directly on 07512 781329.');
      setCbSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-20 lg:py-28 bg-[#F6F5F1] text-[#0F1419] border-b border-[#E2DFD7]"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Details */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#D44D27]">
                DIRECT CONTACT · JPD ROOFING LTD
              </p>
              <h2
                id="contact-heading"
                className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight text-[#0F1419] leading-[1.12]"
              >
                LET&apos;S TALK ABOUT YOUR ROOF.
              </h2>
              <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed max-w-2xl">
                Speak directly with Jordan and our team for honest advice, urgent leak repairs or a free no-obligation quotation.
              </p>
            </div>

            {/* Contact Details Grid (Crisp White Cards on Warm Stone) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Telephone Card */}
              <div className="bg-white border border-[#E2DFD7] p-6 rounded-sm space-y-2 shadow-[0_2px_10px_rgba(15,20,25,0.03)]">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D44D27]">
                  <Phone className="w-4 h-4" />
                  <span>Telephone (Click to Call)</span>
                </div>
                <a
                  href={BUSINESS_CONFIG.phone.telHref}
                  className="block font-mono-tabular text-2xl font-extrabold text-[#0F1419] hover:text-[#D44D27] transition-colors"
                >
                  {BUSINESS_CONFIG.phone.display}
                </a>
                <p className="text-xs text-[#4B5563]">
                  Direct line to Jordan &amp; the JPD Roofing team
                </p>
              </div>

              {/* Address Card */}
              <div className="bg-white border border-[#E2DFD7] p-6 rounded-sm space-y-2 shadow-[0_2px_10px_rgba(15,20,25,0.03)]">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D44D27]">
                  <MapPin className="w-4 h-4" />
                  <span>Business Address</span>
                </div>
                <p className="font-display font-bold text-base text-[#0F1419]">
                  {BUSINESS_CONFIG.legalName}
                </p>
                <p className="text-sm text-[#4B5563]">
                  {BUSINESS_CONFIG.address.full}
                </p>
                <a
                  href={BUSINESS_CONFIG.externalProfiles.googleDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F1419] hover:text-[#D44D27] underline underline-offset-4 transition-colors pt-1"
                >
                  <span>Get Directions on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Opening Hours */}
              <div className="bg-white border border-[#E2DFD7] p-6 rounded-sm space-y-2 shadow-[0_2px_10px_rgba(15,20,25,0.03)]">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#15803D]">
                  <Clock className="w-4 h-4" />
                  <span>Operating Hours</span>
                </div>
                <p className="font-display font-bold text-sm text-[#0F1419]">
                  {BUSINESS_CONFIG.hours.standardDisplay}
                </p>
                <p className="text-xs text-[#4B5563] leading-relaxed">
                  {BUSINESS_CONFIG.hours.emergencyNote}
                </p>
              </div>

              {/* Published Email & Official Profiles */}
              <div className="bg-white border border-[#E2DFD7] p-6 rounded-sm space-y-2 shadow-[0_2px_10px_rgba(15,20,25,0.03)]">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#15803D]">
                  <Mail className="w-4 h-4" />
                  <span>Published Email &amp; Socials</span>
                </div>
                <a
                  href={`mailto:${BUSINESS_CONFIG.email.address}`}
                  className="block text-sm font-mono-tabular font-bold text-[#0F1419] hover:text-[#D44D27] transition-colors truncate"
                >
                  {BUSINESS_CONFIG.email.address}
                </a>
                <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
                  <a
                    href={BUSINESS_CONFIG.externalProfiles.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#0F1419] hover:text-[#D44D27] inline-flex items-center gap-1"
                  >
                    <span>Facebook</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <span aria-hidden="true" className="text-[#4B5563]">·</span>
                  <a
                    href={BUSINESS_CONFIG.externalProfiles.yellUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#0F1419] hover:text-[#D44D27] inline-flex items-center gap-1"
                  >
                    <span>Yell</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <span aria-hidden="true" className="text-[#4B5563]">·</span>
                  <a
                    href={BUSINESS_CONFIG.externalProfiles.trustindexUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#0F1419] hover:text-[#D44D27] inline-flex items-center gap-1"
                  >
                    <span>Trustindex</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={BUSINESS_CONFIG.phone.telHref}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#D44D27] hover:bg-[#B83D1B] text-white font-display font-bold text-xs uppercase tracking-wider rounded-sm transition-colors whitespace-nowrap shrink-0 shadow-xs"
              >
                <Phone className="w-4 h-4" />
                <span>Call {BUSINESS_CONFIG.phone.display}</span>
              </a>

              <button
                type="button"
                onClick={onOpenFullQuoteForm}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white border border-[#0F1419] hover:bg-[#0F1419] text-[#0F1419] hover:text-white font-display font-bold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Open 4-Step Quote Builder</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Quick Callback / Message Form */}
          <div className="lg:col-span-5 bg-white border border-[#E2DFD7] border-t-4 border-t-[#0F1419] p-6 sm:p-8 rounded-sm shadow-lg">
            {cbSuccessRef ? (
              <div className="space-y-4 py-4">
                <div className="inline-flex items-center gap-2 text-[#15803D] text-xs font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Callback Logged · {cbSuccessRef}</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-[#0F1419]">
                  We Have Received Your Message
                </h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  Thank you, {cbName}. Jordan or a member of the JPD Roofing Ltd team will call you back on <strong className="text-[#0F1419]">{cbPhone}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setCbSuccessRef(null);
                    setCbMessage('');
                  }}
                  className="px-4 py-2.5 border border-[#E2DFD7] hover:border-[#0F1419] text-xs font-bold uppercase tracking-wider text-[#0F1419] rounded-sm transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleCallbackSubmit} noValidate className="space-y-4">
                <div className="space-y-1">
                  <h3 className="font-display text-xl font-bold text-[#0F1419]">
                    Request a Quick Callback
                  </h3>
                  <p className="text-xs text-[#4B5563]">
                    Short on time? Leave your number and brief details and we will ring you back.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="cb-name" className="block text-xs font-bold uppercase tracking-wider text-[#0F1419]">
                    Your Name *
                  </label>
                  <input
                    id="cb-name"
                    type="text"
                    value={cbName}
                    onChange={(e) => setCbName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full px-3.5 py-2.5 bg-[#F6F5F1] focus:bg-white border border-[#E2DFD7] rounded-sm text-sm text-[#0F1419] focus:outline-2 focus:outline-[#0F1419]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label htmlFor="cb-phone" className="block text-xs font-bold uppercase tracking-wider text-[#0F1419]">
                      Phone Number *
                    </label>
                    <input
                      id="cb-phone"
                      type="tel"
                      value={cbPhone}
                      onChange={(e) => setCbPhone(e.target.value)}
                      placeholder="07512 781329"
                      className="w-full px-3.5 py-2.5 bg-[#F6F5F1] focus:bg-white border border-[#E2DFD7] rounded-sm text-sm text-[#0F1419] focus:outline-2 focus:outline-[#0F1419]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="cb-postcode" className="block text-xs font-bold uppercase tracking-wider text-[#0F1419]">
                      Postcode
                    </label>
                    <input
                      id="cb-postcode"
                      type="text"
                      value={cbPostcode}
                      onChange={(e) => setCbPostcode(e.target.value)}
                      placeholder="e.g. BB5 0LU"
                      className="w-full px-3.5 py-2.5 bg-[#F6F5F1] focus:bg-white border border-[#E2DFD7] rounded-sm text-sm text-[#0F1419] focus:outline-2 focus:outline-[#0F1419]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="cb-message" className="block text-xs font-bold uppercase tracking-wider text-[#0F1419]">
                    How Can We Help? *
                  </label>
                  <textarea
                    id="cb-message"
                    rows={3}
                    value={cbMessage}
                    onChange={(e) => setCbMessage(e.target.value)}
                    placeholder="Briefly describe your roofing repair or quote request..."
                    className="w-full px-3.5 py-2.5 bg-[#F6F5F1] focus:bg-white border border-[#E2DFD7] rounded-sm text-sm text-[#0F1419] focus:outline-2 focus:outline-[#0F1419]"
                  />
                </div>

                {cbError && (
                  <p role="alert" className="text-xs font-bold text-red-700">
                    {cbError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={cbSubmitting}
                  className="w-full py-3.5 px-5 bg-[#0F1419] hover:bg-[#D44D27] disabled:opacity-60 text-white font-display font-bold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                >
                  {cbSubmitting ? 'Logging Callback...' : 'Request Callback'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
