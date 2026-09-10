// new command only
export type Specification = { label: string; value: string };

export interface CatalogNode {
  /** Stable data identifier; legacy non-box nodes may omit this. */
  id?: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  /** Ordered visual assets. `image` remains the backwards-compatible primary asset. */
  images?: { key: string; url: string }[];
  children?: CatalogNode[];
  features?: string[];
  benefits?: string[];
  applications?: string[];
  specifications?: Specification[];
}

export interface CatalogMatch {
  node: CatalogNode;
  ancestors: CatalogNode[];
}

const images = {
  boxes: "/images/hero/folding-cartons-studio.png",
  folding: "/images/hero/folding-cartons-studio.png",
  rigid: "/images/hero/sustainable-retail-studio.png",
  corrugated: "/images/hero/kraft-mailer-studio.png",
  labels: "/images/products/labels.jpeg",
  ecommerce: "/images/products/retail-ecom.jpg",
  mailer: "/images/hero/kraft-mailer-studio.png",
};

const svgToDataUri = (svg: string) => `data:image/svg+xml,${encodeURIComponent(svg)}`;
const escapeSvgText = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const leaf = (
  slug: string,
  title: string,
  subtitle: string,
  image: string,
  description: string,
  specifications: Specification[],
  applications: string[],
): CatalogNode => ({
  slug,
  title,
  subtitle,
  image,
  description,
  specifications,
  applications,
  features: [
    "Custom dimensions and structural design",
    "Material, print, and finish options matched to your product",
    "Production-ready artwork and dieline support",
  ],
  benefits: [
    "Built around the protection and presentation your product needs",
    "Creates a consistent branded customer experience",
    "Specified for efficient packing, storage, and distribution",
  ],
});

const boxSpecs: Specification[] = [
  { label: "Material", value: "SBS, FBB, kraft, or recycled paperboard" },
  {
    label: "Board thickness",
    value: "250–450 gsm, specified to product weight",
  },
  { label: "Printing", value: "CMYK, Pantone, foil, embossing, or spot UV" },
  { label: "Finish", value: "Matte, gloss, soft-touch, or aqueous coating" },
  { label: "Size", value: "Custom internal dimensions" },
];

export type BoxProductDefinition = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  useCase: string;
  features: string[];
};

export type BoxCategoryDefinition = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  products: BoxProductDefinition[];
};

const box = (id: string, title: string, subtitle: string, description: string, useCase: string, features: string[]): BoxProductDefinition => ({ id, slug: id, title, subtitle, description, useCase, features });

