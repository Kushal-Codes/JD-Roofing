import React from 'react';

const TRUST_PILLARS = [
  {
    number: '01',
    title: 'Clear Communication',
    subtitle: 'Plain-English Assessments & Transparent Options',
    description:
      'Homeowners know what is happening at every stage and what work is being proposed. Before starting, Jordan explains the cause of the issue, walks through repair or replacement options, and keeps you updated as work progresses.',
    customerEvidence:
      '“Jordan is responsive and will always provide a good review of the issue and options for the job.” — David Farrer, Sept 2026',
    svgType: 'communication',
  },
  {
    number: '02',
    title: 'Quality Workmanship',
    subtitle: 'Proper Preparation Beneath Every Tile & Slate',
    description:
      'Thoughtful repairs and roofing installations carried out with close attention to detail—from breathable membranes and treated timber battens to dressed lead chimney flashings and mechanically fixed dry-ridge systems.',
    customerEvidence:
      '“2nd time I have used JPD roofing Ltd, quick to respond, competitive pricing, and the job (new roof) was completed to an excellent standard.” — James Kay, Aug 2026',
    svgType: 'workmanship',
  },
  {
    number: '03',
    title: 'Reliable Service',
    subtitle: 'Punctual Arrival & Organised Scheduling',
    description:
      'Customers repeatedly highlight our responsiveness and reliability. We respond promptly to initial enquiries, carry out assessments within days, and turn up when we say we are going to.',
    customerEvidence:
      '“Great value, great quality, do what they say they are going to do when they say they are going to do it.” — Andy Taylor, Mar 2026',
    svgType: 'reliability',
  },
  {
    number: '04',
    title: 'Respect for Your Property',
    subtitle: 'Clean, Considerate & Tidy Job Completion',
    description:
      'Roofing work does not have to leave your driveway or garden in a mess. Our team works considerately around your home, manages waste responsibly with dedicated skips, and cleans up thoroughly on completion.',
    customerEvidence:
      '“Arrived on time, did an amazing job of replacing the bay window roof, cleaned up after themselves.” — Z Moore, Feb 2026',
    svgType: 'respect',
  },
];

export const TrustSection: React.FC = () => {
  return (
    <section
      aria-labelledby="trust-heading"
      className="py-20 lg:py-28 bg-[#F6F5F1] text-[#0F1419] border-b border-[#E2DFD7]"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 space-y-14">
        {/* Heading */}
        <div className="max-w-2xl space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#D44D27]">
            WHY LANCASHIRE HOMEOWNERS RECOMMEND JPD
          </p>
          <h2
            id="trust-heading"
            className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight text-[#0F1419] leading-[1.12]"
          >
            YOUR HOME DESERVES PROPER CARE.
          </h2>
          <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed">
            Built directly around the four qualities homeowners mention most often in their independent reviews of JPD Roofing Ltd.
          </p>
        </div>

        {/* 4 Architectural Feature Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {TRUST_PILLARS.map((pillar) => (
            <article
              key={pillar.number}
              className="bg-white border border-[#E2DFD7] p-7 sm:p-8 rounded-sm flex flex-col justify-between space-y-6 shadow-[0_2px_10px_rgba(15,20,25,0.03)] hover:border-[#0F1419]/30 transition-colors"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-[#E2DFD7] pb-4">
                  <span className="font-mono-tabular text-xs font-bold uppercase tracking-wider text-[#15803D]">
                    {pillar.number}. {pillar.subtitle}
                  </span>

                  {/* Subtle Architectural Line Illustration */}
                  <div className="w-10 h-10 flex items-center justify-center text-[#0F1419]" aria-hidden="true">
                    {pillar.svgType === 'communication' && (
                      <svg viewBox="0 0 32 32" className="w-7 h-7 stroke-current" fill="none" strokeWidth="1.5">
                        <path d="M4 7h24v15H11l-7 5V7z" />
                        <path d="M10 13h12M10 17h8" stroke="#D44D27" />
                      </svg>
                    )}
                    {pillar.svgType === 'workmanship' && (
                      <svg viewBox="0 0 32 32" className="w-7 h-7 stroke-current" fill="none" strokeWidth="1.5">
                        <path d="M3 18L16 6l13 12" />
                        <path d="M7 15v11h18V15" />
                        <path d="M11 26v-7h10v7" stroke="#D44D27" />
                      </svg>
                    )}
                    {pillar.svgType === 'reliability' && (
                      <svg viewBox="0 0 32 32" className="w-7 h-7 stroke-current" fill="none" strokeWidth="1.5">
                        <circle cx="16" cy="16" r="12" />
                        <path d="M16 9v7l5 3" stroke="#D44D27" />
                      </svg>
                    )}
                    {pillar.svgType === 'respect' && (
                      <svg viewBox="0 0 32 32" className="w-7 h-7 stroke-current" fill="none" strokeWidth="1.5">
                        <path d="M16 4l10 4v7c0 6.5-4.2 11.2-10 13-5.8-1.8-10-6.5-10-13V8l10-4z" />
                        <path d="M11.5 16l3 3 6-6" stroke="#15803D" />
                      </svg>
                    )}
                  </div>
                </div>

                <h3 className="font-display text-2xl font-bold text-[#0F1419]">
                  {pillar.title}
                </h3>

                <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              {/* Claim-to-Proof Adjacency Quote */}
              <div className="pt-4 border-t border-[#E2DFD7]">
                <p className="text-xs italic text-[#0F1419]/85 bg-[#F6F5F1] p-3.5 rounded-sm border border-[#E2DFD7] leading-relaxed">
                  {pillar.customerEvidence}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
