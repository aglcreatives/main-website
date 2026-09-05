import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Menu, X, Sparkles, Zap } from 'lucide-react';
import { AglLogo } from './AglLogo';
import { NavItem } from '../types';

interface NavbarProps {
  onOpenQuoteModal: () => void;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/#services' },
  { label: 'Products', href: '/products', badge: 'Get a Quote' },
  { label: 'Process', href: '/#process' },
  { label: 'Portfolio', href: '/#portfolio' },
  { label: 'Testimonials', href: '/#testimonials' },
  { label: 'Contact', href: '/#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuoteModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);

    if (href === '/') {
      if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/');
      }
      return;
    }

    if (href.startsWith('/#')) {
      const hashId = href.replace('/#', '');
      if (location.pathname === '/') {
        const targetElement = document.getElementById(hashId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate(`/#${hashId}`);
      }
      return;
    }

    if (href.startsWith('#')) {
      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    navigate(href);
  };

  return (
    <>
      <header
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled || location.pathname !== '/'
            ? 'bg-[#0A1930]/95 backdrop-blur-md border-b border-[#FF9933]/25 shadow-[0_12px_40px_rgba(10,25,48,0.35)] py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            id="nav-logo"
            onClick={() => {
              if (location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 group transition-transform duration-300 hover:scale-[1.02] focus:outline-none"
            aria-label="AGL Creatives Home"
          >
            <AglLogo
              className="h-9 sm:h-10 transition-colors duration-300"
              variant={isScrolled || location.pathname !== '/' ? 'light' : 'dark'}
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5">
            {NAV_ITEMS.map((item) => {
              const isProductsRoute = item.href === '/products' && location.pathname.startsWith('/products');
              const isHomeActive = item.href === '/' && location.pathname === '/' && !location.hash;

              return (
                <button
                  key={item.label}
                  id={`nav-link-${item.label.toLowerCase()}`}
                  type="button"
                  onClick={() => handleNavClick(item.href)}
                  className={`relative px-3.5 py-2 text-sm font-medium transition-colors duration-200 group rounded-full cursor-pointer flex items-center gap-1.5 ${
                    isScrolled || location.pathname !== '/'
                      ? isProductsRoute || isHomeActive
                        ? 'text-[#FF9933] bg-white/10 font-semibold'
                        : 'text-slate-200 hover:text-white hover:bg-white/10'
                      : isHomeActive
                      ? 'text-[#0A1930] bg-[#12295A]/10 font-bold'
                      : 'text-[#12295A] hover:text-[#0A1930] hover:bg-[#12295A]/5'
                  }`}
                >
                  <span>{item.label}</span>

                  {/* Badge for Products */}
                  {item.badge && (
                    <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#FF9933] text-[#0A1930] text-[10px] font-mono font-bold tracking-tight shadow-xs animate-pulse">
                      <Zap className="w-2.5 h-2.5" />
                      <span>{item.badge}</span>
                    </span>
                  )}

                  <span
                    className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] rounded-full transition-all duration-300 group-hover:w-4 ${
                      isScrolled || location.pathname !== '/' ? 'bg-[#FF9933]' : 'bg-[#2F6FED]'
                    } ${isProductsRoute || isHomeActive ? 'w-4' : ''}`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Right CTA Button (Desktop) */}
          <div className="hidden md:flex items-center">
            <button
              id="nav-cta-button"
              onClick={onOpenQuoteModal}
              className="group relative inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#FF9933] text-[#0A1930] font-semibold text-sm shadow-[0_4px_14px_rgba(255,153,51,0.35)] hover:bg-[#FFB35C] hover:shadow-[0_6px_20px_rgba(255,153,51,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center">
            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2.5 rounded-xl transition-colors ${
                isScrolled || location.pathname !== '/'
                  ? 'text-white hover:bg-white/10'
                  : 'text-[#0A1930] hover:bg-[#0A1930]/10'
              }`}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#0A1930] text-white flex flex-col justify-between p-6 pt-24 md:hidden overflow-y-auto"
          >
            {/* Background decorative glow blobs */}
            <div className="absolute top-1/4 right-0 w-64 h-64 bg-[#2F6FED]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/3 left-0 w-64 h-64 bg-[#FF9933]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Menu Links */}
            <div className="flex flex-col space-y-4 my-auto z-10">
              <div className="text-xs uppercase tracking-widest text-[#FF9933] font-semibold mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Navigation</span>
              </div>
              {NAV_ITEMS.map((item, idx) => (
                <motion.button
                  key={item.label}
                  type="button"
                  id={`mobile-nav-link-${item.label.toLowerCase()}`}
                  initial={{ opacity: 0, x: -25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * (idx + 1), duration: 0.3 }}
                  onClick={() => handleNavClick(item.href)}
                  className="font-heading text-2xl font-semibold text-slate-100 hover:text-[#FF9933] transition-colors py-2.5 border-b border-white/10 flex items-center justify-between group text-left w-full cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FF9933] text-[#0A1930] text-xs font-mono font-bold">
                        <Zap className="w-3 h-3" />
                        <span>{item.badge}</span>
                      </span>
                    )}
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-[#FF9933] group-hover:translate-x-1 transition-all" />
                </motion.button>
              ))}
            </div>

            {/* Mobile Bottom Footer with CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.3 }}
              className="pt-6 border-t border-white/10 flex flex-col gap-4 z-10"
            >
              <button
                id="mobile-nav-cta-button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuoteModal();
                }}
                className="w-full py-4 rounded-xl bg-[#FF9933] text-[#0A1930] font-bold text-base shadow-[0_4px_20px_rgba(255,153,51,0.4)] flex items-center justify-center gap-2 active:scale-[0.98] transition-transform cursor-pointer"
              >
                <span>Get a Free Quote</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="text-center text-xs text-slate-400">
                AGL Creatives Studio • DESIGN • PRINT • PACK
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