/** The canonical box hierarchy. Product feed records are derived from this source. */
export const BOX_CATALOG_DEFINITIONS: BoxCategoryDefinition[] = [
  { id: 'folding-cartons', slug: 'folding-cartons', title: 'Folding Cartons', subtitle: 'Printed paperboard cartons', description: 'Lightweight, printable paperboard structures for retail products and shelf presentation.', products: [
    box('straight-tuck-end-box', 'Straight Tuck End', 'Clean, same-direction tuck closures', 'A paperboard carton whose top and bottom tuck flaps fold in the same direction, keeping display panels clean.', 'Cosmetics, tubes, bottles, and premium retail packs.', ['Same-direction tuck closures', 'Clean front display panel', 'Window-compatible dieline']),
    box('reverse-tuck-end-box', 'Reverse Tuck End', 'Efficient opposing tuck closures', 'An economical carton with top and bottom tuck flaps that close in opposite directions for efficient nesting.', 'Pharmaceuticals, personal care, and small consumer goods.', ['Opposing tuck closures', 'Efficient board layout', 'Fast hand or machine packing']),
    box('auto-lock-bottom-box', 'Auto Lock Bottom', 'Pre-glued load-bearing base', 'A crash-lock folding carton with a pre-glued base that locks automatically when opened.', 'Bottles, jars, candles, and heavier retail goods.', ['Pop-open assembly', 'Pre-glued locking base', 'Added bottom support']),
    box('snap-lock-bottom-box', 'Snap Lock Bottom', 'Interlocking 1-2-3 bottom', 'A folding carton with interlocking base flaps that create a secure bottom without pre-gluing.', 'Food, household products, and medium-weight retail items.', ['Interlocking bottom flaps', 'Flat-shipping construction', 'Secure manual assembly']),
    box('seal-end-box', 'Seal End', 'Glue-sealed end panels', 'A carton with permanently sealed end panels for tamper-resistant packing and automated filling.', 'Pharmaceuticals, frozen foods, and high-volume FMCG.', ['Glue-sealed ends', 'Tamper-evident format', 'Automation-friendly']),
    box('four-corner-box', 'Four Corner', 'Corner-locked tray carton', 'A die-cut carton whose four corners lock into a shallow tray for quick setup and wide product access.', 'Garments, bakery items, and flat retail packs.', ['Four locking corners', 'Wide opening', 'Flat-packed delivery']),
    box('six-corner-box', 'Six Corner', 'Reinforced corner carton', 'A six-corner folding structure that forms a sturdy tray with extended corner support.', 'Apparel sets, confectionery, and premium flat products.', ['Six reinforced corners', 'Strong tray base', 'Large printable panels']),
    box('folding-carton-tray', 'Tray', 'Open-top paperboard tray', 'An open-top folding carton tray designed to hold, organize, or present products with easy access.', 'Food sleeves, retail sets, and in-box organization.', ['Open-top access', 'Custom depth', 'Insert-compatible']),
    box('folding-carton-sleeve', 'Sleeve', 'Wraparound paperboard band', 'A printed paperboard sleeve slides over a product or inner tray to add branding without a full enclosure.', 'Food packs, soaps, gift sets, and multipacks.', ['Minimal material use', '360-degree branding', 'Pairs with trays or jars']),
    box('pillow-box', 'Pillow Box', 'Curved, gift-ready folding carton', 'A curved paperboard box with arched side panels that creates a compact pillow-like gift presentation.', 'Jewelry, accessories, confectionery, and small favors.', ['Curved profile', 'Tuck-in end panels', 'Compact gift format']),
    box('window-box', 'Window Box', 'Carton with product visibility', 'A folding carton with a die-cut opening and optional clear film to reveal the product inside.', 'Bakery, cosmetics, toys, and gift products.', ['Die-cut viewing window', 'Optional PET film', 'Shelf-visible product display']),
    box('carrier-box', 'Carrier Box', 'Handled paperboard pack', 'A folding carton with an integrated handle for carrying multiple products securely.', 'Beverages, gift packs, takeaway kits, and samples.', ['Integrated handle', 'Multi-product capacity', 'Brandable carry panels']),
    box('display-carton', 'Display Carton', 'Retail-ready tear-open carton', 'A printed carton designed to convert from transit packaging into a branded shelf display.', 'Counter retail, snacks, cosmetics, and promotional packs.', ['Shelf-ready conversion', 'Tear-open panel', 'High-visibility graphics']) ] },
  { id: 'rigid-boxes', slug: 'rigid-boxes', title: 'Rigid Boxes', subtitle: 'Premium setup and presentation boxes', description: 'Substantial wrapped-board boxes made for luxury presentation, gifting, and durable reuse.', products: [
    box('two-piece-rigid-box', 'Two Piece / Lid & Base', 'Classic lift-off lid and base', 'A premium setup box made from separate rigid lid and base components for a traditional reveal.', 'Apparel, jewelry, confectionery, and luxury gifts.', ['Separate lid and base', 'Rigid wrapped board', 'Insert-ready interior']),
    box('magnetic-closure', 'Magnetic Closure', 'Premium hinged magnetic box', 'A rigid box with concealed magnets in the flap and front wall for a smooth, secure closing action.', 'Launch kits, electronics, fragrance, and corporate gifts.', ['Concealed magnets', 'Hinged flap opening', 'Premium unboxing']),
    box('hinged-lid', 'Hinged Lid', 'Attached rigid-board cover', 'A rigid box with a permanently attached lid that pivots from the back edge for repeated opening.', 'Watches, keepsakes, and premium product sets.', ['Attached lid', 'Durable hinge joint', 'Reusable presentation']),
    box('book-style-rigid-box', 'Book Style', 'Book-opening presentation box', 'A rigid box that opens like a book, with a hinged cover and a broad surface for storytelling graphics.', 'Media kits, documents, limited editions, and gift sets.', ['Book-like opening', 'Large cover panel', 'Optional magnetic catch']),
    box('drawer-style-rigid-box', 'Drawer / Slide', 'Sliding tray and sleeve', 'A rigid inner tray slides from a wrapped outer sleeve for a controlled, tactile product reveal.', 'Jewelry, technology accessories, and specialty foods.', ['Sliding tray', 'Ribbon pull option', 'Strong outer sleeve']),
    box('shoulder-neck-rigid-box', 'Shoulder Neck', 'Stepped inner-neck closure', 'A rigid lid-and-base box with an inner neck that aligns the lid and creates a layered reveal.', 'Fragrance, watches, sweets, and collectibles.', ['Stepped reveal', 'Guided lid fit', 'Contrast-wrap options']),
    box('collapsible-rigid-box', 'Collapsible', 'Fold-flat premium rigid box', 'A premium rigid box engineered with scored joints so it stores flat and assembles into a sturdy form.', 'E-commerce gifts and brands reducing storage volume.', ['Fold-flat storage', 'Rigid assembled feel', 'Magnetic or tab closure']),
    box('clamshell-rigid-box', 'Clamshell', 'Two-panel hinged rigid box', 'A rigid two-panel box joined by a spine, enclosing the product like a clamshell.', 'Presentation sets, delicate goods, and collector packaging.', ['Wraparound protection', 'Spine hinge', 'Fitted insert compatible']),
    box('rigid-telescope', 'Telescope', 'Deep telescoping lid', 'A rigid box with a deep lid that slides over the base for extra sidewall protection and a dramatic reveal.', 'Apparel, premium gifts, and high-value retail.', ['Deep-fitting lid', 'Extra side protection', 'Premium reveal']),
    box('rigid-custom-shape', 'Custom Shape', 'Bespoke rigid construction', 'A custom-engineered rigid box shaped around an unusual product, brand motif, or opening experience.', 'Limited editions, luxury launches, and distinctive gifts.', ['Custom structural engineering', 'Non-standard silhouettes', 'Bespoke inserts']) ] },
  { id: 'corrugated-boxes', slug: 'corrugated-boxes', title: 'Corrugated Boxes', subtitle: 'Protective shipping and transit structures', description: 'Durable fluted-board formats for e-commerce, warehousing, retail transit, and heavy-duty protection.', products: [
    box('regular-slotted-container', 'RSC', 'Regular slotted shipping carton', 'A standard corrugated shipper with equal-length flaps that meet in the center on the top and bottom.', 'E-commerce fulfillment, warehousing, and B2B dispatch.', ['Efficient board use', 'Center-meeting flaps', 'Tape-sealed closure']),
    box('half-slotted-container', 'HSC', 'Open-top half slotted container', 'A corrugated container with bottom flaps and an open top, often paired with a separate lid.', 'Produce, bulk storage, shelf trays, and separate-lid packs.', ['Open top', 'Bottom flap closure', 'Separate lid compatible']),
    box('full-overlap-container', 'FOL', 'Full overlap shipping carton', 'A corrugated carton whose outer flaps fully overlap to strengthen the top and bottom panels.', 'Heavy goods, long items, export, and demanding transit.', ['Full flap overlap', 'Extra compression strength', 'Improved puncture resistance']),
    box('full-flap-box', 'Full Flap', 'Extended-flap corrugated carton', 'A corrugated carton with long flaps that cover the full box width for added protection at closure.', 'Heavy or fragile products requiring reinforced closure panels.', ['Full-width flaps', 'Reinforced closure', 'Custom board grade']),
    box('one-piece-folder', 'One Piece Folder', 'Wraparound single-piece shipper', 'A scored corrugated blank that folds around a product to create a close-fitting protective shipper.', 'Books, frames, flat goods, and variable-size items.', ['One-piece construction', 'Close product fit', 'Reduced void space']),
    box('corrugated-mailer', 'Mailer', 'Self-locking corrugated mailer', 'A die-cut corrugated mailer with integrated locking tabs for branded delivery and quick packing.', 'Subscription boxes, DTC orders, and welcome kits.', ['Self-locking tabs', 'Unboxing-ready print area', 'No tape required']),
    box('corrugated-telescope', 'Telescope', 'Two-piece telescoping shipper', 'A corrugated lid and base that slide together to protect long, shallow, or adjustable-depth products.', 'Apparel, framed goods, and multi-size shipments.', ['Separate lid and base', 'Adjustable depth', 'Strong edge protection']),
    box('corrugated-tray', 'Tray', 'Open corrugated handling tray', 'An open-top corrugated tray that organizes products for transport, stocking, or retail display.', 'Beverages, produce, multipacks, and warehouse picking.', ['Open-top access', 'Stackable format', 'Optional display graphics']),
    box('corrugated-die-cut', 'Die Cut', 'Custom die-cut corrugated box', 'A custom-cut corrugated structure shaped for a product, closure method, or protective insert.', 'Irregular products, promotional kits, and protective packs.', ['Custom profile', 'Integrated locking features', 'Product-specific fit']),
    box('partition-box', 'Partition Box', 'Corrugated box with dividers', 'A corrugated shipper with integrated or separate partitions to isolate multiple items in transit.', 'Bottles, glassware, components, and multipacks.', ['Cell partitions', 'Reduced product contact', 'Custom cell count']),
    box('corrugated-display-box', 'Display Box', 'Retail-ready corrugated display', 'A corrugated structure that ships products and then presents them on shelf or counter.', 'Snacks, FMCG, promotional merchandise, and retail refills.', ['Transit-to-display format', 'Tear-away front option', 'Brandable display panels']) ] },
  { id: 'mailer-boxes', slug: 'mailer-boxes', title: 'Mailer Boxes', subtitle: 'Delivery-ready branded mailers', description: 'Purpose-built mailer formats designed for fast packing, secure closure, and a polished delivery experience.', products: [
    box('roll-end-tuck-top', 'Roll End Tuck Top', 'Roll-end mailer with tuck closure', 'A die-cut mailer with rolled end panels and a tuck-top lid that locks without tape.', 'Subscription boxes, apparel, cosmetics, and DTC orders.', ['Rolled end strength', 'Integrated tuck closure', 'Brandable inside and outside']),
    box('roll-end-front-tuck', 'Roll End Front Tuck', 'Front-tuck roll-end mailer', 'A roll-end mailer whose front panel tucks into the body for a secure, presentation-led closure.', 'Premium e-commerce, gift kits, and retail shipments.', ['Front tuck lock', 'Strong rolled end walls', 'Premium opening experience']),
    box('self-locking-mailer', 'Self Locking', 'Tool-free locking mailer', 'A mailer with interlocking tabs that assembles and closes without glue or tape.', 'Samples, subscription products, and quick fulfillment.', ['Tool-free assembly', 'Integrated locking tabs', 'Flat-packed efficiency']),
    box('mailer-die-cut', 'Die Cut', 'Custom-shaped delivery mailer', 'A custom die-cut mailer built around a unique product shape, opening sequence, or protective need.', 'Irregular products, campaigns, and branded launches.', ['Custom structural fit', 'Integrated closures', 'Optional inserts']),
    box('corrugated-mailer-box', 'Corrugated Mailer', 'Fluted protective mailer', 'A corrugated mailer that combines self-locking construction with cushioning flute protection.', 'Fragile DTC goods, subscription boxes, and electronics.', ['Fluted-board protection', 'Self-locking closure', 'Print-ready surfaces']),
    box('rigid-mailer', 'Rigid Mailer', 'Premium board mailer', 'A rigid-board mailer designed to protect premium flat or delicate items while elevating delivery presentation.', 'Documents, luxury accessories, and high-value samples.', ['Rigid board protection', 'Slim profile', 'Premium presentation']) ] },
  { id: 'specialty-boxes', slug: 'specialty-boxes', title: 'Specialty Boxes', subtitle: 'Distinctive shapes and occasions', description: 'Memorable packaging shapes that add character to gifts, retail launches, and specialty products.', products: [
    box('specialty-pillow', 'Pillow', 'Curved specialty gift box', 'A compact curved box with pillow-like ends, designed for small products and gift presentation.', 'Jewelry, party favors, accessories, and confectionery.', ['Curved silhouette', 'Tuck-in ends', 'Compact footprint']),
    box('specialty-gable', 'Gable', 'Handled specialty box', 'A box with a built-in peaked handle that combines carrying convenience with a distinctive silhouette.', 'Gifts, takeaway, event favors, and retail bundles.', ['Integrated handle', 'Peaked top', 'Quick assembly']),
    box('hexagon-box', 'Hexagon', 'Six-sided presentation box', 'A six-sided box that creates a geometric premium presentation for gifts and specialty products.', 'Candles, gourmet foods, beauty, and gifting.', ['Hexagonal profile', 'High shelf impact', 'Custom lid options']),
    box('round-box', 'Round', 'Cylindrical presentation box', 'A round box with cylindrical walls for products that benefit from a soft, premium silhouette.', 'Tea, candles, cosmetics, and luxury gifting.', ['Cylindrical form', 'Lid or tube options', 'Wraparound graphics']),
    box('tube-box', 'Tube', 'Protective cylindrical tube', 'A rigid or paperboard tube that protects rolled, long, or premium products in a cylindrical format.', 'Posters, cosmetics, snacks, and apparel accessories.', ['Crush-resistant walls', 'End-cap closure', 'Premium wrap options']),
    box('pyramid-box', 'Pyramid', 'Triangular novelty box', 'A pyramid-shaped carton that turns small products into an eye-catching gift or promotional pack.', 'Favors, samples, confectionery, and campaigns.', ['Triangular silhouette', 'Novelty presentation', 'Die-cut assembly']),
    box('specialty-custom-shape', 'Custom Shape', 'Bespoke specialty structure', 'A custom packaging structure designed around a brand icon, product contour, or memorable opening.', 'Promotions, limited editions, and experiential retail.', ['Bespoke shape', 'Custom dieline', 'Brand-led opening experience']) ] },
  { id: 'display-boxes', slug: 'display-boxes', title: 'Display Boxes', subtitle: 'Retail merchandising structures', description: 'Retail-ready formats engineered to organize products, attract attention, and simplify replenishment.', products: [
    box('counter-display', 'Counter Display', 'Compact point-of-sale display', 'A countertop display box that keeps small products visible and accessible at checkout or service counters.', 'Impulse buys, cosmetics, snacks, and accessories.', ['Counter footprint', 'Product-facing rows', 'High-visibility header']),
    box('floor-display', 'Floor Display', 'Freestanding retail unit', 'A freestanding corrugated display designed to merchandise larger quantities in store aisles or promotional zones.', 'Seasonal promotions, FMCG, and retail launches.', ['Freestanding structure', 'Large graphic area', 'High product capacity']),
    box('pop-display', 'POP Display', 'Point-of-purchase display', 'A branded point-of-purchase display built to capture attention where shoppers make buying decisions.', 'New launches, promotional goods, and impulse retail.', ['Shopper-facing branding', 'Custom product arrangement', 'Retail-ready setup']),
    box('pdq-display', 'PDQ Display', 'Pre-packed quick display', 'A pre-filled display tray or carton that moves quickly from delivery to the retail shelf.', 'Convenience retail, snacks, health products, and refills.', ['Pre-packed format', 'Fast shelf placement', 'Tear-away opening']),
    box('display-tray', 'Display Tray', 'Open retail merchandising tray', 'An open tray that presents products in a neat row while keeping stock easy to replenish.', 'Bottles, sachets, cosmetics, and small packaged goods.', ['Open product access', 'Shelf-ready profile', 'Custom dividers']),
    box('shelf-ready', 'Shelf Ready', 'Transit carton that converts to display', 'A shipping carton designed to open cleanly into a shelf-ready merchandising unit.', 'FMCG, grocery, health, and high-volume retail.', ['Ship-to-shelf conversion', 'Tear-away front', 'Reduced shelf stocking time']) ] },
  { id: 'food-takeaway-boxes', slug: 'food-takeaway-boxes', title: 'Food / Takeaway Boxes', subtitle: 'Food-safe service packaging', description: 'Food-service boxes made for fresh presentation, practical handling, and takeaway delivery.', products: [
    box('pizza-box', 'Pizza', 'Vented pizza delivery box', 'A low-profile corrugated box that supports a pizza while managing steam during delivery.', 'Pizzerias, delivery kitchens, and catering.', ['Vented construction', 'Grease-resistant options', 'Stackable footprint']),
    box('burger-box', 'Burger', 'Compact clamshell food box', 'A compact food box that holds burgers securely while keeping service fast and presentation tidy.', 'Burger outlets, cafés, and quick-service restaurants.', ['Clamshell closure', 'Food-safe board', 'Grease-resistant options']),
    box('bakery-box', 'Bakery', 'Bakery presentation carton', 'A food-safe carton designed to protect baked goods while showcasing them at the counter or in delivery.', 'Bakeries, cafés, and dessert delivery.', ['Food-safe board', 'Window option', 'Easy carry format']),
    box('cake-box', 'Cake', 'Tall cake transport box', 'A sturdy food box sized to carry cakes with clearance for frosting, toppings, and inserts.', 'Bakeries, patisseries, and celebration cakes.', ['Tall sidewalls', 'Cake-board compatible', 'Secure top closure']),
    box('cupcake-box', 'Cupcake', 'Cupcake box with insert', 'A food-safe box with optional inserts that hold cupcakes upright during transport.', 'Bakeries, events, and gift assortments.', ['Optional cavity insert', 'Window lid option', 'Protective transport']),
    box('noodle-box', 'Noodle', 'Leak-conscious noodle carton', 'A folded food carton designed for hot noodles and other takeaway dishes, with a secure top closure.', 'Asian restaurants, food courts, and delivery kitchens.', ['Folded top closure', 'Hot-food suitable board', 'Compact serving format']),
    box('food-gable-box', 'Gable', 'Handled food-service box', 'A food-safe gable box with an integrated handle for carrying meals, bakery items, or event packs.', 'Catering, bakery, takeaway meals, and events.', ['Integrated handle', 'Food-safe board', 'Quick assembly']),
    box('food-tray', 'Food Tray', 'Open food-service tray', 'An open tray that supports snacks and prepared food for convenient serving and quick access.', 'Street food, fries, bakery items, and events.', ['Open-top serving', 'Grease-resistant options', 'Stackable design']) ] },
];

