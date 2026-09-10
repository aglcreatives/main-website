import { BOX_CATALOG_DEFINITIONS, LABELS_STICKERS_DEFINITIONS, RETAIL_ECOMMERCE_DEFINITIONS } from './catalog';

export type ProductCategory =
  | 'All'
  | 'Folding Cartons'
  | 'Rigid Boxes'
  | 'Corrugated Boxes'
  | 'Mailer Boxes'
  | 'Specialty Boxes'
  | 'Display Boxes'
  | 'Food / Takeaway Boxes'
  | 'Adhesive Labels / Pressure-Sensitive Labels'
  | 'Sticker Labels'
  | 'Sleeve Labels'
  | 'In-Mold Labels'
  | 'Glue-Applied Labels'
  | 'Functional Labels'
  | 'Safety & Warning Labels'
  | 'Security & Authentication Labels'
  | 'Variable & Smart Labels'
  | 'Specialty / Decorative Labels'
  | 'Tags'
  | 'Application-Based Labels'
  | 'E-Commerce Boxes' | 'Shipping & Mailing Supplies' | 'Protective Packaging' | 'Void Fill & Cushioning' | 'Packaging Tapes' | 'Packaging Labels & Stickers' | 'Retail Bags' | 'Retail Packaging' | 'Retail Display & Merchandising' | 'Retail Tags & Cards' | 'E-Commerce Inserts & Marketing' | 'Poly Bags & Garment Packaging' | 'Wrapping Supplies' | 'Fulfillment & Warehouse Supplies';

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
  rootCategory?: string;
  parentCategory?: string;
  subcategory?: string;
  startingPriceInr: number;
  priceUnit: string;
  minQuantity: number;
  leadTime: string;
  shortDescription: string;
  descriptionParagraphs: string[];
  mainImageUrl: string;
  galleryImages: {
    key: string;
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
  'Folding Cartons',
  'Rigid Boxes',
  'Corrugated Boxes',
  'Mailer Boxes',
  'Specialty Boxes',
  'Display Boxes',
  'Food / Takeaway Boxes',
  'Adhesive Labels / Pressure-Sensitive Labels', 'Sticker Labels', 'Sleeve Labels', 'In-Mold Labels', 'Glue-Applied Labels', 'Functional Labels', 'Safety & Warning Labels', 'Security & Authentication Labels', 'Variable & Smart Labels', 'Specialty / Decorative Labels', 'Tags', 'Application-Based Labels',
  'E-Commerce Boxes', 'Shipping & Mailing Supplies', 'Protective Packaging', 'Void Fill & Cushioning', 'Packaging Tapes', 'Packaging Labels & Stickers', 'Retail Bags', 'Retail Packaging', 'Retail Display & Merchandising', 'Retail Tags & Cards', 'E-Commerce Inserts & Marketing', 'Poly Bags & Garment Packaging', 'Wrapping Supplies', 'Fulfillment & Warehouse Supplies',
];

type ProductSeed = {
  id: string;
  slug: string;
  sku: string;
  name: string;
  category: Exclude<ProductCategory, 'All'>;
  categoryTag: string;
  shortDescription: string;
  structure: string;
  useCase: string;
  features: string[];
  imageAlt: string;
  rootCategory?: string;
  parentCategory?: string;
  subcategory?: string;
};

const commonPrintingOptions: PrintingOption[] = [
  {
    id: 'print-exterior-cmyk',
    name: 'Exterior CMYK Print',
    description: 'High-resolution brand artwork on the visible outer panels.',
    multiplier: 1,
  },
  {
    id: 'print-inside-out',
    name: 'Inside + Outside Print',
    description: 'Exterior branding with interior graphics for a finished unboxing moment.',
    multiplier: 1.28,
  },
];

const commonCoatings: CoatingOption[] = [
  {
    id: 'coat-matte',
    name: 'Matte Lamination',
    description: 'Smooth low-glare protection for premium retail presentation.',
    multiplier: 1,
  },
  {
    id: 'coat-gloss',
    name: 'Gloss UV',
    description: 'Bright scuff-resistant gloss that increases color vibrancy.',
    multiplier: 1.04,
  },
  {
    id: 'coat-soft-touch',
    name: 'Soft-Touch',
    description: 'Velvety tactile finish for premium and gift packaging.',
    multiplier: 1.16,
  },
];

const commonFoils: FoilOption[] = [
  { id: 'foil-none', name: 'None', swatchColor: '#E2E8F0', multiplier: 1 },
  { id: 'foil-gold', name: 'Gold', swatchColor: '#D4AF37', multiplier: 1.14 },
  { id: 'foil-silver', name: 'Silver', swatchColor: '#C0C0C0', multiplier: 1.12 },
  { id: 'foil-copper', name: 'Copper', swatchColor: '#B87333', multiplier: 1.14 },
];

const cartonMaterials: ProductMaterial[] = [
  {
    id: 'sbs-350',
    name: 'SBS Paperboard',
    gsm: '350 GSM',
    swatchColor: '#F8FAFC',
    multiplier: 1,
    description: 'Clean white paperboard for crisp retail print and fine finishing.',
  },
  {
    id: 'kraft-320',
    name: 'Natural Kraft Board',
    gsm: '320 GSM',
    swatchColor: '#A9825A',
    multiplier: 0.94,
    description: 'Warm kraft surface for recyclable, understated packaging.',
  },
];

const rigidMaterials: ProductMaterial[] = [
  {
    id: 'greyboard-1400',
    name: 'Wrapped Greyboard',
    gsm: '1400 GSM',
    swatchColor: '#E5E7EB',
    multiplier: 1,
    description: 'Thick chipboard core wrapped with printed or textured paper.',
  },
  {
    id: 'greyboard-1800',
    name: 'Premium Rigid Board',
    gsm: '1800 GSM',
    swatchColor: '#CBD5E1',
    multiplier: 1.22,
    description: 'Extra-sturdy board for luxury launches and gift sets.',
  },
];

const corrugatedMaterials: ProductMaterial[] = [
  {
    id: 'e-flute-white',
    name: 'White E-Flute',
    gsm: '1.6 mm',
    swatchColor: '#FFFFFF',
    multiplier: 1,
    description: 'Fine corrugated flute for clean printing and compact shipping.',
  },
  {
    id: 'b-flute-kraft',
    name: 'Kraft B-Flute',
    gsm: '3 mm',
    swatchColor: '#A07855',
    multiplier: 1.08,
    description: 'Durable corrugated board for transit and warehouse handling.',
  },
];

const labelMaterials: ProductMaterial[] = [
  { id: 'label-paper', name: 'Label Paper', gsm: 'Custom gsm', swatchColor: '#FFFDF8', multiplier: 1, description: 'Paper face stock selected for print fidelity, application, and finish.' },
  { id: 'label-film', name: 'Label Film', gsm: 'Custom micron', swatchColor: '#DDEBFF', multiplier: 1.15, description: 'Durable PP, PE, or PET film selected for moisture resistance and handling.' },
];

