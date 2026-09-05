import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Award, CheckCircle2, Loader2, Mail, Instagram, Linkedin, Facebook, Twitter } from 'lucide-react';
import { AglLogo } from './AglLogo';

interface FooterProps {
  onOpenQuoteModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenQuoteModal }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (href: string) => {
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

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail)) {
      return;
    }
    setNewsletterStatus('loading');
    setTimeout(() => {
      setNewsletterStatus('success');
      setNewsletterEmail('');
    }, 900);
  };

  return (
    <footer
      id="footer"
      className="bg-[#0A1930] text-[#FAF7F2] relative overflow-hidden border-t border-white/10"
      aria-label="Site Footer"
    >
      {/* Background Decorative Large Monogram / Fold-line Grid for Subtle Texture */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none overflow-hidden flex items-center justify-center">
        <svg
          viewBox="0 0 1000 600"
          className="w-full h-full stroke-white fill-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Large AGL Monogram Lines */}
          <path d="M150,500 L300,100 L450,500 L380,500 L340,380 L260,380 L220,500 Z" strokeWidth="6" />
          <path d="M550,150 C750,150 850,250 850,380 C850,500 700,520 580,520 L580,380 L720,380" strokeWidth="6" />
          <path d="M820,100 L880,100 L880,520 L1000,520" strokeWidth="6" />
          {/* Fold dieline grid */}
          <line x1="0" y1="300" x2="1000" y2="300" strokeWidth="2" strokeDasharray="12 12" />
          <line x1="500" y1="0" x2="500" y2="600" strokeWidth="2" strokeDasharray="12 12" />
          <circle cx="500" cy="300" r="240" strokeWidth="1.5" strokeDasharray="8 8" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16 sm:pt-20 pb-12">
        {/* TOP ROW: Logo, Tagline & 1-Line Brand Blurb */}
        <div className="pb-12 border-b border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <Link
              to="/"
              onClick={() => {
                if (location.pathname === '/') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              aria-label="AGL Creatives Home"
              className="inline-block"
            >
              <AglLogo variant="light" className="h-10" />
            </Link>
            <div className="hidden sm:block w-px h-8 bg-white/20" />
            <div>
              <div className="text-xs font-mono font-bold tracking-[0.25em] text-[#FF9933] uppercase">
                DESIGN • PRINT • PACK
              </div>
              <div className="text-xs text-slate-300 mt-0.5 font-medium">
                Premier Custom Structural Packaging &amp; Precision Print Studio
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-[#FF9933] font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ISO 9001 &amp; FSC CERTIFIED</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 font-mono">
              <Award className="w-3.5 h-3.5 text-[#2F6FED]" />
              <span>EST. 2014</span>
            </div>
          </div>
        </div>

        {/* MIDDLE: 4 Columns (Company, Products & Services, Contact, Newsletter) */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 border-b border-white/10">
          {/* Column 1: Company Links (3 cols on desktop) */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold font-mono uppercase tracking-widest text-[#FF9933] mb-4">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('/')}
                  className="hover:text-[#FF9933] transition-colors cursor-pointer"
                >
                  About Studio
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('/products')}
                  className="hover:text-[#FF9933] transition-colors cursor-pointer text-[#FF9933] font-medium"
                >
                  Product Catalog →
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('/#why-agl')}
                  className="hover:text-[#FF9933] transition-colors cursor-pointer"
                >
                  Why AGL Creatives
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('/#services')}
                  className="hover:text-[#FF9933] transition-colors cursor-pointer"
                >
                  Packaging Capabilities
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('/#process')}
                  className="hover:text-[#FF9933] transition-colors cursor-pointer"
                >
                  Our 4-Stage Process
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('/#portfolio')}
                  className="hover:text-[#FF9933] transition-colors cursor-pointer"
                >
                  Portfolio &amp; Case Studies
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Packaging Formats & Products (3 cols on desktop) */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold font-mono uppercase tracking-widest text-[#FF9933] mb-4">
              Packaging Formats
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link
                  to="/products/rigid-gift-box"
                  className="hover:text-[#FF9933] transition-colors block"
                >
                  Rigid &amp; Magnetic Gift Boxes
                </Link>
              </li>
              <li>
                <Link
                  to="/products/reverse-tuck-end-box"
                  className="hover:text-[#FF9933] transition-colors block"
                >
                  Folding Cartons &amp; Sleeves
                </Link>
              </li>
              <li>
                <Link
                  to="/products/mailer-box"
                  className="hover:text-[#FF9933] transition-colors block"
                >
                  Corrugated E-Commerce Mailers
                </Link>
              </li>
              <li>
                <Link
                  to="/products/standup-pouch"
                  className="hover:text-[#FF9933] transition-colors block"
                >
                  Barrier Pouches &amp; Bags
                </Link>
              </li>
              <li>
                <Link
                  to="/products/product-label-roll"
                  className="hover:text-[#FF9933] transition-colors block"
                >
                  Roll Labels &amp; Tamper Holograms
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="hover:text-[#FF9933] transition-colors block text-[#FF9933] font-semibold text-xs mt-2"
                >
                  View All Products (8 Formats) →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details (3 cols on desktop) */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold font-mono uppercase tracking-widest text-[#FF9933] mb-4">
              Contact Studio
            </h3>
            <div className="space-y-3 text-sm text-slate-300">
              <div>
                <span className="text-[11px] font-mono text-slate-400 block uppercase">Print Facility</span>
                <span className="text-white font-medium block">Plot 14, Industrial Area Phase 2</span>
                <span className="text-slate-400 text-xs">Okhla, New Delhi – 110020, India</span>
              </div>
              <div>
                <span className="text-[11px] font-mono text-slate-400 block uppercase">Inquiries &amp; Quotes</span>
                <a
                  href="mailto:hello@aglcreatives.com"
                  className="text-white font-medium hover:text-[#FF9933] transition-colors"
                >
                  hello@aglcreatives.com
                </a>
              </div>
              <div>
                <span className="text-[11px] font-mono text-slate-400 block uppercase">Direct Studio Line</span>
                <a
                  href="tel:+919876543210"
                  className="text-white font-medium hover:text-[#FF9933] transition-colors block"
                >
                  +91 98765 43210
                </a>
                <span className="text-slate-400 text-xs block mt-0.5">Mon–Sat, 10:00 AM – 7:00 PM IST</span>
              </div>
              <div>
                <span className="text-[11px] font-mono text-slate-400 block uppercase">WhatsApp Direct</span>
                <a
                  href="https://wa.me/919876543210?text=Hi%20AGL%20Creatives,%20I'd%20like%20to%20discuss%20a%20packaging%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FF9933] hover:underline transition-colors text-xs inline-flex items-center gap-1 font-medium"
                >
                  Chat on WhatsApp (+91 98765 43210) →
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Stay Updated Newsletter Signup (3 cols on desktop) */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold font-mono uppercase tracking-widest text-[#FF9933] mb-2">
              Stay Updated
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Subscribe for quarterly packaging trend reports, dieline templates, and specialty print insights.
            </p>

            {newsletterStatus === 'success' ? (
              <div className="p-3.5 rounded-xl bg-white/10 border border-[#FF9933]/50 text-xs text-[#FAF7F2] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF9933] shrink-0" />
                <span>Subscribed! Check your inbox for the latest sample deck.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your work email"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#FF9933] focus:ring-1 focus:ring-[#FF9933] transition-colors"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>
                <button
                  type="submit"
                  disabled={newsletterStatus === 'loading'}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#FF9933] text-[#0A1930] font-bold text-xs hover:bg-[#FFB35C] transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-75"
                >
                  {newsletterStatus === 'loading' ? (
                    <Loader2 className="w-4 h-4 animate-spin text-[#0A1930]" />
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}

            <button
              type="button"
              onClick={onOpenQuoteModal}
              className="mt-4 text-[11px] font-mono text-[#FF9933] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Need a fast quote? Click here →</span>
            </button>
          </div>
        </div>

        {/* BOTTOM BAR: Copyright Left, Social Icons Right */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span>© 2026 AGL Creatives. All Rights Reserved.</span>
            <span className="hidden md:inline text-white/30">•</span>
            <span className="hidden md:inline text-[#FF9933] font-mono font-bold tracking-wider">
              DESIGN • PRINT • PACK
            </span>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-2.5">
            {[
              { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
              { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
              { icon: Facebook, label: 'Facebook', href: 'https://facebook.com' },
              { icon: Twitter, label: 'Twitter / X', href: 'https://twitter.com' },
            ].map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit AGL Creatives on ${social.label}`}
                  className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-[#FF9933] hover:text-[#0A1930] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF9933]"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