const boxImages = (slug: string, image: string) => [
  { key: `${slug}-1`, url: image },
  { key: `${slug}-2`, url: '/images/hero/kraft-mailer-studio.png' },
  { key: `${slug}-3`, url: '/images/hero/sustainable-retail-studio.png' },
];

const corrugatedSpecifications: Specification[] = [
  { label: 'Wall', value: 'Single Wall / 3-Ply; Double Wall / 5-Ply; Triple Wall / 7-Ply' },
  { label: 'Flute', value: 'A, B, C, E, F, AB, AC, BC, and custom combinations' },
  { label: 'Liner', value: 'Kraft, white-top, recycled, or printed liner options' },
];

const BOX_CATEGORY_NODES: CatalogNode[] = BOX_CATALOG_DEFINITIONS.map((category) => {
  const image = category.id === 'folding-cartons' ? images.folding : category.id === 'rigid-boxes' ? images.rigid : images.corrugated;
  return { id: category.id, slug: category.slug, title: category.title, subtitle: category.subtitle, description: category.description, image, images: boxImages(category.slug, image), children: category.products.map((product) => ({ id: product.id, slug: product.slug, title: product.title, subtitle: product.subtitle, description: product.description, image, images: boxImages(product.slug, image), features: product.features, benefits: product.features, applications: [product.useCase], specifications: category.id === 'corrugated-boxes' ? corrugatedSpecifications : boxSpecs })) };
});

