import React from 'react';
import { ArrowRight, Check, Phone } from 'lucide-react';
import { ROOFING_SERVICES, BUSINESS_CONFIG } from '../data/siteConfig';

interface ServiceCardsProps {
  onSelectServiceForQuote: (serviceShortTitle: string) => void;
  previewMode?: boolean;
  onViewAllServices?: () => void;
}

export const ServiceCards: React.FC<ServiceCardsProps> = ({
  onSelectServiceForQuote,
  previewMode = false,
  onViewAllServices,
}) => {
  const displayedServices = previewMode ? ROOFING_SERVICES.slice(0, 4) : ROOFING_SERVICES;

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="py-16 lg:py-24 bg-white text-[#0F1419] border-b border-[#E2DFD7]"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 space-y-12">
        {/* Editorial Section Heading (Shown on Home Page Preview) */}
        {previewMode && (
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-[#E2DFD7] pb-8">
            <div className="space-y-3 max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#D44D27]">
                OUR ROOFING SERVICES
              </p>
              <h2
                id="services-heading"
                className="font-display text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold tracking-tight text-[#0F1419] leading-[1.12]"
              >
                EVERY ROOF. EVERY DETAIL.
              </h2>
              <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed">
                From a small repair to a complete roof replacement, professional roofing solutions tailored to your property.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {onViewAllServices && (
                <button
                  type="button"
                  onClick={onViewAllServices}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-[#0F1419] hover:bg-[#D44D27] text-xs font-display font-bold uppercase tracking-wider text-white rounded-sm transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>View All 8 Services</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
              <a
                href={BUSINESS_CONFIG.phone.telHref}
                className="inline-flex items-center gap-2.5 px-5 py-3 bg-[#F6F5F1] border border-[#E2DFD7] hover:border-[#0F1419] text-sm font-bold text-[#0F1419] rounded-sm transition-colors whitespace-nowrap shrink-0"
              >
                <Phone className="w-4 h-4 text-[#D44D27]" />
                <span>{BUSINESS_CONFIG.phone.display}</span>
              </a>
            </div>
          </div>
        )}

        {/* Service Cards in High-Craft Light Architectural Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {displayedServices.map((service) => (
            <article
              key={service.id}
              className="group bg-[#F9F8F5] hover:bg-white border border-[#E2DFD7] hover:border-[#0F1419]/40 rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-200 hover:shadow-lg"
            >
              <div>
                {/* Service Photograph */}
                <div className="relative h-48 overflow-hidden bg-[#131920] border-b border-[#E2DFD7]">
                  <img
                    src={service.imageUrl}
                    alt={service.imageAlt}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#0B0F14]/85 via-transparent to-black/20"
                    aria-hidden="true"
                  />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
                    <span className="font-mono-tabular font-bold text-[#F59E0B]">
                      {service.number}.
                    </span>
                    <span className="truncate font-medium text-white/90">{service.categoryTag}</span>
                  </div>
                </div>

                {/* Card Copy & Technical Scope */}
                <div className="p-6 space-y-4">
                  <h3 className="font-display text-xl font-bold text-[#0F1419] group-hover:text-[#D44D27] transition-colors">
                    {service.number}. {service.title}
                  </h3>

                  <p className="text-sm text-[#4B5563] leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-2 pt-3 border-t border-[#E2DFD7]">
                    {service.keyDetails.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[#0F1419]/85 leading-snug">
                        <Check className="w-3.5 h-3.5 text-[#15803D] shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Action Footer */}
              <div className="px-6 pb-6 pt-2">
                <button
                  type="button"
                  onClick={() => onSelectServiceForQuote(service.shortTitle)}
                  aria-label={`Get a Quote for ${service.title}`}
                  className="w-full py-3 px-4 bg-[#0F1419] hover:bg-[#D44D27] text-white text-xs font-display font-bold uppercase tracking-wider rounded-sm flex items-center justify-between transition-colors duration-150 cursor-pointer whitespace-nowrap"
                >
                  <span>Get a Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {previewMode && onViewAllServices && (
          <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#F6F5F1] border border-[#E2DFD7] p-6 rounded-sm">
            <div>
              <p className="font-display font-bold text-base text-[#0F1419]">
                Looking for Fascias &amp; Guttering, Chimney Repointing, Slate Roofing or Roof Maintenance?
              </p>
              <p className="text-xs text-[#4B5563] mt-0.5">
                Explore our full range of 8 specialist roofing services across Accrington and Lancashire.
              </p>
            </div>
            <button
              type="button"
              onClick={onViewAllServices}
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#D44D27] hover:bg-[#B83D1B] text-white text-xs font-display font-bold uppercase tracking-wider rounded-sm transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>Explore All 8 Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
