import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PenTool, Printer, Package, CheckCircle2, ArrowRight, Sparkles, ChevronDown } from 'lucide-react';

interface ServiceDiscipline {
  id: string;
  taglineWord: 'DESIGN' | 'PRINT' | 'PACK';
  title: string;
  number: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  bulletItems: string[];
  specs: string;
}

const DISCIPLINES: ServiceDiscipline[] = [
  {
    id: 'discipline-design',
    taglineWord: 'DESIGN',
    title: 'Packaging & Box Design',
    number: '01',
    tagline: 'Custom box sizing, structural dielines, and artwork setup',
    description: 'We turn your ideas into ready-to-print packaging. Our team creates custom CAD dielines fitted to your product dimensions and prepares clean artwork files so printing goes smoothly.',
    icon: <PenTool className="w-6 h-6 text-[#FF9933]" />,
    bulletItems: [
      'Custom box structural dielines (.AI / .PDF)',
      'Plain white sample boxes for size fitting',
      'Artwork layout and print file preparation',
      'Guidance on paper GSM and board thickness',
    ],
    specs: 'CAD Dielines • Plain White Samples • Artwork Setup',
  },
  {
    id: 'discipline-print',
    taglineWord: 'PRINT',
    title: 'Commercial Printing',
    number: '02',
    tagline: 'Offset and digital printing with crisp colors and clean finishes',
    description: 'High-quality printing using modern offset and digital presses. We ensure exact CMYK and Pantone color matching, along with premium finishes like foil stamping, spot UV, and protective lamination.',
    icon: <Printer className="w-6 h-6 text-[#2F6FED]" />,
    bulletItems: [
      'Offset and digital sheetfed printing',
      'Accurate CMYK and Pantone ink matching',
      'Gold, silver, and copper foil stamping',
      'Matte, gloss, and soft-touch lamination',
    ],
    specs: 'Offset Presses • Digital Printing • Specialty Finishes',
  },
  {
    id: 'discipline-pack',
    taglineWord: 'PACK',
    title: 'Die-Cutting, Folding & Delivery',
    number: '03',
    tagline: 'Die-cutting, gluing, foam inserts, and flat-pack delivery',
    description: 'Complete finishing and assembly. We die-cut, fold, and glue your boxes, craft custom foam inserts for fragile items, and pack everything securely for safe transport across India.',
    icon: <Package className="w-6 h-6 text-[#FF9933]" />,
    bulletItems: [
      'Rigid gift boxes, folding cartons & corrugated mailers',
      'Custom standup pouches and kraft paper bags',
      'Custom-cut foam inserts for delicate items',
      'Flat-packed or pre-assembled delivery',
    ],
    specs: 'Die-Cutting • Fold-Gluing • Safe Dispatch',
  },
];

interface ServicesProps {
  onOpenQuoteModal: () => void;
}

// Deliberate, premium ease-out-expo timing configuration
const TRANSITION_DURATION = '500ms';
const TRANSITION_EASING = 'cubic-bezier(0.22, 1, 0.36, 1)';

