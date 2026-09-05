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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ----------------------------------------------------------------------- */}
          {/* LEFT COLUMN: IMAGE GALLERY & SHARE TOOLS */}
          {/* ----------------------------------------------------------------------- */}
          <div className="lg:col-span-6 space-y-5 lg:sticky lg:top-28">
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

          {/* ----------------------------------------------------------------------- */}
          {/* RIGHT COLUMN: PACKAGING SPECIFICATION CONFIGURATOR */}
          {/* ----------------------------------------------------------------------- */}
          <div className="lg:col-span-6 space-y-6">
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

            {/* CONFIGURATOR CARD CONTAINER */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#0A1930]/15 shadow-md space-y-6">
              <div className="flex items-center justify-between border-b border-[#0A1930]/10 pb-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#0A1930]">
                  <Sliders className="w-4 h-4 text-[#FF9933]" />
                  <span>Packaging Specification Configurator</span>
                </div>
                <span className="text-[11px] font-mono text-[#2F6FED] font-semibold">
                  Custom Specifications
                </span>
              </div>

              {/* 1. PRINTING SELECTOR (Custom Radio-Cards) */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#0A1930] font-bold mb-2">
                  1. Printing Specification
                </label>
                <div role="radiogroup" aria-label="Printing specification" className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {product.printingOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      role="radio"
                      aria-checked={selectedPrinting?.id === opt.id}
                      onClick={() => setSelectedPrinting(opt)}
                      className={`p-3 rounded-xl border text-left transition-all relative cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9933] ${
                        selectedPrinting?.id === opt.id
                          ? 'border-[#FF9933] bg-[#FF9933]/5 ring-1 ring-[#FF9933] shadow-sm'
                          : 'border-[#0A1930]/15 hover:border-[#0A1930]/40 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-[#0A1930]">{opt.name}</span>
                        {selectedPrinting?.id === opt.id && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#FF9933] shrink-0" />
                        )}
                      </div>
                      <p className="text-[11px] text-[#12295A]/70 leading-snug">
                        {opt.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. BOX SIZE SELECTOR (Preset Pill Grid) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#0A1930] font-bold">
                    2. Packaging Dimensions (L × W × H)
                  </label>
                  <span className="text-[11px] font-mono text-[#12295A]/70">
                    Selected: <strong className="text-[#0A1930]">{selectedSize?.dimensionsCm}</strong>
                  </span>
                </div>

                <div role="radiogroup" aria-label="Packaging dimensions" className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size.id}
                      type="button"
                      role="radio"
                      aria-checked={selectedSize?.id === size.id}
                      aria-label={`${size.label}: ${size.dimensionsCm}`}
                      onClick={() => setSelectedSize(size)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9933] ${
                        selectedSize?.id === size.id
                          ? 'border-[#FF9933] bg-[#FF9933]/5 ring-1 ring-[#FF9933]'
                          : 'border-[#0A1930]/15 hover:border-[#0A1930]/40 bg-white'
                      }`}
                    >
                      <div className="text-xs font-bold text-[#0A1930] truncate">
                        {size.label}
                      </div>
                      <div className="text-[11px] font-mono text-[#2F6FED] font-semibold mt-0.5">
                        {size.dimensionsCm}
                      </div>
                      <div className="text-[10px] text-[#12295A]/60 truncate mt-0.5">
                        {size.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. QUANTITY SELECTOR (Preset Production Tiers) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#0A1930] font-bold">
                    3. Production Quantity (Units)
                  </label>
                  <span className="text-[11px] font-mono text-slate-500">
                    MOQ: {product.minQuantity.toLocaleString()} pcs
                  </span>
                </div>

                <div role="radiogroup" aria-label="Production quantity" className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {product.quantityTiers.map((tier) => (
                    <button
                      key={tier.quantity}
                      type="button"
                      role="radio"
                      aria-checked={selectedQuantity === tier.quantity}
                      aria-label={`${tier.quantity.toLocaleString()} units`}
                      onClick={() => setSelectedQuantity(tier.quantity)}
                      className={`py-2 px-2 rounded-xl border text-center transition-all cursor-pointer relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9933] ${
                        selectedQuantity === tier.quantity
                          ? 'border-[#0A1930] bg-[#0A1930] text-white shadow-sm'
                          : 'border-[#0A1930]/15 hover:border-[#0A1930]/40 bg-white text-[#0A1930]'
                      }`}
                    >
                      <div className="text-xs font-mono font-bold">
                        {tier.quantity.toLocaleString()}
                      </div>
                      <div className="text-[9px] font-mono text-slate-400 mt-0.5">
                        {tier.quantity === product.minQuantity ? 'Base MOQ' : 'Volume Tier'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. PAPER / MATERIAL SELECTOR (Swatch Style Cards) */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#0A1930] font-bold mb-2">
                  4. Substrate &amp; Board Material
                </label>
                <div role="radiogroup" aria-label="Substrate and board material" className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {product.materials.map((mat) => (
                    <button
                      key={mat.id}
                      type="button"
                      role="radio"
                      aria-checked={selectedMaterial?.id === mat.id}
                      aria-label={`${mat.name}: ${mat.gsm}`}
                      onClick={() => setSelectedMaterial(mat)}
                      className={`p-3 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9933] ${
                        selectedMaterial?.id === mat.id
                          ? 'border-[#FF9933] bg-[#FF9933]/5 ring-1 ring-[#FF9933] shadow-sm'
                          : 'border-[#0A1930]/15 hover:border-[#0A1930]/40 bg-white'
                      }`}
                    >
                      {/* Swatch Circle */}
                      <span
                        className="w-5 h-5 rounded-full border border-slate-300 shadow-inner shrink-0 mt-0.5"
                        style={{
                          background: mat.swatchColor,
                        }}
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-[#0A1930] truncate">
                            {mat.name}
                          </span>
                        </div>
                        <span className="inline-block text-[10px] font-mono font-bold text-[#2F6FED]">
                          {mat.gsm}
                        </span>
                        <p className="text-[10px] text-[#12295A]/70 leading-tight mt-0.5 line-clamp-2">
                          {mat.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. FINISHING & EMBELLISHMENTS */}
              <div className="space-y-4 pt-1 border-t border-[#0A1930]/10">
                <label className="block text-xs font-mono uppercase tracking-wider text-[#0A1930] font-bold">
                  5. Coating, Embossing &amp; Foiling
                </label>

                {/* Coating / Lamination Pills */}
                <div>
                  <span className="text-[11px] font-mono text-[#12295A]/80 block mb-1.5">
                    Coating / Lamination:
                  </span>
                  <div role="radiogroup" aria-label="Coating or lamination" className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {product.coatings.map((coat) => (
                      <button
                        key={coat.id}
                        type="button"
                        role="radio"
                        aria-checked={selectedCoating?.id === coat.id}
                        aria-label={`Coating: ${coat.name}`}
                        onClick={() => setSelectedCoating(coat)}
                        className={`p-2 rounded-lg border text-left text-xs transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9933] ${
                          selectedCoating?.id === coat.id
                            ? 'border-[#FF9933] bg-[#FF9933]/10 font-bold text-[#0A1930]'
                            : 'border-[#0A1930]/15 hover:border-[#0A1930]/30 text-[#12295A]/80'
                        }`}
                      >
                        <div className="font-semibold truncate">{coat.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Embossing Toggle & Foiling Swatches */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  {/* Embossing Switch */}
                  <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#0A1930]/10 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-[#0A1930]">Emboss / Deboss</div>
                      <div className="text-[10px] text-[#12295A]/70">Tactile relief plate</div>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={isEmbossed}
                      aria-label="Toggle Emboss or Deboss relief plate"
                      onClick={() => setIsEmbossed(!isEmbossed)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9933] focus-visible:ring-offset-2 ${
                        isEmbossed ? 'bg-[#FF9933]' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          isEmbossed ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Foiling Selector */}
                  <div>
                    <span className="text-[11px] font-mono text-[#12295A]/80 block mb-1.5">
                      Hot Metallic Foil:
                    </span>
                    <div role="radiogroup" aria-label="Hot metallic foil" className="flex items-center gap-1.5 flex-wrap">
                      {product.foilOptions.map((foil) => (
                        <button
                          key={foil.id}
                          type="button"
                          role="radio"
                          aria-checked={selectedFoil?.id === foil.id}
                          aria-label={`Metallic foil: ${foil.name}`}
                          onClick={() => setSelectedFoil(foil)}
                          title={foil.name}
                          className={`p-1.5 rounded-lg border text-xs flex items-center gap-1.5 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9933] ${
                            selectedFoil?.id === foil.id
                              ? 'border-[#0A1930] bg-[#0A1930] text-white font-bold ring-1 ring-[#0A1930]'
                              : 'border-[#0A1930]/15 hover:border-[#0A1930]/40 bg-white text-[#0A1930]'
                          }`}
                        >
                          <span
                            className="w-3 h-3 rounded-full border border-slate-300 shrink-0"
                            style={{
                              background: foil.swatchColor,
                            }}
                          />
                          <span className="text-[10px] font-mono truncate">{foil.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* =================================================================== */}
              {/* YOUR SELECTED SPECIFICATION SUMMARY CARD (NO PRICES DISPLAYED) */}
              {/* =================================================================== */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F2] border border-[#0A1930]/15 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-[#0A1930]/10 pb-2.5">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[#FF9933]" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0A1930]">
                      Your Selected Specification
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#0A1930] text-white text-[10px] font-mono font-medium">
                    Pricing on Request
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs font-mono">
                  <div className="flex items-baseline justify-between border-b border-[#0A1930]/5 pb-1">
                    <span className="text-slate-500">Printing:</span>
                    <span className="font-bold text-[#0A1930] text-right truncate ml-2">
                      {selectedPrinting?.name}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between border-b border-[#0A1930]/5 pb-1">
                    <span className="text-slate-500">Size:</span>
                    <span className="font-bold text-[#0A1930] text-right truncate ml-2">
                      {selectedSize?.label}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between border-b border-[#0A1930]/5 pb-1">
                    <span className="text-slate-500">Quantity:</span>
                    <span className="font-bold text-[#0A1930] text-right ml-2">
                      {selectedQuantity.toLocaleString()} pcs
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between border-b border-[#0A1930]/5 pb-1">
                    <span className="text-slate-500">Material:</span>
                    <span className="font-bold text-[#0A1930] text-right truncate ml-2">
                      {selectedMaterial?.name} ({selectedMaterial?.gsm})
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between border-b border-[#0A1930]/5 pb-1">
                    <span className="text-slate-500">Coating:</span>
                    <span className="font-bold text-[#0A1930] text-right truncate ml-2">
                      {selectedCoating?.name}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between border-b border-[#0A1930]/5 pb-1">
                    <span className="text-slate-500">Embossing:</span>
                    <span className="font-bold text-[#0A1930] text-right ml-2">
                      {isEmbossed ? 'Yes (Tactile Relief)' : 'None'}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between border-b border-[#0A1930]/5 pb-1 sm:col-span-2">
                    <span className="text-slate-500">Foiling:</span>
                    <span className="font-bold text-[#0A1930] text-right truncate ml-2">
                      {selectedFoil?.name}
                    </span>
                  </div>
                </div>

                <div className="pt-1.5 flex items-center justify-between text-[11px] font-mono text-slate-500 border-t border-[#0A1930]/10 flex-wrap gap-2">
                  <span>
                    Standard Lead Time: <strong className="text-[#0A1930]">{product.leadTime}</strong>
                  </span>
                  <span className="text-[#2F6FED] font-semibold">
                    Direct Quote via WhatsApp / Email
                  </span>
                </div>
              </div>

              {/* =================================================================== */}
              {/* DESIGN FILE UPLOAD SECTION */}
              {/* =================================================================== */}
              <div className="space-y-3 pt-1 border-t border-[#0A1930]/10">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#0A1930] font-bold">
                    6. Optional Artwork / Design File
                  </label>
                  <span className="text-[10px] font-mono text-slate-500">
                    PDF, AI, PSD, EPS, PNG, ZIP (Max 50MB)
                  </span>
                </div>

                {/* Hidden File Input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.ai,.psd,.eps,.png,.jpg,.jpeg,.zip"
                  className="hidden"
                />

                {/* Dropzone Container */}
                {!uploadedFile ? (
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`p-5 rounded-xl border-2 border-dashed text-center cursor-pointer transition-all ${
                      isDragging
                        ? 'border-[#FF9933] bg-[#FF9933]/10'
                        : 'border-[#0A1930]/20 hover:border-[#FF9933] bg-[#FAF7F2]/60 hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <Upload className="w-6 h-6 text-[#FF9933] mx-auto mb-1.5" />
                    <div className="text-xs font-bold text-[#0A1930]">
                      Drag &amp; drop your dieline/artwork here, or{' '}
                      <span className="text-[#2F6FED] underline">browse</span>
                    </div>
                    <p className="text-[10px] text-[#12295A]/60 mt-0.5">
                      Don't have artwork yet? You can still request a quote and send it later.
                    </p>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <FileCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-emerald-950 truncate">
                          {uploadedFile.name}
                        </div>
                        <div className="text-[10px] font-mono text-emerald-700">
                          {uploadedFile.size} • Ready for Pre-Flight Check
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      aria-label="Remove uploaded file"
                      className="p-1 rounded-lg hover:bg-emerald-100 text-emerald-800 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Alternative Quick Design Actions */}
                <div className="flex items-center justify-between gap-2 text-xs font-mono pt-1">
                  <a
                    href="https://wa.me/919876543210?text=Hi%20AGL%20Creatives,%20I%20have%20artwork%20files%20to%20share%20for%20a%20packaging%20quote."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#128C7E] hover:underline flex items-center gap-1"
                  >
                    <span>Share Design on WhatsApp →</span>
                  </a>
                  <a
                    href="mailto:design@aglcreatives.com?subject=Artwork Submission for Packaging Quote"
                    className="text-[#2F6FED] hover:underline flex items-center gap-1"
                  >
                    <span>Email Design Later →</span>
                  </a>
                </div>
              </div>

              {/* =================================================================== */}
              {/* TWO FINAL CTA ACTION BUTTONS */}
              {/* =================================================================== */}
              <div className="space-y-2.5 pt-2">
                {/* 1. Solid Saffron WhatsApp CTA with prefilled specs */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-5 rounded-xl bg-[#FF9933] hover:bg-[#e08322] text-[#0A1930] font-bold text-sm sm:text-base transition-all transform active:scale-[0.99] flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Enquiry on WhatsApp →</span>
                </a>

                {/* 2. Outlined Navy Email CTA */}
                <a
                  href={emailUrl}
                  className="w-full py-3 px-5 rounded-xl border-2 border-[#0A1930] hover:bg-[#0A1930] hover:text-white text-[#0A1930] font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email This Quote Specification</span>
                </a>

                {/* Studio Consultation Notice */}
                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={onOpenQuoteModal}
                    className="text-xs font-mono text-[#12295A]/80 hover:text-[#FF9933] hover:underline cursor-pointer"
                  >
                    Need bespoke sampling or CAD engineering support? Open Studio Request →
                  </button>
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
                <span>View Full 8-Format Catalog</span>
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
                        to={`/products/${rel.slug}`}
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
