import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Boxes } from 'lucide-react';

interface HeroProps {
  onOpenQuoteModal: () => void;
}

// Headline words for staggered animation
const HEADLINE_LINES = [
  ['We', 'Design', 'It.'],
  ['We', 'Print', 'It.'],
  ['We', 'Pack', 'It', 'Right.'],
];

// Curated packaging showcase photography with matching captions
interface ShowcaseSlide {
  id: string;
  title: string;
  specs: string;
  imageUrl: string;
  imageAlt: string;
}

const SHOWCASE_SLIDES: ShowcaseSlide[] = [
  {
    id: 'slide-rigid',
    title: 'Luxury Rigid & Magnetic Gift Boxes',
    specs: '1500 GSM Greyboard • Custom Insert • Gold Foil Debossing',
    imageUrl:
      'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Luxury rigid magnetic packaging box with gold foil stamping and custom interior cradle',
  },
  {
    id: 'slide-folding',
    title: 'Custom Folding Cartons & Sleeves',
    specs: '350 GSM Solid Bleached Board • Raised 3D Spot UV',
    imageUrl:
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Minimalist cosmetics folding cartons and paperboard packaging',
  },
  {
    id: 'slide-mailer',
    title: 'Structural E-Commerce Mailer Boxes',
    specs: 'Fluted Kraft Board • High-Strength Edge Protection',
    imageUrl:
      'https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Neatly arranged eco-friendly corrugated mailer packaging boxes',
  },
];

