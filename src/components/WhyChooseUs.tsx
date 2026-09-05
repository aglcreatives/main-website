import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { Palette, Printer, Leaf, Clock, Sparkles, Check, ArrowUpRight } from 'lucide-react';

interface FeatureItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  highlights: string[];
}

const FEATURES: FeatureItem[] = [
  {
    id: 'feature-01',
    tag: 'CUSTOM SIZES & DIELINES',
    title: 'Custom Box Design',
    description: 'We make packaging to fit your exact product dimensions, keeping items protected during shipping and looking sharp on shelves.',
    icon: <Palette className="w-6 h-6 text-[#FF9933]" />,
    highlights: ['Free CAD dieline files (.AI / .PDF)', 'White sample boxes for size testing', 'Paper and board options for any budget'],
  },
  {
    id: 'feature-02',
    tag: 'PRINT QUALITY',
    title: 'Sharp, Accurate Printing',
    description: 'Clean offset and digital printing with accurate CMYK and Pantone color matching so your brand looks consistent across every run.',
    icon: <Printer className="w-6 h-6 text-[#FF9933]" />,
    highlights: ['Accurate CMYK and Pantone colors', 'Gold/silver foil stamping & spot UV', 'Matte, gloss, and soft-touch finishes'],
  },
  {
    id: 'feature-03',
    tag: 'ECO-FRIENDLY',
    title: 'Recyclable Materials',
    description: 'We use FSC-certified kraft paper, recyclable corrugated board, and eco-friendly inks that protect your products and reduce waste.',
    icon: <Leaf className="w-6 h-6 text-[#FF9933]" />,
    highlights: ['FSC-certified kraft paper and card', '100% recyclable corrugated board', 'Plastic-free packaging options'],
  },
  {
    id: 'feature-04',
    tag: 'RELIABLE DELIVERY',
    title: 'On-Time Dispatch',
    description: 'Clear production timelines, strict quality checks before shipping, and dependable dispatch so you never miss a restock date.',
    icon: <Clock className="w-6 h-6 text-[#FF9933]" />,
    highlights: ['Clear timelines with no hidden delays', 'Sample approval before mass printing', 'Carefully packed to prevent damage'],
  },
];

interface WhyCardProps {
  feature: FeatureItem;
  index: number;
}

