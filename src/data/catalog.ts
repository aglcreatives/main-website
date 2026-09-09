export type Specification = { label: string; value: string };

export interface CatalogNode {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  children?: CatalogNode[];
  features?: string[];
  benefits?: string[];
  applications?: string[];
  specifications?: Specification[];
}

export interface CatalogMatch { node: CatalogNode; ancestors: CatalogNode[]; }

const images = {
  boxes: '/images/hero/folding-cartons-studio.png',
  folding: '/images/hero/folding-cartons-studio.png',
  rigid: '/images/hero/sustainable-retail-studio.png',
  corrugated: '/images/hero/kraft-mailer-studio.png',
  pouch: '/images/hero/sustainable-retail-studio.png',
  labels: '/images/hero/folding-cartons-studio.png',
  ecommerce: '/images/hero/sustainable-retail-studio.png',
  mailer: '/images/hero/kraft-mailer-studio.png',
};

const leaf = (slug: string, title: string, subtitle: string, image: string, description: string, specifications: Specification[], applications: string[]): CatalogNode => ({
  slug, title, subtitle, image, description, specifications, applications,
  features: ['Custom dimensions and structural design', 'Material, print, and finish options matched to your product', 'Production-ready artwork and dieline support'],
  benefits: ['Built around the protection and presentation your product needs', 'Creates a consistent branded customer experience', 'Specified for efficient packing, storage, and distribution'],
});

const boxSpecs: Specification[] = [
  { label: 'Material', value: 'SBS, FBB, kraft, or recycled paperboard' }, { label: 'Board thickness', value: '250–450 gsm, specified to product weight' },
  { label: 'Printing', value: 'CMYK, Pantone, foil, embossing, or spot UV' }, { label: 'Finish', value: 'Matte, gloss, soft-touch, or aqueous coating' }, { label: 'Size', value: 'Custom internal dimensions' },
];