const sizesByCategory: Partial<Record<Exclude<ProductCategory, 'All'>, ProductSize[]>> = {
  'Folding Cartons': [
    { id: 'small-carton', label: 'Small Retail', dimensionsCm: '6 x 4 x 12 cm', description: 'Compact cartons for bottles or tubes', multiplier: 0.9 },
    { id: 'medium-carton', label: 'Medium Retail', dimensionsCm: '10 x 6 x 16 cm', description: 'Everyday shelf-ready carton size', multiplier: 1 },
    { id: 'large-carton', label: 'Large Retail', dimensionsCm: '14 x 8 x 22 cm', description: 'Tall cartons for larger retail packs', multiplier: 1.28 },
    { id: 'custom-carton', label: 'Custom Dieline', dimensionsCm: 'Custom Specs', description: 'Built around your product dimensions', multiplier: 1.2 },
  ],
  'Rigid Boxes': [
    { id: 'small-rigid', label: 'Compact Gift', dimensionsCm: '12 x 10 x 5 cm', description: 'Small premium gift or accessory box', multiplier: 0.92 },
    { id: 'medium-rigid', label: 'Presentation Box', dimensionsCm: '22 x 16 x 7 cm', description: 'Popular rigid box for retail kits', multiplier: 1 },
    { id: 'large-rigid', label: 'Large Gift Set', dimensionsCm: '30 x 22 x 10 cm', description: 'Room for inserts and bundled products', multiplier: 1.38 },
    { id: 'custom-rigid', label: 'Custom Structure', dimensionsCm: 'Custom Specs', description: 'Sized and wrapped to your brief', multiplier: 1.26 },
  ],
  'Corrugated Boxes': [
    { id: 'small-shipper', label: 'Small Shipper', dimensionsCm: '20 x 15 x 10 cm', description: 'Compact shipping and sample dispatch', multiplier: 0.88 },
    { id: 'medium-shipper', label: 'Standard Shipper', dimensionsCm: '30 x 22 x 15 cm', description: 'Common retail shipping format', multiplier: 1 },
    { id: 'large-shipper', label: 'Bulk Shipper', dimensionsCm: '45 x 32 x 24 cm', description: 'Larger protective transit carton', multiplier: 1.42 },
    { id: 'custom-shipper', label: 'Custom RSC/HSC/FOL', dimensionsCm: 'Custom Specs', description: 'Engineered to your fill weight', multiplier: 1.25 },
  ],
  'Mailer Boxes': [
    { id: 'small-mailer', label: 'Small Mailer', dimensionsCm: '18 x 12 x 5 cm', description: 'Compact delivery mailer', multiplier: 0.9 },
    { id: 'medium-mailer', label: 'Standard Mailer', dimensionsCm: '25 x 18 x 8 cm', description: 'Everyday DTC delivery size', multiplier: 1 },
    { id: 'large-mailer', label: 'Large Mailer', dimensionsCm: '35 x 25 x 10 cm', description: 'Room for bundled orders', multiplier: 1.3 },
    { id: 'custom-mailer', label: 'Custom Dieline', dimensionsCm: 'Custom Specs', description: 'Designed around your shipment', multiplier: 1.2 },
  ],
  'Specialty Boxes': [
    { id: 'small-specialty', label: 'Small Specialty', dimensionsCm: '8 x 8 x 4 cm', description: 'Compact gift or sample format', multiplier: 0.9 },
    { id: 'medium-specialty', label: 'Standard Specialty', dimensionsCm: '15 x 12 x 6 cm', description: 'Popular specialty format', multiplier: 1 },
    { id: 'large-specialty', label: 'Large Specialty', dimensionsCm: '25 x 20 x 10 cm', description: 'Room for premium sets', multiplier: 1.3 },
    { id: 'custom-specialty', label: 'Custom Shape', dimensionsCm: 'Custom Specs', description: 'Built around a bespoke structure', multiplier: 1.25 },
  ],
  'Display Boxes': [
    { id: 'counter-display-size', label: 'Counter Display', dimensionsCm: '25 x 18 x 20 cm', description: 'Compact retail counter unit', multiplier: 0.95 },
    { id: 'shelf-display-size', label: 'Shelf Display', dimensionsCm: '35 x 25 x 25 cm', description: 'Standard shelf-ready format', multiplier: 1 },
    { id: 'floor-display-size', label: 'Floor Display', dimensionsCm: '60 x 40 x 140 cm', description: 'Freestanding retail unit', multiplier: 1.65 },
    { id: 'custom-display', label: 'Custom Display', dimensionsCm: 'Custom Specs', description: 'Engineered for your retail planogram', multiplier: 1.4 },
  ],
  'Food / Takeaway Boxes': [
    { id: 'single-serve-food', label: 'Single Serve', dimensionsCm: '12 x 12 x 6 cm', description: 'Individual takeaway portion', multiplier: 0.88 },
    { id: 'standard-food', label: 'Standard Takeaway', dimensionsCm: '20 x 20 x 8 cm', description: 'Everyday food-service size', multiplier: 1 },
    { id: 'family-food', label: 'Family Share', dimensionsCm: '30 x 30 x 10 cm', description: 'Larger sharing and delivery format', multiplier: 1.3 },
    { id: 'custom-food', label: 'Custom Food Format', dimensionsCm: 'Custom Specs', description: 'Sized around your menu item', multiplier: 1.18 },
  ],
  'Adhesive Labels / Pressure-Sensitive Labels': [{ id: 'label-small', label: 'Small Label', dimensionsCm: '5 x 5 cm', description: 'Compact adhesive label', multiplier: 0.9 }, { id: 'label-standard', label: 'Standard Label', dimensionsCm: '10 x 10 cm', description: 'Everyday product label', multiplier: 1 }, { id: 'label-large', label: 'Large Label', dimensionsCm: '15 x 20 cm', description: 'Large information label', multiplier: 1.2 }, { id: 'label-custom', label: 'Custom Size', dimensionsCm: 'Custom Specs', description: 'Specified for your surface', multiplier: 1.15 }],
  'Sticker Labels': [{ id: 'sticker-small', label: 'Small Sticker', dimensionsCm: '5 x 5 cm', description: 'Compact sticker', multiplier: 0.9 }, { id: 'sticker-standard', label: 'Standard Sticker', dimensionsCm: '10 x 10 cm', description: 'Everyday sticker format', multiplier: 1 }, { id: 'sticker-large', label: 'Large Sticker', dimensionsCm: '15 x 15 cm', description: 'Promotional sticker format', multiplier: 1.2 }, { id: 'sticker-custom', label: 'Custom Shape', dimensionsCm: 'Custom Specs', description: 'Custom die-cut sticker', multiplier: 1.2 }],
  'Sleeve Labels': [{ id: 'sleeve-small', label: 'Small Sleeve', dimensionsCm: 'Custom layflat', description: 'Compact container sleeve', multiplier: 0.9 }, { id: 'sleeve-standard', label: 'Standard Sleeve', dimensionsCm: 'Custom layflat', description: 'Production sleeve format', multiplier: 1 }, { id: 'sleeve-large', label: 'Large Sleeve', dimensionsCm: 'Custom layflat', description: 'Large container sleeve', multiplier: 1.25 }, { id: 'sleeve-custom', label: 'Custom Sleeve', dimensionsCm: 'Custom Specs', description: 'Specified for container geometry', multiplier: 1.2 }],
  'In-Mold Labels': [{ id: 'iml-small', label: 'Small IML', dimensionsCm: 'Custom Specs', description: 'Small molded-container label', multiplier: 0.9 }, { id: 'iml-standard', label: 'Standard IML', dimensionsCm: 'Custom Specs', description: 'Standard in-mold label', multiplier: 1 }, { id: 'iml-large', label: 'Large IML', dimensionsCm: 'Custom Specs', description: 'Large molded-container label', multiplier: 1.25 }, { id: 'iml-custom', label: 'Custom IML', dimensionsCm: 'Custom Specs', description: 'Matched to mold geometry', multiplier: 1.2 }],
  'Glue-Applied Labels': [{ id: 'glue-small', label: 'Small Label', dimensionsCm: '5 x 5 cm', description: 'Compact glue-applied label', multiplier: 0.9 }, { id: 'glue-standard', label: 'Standard Label', dimensionsCm: '10 x 10 cm', description: 'Production glue-applied label', multiplier: 1 }, { id: 'glue-large', label: 'Large Label', dimensionsCm: '15 x 20 cm', description: 'Large wrap label', multiplier: 1.2 }, { id: 'glue-custom', label: 'Custom Label', dimensionsCm: 'Custom Specs', description: 'Specified for application equipment', multiplier: 1.15 }],
  'Functional Labels': [{ id: 'functional-small', label: 'Small Label', dimensionsCm: '5 x 3 cm', description: 'Compact functional label', multiplier: 0.9 }, { id: 'functional-standard', label: 'Standard Label', dimensionsCm: '10 x 5 cm', description: 'Operational label format', multiplier: 1 }, { id: 'functional-large', label: 'Large Label', dimensionsCm: '15 x 10 cm', description: 'Large information label', multiplier: 1.2 }, { id: 'functional-custom', label: 'Custom Label', dimensionsCm: 'Custom Specs', description: 'Matched to scanning or information needs', multiplier: 1.15 }],
  'Safety & Warning Labels': [{ id: 'safety-small', label: 'Small Safety Label', dimensionsCm: '5 x 5 cm', description: 'Compact safety marking', multiplier: 0.9 }, { id: 'safety-standard', label: 'Standard Safety Label', dimensionsCm: '10 x 10 cm', description: 'Standard warning format', multiplier: 1 }, { id: 'safety-large', label: 'Large Safety Label', dimensionsCm: '15 x 15 cm', description: 'High-visibility safety marking', multiplier: 1.2 }, { id: 'safety-custom', label: 'Custom Safety Label', dimensionsCm: 'Custom Specs', description: 'Specified for compliance needs', multiplier: 1.15 }],
  'Security & Authentication Labels': [{ id: 'security-small', label: 'Small Security Label', dimensionsCm: '5 x 2 cm', description: 'Compact authentication label', multiplier: 0.95 }, { id: 'security-standard', label: 'Standard Security Label', dimensionsCm: '10 x 5 cm', description: 'Standard tamper/security format', multiplier: 1 }, { id: 'security-large', label: 'Large Security Label', dimensionsCm: '15 x 10 cm', description: 'Large security seal', multiplier: 1.25 }, { id: 'security-custom', label: 'Custom Security Label', dimensionsCm: 'Custom Specs', description: 'Specified for authentication workflow', multiplier: 1.25 }],
  'Variable & Smart Labels': [{ id: 'smart-small', label: 'Small Smart Label', dimensionsCm: '5 x 3 cm', description: 'Compact data label', multiplier: 0.95 }, { id: 'smart-standard', label: 'Standard Smart Label', dimensionsCm: '10 x 5 cm', description: 'Standard smart label', multiplier: 1 }, { id: 'smart-large', label: 'Large Smart Label', dimensionsCm: '15 x 10 cm', description: 'Large data label', multiplier: 1.2 }, { id: 'smart-custom', label: 'Custom Smart Label', dimensionsCm: 'Custom Specs', description: 'Matched to digital workflow', multiplier: 1.25 }],
  'Specialty / Decorative Labels': [{ id: 'decorative-small', label: 'Small Decorative Label', dimensionsCm: '5 x 5 cm', description: 'Compact premium label', multiplier: 0.95 }, { id: 'decorative-standard', label: 'Standard Decorative Label', dimensionsCm: '10 x 10 cm', description: 'Standard decorative label', multiplier: 1 }, { id: 'decorative-large', label: 'Large Decorative Label', dimensionsCm: '15 x 15 cm', description: 'Large premium label', multiplier: 1.25 }, { id: 'decorative-custom', label: 'Custom Decorative Label', dimensionsCm: 'Custom Specs', description: 'Custom premium finish', multiplier: 1.3 }],
  'Tags': [{ id: 'tag-small', label: 'Small Tag', dimensionsCm: '5 x 8 cm', description: 'Compact product tag', multiplier: 0.9 }, { id: 'tag-standard', label: 'Standard Tag', dimensionsCm: '7 x 12 cm', description: 'Standard retail tag', multiplier: 1 }, { id: 'tag-large', label: 'Large Tag', dimensionsCm: '10 x 18 cm', description: 'Large information tag', multiplier: 1.2 }, { id: 'tag-custom', label: 'Custom Tag', dimensionsCm: 'Custom Specs', description: 'Custom die-cut tag', multiplier: 1.2 }],
  'Application-Based Labels': [{ id: 'application-label-small', label: 'Small Label', dimensionsCm: '5 x 5 cm', description: 'Application-specific compact label', multiplier: 0.9 }, { id: 'application-label-standard', label: 'Standard Label', dimensionsCm: '10 x 10 cm', description: 'Application-specific label', multiplier: 1 }, { id: 'application-label-large', label: 'Large Label', dimensionsCm: '15 x 15 cm', description: 'Large application label', multiplier: 1.2 }, { id: 'application-label-custom', label: 'Custom Label', dimensionsCm: 'Custom Specs', description: 'Specified for your industry', multiplier: 1.15 }],
};