const kebab = (value: string) => value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export type LabelProductDefinition = BoxProductDefinition & { rootCategory: 'Labels & Stickers'; category: string; subcategory: string; parentId: string; categoryId: string; subcategoryId: string };
type LabelSubcategoryDefinition = { id: string; slug: string; title: string; subtitle: string; description: string; products: LabelProductDefinition[] };
export type LabelCategoryDefinition = { id: string; slug: string; title: string; subtitle: string; description: string; subcategories: LabelSubcategoryDefinition[] };
const labelCopy = (title: string, category: string, subcategory: string) => { const lower = title.toLowerCase(); const detail = lower.includes('qr') ? 'It carries scannable QR artwork for fast digital access and traceability.' : lower.includes('nfc') || lower.includes('rfid') ? 'It integrates smart identification technology for contactless data or authentication.' : lower.includes('shrink') || lower.includes('sleeve') ? 'The sleeve is applied over a container and conforms with controlled heat or stretch.' : lower.includes('in-mold') || lower.includes('iml') ? 'It is placed in the mold so the graphic becomes integral to the molded container.' : lower.includes('tamper') || lower.includes('void') || lower.includes('destructible') ? 'Its construction visibly indicates opening, removal, or tampering.' : lower.includes('hang tag') || lower.includes('swing tag') || lower.includes('tie-on') || lower.includes('tag') ? 'It is a non-adhesive tag finished for attachment, pricing, or product information.' : lower.includes('foil') || lower.includes('metallic') || lower.includes('holographic') ? 'Decorative metallic or optical finishing gives the label a premium visual effect.' : `The face stock, adhesive, print, and finish are specified for ${subcategory.toLowerCase()}.`; return { description: `${title} is a ${subcategory.toLowerCase()} format within ${category}. ${detail}`, useCase: `${category} projects requiring ${title.toLowerCase()} identification, presentation, or compliance.`, features: [title.includes('Label') ? 'Custom label stock' : 'Custom format', `${subcategory} application`, 'Custom print and finish'] }; };
const labelSub = (category: string, categoryId: string, title: string, names: string[]): LabelSubcategoryDefinition => { const id = kebab(title); return { id, slug: id, title, subtitle: `${title} solutions`, description: `Custom ${title.toLowerCase()} specified for application method, surface, and performance needs.`, products: names.map((title) => { const productId = `labels-stickers-${categoryId}-${id}-${kebab(title)}`; return { id: productId, slug: productId, title, subtitle: `${title} custom label`, ...labelCopy(title, category, title), rootCategory: 'Labels & Stickers', category, subcategory: title, parentId: 'labels-stickers', categoryId, subcategoryId: id }; }) }; };
const labelCategory = (title: string, groups: [string, string[]][]): LabelCategoryDefinition => { const id = kebab(title); return { id, slug: id, title, subtitle: `${title} solutions`, description: `Custom ${title.toLowerCase()} for product presentation, identification, protection, and operational use.`, subcategories: groups.map(([group, names]) => labelSub(title, id, group, names)) }; };