export const CATALOG_ROOT: CatalogNode[] = [
  {
    slug: 'boxes', title: 'Boxes', subtitle: 'Custom Packaging Boxes', image: images.boxes,
    description: 'From shelf-ready cartons to protective transit shippers, our box structures are engineered around your product, brand, and fulfilment flow.',
    children: [
      { slug: 'folding-cartons', title: 'Folding Cartons', subtitle: 'Printed paperboard cartons', image: images.folding, description: 'Lightweight, high-impact cartons tailored to retail products, with precise closures and premium print treatments.', children: [
        leaf('straight-tuck-end', 'Straight Tuck End Boxes', 'Clean, retail-ready tuck cartons', images.folding, 'Straight tuck end cartons use closures that fold in the same direction for a neat front-facing retail presentation.', boxSpecs, ['Cosmetics and skincare', 'Pharmaceuticals', 'Food and confectionery']),
        leaf('reverse-tuck-end', 'Reverse Tuck End Boxes', 'Efficient opposing tuck closures', images.folding, 'Reverse tuck end boxes offer economical assembly and a reliable closure for lightweight retail products.', boxSpecs, ['Supplements', 'Personal care', 'Consumer goods']),
        leaf('auto-lock-bottom', 'Auto Lock Bottom Boxes', 'Pre-glued, load-bearing base', images.folding, 'Auto-lock bottom cartons arrive pre-glued for rapid packing and a sturdier base beneath heavier products.', boxSpecs, ['Bottles and jars', 'Candles', 'Specialty retail']),
        leaf('snap-lock-bottom', 'Snap Lock Bottom Boxes', 'Secure interlocking carton base', images.folding, 'Snap lock bottom boxes combine flat shipping with a strong manually assembled base.', boxSpecs, ['Food products', 'Household items', 'Retail kits']),
      ]},
      { slug: 'rigid-boxes', title: 'Rigid Boxes', subtitle: 'Premium gift and presentation packaging', image: images.rigid, description: 'A substantial unboxing experience with wrapped board construction, refined detailing, and optional custom inserts.', children: [
        leaf('magnetic-closure', 'Magnetic Closure Rigid Boxes', 'A polished magnetic flap opening', images.rigid, 'Magnetic closure boxes create a considered reveal with concealed magnets and a durable wrapped board shell.', boxSpecs, ['Luxury gifting', 'Beauty and fragrance', 'Corporate presentation']),
        leaf('two-piece-rigid', 'Two-Piece Rigid Boxes', 'Classic lift-off lid and base', images.rigid, 'Two-piece rigid boxes give products a timeless premium presentation with a separate lid and base.', boxSpecs, ['Apparel', 'Jewellery', 'Premium gifting']),
        leaf('drawer-style', 'Drawer Style Rigid Boxes', 'Sliding tray and sleeve structure', images.rigid, 'Drawer boxes pair a pull-out tray with a branded sleeve for a tactile, memorable opening.', boxSpecs, ['Accessories', 'Technology', 'Subscription boxes']),
      ]},
      { slug: 'corrugated-boxes', title: 'Corrugated Boxes', subtitle: 'Protective shipping and e-commerce structures', image: images.corrugated, description: 'Durable corrugated packaging engineered for product protection, storage efficiency, and dependable delivery.', children: [
        leaf('regular-slotted-container', 'Regular Slotted Containers', 'The dependable taped shipping carton', images.corrugated, 'RSC shippers are the versatile standard for transport, with four flaps meeting neatly at the centre.', [{ label: 'Board', value: '3 ply, 5 ply, or 7 ply corrugated' }, { label: 'Flute', value: 'B, C, E, or double-wall combinations' }, { label: 'Load capacity', value: 'Specified to product weight and stacking needs' }, { label: 'Printing', value: 'Flexographic or litho-laminated custom print' }], ['E-commerce orders', 'Warehouse storage', 'B2B shipment']),
        leaf('mailer-boxes', 'Mailer Boxes', 'Self-locking e-commerce packaging', images.corrugated, 'Self-locking mailers protect products in transit while turning delivery into a branded unboxing moment.', [{ label: 'Board', value: 'E-flute or B-flute corrugated' }, { label: 'Closure', value: 'Integrated self-locking tabs' }, { label: 'Printing', value: 'Inside, outside, or full-coverage print' }, { label: 'Size', value: 'Custom die-cut dimensions' }], ['Subscription programs', 'DTC retail', 'Welcome kits']),
        leaf('double-wall-corrugated', 'Double-Wall Corrugated Boxes', 'Extra compression and impact strength', images.corrugated, 'Double-wall corrugated cartons use two corrugated mediums for products requiring added protection in the supply chain.', [{ label: 'Board', value: '5 ply double-wall corrugated' }, { label: 'Flute', value: 'BC, EB, or customised combination' }, { label: 'Load capacity', value: 'High stacking and transport strength' }, { label: 'Surface', value: 'Kraft, white top, or printed liner' }], ['Heavy retail goods', 'Industrial components', 'Export shipments']),
      ]},
    ],
  },
  {
    slug: 'flexible-packaging', title: 'Flexible Packaging', subtitle: 'Pouches, films, and wraps', image: images.pouch,
    description: 'Lightweight flexible formats designed for barrier performance, convenience, shelf visibility, and efficient material use.',
    children: [
      { slug: 'pouches', title: 'Pouches', subtitle: 'Resealable flexible packaging', image: images.pouch, description: 'Purpose-built pouches combine the right barrier, format, and closure for fresh, convenient consumer products.', children: [
        leaf('stand-up-pouches', 'Stand-Up Pouches', 'Shelf-standing gusseted pouches', images.pouch, 'Stand-up pouches give products a stable shelf presence while reducing packaging weight and material use.', [{ label: 'Film', value: 'PET, PE, kraft laminate, or high-barrier film' }, { label: 'Closure', value: 'Zipper, tear notch, or spout options' }, { label: 'Barrier', value: 'Matched to moisture, oxygen, and aroma needs' }, { label: 'Print', value: 'Full-colour rotogravure or digital print' }], ['Coffee and tea', 'Snacks', 'Pet food']),
        leaf('flat-pouches', 'Flat & Three-Side Seal Pouches', 'Compact single-serve formats', images.pouch, 'Three-side seal pouches provide a neat, compact format for portions, samples, and lightweight products.', [{ label: 'Film', value: 'Multi-layer barrier film options' }, { label: 'Seal', value: 'Three-side heat seal' }, { label: 'Size', value: 'Custom width and height' }, { label: 'Finish', value: 'Matte, gloss, clear window, or metallic' }], ['Samples', 'Spices', 'Single-serve products']),
      ]},
      { slug: 'specialty-film', title: 'Specialty Film', subtitle: 'Functional flexible material solutions', image: images.pouch, description: 'Flexible film formats for automated filling, portion control, and protective packing.', children: [
        leaf('rollstock-film', 'Rollstock Film', 'Form-fill-seal ready film', images.pouch, 'Rollstock is supplied to specification for efficient automated packaging lines and consistent product protection.', [{ label: 'Structure', value: 'Custom multi-layer laminate' }, { label: 'Format', value: 'Roll width and repeat to machine specification' }, { label: 'Barrier', value: 'Standard to high barrier options' }, { label: 'Print', value: 'Registered multi-colour print' }], ['Food packing lines', 'Personal care', 'High-volume manufacturing']),
      ]},
    ],
  },
  {
    slug: 'labels-stickers', title: 'Labels & Stickers', subtitle: 'Adhesive product identity', image: images.labels,
    description: 'Distinctive product labels, promotional stickers, and operational identifiers made for the right surface and handling conditions.',
    children: [
      { slug: 'product-labels', title: 'Product Labels', subtitle: 'Labels tailored to the product surface', image: images.labels, description: 'Material, adhesive, shape, and finish work together to give every product a crisp, durable identity.', children: [
        leaf('roll-labels', 'Roll Labels', 'Fast manual or machine application', images.labels, 'Roll labels are supplied for clean, consistent application across high-volume product runs.', [{ label: 'Face stock', value: 'Paper, PP, PE, clear film, or metallic' }, { label: 'Adhesive', value: 'Permanent, removable, freezer, or wash-off' }, { label: 'Format', value: 'Custom die-cut roll labels' }, { label: 'Finish', value: 'Matte, gloss, foil, or spot UV' }], ['Bottles and jars', 'Cosmetics', 'Food and beverage']),
        leaf('waterproof-labels', 'Waterproof Labels', 'Durable film labels for wet handling', images.labels, 'Waterproof labels use resilient film stocks and adhesives for products exposed to moisture, chilling, or handling.', [{ label: 'Face stock', value: 'Water-resistant PP or PE film' }, { label: 'Adhesive', value: 'Permanent moisture-resistant adhesive' }, { label: 'Print', value: 'Water-resistant ink and protective laminate' }, { label: 'Shape', value: 'Custom die-cut or standard form' }], ['Beverages', 'Bath and body', 'Chilled products']),
      ]},
      { slug: 'stickers', title: 'Stickers', subtitle: 'Promotional and brand-forward stickers', image: images.labels, description: 'Flexible sticker formats for product add-ons, packaging seals, campaigns, and customer moments.', children: [
        leaf('die-cut-stickers', 'Die-Cut Stickers', 'Custom contour-cut brand stickers', images.labels, 'Die-cut stickers follow your exact artwork outline for a distinctive, collectable branded finish.', [{ label: 'Material', value: 'Paper, vinyl, clear film, or metallic' }, { label: 'Cut', value: 'Custom contour die-cut' }, { label: 'Finish', value: 'Matte, gloss, or laminate' }, { label: 'Adhesive', value: 'Permanent or removable' }], ['Promotions', 'Packaging seals', 'Brand merchandise']),
      ]},
    ],
  },
  {
    slug: 'retail-ecommerce-supplies', title: 'Retail & E-commerce', subtitle: 'Packing station essentials', image: images.ecommerce,
    description: 'The dependable materials behind protected deliveries, efficient packing stations, and thoughtful branded unboxing.',
    children: [
      { slug: 'shipping-supplies', title: 'Shipping Supplies', subtitle: 'Reliable protection for every delivery', image: images.mailer, description: 'Practical shipping materials chosen for speed, protection, and a consistent customer experience.', children: [
        leaf('poly-mailers', 'Poly Mailers', 'Lightweight self-seal shipping', images.mailer, 'Poly mailers offer a lightweight, weather-resistant outer layer for soft goods and non-fragile orders.', [{ label: 'Material', value: 'LDPE or recycled-content co-extruded film' }, { label: 'Closure', value: 'Tamper-evident self-seal strip' }, { label: 'Print', value: 'Custom one- to full-colour print' }, { label: 'Size', value: 'Custom or standard mailer sizes' }], ['Apparel', 'Soft goods', 'E-commerce fulfilment']),
        leaf('bubble-mailers', 'Bubble Mailers', 'Built-in padded protection', images.mailer, 'Bubble mailers pair a protective cushioning layer with a self-sealing exterior for compact fragile items.', [{ label: 'Outer material', value: 'Kraft paper or poly film' }, { label: 'Cushioning', value: 'Integrated bubble lining' }, { label: 'Closure', value: 'Peel-and-seal flap' }, { label: 'Size', value: 'Standard and custom dimensions' }], ['Books and media', 'Small electronics', 'Delicate accessories']),
      ]},
      { slug: 'unboxing-supplies', title: 'Unboxing Supplies', subtitle: 'Thoughtful finishing touches', image: images.ecommerce, description: 'Materials that protect the order, elevate presentation, and make your packaging experience feel complete.', children: [
        leaf('tissue-paper', 'Tissue Paper', 'Branded presentation wrap', images.ecommerce, 'Custom tissue adds a light, premium layer around products and keeps presentations tidy inside the box.', [{ label: 'Paper', value: '17–30 gsm tissue, including recycled options' }, { label: 'Print', value: 'One- or multi-colour custom print' }, { label: 'Sheet size', value: 'Custom cut sheets or rolls' }, { label: 'Finish', value: 'Soft, lightweight, protective wrap' }], ['Apparel', 'Gift packaging', 'Subscription boxes']),
      ]},
    ],
  },
];

export const findCatalogPath = (segments: string[]): CatalogMatch | undefined => {
  let nodes = CATALOG_ROOT;
  const ancestors: CatalogNode[] = [];
  let node: CatalogNode | undefined;
  for (const segment of segments) {
    node = nodes.find((candidate) => candidate.slug === segment);
    if (!node) return undefined;
    ancestors.push(node);
    nodes = node.children ?? [];
  }
  return node ? { node, ancestors } : undefined;
};

export const catalogPath = (ancestors: CatalogNode[]) => `/products/${ancestors.map(({ slug }) => slug).join('/')}`;
