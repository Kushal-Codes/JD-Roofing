import React, { useState } from 'react';
import { Phone, ArrowRight, Star, ShieldCheck, CheckCircle2, MapPin } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/siteConfig';

interface HeroProps {
  onRequestQuote: (service?: string) => void;
  onExploreProjects?: () => void;
}

const HERO_PROJECT_SLIDES = [
  {
    id: 'slate-reroof',
    image: '/images/jpd/proj_20.jpg',
    caption: 'Completed Smooth Slate Re-Roof, Dry Ridge & Repointed Chimney Stack',
    location: 'Accrington & East Lancashire',
    tag: 'Natural Slate & Chimney Work',
    shortTab: '01. Slate Roof',
  },
  {
    id: 'hipped-reroof',
    image: '/images/jpd/proj_16.jpg',
    caption: 'Full Hipped Interlocking Tile Roof Replacement & Dry-Hip System',
    location: 'Blackburn & Hyndburn',
    tag: 'Full Roof Replacement',
    shortTab: '02. Hipped Tile',
  },
  {
    id: 'jordan-onsite',
    image: '/images/jpd/land_5.jpeg',
    caption: 'Complete Terraced Strip-Back, Breathable Membrane & Graded Timber Battens',
    location: 'Accrington, BB5',
    tag: 'Structural Preparation',
    shortTab: '03. Re-Roof Prep',
  },
];

