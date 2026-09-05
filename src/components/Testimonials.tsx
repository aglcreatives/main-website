import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles, Building2, CheckCircle2 } from 'lucide-react';

export interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  clientRole: string;
  company: string;
  rating: number;
  productType: string;
  verifiedOrder: boolean;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'solstice',
    quote:
      'AGL Creatives did a fantastic job with our limited-edition gin boxes. The magnetic closure and crisp gold foil made our packaging stand out immediately, and the entire batch sold out in two days.',
    clientName: 'Elena Rostova',
    clientRole: 'Founder & Creative Director',
    company: 'Solstice Distilling Co.',
    rating: 5,
    productType: 'Rigid Magnetic Box • Gold Foil',
    verifiedOrder: true,
  },
  {
    id: 'kinetic',
    quote:
      'Our shipping damage dropped significantly after switching to AGL’s double-walled corrugated mailers. The boxes look great and keep our products completely safe in courier transit.',
    clientName: 'Marcus Thorne',
    clientRole: 'VP of Brand Operations',
    company: 'Kinetic Audio Lab',
    rating: 5,
    productType: 'E-Flute Corrugated Mailers',
    verifiedOrder: true,
  },
  {
    id: 'aura',
    quote:
      'The print quality and spot UV finish on our cosmetic cartons are crisp and consistent across all 12 products. Our orders always arrive on time and match our approved samples.',
    clientName: 'Dr. Priya Vance',
    clientRole: 'Co-Founder & Chief Formulator',
    company: 'Aura Skin Lab',
    rating: 5,
    productType: '350 GSM Folding Cartons • Spot 3D UV',
    verifiedOrder: true,
  },
  {
    id: 'zenith',
    quote:
      'AGL delivered our coffee valve pouches ahead of our festive rush. The aroma valves work reliably, the matte finish feels great, and our pouches stand straight on store shelves.',
    clientName: 'David H. Cho',
    clientRole: 'Head of E-Commerce',
    company: 'Zenith Roasting Works',
    rating: 5,
    productType: 'Degassing Stand-Up Pouches',
    verifiedOrder: true,
  },
  {
    id: 'atelier',
    quote:
      'We ordered presentation folders and stationery on thick 540 GSM card with copper foil debossing. The edges and folds look very neat and professional.',
    clientName: 'Simone de Vries',
    clientRole: 'Brand Director',
    company: 'Atelier Private Wealth',
    rating: 5,
    productType: '540 GSM Letterpress Collateral',
    verifiedOrder: true,
  },
];

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const total = TESTIMONIALS.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-play timer (5.5 seconds), pauses on hover or touch interaction
  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide, prefersReducedMotion]);

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartX.current = null;
    setIsPaused(false);
  };

  // Keyboard navigation when focused inside section
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  };

  return (
    <section
      id="testimonials"
      className="py-24 sm:py-32 bg-[#FAF7F2] relative overflow-hidden border-t border-[#12295A]/10 select-none"
      aria-label="Client Testimonials"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Decorative Fold Graphic Creases */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-10 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full stroke-[#12295A]">
          <line x1="0" y1="0" x2="200" y2="200" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="200" y1="0" x2="0" y2="200" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="80" fill="none" strokeWidth="1" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-80 h-80 opacity-10 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full stroke-[#FF9933]">
          <polygon points="0,0 200,0 100,200" fill="none" strokeWidth="1" strokeDasharray="3 3" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF9933]/15 border border-[#FF9933]/30 text-[#0A1930] text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#FF9933]" />
            <span>CLIENT LOVE</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A1930] tracking-tight">
            What Our Clients Say
          </h2>

          <p className="text-sm sm:text-base text-[#161B22]/75 mt-3 max-w-xl mx-auto leading-relaxed">
            Read what brand owners, founders, and packaging managers say about working with AGL Creatives.
          </p>
        </div>

        {/* Carousel Container (Coverflow Feel on Desktop, Single Slide with Swipe on Mobile) */}
        <div
          className="relative w-full max-w-5xl mx-auto min-h-[380px] sm:min-h-[360px] flex items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Desktop 3-Card Visual Deck / Coverflow Layout */}
          <div className="w-full relative flex items-center justify-center py-4">
            {TESTIMONIALS.map((item, index) => {
              // Calculate relative offset from current active index
              const offset = (index - currentIndex + total) % total;
              // Normalize offset into -2, -1, 0, 1, 2
              const normalizedOffset = offset > total / 2 ? offset - total : offset;
              const isCenter = normalizedOffset === 0;
              const isLeft = normalizedOffset === -1;
              const isRight = normalizedOffset === 1;
              const isVisible = isCenter || isLeft || isRight;

              if (!isVisible) return null;

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: isCenter ? 1 : 0.45,
                    scale: isCenter ? 1 : 0.88,
                    x: isCenter
                      ? 0
                      : isLeft
                      ? '-42%'
                      : '42%',
                    zIndex: isCenter ? 20 : 10,
                    filter: isCenter ? 'blur(0px)' : 'blur(1.5px)',
                  }}
                  transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onClick={() => {
                    if (isLeft) prevSlide();
                    if (isRight) nextSlide();
                  }}
                  className={`absolute w-full max-w-[92%] sm:max-w-[620px] rounded-3xl p-7 sm:p-9 transition-shadow duration-300 ${
                    isCenter
                      ? 'bg-white shadow-[0_16px_40px_rgba(10,25,48,0.12)] border border-[#12295A]/15 cursor-default'
                      : 'bg-white/80 shadow-[0_8px_24px_rgba(10,25,48,0.06)] border border-[#12295A]/10 cursor-pointer hidden md:block'
                  }`}
                  style={{
                    transformOrigin: 'center center',
                  }}
                >
                  {/* Folded Corner Accent in Top-Right */}
                  <div className="absolute top-0 right-0 w-12 h-12 pointer-events-none overflow-hidden rounded-tr-3xl">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-[#FF9933]/15 -rotate-45 translate-x-8 -translate-y-8 border-b border-[#FF9933]/40" />
                  </div>

                  {/* Top Bar: Saffron Quote Icon & 5 Stars */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#FF9933]/15 border border-[#FF9933]/30 flex items-center justify-center text-[#FF9933] shadow-xs">
                      <Quote className="w-6 h-6 fill-[#FF9933]" />
                    </div>

                    <div className="flex items-center gap-1 bg-[#FAF7F2] px-3 py-1.5 rounded-full border border-[#12295A]/10">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-[#FF9933] text-[#FF9933]"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Italic Testimonial Quote */}
                  <blockquote className="text-base sm:text-lg text-[#161B22] font-serif italic leading-relaxed mb-6 sm:mb-8 line-clamp-4 sm:line-clamp-none">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>

                  {/* Divider */}
                  <div className="w-full h-px bg-[#12295A]/10 mb-5" />

                  {/* Client Info & Spec Badge */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="font-heading font-bold text-base sm:text-lg text-[#0A1930] flex items-center gap-1.5">
                        <span>{item.clientName}</span>
                        {item.verifiedOrder && (
                          <CheckCircle2 className="w-4 h-4 text-[#2F6FED] shrink-0" title="Verified Production Client" />
                        )}
                      </div>
                      <div className="text-xs text-[#161B22]/70 flex items-center gap-1.5 mt-0.5">
                        <Building2 className="w-3.5 h-3.5 text-[#FF9933]" />
                        <span className="font-medium text-[#0A1930]">{item.company}</span>
                        <span className="text-[#12295A]/40">•</span>
                        <span>{item.clientRole}</span>
                      </div>
                    </div>

                    <div className="inline-flex self-start sm:self-auto px-2.5 py-1 rounded-md bg-[#0A1930]/5 border border-[#0A1930]/10 text-[11px] font-mono text-[#0A1930]">
                      {item.productType}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Carousel Controls: Arrows + Dots */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
          {/* Left / Right Nav Buttons */}
          <div className="flex items-center gap-3">
            <button
              id="prev-testimonial-btn"
              type="button"
              onClick={prevSlide}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full bg-white border border-[#12295A]/15 text-[#0A1930] hover:bg-[#FF9933] hover:text-[#0A1930] hover:border-[#FF9933] shadow-sm flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dot Indicators */}
            <div className="flex items-center gap-2 px-3 py-2 bg-white/70 backdrop-blur-xs rounded-full border border-[#12295A]/10 shadow-xs">
              {TESTIMONIALS.map((item, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={item.id}
                    id={`testimonial-dot-${idx}`}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to testimonial ${idx + 1} from ${item.company}`}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      isActive
                        ? 'w-7 h-2.5 bg-[#FF9933]'
                        : 'w-2.5 h-2.5 bg-[#12295A]/25 hover:bg-[#12295A]/50'
                    }`}
                  />
                );
              })}
            </div>

            <button
              id="next-testimonial-btn"
              type="button"
              onClick={nextSlide}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full bg-white border border-[#12295A]/15 text-[#0A1930] hover:bg-[#FF9933] hover:text-[#0A1930] hover:border-[#FF9933] shadow-sm flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <span className="text-[11px] font-mono text-[#12295A]/60">
            {currentIndex + 1} / {total} — AUTO-ADVANCING (PAUSES ON HOVER)
          </span>
        </div>
      </div>
    </section>
  );
};