const WhyCard: React.FC<WhyCardProps> = ({ feature, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for smooth 3D tilt
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Springs for fluid natural return
  const springConfig = { damping: 20, stiffness: 260 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate rotation: max 6 degrees
    const rX = ((mouseY / height) - 0.5) * -12;
    const rY = ((mouseX / width) - 0.5) * 12;

    rotateX.set(rX);
    rotateY.set(rY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.215, 0.61, 0.355, 1],
      }}
      className="perspective-1000 w-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          y: isHovered ? -6 : 0,
        }}
        transition={{
          y: { duration: 0.25, ease: 'easeOut' },
        }}
        className="relative h-full p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#12295A]/10 shadow-[0_4px_16px_rgba(10,25,48,0.04)] hover:shadow-[0_16px_36px_rgba(10,25,48,0.1)] hover:border-[#2F6FED]/35 transition-shadow duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer"
      >
        {/* FOLDED PAPER CORNER DETAIL (Top-Right Peel Flap) */}
        <div
          className="absolute top-0 right-0 w-12 h-12 pointer-events-none z-20"
          aria-hidden="true"
        >
          {/* Triangular Corner Cutout & Drop Shadow */}
          <div
            className="absolute top-0 right-0 w-10 h-10 bg-gradient-to-bl from-[#0A1930]/15 to-transparent transition-transform duration-300 group-hover:scale-110"
            style={{
              clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
            }}
          />
          {/* Folded Paper Flap Triangle */}
          <div
            className="absolute top-0 right-0 w-10 h-10 bg-[#FAF7F2] border-b border-l border-[#12295A]/15 shadow-[-3px_3px_6px_rgba(10,25,48,0.08)] transition-all duration-300 group-hover:w-11 group-hover:h-11 group-hover:bg-[#FFF9F0] group-hover:border-[#FF9933]/40"
            style={{
              clipPath: 'polygon(0 0, 100% 100%, 0 100%)',
            }}
          />
          {/* Micro Saffron Crease Accent on the fold line */}
          <div className="absolute top-0 right-0 w-10 h-10 border-t border-r border-[#FF9933]/40 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Card Header & Content */}
        <div className="relative z-10">
          {/* Saffron-Tinted Icon Container */}
          <div className="flex items-center justify-between mb-5">
            <div className="w-14 h-14 rounded-2xl bg-[#FF9933]/12 border border-[#FF9933]/25 flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:bg-[#FF9933]/20 group-hover:border-[#FF9933]/50 transition-all duration-300">
              {feature.icon}
            </div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#12295A]/50 bg-[#FAF7F2] px-2.5 py-1 rounded-md border border-[#12295A]/8">
              0{index + 1}
            </span>
          </div>

          {/* Subtitle Tag */}
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#2F6FED] font-sans">
            {feature.tag}
          </span>

          {/* Bold Navy Title */}
          <h3 className="font-heading text-2xl sm:text-[26px] font-bold text-[#0A1930] mt-1 mb-3 tracking-tight group-hover:text-[#12295A] transition-colors">
            {feature.title}
          </h3>

          {/* Short Charcoal Description */}
          <p className="text-[#161B22]/75 text-sm sm:text-[15px] leading-relaxed mb-6 font-normal">
            {feature.description}
          </p>
        </div>

        {/* Feature Highlights Checklist */}
        <div className="relative z-10 pt-4 border-t border-[#12295A]/8 space-y-2 mt-auto">
          {feature.highlights.map((highlight, hIdx) => (
            <div key={hIdx} className="flex items-center gap-2 text-xs font-medium text-[#12295A]/85">
              <div className="w-4 h-4 rounded-full bg-[#FF9933]/15 flex items-center justify-center text-[#FF9933] shrink-0">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </div>
              <span className="group-hover:text-[#0A1930] transition-colors">{highlight}</span>
            </div>
          ))}
        </div>

        {/* Subtle Ambient Card Sheen */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-[#2F6FED]/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.div>
    </motion.div>
  );
};

export const WhyChooseUs: React.FC = () => {
  return (
    <section
      id="why-agl"
      className="relative py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Soft Glow Blob */}
      <div
        className="absolute top-1/3 -right-24 w-96 h-96 rounded-full bg-[#2F6FED]/8 blur-[120px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 -left-20 w-80 h-80 rounded-full bg-[#FF9933]/8 blur-[100px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Section Heading */}
      <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
        {/* Eyebrow Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF9933]/15 border border-[#FF9933]/30 text-[#0A1930] shadow-xs mb-3.5"
        >
          <span className="w-2 h-2 rounded-full bg-[#FF9933]" />
          <span className="text-xs font-bold uppercase tracking-widest font-sans">
            WHY CHOOSE US
          </span>
        </motion.div>

        {/* Big Navy Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#0A1930] tracking-tight leading-[1.12]"
        >
          Why Businesses Choose AGL Creatives
        </motion.h2>

        {/* Short 1-Line Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="text-[#161B22]/75 text-base sm:text-lg mt-3.5 font-normal max-w-2xl mx-auto leading-relaxed"
        >
          We combine sturdy materials, accurate printing, and reliable delivery so your packaging is always ready when you need it.
        </motion.p>
      </div>

      {/* 2x2 Grid (Desktop) / 1-Column Stack (Mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {FEATURES.map((feature, idx) => (
          <WhyCard key={feature.id} feature={feature} index={idx} />
        ))}
      </div>
    </section>
  );
};
