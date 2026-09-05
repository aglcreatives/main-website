import React from 'react';
import { Sparkles, Shield, Box, Crown, Gem, Compass, Feather, Hexagon, CircleDot, Flame, Orbit, Leaf } from 'lucide-react';

interface Brand {
  id: string;
  name: string;
  category: string;
  icon: React.ReactNode;
  accentColor: string;
}

const BRANDS: Brand[] = [
  {
    id: 'brand-01',
    name: 'AURA LABS',
    category: 'Skincare & Cosmetics',
    icon: <Sparkles className="w-4 h-4 text-[#2F6FED]" />,
    accentColor: '#2F6FED',
  },
  {
    id: 'brand-02',
    name: 'SOLSTICE SPIRITS',
    category: 'Distillery & Beverages',
    icon: <Flame className="w-4 h-4 text-[#FF9933]" />,
    accentColor: '#FF9933',
  },
  {
    id: 'brand-03',
    name: 'VELUM GOODS',
    category: 'Luxury Fashion Goods',
    icon: <Gem className="w-4 h-4 text-[#2F6FED]" />,
    accentColor: '#2F6FED',
  },
  {
    id: 'brand-04',
    name: 'NORDIC KRAFT',
    category: 'Eco DTC Homeware',
    icon: <Box className="w-4 h-4 text-[#12295A]" />,
    accentColor: '#12295A',
  },
  {
    id: 'brand-05',
    name: 'KINETIC AUDIO',
    category: 'Consumer Electronics',
    icon: <Orbit className="w-4 h-4 text-[#FF9933]" />,
    accentColor: '#FF9933',
  },
  {
    id: 'brand-06',
    name: 'BOTANICA CARE',
    category: 'Organic Wellness',
    icon: <Leaf className="w-4 h-4 text-[#2F6FED]" />,
    accentColor: '#2F6FED',
  },
  {
    id: 'brand-07',
    name: 'LUMEN APOTHECARY',
    category: 'Fragrance & Bath',
    icon: <CircleDot className="w-4 h-4 text-[#FF9933]" />,
    accentColor: '#FF9933',
  },
  {
    id: 'brand-08',
    name: 'ARCHETYPE PRESS',
    category: 'Art Editions & Books',
    icon: <Compass className="w-4 h-4 text-[#12295A]" />,
    accentColor: '#12295A',
  },
  {
    id: 'brand-09',
    name: 'PRISM OPTICS',
    category: 'Eyewear & Accessories',
    icon: <Hexagon className="w-4 h-4 text-[#2F6FED]" />,
    accentColor: '#2F6FED',
  },
  {
    id: 'brand-10',
    name: 'TERRA PACK',
    category: 'Bio Packaging Systems',
    icon: <Shield className="w-4 h-4 text-[#FF9933]" />,
    accentColor: '#FF9933',
  },
  {
    id: 'brand-11',
    name: 'VERVE ROASTERS',
    category: 'Specialty Coffee',
    icon: <Crown className="w-4 h-4 text-[#12295A]" />,
    accentColor: '#12295A',
  },
  {
    id: 'brand-12',
    name: 'ZENITH BOTANICALS',
    category: 'Nutraceuticals',
    icon: <Feather className="w-4 h-4 text-[#2F6FED]" />,
    accentColor: '#2F6FED',
  },
];

export const TrustedByMarquee: React.FC = () => {
  return (
    <section
      id="trusted-by"
      className="relative w-full bg-[#EDF1FA] border-y border-[#12295A]/8 py-7 sm:py-8 overflow-hidden z-10"
      aria-label="Trusted by brands"
    >
      {/* Label Text Centered Above */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-5">
        <div className="inline-flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF9933]" />
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-[#12295A]/70 font-sans">
            TRUSTED BY BRANDS WE'VE PACKAGED FOR
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF9933]" />
        </div>
      </div>

      {/* Marquee Track with Hover Pause */}
      <div className="relative w-full overflow-hidden group">
        {/* Soft edge fade masks for seamless horizontal flow */}
        <div className="absolute top-0 left-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-[#EDF1FA] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-[#EDF1FA] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex items-center gap-4 sm:gap-6 whitespace-nowrap group-hover:[animation-play-state:paused]">
          {/* Repeat brand list twice for continuous seamless loop */}
          {[...BRANDS, ...BRANDS].map((brand, idx) => (
            <div
              key={`${brand.id}-${idx}`}
              className="inline-flex items-center gap-3 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-white/70 backdrop-blur-xs border border-[#12295A]/8 grayscale opacity-45 hover:grayscale-0 hover:opacity-100 hover:scale-105 hover:bg-white hover:border-[#2F6FED]/35 hover:shadow-[0_8px_20px_rgba(10,25,48,0.08)] transition-all duration-300 cursor-pointer select-none group/item"
            >
              <div className="p-1.5 rounded-lg bg-[#FAF7F2] border border-[#12295A]/10 group-hover/item:border-[#2F6FED]/30 group-hover/item:scale-110 transition-transform">
                {brand.icon}
              </div>
              <div className="flex flex-col text-left">
                <span className="font-heading text-xs sm:text-sm font-bold text-[#0A1930] tracking-wider leading-none">
                  {brand.name}
                </span>
                <span className="text-[9px] sm:text-[10px] text-[#161B22]/60 font-sans tracking-wide mt-1">
                  {brand.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