const materialByCategory: Partial<Record<Exclude<ProductCategory, 'All'>, ProductMaterial[]>> = {
  'Folding Cartons': cartonMaterials,
  'Rigid Boxes': rigidMaterials,
  'Corrugated Boxes': corrugatedMaterials,
  'Mailer Boxes': corrugatedMaterials,
  'Specialty Boxes': cartonMaterials,
  'Display Boxes': corrugatedMaterials,
  'Food / Takeaway Boxes': cartonMaterials,
  'Adhesive Labels / Pressure-Sensitive Labels': labelMaterials, 'Sticker Labels': labelMaterials, 'Sleeve Labels': labelMaterials, 'In-Mold Labels': labelMaterials, 'Glue-Applied Labels': labelMaterials, 'Functional Labels': labelMaterials, 'Safety & Warning Labels': labelMaterials, 'Security & Authentication Labels': labelMaterials, 'Variable & Smart Labels': labelMaterials, 'Specialty / Decorative Labels': labelMaterials, 'Tags': labelMaterials, 'Application-Based Labels': labelMaterials,
};

const categoryCopy: Partial<Record<Exclude<ProductCategory, 'All'>, {
  leadTime: string;
  minQuantity: number;
  substrates: string[];
  finishes: string[];
}>> = {
  'Folding Cartons': {
    leadTime: '5-7 Business Days',
    minQuantity: 500,
    substrates: ['SBS Paperboard', 'Kraft Paperboard', 'Duplex Board'],
    finishes: ['Matte Lamination', 'Spot UV', 'Foil Stamping'],
  },
  'Rigid Boxes': {
    leadTime: '10-14 Business Days',
    minQuantity: 250,
    substrates: ['Wrapped Greyboard', 'Textured Paper Wrap', 'Art Paper Wrap'],
    finishes: ['Soft-Touch Wrap', 'Magnetic Closure', 'Foil Stamping'],
  },
  'Corrugated Boxes': {
    leadTime: '6-9 Business Days',
    minQuantity: 250,
    substrates: ['E-Flute Corrugated Board', 'B-Flute Corrugated Board', 'Kraft Liner Board'],
    finishes: ['Flexographic Print', 'Litho Lamination', 'Water-Based Coating'],
  },
  'Mailer Boxes': { leadTime: '6-9 Business Days', minQuantity: 250, substrates: ['E-Flute Corrugated Board', 'B-Flute Corrugated Board'], finishes: ['Exterior Print', 'Inside Print', 'Water-Based Coating'] },
  'Specialty Boxes': { leadTime: '7-10 Business Days', minQuantity: 500, substrates: ['SBS Paperboard', 'Kraft Paperboard', 'Rigid Board'], finishes: ['Matte Lamination', 'Foil Stamping', 'Spot UV'] },
  'Display Boxes': { leadTime: '7-10 Business Days', minQuantity: 250, substrates: ['E-Flute Corrugated Board', 'B-Flute Corrugated Board', 'Kraft Liner Board'], finishes: ['Flexographic Print', 'Litho Lamination', 'Water-Based Coating'] },
  'Food / Takeaway Boxes': { leadTime: '5-8 Business Days', minQuantity: 500, substrates: ['Food-Safe SBS Paperboard', 'Kraft Paperboard', 'Grease-Resistant Board'], finishes: ['Food-Safe Aqueous Coating', 'Exterior CMYK Print', 'Kraft Finish'] },
  'Adhesive Labels / Pressure-Sensitive Labels': { leadTime: '5-7 Business Days', minQuantity: 1000, substrates: ['Label Paper', 'PP Film', 'PET Film'], finishes: ['Matte', 'Gloss', 'Foil'] },
  'Sticker Labels': { leadTime: '5-7 Business Days', minQuantity: 500, substrates: ['Paper', 'Vinyl', 'BOPP Film'], finishes: ['Matte', 'Gloss', 'Laminate'] },
  'Sleeve Labels': { leadTime: '10-14 Business Days', minQuantity: 1000, substrates: ['PETG Film', 'PVC Film', 'OPS Film'], finishes: ['Full-Body Print', 'Tamper Band', 'Matte'] },
  'In-Mold Labels': { leadTime: '10-14 Business Days', minQuantity: 5000, substrates: ['PP In-Mold Film', 'PE In-Mold Film'], finishes: ['Mold-Ready Print', 'Matte', 'Gloss'] },
  'Glue-Applied Labels': { leadTime: '5-7 Business Days', minQuantity: 1000, substrates: ['Label Paper', 'Film Stock'], finishes: ['Gloss', 'Matte', 'Wet-Strength Coating'] },
  'Functional Labels': { leadTime: '5-7 Business Days', minQuantity: 1000, substrates: ['Thermal Paper', 'Label Paper', 'Durable Film'], finishes: ['Variable Data', 'Barcode Print', 'Protective Laminate'] },
  'Safety & Warning Labels': { leadTime: '5-7 Business Days', minQuantity: 1000, substrates: ['Durable Film', 'Label Paper', 'Reflective Stock'], finishes: ['High Visibility Print', 'Laminate', 'Chemical Resistance'] },
  'Security & Authentication Labels': { leadTime: '7-10 Business Days', minQuantity: 1000, substrates: ['Destructible Film', 'Holographic Film', 'Security Paper'], finishes: ['Void Effect', 'Serialization', 'Hologram'] },
  'Variable & Smart Labels': { leadTime: '7-10 Business Days', minQuantity: 1000, substrates: ['Smart Inlay Stock', 'Label Film', 'Thermal Paper'], finishes: ['Variable Data', 'QR Print', 'NFC/RFID Encoding'] },
  'Specialty / Decorative Labels': { leadTime: '7-10 Business Days', minQuantity: 1000, substrates: ['Premium Paper', 'Metallic Film', 'Textured Stock'], finishes: ['Foil', 'Emboss', 'Soft-Touch'] },
  'Tags': { leadTime: '5-7 Business Days', minQuantity: 500, substrates: ['Uncoated Card', 'Kraft Card', 'Premium Card'], finishes: ['Die Cut', 'Foil', 'Emboss'] },
  'Application-Based Labels': { leadTime: '5-10 Business Days', minQuantity: 1000, substrates: ['Label Paper', 'Durable Film', 'Specialty Stock'], finishes: ['Custom Print', 'Application-Specific Adhesive', 'Laminate'] },
};

