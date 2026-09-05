import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { Preloader } from './components/Preloader';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';

export default function App() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);

  const handleOpenQuoteModal = () => {
    setIsQuoteModalOpen(true);
  };

  const handleCloseQuoteModal = () => {
    setIsQuoteModalOpen(false);
  };

  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-[#FAF7F2] text-[#161B22] font-sans antialiased overflow-x-hidden">
        {/* 0. Scroll to top handler on route navigation */}
        <ScrollToTop />

        {/* 1. Brand Preloader with SVG Stroke Animation */}
        <Preloader onComplete={() => setIsPreloaderComplete(true)} />

        {/* 2. Subtle Paper Grain Tactile Texture Overlay */}
        <div className="paper-texture-overlay" aria-hidden="true" />

        {/* 3. Sticky Top Shared Navbar */}
        <Navbar onOpenQuoteModal={handleOpenQuoteModal} />

        {/* 5. Main Routed Content */}
        <main className="min-h-[calc(100vh-300px)]">
          <Routes>
            {/* Route 1: Main Landing / Marketing Page */}
            <Route
              path="/"
              element={<HomePage onOpenQuoteModal={handleOpenQuoteModal} />}
            />

            {/* Route 2: Product Catalog Page */}
            <Route
              path="/products"
              element={<ProductsPage onOpenQuoteModal={handleOpenQuoteModal} />}
            />

            {/* Route 3: Product Detail Template (Phase 10 Placeholder) */}
            <Route
              path="/products/:slug"
              element={<ProductDetailPage onOpenQuoteModal={handleOpenQuoteModal} />}
            />

            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* 6. Shared Studio Footer */}
        <Footer onOpenQuoteModal={handleOpenQuoteModal} />

        {/* 7. Interactive Studio Quote Modal */}
        <QuoteModal
          isOpen={isQuoteModalOpen}
          onClose={handleCloseQuoteModal}
        />
      </div>
    </BrowserRouter>
  );
}
