import React, { useState, useCallback, useEffect } from 'react';
import { ArrowRight, Phone, Star, CheckCircle2, MapPin } from 'lucide-react';
import { Navbar, AppPage } from './components/Navbar';
import { Hero } from './components/Hero';
import { ReviewCarousel } from './components/ReviewCarousel';
import { ServiceCards } from './components/ServiceCards';
import { ProjectGallery } from './components/ProjectGallery';
import { QuoteForm } from './components/QuoteForm';
import { AboutSection } from './components/AboutSection';
import { TrustSection } from './components/TrustSection';
import { EmergencyCTA } from './components/EmergencyCTA';
import { ServiceAreas } from './components/ServiceAreas';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';
import { BUSINESS_CONFIG } from './data/siteConfig';

const PAGE_HEADERS: Record<
  Exclude<AppPage, 'home'>,
  {
    eyebrow: string;
    title: string;
    subtitle: string;
  }
> = {
  services: {
    eyebrow: 'SPECIALIST ROOFING SERVICES · ACCRINGTON & LANCASHIRE',
    title: 'EVERY ROOF. EVERY DETAIL.',
    subtitle:
      'From targeted slate and flashing repairs to complete re-roofs, EPDM flat roofs, chimney repointing and uPVC roofline installations across East Lancashire and the North West.',
  },
  projects: {
    eyebrow: 'COMPLETED ROOFING PORTFOLIO · EAST LANCASHIRE',
    title: 'OUR WORK SPEAKS FOR ITSELF.',
    subtitle:
      'Inspect completed residential and commercial roofing projects by Jordan and the JPD Roofing Ltd team—from full terraced slate replacements to interactive preparation-to-completion comparisons.',
  },
  reviews: {
    eyebrow: 'INDEPENDENT HOMEOWNER FEEDBACK · 4.9 / 5 RATING',
    title: 'TRUSTED ACROSS 269 CUSTOMER REVIEWS.',
    subtitle:
      'Read verified homeowner feedback across Google, Checkatrade, Yell (100 reviews) and Trustindex highlighting our communication, reliability and tidy workmanship.',
  },
  about: {
    eyebrow: 'ABOUT JPD ROOFING LTD · 57 WORDSWORTH ROAD, ACCRINGTON',
    title: 'LOCAL ROOFERS. PERSONAL ACCOUNTABILITY.',
    subtitle:
      'Meet Jordan and our dedicated in-house roofing team, explore the standards we work by, and check your postcode coverage across Lancashire and the North West.',
  },
  quote: {
    eyebrow: 'FREE NO-OBLIGATION SITE INSPECTION & WRITTEN ESTIMATE',
    title: 'REQUEST YOUR FREE ROOFING QUOTE.',
    subtitle:
      'Use our 4-step quotation form to tell us about your roof, upload optional photographs from ground level, or request a direct telephone callback from Jordan.',
  },
};

function parsePageFromHash(): AppPage {
  const raw = window.location.hash.replace('#', '').toLowerCase();
  if (raw === 'services') return 'services';
  if (raw === 'projects') return 'projects';
  if (raw === 'reviews') return 'reviews';
  if (raw === 'about' || raw === 'areas') return 'about';
  if (raw === 'quote' || raw === 'contact') return 'quote';
  return 'home';
}