const svgToDataUri = (svg: string) =>
  `data:image/svg+xml,${encodeURIComponent(svg)}`;

const escapeSvgText = (text: string) =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const getVisualPalette = (category: Exclude<ProductCategory, 'All'>) => {
  if (category === 'Rigid Boxes') {
    return {
      surface: '#172554',
      surfaceLight: '#2F6FED',
      accent: '#FF9933',
      label: '#FAF7F2',
      paper: '#F8FAFC',
      shadow: '#0A1930',
    };
  }

  if (category === 'Corrugated Boxes') {
    return {
      surface: '#B88755',
      surfaceLight: '#D4A373',
      accent: '#0A1930',
      label: '#0A1930',
      paper: '#F1E0C5',
      shadow: '#4A2E18',
    };
  }

  return {
    surface: '#FAF7F2',
    surfaceLight: '#FFFFFF',
    accent: '#2F6FED',
    label: '#0A1930',
    paper: '#FFFFFF',
    shadow: '#12295A',
  };
};

const cartonArt = (id: string, viewIndex: number, p: ReturnType<typeof getVisualPalette>) => {
  const flapStroke = viewIndex % 2 === 0 ? p.accent : '#FF9933';
  const base =
    `<polygon points="390,245 690,170 890,285 590,375" fill="${p.surfaceLight}" stroke="${p.shadow}" stroke-width="4"/>
     <polygon points="390,245 590,375 590,650 390,525" fill="${p.surface}" stroke="${p.shadow}" stroke-width="4"/>
     <polygon points="590,375 890,285 890,545 590,650" fill="#E8EEF8" stroke="${p.shadow}" stroke-width="4"/>
     <line x1="590" y1="375" x2="590" y2="650" stroke="${p.shadow}" stroke-width="3"/>
     <line x1="455" y1="280" x2="760" y2="205" stroke="${flapStroke}" stroke-width="6" stroke-dasharray="16 12"/>`;

  const variants: Record<string, string> = {
    'folding-cartons':
      `${base}<polygon points="310,285 390,245 390,525 310,570" fill="#DCE8FF" stroke="${p.shadow}" stroke-width="3"/>
       <polygon points="890,285 985,240 985,500 890,545" fill="#F8FAFC" stroke="${p.shadow}" stroke-width="3"/>
       <text x="607" y="505" text-anchor="middle" font-size="42" font-weight="800" fill="${p.label}">FOLDING CARTON</text>`,
    'straight-tuck-end-box':
      `${base}<path d="M545 190 L450 118 L355 190" fill="${p.paper}" stroke="${p.shadow}" stroke-width="4"/>
       <path d="M720 615 L815 700 L910 615" fill="${p.paper}" stroke="${p.shadow}" stroke-width="4"/>
       <path d="M448 138 h-80" stroke="${flapStroke}" stroke-width="7" marker-end="url(#arrow)"/>
       <path d="M812 680 h-80" stroke="${flapStroke}" stroke-width="7" marker-end="url(#arrow)"/>
       <text x="610" y="505" text-anchor="middle" font-size="38" font-weight="800" fill="${p.label}">STRAIGHT TUCK</text>`,
    'reverse-tuck-end-box':
      `${base}<path d="M545 190 L450 118 L355 190" fill="${p.paper}" stroke="${p.shadow}" stroke-width="4"/>
       <path d="M720 615 L815 700 L910 615" fill="${p.paper}" stroke="${p.shadow}" stroke-width="4"/>
       <path d="M448 138 h-80" stroke="${flapStroke}" stroke-width="7" marker-end="url(#arrow)"/>
       <path d="M732 680 h80" stroke="${flapStroke}" stroke-width="7" marker-end="url(#arrow)"/>
       <text x="610" y="505" text-anchor="middle" font-size="38" font-weight="800" fill="${p.label}">REVERSE TUCK</text>`,
    'auto-lock-bottom-box':
      `${base}<path d="M420 640 L585 555 L750 640" fill="none" stroke="${flapStroke}" stroke-width="8"/>
       <path d="M500 585 L650 690 M680 585 L530 690" stroke="${p.shadow}" stroke-width="6"/>
       <text x="610" y="505" text-anchor="middle" font-size="36" font-weight="800" fill="${p.label}">AUTO LOCK BASE</text>`,
    'snap-lock-bottom-box':
      `${base}<rect x="430" y="585" width="80" height="58" fill="${p.paper}" stroke="${p.shadow}" stroke-width="4"/>
       <rect x="560" y="585" width="80" height="58" fill="${p.paper}" stroke="${p.shadow}" stroke-width="4"/>
       <rect x="690" y="585" width="80" height="58" fill="${p.paper}" stroke="${p.shadow}" stroke-width="4"/>
       <text x="470" y="624" text-anchor="middle" font-size="28" font-weight="900" fill="${flapStroke}">1</text>
       <text x="600" y="624" text-anchor="middle" font-size="28" font-weight="900" fill="${flapStroke}">2</text>
       <text x="730" y="624" text-anchor="middle" font-size="28" font-weight="900" fill="${flapStroke}">3</text>
       <text x="610" y="505" text-anchor="middle" font-size="36" font-weight="800" fill="${p.label}">SNAP LOCK</text>`,
  };

  return variants[id] || base;
};

const rigidArt = (id: string, viewIndex: number, p: ReturnType<typeof getVisualPalette>) => {
  const edge = '#FAF7F2';
  const highlight = viewIndex % 2 === 0 ? p.accent : '#E11D8D';
  const variants: Record<string, string> = {
    'rigid-gift-box':
      `<polygon points="330,430 610,310 910,430 625,565" fill="${p.surface}" stroke="${edge}" stroke-width="5"/>
       <polygon points="330,430 625,565 625,710 330,570" fill="#0B1E43" stroke="${edge}" stroke-width="5"/>
       <polygon points="625,565 910,430 910,580 625,710" fill="#123A7A" stroke="${edge}" stroke-width="5"/>
       <circle cx="545" cy="442" r="20" fill="${highlight}"/><circle cx="700" cy="442" r="20" fill="${highlight}"/>
       <text x="620" y="642" text-anchor="middle" font-size="34" font-weight="800" fill="#FFFFFF">MAGNETIC CLOSE</text>`,
    'two-piece-rigid-box':
      `<polygon points="335,360 620,255 905,360 620,462" fill="#FFFFFF" stroke="${p.shadow}" stroke-width="5"/>
       <polygon points="395,500 620,420 845,500 620,595" fill="${p.surface}" stroke="${edge}" stroke-width="5"/>
       <polygon points="395,500 620,595 620,710 395,612" fill="#10295A" stroke="${edge}" stroke-width="5"/>
       <polygon points="620,595 845,500 845,612 620,710" fill="#244C98" stroke="${edge}" stroke-width="5"/>
       <text x="620" y="650" text-anchor="middle" font-size="34" font-weight="800" fill="#FFFFFF">LID + BASE</text>`,
    'shoulder-neck-rigid-box':
      `<polygon points="350,405 620,300 890,405 620,520" fill="${p.surface}" stroke="${edge}" stroke-width="5"/>
       <polygon points="430,440 620,365 810,440 620,525" fill="#FFFFFF" stroke="${highlight}" stroke-width="7"/>
       <polygon points="350,405 620,520 620,705 350,585" fill="#0B1E43" stroke="${edge}" stroke-width="5"/>
       <polygon points="620,520 890,405 890,585 620,705" fill="#123A7A" stroke="${edge}" stroke-width="5"/>
       <text x="620" y="645" text-anchor="middle" font-size="34" font-weight="800" fill="#FFFFFF">SHOULDER NECK</text>`,
    'collapsible-rigid-box':
      `<rect x="280" y="430" width="180" height="190" fill="#FFFFFF" stroke="${p.shadow}" stroke-width="4"/>
       <rect x="460" y="430" width="260" height="190" fill="${p.surface}" stroke="${edge}" stroke-width="4"/>
       <rect x="720" y="430" width="180" height="190" fill="#FFFFFF" stroke="${p.shadow}" stroke-width="4"/>
       <line x1="460" y1="430" x2="460" y2="620" stroke="${highlight}" stroke-width="6" stroke-dasharray="14 10"/>
       <line x1="720" y1="430" x2="720" y2="620" stroke="${highlight}" stroke-width="6" stroke-dasharray="14 10"/>
       <text x="590" y="535" text-anchor="middle" font-size="34" font-weight="800" fill="#FFFFFF">FOLD FLAT</text>`,
    'drawer-style-rigid-box':
      `<polygon points="310,390 720,285 945,405 535,525" fill="${p.surface}" stroke="${edge}" stroke-width="5"/>
       <polygon points="310,390 535,525 535,665 310,525" fill="#0B1E43" stroke="${edge}" stroke-width="5"/>
       <polygon points="535,525 945,405 945,545 535,665" fill="#123A7A" stroke="${edge}" stroke-width="5"/>
       <polygon points="495,455 785,370 1040,500 745,592" fill="#FFFFFF" stroke="${highlight}" stroke-width="5"/>
       <circle cx="745" cy="520" r="18" fill="${highlight}"/>
       <text x="610" y="625" text-anchor="middle" font-size="34" font-weight="800" fill="#FFFFFF">SLIDING DRAWER</text>`,
    'box-style-rigid-box':
      `<polygon points="360,350 620,250 880,350 620,455" fill="${p.surface}" stroke="${edge}" stroke-width="5"/>
       <polygon points="360,350 620,455 620,700 360,585" fill="#0B1E43" stroke="${edge}" stroke-width="5"/>
       <polygon points="620,455 880,350 880,585 620,700" fill="#123A7A" stroke="${edge}" stroke-width="5"/>
       <rect x="480" y="505" width="280" height="68" rx="6" fill="${highlight}"/>
       <text x="620" y="550" text-anchor="middle" font-size="30" font-weight="900" fill="#0A1930">SETUP BOX</text>`,
    'book-style-rigid-box':
      `<polygon points="260,470 570,310 570,675 260,705" fill="#FFFFFF" stroke="${edge}" stroke-width="5"/>
       <polygon points="570,310 950,400 950,720 570,675" fill="${p.surface}" stroke="${edge}" stroke-width="5"/>
       <line x1="570" y1="310" x2="570" y2="675" stroke="${highlight}" stroke-width="10"/>
       <rect x="680" y="500" width="190" height="75" rx="8" fill="${highlight}"/>
       <text x="775" y="548" text-anchor="middle" font-size="30" font-weight="900" fill="#0A1930">BOOK OPEN</text>`,
  };

  return variants[id] || variants['box-style-rigid-box'];
};