/** Canonical Labels & Stickers hierarchy. Contextual leaf IDs retain repeated names as separate products. */
export const LABELS_STICKERS_DEFINITIONS: LabelCategoryDefinition[] = [
  labelCategory('Adhesive Labels / Pressure-Sensitive Labels', [['Roll Labels', ['Continuous Roll Labels', 'Individual Die-Cut Roll Labels', 'Butt-Cut Roll Labels', 'Kiss-Cut Roll Labels']], ['Sheet Labels', ['A4 Sheet Labels', 'A3 Sheet Labels', 'Letter Sheet Labels', 'Custom Sheet Labels']], ['Front Labels', ['Product Front Label', 'Brand Label', 'Promotional Front Label']], ['Back Labels', ['Information Label', 'Ingredient Label', 'Regulatory Label']], ['Wrap-Around Labels', ['Full Wrap Label', 'Partial Wrap Label', 'BOPP Wrap-Around Label']], ['Multi-Panel Labels', ['Front & Back Label', 'Fold-Out Label', 'Booklet Label', 'Extended Content Label']], ['Linerless Labels', ['Standard Linerless Label', 'Wrap-Around Linerless Label', 'Adhesive Linerless Label']]]),
  labelCategory('Sticker Labels', [['Shape-Based Stickers', ['Round Sticker', 'Square Sticker', 'Rectangle Sticker', 'Oval Sticker', 'Circle Sticker', 'Custom Shape Sticker']], ['Die-Cut Stickers', ['Individual Die-Cut', 'Kiss-Cut Sticker', 'Full-Cut Sticker', 'Custom Die-Cut']], ['Clear Stickers', ['Transparent Sticker', 'Clear Vinyl Sticker', 'Clear BOPP Sticker']], ['Vinyl Stickers', ['Gloss Vinyl', 'Matte Vinyl', 'Clear Vinyl', 'Outdoor Vinyl']], ['Paper Stickers', ['Gloss Paper', 'Matte Paper', 'Kraft Paper']], ['Specialty Stickers', ['Holographic Sticker', 'Metallic Sticker', 'Glitter Sticker', 'Foil Sticker', 'Reflective Sticker']]]),
  labelCategory('Sleeve Labels', [['Shrink Sleeves', ['Full-Body Shrink Sleeve', 'Partial Shrink Sleeve', 'Neck Shrink Sleeve', 'Tamper-Evident Shrink Sleeve', 'Multi-Pack Shrink Sleeve']], ['Stretch Sleeves', ['Full-Body Stretch Sleeve', 'Partial Stretch Sleeve', 'Multi-Pack Stretch Sleeve']], ['Roll-On Shrink Sleeves', ['Seamless Sleeve', 'Seamed Sleeve']]]),
  labelCategory('In-Mold Labels', [['Injection In-Mold Labels', ['IML Container Label', 'IML Lid Label', 'IML Cup Label']], ['Blow-Mold In-Mold Labels', ['Bottle IML', 'Container IML']], ['Thermoform In-Mold Labels', ['Tray IML', 'Cup IML', 'Container IML']]]),
  labelCategory('Glue-Applied Labels', [['Wet-Glue Labels', ['Paper Wet-Glue Label', 'Film Wet-Glue Label', 'Wrap-Around Wet-Glue Label']], ['Hot-Melt Glue Labels', ['Wrap-Around Hot-Melt Label', 'Pressure-Sensitive Hot-Melt Label']], ['Dry-Gum Labels', ['Paper Dry-Gum Label', 'Film Dry-Gum Label']]]),
  labelCategory('Functional Labels', [['Barcode Labels', ['UPC Label', 'EAN Label', 'Code 128 Label', 'QR Code Label']], ['Shipping Labels', ['Address Label', 'Courier Label', 'Logistics Label', 'Pallet Label']], ['Inventory Labels', ['Stock Label', 'SKU Label', 'Asset Label', 'Warehouse Label']], ['Identification Labels', ['Name Label', 'Equipment Label', 'Cable Label', 'Identification Sticker']], ['Information Labels', ['Instruction Label', 'Warning Label', 'Directional Label', 'Usage Label']]]),
  labelCategory('Safety & Warning Labels', [['Warning Labels', ['Caution Label', 'Danger Label', 'Hazard Label']], ['Chemical Labels', ['GHS Label', 'Chemical Hazard Label', 'Chemical Identification Label']], ['Electrical Safety Labels', ['High Voltage Label', 'Electrical Hazard Label', 'Equipment Safety Label']], ['Compliance Labels', ['Regulatory Label', 'Certification Label', 'Compliance Label']]]),
  labelCategory('Security & Authentication Labels', [['Tamper-Evident Labels', ['Void Label', 'Destructible Label', 'Tamper Seal Label', 'Security Seal']], ['Holographic Labels', ['Standard Hologram', 'Custom Hologram', '3D Hologram']], ['Anti-Counterfeit Labels', ['Authentication Label', 'Serialized Label', 'QR Authentication Label', 'NFC Authentication Label']], ['Evidence Labels', ['Void Seal', 'Destructible Seal', 'Security Seal']]]),
  labelCategory('Variable & Smart Labels', [['Variable Data Labels', ['Serialized Label', 'Batch Label', 'Lot Label', 'Expiry Label']], ['QR Labels', ['Static QR Label', 'Dynamic QR Label', 'Serialized QR Label']], ['NFC Labels', ['NFC Sticker', 'NFC Product Label', 'NFC Authentication Label']], ['RFID Labels', ['RFID Product Label', 'RFID Inventory Label', 'RFID Shipping Label', 'RFID Asset Label']]]),
  labelCategory('Specialty / Decorative Labels', [['Foil Labels', ['Gold Foil', 'Silver Foil', 'Holographic Foil', 'Colored Foil']], ['Metallic Labels', ['Gold Metallic', 'Silver Metallic', 'Chrome Metallic']], ['Embossed Labels', ['Raised Emboss', 'Deboss', 'Multi-Level Emboss']], ['Textured Labels', ['Linen Texture', 'Soft-Touch', 'Embossed Texture']], ['Premium Labels', ['Luxury Label', 'Wine Label', 'Artisan Label', 'Premium Brand Label']]]),
  labelCategory('Tags', [['Hang Tags', ['Product Hang Tag', 'Clothing Hang Tag', 'Price Hang Tag', 'Promotional Hang Tag']], ['Swing Tags', ['Apparel Swing Tag', 'Retail Swing Tag', 'Product Swing Tag']], ['Tie-On Tags', ['String Tag', 'Wire Tag', 'Elastic Tag']], ['Specialty Tags', ['Luggage Tag', 'Gift Tag', 'Plant Tag', 'Jewelry Tag']]]),
  labelCategory('Application-Based Labels', [['Product Labels', ['Food Label', 'Beverage Label', 'Cosmetic Label', 'Pharmaceutical Label', 'Personal Care Label', 'Household Product Label']], ['Food & Beverage Labels', ['Bottle Label', 'Jar Label', 'Can Label', 'Pouch Label', 'Wine Label', 'Beer Label']], ['Cosmetic & Personal Care Labels', ['Skincare Label', 'Haircare Label', 'Makeup Label', 'Perfume Label', 'Personal Care Label']], ['Pharmaceutical Labels', ['Medicine Label', 'Prescription Label', 'Bottle Label', 'Vial Label', 'Medical Device Label']], ['Industrial Labels', ['Machine Label', 'Equipment Label', 'Chemical Label', 'Pipe Label', 'Cable Label']], ['Retail Labels', ['Price Label', 'Shelf Label', 'Promotional Label', 'Sale Label']], ['Shipping & Logistics Labels', ['Shipping Label', 'Address Label', 'Barcode Label', 'Pallet Label', 'Fragile Label', 'Handling Label']]]),
];
const labelImage = (title: string) => svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900"><rect width="1200" height="900" fill="#edf3ff"/><rect x="290" y="210" width="620" height="420" rx="38" fill="#fffdf8" stroke="#12295a" stroke-width="14"/><rect x="350" y="280" width="500" height="105" rx="16" fill="#2f6fed"/><path d="M350 450h500M350 510h350" stroke="#12295a" stroke-width="18"/><circle cx="795" cy="520" r="48" fill="#ff9933"/><text x="600" y="740" text-anchor="middle" font-family="Arial" font-size="32" font-weight="700" fill="#12295a">${escapeSvgText(title)}</text></svg>`);
const LABELS_STICKERS_NODES: CatalogNode[] = LABELS_STICKERS_DEFINITIONS.map((category) => ({ id: category.id, slug: category.slug, title: category.title, subtitle: category.subtitle, description: category.description, image: labelImage(category.title), images: [1, 2, 3].map((index) => ({ key: `${category.slug}-${index}`, url: labelImage(category.title) })), children: category.subcategories.map((subcategory) => ({ id: subcategory.id, slug: subcategory.slug, title: subcategory.title, subtitle: subcategory.subtitle, description: subcategory.description, image: labelImage(subcategory.title), images: [1, 2, 3].map((index) => ({ key: `${subcategory.slug}-${index}`, url: labelImage(subcategory.title) })), children: subcategory.products.map((product) => ({ id: product.id, slug: product.slug, title: product.title, subtitle: product.subtitle, description: product.description, image: labelImage(product.title), images: [1, 2, 3].map((index) => ({ key: `${product.slug}-${index}`, url: labelImage(product.title) })), features: product.features, benefits: product.features, applications: [product.useCase], specifications: [{ label: 'Material', value: 'Custom paper, film, or specialty stock' }, { label: 'Application', value: product.subcategory }, { label: 'Print', value: 'Custom colour and finishing options' }] })) })) }));