export default function App() {
  const [activePage, setActivePage] = useState<AppPage>(() => parsePageFromHash());
  const [preselectedService, setPreselectedService] = useState<string | null>(null);
  const [preselectedUrgency, setPreselectedUrgency] = useState<string | null>(null);

  useEffect(() => {
    const onHashChange = () => {
      setActivePage(parsePageFromHash());
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigateToPage = useCallback((page: AppPage, skipScrollTop = false) => {
    setActivePage(page);
    const nextHash = page === 'home' ? '' : `#${page}`;
    if (window.location.hash !== nextHash) {
      window.history.pushState(null, '', nextHash || window.location.pathname);
    }
    if (!skipScrollTop) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const handleRequestQuote = useCallback(
    (service?: string, urgency?: string) => {
      if (service) {
        setPreselectedService(service);
      }
      if (urgency) {
        setPreselectedUrgency(urgency);
      }
      navigateToPage('quote', true);
      setTimeout(() => {
        const quoteEl = document.getElementById('quote');
        if (quoteEl) {
          quoteEl.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 60);
    },
    [navigateToPage]
  );

  const handleRequestUrgentHelp = useCallback(() => {
    handleRequestQuote('Storm Damage', 'Emergency / Active Leak');
  }, [handleRequestQuote]);

  const handleRequestQuoteWithPostcode = useCallback(
    (postcode: string) => {
      handleRequestQuote('Roof Repair');
      setTimeout(() => {
        const input = document.getElementById('quote-postcode') as HTMLInputElement | null;
        if (input) {
          input.value = postcode;
        }
      }, 200);
    },
    [handleRequestQuote]
  );

  const handleClearPreselection = useCallback(() => {
    setPreselectedService(null);
    setPreselectedUrgency(null);
  }, []);

  const subPageHeader =
    activePage !== 'home' && activePage !== 'quote' ? PAGE_HEADERS[activePage] : null;

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0F1419]">
      <Navbar
        activePage={activePage}
        onNavigate={(page) => navigateToPage(page)}
        onRequestQuote={(service) => handleRequestQuote(service)}
      />

      <main className="flex-1">
        {/* Sub-Page Architectural Header Banner */}
        {subPageHeader && (
          <section
            aria-label={subPageHeader.title}
            className="bg-[#0B0F14] text-white border-b border-[#E2DFD7] py-12 lg:py-16"
          >
            <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                <div className="space-y-3 max-w-3xl">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#F59E0B]">
                    {subPageHeader.eyebrow}
                  </p>
                  <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.08]">
                    {subPageHeader.title}
                  </h1>
                  <p className="text-base sm:text-lg text-white/80 leading-relaxed">
                    {subPageHeader.subtitle}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  {activePage !== 'quote' && (
                    <button
                      type="button"
                      onClick={() => handleRequestQuote()}
                      className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#D44D27] hover:bg-[#B83D1B] text-white font-display font-bold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <span>Get a Free Quote</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                  <a
                    href={BUSINESS_CONFIG.phone.telHref}
                    className="inline-flex items-center gap-2 px-5 py-3.5 bg-white/10 border border-white/25 hover:border-white text-white font-display font-bold text-xs uppercase tracking-wider rounded-sm transition-colors whitespace-nowrap"
                  >
                    <Phone className="w-4 h-4 text-[#F59E0B]" />
                    <span>{BUSINESS_CONFIG.phone.display}</span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* PAGE 1: HOME (Concise, high-conversion executive overview) */}
        {activePage === 'home' && (
          <>
            <Hero
              onRequestQuote={(service) => handleRequestQuote(service)}
              onExploreProjects={() => navigateToPage('projects')}
            />
            <ServiceCards
              previewMode={true}
              onSelectServiceForQuote={(service) => handleRequestQuote(service)}
              onViewAllServices={() => navigateToPage('services')}
            />
            <ProjectGallery
              previewMode={true}
              onRequestQuoteForProject={(service) => handleRequestQuote(service)}
              onViewAllProjects={() => navigateToPage('projects')}
            />
            <ReviewCarousel
              previewMode={true}
              onViewAllReviews={() => navigateToPage('reviews')}
            />
            {/* Compact Home Page About & Areas Strip */}
            <section
              aria-label="About JPD Roofing Ltd and Service Coverage"
              className="py-16 lg:py-20 bg-white text-[#0F1419] border-b border-[#E2DFD7]"
            >
              <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#F6F5F1] border border-[#E2DFD7] rounded-sm p-6 sm:p-10">
                  <div className="lg:col-span-7 space-y-4">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#D44D27]">
                      LOCAL ROOFING SPECIALISTS · ACCRINGTON, BB5 0LU
                    </p>
                    <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F1419]">
                      Personal Service from Jordan &amp; Our In-House Lancashire Team
                    </h2>
                    <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
                      Based at 57 Wordsworth Road in Accrington, we handle everything from slipped slates and chimney repointing to complete new roofs across Accrington, Blackburn, Hyndburn, Ribble Valley, Burnley, Rochdale, Todmorden and Wigan.
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#0F1419] pt-1">
                      <span className="inline-flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
                        <span>Direct Personal Accountability</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                        <span>4.9/5 Across 269 Reviews</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-[#D44D27]" />
                        <span>East Lancashire &amp; North West</span>
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
                    <button
                      type="button"
                      onClick={() => navigateToPage('about')}
                      className="w-full py-3.5 px-6 bg-[#0F1419] hover:bg-[#D44D27] text-white font-display font-bold text-xs uppercase tracking-wider rounded-sm inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <span>Meet Our Team &amp; Check Postcode Coverage</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRequestQuote()}
                      className="w-full py-3.5 px-6 bg-[#D44D27] hover:bg-[#B83D1B] text-white font-display font-bold text-xs uppercase tracking-wider rounded-sm inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <span>Request a Free Roofing Quote</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </section>
            <EmergencyCTA onRequestUrgentHelp={handleRequestUrgentHelp} />
          </>
        )}

        {/* PAGE 2: SERVICES (All 8 Specialist Services + 4 Trust Pillars + Urgent Help) */}
        {activePage === 'services' && (
          <>
            <ServiceCards
              previewMode={false}
              onSelectServiceForQuote={(service) => handleRequestQuote(service)}
            />
            <TrustSection />
            <EmergencyCTA onRequestUrgentHelp={handleRequestUrgentHelp} />
          </>
        )}

        {/* PAGE 3: PROJECTS (Full 12-Project Portfolio + Category Filters + Before/After Slider) */}
        {activePage === 'projects' && (
          <>
            <ProjectGallery
              previewMode={false}
              onRequestQuoteForProject={(service) => handleRequestQuote(service)}
            />
            <EmergencyCTA onRequestUrgentHelp={handleRequestUrgentHelp} />
          </>
        )}

        {/* PAGE 4: REVIEWS (Full Filterable Review Carousel + Directory Links + Trust Pillars) */}
        {activePage === 'reviews' && (
          <>
            <ReviewCarousel previewMode={false} />
            <TrustSection />
            <EmergencyCTA onRequestUrgentHelp={handleRequestUrgentHelp} />
          </>
        )}

        {/* PAGE 5: ABOUT & AREAS (Company Story, Team Photos, Postcode Checker & Coverage Map) */}
        {activePage === 'about' && (
          <>
            <AboutSection onRequestQuote={() => handleRequestQuote()} />
            <TrustSection />
            <ServiceAreas onRequestQuoteWithPostcode={handleRequestQuoteWithPostcode} />
            <ContactSection onOpenFullQuoteForm={() => handleRequestQuote()} />
          </>
        )}

        {/* PAGE 6: QUOTE & CONTACT (4-Step Interactive Quote Form + Direct Callback & Map) */}
        {activePage === 'quote' && (
          <>
            <QuoteForm
              preselectedService={preselectedService}
              preselectedUrgency={preselectedUrgency}
              onClearPreselection={handleClearPreselection}
            />
            <ContactSection
              onOpenFullQuoteForm={() => {
                const quoteEl = document.getElementById('quote');
                if (quoteEl) quoteEl.scrollIntoView({ behavior: 'smooth' });
              }}
            />
            <ServiceAreas onRequestQuoteWithPostcode={handleRequestQuoteWithPostcode} />
          </>
        )}
      </main>

      <Footer
        onNavigate={(page) => navigateToPage(page)}
        onRequestQuote={(service) => handleRequestQuote(service)}
      />
      <MobileStickyBar onRequestQuote={() => handleRequestQuote()} />
    </div>
  );
}
