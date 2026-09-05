import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  Package,
  Sparkles,
  X,
  Layers,
  ShoppingBag,
  Tag,
  FileText,
  Boxes,
  CheckCircle,
  ExternalLink,
  ShieldCheck,
  Award,
} from 'lucide-react';

export type PortfolioCategory =
  | 'All'
  | 'E-commerce Boxes'
  | 'Rigid & Gift Boxes'
  | 'Pouches & Bags'
  | 'Labels & Stickers'
  | 'Corporate Print';

export interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  category: PortfolioCategory;
  categoryTag: string;
  // Explicit responsive grid spans (defined via Tailwind utility classes)
  gridSpanClass: string;
  // Aspect ratio class to guarantee geometric consistency across screen sizes
  aspectRatioClass: string;
  accentColor: string;
  bgGradient: string;
  // Real packaging placeholder imagery from royalty-free Unsplash packaging collections
  imageUrl: string;
  imageAlt: string;
  substrate: string;
  finishing: string;
  description: string;
  highlights: string[];
  specs: { label: string; value: string }[];
}

const CATEGORIES: PortfolioCategory[] = [
  'All',
  'E-commerce Boxes',
  'Rigid & Gift Boxes',
  'Pouches & Bags',
  'Labels & Stickers',
  'Corporate Print',
];

/**
 * NOTE FOR PRODUCTION:
 * The imageUrls below are curated high-resolution royalty-free placeholder stock packaging
 * photographs representing real luxury boxes, mailers, kraft bags, pouches, and foil labels.
 * These placeholders will be swapped with AGL Creatives' proprietary production project photography.
 */