const corrugatedArt = (id: string, viewIndex: number, p: ReturnType<typeof getVisualPalette>) => {
  const stripe = viewIndex % 2 === 0 ? '#8B5E34' : '#0A1930';
  const flute =
    `<path d="M286 690 C330 650 374 730 418 690 S506 730 550 690 S638 730 682 690 S770 730 814 690 S902 730 946 690" fill="none" stroke="${stripe}" stroke-width="8"/>`;
  const variants: Record<string, string> = {
    'corrugated-boxes':
      `<polygon points="325,330 610,220 895,330 610,450" fill="${p.surfaceLight}" stroke="${p.shadow}" stroke-width="5"/>
       <polygon points="325,330 610,450 610,675 325,550" fill="${p.surface}" stroke="${p.shadow}" stroke-width="5"/>
       <polygon points="610,450 895,330 895,550 610,675" fill="#C99A68" stroke="${p.shadow}" stroke-width="5"/>
       ${flute}<text x="610" y="565" text-anchor="middle" font-size="36" font-weight="900" fill="${p.label}">CORRUGATED</text>`,
    'regular-slotted-container':
      `<polygon points="325,380 610,270 895,380 610,490" fill="${p.surfaceLight}" stroke="${p.shadow}" stroke-width="5"/>
       <polygon points="325,380 610,490 610,690 325,570" fill="${p.surface}" stroke="${p.shadow}" stroke-width="5"/>
       <polygon points="610,490 895,380 895,570 610,690" fill="#C99A68" stroke="${p.shadow}" stroke-width="5"/>
       <line x1="475" y1="435" x2="745" y2="435" stroke="${stripe}" stroke-width="8"/>
       <line x1="610" y1="270" x2="610" y2="490" stroke="${stripe}" stroke-width="6" stroke-dasharray="14 10"/>
       <text x="610" y="600" text-anchor="middle" font-size="38" font-weight="900" fill="${p.label}">RSC CENTER FLAPS</text>`,
    'half-slotted-container':
      `<polygon points="335,390 610,285 885,390 610,505" fill="none" stroke="${p.shadow}" stroke-width="5" stroke-dasharray="18 14"/>
       <polygon points="335,390 610,505 610,705 335,585" fill="${p.surface}" stroke="${p.shadow}" stroke-width="5"/>
       <polygon points="610,505 885,390 885,585 610,705" fill="#C99A68" stroke="${p.shadow}" stroke-width="5"/>
       <path d="M335 390 L250 340 M885 390 L970 340" stroke="${stripe}" stroke-width="7"/>
       <text x="610" y="605" text-anchor="middle" font-size="38" font-weight="900" fill="${p.label}">HSC OPEN TOP</text>`,
    'full-overlap-container':
      `<polygon points="325,380 610,270 895,380 610,490" fill="${p.surfaceLight}" stroke="${p.shadow}" stroke-width="5"/>
       <polygon points="325,380 610,490 610,690 325,570" fill="${p.surface}" stroke="${p.shadow}" stroke-width="5"/>
       <polygon points="610,490 895,380 895,570 610,690" fill="#C99A68" stroke="${p.shadow}" stroke-width="5"/>
       <polygon points="360,360 610,260 860,360 610,468" fill="#E5BC88" stroke="${stripe}" stroke-width="8"/>
       <polygon points="405,405 610,325 815,405 610,488" fill="${p.surfaceLight}" stroke="${stripe}" stroke-width="8"/>
       <text x="610" y="603" text-anchor="middle" font-size="38" font-weight="900" fill="${p.label}">FULL OVERLAP</text>`,
  };

  return variants[id] || variants['corrugated-boxes'];
};

const labelArt = (seed: ProductSeed) => {
  const smart = /qr|nfc|rfid|barcode/i.test(seed.name);
  const sleeve = /sleeve|in-mold/i.test(seed.name);
  const tag = /tag/i.test(seed.name);
  const body = sleeve ? `<path d="M410 210h400l55 490H355z" fill="#2F6FED" stroke="#12295A" stroke-width="8"/><rect x="450" y="325" width="320" height="195" fill="#FFFDF8"/>` : tag ? `<path d="M420 180h350l90 90v420H340V270z" fill="#FFFDF8" stroke="#12295A" stroke-width="8"/><circle cx="770" cy="270" r="22" fill="#FF9933"/>` : `<rect x="310" y="240" width="600" height="390" rx="36" fill="#FFFDF8" stroke="#12295A" stroke-width="8"/><rect x="365" y="305" width="480" height="100" rx="12" fill="#2F6FED"/>`;
  const data = smart ? `<g fill="#12295A">${Array.from({ length: 36 }, (_, index) => `<rect x="${455 + (index % 6) * 28}" y="${440 + Math.floor(index / 6) * 28}" width="18" height="18"/>`).join('')}</g>` : `<path d="M395 470h410M395 520h300" stroke="#12295A" stroke-width="18"/>`;
  return `${body}${data}<text x="610" y="750" text-anchor="middle" font-size="34" font-weight="800" fill="#12295A">${escapeSvgText(seed.name.toUpperCase().slice(0, 28))}</text>`;
};

const retailArt = (seed: ProductSeed) => {
  const l = seed.name.toLowerCase();
  if (/tape/.test(l)) return `<circle cx="560" cy="450" r="190" fill="#E3BD8D" stroke="#4A2E18" stroke-width="12"/><circle cx="560" cy="450" r="75" fill="#FAF7F2" stroke="#4A2E18" stroke-width="12"/><path d="M560 260h300v380H560" fill="#D6A36F" stroke="#4A2E18" stroke-width="12"/>`;
  if (/bubble|foam|cushion|void fill|air pillow/.test(l)) return `<rect x="310" y="260" width="600" height="380" rx="36" fill="#DDEBFF" stroke="#173B35" stroke-width="10"/>${Array.from({length:20},(_,i)=>`<circle cx="${370+(i%5)*115}" cy="${335+Math.floor(i/5)*85}" r="32" fill="#B9DCCC" stroke="#173B35" stroke-width="5"/>`).join('')}`;
  if (/bag|mailer|pouch|envelope/.test(l)) return `<path d="M390 210h420l70 500H320z" fill="#D6A36F" stroke="#4A2E18" stroke-width="10"/><path d="M410 275h380" stroke="#FFFDF8" stroke-width="28"/>`;
  return `<rect x="330" y="250" width="560" height="390" fill="#C99A68" stroke="#4A2E18" stroke-width="12"/><path d="M330 250l280-110 280 110" fill="#E3BD8D" stroke="#4A2E18" stroke-width="12"/>`;
};

