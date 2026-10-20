import React, { useState, useEffect } from 'react';
import { Expand, X, ChevronLeft, ChevronRight, Check, ArrowRight, MapPin } from 'lucide-react';
import { PROJECT_PORTFOLIO, ProjectCategory, ProjectItem } from '../data/siteConfig';
import { BeforeAfterSlider } from './BeforeAfterSlider';

interface ProjectGalleryProps {
  onRequestQuoteForProject: (serviceCategory: string) => void;
  previewMode?: boolean;
  onViewAllProjects?: () => void;
}

const CATEGORIES: ProjectCategory[] = [
  'All Projects',
  'Full Roof Replacements',
  'Roof Repairs',
  'Slate & Tile Roofing',
  'Flat Roof Installations',
  'Chimney Work',
  'Guttering & Roofline',
  'Storm Damage Repairs',
];

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  onRequestQuoteForProject,
  previewMode = false,
  onViewAllProjects,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All Projects');
  const [lightboxItemIndex, setLightboxItemIndex] = useState<number | null>(null);

  const filteredProjects: ProjectItem[] = PROJECT_PORTFOLIO.filter((project) => {
    if (selectedCategory === 'All Projects') return true;
    return (
      project.category === selectedCategory ||
      (project.secondaryCategories && project.secondaryCategories.includes(selectedCategory))
    );
  });

  const displayedProjects = previewMode ? filteredProjects.slice(0, 3) : filteredProjects;

  // Close lightbox on Escape or navigate with Arrow keys
  useEffect(() => {
    if (lightboxItemIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxItemIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxItemIndex((prev) =>
          prev === null ? null : (prev + 1) % displayedProjects.length
        );
      } else if (e.key === 'ArrowLeft') {
        setLightboxItemIndex((prev) =>
          prev === null ? null : (prev - 1 + displayedProjects.length) % displayedProjects.length
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxItemIndex, displayedProjects.length]);

  const mapCategoryToQuoteService = (cat: string): string => {
    if (cat.includes('Flat')) return 'Flat Roof';
    if (cat.includes('Chimney')) return 'Chimney Work';
    if (cat.includes('Guttering')) return 'Guttering';
    if (cat.includes('Storm')) return 'Storm Damage';
    if (cat.includes('Repair')) return 'Roof Repair';
    return 'New Roof';
  };

  const activeLightboxProject =
    lightboxItemIndex !== null && displayedProjects[lightboxItemIndex]
      ? displayedProjects[lightboxItemIndex]
      : null;

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-16 lg:py-24 bg-[#F6F5F1] text-[#0F1419] border-b border-[#E2DFD7]"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 space-y-12">
        {/* Section Heading (Shown on Home Page Preview) */}
        {previewMode && (
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#E2DFD7] pb-8">
            <div className="space-y-3 max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#D44D27]">
                RECENT ROOFING PROJECTS · LANCASHIRE &amp; THE NORTH WEST
              </p>
              <h2
                id="projects-heading"
                className="font-display text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold tracking-tight text-[#0F1419] leading-[1.12]"
              >
                OUR WORK SPEAKS FOR ITSELF.
              </h2>
              <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed">
                Discover the craftsmanship and attention to detail behind our roofing projects.
              </p>
            </div>

            {onViewAllProjects && (
              <button
                type="button"
                onClick={onViewAllProjects}
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#0F1419] hover:bg-[#D44D27] text-xs font-display font-bold uppercase tracking-wider text-white rounded-sm transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>View Full Portfolio ({PROJECT_PORTFOLIO.length} Projects)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* Category Filter Bar (Shown on dedicated Projects page) */}
        {!previewMode && (
          <div
            role="group"
            aria-label="Filter roofing projects by category"
            className="flex flex-wrap items-center gap-2"
          >
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(category);
                    setLightboxItemIndex(null);
                  }}
                  className={`px-4 py-2.5 text-xs font-bold rounded-sm transition-colors cursor-pointer whitespace-nowrap shrink-0 border ${
                    isSelected
                      ? 'bg-[#0F1419] text-white border-[#0F1419] shadow-xs'
                      : 'bg-white text-[#4B5563] border-[#E2DFD7] hover:border-[#0F1419] hover:text-[#0F1419]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        )}

        {/* Editorial Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 items-stretch">
          {displayedProjects.map((project, index) => (
            <article
              key={project.id}
              className="group bg-white border border-[#E2DFD7] hover:border-[#0F1419]/35 rounded-sm overflow-hidden flex flex-col justify-between shadow-[0_2px_10px_rgba(15,20,25,0.03)] hover:shadow-lg transition-all duration-200"
            >
              <div>
                {/* Image Container with Lightbox Trigger */}
                <div className="relative h-64 sm:h-72 bg-[#131920] overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.imageAlt}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#0B0F14]/75 via-transparent to-transparent"
                    aria-hidden="true"
                  />

                  <button
                    type="button"
                    onClick={() => setLightboxItemIndex(index)}
                    aria-label={`Inspect full-screen photo of ${project.title}`}
                    className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0B0F14]/90 hover:bg-[#D44D27] text-white text-xs font-bold rounded-sm transition-colors cursor-pointer"
                  >
                    <Expand className="w-3.5 h-3.5" />
                    <span>View Photo</span>
                  </button>
                </div>

                {/* Project Details */}
                <div className="p-6 space-y-3">
                  {/* Unboxed Metadata Line with Real Lancashire Location */}
                  <div className="flex items-center justify-between gap-2 text-xs text-[#4B5563]">
                    <span className="font-bold text-[#D44D27]">{project.category}</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-[#15803D]">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>{project.location}</span>
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-[#0F1419] leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-sm text-[#4B5563] leading-relaxed">
                    {project.description}
                  </p>

                  <ul className="space-y-1.5 pt-2 border-t border-[#E2DFD7]">
                    {project.technicalScope.map((scope, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2 text-xs text-[#0F1419]/85">
                        <Check className="w-3.5 h-3.5 text-[#15803D] shrink-0 mt-0.5" />
                        <span>{scope}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="px-6 pb-6 pt-3 flex items-center justify-between border-t border-[#E2DFD7] mt-2">
                <button
                  type="button"
                  onClick={() => setLightboxItemIndex(index)}
                  className="text-xs font-bold text-[#0F1419] hover:text-[#D44D27] transition-colors cursor-pointer"
                >
                  View Full Size
                </button>
                <button
                  type="button"
                  onClick={() => onRequestQuoteForProject(mapCategoryToQuoteService(project.category))}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D44D27] hover:text-[#0F1419] transition-colors cursor-pointer"
                >
                  <span>Enquire Similar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Interactive Before-and-After Comparison Component */}
        {!previewMode && (
          <div className="pt-4">
            <BeforeAfterSlider onRequestQuote={() => onRequestQuoteForProject('New Roof')} />
          </div>
        )}
      </div>

      {/* Full-Screen Accessible Lightbox Modal */}
      {activeLightboxProject && lightboxItemIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Project inspection: ${activeLightboxProject.title}`}
          className="fixed inset-0 z-50 bg-[#0B0F14]/95 backdrop-blur-xs flex items-center justify-center p-4 sm:p-8"
        >
          <div className="relative w-full max-w-5xl bg-white text-[#0F1419] border border-[#E2DFD7] rounded-sm overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setLightboxItemIndex(null)}
              aria-label="Close project lightbox"
              className="absolute top-4 right-4 z-20 w-10 h-10 bg-[#0B0F14] hover:bg-[#D44D27] text-white rounded-sm flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image Side */}
            <div className="lg:col-span-8 relative bg-[#0B0F14] flex items-center justify-center min-h-[300px] sm:min-h-[480px] max-h-[75vh]">
              <img
                src={activeLightboxProject.imageUrl}
                alt={activeLightboxProject.imageAlt}
                referrerPolicy="no-referrer"
                className="max-h-[72vh] w-auto object-contain"
              />

              {/* Prev / Next Overlay Buttons */}
              <button
                type="button"
                onClick={() =>
                  setLightboxItemIndex(
                    (lightboxItemIndex - 1 + displayedProjects.length) % displayedProjects.length
                  )
                }
                aria-label="Previous project photograph"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#0B0F14]/90 hover:bg-[#D44D27] text-white rounded-sm flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setLightboxItemIndex((lightboxItemIndex + 1) % displayedProjects.length)
                }
                aria-label="Next project photograph"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#0B0F14]/90 hover:bg-[#D44D27] text-white rounded-sm flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Info Side */}
            <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between bg-white text-[#0F1419] space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono-tabular font-bold text-[#D44D27]">
                  <span>{activeLightboxProject.category.toUpperCase()}</span>
                  <span className="text-[#15803D]">{activeLightboxProject.location}</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-[#0F1419]">
                  {activeLightboxProject.title}
                </h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  {activeLightboxProject.description}
                </p>

                <div className="pt-3 border-t border-[#E2DFD7] space-y-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#0F1419]">
                    Work Carried Out:
                  </p>
                  <ul className="space-y-2">
                    {activeLightboxProject.technicalScope.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-[#4B5563]">
                        <Check className="w-3.5 h-3.5 text-[#15803D] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#E2DFD7]">
                <button
                  type="button"
                  onClick={() => {
                    const targetService = mapCategoryToQuoteService(activeLightboxProject.category);
                    setLightboxItemIndex(null);
                    onRequestQuoteForProject(targetService);
                  }}
                  className="w-full py-3.5 px-5 bg-[#D44D27] hover:bg-[#B83D1B] text-white font-display font-bold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                >
                  Request Quote for Similar Work
                </button>
                <button
                  type="button"
                  onClick={() => setLightboxItemIndex(null)}
                  className="w-full py-2.5 px-4 border border-[#E2DFD7] hover:border-[#0F1419] text-xs font-bold text-[#0F1419] rounded-sm transition-colors cursor-pointer"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