const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'solstice-spirits',
    title: 'Solstice Botanical Spirits',
    client: 'Solstice Distilling Co.',
    category: 'Rigid & Gift Boxes',
    categoryTag: 'Rigid & Gift Boxes',
    // Desktop: Featured wide hero card (8 cols), Tablet: 2 cols span-2, Mobile: 1 col
    gridSpanClass: 'col-span-1 md:col-span-2 lg:col-span-8',
    aspectRatioClass: 'aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] lg:aspect-[21/10]',
    accentColor: '#FF9933',
    bgGradient: 'from-[#0A1930] via-[#12295A] to-[#1A3A75]',
    imageUrl:
      'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Luxury rigid spirit gift box packaging with gold foil and custom interior',
    substrate: '1500 GSM Greyboard + 157 GSM Soft-Touch Paper',
    finishing: 'Hot Stamp Gold Foil, Custom Magnetic Closure, High-Density EVA Foam Cavity',
    description:
      'Custom magnetic rigid gift box made with thick greyboard and gold foil debossing. Fitted with a laser-cut velvet foam cavity to hold glass bottles securely.',
    highlights: [
      'Concealed magnetic snap closure',
      'Smooth matte finish with scratch resistance',
      'Gold foil debossing on lid and sides',
    ],
    specs: [
      { label: 'Board Weight', value: '1500 GSM Rigid' },
      { label: 'Foil Type', value: 'Kurz Luxor Gold 420' },
      { label: 'Insert', value: 'High-Density Laser EVA' },
      { label: 'Run Size', value: '5,000 Units' },
    ],
  },
  {
    id: 'aura-skin-lab',
    title: 'Aura Derma Elixir Cartons',
    client: 'Aura Skin Lab',
    category: 'Rigid & Gift Boxes',
    categoryTag: 'Rigid & Gift Boxes',
    // Desktop: 4 cols card, Tablet: 1 col, Mobile: 1 col
    gridSpanClass: 'col-span-1 md:col-span-1 lg:col-span-4',
    aspectRatioClass: 'aspect-[4/3] sm:aspect-[16/10] md:aspect-[4/3] lg:aspect-[1/1]',
    accentColor: '#5CA0FF',
    bgGradient: 'from-[#12295A] via-[#1E3E7B] to-[#2F6FED]',
    imageUrl:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Minimalist skincare bottles and luxury cosmetic folding paperboard cartons',
    substrate: '350 GSM Pearlised Arctic Paperboard',
    finishing: 'Spot 3D UV Raised Gloss, Blind Embossing, Internal Pastel Gradient Wash',
    description:
      'Clean folding cartons for cosmetic bottles and skincare jars. Features raised 3D spot UV gloss highlights over smooth matte paperboard.',
    highlights: [
      'Raised 3D spot UV on brand logo',
      '100% recyclable 350 GSM paperboard',
      'Tuck-end box closure for easy packing',
    ],
    specs: [
      { label: 'Stock', value: '350 GSM Solid Bleached' },
      { label: 'Coating', value: 'Spot Raised 3D UV' },
      { label: 'Eco-Rating', value: 'FSC Virgin 100%' },
      { label: 'Run Size', value: '25,000 Units' },
    ],
  },
  {
    id: 'kinetic-audio-mailer',
    title: 'Kinetic Audio Sound Mailer',
    client: 'Kinetic Audio Lab',
    category: 'E-commerce Boxes',
    categoryTag: 'E-commerce Boxes',
    // Desktop: 4 cols card, Tablet: 1 col, Mobile: 1 col
    gridSpanClass: 'col-span-1 md:col-span-1 lg:col-span-4',
    aspectRatioClass: 'aspect-[4/3] sm:aspect-[16/10] md:aspect-[4/3] lg:aspect-[1/1]',
    accentColor: '#FF9933',
    bgGradient: 'from-[#0E2045] via-[#142A58] to-[#1F3D7A]',
    imageUrl:
      'https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Corrugated cardboard mailer boxes and e-commerce shipping packages',
    substrate: 'E-Flute Corrugated 400 GSM Kraft Liner',
    finishing: 'Flexographic Dual-Side Print, Tear-Strip Open, Dual Return Adhesive Tape',
    description:
      'Sturdy corrugated mailer box with clean exterior branding and bright interior printing. Built to protect electronics and retail goods during shipping.',
    highlights: [
      'Self-locking tuck-front flap',
      'Crush-tested corrugated board protects contents',
      'Printed inside and out with eco-friendly soy inks',
    ],
    specs: [
      { label: 'Flute', value: 'E-Flute 1.8mm Kraft' },
      { label: 'Inks', value: 'Water/Soy Eco-Inks' },
      { label: 'Drop Test', value: 'ISTA 3A Certified' },
      { label: 'Run Size', value: '15,000 Units' },
    ],
  },
  {
    id: 'zenith-coffee-pouch',
    title: 'Zenith Single-Origin Valve Pouches',
    client: 'Zenith Roasters',
    category: 'Pouches & Bags',
    categoryTag: 'Pouches & Bags',
    // Desktop: 4 cols card, Tablet: 1 col, Mobile: 1 col
    gridSpanClass: 'col-span-1 md:col-span-1 lg:col-span-4',
    aspectRatioClass: 'aspect-[4/3] sm:aspect-[16/10] md:aspect-[4/3] lg:aspect-[1/1]',
    accentColor: '#2F6FED',
    bgGradient: 'from-[#0A1930] via-[#152B57] to-[#254F9D]',
    imageUrl:
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Craft coffee bag and standup pouch packaging with freshness valve',
    substrate: 'Multi-Barrier High-Barrier Matte Kraft Laminate',
    finishing: 'Degassing One-Way Valve, Resealable Pocket Zipper, Tear Notch',
    description:
      'Standup pouch with an airtight one-way degassing valve. Keeps coffee beans and snacks fresh while standing upright on retail store shelves.',
    highlights: [
      'Multi-layer barrier keeps moisture and oxygen out',
      'Resealable zipper with easy tear notches',
      'Flat bottom block gusset stands upright on shelves',
    ],
    specs: [
      { label: 'Barrier', value: 'Triple Laminate EVOH' },
      { label: 'Valve', value: 'Aroma Degassing 1-Way' },
      { label: 'Closure', value: 'Pocket Pull Zipper' },
      { label: 'Run Size', value: '10,000 Units' },
    ],
  },
  {
    id: 'velour-botanica-stickers',
    title: 'Velour Botanical Holographic Roll Labels',
    client: 'Velour Apothecary',
    category: 'Labels & Stickers',
    categoryTag: 'Labels & Stickers',
    // Desktop: 4 cols card, Tablet: 1 col, Mobile: 1 col
    gridSpanClass: 'col-span-1 md:col-span-1 lg:col-span-4',
    aspectRatioClass: 'aspect-[4/3] sm:aspect-[16/10] md:aspect-[4/3] lg:aspect-[1/1]',
    accentColor: '#FF9933',
    bgGradient: 'from-[#12295A] via-[#1C376F] to-[#0A1930]',
    imageUrl:
      'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Amber glass apothecary dropper bottle with custom precision die-cut roll label',
    substrate: 'Waterproof Metallized Polypropylene (BOPP)',
    finishing: 'Rainbow Holographic Foil Overlay, Matte Overlaminate, Die-Cut Roll Feed',
    description:
      'Waterproof synthetic roll labels with subtle holographic shimmer. Built to resist water, oils, and moisture without peeling off glass bottles.',
    highlights: [
      'Waterproof and oil-resistant synthetic film',
      'Supplied on rolls for hand or machine application',
      'Strong adhesive sticks firmly to curved glass bottles',
    ],
    specs: [
      { label: 'Material', value: 'Synthetic BOPP Film' },
      { label: 'Adhesive', value: 'High-Tack Acrylic Emulsion' },
      { label: 'Finish', value: 'Matte Holographic Foil' },
      { label: 'Run Size', value: '50,000 Labels' },
    ],
  },
  {
    id: 'atelier-brand-kit',
    title: 'Atelier Capital Brand Presentation Suites',
    client: 'Atelier Private Wealth',
    category: 'Corporate Print',
    categoryTag: 'Corporate Print',
    // Desktop: 4 cols card, Tablet: 1 col, Mobile: 1 col
    gridSpanClass: 'col-span-1 md:col-span-1 lg:col-span-4',
    aspectRatioClass: 'aspect-[4/3] sm:aspect-[16/10] md:aspect-[4/3] lg:aspect-[1/1]',
    accentColor: '#5CA0FF',
    bgGradient: 'from-[#0A1930] via-[#10244D] to-[#1E3F7D]',
    imageUrl:
      'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Executive brand stationery suite, letterpress paper folders, and presentation collateral',
    substrate: 'G.F Smith Colorplan 540 GSM Duplexed Card',
    finishing: 'Gilt Painted Edge in Saffron Copper, Blind Letterpress Deboss, Presentation Folder Stitch',
    description:
      'Thick presentation folders and executive stationery made from premium textured paperboard with copper foil debossing and clean edge finishing.',
    highlights: [
      'Extra-thick 540 GSM textured paperboard',
      'Copper foil stamping and deep debossing',
      'Die-cut folder with business card holder slot',
    ],
    specs: [
      { label: 'Paper', value: 'GF Smith Colorplan 540g' },
      { label: 'Letterpress', value: 'Deep Blind Deboss' },
      { label: 'Edge Gilt', value: 'Metallic Saffron Copper' },
      { label: 'Run Size', value: '2,500 Sets' },
    ],
  },
  {
    id: 'nordic-luxe-shopper',
    title: 'Nordic Luxe Heavyweight Shopper Bags',
    client: 'Nordic Heritage House',
    category: 'Pouches & Bags',
    categoryTag: 'Pouches & Bags',
    // Desktop: 4 cols card, Tablet: 1 col, Mobile: 1 col
    gridSpanClass: 'col-span-1 md:col-span-1 lg:col-span-4',
    aspectRatioClass: 'aspect-[4/3] sm:aspect-[16/10] md:aspect-[4/3] lg:aspect-[1/1]',
    accentColor: '#FF9933',
    bgGradient: 'from-[#12295A] via-[#16336B] to-[#254C93]',
    imageUrl:
      'https://images.unsplash.com/photo-1553531384-cc64ac80f931?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Heavyweight ribbed luxury kraft retail shopping tote bag with handles',
    substrate: '280 GSM Uncoated Ribbed Kraft Paper',
    finishing: 'Knotted Saffron Grosgrain Ribbon Handles, Reinforced Turnover Top & Baseboard',
    description:
      'Heavy-duty kraft paper shopping bags with reinforced turnover tops and ribbon handles. Built to carry retail goods and apparel safely.',
    highlights: [
      'Comfortable woven ribbon handles',
      'Reinforced base board prevents sagging under weight',
      'Made from strong 280 GSM ribbed kraft paper',
    ],
    specs: [
      { label: 'Stock', value: '280 GSM Ribbed FSC Kraft' },
      { label: 'Handle', value: 'Woven Grosgrain Ribbon' },
      { label: 'Load Capacity', value: 'Up to 8.5 kg' },
      { label: 'Run Size', value: '8,000 Units' },
    ],
  },
  {
    id: 'lumina-subscription-mailer',
    title: 'Lumina Wellness Monthly Unboxing Caddy',
    client: 'Lumina Health Labs',
    category: 'E-commerce Boxes',
    categoryTag: 'E-commerce Boxes',
    // Desktop: Featured wide hero card (8 cols), Tablet: 2 cols span-2, Mobile: 1 col
    gridSpanClass: 'col-span-1 md:col-span-2 lg:col-span-8',
    aspectRatioClass: 'aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] lg:aspect-[21/10]',
    accentColor: '#5CA0FF',
    bgGradient: 'from-[#0A1930] via-[#142B59] to-[#1E4385]',
    imageUrl:
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Curated wellness unboxing subscription box with bottles and custom partitions',
    substrate: 'Recycled Corrugated B-Flute + Matte Aqueous Coating',
    finishing: 'Full-Coverage Inside Print, Dynamic QR Scan Onboarding, Integrated Product Dividers',
    description:
      'Corrugated subscription mailer with custom cardboard dividers to hold bottles securely in place during shipping.',
    highlights: [
      'Cardboard divider insert prevents bottles from hitting each other',
      'Matte finish resists smudges and transit scuffs',
      'Self-locking fold structure needs no tape to close',
    ],
    specs: [
      { label: 'Structure', value: 'Roll-End Tuck Front (RETF)' },
      { label: 'Insert', value: 'Self-Locking Card Grid' },
      { label: 'Recycled %', value: '85% Post-Consumer Waste' },
      { label: 'Run Size', value: '30,000 Units' },
    ],
  },
  {
    id: 'vanguard-security-labels',
    title: 'Vanguard Tamper-Proof Hologram Seals',
    client: 'Vanguard Electronics',
    category: 'Labels & Stickers',
    categoryTag: 'Labels & Stickers',
    // Desktop: 4 cols card, Tablet: 2 cols span-2 (or 1 depending on row), Mobile: 1 col
    gridSpanClass: 'col-span-1 md:col-span-2 lg:col-span-4',
    aspectRatioClass: 'aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] lg:aspect-[1/1]',
    accentColor: '#FF9933',
    bgGradient: 'from-[#12295A] via-[#0E2045] to-[#0A1930]',
    imageUrl:
      'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'High-security metallic iridescent holographic seal sticker on product packaging',
    substrate: 'Void Polyester Destructible Film 50 Micron',
    finishing: 'Security Microtext, Serialized Barcode, Tamper Void Check Pattern',
    description:
      'Tamper-evident security warranty labels that leave a VOID pattern if peeled, protecting products against unauthorized opening.',
    highlights: [
      'Leaves a clear VOID mark if removed',
      'Printed with individual barcodes and serial numbers',
      'Strong permanent adhesive for plastic and metal packaging',
    ],
    specs: [
      { label: 'Film Type', value: 'Silver Void Polyester' },
      { label: 'Security', value: 'Sequential Barcode + Microtext' },
      { label: 'Durability', value: 'Indoor/Outdoor 5-Year' },
      { label: 'Run Size', value: '100,000 Seals' },
    ],
  },
];

