import React, { useState, useRef } from 'react';
import { MoveHorizontal, ArrowRight, ShieldCheck } from 'lucide-react';
import { BEFORE_AFTER_COMPARISONS } from '../data/siteConfig';

interface BeforeAfterSliderProps {
  onRequestQuote?: () => void;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ onRequestQuote }) => {
  const [selectedPairIndex, setSelectedPairIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentPair = BEFORE_AFTER_COMPARISONS[selectedPairIndex];

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.buttons !== 1 && e.pointerType === 'mouse') return;
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = Math.round((x / rect.width) * 100);
    setSliderPosition(percentage);
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = Math.round((x / rect.width) * 100);
    setSliderPosition(percentage);
  };

  return (
    <div className="bg-white text-[#0F1419] border border-[#E2DFD7] shadow-[0_4px_20px_rgba(15,20,25,0.05)] rounded-sm p-6 sm:p-8 lg:p-10 space-y-8">
      {/* Header & Project Pair Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#E2DFD7] pb-6">
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#D44D27]">
            BENEATH THE SLATES · PREPARATION TO COMPLETION
          </p>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0F1419]">
            Drag to Inspect Structural Preparation vs Completed Roof
          </h3>
          <p className="text-sm text-[#4B5563] max-w-2xl">
            A lasting roof starts beneath the slates. Drag the central handle to compare our breathable membrane, graded timber batten and insulation preparation with the finished weatherproofed roof.
          </p>
        </div>

        {/* Project Pair Selector Buttons */}
        <div
          role="group"
          aria-label="Select before and after project comparison"
          className="flex flex-wrap items-center gap-2 shrink-0"
        >
          {BEFORE_AFTER_COMPARISONS.map((pair, idx) => (
            <button
              key={pair.id}
              type="button"
              onClick={() => {
                setSelectedPairIndex(idx);
                setSliderPosition(50);
              }}
              className={`px-3.5 py-2 text-xs font-bold rounded-sm transition-colors cursor-pointer whitespace-nowrap shrink-0 border ${
                selectedPairIndex === idx
                  ? 'bg-[#0F1419] text-white border-[#0F1419]'
                  : 'bg-[#F6F5F1] text-[#4B5563] border-[#E2DFD7] hover:border-[#0F1419] hover:text-[#0F1419]'
              }`}
            >
              0{idx + 1}. {pair.category}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Comparison Viewport + Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Interactive Split Image Container */}
        <div className="lg:col-span-8 space-y-3">
          <div
            ref={containerRef}
            onPointerMove={handlePointerMove}
            onClick={handleContainerClick}
            data-testid="before-after-viewport"
            className="relative w-full h-[320px] sm:h-[420px] lg:h-[460px] bg-[#0B0F14] overflow-hidden rounded-sm select-none cursor-ew-resize border border-[#E2DFD7]"
          >
            {/* Base Layer: AFTER (Completed) Image */}
            <img
              src={currentPair.afterImage}
              alt={currentPair.afterAlt}
              referrerPolicy="no-referrer"
              draggable={false}
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
            />

            {/* Clipped Layer: BEFORE (Stage 1 / Strip & Membrane) Image */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img
                src={currentPair.beforeImage}
                alt={currentPair.beforeAlt}
                referrerPolicy="no-referrer"
                draggable={false}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Top Labels */}
            <div className="absolute top-4 left-4 z-10 bg-[#0B0F14]/90 border border-white/20 px-3 py-1.5 text-xs font-bold text-white pointer-events-none">
              {currentPair.beforeLabel}
            </div>
            <div className="absolute top-4 right-4 z-10 bg-white/95 border border-[#E2DFD7] px-3 py-1.5 text-xs font-bold text-[#15803D] pointer-events-none shadow-xs">
              {currentPair.afterLabel}
            </div>

            {/* Central Divider Line & Handle */}
            <div
              className="absolute top-0 bottom-0 z-20 w-0.5 bg-white shadow-md pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#0F1419] text-white shadow-xl flex items-center justify-center border-2 border-white">
                <MoveHorizontal className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Accessible Range Slider Input + Quick Position Presets */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
            <div className="flex items-center gap-3 flex-1">
              <label htmlFor="before-after-range" className="text-xs font-semibold text-[#4B5563] whitespace-nowrap">
                Comparison Split ({sliderPosition}%):
              </label>
              <input
                id="before-after-range"
                type="range"
                min={5}
                max={95}
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                aria-label="Adjust before and after roofing comparison split"
                className="w-full accent-[#0F1419] cursor-pointer"
              />
            </div>

            <div className="flex items-center gap-2 text-xs">
              <button
                type="button"
                onClick={() => setSliderPosition(85)}
                className="px-2.5 py-1 bg-[#F6F5F1] border border-[#E2DFD7] hover:border-[#0F1419] text-[#0F1419] font-medium rounded-sm transition-colors cursor-pointer whitespace-nowrap"
              >
                Show Preparation
              </button>
              <button
                type="button"
                onClick={() => setSliderPosition(50)}
                className="px-2.5 py-1 bg-[#F6F5F1] border border-[#E2DFD7] hover:border-[#0F1419] text-[#0F1419] font-medium rounded-sm transition-colors cursor-pointer whitespace-nowrap"
              >
                50 / 50 Split
              </button>
              <button
                type="button"
                onClick={() => setSliderPosition(15)}
                className="px-2.5 py-1 bg-[#F6F5F1] border border-[#E2DFD7] hover:border-[#0F1419] text-[#0F1419] font-medium rounded-sm transition-colors cursor-pointer whitespace-nowrap"
              >
                Show Completed
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Project Narrative & Re-Roofing Standard */}
        <div className="lg:col-span-4 space-y-5 bg-[#F6F5F1] border border-[#E2DFD7] p-6 rounded-sm">
          <div className="space-y-2">
            <p className="text-xs font-mono-tabular font-bold text-[#D44D27] uppercase tracking-wider">
              CASE STUDY 0{selectedPairIndex + 1} OF 0{BEFORE_AFTER_COMPARISONS.length}
            </p>
            <h4 className="font-display text-xl font-bold text-[#0F1419]">
              {currentPair.title}
            </h4>
            <p className="text-xs font-medium text-[#4B5563]">
              {currentPair.subtitle}
            </p>
          </div>

          <p className="text-sm text-[#0F1419]/85 leading-relaxed border-t border-[#E2DFD7] pt-4">
            {currentPair.workSummary}
          </p>

          <div className="pt-3 border-t border-[#E2DFD7] text-xs text-[#4B5563] space-y-3">
            <div className="flex items-center gap-1.5 font-bold text-[#15803D]">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Our Re-Roofing Standard</span>
            </div>
            <p className="leading-relaxed">
              Every full roof replacement includes complete strip-back to rafters, timber inspection, breathable membrane, graded treated battens and mechanically fixed ridge systems.
            </p>
            {onRequestQuote && (
              <button
                type="button"
                onClick={onRequestQuote}
                className="w-full py-2.5 px-4 bg-[#0F1419] hover:bg-[#D44D27] text-white text-xs font-display font-bold uppercase tracking-wider rounded-sm inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Request a Re-Roofing Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
