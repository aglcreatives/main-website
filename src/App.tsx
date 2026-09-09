import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Preloader } from './components/Preloader';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { QuoteRequestPage } from './pages/QuoteRequestPage';
import { CatalogIndexPage, CatalogNodePage } from './pages/CatalogPages';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AboutPage } from './pages/AboutPage';

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleOpenQuoteModal = () => {
    navigate('/request-quote');
  };

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] text-[#161B22] font-sans antialiased overflow-x-hidden">
        {/* 0. Scroll to top handler on route navigation */}
        <ScrollToTop />

        {/* 1. Brand Preloader with SVG Stroke Animation */}
        <Preloader onComplete={() => setIsPreloaderComplete(true)} />

        <div className={isPreloaderComplete ? '' : 'invisible pointer-events-none'} aria-hidden={!isPreloaderComplete}>
        {/* 2. Subtle Paper Grain Tactile Texture Overlay */}
        <div className="paper-texture-overlay" aria-hidden="true" />

        {/* 3. Sticky Top Shared Navbar */}
        <Navbar onOpenQuoteModal={handleOpenQuoteModal} />

        {/* 5. Main Routed Content */}
        <main className={location.pathname === '/request-quote' ? 'min-h-screen' : 'min-h-[calc(100vh-300px)]'}>
          <Routes>
            {/* Route 1: Main Landing / Marketing Page */}
            <Route
              path="/"
              element={<HomePage onOpenQuoteModal={handleOpenQuoteModal} />}
            />

            {/* Route 2: Product Catalog Page */}
            <Route
              path="/products"
              element={<CatalogIndexPage />}
            />

            <Route path="/products/*" element={<CatalogNodePage />} />

            <Route path="/product/:slug" element={<ProductDetailPage onOpenQuoteModal={handleOpenQuoteModal} />} />

            <Route path="/request-quote" element={<QuoteRequestPage />} />

            <Route path="/about" element={<AboutPage />} />

            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer onOpenQuoteModal={handleOpenQuoteModal} />
        </div>

    </div>
  );
}