// Helper: Category Icon
const getCategoryIcon = (category: PortfolioCategory) => {
  switch (category) {
    case 'E-commerce Boxes':
      return <Package className="w-4 h-4" />;
    case 'Rigid & Gift Boxes':
      return <Boxes className="w-4 h-4" />;
    case 'Pouches & Bags':
      return <ShoppingBag className="w-4 h-4" />;
    case 'Labels & Stickers':
      return <Tag className="w-4 h-4" />;
    case 'Corporate Print':
      return <FileText className="w-4 h-4" />;
    default:
      return <Layers className="w-4 h-4" />;
  }
};

// -------------------------------------------------------------
// INDIVIDUAL PORTFOLIO BENTO CARD
// -------------------------------------------------------------
interface PortfolioCardProps {
  item: PortfolioItem;
  onClick: () => void;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ item, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle 3D tilt calculation (max +/- 5 degrees)
    const rotX = ((y - centerY) / centerY) * -5;
    const rotY = ((x - centerX) / centerX) * 5;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`${item.gridSpanClass} relative group w-full`}
      style={{ perspective: 1000 }}
    >
      <div
        ref={cardRef}
        id={`portfolio-card-${item.id}`}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: !prefersReducedMotion
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${isHovered ? 1.012 : 1}, ${isHovered ? 1.012 : 1}, 1)`
            : 'none',
          transition: isHovered
            ? 'transform 0.12s ease-out, box-shadow 0.3s ease'
            : 'transform 0.4s ease-out, box-shadow 0.3s ease',
        }}
        className={`w-full ${item.aspectRatioClass} rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer relative flex flex-col justify-between p-5 sm:p-6 lg:p-7 border border-[#12295A]/15 shadow-[0_4px_20px_rgba(10,25,48,0.08)] hover:shadow-[0_20px_40px_rgba(10,25,48,0.22)] hover:border-[#FF9933]/50 select-none bg-[#0A1930]`}
      >
        {/* Real Packaging Stock Photography Layer (Placeholder for AGL Project Photos) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            src={item.imageUrl}
            alt={item.imageAlt}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Sophisticated Navy-to-Dark Linear + Radial Gradient Scrim Overlay */}
        {/* Ensures crisp contrast and readability of labels, titles, and tags */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-[#0A1930] via-[#0A1930]/75 to-[#0A1930]/40 transition-opacity duration-300 ${
            isHovered ? 'opacity-90' : 'opacity-80'
          }`}
        />

        {/* Diagonal Accent Glow Tint from brand color */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
          style={{
            background: `radial-gradient(circle at 80% 20%, ${item.accentColor}, transparent 60%)`,
          }}
        />

        {/* Card Top Row Header (Always Visible) */}
        <div className="flex items-start justify-between z-10 w-full">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0A1930]/80 backdrop-blur-md border border-white/25 text-white text-[11px] font-mono tracking-wider shadow-sm">
            {getCategoryIcon(item.category)}
            <span className="font-semibold">{item.categoryTag}</span>
          </div>

          <span className="text-[10px] font-mono uppercase tracking-widest text-[#FAF7F2]/90 bg-[#0A1930]/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20 shadow-xs">
            AGL • ARCHIVE
          </span>
        </div>

        {/* Card Footer Base Details */}
        <div className="z-10 flex flex-col justify-end w-full">
          <div className="flex items-end justify-between gap-4">
            <div className="max-w-[85%]">
              <span className="text-xs font-semibold text-[#FF9933] block mb-1 tracking-wide">
                {item.client}
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug drop-shadow-sm">
                {item.title}
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-300 font-mono mt-1 line-clamp-1">
                {item.substrate.split('+')[0]}
              </p>
            </div>

            <div className="w-10 h-10 rounded-full bg-[#0A1930]/80 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:bg-[#FF9933] group-hover:text-[#0A1930] group-hover:border-[#FF9933] transition-all duration-300 shrink-0 shadow-md">
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>
        </div>

        {/* Hover Reveal Bottom Drawer Overlay */}
        <div
          style={{
            transform: isHovered ? 'translateY(0%)' : 'translateY(100%)',
            opacity: isHovered ? 1 : 0,
            transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
          }}
          className="absolute inset-x-0 bottom-0 bg-[#0A1930]/95 backdrop-blur-lg p-5 sm:p-6 border-t border-white/20 z-20 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#FF9933] text-[#0A1930] text-[10px] font-extrabold tracking-wider uppercase">
                {item.categoryTag}
              </span>
              <span className="text-[10px] font-mono text-slate-300">CLICK FOR CASE STUDY</span>
            </div>
            <h4 className="font-heading text-lg font-bold text-white mb-1.5">
              {item.title}
            </h4>
            <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          </div>

          <div className="mt-3 pt-2.5 border-t border-white/15 flex items-center justify-between text-xs font-bold text-[#FF9933]">
            <span className="flex items-center gap-1.5">
              <span>View Full Case Study</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
            <span className="text-[11px] font-mono text-slate-300 font-normal">
              {item.finishing.split(',')[0]}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// -------------------------------------------------------------
// PORTFOLIO LIGHTBOX / MODAL
// -------------------------------------------------------------
interface PortfolioModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
  onOpenQuoteModal: () => void;
}

const PortfolioModal: React.FC<PortfolioModalProps> = ({ item, onClose, onOpenQuoteModal }) => {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (item) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <AnimatePresence>
      <div
        id="portfolio-lightbox-backdrop"
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-[#0A1930]/80 backdrop-blur-md overflow-y-auto"
      >
        <motion.div
          id="portfolio-lightbox-modal"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#12295A]/15 my-auto"
        >
          {/* Close Button (Navy circle with white X, top-right) */}
          <button
            id="close-portfolio-modal-btn"
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-[#0A1930] hover:bg-[#FF9933] text-white hover:text-[#0A1930] flex items-center justify-center shadow-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top Banner / Visual Header with Real Image */}
          <div className="relative h-64 sm:h-72 w-full bg-[#0A1930] p-6 sm:p-8 flex flex-col justify-between overflow-hidden text-white">
            {/* Background Image Layer */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={item.imageUrl}
                alt={item.imageAlt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1930] via-[#0A1930]/80 to-[#0A1930]/40" />
            </div>

            {/* Tags */}
            <div className="flex items-center gap-2 z-10">
              <span className="px-3 py-1 rounded-full bg-[#FF9933] text-[#0A1930] text-xs font-bold uppercase tracking-wider">
                {item.categoryTag}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#0A1930]/80 backdrop-blur-md text-white text-xs font-mono border border-white/20">
                {item.client}
              </span>
            </div>

            {/* Title & Info */}
            <div className="my-auto z-10 pt-2">
              <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white drop-shadow-sm">
                {item.title}
              </h3>
              <p className="text-xs text-slate-300 font-mono mt-1">
                SUBSTRATE: {item.substrate}
              </p>
            </div>

            <div className="text-[10px] font-mono text-slate-300 z-10 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FF9933]" />
              <span>AGL QA CERTIFIED PRODUCTION SPECIFICATION</span>
            </div>
          </div>

          {/* Modal Body Content */}
          <div className="p-6 sm:p-8 bg-[#FAF7F2]">
            {/* Description */}
            <div className="mb-6">
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#2F6FED] mb-1.5">
                PROJECT OVERVIEW
              </h4>
              <p className="text-sm sm:text-base text-[#161B22]/85 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Key Engineering Highlights */}
            <div className="mb-6">
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#2F6FED] mb-2.5">
                STRUCTURAL & PRINT HIGHLIGHTS
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {item.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white border border-[#12295A]/10 text-xs text-[#161B22]/80 flex items-start gap-2 shadow-xs"
                  >
                    <CheckCircle className="w-4 h-4 text-[#FF9933] shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Production Specifications Table */}
            <div className="mb-8">
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#2F6FED] mb-2.5">
                MANUFACTURING MATRIX
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {item.specs.map((spec, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white border border-[#12295A]/10"
                  >
                    <span className="text-[10px] font-mono text-[#12295A]/60 block uppercase">
                      {spec.label}
                    </span>
                    <span className="text-xs font-bold text-[#0A1930] block mt-0.5">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Bottom CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#12295A]/12">
              <div className="flex items-center gap-2 text-xs text-[#161B22]/70">
                <Award className="w-4 h-4 text-[#FF9933]" />
                <span>Ready to engineer packaging for your product?</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/2 sm:w-auto px-4 py-2.5 rounded-xl border border-[#12295A]/20 text-xs font-bold text-[#0A1930] hover:bg-white transition-colors cursor-pointer"
                >
                  Close Case Study
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenQuoteModal();
                  }}
                  className="w-1/2 sm:w-auto px-5 py-2.5 rounded-xl bg-[#FF9933] text-[#0A1930] text-xs font-bold hover:bg-[#FFB35C] shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Request Similar Spec</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// -------------------------------------------------------------
// MAIN PORTFOLIO COMPONENT (SECTION 7)
// -------------------------------------------------------------
interface PortfolioProps {
  onOpenQuoteModal: () => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onOpenQuoteModal }) => {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>('All');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  // Filter items based on active tab
  const filteredItems =
    activeCategory === 'All'
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section
      id="portfolio"
      className="py-20 sm:py-28 lg:py-32 bg-[#FAF7F2] text-[#161B22] relative border-t border-[#12295A]/10"
      aria-label="Packaging Portfolio — Our Work"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF9933]/15 border border-[#FF9933]/30 text-[#0A1930] text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#FF9933]" />
            <span>OUR WORK</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A1930] tracking-tight">
            Packaging We&apos;re Proud Of
          </h2>

          <p className="text-sm sm:text-base text-[#161B22]/75 mt-3 max-w-xl mx-auto leading-relaxed">
            Browse recent boxes, mailers, pouches, and labels we have made for our clients.
          </p>
        </div>

        {/* Filter Tabs Row (Centered, Pill-Style Buttons) */}
        <div className="flex items-center justify-center mb-10 sm:mb-12 overflow-x-auto py-2 px-1">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-full bg-white border border-[#12295A]/12 shadow-sm">
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  id={`filter-tab-${category.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`px-3.5 sm:px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#FF9933] text-[#0A1930] shadow-sm font-extrabold'
                      : 'bg-transparent text-[#12295A]/80 hover:text-[#0A1930] hover:bg-[#FAF7F2]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bento Grid: Explicit CSS Grid Layout with consistent aspect-ratios & spans */}
        {/* Mobile (375px+): 1 column grid */}
        {/* Tablet (768px+): 2 columns grid */}
        {/* Desktop (1024px+ / 1440px+): 12 columns bento grid (8 col hero + 4 col cards) */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <PortfolioCard
                key={item.id}
                item={item}
                onClick={() => setSelectedItem(item)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Portfolio CTA */}
        <div className="mt-14 sm:mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center justify-between gap-4 p-6 sm:p-7 rounded-2xl bg-white border border-[#12295A]/10 shadow-[0_4px_20px_rgba(10,25,48,0.04)] max-w-2xl mx-auto w-full">
            <div className="text-left">
              <div className="font-heading font-bold text-base text-[#0A1930]">
                Have a unique packaging format in mind?
              </div>
              <div className="text-xs text-[#161B22]/70 mt-0.5">
                We engineer bespoke dielines, structural mockups, and material samples.
              </div>
            </div>
            <button
              type="button"
              onClick={onOpenQuoteModal}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0A1930] hover:bg-[#12295A] text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              <span>Request Custom Dieline Sample</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#FF9933]" />
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox / Modal View */}
      <PortfolioModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onOpenQuoteModal={onOpenQuoteModal}
      />
    </section>
  );
};
