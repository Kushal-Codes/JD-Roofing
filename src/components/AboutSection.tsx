import React from 'react';
import { ArrowRight, CheckCircle2, Phone } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/siteConfig';

interface AboutSectionProps {
  onRequestQuote: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onRequestQuote }) => {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-20 lg:py-28 bg-white text-[#0F1419] border-b border-[#E2DFD7]"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Left Column: Authentic Team & Fleet Photography */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            <div className="relative h-80 sm:h-96 lg:h-[440px] bg-[#131920] border border-[#E2DFD7] rounded-sm overflow-hidden shadow-md">
              <img
                src="/images/jpd/land_5.jpeg"
                alt="Jordan from JPD Roofing Ltd on a Lancashire terraced re-roofing project"
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#0B0F14]/95 via-[#0B0F14]/65 to-transparent p-5 text-white">
                <p className="text-xs font-bold uppercase tracking-wider text-[#F59E0B]">
                  Jordan &amp; The JPD Roofing Team on Site
                </p>
                <p className="text-xs sm:text-sm text-white/90 mt-0.5">
                  Breathable membrane and graded timber batten installation on an East Lancashire terraced re-roof.
                </p>
              </div>
            </div>

            {/* Secondary Two-Photo Authentic Strip */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-44 bg-[#131920] border border-[#E2DFD7] rounded-sm overflow-hidden">
                <img
                  src="/images/jpd/proj_14.jpg"
                  alt="JPD Roofing Ltd signwritten Ford Transit van and scaffolded bungalow re-roof"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute bottom-0 inset-x-0 bg-[#0B0F14]/90 px-3 py-1.5 text-[11px] font-medium text-white">
                  Signwritten Fleet &amp; Full Scaffolding
                </div>
              </div>
              <div className="relative h-44 bg-[#131920] border border-[#E2DFD7] rounded-sm overflow-hidden">
                <img
                  src="/images/jpd/hero_2.jpeg"
                  alt="JPD Roofing Ltd branded uniform on a slate roof installation"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute bottom-0 inset-x-0 bg-[#0B0F14]/90 px-3 py-1.5 text-[11px] font-medium text-white">
                  In-House Team · Never Sub-Contracted
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Copy & Company Values */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <div className="space-y-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#D44D27]">
                ABOUT JPD ROOFING LTD · ACCRINGTON, LANCASHIRE
              </p>

              <h2
                id="about-heading"
                className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight text-[#0F1419] leading-[1.12]"
              >
                LOCAL EXPERTISE. WORK YOU CAN TRUST.
              </h2>

              <div className="space-y-4 text-base text-[#4B5563] leading-relaxed">
                <p>
                  Based at Wordsworth Road in Accrington, <strong className="text-[#0F1419]">JPD Roofing Ltd</strong> serves homeowners and businesses across Hyndburn, Blackburn, the Ribble Valley and the wider North West. Whether a property needs a single slipped slate refixed after winter winds or a complete strip-and-reslate with full scaffolding, every job is approached with the same care and straightforward advice.
                </p>
                <p>
                  Across hundreds of independent customer reviews, homeowners consistently name <strong className="text-[#0F1419]">Jordan</strong> and his team for turning up when promised, explaining the condition of the roof in plain English, and setting out practical options without sales pressure.
                </p>
                <p>
                  Because we carry out work with our own dedicated team rather than passing jobs to unknown sub-contractors, we maintain strict control over material quality, site tidiness and weatherproofing detail from the first scaffold lift to the final sweep-up.
                </p>
              </div>
            </div>

            {/* Company Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E2DFD7]">
              <div className="bg-[#F6F5F1] border border-[#E2DFD7] p-4 rounded-sm space-y-1.5">
                <div className="flex items-center gap-2 text-[#0F1419] font-display font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0" />
                  <span>Direct Personal Accountability</span>
                </div>
                <p className="text-xs text-[#4B5563] leading-relaxed">
                  You deal directly with Jordan from the initial roof assessment through to job completion.
                </p>
              </div>

              <div className="bg-[#F6F5F1] border border-[#E2DFD7] p-4 rounded-sm space-y-1.5">
                <div className="flex items-center gap-2 text-[#0F1419] font-display font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0" />
                  <span>Honest Repair vs Re-Roof Advice</span>
                </div>
                <p className="text-xs text-[#4B5563] leading-relaxed">
                  If a localised flashing or tile repair will solve the problem reliably, we will tell you so.
                </p>
              </div>

              <div className="bg-[#F6F5F1] border border-[#E2DFD7] p-4 rounded-sm space-y-1.5">
                <div className="flex items-center gap-2 text-[#0F1419] font-display font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0" />
                  <span>Proven Repeat Business</span>
                </div>
                <p className="text-xs text-[#4B5563] leading-relaxed">
                  A large proportion of our work comes from returning Lancashire homeowners and neighbour referrals.
                </p>
              </div>

              <div className="bg-[#F6F5F1] border border-[#E2DFD7] p-4 rounded-sm space-y-1.5">
                <div className="flex items-center gap-2 text-[#0F1419] font-display font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0" />
                  <span>Built for Northern Weather</span>
                </div>
                <p className="text-xs text-[#4B5563] leading-relaxed">
                  High-tensile breathable membranes, treated timber battens and mechanically fixed dry ridge systems.
                </p>
              </div>
            </div>

            {/* Action Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                type="button"
                onClick={onRequestQuote}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#D44D27] hover:bg-[#B83D1B] text-white font-display font-bold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
              >
                <span>Request a Free Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={BUSINESS_CONFIG.phone.telHref}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#F6F5F1] border border-[#E2DFD7] hover:border-[#0F1419] text-xs font-display font-bold uppercase tracking-wider text-[#0F1419] rounded-sm transition-colors"
              >
                <Phone className="w-4 h-4 text-[#D44D27]" />
                <span>Call {BUSINESS_CONFIG.phone.display}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