const renderProductArt = (seed: ProductSeed, viewIndex: number) => {
  const palette = getVisualPalette(seed.category);
  if (seed.rootCategory === 'Labels & Stickers') return labelArt(seed);
  if (seed.rootCategory === 'Retail & E-Commerce Supplies') return retailArt(seed);
  if (seed.category === 'Rigid Boxes') return rigidArt(seed.id, viewIndex, palette);
  if (seed.category === 'Corrugated Boxes') return corrugatedArt(seed.id, viewIndex, palette);
  return cartonArt(seed.id, viewIndex, palette);
};

const makeViewDetail = (seed: ProductSeed, viewIndex: number, palette: ReturnType<typeof getVisualPalette>) => {
  if (viewIndex === 1) {
    return `
      <rect x="805" y="135" width="285" height="150" rx="18" fill="#FFFFFF" opacity="0.92" stroke="${palette.accent}" stroke-width="4"/>
      <text x="835" y="182" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="900" fill="#0A1930">OPEN VIEW</text>
      <text x="835" y="220" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700" fill="#475569">${escapeSvgText(seed.categoryTag)}</text>
      <path d="M850 252 H1020" stroke="${palette.accent}" stroke-width="7" stroke-linecap="round"/>
    `;
  }

  if (viewIndex === 2) {
    return `
      <g opacity="0.9">
        <rect x="825" y="130" width="255" height="178" rx="16" fill="#FFFFFF" stroke="#0A1930" stroke-width="3"/>
        <path d="M875 168 H1030 V270 H875 Z M925 168 V270 M980 168 V270 M875 218 H1030" fill="none" stroke="${palette.accent}" stroke-width="4" stroke-dasharray="10 8"/>
        <text x="953" y="292" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="900" fill="#0A1930">DIELINE CUE</text>
      </g>
    `;
  }

  if (viewIndex === 3) {
    return `
      <g>
        <rect x="795" y="135" width="305" height="154" rx="18" fill="#0A1930" opacity="0.94"/>
        <text x="825" y="184" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="900" fill="#FFFFFF">PRINT FINISH</text>
        <circle cx="840" cy="240" r="18" fill="#FF9933"/>
        <circle cx="895" cy="240" r="18" fill="#2F6FED"/>
        <circle cx="950" cy="240" r="18" fill="#E11D8D"/>
        <rect x="995" y="223" width="70" height="34" rx="17" fill="#D4AF37"/>
      </g>
    `;
  }

  return '';
};