export const Hero: React.FC<HeroProps> = ({ onRequestQuote, onExploreProjects }) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const currentSlide = HERO_PROJECT_SLIDES[activeSlideIndex];

  return (
    <section
      aria-label="Introduction to JPD Roofing Ltd"
      className="relative bg-[#0B0F14] text-white overflow-hidden border-b border-[#E2DFD7]"
    >
      {/* Background Media Layer with Pure Welsh Slate Scrim */}
      <div className="absolute inset-0 z-0 bg-[#0B0F14]">
        <img
          src={currentSlide.image}
          alt={currentSlide.caption}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-35 transition-opacity duration-500"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#0B0F14] via-[#0B0F14]/92 to-[#0B0F14]/55"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0B0F14] via-transparent to-[#0B0F14]/65"
          aria-hidden="true"
        />
      </div>

      {/* Main Split Editorial Container */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8 pt-10 pb-10 lg:pt-14 lg:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Core Value Proposition & Primary Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              {/* Location Eyebrow */}
              <p className="text-xs sm:text-sm font-bold tracking-[0.16em] uppercase text-[#F59E0B]">
                JPD ROOFING LTD | ACCRINGTON, LANCASHIRE
              </p>

              {/* Commanding Headline */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.35rem] font-extrabold tracking-tight text-white leading-[1.08]">
                ROOFING DONE RIGHT.{' '}
                <span className="text-[#F6F5F1] underline decoration-[#D44D27] decoration-3 underline-offset-8">
                  BUILT TO LAST.
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg sm:text-xl text-white/90 leading-relaxed max-w-2xl font-normal">
                Expert roof repairs, new roofs and roofing solutions across Accrington, Lancashire and the North West.
              </p>

              {/* Editorial Context Line */}
              <p className="text-sm sm:text-base text-white/75 leading-relaxed max-w-xl">
                Led personally by Jordan and our dedicated in-house team—delivering honest assessments, clean site handovers, and weatherproof craftsmanship for terraced, detached and commercial properties.
              </p>
            </div>

            {/* Primary & Secondary Action Buttons */}
            <div className="space-y-4 pt-1">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  type="button"
                  onClick={() => onRequestQuote()}
                  className="inline-flex items-center justify-center gap-3 px-7 py-3.5 bg-[#D44D27] hover:bg-[#B83D1B] text-white font-display font-bold text-sm sm:text-base tracking-wide uppercase rounded-sm transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 shadow-lg shadow-black/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D44D27]"
                >
                  <span>GET A FREE QUOTE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={BUSINESS_CONFIG.phone.telHref}
                  className="inline-flex items-center justify-center gap-3 px-7 py-3.5 bg-white/10 border border-white/30 hover:border-white hover:bg-white/15 text-white font-display font-bold text-sm sm:text-base tracking-wide uppercase rounded-sm transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <Phone className="w-4 h-4 text-[#F59E0B]" />
                  <span>CALL OUR TEAM · {BUSINESS_CONFIG.phone.display}</span>
                </a>
              </div>

              <p className="text-xs text-white/70">
                57 Wordsworth Road, Accrington BB5 0LU &nbsp;·&nbsp; Free, no-obligation site inspections &amp; written quotes &nbsp;·&nbsp; Mon–Sat 7am–7pm
              </p>
            </div>
          </div>

          {/* Right Column: Recent Work Showcase Frame */}
          <div className="lg:col-span-5">
            <div className="relative bg-white text-[#0F1419] border border-white/20 rounded-sm overflow-hidden flex flex-col shadow-2xl shadow-black/50">
              <div className="relative h-56 sm:h-64 lg:h-[250px] overflow-hidden bg-[#131920]">
                <img
                  src={currentSlide.image}
                  alt={currentSlide.caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-all duration-300"
                />
              </div>

              {/* Bottom Caption Bar on Showcase Image */}
              <div className="relative z-10 bg-white border-t border-[#E2DFD7] p-4 sm:p-5 space-y-2.5">
                <div className="flex items-center justify-between gap-2 text-xs text-[#4B5563]">
                  <span className="font-bold text-[#D44D27] uppercase tracking-wider">
                    {currentSlide.tag}
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-[#15803D]">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{currentSlide.location}</span>
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#0F1419] font-semibold leading-snug">
                  {currentSlide.caption}
                </p>

                {/* Interactive Slide Selector Buttons */}
                <div className="pt-1 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5" role="group" aria-label="Select featured project photo">
                    {HERO_PROJECT_SLIDES.map((slide, idx) => (
                      <button
                        key={slide.id}
                        type="button"
                        onClick={() => setActiveSlideIndex(idx)}
                        aria-label={`Show project photo: ${slide.tag}`}
                        aria-pressed={activeSlideIndex === idx}
                        className={`px-2.5 py-1 text-xs font-semibold rounded-sm transition-colors cursor-pointer whitespace-nowrap ${
                          activeSlideIndex === idx
                            ? 'bg-[#0F1419] text-white'
                            : 'bg-[#F6F5F1] text-[#4B5563] hover:bg-[#ECEAE3] hover:text-[#0F1419]'
                        }`}
                      >
                        {slide.shortTab}
                      </button>
                    ))}
                  </div>

                  {onExploreProjects && (
                    <button
                      type="button"
                      onClick={onExploreProjects}
                      className="text-xs font-bold text-[#D44D27] hover:text-[#0F1419] inline-flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <span>All Projects</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Verified Reputation Strip Underneath Hero Split */}
        <div className="mt-10 pt-7 border-t border-white/15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Item 1: Multi-Platform Rating */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="flex items-center text-[#F59E0B]" aria-label="4.9 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                ))}
              </div>
              <span className="font-mono-tabular font-bold text-base text-white">4.9 / 5.0</span>
            </div>
            <p className="text-sm font-bold text-white">
              269 Customer Reviews Across Platforms
            </p>
            <p className="text-xs text-white/70 leading-relaxed">
              Rated 4.9/5 across Google, Checkatrade, Yell (100 reviews on Yell) and Trustindex.
            </p>
          </div>

          {/* Item 2: Genuine Customer Recommendation Themes */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[#22C55E]">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider">Homeowner Feedback</span>
            </div>
            <p className="text-sm font-bold text-white">
              Trusted by Repeat Customers
            </p>
            <p className="text-xs text-white/70 leading-relaxed">
              Homeowners consistently highlight Jordan’s prompt communication, punctuality, and tidy job completion.
            </p>
          </div>

          {/* Item 3: Free No-Obligation Quotes */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[#F59E0B]">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider">Transparent Pricing</span>
            </div>
            <p className="text-sm font-bold text-white">
              Free, No-Obligation Quotes
            </p>
            <p className="text-xs text-white/70 leading-relaxed">
              Clear explanation of repair vs replacement options with honest, competitive written estimates.
            </p>
          </div>

          {/* Item 4: Local Roofing Specialists */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[#22C55E]">
              <MapPin className="w-4 h-4 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider">Local Specialists</span>
            </div>
            <p className="text-sm font-bold text-white">
              Accrington &amp; North West Team
            </p>
            <p className="text-xs text-white/70 leading-relaxed">
              Serving Accrington (BB5), Blackburn, Hyndburn, Ribble Valley, Burnley, Rochdale, Todmorden &amp; Wigan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
