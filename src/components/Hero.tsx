import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onOpenQuoteModal: () => void;
}

const SLIDES = [
  { eyebrow: 'Premium packaging solutions', title: 'Packaging that arrives with purpose.', copy: 'Strong, considered boxes, bags, and finishing touches built to protect your product and make every delivery feel like your brand.', image: '/images/hero/kraft-mailer-studio.png', imagePosition: 'object-left', alt: 'Burgundy premium boxes and paper bags in a studio' },
  { eyebrow: 'Premium folding cartons', title: 'Shelf presence, made tangible.', copy: 'From first sketch to finished carton, we shape memorable packaging for products that deserve a second look.', image: '/images/hero/folding-cartons-studio.png', imagePosition: 'object-center', alt: 'Warm toned folding cartons in a product studio' },
  { eyebrow: 'Retail bags and finishing', title: 'Every detail carries your brand.', copy: 'Thoughtful bags, sleeves, labels, and finishing touches that bring a complete retail experience together.', image: '/images/hero/sustainable-retail-studio.png', imagePosition: 'object-center', alt: 'Sustainable retail packaging arranged on a green studio set' },
];

export const Hero: React.FC<HeroProps> = ({ onOpenQuoteModal }) => {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActiveSlide((current) => (current + 1) % SLIDES.length), 5000);
    return () => window.clearInterval(timer);
  }, []);

  const slide = SLIDES[activeSlide];
  return (
    <section id="home" className="relative h-[100dvh] min-h-[100svh] overflow-hidden bg-[#f2eee7]">
      <AnimatePresence>
        <motion.div key={slide.image} initial={{ opacity: 0, scale: 1.025 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease: 'easeInOut' }} className="absolute inset-0">
          <img src={slide.image} alt={slide.alt} className={`h-full w-full object-cover ${slide.imagePosition}`} />
          <div className="absolute inset-0 bg-[#0A1930]/10" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#081426]/72 via-[#081426]/38 to-transparent" aria-hidden="true" />
        </motion.div>
      </AnimatePresence>
      <div className="relative z-10 mx-auto flex h-[100dvh] min-h-[100svh] max-w-7xl items-center px-4 pb-28 pt-32 sm:px-6 sm:pt-36 lg:px-8">
        <div className="max-w-2xl text-white">
          <motion.p key={`${slide.eyebrow}-eyebrow`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-5 inline-flex items-center border border-white/30 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] backdrop-blur-sm">{slide.eyebrow}</motion.p>
          <motion.h1 key={`${slide.title}-title`} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="font-heading text-5xl font-bold leading-[1.03] sm:text-6xl lg:text-7xl">{slide.title}</motion.h1>
          <motion.p key={`${slide.copy}-copy`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }} className="mt-6 max-w-xl text-base leading-relaxed text-white/88 sm:text-lg">{slide.copy}</motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={onOpenQuoteModal} className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#FF9933] px-6 py-3 font-bold text-[#0A1930] transition-colors hover:bg-[#FFB35C]">Get a free quote <ArrowRight className="h-4 w-4" /></button>
            <button type="button" onClick={() => navigate('/products')} className="inline-flex min-h-12 items-center justify-center border border-white/50 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/15">View product formats</button>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-7 left-0 right-0 z-20 mx-auto flex max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="flex gap-2" role="tablist" aria-label="Hero slides">{SLIDES.map((item, index) => <button key={item.image} type="button" role="tab" aria-selected={activeSlide === index} aria-label={`Show slide ${index + 1}`} onClick={() => setActiveSlide(index)} className={`h-1.5 transition-all ${activeSlide === index ? 'w-12 bg-[#FF9933]' : 'w-6 bg-white/55 hover:bg-white'}`} />)}</div>
      </div>
    </section>
  );
};
