export type ProductCategory =
  | 'All'
  | 'E-commerce Boxes'
  | 'Rigid & Gift Boxes'
  | 'Pouches & Bags'
  | 'Labels & Stickers'
  | 'Corporate Print'
  | 'Food Packaging';

export interface ProductSize {
  id: string;
  label: string;
  dimensionsCm: string;
  description: string;
  multiplier: number;
}

export interface ProductMaterial {
  id: string;
  name: string;
  gsm: string;
  swatchColor: string;
  multiplier: number;
  description: string;
}

export interface PrintingOption {
  id: string;
  name: string;
  description: string;
  multiplier: number;
}

export interface CoatingOption {
  id: string;
  name: string;
  description: string;
  multiplier: number;
}

export interface FoilOption {
  id: string;
  name: string;
  swatchColor: string;
  multiplier: number;
}

export interface QuantityTier {
  quantity: number;
  discountPercent: number;
}

export interface ProductSpecCard {
  iconName: 'Layers' | 'ShieldCheck' | 'Sparkles' | 'Leaf' | 'Printer' | 'Scissors' | 'Box' | 'Clock';
  title: string;
  description: string;
}

export interface ProductFaq {
  question: string;
  answer: string;
}

export interface Product {
  id: string;
  slug: string;
  sku: string;
  name: string;
  category: ProductCategory;
  categoryTag: string;
  startingPriceInr: number;
  priceUnit: string;
  minQuantity: number;
  leadTime: string;
  shortDescription: string;
  descriptionParagraphs: string[];
  mainImageUrl: string;
  galleryImages: {
    url: string;
    alt: string;
    caption: string;
  }[];
  keyFeatures: string[];
  sizes: ProductSize[];
  materials: ProductMaterial[];
  printingOptions: PrintingOption[];
  coatings: CoatingOption[];
  foilOptions: FoilOption[];
  quantityTiers: QuantityTier[];
  specCards: ProductSpecCard[];
  faqs: ProductFaq[];
  recommendedSubstrates: string[];
  popularFinishes: string[];
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  'All',
  'E-commerce Boxes',
  'Rigid & Gift Boxes',
  'Pouches & Bags',
  'Labels & Stickers',
  'Corporate Print',
  'Food Packaging',
];

