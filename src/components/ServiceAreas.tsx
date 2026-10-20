import React, { useState } from 'react';
import { MapPin, ExternalLink, Search, CheckCircle2, ArrowRight } from 'lucide-react';
import { BUSINESS_CONFIG, SERVICE_AREAS } from '../data/siteConfig';
import { checkPostcodeCoverage } from '../utils/validation';

interface ServiceAreasProps {
  onRequestQuoteWithPostcode: (postcode: string) => void;
}

export const ServiceAreas: React.FC<ServiceAreasProps> = ({ onRequestQuoteWithPostcode }) => {
  const [queryPostcode, setQueryPostcode] = useState('');
  const [checkedResult, setCheckedResult] = useState<ReturnType<typeof checkPostcodeCoverage> | null>(
    null
  );

  const handleCheckPostcode = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckedResult(checkPostcodeCoverage(queryPostcode));
  };

  return (
    <section
      id="areas"
      aria-labelledby="areas-heading"
      className="py-20 lg:py-28 bg-white text-[#0F1419] border-b border-[#E2DFD7]"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 space-y-14">
        {/* Section Heading & Postcode Checker */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-[#E2DFD7] pb-10">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#D44D27]">
              SERVICE COVERAGE · ACCRINGTON, LANCASHIRE &amp; THE NORTH WEST
            </p>
            <h2
              id="areas-heading"
              className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight text-[#0F1419] leading-[1.12]"
            >
              PROUDLY SERVING LANCASHIRE &amp; BEYOND.
            </h2>
            <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed max-w-2xl">
              From our base at 57 Wordsworth Road in Accrington (BB5 0LU), our team carries out roof repairs, full roof replacements, flat roofing and roofline work across East Lancashire and surrounding North West communities.
            </p>
          </div>

          {/* Interactive Postcode Coverage Checker */}
          <div className="lg:col-span-5 bg-[#F6F5F1] border border-[#E2DFD7] p-6 rounded-sm space-y-3">
            <label
              htmlFor="area-postcode-input"
              className="block text-xs font-display font-bold uppercase tracking-wider text-[#0F1419]"
            >
              Check Your Postcode Coverage
            </label>
            <form onSubmit={handleCheckPostcode} className="flex items-stretch gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#4B5563] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="area-postcode-input"
                  type="text"
                  value={queryPostcode}
                  onChange={(e) => setQueryPostcode(e.target.value)}
                  placeholder="Enter postcode (e.g. BB5 0LU, BB1, OL14)"
                  className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#E2DFD7] rounded-sm text-sm text-[#0F1419] focus:outline-2 focus:outline-[#0F1419]"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2.5 bg-[#0F1419] hover:bg-[#D44D27] text-white text-xs font-display font-bold uppercase tracking-wider rounded-sm transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                Check Area
              </button>
            </form>

            {checkedResult && (
              <div
                role="status"
                className={`p-3.5 rounded-sm text-xs space-y-2 border ${
                  checkedResult.valid
                    ? 'bg-white border-[#15803D]/40 text-[#0F1419]'
                    : 'bg-red-50 border-red-200 text-red-800'
                }`}
              >
                <p className="font-semibold flex items-center gap-1.5">
                  {checkedResult.valid && <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0" />}
                  <span>{checkedResult.message}</span>
                </p>
                {checkedResult.valid && (
                  <button
                    type="button"
                    onClick={() => onRequestQuoteWithPostcode(checkedResult.formattedPostcode)}
                    className="inline-flex items-center gap-1 font-bold text-[#D44D27] hover:text-[#0F1419] underline underline-offset-4 cursor-pointer"
                  >
                    <span>Start a Quote for {checkedResult.formattedPostcode}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Service Area Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {SERVICE_AREAS.map((area) => (
            <article
              key={area.name}
              className="bg-[#F9F8F5] hover:bg-white border border-[#E2DFD7] hover:border-[#0F1419]/35 p-6 rounded-sm flex flex-col justify-between space-y-5 transition-all duration-200 hover:shadow-md"
            >
              <div className="space-y-3">
                {/* Unboxed Metadata Kicker */}
                <div className="flex items-center justify-between gap-2 text-xs text-[#4B5563]">
                  <span className="inline-flex items-center gap-1 font-bold text-[#15803D]">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{area.role}</span>
                  </span>
                  <span className="font-mono-tabular font-bold text-[#0F1419]">
                    {area.postcodePrefix}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-[#0F1419] flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#D44D27] shrink-0" />
                  <span>{area.name}</span>
                </h3>

                <p className="text-sm text-[#4B5563] leading-relaxed">
                  {area.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E2DFD7] space-y-3">
                <p className="text-xs text-[#4B5563]">
                  {area.popularServices.join(' · ')}
                </p>
                <button
                  type="button"
                  onClick={() =>
                    onRequestQuoteWithPostcode(area.postcodePrefix.split(' ')[0] || 'BB5')
                  }
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F1419] hover:text-[#D44D27] transition-colors cursor-pointer"
                >
                  <span>Enquire in {area.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D44D27]" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Integrated Location Map & Google Business Profile Bar */}
        <div className="bg-[#0B0F14] text-white border border-[#E2DFD7] rounded-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-lg">
          <div className="lg:col-span-5 p-7 sm:p-9 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#F59E0B]">
                REGISTERED ACCRINGTON BASE
              </p>
              <h3 className="font-display text-2xl font-bold text-white">
                {BUSINESS_CONFIG.legalName}
              </h3>
              <p className="text-sm text-white/90 leading-relaxed">
                {BUSINESS_CONFIG.address.full}, United Kingdom
              </p>
              <p className="text-xs text-white/70 leading-relaxed">
                Conveniently positioned off the M65 &amp; A56 corridors to reach residential and commercial roofs across Accrington, Blackburn, Hyndburn, Ribble Valley, Rochdale, Todmorden and Wigan.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={BUSINESS_CONFIG.externalProfiles.googleMapsShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#D44D27] hover:bg-[#B83D1B] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors whitespace-nowrap shrink-0"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={BUSINESS_CONFIG.externalProfiles.googleDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-white/30 hover:border-white text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors whitespace-nowrap shrink-0"
              >
                <span>Get Directions</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 min-h-[300px] sm:min-h-[360px] bg-[#131920] relative">
            <iframe
              title="JPD Roofing Ltd Location Map — 57 Wordsworth Road, Accrington BB5 0LU"
              src="https://www.google.com/maps?q=57+Wordsworth+Road,+Accrington+BB5+0LU&output=embed"
              className="w-full h-full min-h-[300px] sm:min-h-[360px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