export type RetailProductDefinition = BoxProductDefinition & { rootCategory: 'Retail & E-Commerce Supplies'; category: string; subcategory: string; parentId: string; categoryId: string; subcategoryId: string };
type RetailCategoryDefinition = { id: string; slug: string; title: string; subtitle: string; description: string; subcategories: { id: string; slug: string; title: string; subtitle: string; description: string; products: RetailProductDefinition[] }[] };
const retailCopy = (title: string, category: string, subcategory: string) => { const l=title.toLowerCase(); const type=l.includes('tape')?'sealing tape':l.includes('bubble')||l.includes('foam')||l.includes('cushion')||l.includes('void fill')?'protective cushioning':l.includes('label')?'operational label':l.includes('bag')||l.includes('mailer')||l.includes('box')?'shipping or retail pack':l.includes('tag')||l.includes('card')||l.includes('insert')?'brand communication piece':'fulfillment supply'; return { description: `${title} is a ${type} within ${subcategory}, specified for reliable ${category.toLowerCase()} workflows.`, useCase: `${category} operations that require ${title.toLowerCase()} for packing, protection, presentation, or dispatch.`, features: ['Custom specification options', `${subcategory} workflow fit`, 'Reliable fulfillment performance'] }; };
const retailCategory = (title: string, groups: [string, string[]][]): RetailCategoryDefinition => { const id=kebab(title); return {id,slug:id,title,subtitle:`${title} solutions`,description:`Practical ${title.toLowerCase()} for retail presentation, e-commerce fulfillment, and distribution.`,subcategories:groups.map(([sub,names])=>{const sid=kebab(sub);return {id:sid,slug:sid,title:sub,subtitle:`${sub} supplies`,description:`Purpose-built ${sub.toLowerCase()} for efficient packing and retail operations.`,products:names.map(name=>{const pid=`retail-ecommerce-supplies-${id}-${sid}-${kebab(name)}`;return {id:pid,slug:pid,title:name,subtitle:`${name} retail supply`,...retailCopy(name,title,sub),rootCategory:'Retail & E-Commerce Supplies',category:title,subcategory:sub,parentId:'retail-ecommerce-supplies',categoryId:id,subcategoryId:sid};})};})};};
export const RETAIL_ECOMMERCE_DEFINITIONS: RetailCategoryDefinition[] = [
retailCategory('E-Commerce Boxes',[['Mailer Boxes',['Roll-End Tuck-Top Mailer','Roll-End Front-Tuck Mailer','Self-Locking Mailer','Die-Cut Mailer','Book-Style Mailer','Subscription Mailer']],['Shipping Boxes',['Regular Shipping Box','Corrugated Shipping Box','Heavy-Duty Shipping Box','Small Shipping Box','Large Shipping Box']],['Product Boxes',['Folding Carton','Rigid Product Box','Window Product Box','Display Product Box']],['Specialty E-Commerce Boxes',['Apparel Mailer','Subscription Box','Gift Shipping Box','Book Shipping Box','Long Product Box']]]),
retailCategory('Shipping & Mailing Supplies',[['Shipping Envelopes',['Poly Mailer','Paper Mailer','Bubble Mailer','Padded Mailer','Kraft Mailer','Bookfold Mailer']],['Shipping Bags',['Poly Shipping Bag','Courier Bag','Tamper-Evident Bag','Security Bag','Document Bag']],['Shipping Tubes',['Mailing Tube','Poster Tube','Square Mailing Tube','Triangular Mailing Tube']],['Shipping Pouches',['Packing List Pouch','Document Pouch','Invoice Pouch','Adhesive Document Pouch']]]),
retailCategory('Protective Packaging',[['Bubble Packaging',['Bubble Wrap','Bubble Pouches','Bubble Bags','Bubble Sheets']],['Foam Packaging',['Foam Sheets','Foam Pouches','Foam Inserts','Foam Rolls']],['Paper Protective Packaging',['Kraft Paper','Crinkle Paper','Paper Cushion','Paper Honeycomb','Paper Void Fill']],['Air Packaging',['Air Pillows','Air Bubble Bags','Air Cushion Rolls']],['Edge & Corner Protection',['Corner Protectors','Edge Guards','Foam Corners']],['Protective Inserts',['Cardboard Inserts','Corrugated Inserts','Foam Inserts','Molded Pulp Inserts','Die-Cut Inserts']]]),
retailCategory('Void Fill & Cushioning',[['Paper Void Fill',['Crinkle Paper','Shredded Paper','Kraft Fill','Honeycomb Paper']],['Plastic Void Fill',['Air Pillows','Packing Peanuts','Foam Peanuts']],['Cushioning',['Bubble Wrap','Foam','Corrugated Cushion','Paper Cushion']]]),
retailCategory('Packaging Tapes',[['Carton Sealing Tape',['BOPP Tape','Kraft Tape','PVC Tape']],['Printed Tape',['Custom Printed Tape','Logo Tape','Warning Tape']],['Specialty Tape',['Tamper-Evident Tape','Double-Sided Tape','Masking Tape','Filament Tape']],['Paper Tape',['Self-Adhesive Paper Tape','Water-Activated Tape']]]),
retailCategory('Packaging Labels & Stickers',[['Shipping Labels',['Address Label','Courier Label','Shipping Label','Pallet Label']],['Product Labels',['Brand Label','Product Label','Information Label']],['Barcode Labels',['UPC','EAN','SKU Label','QR Code Label']],['Handling Labels',['Fragile','This Side Up','Handle With Care','Do Not Bend']],['Security Labels',['Tamper-Evident Label','Void Label','Security Seal']]]),
retailCategory('Retail Bags',[['Paper Shopping Bags',['Kraft Paper Bag','White Paper Bag','Luxury Paper Bag','Custom Printed Paper Bag']],['Plastic Shopping Bags',['T-Shirt Bag','Die-Cut Handle Bag','Soft Loop Handle Bag','Retail Poly Bag']],['Reusable Bags',['Non-Woven Bag','Cotton Bag','Jute Bag','Reusable Shopping Bag']],['Specialty Retail Bags',['Bottle Bag','Gift Bag','Garment Bag','Takeaway Bag']]]),
retailCategory('Retail Packaging',[['Product Packaging',['Folding Cartons','Rigid Boxes','Pouches','Sleeves']],['Gift Packaging',['Gift Boxes','Gift Bags','Gift Wrap','Gift Tags']],['Apparel Packaging',['Garment Boxes','Apparel Mailers','Garment Bags','Clothing Tags']],['Food Retail Packaging',['Bakery Boxes','Food Boxes','Takeaway Boxes','Food Bags','Food Pouches']]]),
retailCategory('Retail Display & Merchandising',[['Display Boxes',['Countertop Display','Floor Display','POP Display','PDQ Display','Display Tray']],['Shelf Displays',['Shelf-Ready Packaging','Shelf Display Box','Shelf Tray','Shelf Divider']],['Hanging Displays',['Hanging Box','Hanging Card','Pegboard Display']],['Promotional Displays',['Standee','Counter Display','Floor Stand','Promotional Display']]]),
retailCategory('Retail Tags & Cards',[['Hang Tags',['Product Hang Tag','Clothing Hang Tag','Price Hang Tag','Promotional Hang Tag']],['Price Tags',['Retail Price Tag','Sale Tag','Discount Tag']],['Product Cards',['Product Information Card','Care Card','Thank You Card']],['Promotional Cards',['Coupon Card','Discount Card','Loyalty Card']]]),
retailCategory('E-Commerce Inserts & Marketing',[['Order Inserts',['Thank You Card','Thank You Note','Care Instructions','Product Information Card']],['Promotional Inserts',['Discount Card','Coupon','Promotional Flyer','Product Catalog']],['Brand Inserts',['Brand Card','Story Card','Loyalty Card','Referral Card']]]),
retailCategory('Poly Bags & Garment Packaging',[['Poly Bags',['Clear Poly Bag','Self-Seal Poly Bag','Resealable Poly Bag','Hang-Hole Poly Bag']],['Apparel Bags',['Garment Poly Bag','Shirt Bag','Clothing Bag','Suit Bag']],['Specialty Bags',['Dust Bag','Drawstring Bag','Zip Bag','Reusable Garment Bag']]]),
retailCategory('Wrapping Supplies',[['Gift Wrap',['Wrapping Paper','Kraft Wrapping Paper','Printed Wrapping Paper']],['Tissue Packaging',['Tissue Paper','Printed Tissue','Custom Tissue']],['Protective Wrap',['Bubble Wrap','Stretch Film','Shrink Film']],['Decorative Wrap',['Ribbon','Twine','Raffia','Decorative String']]]),
retailCategory('Fulfillment & Warehouse Supplies',[['Packing Supplies',['Packing Tape','Packing Paper','Bubble Wrap','Void Fill','Stretch Film']],['Warehouse Labels',['SKU Labels','Bin Labels','Shelf Labels','Barcode Labels','Inventory Labels']],['Shipping Supplies',['Shipping Boxes','Poly Mailers','Shipping Envelopes','Shipping Labels','Document Pouches']],['Pallet & Bulk Packaging',['Pallet Wrap','Pallet Covers','Edge Protectors','Strapping','Pallet Labels']]])];
const retailImage=(title:string)=>svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900"><rect width="1200" height="900" fill="#f3eee3"/><rect x="310" y="245" width="580" height="390" fill="#c99a68" stroke="#4a2e18" stroke-width="14"/><path d="M310 245l290-115 290 115" fill="#e3bd8d" stroke="#4a2e18" stroke-width="14"/><text x="600" y="780" text-anchor="middle" font-family="Arial" font-size="34" font-weight="700" fill="#4a2e18">${escapeSvgText(title)}</text></svg>`);
const RETAIL_ECOMMERCE_NODES:CatalogNode[]=RETAIL_ECOMMERCE_DEFINITIONS.map(c=>({id:c.id,slug:c.slug,title:c.title,subtitle:c.subtitle,description:c.description,image:retailImage(c.title),images:[1,2,3].map(i=>({key:`${c.slug}-${i}`,url:retailImage(c.title)})),children:c.subcategories.map(s=>({id:s.id,slug:s.slug,title:s.title,subtitle:s.subtitle,description:s.description,image:retailImage(s.title),images:[1,2,3].map(i=>({key:`${s.slug}-${i}`,url:retailImage(s.title)})),children:s.products.map(p=>({id:p.id,slug:p.slug,title:p.title,subtitle:p.subtitle,description:p.description,image:retailImage(p.title),images:[1,2,3].map(i=>({key:`${p.slug}-${i}`,url:retailImage(p.title)})),features:p.features,benefits:p.features,applications:[p.useCase],specifications:[{label:'Format',value:p.subcategory},{label:'Material',value:'Specified for retail or fulfillment use'},{label:'Print',value:'Custom branding where applicable'}]}))}))}));

