import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  Search,
  CheckCircle2,
  Boxes,
  Package,
  ShoppingBag,
  Tag,
  FileText,
  Utensils,
  Layers,
  Clock,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import {
  PRODUCTS,
  PRODUCT_CATEGORIES,
  Product,
  ProductCategory,
} from '../data/products';

interface ProductsPageProps {
  onOpenQuoteModal: () => void;
}

// Category icon helper
const getCategoryIcon = (category: ProductCategory) => {
  switch (category) {
    case 'E-commerce Boxes':
      return <Package className="w-3.5 h-3.5" />;
    case 'Rigid & Gift Boxes':
      return <Boxes className="w-3.5 h-3.5" />;
    case 'Pouches & Bags':
      return <ShoppingBag className="w-3.5 h-3.5" />;
    case 'Labels & Stickers':
      return <Tag className="w-3.5 h-3.5" />;
    case 'Corporate Print':
      return <FileText className="w-3.5 h-3.5" />;
    case 'Food Packaging':
      return <Utensils className="w-3.5 h-3.5" />;
    default:
      return <Layers className="w-3.5 h-3.5" />;
  }
};

export const ProductsPage: React.FC<ProductsPageProps> = ({ onOpenQuoteModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.categoryTag.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="pt-24 sm:pt-28 md:pt-32 pb-20 sm:pb-28 bg-[#FAF7F2] min-h-screen text-[#161B22]">
      {/* Background Decorative Ambient Glows */}
      <div
        className="absolute top-20 right-0 w-[450px] h-[450px] rounded-full bg-[#2F6FED]/10 blur-[120px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute top-96 left-0 w-[400px] h-[400px] rounded-full bg-[#FF9933]/10 blur-[130px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF9933]/15 border border-[#FF9933]/30 text-[#0A1930] text-xs font-bold uppercase tracking-widest mb-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF9933]" />
            <span>OUR PRODUCTS</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0A1930] tracking-tight"
          >
            Custom Packaging Catalog
          </motion.h1>

          {/* Short Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-[#161B22]/80 mt-3.5 max-w-2xl mx-auto leading-relaxed"
          >
            Select a packaging format, choose your specifications, and get a fast quote from our team.
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 max-w-md mx-auto relative"
          >
            <div className="relative flex items-center">
              <input
                id="product-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, materials, or formats..."
                className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-[#12295A]/15 text-sm text-[#0A1930] placeholder:text-[#12295A]/45 shadow-xs focus:outline-none focus:border-[#FF9933] focus:ring-2 focus:ring-[#FF9933]/25 transition-all"
              />
              <Search className="w-4 h-4 text-[#12295A]/50 absolute left-4 pointer-events-none" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 text-xs text-[#12295A]/50 hover:text-[#0A1930] px-1.5 py-0.5 rounded-full hover:bg-slate-100"
                >
                  Clear
                </button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Category Filter Tabs (Pill style matching Portfolio filters) */}
        <div className="flex items-center justify-center mb-10 sm:mb-12 overflow-x-auto py-2 px-1">
          <div
            role="tablist"
            aria-label="Filter products by category"
            className="inline-flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-full bg-white border border-[#12295A]/12 shadow-sm"
          >
            {PRODUCT_CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              const count =
                category === 'All'
                  ? PRODUCTS.length
                  : PRODUCTS.filter((p) => p.category === category).length;

              return (
                <button
                  key={category}
                  id={`product-tab-${category.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`${category} products (${count})`}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9933] ${
                    isActive
                      ? 'bg-[#FF9933] text-[#0A1930] shadow-sm font-extrabold'
                      : 'bg-transparent text-[#12295A]/80 hover:text-[#0A1930] hover:bg-[#FAF7F2]'
                  }`}
                >
                  {getCategoryIcon(category)}
                  <span>{category}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive
                        ? 'bg-[#0A1930] text-white'
                        : 'bg-[#12295A]/10 text-[#12295A]/70'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter / Status Line */}
        <div className="flex items-center justify-between mb-6 px-1 text-xs font-mono text-[#12295A]/70 border-b border-[#12295A]/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF9933]" />
            <span>
              SHOWING <strong className="text-[#0A1930] font-bold">{filteredProducts.length}</strong>{' '}
              {filteredProducts.length === 1 ? 'PRODUCT' : 'PRODUCTS'}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-[#FF9933]" />
              <span>Tailored Production Quotes</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#2F6FED]" />
              <span>Production Guaranteed</span>
            </span>
          </div>
        </div>

        {/* 4-Column Responsive Product Grid */}
        {/* Desktop: 4 cols (lg:grid-cols-4), Tablet: 2 cols (md:grid-cols-2), Mobile: 1 col */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="group relative flex flex-col justify-between rounded-3xl bg-white border border-[#12295A]/12 shadow-[0_4px_20px_rgba(10,25,48,0.05)] hover:shadow-[0_16px_36px_rgba(10,25,48,0.12)] hover:-translate-y-1 hover:border-[#FF9933]/50 transition-all duration-300 overflow-hidden"
              >
                {/* Product Card Image Container */}
                <Link
                  to={`/products/${product.slug}`}
                  aria-label={`View and configure ${product.name}`}
                  className="relative aspect-[4/3] w-full overflow-hidden bg-[#0A1930] block group/img focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9933]"
                >
                  <img
                    src={product.mainImageUrl}
                    alt={product.galleryImages?.[0]?.alt || `${product.name} packaging sample`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transform transition-transform duration-500 ease-out group-hover:scale-108"
                    loading="lazy"
                  />

                  {/* Gradient Scrim for Top Badge Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1930]/80 via-transparent to-[#0A1930]/40 pointer-events-none" />

                  {/* Category Pill Tag Overlay */}
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0A1930]/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono font-medium shadow-sm">
                      {getCategoryIcon(product.category)}
                      <span>{product.categoryTag}</span>
                    </span>
                  </div>

                  {/* Lead Time Pill Overlay */}
                  <div className="absolute top-3.5 right-3.5 z-10">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/90 backdrop-blur-md text-[#0A1930] text-[10px] font-mono font-semibold shadow-sm">
                      <Clock className="w-2.5 h-2.5 text-[#2F6FED]" />
                      <span>{product.leadTime.split(' ')[0]}</span>
                    </span>
                  </div>

                  {/* Hover Quick Insight Overlay Bar */}
                  <div className="absolute bottom-2 left-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="text-[10px] font-mono text-[#FAF7F2] bg-[#0A1930]/90 backdrop-blur-md px-2 py-1 rounded-md border border-white/20 block truncate">
                      Min: {product.minQuantity} units • {product.recommendedSubstrates[0]?.split('(')[0]}
                    </span>
                  </div>
                </Link>

                {/* Product Card Content Body */}
                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Category Label */}
                    <div className="text-[11px] font-mono text-[#2F6FED] font-bold uppercase tracking-wider mb-1">
                      {product.category}
                    </div>

                    {/* Product Title */}
                    <Link
                      to={`/products/${product.slug}`}
                      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9933] rounded-md"
                    >
                      <h3 className="font-heading text-lg font-bold text-[#0A1930] leading-snug group-hover:text-[#2F6FED] transition-colors">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Short Description */}
                    <p className="text-xs text-[#161B22]/75 mt-2 line-clamp-2 leading-relaxed">
                      {product.shortDescription}
                    </p>
                  </div>

                  {/* Action CTA Button */}
                  <div className="mt-5 pt-4 border-t border-[#12295A]/10">
                    <Link
                      to={`/products/${product.slug}`}
                      id={`configure-product-btn-${product.slug}`}
                      className="w-full py-3 px-4 rounded-xl bg-[#FF9933] hover:bg-[#FFB35C] text-[#0A1930] font-bold text-xs shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98]"
                    >
                      <span>Configure →</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty Search State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 px-4 bg-white rounded-3xl border border-[#12295A]/12 my-8">
            <Package className="w-12 h-12 text-[#12295A]/30 mx-auto mb-3" />
            <h3 className="font-heading text-xl font-bold text-[#0A1930]">No matching packaging formats found</h3>
            <p className="text-sm text-[#161B22]/70 mt-1 max-w-md mx-auto">
              We engineer fully bespoke dielines for non-standard structures. Contact our studio engineers for a custom quote.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-5 py-2.5 rounded-xl bg-[#0A1930] text-white text-xs font-bold hover:bg-[#12295A] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Bottom Banner CTA for Custom Dielines */}
        <div className="mt-16 sm:mt-20">
          <div className="relative rounded-3xl bg-[#0A1930] p-8 sm:p-10 lg:p-12 text-white overflow-hidden border border-[#12295A]/30 shadow-xl">
            {/* Ambient Corner Radial Glow */}
            <div
              className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#FF9933]/15 blur-3xl pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-[#2F6FED]/20 blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF9933]/20 border border-[#FF9933]/30 text-[#FF9933] text-xs font-mono font-bold uppercase mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>BESPOKE ENGINEERING</span>
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                  Need a Custom Structure or Non-Standard Dieline?
                </h2>
                <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
                  Our structural engineers craft custom CAD folding proofs, specialized unboxing mechanisms, and physical sample prototypes within 48 hours.
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-4 text-xs font-mono text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#FF9933]" />
                    <span>Free Dieline CAD (.AI / .PDF)</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#FF9933]" />
                    <span>Physical White Sample Available</span>
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
                <button
                  id="catalog-custom-quote-btn"
                  type="button"
                  onClick={onOpenQuoteModal}
                  className="px-8 py-4 rounded-xl bg-[#FF9933] hover:bg-[#FFB35C] text-[#0A1930] font-bold text-sm shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <span>Request Custom Dieline</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