export const Hero: React.FC<HeroProps> = ({ onOpenQuoteModal }) => {
  const navigate = useNavigate();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Smooth, subtle automatic crossfade every 5 seconds (pauses on hover)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % SHOWCASE_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, currentSlideIndex]);

  const handleSelectSlide = (idx: number) => {
    setCurrentSlideIndex(idx);
  };

  const currentSlide = SHOWCASE_SLIDES[currentSlideIndex];

  return (
    <section
      id="home"
      className="relative pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-16 sm:pb-20 lg:pb-24 overflow-hidden bg-[#FAF7F2]"
    >
      {/* 1. Ambient Background Glow Blobs */}
      {/* Top-Right Accent Blue Blob */}
      <div
        className="absolute -top-24 -right-24 w-[380px] sm:w-[540px] lg:w-[680px] h-[380px] sm:h-[540px] lg:h-[680px] rounded-full bg-[#2F6FED]/12 blur-[100px] sm:blur-[140px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      {/* Bottom-Left Saffron Blob */}
      <div
        className="absolute top-1/3 -left-28 w-[320px] sm:w-[480px] lg:w-[580px] h-[320px] sm:h-[480px] lg:h-[580px] rounded-full bg-[#FF9933]/12 blur-[110px] sm:blur-[150px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* 2. Main Hero Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Headline, Pill, Copy, CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-5 sm:space-y-6">
            {/* Pill Tag Above Headline */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF9933]/15 border border-[#FF9933]/30 text-[#0A1930] shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-[#FF9933] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest font-sans">
                PACKAGING • DESIGN • PRINT STUDIO
              </span>
            </motion.div>

            {/* Big Bold Headline with Word-by-Word Reveal */}
            <h1
              id="hero-headline"
              className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-bold text-[#0A1930] leading-[1.08] tracking-tight"
            >
              {HEADLINE_LINES.map((line, lineIdx) => (
                <div
                  key={lineIdx}
                  className="overflow-hidden flex flex-wrap gap-x-2.5 sm:gap-x-3.5"
                >
                  {line.map((word, wordIdx) => {
                    const totalIndex = lineIdx * 4 + wordIdx;
                    return (
                      <motion.span
                        key={wordIdx}
                        initial={{ y: '105%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          duration: 0.6,
                          delay: 0.15 + totalIndex * 0.07,
                          ease: [0.215, 0.61, 0.355, 1],
                        }}
                        className={`inline-block ${
                          word === 'Right.'
                            ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#12295A] via-[#2F6FED] to-[#FF9933]'
                            : ''
                        }`}
                      >
                        {word}
                      </motion.span>
                    );
                  })}
                </div>
              ))}
            </h1>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="text-[#161B22]/80 text-base sm:text-lg md:text-xl font-normal max-w-2xl leading-relaxed"
            >
              We design and manufacture custom packaging boxes, labels, and bags that protect your products and make your brand stand out on shelves and in deliveries.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto pt-2"
            >
              {/* Primary Solid Saffron Button */}
              <button
                id="hero-primary-cta"
                onClick={onOpenQuoteModal}
                className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#FF9933] text-[#0A1930] font-bold text-base shadow-[0_6px_20px_rgba(255,153,51,0.35)] hover:bg-[#FFB35C] hover:shadow-[0_10px_28px_rgba(255,153,51,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer min-h-[48px]"
              >
                <span>Get a Free Quote</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              {/* Secondary Outlined Navy Button -> Navigates to Products Catalog */}
              <button
                id="hero-secondary-cta"
                onClick={() => navigate('/products')}
                className="group relative inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl border-2 border-[#12295A] text-[#12295A] font-semibold text-base hover:bg-[#12295A] hover:text-white active:scale-98 transition-all duration-200 cursor-pointer min-h-[48px]"
              >
                <span>Browse Our Products</span>
                <Boxes className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
              </button>
            </motion.div>
          </div>

          {/* Right Column: Calm, Professional Packaging Showcase Visual */}
          <div className="lg:col-span-5 flex items-center justify-center w-full pt-4 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.35, ease: 'easeOut' }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="relative w-full max-w-lg lg:max-w-none rounded-3xl p-2 sm:p-2.5 bg-white border border-[#12295A]/12 shadow-[0_20px_50px_rgba(10,25,48,0.08)]"
            >
              {/* Inner Picture Frame */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#0A1930]">
                {/* Crossfade Images with subtle Ken Burns zoom */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide.id}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1.0 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      opacity: { duration: 0.9, ease: 'easeInOut' },
                      scale: { duration: 6, ease: 'easeOut' },
                    }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img
                      src={currentSlide.imageUrl}
                      alt={currentSlide.imageAlt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Soft gradient overlay for contrast */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#0A1930]/85 via-[#0A1930]/20 to-transparent pointer-events-none"
                  aria-hidden="true"
                />

                {/* Top Studio Label */}
                <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#0A1930]/85 backdrop-blur-md border border-white/20 text-[#FAF7F2] shadow-sm">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#FF9933] font-bold mr-1.5">
                      AGL STUDIO
                    </span>
                    <span className="text-[10px] font-mono tracking-wide text-white/90">
                      Craft Showcase
                    </span>
                  </div>
                </div>

                {/* Bottom Caption Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-10 bg-gradient-to-t from-[#0A1930]/95 via-[#0A1930]/60 to-transparent">
                  <div className="pointer-events-none">
                    <p className="text-white font-heading font-bold text-base sm:text-lg leading-snug drop-shadow-sm">
                      {currentSlide.title}
                    </p>
                    <p className="text-[#FAF7F2]/80 font-mono text-[11px] sm:text-xs mt-1">
                      {currentSlide.specs}
                    </p>
                  </div>

                  {/* Interactive Slide Progress Indicators */}
                  <div
                    className="flex items-center gap-2 mt-3.5 pointer-events-auto"
                    role="tablist"
                    aria-label="Packaging showcase slides"
                  >
                    {SHOWCASE_SLIDES.map((slide, idx) => {
                      const isActive = idx === currentSlideIndex;
                      return (
                        <button
                          key={slide.id}
                          id={`hero-showcase-dot-${idx}`}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          aria-label={`Slide ${idx + 1}: ${slide.title}`}
                          onClick={() => handleSelectSlide(idx)}
                          className={`h-2 rounded-full transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9933] ${
                            isActive
                              ? 'w-7 bg-[#FF9933] shadow-[0_0_8px_rgba(255,153,51,0.6)]'
                              : 'w-2 bg-white/40 hover:bg-white/80'
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