export const CATALOG_ROOT: CatalogNode[] = [
  {
    id: "boxes",
    slug: "boxes",
    title: "Boxes",
    subtitle: "Custom Packaging Boxes",
    image: images.boxes,
    description:
      "From shelf-ready cartons to protective transit shippers, our box structures are engineered around your product, brand, and fulfilment flow.",
    children: BOX_CATEGORY_NODES,
    /* Superseded box nodes retained below temporarily for historical context.
      {
        slug: "folding-cartons",
        title: "Folding Cartons",
        subtitle: "Printed paperboard cartons",
        image: images.folding,
        description:
          "Lightweight, high-impact cartons tailored to retail products, with precise closures and premium print treatments.",
        children: [
          leaf(
            "straight-tuck-end",
            "Straight Tuck End Boxes",
            "Clean, retail-ready tuck cartons",
            images.folding,
            "Straight tuck end cartons use closures that fold in the same direction for a neat front-facing retail presentation.",
            boxSpecs,
            [
              "Cosmetics and skincare",
              "Pharmaceuticals",
              "Food and confectionery",
            ],
          ),
          leaf(
            "reverse-tuck-end",
            "Reverse Tuck End Boxes",
            "Efficient opposing tuck closures",
            images.folding,
            "Reverse tuck end boxes offer economical assembly and a reliable closure for lightweight retail products.",
            boxSpecs,
            ["Supplements", "Personal care", "Consumer goods"],
          ),
          leaf(
            "auto-lock-bottom",
            "Auto Lock Bottom Boxes",
            "Pre-glued, load-bearing base",
            images.folding,
            "Auto-lock bottom cartons arrive pre-glued for rapid packing and a sturdier base beneath heavier products.",
            boxSpecs,
            ["Bottles and jars", "Candles", "Specialty retail"],
          ),
          leaf(
            "snap-lock-bottom",
            "Snap Lock Bottom Boxes",
            "Secure interlocking carton base",
            images.folding,
            "Snap lock bottom boxes combine flat shipping with a strong manually assembled base.",
            boxSpecs,
            ["Food products", "Household items", "Retail kits"],
          ),
        ],
      },
      {
        slug: "rigid-boxes",
        title: "Rigid Boxes",
        subtitle: "Premium gift and presentation packaging",
        image: images.rigid,
        description:
          "A substantial unboxing experience with wrapped board construction, refined detailing, and optional custom inserts.",
        children: [
          leaf(
            "magnetic-closure",
            "Magnetic Closure Rigid Boxes",
            "A polished magnetic flap opening",
            images.rigid,
            "Magnetic closure boxes create a considered reveal with concealed magnets and a durable wrapped board shell.",
            boxSpecs,
            [
              "Luxury gifting",
              "Beauty and fragrance",
              "Corporate presentation",
            ],
          ),
          leaf(
            "two-piece-rigid",
            "Two-Piece Rigid Boxes",
            "Classic lift-off lid and base",
            images.rigid,
            "Two-piece rigid boxes give products a timeless premium presentation with a separate lid and base.",
            boxSpecs,
            ["Apparel", "Jewellery", "Premium gifting"],
          ),
          leaf(
            "drawer-style",
            "Drawer Style Rigid Boxes",
            "Sliding tray and sleeve structure",
            images.rigid,
            "Drawer boxes pair a pull-out tray with a branded sleeve for a tactile, memorable opening.",
            boxSpecs,
            ["Accessories", "Technology", "Subscription boxes"],
          ),
        ],
      },
      {
        slug: "corrugated-boxes",
        title: "Corrugated Boxes",
        subtitle: "Protective shipping and e-commerce structures",
        image: images.corrugated,
        description:
          "Durable corrugated packaging engineered for product protection, storage efficiency, and dependable delivery.",
        children: [
          leaf(
            "regular-slotted-container",
            "Regular Slotted Containers",
            "The dependable taped shipping carton",
            images.corrugated,
            "RSC shippers are the versatile standard for transport, with four flaps meeting neatly at the centre.",
            [
              { label: "Board", value: "3 ply, 5 ply, or 7 ply corrugated" },
              { label: "Flute", value: "B, C, E, or double-wall combinations" },
              {
                label: "Load capacity",
                value: "Specified to product weight and stacking needs",
              },
              {
                label: "Printing",
                value: "Flexographic or litho-laminated custom print",
              },
            ],
            ["E-commerce orders", "Warehouse storage", "B2B shipment"],
          ),
          leaf(
            "mailer-boxes",
            "Mailer Boxes",
            "Self-locking e-commerce packaging",
            images.corrugated,
            "Self-locking mailers protect products in transit while turning delivery into a branded unboxing moment.",
            [
              { label: "Board", value: "E-flute or B-flute corrugated" },
              { label: "Closure", value: "Integrated self-locking tabs" },
              {
                label: "Printing",
                value: "Inside, outside, or full-coverage print",
              },
              { label: "Size", value: "Custom die-cut dimensions" },
            ],
            ["Subscription programs", "DTC retail", "Welcome kits"],
          ),
          leaf(
            "double-wall-corrugated",
            "Double-Wall Corrugated Boxes",
            "Extra compression and impact strength",
            images.corrugated,
            "Double-wall corrugated cartons use two corrugated mediums for products requiring added protection in the supply chain.",
            [
              { label: "Board", value: "5 ply double-wall corrugated" },
              { label: "Flute", value: "BC, EB, or customised combination" },
              {
                label: "Load capacity",
                value: "High stacking and transport strength",
              },
              { label: "Surface", value: "Kraft, white top, or printed liner" },
            ],
            ["Heavy retail goods", "Industrial components", "Export shipments"],
          ),
        ],
      },
    ], */
  },
    /* Superseded starter flexible nodes retained below for historical context.
      {
        slug: "pouches",
        title: "Pouches",
        subtitle: "Resealable flexible packaging",
        image: images.pouch,
        description:
          "Purpose-built pouches combine the right barrier, format, and closure for fresh, convenient consumer products.",
        children: [
          leaf(
            "stand-up-pouches",
            "Stand-Up Pouches",
            "Shelf-standing gusseted pouches",
            images.pouch,
            "Stand-up pouches give products a stable shelf presence while reducing packaging weight and material use.",
            [
              {
                label: "Film",
                value: "PET, PE, kraft laminate, or high-barrier film",
              },
              {
                label: "Closure",
                value: "Zipper, tear notch, or spout options",
              },
              {
                label: "Barrier",
                value: "Matched to moisture, oxygen, and aroma needs",
              },
              {
                label: "Print",
                value: "Full-colour rotogravure or digital print",
              },
            ],
            ["Coffee and tea", "Snacks", "Pet food"],
          ),
          leaf(
            "flat-pouches",
            "Flat & Three-Side Seal Pouches",
            "Compact single-serve formats",
            images.pouch,
            "Three-side seal pouches provide a neat, compact format for portions, samples, and lightweight products.",
            [
              { label: "Film", value: "Multi-layer barrier film options" },
              { label: "Seal", value: "Three-side heat seal" },
              { label: "Size", value: "Custom width and height" },
              {
                label: "Finish",
                value: "Matte, gloss, clear window, or metallic",
              },
            ],
            ["Samples", "Spices", "Single-serve products"],
          ),
        ],
      },
      {
        slug: "specialty-film",
        title: "Specialty Film",
        subtitle: "Functional flexible material solutions",
        image: images.pouch,
        description:
          "Flexible film formats for automated filling, portion control, and protective packing.",
        children: [
          leaf(
            "rollstock-film",
            "Rollstock Film",
            "Form-fill-seal ready film",
            images.pouch,
            "Rollstock is supplied to specification for efficient automated packaging lines and consistent product protection.",
            [
              { label: "Structure", value: "Custom multi-layer laminate" },
              {
                label: "Format",
                value: "Roll width and repeat to machine specification",
              },
              { label: "Barrier", value: "Standard to high barrier options" },
              { label: "Print", value: "Registered multi-colour print" },
            ],
            [
              "Food packing lines",
              "Personal care",
              "High-volume manufacturing",
            ],
          ),
        ],
      },
    ], */
  {
    id: "labels-stickers",
    slug: "labels-stickers",
    title: "Labels & Stickers",
    subtitle: "Adhesive product identity",
    image: images.labels,
    description:
      "Distinctive product labels, promotional stickers, and operational identifiers made for the right surface and handling conditions.",
    children: LABELS_STICKERS_NODES,
    /* Superseded starter Labels & Stickers nodes retained below for historical context.
      {
        slug: "product-labels",
        title: "Product Labels",
        subtitle: "Labels tailored to the product surface",
        image: images.labels,
        description:
          "Material, adhesive, shape, and finish work together to give every product a crisp, durable identity.",
        children: [
          leaf(
            "roll-labels",
            "Roll Labels",
            "Fast manual or machine application",
            images.labels,
            "Roll labels are supplied for clean, consistent application across high-volume product runs.",
            [
              {
                label: "Face stock",
                value: "Paper, PP, PE, clear film, or metallic",
              },
              {
                label: "Adhesive",
                value: "Permanent, removable, freezer, or wash-off",
              },
              { label: "Format", value: "Custom die-cut roll labels" },
              { label: "Finish", value: "Matte, gloss, foil, or spot UV" },
            ],
            ["Bottles and jars", "Cosmetics", "Food and beverage"],
          ),
          leaf(
            "waterproof-labels",
            "Waterproof Labels",
            "Durable film labels for wet handling",
            images.labels,
            "Waterproof labels use resilient film stocks and adhesives for products exposed to moisture, chilling, or handling.",
            [
              { label: "Face stock", value: "Water-resistant PP or PE film" },
              {
                label: "Adhesive",
                value: "Permanent moisture-resistant adhesive",
              },
              {
                label: "Print",
                value: "Water-resistant ink and protective laminate",
              },
              { label: "Shape", value: "Custom die-cut or standard form" },
            ],
            ["Beverages", "Bath and body", "Chilled products"],
          ),
        ],
      },
      {
        slug: "stickers",
        title: "Stickers",
        subtitle: "Promotional and brand-forward stickers",
        image: images.labels,
        description:
          "Flexible sticker formats for product add-ons, packaging seals, campaigns, and customer moments.",
        children: [
          leaf(
            "die-cut-stickers",
            "Die-Cut Stickers",
            "Custom contour-cut brand stickers",
            images.labels,
            "Die-cut stickers follow your exact artwork outline for a distinctive, collectable branded finish.",
            [
              {
                label: "Material",
                value: "Paper, vinyl, clear film, or metallic",
              },
              { label: "Cut", value: "Custom contour die-cut" },
              { label: "Finish", value: "Matte, gloss, or laminate" },
              { label: "Adhesive", value: "Permanent or removable" },
            ],
            ["Promotions", "Packaging seals", "Brand merchandise"],
          ),
        ],
      },
    ], */
  },
  {
    id: "retail-ecommerce-supplies",
    slug: "retail-ecommerce-supplies",
    title: "Retail & E-Commerce",
    subtitle: "Packing station essentials",
    image: images.ecommerce,
    description:
      "The dependable materials behind protected deliveries, efficient packing stations, and thoughtful branded unboxing.",
    children: RETAIL_ECOMMERCE_NODES,
    /* Superseded starter retail nodes retained below for historical context.
      {
        slug: "shipping-supplies",
        title: "Shipping Supplies",
        subtitle: "Reliable protection for every delivery",
        image: images.mailer,
        description:
          "Practical shipping materials chosen for speed, protection, and a consistent customer experience.",
        children: [
          leaf(
            "poly-mailers",
            "Poly Mailers",
            "Lightweight self-seal shipping",
            images.mailer,
            "Poly mailers offer a lightweight, weather-resistant outer layer for soft goods and non-fragile orders.",
            [
              {
                label: "Material",
                value: "LDPE or recycled-content co-extruded film",
              },
              { label: "Closure", value: "Tamper-evident self-seal strip" },
              { label: "Print", value: "Custom one- to full-colour print" },
              { label: "Size", value: "Custom or standard mailer sizes" },
            ],
            ["Apparel", "Soft goods", "E-commerce fulfilment"],
          ),
          leaf(
            "bubble-mailers",
            "Bubble Mailers",
            "Built-in padded protection",
            images.mailer,
            "Bubble mailers pair a protective cushioning layer with a self-sealing exterior for compact fragile items.",
            [
              { label: "Outer material", value: "Kraft paper or poly film" },
              { label: "Cushioning", value: "Integrated bubble lining" },
              { label: "Closure", value: "Peel-and-seal flap" },
              { label: "Size", value: "Standard and custom dimensions" },
            ],
            ["Books and media", "Small electronics", "Delicate accessories"],
          ),
        ],
      },
      {
        slug: "unboxing-supplies",
        title: "Unboxing Supplies",
        subtitle: "Thoughtful finishing touches",
        image: images.ecommerce,
        description:
          "Materials that protect the order, elevate presentation, and make your packaging experience feel complete.",
        children: [
          leaf(
            "tissue-paper",
            "Tissue Paper",
            "Branded presentation wrap",
            images.ecommerce,
            "Custom tissue adds a light, premium layer around products and keeps presentations tidy inside the box.",
            [
              {
                label: "Paper",
                value: "17–30 gsm tissue, including recycled options",
              },
              { label: "Print", value: "One- or multi-colour custom print" },
              { label: "Sheet size", value: "Custom cut sheets or rolls" },
              { label: "Finish", value: "Soft, lightweight, protective wrap" },
            ],
            ["Apparel", "Gift packaging", "Subscription boxes"],
          ),
        ],
      },
    ], */
  },
];

export const findCatalogPath = (
  segments: string[],
): CatalogMatch | undefined => {
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

export const catalogPath = (ancestors: CatalogNode[]) =>
  `/products/${ancestors.map(({ slug }) => slug).join("/")}`;
