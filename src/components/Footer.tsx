import React from 'react';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/siteConfig';
import { AppPage } from './Navbar';

interface FooterProps {
  onNavigate: (page: AppPage) => void;
  onRequestQuote: (service?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onRequestQuote }) => {
  return (
    <footer className="bg-[#0B0F14] text-white/80 border-t border-white/10 pb-16 md:pb-0">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Brand & Address */}
          <div className="lg:col-span-4 space-y-4">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="font-display text-xl font-extrabold tracking-tight text-white inline-block cursor-pointer"
            >
              {BUSINESS_CONFIG.legalName}
            </button>
            <p className="text-sm text-white/70 leading-relaxed max-w-sm">
              Trusted roofing contractors serving Accrington, Blackburn, Hyndburn, the Ribble Valley and the North West. Quality roof repairs, full re-roofs, flat roofing and roofline installations.
            </p>
            <div className="text-xs text-white/80 space-y-1 pt-1">
              <p>{BUSINESS_CONFIG.address.full}</p>
              <p>
                Telephone:{' '}
                <a
                  href={BUSINESS_CONFIG.phone.telHref}
                  className="font-mono-tabular font-bold text-white hover:text-[#F59E0B]"
                >
                  {BUSINESS_CONFIG.phone.display}
                </a>
              </p>
              <p>{BUSINESS_CONFIG.hours.standardDisplay}</p>
            </div>
          </div>

          {/* Col 2: Quick Navigation & Services */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-white">
              Roofing Services
            </h3>
            <ul className="space-y-2 text-xs text-white/75">
              {[
                { label: 'Roof Repairs & Leak Tracing', service: 'Roof Repair' },
                { label: 'New Roofs & Full Re-Roofing', service: 'New Roof' },
                { label: 'EPDM & GRP Flat Roofing', service: 'Flat Roof' },
                { label: 'Storm Damage & Urgent Repairs', service: 'Storm Damage' },
                { label: 'uPVC Fascias, Soffits & Guttering', service: 'Guttering' },
                { label: 'Chimney Repairs & Repointing', service: 'Chimney Work' },
                { label: 'Natural Slate & Tile Roofing', service: 'New Roof' },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => onRequestQuote(item.service)}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Areas Covered */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-white">
              Lancashire &amp; North West Areas
            </h3>
            <ul className="space-y-2 text-xs text-white/75">
              {[
                'Roofers Accrington (BB5)',
                'Roof Repairs Blackburn & Darwen',
                'Hyndburn, Oswaldtwistle & Rishton',
                'Ribble Valley & Clitheroe',
                'Burnley, Padiham & Pendle',
                'Rochdale, Todmorden & Wigan',
              ].map((areaLabel) => (
                <li key={areaLabel}>
                  <button
                    type="button"
                    onClick={() => onNavigate('about')}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    {areaLabel}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Customer Profiles & Pages */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-white">
              Official Profiles
            </h3>
            <ul className="space-y-2.5 text-xs text-white/75">
              <li>
                <a
                  href={BUSINESS_CONFIG.externalProfiles.googleMapsShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS_CONFIG.externalProfiles.trustindexUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <span>Trustindex (4.9/5)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS_CONFIG.externalProfiles.yellUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <span>Yell.com</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS_CONFIG.externalProfiles.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <span>Facebook Page</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-white/60">
          <p>
            &copy; {new Date().getFullYear()} {BUSINESS_CONFIG.legalName}. {BUSINESS_CONFIG.address.full}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-white/80">
              <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
              <span>Free Site Inspections &amp; No-Obligation Written Quotes</span>
            </span>
            <span aria-hidden="true">·</span>
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              XML Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