export const PRODUCTS: Product[] = [
  {
    id: 'reverse-tuck-end-box',
    slug: 'reverse-tuck-end-box',
    sku: 'AGL-RTE-2026',
    name: 'Reverse Tuck End Box',
    category: 'E-commerce Boxes',
    categoryTag: 'Folding Carton',
    startingPriceInr: 14,
    priceUnit: 'per piece',
    minQuantity: 500,
    leadTime: '5–7 Business Days',
    shortDescription:
      'Lightweight paperboard box with opposing top and bottom flaps. Ideal for retail shelves and cosmetic bottles.',
    descriptionParagraphs: [
      'The Reverse Tuck End (RTE) box is a popular and economical choice for retail packaging. The top and bottom flaps fold in opposite directions, giving the box a clean front face for your branding.',
      'Made from sturdy SBS paperboard or natural kraft board, each box is precision die-cut and scored for easy assembly. Great for cosmetics, medicines, small electronics, soaps, and perfumes.',
      'We print using high-definition offset presses. You can add matte or gloss lamination, spot UV highlights, or gold and silver foil stamping.',
    ],
    mainImageUrl:
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
        alt: 'White minimalist folding paperboard reverse tuck carton for cosmetics',
        caption: 'Front shelf presentation & crisp crease fold',
      },
      {
        url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80',
        alt: 'Cosmetics serum folding carton packaging in high-definition print',
        caption: 'Luxury folding carton with precision thumb-tuck tab',
      },
      {
        url: 'https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&w=1200&q=80',
        alt: 'Kraft paperboard texture and tactile finish',
        caption: 'Natural FSC-certified kraft board variation',
      },
      {
        url: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=1200&q=80',
        alt: 'Embossed and foiled brand packaging finish',
        caption: 'Embossed & spot gloss dimensional logo accent',
      },
    ],
    keyFeatures: [
      'Opposing top and bottom friction-lock closure',
      'High-speed automated or manual packing ready',
      'Full interior and exterior CMYK/Pantone printing',
      'Flat-shipping saves up to 80% on freight volume',
    ],
    sizes: [
      {
        id: 'size-xs',
        label: 'Compact Bottle',
        dimensionsCm: '4 × 4 × 12 cm',
        description: 'Ideal for 30ml dropper bottles & essential oils',
        multiplier: 0.85,
      },
      {
        id: 'size-s',
        label: 'Standard Jar',
        dimensionsCm: '7 × 7 × 9 cm',
        description: 'Best for 50g cosmetic jars & creams',
        multiplier: 1.0,
      },
      {
        id: 'size-m',
        label: 'Medium Retail',
        dimensionsCm: '10 × 6 × 15 cm',
        description: 'Great for skincare tubes, electronics & perfumes',
        multiplier: 1.22,
      },
      {
        id: 'size-l',
        label: 'Large Tube',
        dimensionsCm: '12 × 8 × 18 cm',
        description: 'Designed for wellness supplements & hair care',
        multiplier: 1.48,
      },
      {
        id: 'size-xl',
        label: 'Tall Bottle',
        dimensionsCm: '9 × 9 × 24 cm',
        description: 'Perfect for beverage bottles & premium spirits',
        multiplier: 1.75,
      },
      {
        id: 'size-custom',
        label: 'Custom CAD Dieline',
        dimensionsCm: 'Custom Specs',
        description: 'Engineered to fit your physical product exactly',
        multiplier: 1.35,
      },
    ],
    materials: [
      {
        id: 'sbs-300',
        name: 'SBS Solid Bleached Sulfate',
        gsm: '300 GSM',
        swatchColor: '#FFFFFF',
        multiplier: 1.0,
        description: 'Pure white virgin wood pulp, ultra-smooth for vibrant litho printing.',
      },
      {
        id: 'kraft-320',
        name: 'Premium Kraft Virgin Brown',
        gsm: '320 GSM',
        swatchColor: '#A07855',
        multiplier: 0.95,
        description: '100% biodegradable unbleached organic texture with high tear resistance.',
      },
      {
        id: 'duplex-white-350',
        name: 'White Back Coated Duplex',
        gsm: '350 GSM',
        swatchColor: '#F3F4F6',
        multiplier: 0.9,
        description: 'Rigid recycled core with clay-coated front for crisp CMYK rendering.',
      },
      {
        id: 'duplex-grey-350',
        name: 'Grey Back Duplex Board',
        gsm: '350 GSM',
        swatchColor: '#9CA3AF',
        multiplier: 0.82,
        description: 'Economical high-rigidity board optimized for high-volume retail FMCG.',
      },
    ],
    printingOptions: [
      {
        id: 'print-outside',
        name: 'One Side Full Color (CMYK)',
        description: 'Exterior high-definition print with optional white base backing.',
        multiplier: 1.0,
      },
      {
        id: 'print-both',
        name: 'Both Sides Full Color (CMYK)',
        description: 'Vibrant exterior plus edge-to-edge interior unboxing graphic pattern.',
        multiplier: 1.28,
      },
    ],
    coatings: [
      {
        id: 'coat-matte',
        name: 'Matte Soft-Touch',
        description: 'Silky tactile non-reflective velvet finish.',
        multiplier: 1.0,
      },
      {
        id: 'coat-gloss',
        name: 'High Gloss UV',
        description: 'Mirror-shine high reflectance with vibrant color pop.',
        multiplier: 1.0,
      },
      {
        id: 'coat-spot-uv',
        name: 'Spot 3D Raised UV',
        description: 'High-gloss dimensional lacquer over matte base.',
        multiplier: 1.18,
      },
      {
        id: 'coat-hybrid',
        name: 'Hybrid UV Drip-Off',
        description: 'Contrasting micro-sand tactile grain and selective gloss.',
        multiplier: 1.24,
      },
    ],
    foilOptions: [
      { id: 'foil-none', name: 'None', swatchColor: '#E2E8F0', multiplier: 1.0 },
      { id: 'foil-gold', name: 'Metallic Gold', swatchColor: '#D4AF37', multiplier: 1.15 },
      { id: 'foil-silver', name: 'Radiant Silver', swatchColor: '#C0C0C0', multiplier: 1.15 },
      { id: 'foil-copper', name: 'Rose Copper', swatchColor: '#B87333', multiplier: 1.16 },
      { id: 'foil-blue', name: 'Royal Blue Foil', swatchColor: '#2F6FED', multiplier: 1.18 },
      {
        id: 'foil-holo',
        name: 'Holographic Rainbow',
        swatchColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #4facfe 100%)',
        multiplier: 1.22,
      },
    ],
    quantityTiers: [
      { quantity: 500, discountPercent: 0 },
      { quantity: 1000, discountPercent: 14 },
      { quantity: 2000, discountPercent: 24 },
      { quantity: 5000, discountPercent: 36 },
      { quantity: 10000, discountPercent: 48 },
    ],
    specCards: [
      {
        iconName: 'Scissors',
        title: 'Accurate Die-Cut Dieline',
        description: 'Clean cut and crease lines ensure easy folding and a snug tuck closure.',
      },
      {
        iconName: 'Printer',
        title: 'Sharp Offset Printing',
        description: 'Consistent, accurate color matching across all CMYK and Pantone inks.',
      },
      {
        iconName: 'ShieldCheck',
        title: 'Strong Paperboard',
        description: 'Tested for everyday retail handling, shelf stacking, and courier transit.',
      },
      {
        iconName: 'Leaf',
        title: '100% Recyclable Paper',
        description: 'Made from recyclable paperboard and non-toxic water-based inks.',
      },
    ],
    faqs: [
      {
        question: 'What is the standard minimum order quantity (MOQ) for Reverse Tuck End Boxes?',
        answer:
          'Our standard MOQ starts at 500 units per custom size and design. We also provide single-unit unprinted physical CAD structural mockups and 5–10 unit pre-production digitally printed sample runs for physical proofing before full volume execution.',
      },
      {
        question: 'Can you provide the exact dieline template for my graphic designer?',
        answer:
          'Yes! Once you share your target dimensions or product bottle/jar dimensions, our CAD team generates a vectorized Adobe Illustrator (.AI) and PDF dieline with clearly marked cut lines, crease lines, and safety bleed margins within 24 hours free of charge.',
      },
      {
        question: 'What is the difference between Reverse Tuck End and Straight Tuck End?',
        answer:
          'Reverse Tuck End (RTE) boxes feature the top flap tucking from front-to-back and the bottom flap tucking back-to-front (opposing directions). This keeps the front face clean without raw edges. Straight Tuck End (STE) has both flaps folding in the same direction, which is often preferred for presentation windows on cosmetics.',
      },
      {
        question: 'How do you ship these boxes to prevent damage during transit?',
        answer:
          'Reverse tuck folding cartons are packed completely flat inside heavy-duty 5-ply corrugated master shipping cartons lined with moisture-barrier poly wraps. This drastically cuts your freight and warehousing costs by up to 80% compared to rigid boxes.',
      },
      {
        question: 'What is the standard turnaround and production lead time?',
        answer:
          'Production typically requires 5 to 7 business days following digital proof and plate sign-off. Express 72-hour fast-track manufacturing is available upon request for urgent brand launches and exhibition deadlines.',
      },
    ],
    recommendedSubstrates: [
      '350 GSM Solid Bleached Board (SBB)',
      '300 GSM Kraft Paperboard',
      'Pearlised Virgin Stock',
    ],
    popularFinishes: ['Spot 3D UV Raised Gloss', 'Matte Velvet Soft-Touch', 'Metallic Gold/Copper Foil'],
  },
  {
    id: 'mailer-box',
    slug: 'mailer-box',
    sku: 'AGL-MLB-2026',
    name: 'Mailer Box',
    category: 'E-commerce Boxes',
    categoryTag: 'E-commerce Boxes',
    startingPriceInr: 28,
    priceUnit: 'per piece',
    minQuantity: 250,
    leadTime: '6–8 Business Days',
    shortDescription:
      'Sturdy corrugated mailer box with self-locking front tabs. Built for e-commerce shipping and clean unboxing.',
    descriptionParagraphs: [
      'The Roll-End Tuck Front (RETF) mailer is built for shipping products directly to customers. It features double-walled sides and front locking tabs that keep items safe in courier transit without needing exterior tape.',
      'Made from strong E-Flute or B-Flute corrugated board. You can print inside and outside to display your brand logo, unboxing message, or instructions on the inside lid.',
      'Finished with a scuff-resistant matte or gloss coating. These boxes are 100% recyclable, biodegradable, and fold into shape in seconds.',
    ],
    mainImageUrl:
      'https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&w=1200&q=80',
        alt: 'Custom printed corrugated kraft e-commerce mailer box with unboxing interior',
        caption: 'Roll-end tuck front corrugated mailer presentation',
      },
      {
        url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
        alt: 'Premium engineered e-commerce sound and electronics mailer box',
        caption: 'Double-walled side protection with interior branding',
      },
      {
        url: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=80',
        alt: 'Luxury wellness subscription unboxing mailer carton',
        caption: 'D2C subscription box with custom fit interior insert',
      },
      {
        url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
        alt: 'Natural corrugated flute structure and crush resistance',
        caption: 'High-compression micro-flute profile',
      },
    ],
    keyFeatures: [
      'Self-locking Roll-End Tuck Front (RETF) geometry',
      'ISTA 3A drop-test certified crush resistance',
      'Dual-side edge-to-edge printing with water/soy inks',
      'Optional tear-strip and return adhesive peel line',
    ],
    sizes: [
      {
        id: 'size-s-mailer',
        label: 'Small Tech / Jewelry',
        dimensionsCm: '18 × 12 × 5 cm',
        description: 'Compact box for accessories, earbuds & cosmetics',
        multiplier: 0.88,
      },
      {
        id: 'size-m-mailer',
        label: 'Medium D2C Essentials',
        dimensionsCm: '25 × 18 × 8 cm',
        description: 'Ideal for apparel tees, skincare sets & coffee bags',
        multiplier: 1.0,
      },
      {
        id: 'size-l-mailer',
        label: 'Large Apparel / Footwear',
        dimensionsCm: '32 × 24 × 10 cm',
        description: 'Best for jackets, shoes, hoodies & corporate gift kits',
        multiplier: 1.35,
      },
      {
        id: 'size-xl-mailer',
        label: 'Super Subscription Box',
        dimensionsCm: '38 × 28 × 12 cm',
        description: 'Spacious for multi-product subscription boxes',
        multiplier: 1.68,
      },
      {
        id: 'size-deep-mailer',
        label: 'Deep Gourmet Hamper',
        dimensionsCm: '30 × 30 × 15 cm',
        description: 'Deep profile for curated gourmet jars & ceramics',
        multiplier: 1.9,
      },
      {
        id: 'size-custom-mailer',
        label: 'Custom Sized Mailer',
        dimensionsCm: 'Custom Dimensions',
        description: 'Engineered around your exact product insert footprint',
        multiplier: 1.3,
      },
    ],
    materials: [
      {
        id: 'eflute-white',
        name: 'White Bleached Kraft Top E-Flute',
        gsm: '1.8mm Caliper',
        swatchColor: '#FFFFFF',
        multiplier: 1.05,
        description: 'Bright white outer canvas for rich full-spectrum CMYK artwork.',
      },
      {
        id: 'eflute-natural',
        name: 'Natural Brown Virgin Kraft E-Flute',
        gsm: '1.8mm Caliper',
        swatchColor: '#9C7A53',
        multiplier: 0.95,
        description: 'Raw tactile earthy kraft board with immense puncture resistance.',
      },
      {
        id: 'bflute-heavy',
        name: 'Heavy Duty B-Flute Corrugated',
        gsm: '3.0mm Caliper',
        swatchColor: '#7A5B38',
        multiplier: 1.15,
        description: 'Reinforced flute cushioning for heavier or fragile glassware items.',
      },
      {
        id: 'black-kraft-luxe',
        name: 'Solid Onyx Black Dyed Flute',
        gsm: '2.0mm Caliper',
        swatchColor: '#1F242C',
        multiplier: 1.35,
        description: 'Deep black through-and-through pulp for ultra-luxury aesthetics.',
      },
    ],
    printingOptions: [
      {
        id: 'print-outside-only',
        name: 'Outside Only Full Color',
        description: 'Full-bleed exterior branding with clean neutral interior kraft/white.',
        multiplier: 1.0,
      },
      {
        id: 'print-inside-outside',
        name: 'Inside & Outside (Dual Sided CMYK)',
        description: 'Edge-to-edge custom printing on exterior and interior lid for viral unboxing.',
        multiplier: 1.32,
      },
    ],
    coatings: [
      {
        id: 'coat-matte-aq',
        name: 'Anti-Scuff Matte Aqueous',
        description: 'Protective satin matte barrier preventing courier scuffs and fingerprints.',
        multiplier: 1.0,
      },
      {
        id: 'coat-gloss-aq',
        name: 'High Brilliance Gloss',
        description: 'High gloss lacquer intensifying saturated hues.',
        multiplier: 1.0,
      },
      {
        id: 'coat-spot-uv-box',
        name: 'Spot 3D UV Logo Accent',
        description: 'Selective raised high-gloss lacquer highlighting your brand logomark.',
        multiplier: 1.16,
      },
    ],
    foilOptions: [
      { id: 'foil-none', name: 'None', swatchColor: '#E2E8F0', multiplier: 1.0 },
      { id: 'foil-gold', name: 'Metallic Gold', swatchColor: '#D4AF37', multiplier: 1.15 },
      { id: 'foil-silver', name: 'Radiant Silver', swatchColor: '#C0C0C0', multiplier: 1.15 },
      { id: 'foil-copper', name: 'Rose Copper', swatchColor: '#B87333', multiplier: 1.16 },
      {
        id: 'foil-holo',
        name: 'Holographic Shimmer',
        swatchColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #4facfe 100%)',
        multiplier: 1.2,
      },
    ],
    quantityTiers: [
      { quantity: 250, discountPercent: 0 },
      { quantity: 500, discountPercent: 12 },
      { quantity: 1000, discountPercent: 22 },
      { quantity: 2500, discountPercent: 34 },
      { quantity: 5000, discountPercent: 44 },
    ],
    specCards: [
      {
        iconName: 'Box',
        title: 'No Tape Needed to Assemble',
        description: 'Interlocking flaps and front roll tabs lock tightly into place.',
      },
      {
        iconName: 'ShieldCheck',
        title: 'Strong Corrugated Board',
        description: 'Double-walled sides protect delicate products against shipping drops.',
      },
      {
        iconName: 'Printer',
        title: 'Inside & Outside Printing',
        description: 'Vibrant CMYK inks with sharp, accurate details on both sides.',
      },
      {
        iconName: 'Leaf',
        title: '100% Recyclable Board',
        description: 'Made from up to 80% recycled paper pulp and fully biodegradable.',
      },
    ],
    faqs: [
      {
        question: 'Can I add custom foam or cardboard inserts to fit my products?',
        answer:
          'Yes! We engineer custom laser-cut EVA foam, high-density velvet flocked inserts, and sustainable folding paperboard dividers tailored to the exact CAD contours of your bottles, cosmetics, or hardware.',
      },
      {
        question: 'Will the exterior print get scratched during postal transit?',
        answer:
          'Our mailer boxes are finished with an anti-scuff matte aqueous protective coating that repels friction marks, moisture droplets, and conveyor scuffing from courier handling.',
      },
      {
        question: 'How easy is it to assemble these boxes manually?',
        answer:
          'Extremely fast. Roll-End Tuck Front mailers fold into shape in under 10 seconds without glue, tape, or special equipment.',
      },
      {
        question: 'Do you offer peel-and-seal adhesive strips for e-commerce returns?',
        answer:
          'Yes, we can apply an integrated double peel-and-seal strip with a center tear ribbon so your customers can conveniently reuse the same box for return shipments.',
      },
      {
        question: 'What is the lead time for custom printed mailer boxes?',
        answer:
          'Standard production turnaround is 6 to 8 business days once artwork proofs are approved. Rush manufacturing options are also available.',
      },
    ],
    recommendedSubstrates: [
      'E-Flute 1.8mm Kraft',
      'B-Flute 3.0mm Heavy Corrugated',
      'White Bleached Kraft Top',
    ],
    popularFinishes: ['Matte Aqueous Varnish', 'Gloss Anti-Scuff Coating', 'Spot UV Logo Accent'],
  },
  {
    id: 'standup-pouch',
    slug: 'standup-pouch',
    sku: 'AGL-SUP-2026',
    name: 'Standup Pouch',
    category: 'Pouches & Bags',
    categoryTag: 'Pouches & Bags',
    startingPriceInr: 8,
    priceUnit: 'per piece',
    minQuantity: 1000,
    leadTime: '8–12 Business Days',
    shortDescription:
      'Airtight flexible pouch with an expandable bottom gusset. Stands upright on store shelves.',
    descriptionParagraphs: [
      'The Standup Pouch is a lightweight, flexible packaging solution for food, powders, and dry goods. The bottom gusset expands when filled so the pouch stands upright on retail shelves.',
      'Made with multi-layer barrier films (PET, aluminum foil, and food-grade PE/EVOH). This keeps out moisture, air, and odors to keep products fresh longer.',
      'Available with resealable zippers, easy tear notches, transparent product windows, and one-way degassing valves for coffee beans.',
    ],
    mainImageUrl:
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
        alt: 'Artisanal single-origin coffee valve pouch with matte craft texture',
        caption: 'Aroma-sealed standup pouch with one-way degassing valve',
      },
      {
        url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
        alt: 'White minimalist high-barrier pouch with resealable zipper',
        caption: 'Airtight press-to-close zipper seal and tear notch',
      },
      {
        url: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=1200&q=80',
        alt: 'Bottom gusset expansion profile standing on retail shelf',
        caption: 'Self-standing sturdy bottom gusset structure',
      },
    ],
    keyFeatures: [
      'Bottom bottom-gusset stands upright on retail shelves',
      'High-barrier aluminum/EVOH multi-layer lamination',
      'Resealable press-to-close or pocket pull zipper',
      'Optional one-way CO2 degassing aroma valve',
    ],
    sizes: [
      {
        id: 'size-sup-100g',
        label: '100g Sample / Snack',
        dimensionsCm: '11 × 17 + 6 cm',
        description: 'Ideal for matcha, spices, sample teas & gummies',
        multiplier: 0.85,
      },
      {
        id: 'size-sup-250g',
        label: '250g Retail Coffee',
        dimensionsCm: '16 × 23 + 8 cm',
        description: 'Industry standard for specialty coffee beans & nuts',
        multiplier: 1.0,
      },
      {
        id: 'size-sup-500g',
        label: '500g Superfood Powder',
        dimensionsCm: '19 × 26 + 9 cm',
        description: 'Great for protein powders, dried fruits & granola',
        multiplier: 1.28,
      },
      {
        id: 'size-sup-1kg',
        label: '1 kg Bulk Pantry',
        dimensionsCm: '23 × 34 + 10 cm',
        description: 'Substantial pouch for flour, pet treats & wholesale grains',
        multiplier: 1.65,
      },
      {
        id: 'size-sup-custom',
        label: 'Custom Capacity',
        dimensionsCm: 'Custom Size',
        description: 'Custom dimensions engineered to your target fill volume',
        multiplier: 1.25,
      },
    ],
    materials: [
      {
        id: 'mat-matte-foil',
        name: 'Matte BOPP / Foil / PE Multi-Barrier',
        gsm: '120 Micron',
        swatchColor: '#2B2D42',
        multiplier: 1.0,
        description: 'Maximum barrier against light, oxygen and humidity for roast coffee and spices.',
      },
      {
        id: 'mat-kraft-evoh',
        name: 'Natural FSC Kraft / High Barrier EVOH',
        gsm: '140 Micron',
        swatchColor: '#A07855',
        multiplier: 1.08,
        description: 'Authentic rustic paper exterior with certified food-grade interior barrier.',
      },
      {
        id: 'mat-mono-pe',
        name: '100% Recyclable Mono-PE Structure',
        gsm: '110 Micron',
        swatchColor: '#E2E8F0',
        multiplier: 1.15,
        description: 'Single-polymer recyclable formulation meeting European circularity standards.',
      },
      {
        id: 'mat-clear-pet',
        name: 'High-Clarity Gloss PET / PE',
        gsm: '115 Micron',
        swatchColor: '#CBD5E1',
        multiplier: 0.92,
        description: 'Crystal clear full transparency allowing products to be viewed directly.',
      },
    ],
    printingOptions: [
      {
        id: 'print-gravure-full',
        name: 'Full Gravure / High-Def Digital Print',
        description: 'Edge-to-edge full CMYK + Spot Pantone printing across all panels.',
        multiplier: 1.0,
      },
      {
        id: 'print-metallic-underlay',
        name: 'Metallic Underlay Printing',
        description: 'Printed selectively over silver foil for shimmering iridescent gradients.',
        multiplier: 1.2,
      },
    ],
    coatings: [
      {
        id: 'coat-matte-velvet',
        name: 'Velvet Soft-Touch Matte',
        description: 'Silky tactile touch that resists finger smudges.',
        multiplier: 1.0,
      },
      {
        id: 'coat-high-gloss',
        name: 'High Gloss Lamination',
        description: 'Vibrant mirror sheen with maximum color depth.',
        multiplier: 1.0,
      },
      {
        id: 'coat-spot-gloss-matte',
        name: 'Combination Matte + Spot Gloss',
        description: 'Selective gloss on typography with velvety matte background.',
        multiplier: 1.18,
      },
    ],
    foilOptions: [
      { id: 'foil-none', name: 'None', swatchColor: '#E2E8F0', multiplier: 1.0 },
      { id: 'foil-gold', name: 'Hot Stamped Gold', swatchColor: '#D4AF37', multiplier: 1.14 },
      { id: 'foil-silver', name: 'Hot Stamped Silver', swatchColor: '#C0C0C0', multiplier: 1.14 },
      { id: 'foil-copper', name: 'Metallic Rose Copper', swatchColor: '#B87333', multiplier: 1.15 },
    ],
    quantityTiers: [
      { quantity: 1000, discountPercent: 0 },
      { quantity: 2500, discountPercent: 15 },
      { quantity: 5000, discountPercent: 26 },
      { quantity: 10000, discountPercent: 38 },
      { quantity: 25000, discountPercent: 48 },
    ],
    specCards: [
      {
        iconName: 'ShieldCheck',
        title: 'Moisture & Oxygen Barrier',
        description: 'Multi-layer barrier films keep aroma inside and moisture completely sealed out.',
      },
      {
        iconName: 'Layers',
        title: 'Resealable Zip Lock',
        description: 'Durable press-to-close track allows easy opening and resealing.',
      },
      {
        iconName: 'Sparkles',
        title: 'Easy Tear Notches',
        description: 'Clean pre-cut notches let customers tear open the pouch neatly by hand.',
      },
      {
        iconName: 'Leaf',
        title: 'Food-Grade Materials',
        description: 'Certified food-safe films and non-toxic food-grade inks.',
      },
    ],
    faqs: [
      {
        question: 'Are your pouches certified for direct food and organic product contact?',
        answer:
          'Yes, our pouches are manufactured in cleanroom environments with virgin polymers certified under FDA, EU 10/2011, and FSSAI guidelines for direct food contact.',
      },
      {
        question: 'Can you install one-way degassing aroma valves for freshly roasted coffee beans?',
        answer:
          'Yes, we heat-seal Swiss-engineered WIPF one-way degassing valves to the interior top panel, allowing CO2 gases to vent without letting outside oxygen degrade the beans.',
      },
      {
        question: 'Do you offer transparent windows to showcase the product inside?',
        answer:
          'Yes! We can create custom transparent window shapes by leaving specific zones of the foil barrier unmetallized, allowing consumers to inspect coffee beans, dried snacks, or tea leaves.',
      },
      {
        question: 'What is the minimum order quantity for custom printed pouches?',
        answer:
          'With our digital pouch printing lines, custom short runs start at just 1,000 units with zero cylinder plate setup fees.',
      },
    ],
    recommendedSubstrates: [
      'Matte Kraft / EVOH Barrier Film',
      'Metallized PET / Polyethylene',
      'Recyclable Mono-PE',
    ],
    popularFinishes: ['Tactile Soft-Touch Matte', 'Gloss Foil Accents', 'Clear Product Inspection Window'],
  },
  {
    id: 'rigid-gift-box',
    slug: 'rigid-gift-box',
    sku: 'AGL-RGB-2026',
    name: 'Rigid Gift Box',
    category: 'Rigid & Gift Boxes',
    categoryTag: 'Rigid & Gift Boxes',
    startingPriceInr: 95,
    priceUnit: 'per piece',
    minQuantity: 100,
    leadTime: '10–14 Business Days',
    shortDescription:
      'Heavy-duty rigid box made from thick greyboard with magnetic snap closure and custom foam inserts.',
    descriptionParagraphs: [
      'Rigid gift boxes are made from thick 1200–1800 GSM greyboard wrapped in smooth art paper. They do not collapse or bend, making them ideal for premium products and corporate gifts.',
      'The front flap features concealed magnets that close with a firm snap. Inside, custom laser-cut EVA foam holds bottles, perfumes, watches, or glassware securely.',
      'We customize these boxes with sharp foil stamping, embossing, spot UV gloss, and satin pull ribbons.',
    ],
    mainImageUrl:
      'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=1200&q=80',
        alt: 'Luxury rigid presentation box with pull ribbon and foiled detail',
        caption: 'Heirloom-grade condensed greyboard presentation box',
      },
      {
        url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
        alt: 'Solstice botanical spirits luxury rigid presentation case',
        caption: 'Bespoke rigid lid-and-base gift box with metallic foiled crest',
      },
      {
        url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=80',
        alt: 'Luxury gift box packaging with ribbon trim and custom insert',
        caption: 'Concealed magnetic closure with laser-cut velvet foam cavity',
      },
    ],
    keyFeatures: [
      'Concealed dual neodymium magnetic closure',
      'Precision laser-cut high density velvet/EVA inserts',
      'Beveled edge collar and reinforced corners',
      '1500 GSM thick solid chipboard core',
    ],
    sizes: [
      {
        id: 'size-rgb-small',
        label: 'Jewelry / Watch Box',
        dimensionsCm: '12 × 12 × 5 cm',
        description: 'Perfect for fine jewelry, timepieces & perfume bottles',
        multiplier: 0.85,
      },
      {
        id: 'size-rgb-medium',
        label: 'Medium Luxury Set',
        dimensionsCm: '22 × 16 × 7 cm',
        description: 'Ideal for cosmetics gift kits, electronics & leather goods',
        multiplier: 1.0,
      },
      {
        id: 'size-rgb-large',
        label: 'Large VIP Hamper Box',
        dimensionsCm: '30 × 24 × 9 cm',
        description: 'Designed for corporate gifting kits & apparel sets',
        multiplier: 1.45,
      },
      {
        id: 'size-rgb-wine',
        label: 'Bottle & Glass Presentation',
        dimensionsCm: '36 × 26 × 12 cm',
        description: 'Prestige format for spirits, glassware & luxury hampers',
        multiplier: 1.85,
      },
      {
        id: 'size-rgb-custom',
        label: 'Custom CAD Bespoke Structure',
        dimensionsCm: 'Custom Dimensions',
        description: 'Tailored precisely around your hero product cavity',
        multiplier: 1.35,
      },
    ],
    materials: [
      {
        id: 'mat-grey-1500',
        name: '1500 GSM Greyboard + 157 GSM Soft-Touch Wrap',
        gsm: '1500 GSM Core',
        swatchColor: '#0A1930',
        multiplier: 1.0,
        description: 'Industry benchmark for unyielding rigidity and velvety feel.',
      },
      {
        id: 'mat-colorplan-luxe',
        name: '1800 GSM Greyboard + G.F Smith Colorplan Paper',
        gsm: '1800 GSM Core',
        swatchColor: '#1F2937',
        multiplier: 1.25,
        description: 'Rich through-dyed uncoated English specialty paper with tactile tooth.',
      },
      {
        id: 'mat-metallic-linen',
        name: '1500 GSM Board + Metallic Linen Fabric Wrap',
        gsm: '1500 GSM Core',
        swatchColor: '#78350F',
        multiplier: 1.35,
        description: 'Woven fabric bookcloth wrap with subtle metallic sheen.',
      },
    ],
    printingOptions: [
      {
        id: 'print-rgb-full',
        name: 'Outside & Inside Lid Full Color Offset',
        description: 'Edge-to-edge CMYK print on both exterior and interior wrap.',
        multiplier: 1.0,
      },
      {
        id: 'print-rgb-pantone',
        name: 'Pantone Spot Inks + Silkscreen',
        description: 'Dedicated Pantone ink mixing with opaque silkscreen highlights.',
        multiplier: 1.15,
      },
    ],
    coatings: [
      {
        id: 'coat-matte-velvet-rgb',
        name: 'Anti-Fingerprint Velvet Matte',
        description: 'Soft tactile finish that prevents oil marks.',
        multiplier: 1.0,
      },
      {
        id: 'coat-spot-3d-rgb',
        name: 'Raised 3D Gloss Foil / UV',
        description: 'High-dimensional tactile lacquer over foil branding.',
        multiplier: 1.18,
      },
    ],
    foilOptions: [
      { id: 'foil-none', name: 'None', swatchColor: '#E2E8F0', multiplier: 1.0 },
      { id: 'foil-gold-rgb', name: '24K Yellow Gold Foil', swatchColor: '#D4AF37', multiplier: 1.15 },
      { id: 'foil-silver-rgb', name: 'Mirror Silver Foil', swatchColor: '#C0C0C0', multiplier: 1.15 },
      { id: 'foil-copper-rgb', name: 'Rose Copper Foil', swatchColor: '#B87333', multiplier: 1.16 },
      { id: 'foil-black-rgb', name: 'Gloss Onyx Black Foil', swatchColor: '#1A1A1A', multiplier: 1.14 },
    ],
    quantityTiers: [
      { quantity: 100, discountPercent: 0 },
      { quantity: 250, discountPercent: 12 },
      { quantity: 500, discountPercent: 22 },
      { quantity: 1000, discountPercent: 34 },
      { quantity: 2500, discountPercent: 45 },
    ],
    specCards: [
      {
        iconName: 'ShieldCheck',
        title: 'Thick 1500 GSM Greyboard',
        description: 'Rigid board prevents bending or denting under pressure.',
      },
      {
        iconName: 'Sparkles',
        title: 'Hidden Magnet Closure',
        description: 'Magnets built inside the box flap snap shut with a firm grip.',
      },
      {
        iconName: 'Scissors',
        title: 'Laser-Cut Foam Insert',
        description: 'Custom EVA foam cut to the exact shape and size of your products.',
      },
      {
        iconName: 'Clock',
        title: 'Hand-Wrapped Finish',
        description: 'Smooth corners and tight paper wrapping for a clean, luxury appearance.',
      },
    ],
    faqs: [
      {
        question: 'What type of interior inserts can you fabricate for rigid boxes?',
        answer:
          'We produce custom CNC laser-cut high-density EVA foam (available in black, white, and custom pantones), velvet-flocked thermoformed trays, satin-lined cushion pillows, and rigid cardboard dividers.',
      },
      {
        question: 'Do these boxes ship assembled or flat-packed?',
        answer:
          'Standard rigid boxes ship fully set up and assembled inside protective partitioned master cartons. We also manufacture collapsible rigid boxes with diagonal fold lines and corner self-adhesive tape tabs that ship flat.',
      },
      {
        question: 'Can you produce physical samples before full mass production?',
        answer:
          'Yes! We craft 1:1 physical sample prototypes featuring your exact dimensions, magnet closure, custom foam insert, and hot foil proof for final sign-off.',
      },
      {
        question: 'What is the typical production timeline for rigid boxes?',
        answer:
          'Because of the hand-finishing and curing processes required for luxury greyboard assembly, production turnaround is typically 10 to 14 business days.',
      },
    ],
    recommendedSubstrates: [
      '1500 GSM Solid Greyboard',
      '157 GSM Soft-Touch Art Paper',
      'G.F Smith Colorplan Stock',
    ],
    popularFinishes: ['Hot Stamped Gold/Copper Foil', 'Blind Letterpress Deboss', 'Silkscreen Metallic Inks'],
  },
  {
    id: 'product-label-roll',
    slug: 'product-label-roll',
    sku: 'AGL-LBL-2026',
    name: 'Product Label Roll',
    category: 'Labels & Stickers',
    categoryTag: 'Labels & Stickers',
    startingPriceInr: 2.5,
    priceUnit: 'per piece',
    minQuantity: 2000,
    leadTime: '3–5 Business Days',
    shortDescription:
      'Custom printed stickers on rolls for bottles, jars, and boxes. Compatible with labeling machines or manual peeling.',
    descriptionParagraphs: [
      'These roll labels are made for fast application by hand or on automatic labeling machines. They use strong permanent adhesive that sticks firmly to glass, plastic, metal, and cardboard.',
      'Choose from waterproof synthetic BOPP film, textured paper for wine and cosmetic bottles, or eye-catching holographic film.',
      'Printed on digital and UV presses with clean die-cut edges that peel smoothly from the roll without tearing.',
    ],
    mainImageUrl:
      'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=1200&q=80',
        alt: 'Amber apothecary bottle with custom precision die-cut waterproof roll label',
        caption: 'Waterproof synthetic BOPP die-cut label on apothecary bottle',
      },
      {
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        alt: 'Holographic metallic security label foil roll',
        caption: 'Rainbow holographic light refraction roll stock',
      },
      {
        url: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=1200&q=80',
        alt: 'Textured uncoated wine label with hot foil stamp',
        caption: 'Textured cotton paper with gold foil stamping',
      },
    ],
    keyFeatures: [
      'High-precision digital die-cut to any custom perimeter',
      'Resistant to oils, water condensation, and refrigeration',
      'Available on 76mm/38mm machine applicator rolls',
      'Strong permanent adhesive for curved surfaces',
    ],
    sizes: [
      {
        id: 'size-lbl-small',
        label: 'Cosmetic Dropper / Lip Care',
        dimensionsCm: '3 × 5 cm',
        description: 'Compact format for 10ml–30ml dropper bottles & lip gloss',
        multiplier: 0.75,
      },
      {
        id: 'size-lbl-med',
        label: 'Jar & Bottle Standard',
        dimensionsCm: '6 × 10 cm',
        description: 'Standard format for 100ml–250ml bottles, honey jars & supplements',
        multiplier: 1.0,
      },
      {
        id: 'size-lbl-large',
        label: 'Wine & Spirits Wrap',
        dimensionsCm: '9 × 14 cm',
        description: 'Broad front-panel canvas for wine bottles, candles & shampoos',
        multiplier: 1.38,
      },
      {
        id: 'size-lbl-wrap',
        label: 'Full 360° Wrap-Around',
        dimensionsCm: '18 × 8 cm',
        description: 'Seamless 360-degree cylindrical wrap around cans and jars',
        multiplier: 1.75,
      },
      {
        id: 'size-lbl-custom',
        label: 'Bespoke Custom Die-Cut',
        dimensionsCm: 'Any Custom Contour',
        description: 'Custom organic vector outline tailored to your bottle shape',
        multiplier: 1.2,
      },
    ],
    materials: [
      {
        id: 'mat-bopp-white',
        name: 'Waterproof White Synthetic BOPP Film',
        gsm: '60 Micron',
        swatchColor: '#FFFFFF',
        multiplier: 1.0,
        description: 'Oil-proof, water-resistant, tear-proof white polypropylene film.',
      },
      {
        id: 'mat-bopp-clear',
        name: 'Ultra-Clear "No-Label Look" BOPP',
        gsm: '50 Micron',
        swatchColor: '#E2E8F0',
        multiplier: 1.15,
        description: 'Invisible transparent film creating a direct-to-glass print appearance.',
      },
      {
        id: 'mat-wine-paper',
        name: 'Textured Estate Cotton Wine Paper',
        gsm: '90 GSM',
        swatchColor: '#FDFBF7',
        multiplier: 1.25,
        description: 'Classic textured uncoated paper crafted for luxury wines, spirits and candles.',
      },
      {
        id: 'mat-holo-label',
        name: 'Rainbow Holographic Rainbow Film',
        gsm: '60 Micron',
        swatchColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #4facfe 100%)',
        multiplier: 1.35,
        description: 'Dynamic iridescent prism film reflecting vivid light patterns.',
      },
    ],
    printingOptions: [
      {
        id: 'print-lbl-hd',
        name: 'Full Color Digital HD (CMYK + White)',
        description: 'High-density opaque white ink backing with micro-detail resolution.',
        multiplier: 1.0,
      },
      {
        id: 'print-lbl-pantone',
        name: 'Pantone Spot Inks + Cold Foil',
        description: 'Exact Pantone spot formulation with integrated cold metallic foil.',
        multiplier: 1.25,
      },
    ],
    coatings: [
      {
        id: 'coat-lbl-matte',
        name: 'Matte Overlaminate',
        description: 'Anti-glare velvety protective film against moisture and oils.',
        multiplier: 1.0,
      },
      {
        id: 'coat-lbl-gloss',
        name: 'Ultra-Gloss Overlaminate',
        description: 'High brilliance glossy barrier with maximum scratch protection.',
        multiplier: 1.0,
      },
      {
        id: 'coat-lbl-spot',
        name: 'Spot Gloss Over Matte Lamination',
        description: 'Contrasting dimensional gloss highlights on key logos.',
        multiplier: 1.2,
      },
    ],
    foilOptions: [
      { id: 'foil-none', name: 'None', swatchColor: '#E2E8F0', multiplier: 1.0 },
      { id: 'foil-gold-lbl', name: 'Cold Metallic Gold Foil', swatchColor: '#D4AF37', multiplier: 1.18 },
      { id: 'foil-silver-lbl', name: 'Cold Metallic Silver Foil', swatchColor: '#C0C0C0', multiplier: 1.18 },
      { id: 'foil-copper-lbl', name: 'Rose Copper Foil', swatchColor: '#B87333', multiplier: 1.2 },
    ],
    quantityTiers: [
      { quantity: 2000, discountPercent: 0 },
      { quantity: 5000, discountPercent: 18 },
      { quantity: 10000, discountPercent: 32 },
      { quantity: 25000, discountPercent: 45 },
      { quantity: 50000, discountPercent: 55 },
    ],
    specCards: [
      {
        iconName: 'ShieldCheck',
        title: 'Water & Oil Resistant',
        description: 'Synthetic BOPP film and lamination protect against water droplets and oils.',
      },
      {
        iconName: 'Clock',
        title: 'Machine & Hand Application',
        description: 'Standard roll cores fit high-speed label applicator machines or peel easily by hand.',
      },
      {
        iconName: 'Scissors',
        title: 'Clean Die-Cut Edges',
        description: 'Sharp die-cutting ensures labels peel cleanly without tearing the backing paper.',
      },
      {
        iconName: 'Printer',
        title: 'Opaque White Underprint',
        description: 'White base ink keeps colors bright and non-transparent on dark bottles.',
      },
    ],
    faqs: [
      {
        question: 'Will these labels hold up in the shower or refrigerator?',
        answer:
          'Yes. Our waterproof synthetic BOPP labels with matte or gloss thermal overlaminate are impervious to water droplets, ice buckets, and bathroom steam without peeling or bleeding.',
      },
      {
        question: 'What core size and unwind direction do you provide for machine applicators?',
        answer:
          'We supply standard 76mm (3") or 38mm (1.5") core diameters and wind to your required applicator orientation (Top-First, Bottom-First, Right-First, or Left-First).',
      },
      {
        question: 'Can I order multiple design variations within a single production run?',
        answer:
          'Yes! Thanks to our digital HP Indigo press infrastructure, you can split your total quantity across multiple product SKUs (e.g. 5 scents or flavors) sharing the same die-cut size.',
      },
    ],
    recommendedSubstrates: [
      'White Synthetic BOPP Film',
      'Rainbow Holographic Foil',
      'Textured Uncoated Wine Paper',
    ],
    popularFinishes: ['Matte UV Overlaminate', 'High-Gloss Varnish', 'Cold Foil Metallic Shimmer'],
  },
  {
    id: 'pizza-box',
    slug: 'pizza-box',
    sku: 'AGL-PZB-2026',
    name: 'Pizza Box',
    category: 'Food Packaging',
    categoryTag: 'Food Packaging',
    startingPriceInr: 12,
    priceUnit: 'per piece',
    minQuantity: 500,
    leadTime: '5–7 Business Days',
    shortDescription:
      'Food-grade corrugated box with rear steam vents to keep pizza crusts crisp during delivery.',
    descriptionParagraphs: [
      'Made for pizzerias, bakeries, and cloud kitchens. The corrugated board keeps food hot during delivery, while rear vents let steam escape so crusts stay crisp.',
      'Made from FDA and FSSAI-compliant food-grade kraft paper. We print using odorless, water-based vegetable soy inks.',
      'Designed with interlocking corners and reinforced edges so boxes can be stacked without crushing.',
    ],
    mainImageUrl:
      '/images/products/pizza-box.jpg',
    galleryImages: [
      {
        url: '/images/products/pizza-box.jpg',
        alt: 'Artisanal pizza in authentic corrugated vented takeaway pizza box',
        caption: 'Food-grade steam-vented corrugated delivery box',
      },
      {
        url: 'https://dev-to-uploads.s3.amazonaws.com/uploads/articles/n7x3bejhg4o3aoevzd8u.jpg',
        alt: 'Oven-warm artisan pizza in branded takeaway box',
        caption: 'Greaseproof barrier interior liner with corner steam vents',
      },
      {
        url: 'https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&w=1200&q=80',
        alt: 'Interlocking stackable corrugated takeout carton',
        caption: 'Stackable interlocking corner tabs for courier delivery',
      },
    ],
    keyFeatures: [
      'Food-grade direct-contact FDA certified virgin kraft',
      'Dual rear steam escape vents to prevent condensation',
      'Stackable interlocking corner tabs for courier delivery',
      'Printed with odor-free soy vegetable flexographic inks',
    ],
    sizes: [
      {
        id: 'size-pzb-7',
        label: '7" Personal Pizza / Tart',
        dimensionsCm: '19 × 19 × 4.5 cm',
        description: 'Compact personal size for tarts, calzones & 7-inch pies',
        multiplier: 0.82,
      },
      {
        id: 'size-pzb-10',
        label: '10" Medium Classic',
        dimensionsCm: '27 × 27 × 4.5 cm',
        description: 'Standard medium pizza and pastry box',
        multiplier: 1.0,
      },
      {
        id: 'size-pzb-12',
        label: '12" Large Artisan',
        dimensionsCm: '32 × 32 × 4.5 cm',
        description: 'Most popular size for gourmet sourdough pizza',
        multiplier: 1.22,
      },
      {
        id: 'size-pzb-14',
        label: '14" Extra-Large Family',
        dimensionsCm: '37 × 37 × 5 cm',
        description: 'Heavy duty XL format for family pizzas and party pies',
        multiplier: 1.48,
      },
    ],
    materials: [
      {
        id: 'mat-kraft-food-e',
        name: 'Food Grade Virgin Kraft E-Flute',
        gsm: '1.8mm Caliper',
        swatchColor: '#9C7A53',
        multiplier: 1.0,
        description: '100% virgin food-contact certified brown kraft corrugation.',
      },
      {
        id: 'mat-white-food-e',
        name: 'Bleached White Clay Coated Food Board',
        gsm: '1.8mm Caliper',
        swatchColor: '#FFFFFF',
        multiplier: 1.1,
        description: 'Pure white top liner for high-definition vibrant food branding.',
      },
      {
        id: 'mat-bflute-heavy-pizza',
        name: 'Heavy Duty Thermal B-Flute',
        gsm: '3.0mm Caliper',
        swatchColor: '#855E38',
        multiplier: 1.2,
        description: 'Thicker thermal fluting for extended delivery radius retention.',
      },
    ],
    printingOptions: [
      {
        id: 'print-pzb-1c',
        name: '1 or 2 Color Flexo Soy Ink',
        description: 'Crisp, bold graphic linework using food-safe odorless vegetable inks.',
        multiplier: 1.0,
      },
      {
        id: 'print-pzb-4c',
        name: 'Full Color CMYK Process',
        description: 'Full-spectrum litho-laminated photographic imagery.',
        multiplier: 1.3,
      },
    ],
    coatings: [
      {
        id: 'coat-pzb-std',
        name: 'Standard Food-Safe Aqueous Varnish',
        description: 'Non-toxic sealing varnish preventing ink rub-off.',
        multiplier: 1.0,
      },
      {
        id: 'coat-pzb-grease',
        name: 'Greaseproof Barrier Treatment',
        description: 'Specialty oleophobic barrier preventing butter and oil soak-through.',
        multiplier: 1.15,
      },
    ],
    foilOptions: [
      { id: 'foil-none', name: 'None', swatchColor: '#E2E8F0', multiplier: 1.0 },
      { id: 'foil-gold-pzb', name: 'Hot Foil Top Crest', swatchColor: '#D4AF37', multiplier: 1.25 },
    ],
    quantityTiers: [
      { quantity: 500, discountPercent: 0 },
      { quantity: 1000, discountPercent: 12 },
      { quantity: 2500, discountPercent: 24 },
      { quantity: 5000, discountPercent: 36 },
      { quantity: 10000, discountPercent: 46 },
    ],
    specCards: [
      {
        iconName: 'Leaf',
        title: '100% Food-Safe Paper',
        description: 'Virgin kraft paperboard with clean food-contact safety certification.',
      },
      {
        iconName: 'Box',
        title: 'Rear Steam Vents',
        description: 'Corner holes release steam to prevent moisture buildup and soggy crusts.',
      },
      {
        iconName: 'ShieldCheck',
        title: 'Rigid Stacking Flutes',
        description: 'Interlocking corners prevent box tops from sagging when stacked.',
      },
    ],
    faqs: [
      {
        question: 'Are the inks certified safe for food contact and high heat?',
        answer:
          'Yes, our inks are water-based soy vegetable formulations that undergo strict migration testing and emit zero volatile chemical fumes even under 90°C pizza steam.',
      },
      {
        question: 'Can you produce custom ventilation holes and tear-off lid perforations?',
        answer:
          'Yes, our CAD engineers can integrate custom steam vents, sauce-cup holding tabs, or 4-way tear-off perforations turning the lid into four party serving plates.',
      },
    ],
    recommendedSubstrates: [
      'Food-Grade B-Flute Corrugated',
      'E-Flute Bleached White Kraft',
      'Clay Coated Virgin Board',
    ],
    popularFinishes: ['Flexographic Food-Safe Soy Ink', 'Grease-Resistant Aqueous Liner', 'Embossed Top Crest'],
  },
  {
    id: 'corrugated-shipping-box',
    slug: 'corrugated-shipping-box',
    sku: 'AGL-CSB-2026',
    name: 'Corrugated Shipping Box',
    category: 'E-commerce Boxes',
    categoryTag: 'E-commerce Boxes',
    startingPriceInr: 35,
    priceUnit: 'per piece',
    minQuantity: 200,
    leadTime: '4–6 Business Days',
    shortDescription:
      'Heavy-duty brown carton for bulk shipping, warehousing, and parcel courier transport.',
    descriptionParagraphs: [
      'The Regular Slotted Carton (RSC) is the standard shipping box for courier delivery and warehouse storage. All flaps meet neatly in the center for quick taping.',
      'Available in single-wall (3-ply) and heavy-duty double-wall (5-ply) corrugated board for high crush resistance and stacking strength.',
      'Can be printed with your brand logo, handling icons, stacking limits, and barcodes.',
    ],
    mainImageUrl:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
        alt: 'Heavy duty brown corrugated master shipping cartons in warehouse logistics center',
        caption: 'Pallet-stacked master shipping cartons with high burst strength',
      },
      {
        url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
        alt: 'Reinforced corrugated shipping carton ready for courier freight',
        caption: 'Multi-ply corrugated board with edge crush test certification',
      },
      {
        url: 'https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&w=1200&q=80',
        alt: 'Fluted corrugated cross section with precision scoring',
        caption: '5-Ply heavy-duty fluted construction',
      },
    ],
    keyFeatures: [
      'Standard Regular Slotted Carton (RSC) structure',
      'Bursting strength rated up to 200 PSI Edge Crush Test (ECT)',
      '100% recyclable biodegradable post-consumer paper',
      'Pallet-optimized footprints for efficient container freight',
    ],
    sizes: [
      {
        id: 'size-csb-m',
        label: 'Medium Shipper (12x10x8")',
        dimensionsCm: '30 × 25 × 20 cm',
        description: 'Standard shipper for 10–15 retail units',
        multiplier: 0.9,
      },
      {
        id: 'size-csb-l',
        label: 'Large Master Shipper (16x12x12")',
        dimensionsCm: '40 × 30 × 30 cm',
        description: 'High capacity carton for wholesale dispatches',
        multiplier: 1.0,
      },
      {
        id: 'size-csb-xl',
        label: 'Heavy Freight Master (20x16x16")',
        dimensionsCm: '50 × 40 × 40 cm',
        description: 'Double-wall heavy duty box supporting up to 25 kg',
        multiplier: 1.45,
      },
    ],
    materials: [
      {
        id: 'mat-csb-3ply',
        name: 'Single Wall 3-Ply (150/150/150 GSM)',
        gsm: '3-Ply Kraft',
        swatchColor: '#9C7A53',
        multiplier: 1.0,
        description: 'Standard durable corrugated box for parcels up to 10 kg.',
      },
      {
        id: 'mat-csb-5ply',
        name: 'Double Wall 5-Ply Heavy Flute (180/180/180 GSM)',
        gsm: '5-Ply Heavy',
        swatchColor: '#78542F',
        multiplier: 1.4,
        description: 'Extra-tough double wall structure for freight cargo up to 30 kg.',
      },
    ],
    printingOptions: [
      {
        id: 'print-csb-flexo',
        name: '1 or 2 Color Heavy Flexo',
        description: 'High-contrast black/navy ink with handling icons and branding.',
        multiplier: 1.0,
      },
      {
        id: 'print-csb-full',
        name: 'Full Color 4-Side Print',
        description: 'Prominent 360-degree brand visibility.',
        multiplier: 1.25,
      },
    ],
    coatings: [
      {
        id: 'coat-csb-std',
        name: 'Standard Moisture Barrier Varnish',
        description: 'Protects outer kraft liner from warehouse humidity.',
        multiplier: 1.0,
      },
    ],
    foilOptions: [{ id: 'foil-none', name: 'None', swatchColor: '#E2E8F0', multiplier: 1.0 }],
    quantityTiers: [
      { quantity: 200, discountPercent: 0 },
      { quantity: 500, discountPercent: 15 },
      { quantity: 1000, discountPercent: 26 },
      { quantity: 2500, discountPercent: 38 },
    ],
    specCards: [
      {
        iconName: 'ShieldCheck',
        title: 'High Stacking Strength',
        description: 'Engineered to withstand heavy multi-layer pallet stacking in warehouses.',
      },
      {
        iconName: 'Leaf',
        title: '100% Recyclable Board',
        description: 'Made with biodegradable, high recycled fiber paperboard.',
      },
    ],
    faqs: [
      {
        question: 'What is the maximum weight capacity of the 5-ply shipping boxes?',
        answer:
          'Our 5-ply heavy-duty double wall corrugated shippers are rated to hold up to 30 kg of evenly distributed weight and withstand 45 ECT vertical compression.',
      },
    ],
    recommendedSubstrates: [
      'Double Wall 5-Ply Heavy Flute',
      'Single Wall 3-Ply Kraft',
      'Water-Resistant Top Liner',
    ],
    popularFinishes: ['High-Contrast Flexo Inks', 'Fragile/Handling Icons Print', 'Barcode & QR Code Zone'],
  },
  {
    id: 'kraft-paper-bag',
    slug: 'kraft-paper-bag',
    sku: 'AGL-KPB-2026',
    name: 'Kraft Paper Bag',
    category: 'Corporate Print',
    categoryTag: 'Corporate Print',
    startingPriceInr: 18,
    priceUnit: 'per piece',
    minQuantity: 300,
    leadTime: '6–8 Business Days',
    shortDescription:
      'Strong kraft paper shopping bag with reinforced bottom board and comfortable ribbon handles.',
    descriptionParagraphs: [
      'A durable retail paper bag for boutiques, apparel, cosmetics, and promotional events. The reinforced top rim and bottom cardboard insert ensure the bag carries weight without tearing.',
      'Available with twisted paper cords, cotton rope, or woven grosgrain ribbon handles.',
      'Printed in sharp offset colors with optional foil stamping and spot UV accents.',
    ],
    mainImageUrl:
      'https://images.unsplash.com/photo-1553531384-cc64ac80f931?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1553531384-cc64ac80f931?auto=format&fit=crop&w=1200&q=80',
        alt: 'Heavyweight brown ribbed kraft shopping bag with luxury grosgrain ribbon handles',
        caption: 'Nordic Luxe ribbed kraft shopping bag with reinforced handles',
      },
      {
        url: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=1200&q=80',
        alt: 'Custom printed boutique brand retail suite and paper carriers',
        caption: 'Custom embossed logo with turn-over top hem reinforcement',
      },
      {
        url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
        alt: 'White coated art card shopping bag with hot foil stamping',
        caption: 'White laminated retail shopping bag with metallic foil accents',
      },
    ],
    keyFeatures: [
      'Reinforced top turnover hem & bottom structural card',
      'Supports up to 8.5 kg load without handle tearing',
      'Comfortable twisted paper or woven cotton ribbon handles',
      '100% biodegradable and reusable retail shopping tote',
    ],
    sizes: [
      {
        id: 'size-kpb-s',
        label: 'Small Boutique / Jewelry',
        dimensionsCm: '15 × 20 × 8 cm',
        description: 'Ideal for jewelry boxes, perfumes & cosmetics',
        multiplier: 0.85,
      },
      {
        id: 'size-kpb-m',
        label: 'Medium Retail Shopping',
        dimensionsCm: '25 × 32 × 11 cm',
        description: 'Standard size for apparel tees, books & gourmet food',
        multiplier: 1.0,
      },
      {
        id: 'size-kpb-l',
        label: 'Large Apparel / Tote',
        dimensionsCm: '35 × 42 × 14 cm',
        description: 'Spacious carrier for outerwear, footwear & gift hampers',
        multiplier: 1.35,
      },
    ],
    materials: [
      {
        id: 'mat-kraft-brown-bag',
        name: '250 GSM Virgin FSC Brown Ribbed Kraft',
        gsm: '250 GSM',
        swatchColor: '#9C7A53',
        multiplier: 1.0,
        description: 'Rustic organic texture with reinforced fiber strength.',
      },
      {
        id: 'mat-artcard-white-bag',
        name: '300 GSM Art Card with Soft-Touch Matte Lamination',
        gsm: '300 GSM',
        swatchColor: '#FFFFFF',
        multiplier: 1.25,
        description: 'Ultra-luxurious smooth white board with velvety protective barrier.',
      },
    ],
    printingOptions: [
      {
        id: 'print-kpb-2c',
        name: 'Both Sides 2-Color Offset',
        description: 'Crisp brand logos on front and back panels.',
        multiplier: 1.0,
      },
      {
        id: 'print-kpb-4c',
        name: 'Both Sides Full CMYK + Edge Gusset Print',
        description: 'Full-bleed photographic visuals across all 4 panels.',
        multiplier: 1.22,
      },
    ],
    coatings: [
      {
        id: 'coat-kpb-matte',
        name: 'Matte Lamination',
        description: 'Anti-tear velvety coating that reinforces structural strength.',
        multiplier: 1.0,
      },
      {
        id: 'coat-kpb-spot',
        name: 'Spot 3D UV Raised Logo',
        description: 'Glossy raised dimensional relief on your logo.',
        multiplier: 1.18,
      },
    ],
    foilOptions: [
      { id: 'foil-none', name: 'None', swatchColor: '#E2E8F0', multiplier: 1.0 },
      { id: 'foil-gold-bag', name: 'Metallic Gold Foil', swatchColor: '#D4AF37', multiplier: 1.16 },
      { id: 'foil-copper-bag', name: 'Rose Copper Foil', swatchColor: '#B87333', multiplier: 1.16 },
    ],
    quantityTiers: [
      { quantity: 300, discountPercent: 0 },
      { quantity: 500, discountPercent: 14 },
      { quantity: 1000, discountPercent: 25 },
      { quantity: 2500, discountPercent: 38 },
      { quantity: 5000, discountPercent: 48 },
    ],
    specCards: [
      {
        iconName: 'ShieldCheck',
        title: 'Strong 8.5 kg Load Capacity',
        description: 'Base cardboard and reinforced top rim prevent handles from tearing out.',
      },
      {
        iconName: 'Leaf',
        title: 'Recyclable & Reusable',
        description: 'Made from renewable paper fibers and eco-friendly handles.',
      },
    ],
    faqs: [
      {
        question: 'What handle options are available for custom bags?',
        answer:
          'We provide twisted paper cords, woven herringbone cotton tape, die-cut oval handle slots, and satin grosgrain ribbons in custom pantone colors.',
      },
    ],
    recommendedSubstrates: [
      '280 GSM Ribbed FSC Kraft',
      '300 GSM Art Card with Matte Lamination',
      'Virgin White Kraft',
    ],
    popularFinishes: ['Hot Stamped Saffron Foil', 'Blind Debossed Logo', 'Edge Color Piping'],
  },
];