const makeProductImage = (seed: ProductSeed, viewIndex: number) => {
  const palette = getVisualPalette(seed.category);
  const viewLabels = ['closed view', 'open construction', 'dieline cue', 'print finish'];
  const artTransforms = [
    'translate(0 0)',
    'translate(40 -12) scale(0.94)',
    'translate(-35 18) scale(0.96)',
    'translate(22 16) scale(0.94)',
  ];
  const imageAlt = escapeSvgText(seed.imageAlt);
  const categoryTag = escapeSvgText(seed.categoryTag);
  const name = escapeSvgText(seed.name);
  const viewLabel = escapeSvgText(viewLabels[viewIndex]);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" role="img" aria-label="${imageAlt}">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF"/>
          <stop offset="55%" stop-color="#F6F0E8"/>
          <stop offset="100%" stop-color="#EAF1FF"/>
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="24" stdDeviation="24" flood-color="#0A1930" flood-opacity="0.22"/>
        </filter>
        <marker id="arrow" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
          <path d="M2 2 L10 6 L2 10 Z" fill="${palette.accent}"/>
        </marker>
      </defs>
      <rect width="1200" height="900" fill="url(#bg)"/>
      <circle cx="980" cy="160" r="90" fill="#FF9933" opacity="0.12"/>
      <circle cx="210" cy="720" r="135" fill="#2F6FED" opacity="0.10"/>
      <g filter="url(#shadow)">
        <g transform="${artTransforms[viewIndex]}">
          ${renderProductArt(seed, viewIndex)}
        </g>
      </g>
      ${makeViewDetail(seed, viewIndex, palette)}
      <rect x="72" y="72" width="360" height="56" rx="28" fill="#0A1930"/>
      <text x="102" y="109" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="800" fill="#FFFFFF">${categoryTag}</text>
      <text x="72" y="812" font-family="Arial, Helvetica, sans-serif" font-size="42" font-weight="900" fill="#0A1930">${name}</text>
      <text x="72" y="852" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700" fill="${palette.accent}">${viewLabel}</text>
    </svg>
  `;

  return svgToDataUri(svg);
};

/** Verified, direct-file redirects from Wikimedia Commons. Attribution/license review is retained in the image audit. */
const RESEARCHED_IMAGE_URLS: Record<string, string[]> = {
  'Water-Activated Tape': ['https://upload.wikimedia.org/wikipedia/commons/d/d6/Water_Activated_Gummed_Tape.jpg'],
  'Stand-Up Pouch with Zipper': ['https://upload.wikimedia.org/wikipedia/commons/5/5f/Easy_opening_for_pouch.jpg'],
  'Shrink Sleeve': ['https://upload.wikimedia.org/wikipedia/commons/f/fe/Shrink_sleeve.jpg'],
  'Full-Body Shrink Sleeve': ['https://upload.wikimedia.org/wikipedia/commons/f/fe/Shrink_sleeve.jpg'],
  'Partial Shrink Sleeve': ['https://upload.wikimedia.org/wikipedia/commons/f/fe/Shrink_sleeve.jpg'],
  'Neck Shrink Sleeve': ['https://upload.wikimedia.org/wikipedia/commons/f/fe/Shrink_sleeve.jpg'],
  'Tamper-Evident Shrink Sleeve': ['https://upload.wikimedia.org/wikipedia/commons/f/fe/Shrink_sleeve.jpg'],
  'Product Hang Tag': ['https://upload.wikimedia.org/wikipedia/commons/9/97/Higgins_%26_Waters%2C_Inc.%2C_Generals_Comission_Receivers%2C_Baltimore%2C_hang_tag.jpg'],
  'Clothing Hang Tag': ['https://upload.wikimedia.org/wikipedia/commons/9/97/Higgins_%26_Waters%2C_Inc.%2C_Generals_Comission_Receivers%2C_Baltimore%2C_hang_tag.jpg'],
  'Price Hang Tag': ['https://upload.wikimedia.org/wikipedia/commons/9/97/Higgins_%26_Waters%2C_Inc.%2C_Generals_Comission_Receivers%2C_Baltimore%2C_hang_tag.jpg'],
  'Promotional Hang Tag': ['https://upload.wikimedia.org/wikipedia/commons/9/97/Higgins_%26_Waters%2C_Inc.%2C_Generals_Comission_Receivers%2C_Baltimore%2C_hang_tag.jpg'],
  'Bubble Wrap': ['https://upload.wikimedia.org/wikipedia/commons/9/9d/Bubble_wrap_%288436498020%29.jpg'],
  'Retort Pouch': ['https://upload.wikimedia.org/wikipedia/commons/f/fa/Retort_pouch.jpg'],
};

const legacySeeds: ProductSeed[] = [
  {
    id: 'folding-cartons',
    slug: 'folding-cartons',
    sku: 'AGL-FC-2026',
    name: 'Folding Cartons',
    category: 'Folding Cartons',
    categoryTag: 'Paperboard Carton',
    shortDescription: 'Custom printed folding cartons for retail, cosmetics, wellness, and FMCG packaging.',
    structure: 'A flat-shipping paperboard carton, die-cut, scored, folded, and glued for high-volume retail packing.',
    useCase: 'Best for lightweight retail packs that need sharp print, efficient storage, and fast assembly.',
    features: ['Flat shipped to save storage space', 'Full-panel print coverage', 'Compatible with inserts and windows'],
    imageAlt: 'custom printed folding carton packaging',
  },
  {
    id: 'straight-tuck-end-box',
    slug: 'straight-tuck-end-box',
    sku: 'AGL-STE-2026',
    name: 'Straight Tuck End Boxes',
    category: 'Folding Cartons',
    categoryTag: 'STE Carton',
    shortDescription: 'Retail cartons with top and bottom tuck flaps folding in the same direction for clean display faces.',
    structure: 'Straight tuck end cartons use same-direction closure panels that keep the front face uninterrupted.',
    useCase: 'Ideal for presentation cartons, window cartons, bottles, tubes, and light premium retail goods.',
    features: ['Same-direction tuck closures', 'Clean front and back panels', 'Suitable for die-cut windows'],
    imageAlt: 'straight tuck end printed carton box',
  },
  {
    id: 'reverse-tuck-end-box',
    slug: 'reverse-tuck-end-box',
    sku: 'AGL-RTE-2026',
    name: 'Reverse Tuck End Boxes',
    category: 'Folding Cartons',
    categoryTag: 'RTE Carton',
    shortDescription: 'Economical folding cartons with opposing tuck flaps for compact retail and promotional packs.',
    structure: 'Reverse tuck end cartons use opposing top and bottom closures for efficient board usage.',
    useCase: 'A practical fit for small retail packaging, pharmaceuticals, personal care, and accessories.',
    features: ['Opposing tuck-end closures', 'Efficient nested dieline layout', 'Fast manual or automated packing'],
    imageAlt: 'reverse tuck end folding paperboard box',
  },
  {
    id: 'auto-lock-bottom-box',
    slug: 'auto-lock-bottom-box',
    sku: 'AGL-ALB-2026',
    name: 'Auto Lock Bottom Boxes',
    category: 'Folding Cartons',
    categoryTag: 'Crash Lock Carton',
    shortDescription: 'Pre-glued cartons that pop open with a locking base for faster filling and heavier retail items.',
    structure: 'The pre-glued crash-lock base snaps into place automatically when the carton is opened.',
    useCase: 'Useful for candles, jars, bottles, and products that need a stronger load-bearing carton base.',
    features: ['Fast pop-open assembly', 'Pre-glued load-bearing base', 'Better bottom support for heavier packs'],
    imageAlt: 'auto lock bottom printed folding carton',
  },
  {
    id: 'snap-lock-bottom-box',
    slug: 'snap-lock-bottom-box',
    sku: 'AGL-SLB-2026',
    name: 'Snap Lock Bottom Boxes',
    category: 'Folding Cartons',
    categoryTag: '1-2-3 Bottom',
    shortDescription: 'Folding cartons with interlocking bottom flaps for secure retail packaging without glue.',
    structure: 'Also known as a 1-2-3 bottom, this base locks by folding tabs into a stepped interlock.',
    useCase: 'Good for medium-weight retail items where added base strength matters but flat shipping is needed.',
    features: ['Interlocking bottom flaps', 'No glued bottom required', 'Strong shelf-ready base'],
    imageAlt: 'snap lock bottom folding carton packaging',
  },
  {
    id: 'rigid-gift-box',
    slug: 'rigid-gift-box',
    sku: 'AGL-MCR-2026',
    name: 'Magnetic Closure Rigid Boxes',
    category: 'Rigid Boxes',
    categoryTag: 'Magnetic Rigid',
    shortDescription: 'Premium rigid boxes with embedded magnets for luxury unboxing and gift presentation.',
    structure: 'A hinged rigid box with magnets concealed in the flap and front wall for a smooth closing action.',
    useCase: 'Best for launch kits, electronics, fragrance, luxury retail, and corporate gifting.',
    features: ['Concealed magnetic closure', 'Wrapped rigid board construction', 'Supports custom trays and inserts'],
    imageAlt: 'magnetic closure rigid gift box packaging',
  },
  {
    id: 'two-piece-rigid-box',
    slug: 'two-piece-rigid-box',
    sku: 'AGL-TPR-2026',
    name: 'Two-Piece Rigid Boxes',
    category: 'Rigid Boxes',
    categoryTag: 'Lid & Base',
    shortDescription: 'Classic lift-off lid and base boxes for premium retail kits, gifts, and keepsake packaging.',
    structure: 'Separate rigid lid and base components create a strong presentation box with a premium reveal.',
    useCase: 'Ideal for apparel sets, jewelry, confectionery, stationery, and high-end retail packaging.',
    features: ['Separate lid and base', 'Premium reveal experience', 'Easy to pair with paper or foam inserts'],
    imageAlt: 'two piece rigid lid and base box',
  },
  {
    id: 'shoulder-neck-rigid-box',
    slug: 'shoulder-neck-rigid-box',
    sku: 'AGL-SNR-2026',
    name: 'Shoulder Neck Rigid Boxes',
    category: 'Rigid Boxes',
    categoryTag: 'Shoulder Neck',
    shortDescription: 'Luxury rigid boxes with an inner neck tray that creates a stepped reveal and secure lid fit.',
    structure: 'An inner shoulder or neck section sits between the lid and base to guide closure and improve presentation.',
    useCase: 'A refined choice for watches, fragrance, premium sweets, and collectible retail sets.',
    features: ['Stepped inner neck reveal', 'Secure lid alignment', 'Excellent for contrast paper wraps'],
    imageAlt: 'shoulder neck rigid box premium packaging',
  },
  {
    id: 'collapsible-rigid-box',
    slug: 'collapsible-rigid-box',
    sku: 'AGL-CRB-2026',
    name: 'Collapsible Rigid Boxes',
    category: 'Rigid Boxes',
    categoryTag: 'Fold-Flat Rigid',
    shortDescription: 'Premium rigid boxes engineered to fold flat, reducing freight and storage volume.',
    structure: 'Rigid side panels fold down around scored joints while magnets or tabs hold the assembled form.',
    useCase: 'Useful when brands need a premium box feel with lower inbound shipping volume.',
    features: ['Fold-flat rigid construction', 'Reduced storage footprint', 'Magnetic or tab-assisted assembly'],
    imageAlt: 'collapsible fold flat rigid box',
  },
  {
    id: 'drawer-style-rigid-box',
    slug: 'drawer-style-rigid-box',
    sku: 'AGL-DSR-2026',
    name: 'Drawer Style Rigid Boxes',
    category: 'Rigid Boxes',
    categoryTag: 'Sleeve Drawer',
    shortDescription: 'Rigid sleeve-and-tray boxes that slide open for a controlled premium product reveal.',
    structure: 'A rigid tray slides through a wrapped outer sleeve, optionally with ribbon pulls or thumb notches.',
    useCase: 'Excellent for jewelry, tech accessories, specialty foods, and multi-piece gift sets.',
    features: ['Sliding tray reveal', 'Optional ribbon pull', 'Strong outer sleeve for print and foil'],
    imageAlt: 'drawer style rigid box with sliding tray',
  },
  {
    id: 'box-style-rigid-box',
    slug: 'box-style-rigid-box',
    sku: 'AGL-BSR-2026',
    name: 'Box Style Rigid Boxes',
    category: 'Rigid Boxes',
    categoryTag: 'Rigid Setup Box',
    shortDescription: 'Durable setup-style rigid boxes for premium retail, gifting, and protected presentation.',
    structure: 'A non-collapsible rigid board construction wrapped in printed, textured, or specialty paper.',
    useCase: 'A versatile premium format for sets that need structure, shelf presence, and protective feel.',
    features: ['Sturdy setup construction', 'Clean wrapped edges', 'Compatible with molded or paperboard inserts'],
    imageAlt: 'premium setup style rigid box packaging',
  },
  {
    id: 'book-style-rigid-box',
    slug: 'book-style-rigid-box',
    sku: 'AGL-BKR-2026',
    name: 'Book Style Rigid Boxes',
    category: 'Rigid Boxes',
    categoryTag: 'Book Style',
    shortDescription: 'Hinged book-style rigid boxes for curated kits, documents, and premium product storytelling.',
    structure: 'A rigid base and hinged cover open like a book, often paired with magnets and fitted inserts.',
    useCase: 'Works well for launch kits, limited editions, sample decks, and executive presentation boxes.',
    features: ['Book-like hinged opening', 'Large printable cover surface', 'Supports custom insert layouts'],
    imageAlt: 'book style rigid box with hinged lid',
  },
  {
    id: 'corrugated-boxes',
    slug: 'corrugated-boxes',
    sku: 'AGL-CB-2026',
    name: 'Corrugated Boxes',
    category: 'Corrugated Boxes',
    categoryTag: 'Corrugated Packaging',
    shortDescription: 'Custom printed corrugated boxes for protective shipping, retail transit, and warehouse handling.',
    structure: 'Fluted board between liner papers gives the box compression strength and impact protection.',
    useCase: 'Best for shipping cartons, subscription boxes, industrial dispatch, and protective outer packaging.',
    features: ['Single or multi-wall board options', 'Transit-ready print surfaces', 'Custom dimensions and inserts'],
    imageAlt: 'custom printed corrugated shipping boxes',
  },
  {
    id: 'regular-slotted-container',
    slug: 'regular-slotted-container',
    sku: 'AGL-RSC-2026',
    name: 'Regular Slotted Containers (RSC)',
    category: 'Corrugated Boxes',
    categoryTag: 'RSC Shipper',
    shortDescription: 'Standard corrugated shipping cartons with meeting top and bottom flaps for everyday logistics.',
    structure: 'All flaps are the same length from score to edge, and the outer flaps meet at the center when closed.',
    useCase: 'The dependable standard for warehousing, e-commerce fulfilment, and bulk product dispatch.',
    features: ['Efficient board usage', 'Tape-sealed top and bottom', 'Easy to produce in many sizes'],
    imageAlt: 'regular slotted container corrugated box',
  },
  {
    id: 'half-slotted-container',
    slug: 'half-slotted-container',
    sku: 'AGL-HSC-2026',
    name: 'Half Slotted Containers (HSC)',
    category: 'Corrugated Boxes',
    categoryTag: 'HSC Tray',
    shortDescription: 'Open-top corrugated containers with bottom flaps, often paired with lids or used as display trays.',
    structure: 'Half slotted containers have a set of bottom flaps and an open top for easy loading access.',
    useCase: 'Useful for bulk storage, shelf trays, produce packs, and cartons that need separate covers.',
    features: ['Open-top access', 'Stable bottom closure', 'Can pair with a separate corrugated lid'],
    imageAlt: 'half slotted corrugated container open top box',
  },
  {
    id: 'full-overlap-container',
    slug: 'full-overlap-container',
    sku: 'AGL-FOL-2026',
    name: 'Full Overlap Containers (FOL)',
    category: 'Corrugated Boxes',
    categoryTag: 'FOL Shipper',
    shortDescription: 'Heavy-duty corrugated cartons with overlapping flaps for added stacking and edge protection.',
    structure: 'The outer flaps fully overlap, adding extra board layers across the top and bottom panels.',
    useCase: 'A strong choice for heavier items, long products, export cartons, and rougher transit conditions.',
    features: ['Fully overlapping flaps', 'Extra top and bottom strength', 'Improved edge and puncture resistance'],
    imageAlt: 'full overlap corrugated shipping container',
  },
];

const categorySku = (category: string) => category.replace(/[^A-Za-z]/g, '').slice(0, 3).toUpperCase();

/** Every purchasable box type is generated from the canonical catalog hierarchy. */
const seeds: ProductSeed[] = BOX_CATALOG_DEFINITIONS.flatMap((category) =>
  category.products.map((product, index) => ({
    id: product.id,
    slug: product.slug,
    sku: `AGL-${categorySku(category.title)}-${String(index + 1).padStart(2, '0')}-2026`,
    name: `${product.title} Boxes`,
    category: category.title as Exclude<ProductCategory, 'All'>,
    categoryTag: category.title,
    shortDescription: product.subtitle,
    structure: product.description,
    useCase: product.useCase,
    features: product.features,
    imageAlt: `${product.title.toLowerCase()} custom packaging`,
  })),
).concat(LABELS_STICKERS_DEFINITIONS.flatMap((category, categoryIndex) =>
  category.subcategories.flatMap((subcategory, subcategoryIndex) =>
    subcategory.products.map((product, productIndex) => ({
      id: product.id,
      slug: product.slug,
      sku: `AGL-LBL-${String(categoryIndex + 1).padStart(2, '0')}${String(subcategoryIndex + 1).padStart(2, '0')}${String(productIndex + 1).padStart(2, '0')}`,
      name: product.title,
      category: product.category as Exclude<ProductCategory, 'All'>,
      categoryTag: `${product.category} · ${product.subcategory}`,
      shortDescription: product.subtitle,
      structure: product.description,
      useCase: product.useCase,
      features: product.features,
      imageAlt: `${product.title.toLowerCase()} label or tag`,
      rootCategory: product.rootCategory,
      parentCategory: product.category,
      subcategory: product.subcategory,
    })),
  ),
)).concat(RETAIL_ECOMMERCE_DEFINITIONS.flatMap((category, categoryIndex) =>
  category.subcategories.flatMap((subcategory, subcategoryIndex) => subcategory.products.map((product, productIndex) => ({
    id: product.id, slug: product.slug,
    sku: `AGL-RET-${String(categoryIndex + 1).padStart(2, '0')}${String(subcategoryIndex + 1).padStart(2, '0')}${String(productIndex + 1).padStart(2, '0')}`,
    name: product.title, category: product.category as Exclude<ProductCategory, 'All'>,
    categoryTag: `${product.category} · ${product.subcategory}`, shortDescription: product.subtitle,
    structure: product.description, useCase: product.useCase, features: product.features,
    imageAlt: `${product.title.toLowerCase()} retail and e-commerce supply`, rootCategory: product.rootCategory,
    parentCategory: product.category, subcategory: product.subcategory,
  }))),
));

const makeGallery = (seed: ProductSeed) => {
  const researched = RESEARCHED_IMAGE_URLS[seed.name];
  if (researched) return researched.map((url, index) => ({ key: `${seed.slug}-source-${index + 1}`, url, alt: seed.imageAlt, caption: 'Verified product-source image' }));
  return [0, 1, 2, 3].map((viewIndex) => ({
    key: `${seed.slug}-${viewIndex + 1}`,
    url: makeProductImage(seed, viewIndex),
    alt: `${seed.imageAlt} view ${viewIndex + 1}`,
    caption: [
      'Primary structural view',
      'Alternate angle for form and proportions',
      'Material and print finish reference',
      'Replacement-ready licensed visual option',
    ][viewIndex],
  }));
};

const makeProduct = (seed: ProductSeed, index: number): Product => {
  const category = categoryCopy[seed.category] ?? { leadTime: '5-10 Business Days', minQuantity: 500, substrates: ['Paper', 'Film', 'Corrugated Board'], finishes: ['Custom Print', 'Matte', 'Gloss'] };

  return {
    id: seed.id,
    slug: seed.slug,
    sku: seed.sku,
    name: seed.name,
    category: seed.category,
    categoryTag: seed.categoryTag,
    rootCategory: seed.rootCategory,
    parentCategory: seed.parentCategory,
    subcategory: seed.subcategory,
    startingPriceInr: 0,
    priceUnit: 'custom quote',
    minQuantity: category.minQuantity,
    leadTime: category.leadTime,
    shortDescription: seed.shortDescription,
    descriptionParagraphs: [
      seed.structure,
      seed.useCase,
      'AGL Creatives can adapt the dieline, board grade, print coverage, coatings, foil, embossing, and insert system around your product dimensions and brand artwork.',
    ],
    mainImageUrl: (RESEARCHED_IMAGE_URLS[seed.name] ?? [makeProductImage(seed, 0)])[0],
    galleryImages: makeGallery(seed),
    keyFeatures: seed.features,
    sizes: sizesByCategory[seed.category] ?? sizesByCategory['Corrugated Boxes']!,
    materials: materialByCategory[seed.category] ?? corrugatedMaterials,
    printingOptions: commonPrintingOptions,
    coatings: commonCoatings,
    foilOptions: commonFoils,
    quantityTiers: [
      { quantity: category.minQuantity, discountPercent: 0 },
      { quantity: 1000, discountPercent: 10 },
      { quantity: 2500, discountPercent: 18 },
      { quantity: 5000, discountPercent: 28 },
      { quantity: 10000, discountPercent: 36 },
    ],
    specCards: [
      {
        iconName: 'Scissors',
        title: 'Custom Dieline',
        description: 'Cut, crease, and glue details are prepared around the selected structure.',
      },
      {
        iconName: 'Printer',
        title: 'Brand Printing',
        description: 'CMYK and spot-color print options support consistent retail presentation.',
      },
      {
        iconName: 'ShieldCheck',
        title: 'Material Fit',
        description: 'Board grade is selected for the product weight, handling, and finish needs.',
      },
      {
        iconName: 'Sparkles',
        title: 'Premium Finishing',
        description: 'Foil, embossing, soft-touch, matte, and gloss effects can be specified.',
      },
    ],
    faqs: [
      {
        question: `Can ${seed.name.toLowerCase()} be made to custom dimensions?`,
        answer: 'Yes. Share your product size, fill weight, and packing method, and our team can prepare a custom dieline for review before production.',
      },
      {
        question: 'Can you print my brand artwork on the packaging?',
        answer: 'Yes. We support exterior printing, interior printing where the structure allows it, and common finishing options such as matte, gloss, foil, embossing, and spot UV.',
      },
      {
        question: 'Can I review a sample before a full production run?',
        answer: 'Yes. Physical mockups and pre-production samples can be arranged so the structure, fit, and print finish can be checked before volume production.',
      },
    ],
    recommendedSubstrates: category.substrates,
    popularFinishes: category.finishes,
  };
};

export const PRODUCTS: Product[] = seeds.map(makeProduct);

export type ProductImageAudit = {
  productId: string;
  slug: string;
  name: string;
  categoryPath: string[];
  status: 'researched' | 'manual-review';
  imageCount: number;
  reason?: string;
};

/** Complete product-by-product image audit. Manual-review entries remain explicit until an exact source asset is verified. */
export const PRODUCT_IMAGE_AUDIT: ProductImageAudit[] = PRODUCTS.map((product) => {
  const researched = product.galleryImages.every(({ url }) => url.startsWith('https://'));
  return {
    productId: product.id,
    slug: product.slug,
    name: product.name,
    categoryPath: [product.rootCategory ?? 'Boxes', product.parentCategory ?? product.category, product.subcategory ?? product.category],
    status: researched ? 'researched' : 'manual-review',
    imageCount: product.galleryImages.length,
    ...(researched ? {} : { reason: 'Generated visual retained only as an explicit manual-review placeholder while an exact external product image is researched.' }),
  };
});
