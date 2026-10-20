import React, { useState } from 'react';
import { Menu, X, Phone, MapPin, Star, ArrowUpRight } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/siteConfig';

export type AppPage = 'home' | 'services' | 'projects' | 'reviews' | 'about' | 'quote';

interface NavbarProps {
  activePage: AppPage;
  onNavigate: (page: AppPage) => void;
  onRequestQuote: (service?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  onRequestQuote,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: Array<{ id: AppPage; label: string }> = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'about', label: 'About & Areas' },
  ];

  const handleNavClick = (page: AppPage) => {
    setMobileMenuOpen(false);
    onNavigate(page);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E2DFD7] text-[#0F1419] shadow-[0_1px_3px_rgba(15,20,25,0.04)]">
      {/* Subtle Architectural Top Utility Strip on Desktop */}
      <div className="hidden lg:block bg-[#0B0F14] text-white/80 border-b border-white/10">
        <div className="max-w-[1280px] mx-auto px-8 h-9 flex items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5 text-white/85">
              <MapPin className="w-3.5 h-3.5 text-[#D44D27]" />
              <span>57 Wordsworth Road, Accrington BB5 0LU</span>
            </span>
            <span className="text-white/30">·</span>
            <span>Mon–Sat: 07:00 – 19:00</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => handleNavClick('reviews')}
              className="inline-flex items-center gap-1.5 text-white/90 hover:text-white transition-colors cursor-pointer"
            >
              <div className="flex items-center text-[#F59E0B]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-[#F59E0B] text-[#F59E0B]" />
                ))}
              </div>
              <span className="font-mono-tabular font-bold text-white">4.9/5</span>
              <span className="text-white/70">(269 Reviews)</span>
            </button>
            <span className="text-white/30">·</span>
            <a
              href={BUSINESS_CONFIG.phone.telHref}
              className="inline-flex items-center gap-1.5 font-mono-tabular font-bold text-white hover:text-[#F59E0B] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#D44D27]" />
              <span>{BUSINESS_CONFIG.phone.display}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-8 px-5 sm:px-8 h-16 md:h-20">
        {/* Zone 1: Architectural Brand Mark */}
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="group flex items-center gap-3 text-left cursor-pointer shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D44D27]"
        >
          <div className="w-9 h-9 bg-[#0F1419] group-hover:bg-[#D44D27] transition-colors rounded-xs flex items-center justify-center text-white shrink-0">
            <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current" fill="none" strokeWidth="2.2">
              <path d="M3 13L12 5l9 8" />
              <path d="M6 11v8h12v-8" />
            </svg>
          </div>
          <div>
            <span className="block font-display text-lg sm:text-xl font-extrabold tracking-tight text-[#0F1419] leading-none">
              JPD Roofing Ltd
            </span>
            <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-[#4B5563] mt-1">
              Accrington · Lancashire
            </span>
          </div>
        </button>

        {/* Zone 2: Multi-Page Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-1 lg:gap-2"
        >
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`px-3.5 py-2 text-sm font-semibold rounded-sm transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#0F1419] text-white'
                    : 'text-[#4B5563] hover:text-[#0F1419] hover:bg-[#F6F5F1]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Quote CTA & Mobile Menu Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onRequestQuote()}
            className={`hidden md:inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-bold text-white transition-colors duration-150 rounded-sm whitespace-nowrap shrink-0 cursor-pointer shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D44D27] ${
              activePage === 'quote'
                ? 'bg-[#0F1419] hover:bg-[#D44D27]'
                : 'bg-[#D44D27] hover:bg-[#0F1419]'
            }`}
          >
            <span>Get a Free Quote</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 text-[#0F1419] hover:text-[#D44D27] transition-colors rounded-sm focus-visible:outline-2 focus-visible:outline-[#D44D27]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#E2DFD7] px-5 pt-3 pb-6 space-y-4 shadow-xl">
          <nav aria-label="Mobile Navigation" className="flex flex-col divide-y divide-[#E2DFD7]">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`py-3.5 text-left text-base font-bold transition-colors flex items-center justify-between ${
                    isActive ? 'text-[#D44D27]' : 'text-[#0F1419] hover:text-[#D44D27]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="text-xs uppercase tracking-wider">Current Page</span>}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => handleNavClick('quote')}
              className={`py-3.5 text-left text-base font-bold transition-colors flex items-center justify-between ${
                activePage === 'quote' ? 'text-[#D44D27]' : 'text-[#0F1419] hover:text-[#D44D27]'
              }`}
            >
              <span>Quote &amp; Contact</span>
              {activePage === 'quote' && <span className="text-xs uppercase tracking-wider">Current Page</span>}
            </button>
          </nav>

          <div className="pt-2 grid grid-cols-1 gap-3">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onRequestQuote();
              }}
              className="w-full py-3.5 px-5 bg-[#D44D27] hover:bg-[#B83D1B] text-white font-bold text-sm tracking-wide uppercase rounded-sm text-center transition-colors"
            >
              Get a Free Quote
            </button>
            <a
              href={BUSINESS_CONFIG.phone.telHref}
              className="w-full py-3 px-5 border border-[#0F1419]/25 text-[#0F1419] hover:border-[#0F1419] font-bold text-sm tracking-wide rounded-sm flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#D44D27]" />
              <span>Call {BUSINESS_CONFIG.phone.display}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
