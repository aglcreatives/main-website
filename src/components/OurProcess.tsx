import React from 'react';
import { motion } from 'motion/react';
import {
  Ruler,
  Layers,
  Printer,
  Box,
  Truck,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface ProcessStep {
  id: number;
  number: string;
  title: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  badge: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 1,
    number: '01',
    title: 'Design & Sizing',
    tagline: 'Custom box sizing and dieline creation',
    description:
      'We take your product measurements and create a custom CAD dieline. This ensures your items fit snugly and stay safe during handling.',
    icon: <Ruler className="w-5 h-5 text-[#FF9933]" />,
    badge: 'Custom Dieline',
  },
  {
    id: 2,
    number: '02',
    title: 'Sample Prototype',
    tagline: 'Plain sample box for size and fit checking',
    description:
      'Before printing the full batch, we can produce an unprinted white sample. You can test your product inside to confirm the fit, folds, and locking tabs.',
    icon: <Layers className="w-5 h-5 text-[#2F6FED]" />,
    badge: 'White Sample Box',
  },
  {
    id: 3,
    number: '03',
    title: 'Printing & Finishing',
    tagline: 'High-quality offset printing and surface coatings',
    description:
      'We run your job on calibrated offset or digital presses with sharp CMYK colors. We apply any requested finishes such as matte lamination, spot UV, or foil stamping.',
    icon: <Printer className="w-5 h-5 text-[#FF9933]" />,
    badge: 'Offset & Digital Print',
  },
  {
    id: 4,
    number: '04',
    title: 'Die-Cutting & Gluing',
    tagline: 'Precise cutting, crease scoring, and box assembly',
    description:
      'Your printed sheets are die-cut with sharp steel blades, folded, and glued. If you need foam or cardboard inserts, we cut them to size and fit them inside.',
    icon: <Box className="w-5 h-5 text-[#2F6FED]" />,
    badge: 'Die-Cutting & Assembly',
  },
  {
    id: 5,
    number: '05',
    title: 'Quality Check & Delivery',
    tagline: 'Final inspection, secure packing, and shipping',
    description:
      'Every batch is inspected for clean folds, strong corners, and color accuracy. We pack your order securely in moisture-safe outer cartons and dispatch it to your address.',
    icon: <Truck className="w-5 h-5 text-[#FF9933]" />,
    badge: 'Checked & Dispatched',
  },
];

interface OurProcessProps {
  onOpenQuoteModal: () => void;
}

export const OurProcess: React.FC<OurProcessProps> = ({ onOpenQuoteModal }) => {
  return (
    <section
      id="process"
      className="relative w-full py-20 sm:py-28 lg:py-32 bg-[#FAF7F2] text-[#161B22] overflow-hidden"
      aria-label="How We Make Your Packaging"
    >
      {/* Background Decorative Blur Accents */}
      <div
        className="absolute top-1/4 -left-32 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-[#FF9933]/8 blur-[120px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 -right-32 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-[#2F6FED]/8 blur-[120px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF9933]/15 border border-[#FF9933]/30 text-[#0A1930] text-xs font-bold uppercase tracking-widest mb-4 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF9933]" />
            <span>HOW IT WORKS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#0A1930] tracking-tight leading-tight"
          >
            Our 5-Step Production Process
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-[#161B22]/75 mt-4 leading-relaxed font-normal"
          >
            From sizing and sample approval to printing and final delivery, here is how we make your packaging step-by-step.
          </motion.p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative pl-12 sm:pl-16 md:pl-20">
          {/* Continuous Left Vertical Rail */}
          <div
            className="absolute left-[20px] sm:left-[24px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#FF9933] via-[#2F6FED]/50 to-[#FF9933]"
            aria-hidden="true"
          />

          {/* 5 Process Steps */}
          <div className="space-y-8 sm:space-y-10">
            {PROCESS_STEPS.map((step) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="relative flex items-start group"
              >
                {/* Step Number Marker (Positioned directly on the vertical line) */}
                <div className="absolute -left-12 sm:-left-16 top-4 sm:top-5 w-10 sm:w-12 flex items-center justify-center z-10">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0A1930] text-[#FF9933] border-2 border-[#FF9933] flex items-center justify-center font-heading font-bold text-sm sm:text-base shadow-[0_4px_14px_rgba(10,25,48,0.25)] group-hover:scale-105 group-hover:bg-[#12295A] transition-all duration-200">
                    {step.number}
                  </div>
                </div>

                {/* Step Content Card */}
                <div className="w-full bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 border border-[#12295A]/10 shadow-[0_4px_20px_rgba(10,25,48,0.04)] group-hover:border-[#FF9933]/50 group-hover:shadow-[0_12px_32px_rgba(10,25,48,0.08)] transition-all duration-300">
                  {/* Card Top Row: Badge & Static Icon */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="text-[11px] sm:text-xs font-mono font-bold tracking-wider text-[#2F6FED] uppercase bg-[#2F6FED]/10 border border-[#2F6FED]/20 px-3 py-1 rounded-lg">
                      {step.badge}
                    </span>

                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#FAF7F2] border border-[#12295A]/10 flex items-center justify-center shadow-2xs shrink-0">
                      {step.icon}
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-heading text-lg sm:text-xl md:text-2xl font-bold text-[#0A1930] tracking-tight mb-1">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-semibold text-[#FF9933] mb-3">
                    {step.tagline}
                  </p>

                  {/* Body Description */}
                  <p className="text-sm sm:text-base text-[#161B22]/80 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 sm:mt-16 pt-8 border-t border-[#12295A]/10 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left"
        >
          <div>
            <p className="font-heading font-bold text-base sm:text-lg text-[#0A1930]">
              Ready to start step 01 for your brand?
            </p>
            <p className="text-xs sm:text-sm text-[#161B22]/70 mt-0.5">
              Send us your product dimensions and our team will create your custom CAD dieline.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenQuoteModal}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#FF9933] text-[#0A1930] font-bold text-sm shadow-[0_4px_16px_rgba(255,153,51,0.3)] hover:bg-[#FFB35C] hover:shadow-[0_8px_24px_rgba(255,153,51,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer shrink-0 w-full sm:w-auto"
          >
            <span>Get a Fast Quote</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