export const Services: React.FC<ServicesProps> = ({ onOpenQuoteModal }) => {
  // Desktop active hovered panel: default to index 0 (DESIGN)
  const [activeDesktopIndex, setActiveDesktopIndex] = useState<number>(0);
  // Tablet/Mobile accordion active index: starts with 0 (DESIGN) open by default
  const [activeAccordionIndex, setActiveAccordionIndex] = useState<number>(0);

  const toggleAccordion = (index: number) => {
    setActiveAccordionIndex(activeAccordionIndex === index ? -1 : index);
  };

  return (
    <section
      id="services"
      className="relative w-full bg-[#0A1930] text-[#FAF7F2] py-24 sm:py-32 overflow-hidden border-y border-white/10"
      aria-label="Services — What We Do"
    >
      {/* 1. Deep Atmospheric Lighting Blobs */}
      <div
        className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#2F6FED]/15 blur-[160px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-1/4 w-[450px] h-[450px] rounded-full bg-[#FF9933]/10 blur-[150px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Blueprint Grid Lines Overlay in Navy Section */}
      <div
        className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#FAF7F2_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF9933]/15 border border-[#FF9933]/30 text-[#FF9933] text-xs font-bold uppercase tracking-widest mb-4 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>WHAT WE DO</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold text-[#FAF7F2] tracking-tight leading-[1.1]"
          >
            What We Do: Design, Print &amp; Pack
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="text-slate-300 text-base sm:text-lg mt-4 max-w-2xl mx-auto leading-relaxed font-normal"
          >
            We handle your packaging from the first design proof to printing and final assembly, all under one roof.
          </motion.p>
        </div>

        {/* ---------------------------------------------------- */}
        {/* DESKTOP INTERACTIVE EXPANDING FOLD-PANELS (>= 1024px) */}
        {/* ---------------------------------------------------- */}
        <div className="hidden lg:block w-full">
          <div className="flex gap-6 min-h-[550px] lg:h-[580px] w-full items-stretch">
            {DISCIPLINES.map((discipline, idx) => {
              const isHovered = activeDesktopIndex === idx;

              return (
                <div
                  key={discipline.id}
                  id={`service-panel-${discipline.taglineWord.toLowerCase()}`}
                  role="region"
                  aria-label={`${discipline.title} - ${discipline.taglineWord}`}
                  aria-expanded={isHovered}
                  tabIndex={0}
                  onMouseEnter={() => setActiveDesktopIndex(idx)}
                  onClick={() => setActiveDesktopIndex(idx)}
                  onFocus={() => setActiveDesktopIndex(idx)}
                  style={{
                    flex: isHovered ? 2.35 : 1,
                    transition: `flex ${TRANSITION_DURATION} ${TRANSITION_EASING}, background-color ${TRANSITION_DURATION} ${TRANSITION_EASING}, border-color ${TRANSITION_DURATION} ${TRANSITION_EASING}, box-shadow ${TRANSITION_DURATION} ${TRANSITION_EASING}`,
                  }}
                  className={`relative rounded-3xl p-7 xl:p-8 flex flex-col justify-between overflow-hidden cursor-pointer border min-w-0 select-none outline-none focus-visible:ring-2 focus-visible:ring-[#FF9933] ${
                    isHovered
                      ? 'bg-gradient-to-b from-[#12295A]/95 via-[#0E224C]/90 to-[#0A1930] border-[#FF9933] shadow-[0_20px_50px_rgba(10,25,48,0.7),inset_0_0_24px_rgba(255,153,51,0.15)]'
                      : 'bg-white/[0.04] border-white/10 hover:border-white/20'
                  }`}
                >
                  {/* Panel Top: Icon, Tagline Word & Title */}
                  <div className="relative z-10">
                    {/* Header: Icon & Discipline Number */}
                    <div className="flex items-center justify-between mb-5">
                      <div
                        style={{
                          transition: `background-color ${TRANSITION_DURATION} ${TRANSITION_EASING}, border-color ${TRANSITION_DURATION} ${TRANSITION_EASING}`,
                        }}
                        className={`w-13 h-13 rounded-2xl flex items-center justify-center shrink-0 ${
                          isHovered
                            ? 'bg-[#FF9933]/20 border border-[#FF9933]/50'
                            : 'bg-white/10 border border-white/15'
                        }`}
                      >
                        {discipline.icon}
                      </div>

                      <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 shrink-0">
                        <span>DISCIPLINE</span>
                        <span className="text-[#FF9933] font-bold">{discipline.number}</span>
                      </div>
                    </div>

                    {/* Tagline Word & Title */}
                    <span className="font-heading text-xs font-bold tracking-[0.25em] text-[#FF9933] uppercase block mb-1">
                      {discipline.taglineWord}
                    </span>
                    <h3 className="font-heading text-2xl xl:text-3xl font-bold text-white tracking-tight leading-tight mb-2.5">
                      {discipline.title}
                    </h3>

                    {/* Short Summary Tagline */}
                    <p className="text-sm font-medium text-slate-200 leading-snug">
                      {discipline.tagline}
                    </p>

                    {/* Expanded Content: Description & Bullets (Smooth Grid reveal synchronized with width) */}
                    <div
                      style={{
                        gridTemplateRows: isHovered ? '1fr' : '0fr',
                        opacity: isHovered ? 1 : 0,
                        transition: `grid-template-rows ${TRANSITION_DURATION} ${TRANSITION_EASING}, opacity ${TRANSITION_DURATION} ${TRANSITION_EASING}`,
                      }}
                      className="grid"
                    >
                      <div className="overflow-hidden min-h-0">
                        <div
                          style={{
                            transform: isHovered ? 'translateY(0)' : 'translateY(12px)',
                            transition: `transform ${TRANSITION_DURATION} ${TRANSITION_EASING}`,
                          }}
                          className="space-y-4 pt-3.5"
                        >
                          <p className="text-sm text-slate-300 leading-relaxed font-normal">
                            {discipline.description}
                          </p>

                          <div className="space-y-2.5 pt-3.5 border-t border-white/10">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF9933] font-mono block">
                              Key Deliverables
                            </span>
                            {discipline.bulletItems.map((item, bIdx) => (
                              <div key={bIdx} className="flex items-center gap-2.5 text-xs text-slate-200 font-medium">
                                <div className="w-4 h-4 rounded-full bg-[#FF9933]/20 flex items-center justify-center text-[#FF9933] shrink-0">
                                  <CheckCircle2 className="w-3 h-3" />
                                </div>
                                <span className="truncate">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Collapsed Hint: Reveals smoothly when panel contracts */}
                    <div
                      style={{
                        gridTemplateRows: isHovered ? '0fr' : '1fr',
                        opacity: isHovered ? 0 : 1,
                        transition: `grid-template-rows ${TRANSITION_DURATION} ${TRANSITION_EASING}, opacity ${TRANSITION_DURATION} ${TRANSITION_EASING}`,
                      }}
                      className="grid"
                    >
                      <div className="overflow-hidden min-h-0">
                        <div className="pt-4 mt-3 border-t border-white/10">
                          <span className="text-xs text-slate-400 font-mono flex items-center gap-2 group-hover:text-[#FF9933] transition-colors">
                            <span>Explore discipline</span>
                            <ArrowRight className="w-3.5 h-3.5 text-[#FF9933]" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Panel Bottom: Specs & Action Button */}
                  <div className="relative z-10 pt-5 border-t border-white/10 flex items-center justify-between mt-4 gap-3">
                    <span className="text-[11px] font-mono text-slate-400 truncate">
                      {discipline.specs}
                    </span>

                    <button
                      type="button"
                      tabIndex={isHovered ? 0 : -1}
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenQuoteModal();
                      }}
                      style={{
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered ? 'translateX(0)' : 'translateX(8px)',
                        pointerEvents: isHovered ? 'auto' : 'none',
                        transition: `opacity ${TRANSITION_DURATION} ${TRANSITION_EASING}, transform ${TRANSITION_DURATION} ${TRANSITION_EASING}`,
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-[#FF9933] text-[#0A1930] hover:bg-[#FFB35C] transition-colors shadow-sm cursor-pointer shrink-0"
                    >
                      <span>Inquire {discipline.taglineWord}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* TABLET & MOBILE TAP-TO-EXPAND ACCORDION (< 1024px)              */}
        {/* ---------------------------------------------------------------- */}
        <div className="flex flex-col gap-4 lg:hidden">
          {DISCIPLINES.map((discipline, idx) => {
            const isOpen = activeAccordionIndex === idx;

            return (
              <div
                key={discipline.id}
                id={`tablet-mobile-service-card-${discipline.taglineWord.toLowerCase()}`}
                className={`rounded-2xl sm:rounded-3xl border transition-colors duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-gradient-to-b from-[#12295A] to-[#0A1930] border-[#FF9933] shadow-lg'
                    : 'bg-white/[0.05] border-white/10 hover:border-white/20'
                }`}
              >
                {/* Accordion Trigger Header */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9933]"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#FF9933]/15 border border-[#FF9933]/30 flex items-center justify-center shrink-0">
                      {discipline.icon}
                    </div>
                    <div>
                      <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#FF9933] uppercase block font-mono">
                        {discipline.number} • {discipline.taglineWord}
                      </span>
                      <h3 className="font-heading text-xl sm:text-2xl font-bold text-white leading-tight mt-0.5">
                        {discipline.title}
                      </h3>
                    </div>
                  </div>

                  <div
                    className={`w-9 h-9 rounded-full border flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'border-[#FF9933] bg-[#FF9933]/20 text-[#FF9933] rotate-180'
                        : 'border-white/20 text-slate-300'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Accordion Body with Smooth Height Animation */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="mobile-accordion-body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 sm:p-6 pt-0 border-t border-white/10 space-y-4">
                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mt-3">
                          {discipline.description}
                        </p>

                        <div className="space-y-2 pt-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF9933] font-mono block">
                            Key Deliverables
                          </span>
                          {discipline.bulletItems.map((item, bIdx) => (
                            <div key={bIdx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#FF9933] shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>

                        <div className="pt-3">
                          <button
                            type="button"
                            onClick={onOpenQuoteModal}
                            className="w-full py-3 rounded-xl bg-[#FF9933] text-[#0A1930] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md active:scale-98 transition-transform cursor-pointer"
                          >
                            <span>Get a Quote for {discipline.taglineWord}</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
