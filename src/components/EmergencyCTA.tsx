import React from 'react';
import { Phone, AlertTriangle, ArrowRight } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/siteConfig';

interface EmergencyCTAProps {
  onRequestUrgentHelp: () => void;
}

export const EmergencyCTA: React.FC<EmergencyCTAProps> = ({ onRequestUrgentHelp }) => {
  return (
    <section
      id="emergency"
      aria-labelledby="emergency-heading"
      className="py-16 lg:py-20 bg-[#0B0F14] text-white border-b border-[#E2DFD7]"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="bg-[#131920] border border-white/15 border-t-2 border-t-[#D44D27] rounded-sm p-7 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#F59E0B]">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>URGENT ROOF REPAIRS · ACCRINGTON &amp; LANCASHIRE</span>
            </div>

            <h2
              id="emergency-heading"
              className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight text-white leading-[1.1]"
            >
              ROOF LEAK? STORM DAMAGE?
            </h2>

            <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-2xl">
              Roofing problems can worsen quickly. Speak to JPD Roofing Ltd about the issue and available repair options.
            </p>

            <p className="text-xs text-white/70 leading-relaxed max-w-xl">
              Whether high winds have dislodged ridge tiles, flashing has pulled away from a chimney or porch, or heavy rain is tracking into your loft, call Jordan and the team directly to discuss the fastest available inspection slot.
            </p>
          </div>

          {/* Right Column: Action Buttons */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3.5 justify-end">
            <a
              href={BUSINESS_CONFIG.phone.telHref}
              className="w-full py-4 px-6 bg-[#D44D27] hover:bg-[#B83D1B] text-white font-display font-bold text-sm sm:text-base uppercase tracking-wider rounded-sm flex items-center justify-center gap-3 transition-colors shadow-lg whitespace-nowrap"
            >
              <Phone className="w-4 h-4 shrink-0" />
              <span>CALL {BUSINESS_CONFIG.phone.display}</span>
            </a>

            <button
              type="button"
              onClick={onRequestUrgentHelp}
              className="w-full py-4 px-6 bg-white/10 border border-white/30 hover:border-white hover:bg-white/15 text-white font-display font-bold text-sm sm:text-base uppercase tracking-wider rounded-sm flex items-center justify-center gap-3 transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>REQUEST URGENT HELP</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>

            <p className="text-[11px] text-white/65 text-center pt-1">
              Standard Operating Hours: {BUSINESS_CONFIG.hours.standardDisplay} · Out-of-hours emergency availability confirmed by telephone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
