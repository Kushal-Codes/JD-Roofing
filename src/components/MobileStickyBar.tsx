import React from 'react';
import { Phone, FileText } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/siteConfig';

interface MobileStickyBarProps {
  onRequestQuote: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onRequestQuote }) => {
  return (
    <div
      role="region"
      aria-label="Quick Mobile Contact Actions"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 h-12 bg-[#0B0F14] border-t border-white/15 grid grid-cols-2 divide-x divide-white/15 shadow-2xl"
    >
      <a
        href={BUSINESS_CONFIG.phone.telHref}
        className="flex items-center justify-center gap-2 text-xs font-display font-bold uppercase tracking-wider text-white active:bg-white/10 transition-colors"
      >
        <Phone className="w-3.5 h-3.5 text-[#F59E0B]" />
        <span>CALL NOW</span>
      </a>

      <button
        type="button"
        onClick={onRequestQuote}
        className="flex items-center justify-center gap-2 text-xs font-display font-bold uppercase tracking-wider bg-[#D44D27] text-white active:bg-[#B83D1B] transition-colors cursor-pointer"
      >
        <FileText className="w-3.5 h-3.5" />
        <span>FREE QUOTE</span>
      </button>
    </div>
  );
};
