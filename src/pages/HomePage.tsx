import React from 'react';
import { Hero } from '../components/Hero';
import { TrustedByMarquee } from '../components/TrustedByMarquee';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { Services } from '../components/Services';
import { OurProcess } from '../components/OurProcess';
import { Portfolio } from '../components/Portfolio';
import { Testimonials } from '../components/Testimonials';
import { CtaAndContact } from '../components/CtaAndContact';

interface HomePageProps {
  onOpenQuoteModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenQuoteModal }) => {
  return (
    <>
      {/* SECTION 1: Hero */}
      <Hero onOpenQuoteModal={onOpenQuoteModal} />

      {/* SECTION 2: Trusted-By Brand Marquee */}
      <TrustedByMarquee />

      {/* SECTION 3: Why AGL Creatives (Why Choose Us) */}
      <WhyChooseUs />

      {/* SECTION 4: Services (What We Do - Full-bleed Navy with interactive fold panels) */}
      <Services onOpenQuoteModal={onOpenQuoteModal} />

      {/* SECTION 5: Our Process (Packaging Transformation Centerpiece) */}
      <OurProcess onOpenQuoteModal={onOpenQuoteModal} />

      {/* SECTION 6: Portfolio ("Our Work" Bento / Masonry Grid with Case Study Lightbox) */}
      <Portfolio onOpenQuoteModal={onOpenQuoteModal} />

      {/* SECTION 7: Testimonials ("CLIENT LOVE" Carousel) */}
      <Testimonials />

      {/* SECTION 8: CTA + Contact (Saffron Fold-Line Banner & 2-Column Form) */}
      <CtaAndContact onOpenQuoteModal={onOpenQuoteModal} />
    </>
  );
};
