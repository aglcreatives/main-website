import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Share2,
  Copy,
  Check,
  Mail,
  Upload,
  FileText,
  X,
  ChevronDown,
  Layers,
  ShieldCheck,
  Sparkles,
  Leaf,
  Printer,
  Scissors,
  Box,
  Clock,
  CheckCircle2,
  PhoneCall,
  ExternalLink,
  ChevronRight,
  Sliders,
  Award,
  FileCheck,
  MessageSquare,
} from 'lucide-react';
import {
  PRODUCTS,
  Product,
  ProductSize,
  ProductMaterial,
  PrintingOption,
  CoatingOption,
  FoilOption,
  ProductCategory,
} from '../data/products';

interface ProductDetailPageProps {
  onOpenQuoteModal: () => void;
}

// Icon renderer helper for specification cards
const renderSpecIcon = (iconName: string) => {
  const props = { className: 'w-5 h-5 text-[#FF9933]' };
  switch (iconName) {
    case 'Scissors':
      return <Scissors {...props} />;
    case 'Printer':
      return <Printer {...props} />;
    case 'ShieldCheck':
      return <ShieldCheck {...props} />;
    case 'Leaf':
      return <Leaf {...props} />;
    case 'Box':
      return <Box {...props} />;
    case 'Layers':
      return <Layers {...props} />;
    case 'Sparkles':
      return <Sparkles {...props} />;
    case 'Clock':
      return <Clock {...props} />;
    default:
      return <ShieldCheck {...props} />;
  }
};

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ onOpenQuoteModal }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Find product by slug, or fallback to first product
  const product: Product = useMemo(() => {
    const found = PRODUCTS.find((p) => p.slug === slug);
    return found || PRODUCTS[0];
  }, [slug]);

  // Gallery state
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Reset gallery on product change
  useEffect(() => {
    setActiveImageIndex(0);
  }, [slug]);

  // Configurator state
  const [selectedPrinting, setSelectedPrinting] = useState<PrintingOption>(
    product.printingOptions[0]
  );
  const [selectedSize, setSelectedSize] = useState<ProductSize>(product.sizes[0]);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(
    product.quantityTiers[0]?.quantity || 500
  );
  const [selectedMaterial, setSelectedMaterial] = useState<ProductMaterial>(
    product.materials[0]
  );
  const [selectedCoating, setSelectedCoating] = useState<CoatingOption>(
    product.coatings[0]
  );
  const [isEmbossed, setIsEmbossed] = useState<boolean>(false);
  const [selectedFoil, setSelectedFoil] = useState<FoilOption>(product.foilOptions[0]);

  // Design file upload state
  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    size: string;
  } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sharing toast state
  const [copiedToast, setCopiedToast] = useState(false);

  // FAQ open index state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Reset configurator defaults when product changes
  useEffect(() => {
    if (product) {
      setSelectedPrinting(product.printingOptions[0]);
      setSelectedSize(product.sizes[0]);
      setSelectedQuantity(product.quantityTiers[0]?.quantity || 500);
      setSelectedMaterial(product.materials[0]);
      setSelectedCoating(product.coatings[0]);
      setIsEmbossed(false);
      setSelectedFoil(product.foilOptions[0]);
      setUploadedFile(null);
      setOpenFaqIndex(0);
    }
  }, [product]);

  // Gallery images array
  const gallery = useMemo(() => {
    return (
      product?.galleryImages || [
        {
          url: product?.mainImageUrl || '',
          alt: product?.name || '',
          caption: 'Primary product view',
        },
      ]
    );
  }, [product]);

  // FAQ list including exact pricing guidance question
  const productFaqs = useMemo(() => {
    if (!product) return [];
    const list = product.faqs ? [...product.faqs] : [];
    if (!list.some((f) => f.question.toLowerCase().includes('exact pricing'))) {
      list.push({
        question: 'How do I get exact pricing?',
        answer: 'Submit your specification via WhatsApp or email and our team responds with pricing within 24 hours.',
      });
    }
    return list;
  }, [product]);

  // Cycle gallery next / prev
  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  // Related products (from same category or other catalog items)
  const relatedProducts = useMemo(() => {
    const others = PRODUCTS.filter((p) => p.id !== product.id);
    const sameCategory = others.filter((p) => p.category === product.category);
    if (sameCategory.length >= 3) {
      return sameCategory.slice(0, 4);
    }
    return [...sameCategory, ...others.filter((p) => p.category !== product.category)].slice(0, 4);
  }, [product]);

  // Share handlers
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 3000);
  };

  // Generate WhatsApp prefilled message with full specification summary (asking for pricing)
  const whatsappUrl = useMemo(() => {
    const embossingText = isEmbossed ? 'Yes (Tactile Relief)' : 'None';
    const message =
      `Hi AGL Creatives, I'd like a quote for: ${product.name} (SKU: ${product.sku})\n\n` +
      `📦 Product: ${product.name}\n` +
      `🖨️ Printing: ${selectedPrinting?.name}\n` +
      `📐 Size: ${selectedSize?.label} (${selectedSize?.dimensionsCm})\n` +
      `🔢 Qty: ${selectedQuantity.toLocaleString()} pcs\n` +
      `📄 Material: ${selectedMaterial?.name} (${selectedMaterial?.gsm})\n` +
      `✨ Coating: ${selectedCoating?.name}\n` +
      `⚜️ Embossing: ${embossingText}\n` +
      `🌟 Foiling: ${selectedFoil?.name}\n` +
      `${uploadedFile ? `📁 Artwork File: ${uploadedFile.name} (${uploadedFile.size})\n` : ''}` +
      `\n🌐 Link: ${window.location.href}\n\n` +
      `Please share pricing and lead time for this specification.`;

    return `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
  }, [
    product,
    selectedSize,
    selectedQuantity,
    selectedPrinting,
    selectedMaterial,
    selectedCoating,
    isEmbossed,
    selectedFoil,
    uploadedFile,
  ]);

  // Generate Email prefilled mailto link with full specification summary (asking for pricing)
  const emailUrl = useMemo(() => {
    const subject = `Quote Request: ${product.name} (${selectedQuantity.toLocaleString()} pcs) - AGL Creatives`;
    const embossingText = isEmbossed ? 'Yes (Tactile Relief)' : 'None';
    const body =
      `Hello AGL Creatives Team,\n\n` +
      `I would like to request custom pricing and production lead time for the following packaging specification:\n\n` +
      `Product: ${product.name} (SKU: ${product.sku})\n` +
      `Printing: ${selectedPrinting?.name}\n` +
      `Size: ${selectedSize?.label} (${selectedSize?.dimensionsCm})\n` +
      `Qty: ${selectedQuantity.toLocaleString()} pcs\n` +
      `Material: ${selectedMaterial?.name} (${selectedMaterial?.gsm})\n` +
      `Coating: ${selectedCoating?.name}\n` +
      `Embossing: ${embossingText}\n` +
      `Foiling: ${selectedFoil?.name}\n` +
      `${uploadedFile ? `Artwork Reference: ${uploadedFile.name} (${uploadedFile.size})\n` : ''}` +
      `Product Link: ${window.location.href}\n\n` +
      `Please share pricing and lead time for this configuration.\n\n` +
      `Best regards,`;

    return `mailto:hello@aglcreatives.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [
    product,
    selectedSize,
    selectedQuantity,
    selectedPrinting,
    selectedMaterial,
    selectedCoating,
    isEmbossed,
    selectedFoil,
    uploadedFile,
  ]);

  // File upload handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
      setUploadedFile({
        name: file.name,
        size: `${sizeMb} MB`,
      });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
      setUploadedFile({
        name: file.name,
        size: `${sizeMb} MB`,
      });
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="pt-24 sm:pt-28 md:pt-32 pb-24 sm:pb-32 bg-[#FAF7F2] min-h-screen text-[#161B22]">
      {/* Background Ambient Glow */}
      <div
        className="absolute top-24 right-10 w-96 h-96 rounded-full bg-[#2F6FED]/10 blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between gap-4 mb-6 text-xs font-mono text-[#12295A]/70">
          <div className="flex items-center gap-2 flex-wrap">
            <Link to="/" className="hover:text-[#FF9933] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/products" className="hover:text-[#FF9933] transition-colors">
              Products
            </Link>
            <span>/</span>
            <span className="text-[#12295A]/60">{product.category}</span>
            <span>/</span>
            <span className="text-[#0A1930] font-bold">{product.name}</span>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#0A1930] hover:text-[#FF9933] transition-colors shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Catalog</span>
          </Link>
        </div>

        {/* ========================================================================= */}
        {/* MAIN TWO-COLUMN SECTION (Image Gallery Left, Configurator Right) */}
        {/* ========================================================================= */}
        <div className="">
          {/* Header: Title, SKU & Tag */}
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-[#0A1930] text-[#FAF7F2] text-[10px] font-mono font-bold tracking-wider uppercase">
                  {product.categoryTag}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#FF9933]/15 text-[#D97706] text-[10px] font-mono font-bold">
                  SKU: {product.sku}
                </span>
                <span className="text-xs font-mono text-[#12295A]/60 ml-auto">
                  MOQ: {product.minQuantity.toLocaleString()} pcs
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-[#0A1930] tracking-tight">
                {product.name}
              </h1>

              <p className="mt-2 text-sm text-[#12295A]/80 leading-relaxed">
                {product.shortDescription}
              </p>
            </div>
          {/* ----------------------------------------------------------------------- */}
          {/* LEFT COLUMN: IMAGE GALLERY & SHARE TOOLS */}
          {/* ----------------------------------------------------------------------- */}
          <div className="mt-6 lg:col-span-6 space-y-5 lg:sticky lg:top-28">
            {/* Main Image Frame with Thin Navy Border */}
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-white border border-[#0A1930]/15 shadow-sm group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImageIndex}
                  src={gallery[activeImageIndex]?.url}
                  alt={gallery[activeImageIndex]?.alt || product.name}
                  referrerPolicy="no-referrer"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Prev / Next Buttons */}
              {gallery.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    aria-label="Previous product image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#0A1930]/75 hover:bg-[#0A1930] text-white flex items-center justify-center backdrop-blur-sm transition-all opacity-80 hover:opacity-100 hover:scale-105 shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9933]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextImage}
                    aria-label="Next product image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#0A1930]/75 hover:bg-[#0A1930] text-white flex items-center justify-center backdrop-blur-sm transition-all opacity-80 hover:opacity-100 hover:scale-105 shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9933]"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {/* Image Caption Pill Overlay */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                <span className="px-3 py-1 rounded-full bg-[#0A1930]/80 backdrop-blur-sm text-white text-[11px] font-mono">
                  {gallery[activeImageIndex]?.caption || 'Packaging Angle'}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#0A1930]/80 backdrop-blur-sm text-[#FF9933] text-[11px] font-mono font-bold">
                  {activeImageIndex + 1} / {gallery.length}
                </span>
              </div>
            </div>

            {/* Thumbnail Row (4-5 thumbnails with smooth swap) */}
            {gallery.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-4 gap-3">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    aria-label={`View image ${idx + 1}: ${img.caption || img.alt || product.name}`}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all p-0.5 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9933] ${
                      activeImageIndex === idx
                        ? 'border-[#FF9933] shadow-md ring-2 ring-[#FF9933]/20 scale-[1.02]'
                        : 'border-[#0A1930]/10 hover:border-[#0A1930]/40 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.alt || `${product.name} gallery image ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Share & Quick Inquiry Strip */}
            <div className="p-4 rounded-xl bg-white border border-[#0A1930]/10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-[#0A1930] font-mono font-bold">
                <Share2 className="w-3.5 h-3.5 text-[#FF9933]" />
                <span>Share this specification:</span>
              </div>

              <div className="flex items-center gap-2">
                {/* WhatsApp Share */}
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `Check out this custom packaging format: ${product.name} on AGL Creatives:\n${window.location.href}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share product specification on WhatsApp"
                  className="px-3 py-1.5 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] font-medium transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
                >
                  <span>WhatsApp</span>
                </a>

                {/* Email Share */}
                <a
                  href={`mailto:?subject=${encodeURIComponent(
                    `Packaging Review: ${product.name}`
                  )}&body=${encodeURIComponent(
                    `I thought you might be interested in this packaging structure from AGL Creatives:\n\n${product.name}\n${window.location.href}`
                  )}`}
                  aria-label="Share product specification via Email"
                  className="px-3 py-1.5 rounded-lg bg-[#2F6FED]/10 hover:bg-[#2F6FED]/20 text-[#2F6FED] font-medium transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F6FED]"
                >
                  <Mail className="w-3 h-3" />
                  <span>Email</span>
                </a>

                {/* Copy Link Button */}
                <button
                  type="button"
                  onClick={handleCopyLink}
                  aria-label={copiedToast ? 'Product link copied to clipboard' : 'Copy product link to clipboard'}
                  className="px-3 py-1.5 rounded-lg bg-[#0A1930]/5 hover:bg-[#0A1930]/10 text-[#0A1930] font-medium transition-colors flex items-center gap-1.5 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9933]"
                >
                  {copiedToast ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-600 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quality & Production Badges */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-white border border-[#0A1930]/10 flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#2F6FED] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-[#0A1930]">ISO 9001 Certified</div>
                  <div className="text-[11px] text-[#12295A]/70">G7 Master Color Accuracy</div>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white border border-[#0A1930]/10 flex items-start gap-2.5">
                <Clock className="w-5 h-5 text-[#FF9933] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-[#0A1930]">{product.leadTime}</div>
                  <div className="text-[11px] text-[#12295A]/70">Standard Production Lead</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* FULL WIDTH BOTTOM SECTIONS: DESCRIPTION, SPECS, RELATED & FAQS */}
        {/* ========================================================================= */}
        <div className="mt-16 sm:mt-24 space-y-16 sm:space-y-20 border-t border-[#0A1930]/10 pt-12 sm:pt-16">
          {/* SECTION 1: PRODUCT DESCRIPTION & STRUCTURAL ENGINEERING */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4">
              <div className="text-xs font-mono font-bold tracking-[0.2em] text-[#FF9933] uppercase mb-2">
                Craftsmanship &amp; Engineering
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#0A1930]">
                Precision Built for Retail &amp; Unboxing Impact
              </h2>
              <div className="mt-4 p-4 rounded-xl bg-white border border-[#0A1930]/10 text-xs space-y-2">
                <div className="font-bold text-[#0A1930] flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#FF9933]" />
                  <span>Production Guarantee</span>
                </div>
                <p className="text-[#12295A]/70 leading-relaxed">
                  Every run undergoes spectrophotometer color verification, die-crease elasticity testing, and 100% manual QC inspection prior to pallet wrapping.
                </p>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4 text-sm sm:text-base text-[#12295A]/85 leading-relaxed">
              {product.descriptionParagraphs?.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>

          {/* SECTION 2: SPECIFICATIONS (GRID OF 4-6 FEATURE CARDS) */}
          <div>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="text-xs font-mono font-bold tracking-[0.2em] text-[#FF9933] uppercase mb-1">
                Technical Specifications
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#0A1930]">
                Engineering Highlights &amp; Capabilities
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {product.specCards?.map((spec, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white border border-[#0A1930]/10 hover:border-[#FF9933]/60 transition-all hover:shadow-md space-y-2.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#0A1930]/5 flex items-center justify-center">
                    {renderSpecIcon(spec.iconName)}
                  </div>
                  <h3 className="text-sm font-bold text-[#0A1930]">{spec.title}</h3>
                  <p className="text-xs text-[#12295A]/70 leading-relaxed">
                    {spec.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 3: FREQUENTLY ASKED QUESTIONS (ACCORDION) */}
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <div className="text-xs font-mono font-bold tracking-[0.2em] text-[#FF9933] uppercase mb-1">
                Frequently Asked Questions
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#0A1930]">
                Got Questions About {product.name}?
              </h2>
            </div>

            <div className="space-y-3">
              {productFaqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-[#0A1930]/15 bg-white overflow-hidden transition-all shadow-sm"
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${idx}`}
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#0A1930] hover:text-[#FF9933] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9933]"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#0A1930] shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#FF9933]' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          id={`faq-answer-${idx}`}
                          role="region"
                          aria-label={faq.question}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs sm:text-sm text-[#12295A]/80 leading-relaxed border-t border-[#0A1930]/5 pt-3">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION 4: RELATED PRODUCTS CAROUSEL / GRID */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <div className="text-xs font-mono font-bold tracking-[0.2em] text-[#FF9933] uppercase mb-1">
                  Explore Complementary Formats
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#0A1930]">
                  Related Packaging Solutions
                </h2>
              </div>

              <Link
                to="/products"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#0A1930] hover:text-[#FF9933] transition-colors"
              >
                <span>View Full 16-Format Catalog</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  className="rounded-2xl bg-white border border-[#0A1930]/10 hover:border-[#FF9933]/60 transition-all hover:shadow-lg overflow-hidden flex flex-col group"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <img
                      src={rel.mainImageUrl}
                      alt={rel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2 py-0.5 rounded-full bg-[#0A1930]/80 backdrop-blur-sm text-white text-[10px] font-mono">
                        {rel.categoryTag}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-bold text-[#0A1930] group-hover:text-[#FF9933] transition-colors">
                        {rel.name}
                      </h3>
                      <p className="text-xs text-[#12295A]/70 line-clamp-2 mt-1">
                        {rel.shortDescription}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#0A1930]/5 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 block">Pricing</span>
                        <span className="text-xs font-mono font-bold text-[#0A1930]">
                          Custom Quote • MOQ {rel.minQuantity.toLocaleString()}
                        </span>
                      </div>

                      <Link
                        to={`/product/${rel.slug}`}
                        className="px-3 py-1.5 rounded-lg bg-[#FAF7F2] hover:bg-[#FF9933] text-[#0A1930] font-bold text-xs transition-colors flex items-center gap-1"
                      >
                        <span>Configure</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE STICKY BOTTOM BAR (Displays Selected Specs & Fast WhatsApp Enquiry) */}
      {/* ========================================================================= */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A1930] text-white p-3.5 px-4 border-t border-[#FF9933]/30 shadow-2xl backdrop-blur-lg flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[10px] font-mono text-slate-400 uppercase truncate">
            {selectedQuantity.toLocaleString()} pcs • {selectedSize?.label}
          </div>
          <div className="text-xs font-mono font-semibold text-[#FF9933] truncate">
            {product.name}
          </div>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Send WhatsApp enquiry with current specifications"
          className="py-2.5 px-4 rounded-xl bg-[#FF9933] hover:bg-[#e08322] text-[#0A1930] font-bold text-xs sm:text-sm shrink-0 flex items-center gap-1.5 shadow-md active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9933] focus-visible:ring-offset-2"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>WhatsApp Enquiry</span>
        </a>
      </div>
    </div>
  );
};
