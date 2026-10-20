import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, ExternalLink, CheckCircle2, ArrowRight } from 'lucide-react';
import { BUSINESS_CONFIG, VERIFIED_REVIEWS, VerifiedReview } from '../data/siteConfig';

type ReviewFilter = 'all' | 'repeat' | 'reroof' | 'repairs';

interface ReviewCarouselProps {
  previewMode?: boolean;
  onViewAllReviews?: () => void;
}

export const ReviewCarousel: React.FC<ReviewCarouselProps> = ({
  previewMode = false,
  onViewAllReviews,
}) => {
  const [activeFilter, setActiveFilter] = useState<ReviewFilter>('all');
  const [startIndex, setStartIndex] = useState(0);

  const filteredReviews = VERIFIED_REVIEWS.filter((review) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'repeat') return Boolean(review.isRepeatCustomer);
    if (activeFilter === 'reroof') {
      return (
        review.workType.toLowerCase().includes('new roof') ||
        review.workType.toLowerCase().includes('re-roof') ||
        review.workType.toLowerCase().includes('bay')
      );
    }
    if (activeFilter === 'repairs') {
      return (
        review.workType.toLowerCase().includes('gutter') ||
        review.workType.toLowerCase().includes('flashing') ||
        review.workType.toLowerCase().includes('repair') ||
        review.workType.toLowerCase().includes('clean')
      );
    }
    return true;
  });

  const visibleCount = 3;
  const maxStart = Math.max(0, filteredReviews.length - visibleCount);
  const safeStart = Math.min(startIndex, maxStart);

  const handleFilterChange = (filter: ReviewFilter) => {
    setActiveFilter(filter);
    setStartIndex(0);
  };

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(maxStart, prev + 1));
  };

  const displayedReviews: VerifiedReview[] = previewMode
    ? VERIFIED_REVIEWS.slice(0, 3)
    : filteredReviews.slice(safeStart, safeStart + visibleCount);

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="py-16 lg:py-24 bg-[#F6F5F1] text-[#0F1419] border-b border-[#E2DFD7]"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 space-y-12">
        {/* Top Section Header + Reputation Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#D44D27]">
              HOMEOWNER TESTIMONIALS
            </p>
            <h2
              id="reviews-heading"
              className="font-display text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold tracking-tight text-[#0F1419] leading-[1.12]"
            >
              DON&apos;T JUST TAKE OUR WORD FOR IT.
            </h2>
            <p className="text-base sm:text-lg text-[#4B5563] max-w-2xl leading-relaxed">
              Real experiences from homeowners who trusted JPD Roofing with their properties.
            </p>
          </div>

          {/* Multi-Platform Rating Breakdown Box */}
          <div className="lg:col-span-5 bg-white border border-[#E2DFD7] shadow-[0_2px_12px_rgba(15,20,25,0.04)] p-6 rounded-sm space-y-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <span className="font-mono-tabular text-3xl font-extrabold text-[#0F1419]">
                  {BUSINESS_CONFIG.reputationStats.combinedAverageRating}
                </span>
                <div>
                  <div className="flex items-center text-[#F59E0B]" aria-label="4.9 out of 5 stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                    ))}
                  </div>
                  <p className="text-xs font-bold text-[#0F1419] mt-0.5">
                    Excellent · {BUSINESS_CONFIG.reputationStats.fiveStarPercentage}% 5-Star Ratings
                  </p>
                </div>
              </div>
              <a
                href={BUSINESS_CONFIG.externalProfiles.trustindexUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#15803D] hover:text-[#0F1419] transition-colors whitespace-nowrap shrink-0"
              >
                <span>269 Reviews</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <p className="text-xs text-[#4B5563] leading-relaxed border-t border-[#E2DFD7] pt-3">
              Rated <strong className="text-[#0F1419]">4.9/5</strong> across{' '}
              <span className="font-mono-tabular font-bold text-[#0F1419]">269</span> customer reviews on Google, Checkatrade, Yell (<span className="font-mono-tabular">100</span> reviews) and Trustindex.
            </p>
          </div>
        </div>

        {/* Interactive Filter Tabs & Carousel Controls (Full Page Mode) */}
        {!previewMode && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-[#E2DFD7]">
            <div
              role="group"
              aria-label="Filter customer reviews"
              className="flex flex-wrap items-center gap-1.5 p-1 bg-white border border-[#E2DFD7] rounded-sm"
            >
              {[
                { id: 'all', label: `All Reviews (${VERIFIED_REVIEWS.length})` },
                { id: 'repeat', label: 'Repeat Customers' },
                { id: 'reroof', label: 'New Roofs & Bay Roofs' },
                { id: 'repairs', label: 'Repairs & Roofline' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleFilterChange(tab.id as ReviewFilter)}
                  className={`px-3.5 py-2 text-xs font-bold rounded-sm transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    activeFilter === tab.id
                      ? 'bg-[#0F1419] text-white shadow-xs'
                      : 'text-[#4B5563] hover:text-[#0F1419] hover:bg-[#F6F5F1]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Carousel Prev / Next Controls */}
            <div className="flex items-center justify-between sm:justify-end gap-3">
              <span className="text-xs font-mono-tabular text-[#4B5563]">
                Showing {safeStart + 1}–{Math.min(safeStart + visibleCount, filteredReviews.length)} of{' '}
                {filteredReviews.length} featured reviews
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={safeStart === 0}
                  aria-label="Previous customer reviews"
                  className="w-10 h-10 inline-flex items-center justify-center border border-[#E2DFD7] bg-white text-[#0F1419] disabled:opacity-35 hover:border-[#0F1419] transition-colors rounded-sm cursor-pointer disabled:cursor-not-allowed shadow-2xs"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={safeStart >= maxStart}
                  aria-label="Next customer reviews"
                  className="w-10 h-10 inline-flex items-center justify-center border border-[#E2DFD7] bg-white text-[#0F1419] disabled:opacity-35 hover:border-[#0F1419] transition-colors rounded-sm cursor-pointer disabled:cursor-not-allowed shadow-2xs"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {displayedReviews.map((review) => {
            const initials = review.reviewerName
              .split(' ')
              .map((n) => n[0])
              .join('')
              .slice(0, 2)
              .toUpperCase();

            return (
              <article
                key={review.id}
                className="bg-white border border-[#E2DFD7] p-6 sm:p-7 rounded-sm flex flex-col justify-between space-y-6 shadow-[0_2px_10px_rgba(15,20,25,0.03)] transition-all duration-200 hover:border-[#0F1419]/35 hover:shadow-md"
              >
                <div className="space-y-4">
                  {/* Quiet Unboxed Metadata Line */}
                  <div className="flex items-center justify-between gap-2 text-xs text-[#4B5563]">
                    <div className="flex items-center gap-1 text-[#F59E0B]" aria-label={`${review.rating} out of 5 stars`}>
                      {[...Array(review.rating)].map((_, idx) => (
                        <Star key={idx} className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                      ))}
                    </div>
                    <time dateTime={review.datePublished} className="font-mono-tabular">
                      {review.displayDate}
                    </time>
                  </div>

                  {/* Highlight Kicker */}
                  {review.featuredHighlight && (
                    <p className="text-xs font-bold uppercase tracking-wider text-[#D44D27]">
                      {review.featuredHighlight}
                    </p>
                  )}

                  {/* Review Body */}
                  <blockquote className="text-sm sm:text-[15px] text-[#0F1419] leading-relaxed font-normal">
                    &ldquo;{review.text}&rdquo;
                  </blockquote>
                </div>

                {/* Reviewer Attribution Footer */}
                <div className="pt-4 border-t border-[#E2DFD7] space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-full bg-[#F6F5F1] border border-[#E2DFD7] text-[#0F1419] font-display font-bold text-xs flex items-center justify-center shrink-0">
                        {initials}
                      </span>
                      <span className="font-display font-bold text-sm text-[#0F1419]">
                        {review.reviewerName}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#15803D]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D]" />
                      <span>{review.platform}</span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 text-xs text-[#4B5563]">
                    <span className="truncate">{review.workType}</span>
                    <span aria-hidden="true">·</span>
                    <a
                      href={review.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[#0F1419] hover:text-[#D44D27] underline underline-offset-4 whitespace-nowrap shrink-0"
                    >
                      View Review
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Preview Footer or Full Directory Bar */}
        {previewMode && onViewAllReviews ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-[#E2DFD7] p-6 rounded-sm shadow-2xs">
            <div>
              <p className="font-display font-bold text-base text-[#0F1419]">
                Read More Homeowner Reviews Across Google, Yell &amp; Checkatrade
              </p>
              <p className="text-xs text-[#4B5563] mt-0.5">
                Browse reviews from repeat customers, full roof replacements, bay window roofs and roofline installations.
              </p>
            </div>
            <button
              type="button"
              onClick={onViewAllReviews}
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#0F1419] hover:bg-[#D44D27] text-white text-xs font-display font-bold uppercase tracking-wider rounded-sm transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>Read All Reviews</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="bg-white border border-[#E2DFD7] p-6 sm:p-8 rounded-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-2xs">
            <div className="space-y-1">
              <h3 className="font-display text-lg font-bold text-[#0F1419]">
                JPD Roofing Ltd Across Public Review Directories
              </h3>
              <p className="text-sm text-[#4B5563]">
                View our customer feedback directly on Trustindex, Google Maps, Yell.com and Facebook.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={BUSINESS_CONFIG.externalProfiles.trustindexUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0F1419] hover:bg-[#D44D27] text-white text-xs font-bold tracking-wide uppercase rounded-sm transition-colors whitespace-nowrap shrink-0"
              >
                <span>Trustindex (269 Reviews)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={BUSINESS_CONFIG.externalProfiles.googleMapsShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#F6F5F1] border border-[#E2DFD7] hover:border-[#0F1419] text-[#0F1419] text-xs font-bold tracking-wide uppercase rounded-sm transition-colors whitespace-nowrap shrink-0"
              >
                <span>Google Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={BUSINESS_CONFIG.externalProfiles.yellUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#F6F5F1] border border-[#E2DFD7] hover:border-[#0F1419] text-[#0F1419] text-xs font-bold tracking-wide uppercase rounded-sm transition-colors whitespace-nowrap shrink-0"
              >
                <span>Yell.com (100 Reviews)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={BUSINESS_CONFIG.externalProfiles.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#F6F5F1] border border-[#E2DFD7] hover:border-[#0F1419] text-[#0F1419] text-xs font-bold tracking-wide uppercase rounded-sm transition-colors whitespace-nowrap shrink-0"
              >
                <span>Facebook Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
