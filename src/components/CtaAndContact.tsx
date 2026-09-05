import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Loader2,
  Sparkles,
  Instagram,
  Linkedin,
  Facebook,
  Twitter,
  ChevronDown,
  MessageCircle,
} from 'lucide-react';

interface CtaAndContactProps {
  onOpenQuoteModal: () => void;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
}

const INITIAL_FORM: FormData = {
  fullName: '',
  email: '',
  phone: '',
  projectType: 'Boxes',
  message: '',
};

export const CtaAndContact: React.FC<CtaAndContactProps> = ({ onOpenQuoteModal }) => {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please enter your name';
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) errs.message = 'Please provide project details';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');

    // Simulate submission delay
    setTimeout(() => {
      setStatus('success');
    }, 1200);
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM);
    setStatus('idle');
    setErrors({});
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact-form-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full relative">
      {/* -------------------------------------------------------------
          SECTION 9A: FULL-WIDTH SAFFRON CTA BANNER
          ------------------------------------------------------------- */}
      <section
        id="cta-banner"
        className="w-full py-20 sm:py-24 bg-[#FF9933] text-[#0A1930] relative overflow-hidden shadow-inner border-y border-[#FF9933]/40"
        aria-label="Ready to Pack Your Brand's Story"
      >
        {/* Subtle repeating pattern of thin diagonal navy lines (Fold-line Theme) */}
        <svg
          className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="diagonal-fold-lines"
              width="40"
              height="40"
              patternTransform="rotate(45 0 0)"
              patternUnits="userSpaceOnUse"
            >
              <line x1="0" y1="0" x2="0" y2="40" stroke="#0A1930" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="20" y1="0" x2="20" y2="40" stroke="#0A1930" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonal-fold-lines)" />
        </svg>

        {/* Decorative Geometric Creases in Corners */}
        <div className="absolute -top-12 -right-12 w-48 h-48 border-2 border-[#0A1930]/15 rounded-full pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 border border-[#0A1930]/20 rotate-12 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A1930]/10 border border-[#0A1930]/20 text-[#0A1930] text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>COMMENCE PRODUCTION</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0A1930] max-w-4xl mx-auto leading-[1.1]">
            Ready to Pack Your Brand&apos;s Story?
          </h2>

          <p className="text-base sm:text-lg text-[#0A1930]/85 font-medium mt-4 max-w-2xl mx-auto leading-relaxed">
            From bespoke structural prototyping to high-volume luxury print runs, let&apos;s engineer unboxing experiences your customers will never forget.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="cta-start-project-btn"
              type="button"
              onClick={onOpenQuoteModal}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#0A1930] text-white font-bold text-base shadow-[0_10px_25px_rgba(10,25,48,0.35)] hover:bg-[#12295A] hover:shadow-[0_14px_32px_rgba(10,25,48,0.45)] hover:-translate-y-1 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer group"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-5 h-5 text-[#FF9933] group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              type="button"
              onClick={scrollToContact}
              className="w-full sm:w-auto px-7 py-4 rounded-full bg-white/30 border border-[#0A1930]/20 text-[#0A1930] font-bold text-sm hover:bg-white/50 transition-colors"
            >
              Contact Studio Directly
            </button>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          SECTION 9B: TWO-COLUMN CONTACT SECTION
          ------------------------------------------------------------- */}
      <section
        id="contact"
        className="py-24 sm:py-32 bg-[#FAF7F2] text-[#161B22] relative overflow-hidden"
        aria-label="Contact AGL Creatives Studio"
      >
        <div id="contact-form-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* LEFT COLUMN: Studio Information & Channels */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF9933]/15 border border-[#FF9933]/30 text-[#0A1930] text-xs font-bold uppercase tracking-widest mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF9933]" />
                  <span>GET IN TOUCH</span>
                </div>

                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A1930] tracking-tight">
                  Let&apos;s Talk Packaging
                </h2>

                <p className="text-sm sm:text-base text-[#161B22]/75 mt-4 leading-relaxed max-w-md">
                  Whether you need a custom structural dieline, eco-friendly folding cartons, or a complete luxury unboxing overhaul, our packaging engineers and print specialists are ready to collaborate.
                </p>

                {/* Contact Items List */}
                <div className="mt-8 sm:mt-10 space-y-6">
                  {/* Phone */}
                  <a
                    href="tel:+919876543210"
                    className="flex items-start gap-4 group p-3 -mx-3 rounded-2xl hover:bg-white/80 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#0A1930] text-white flex items-center justify-center shrink-0 group-hover:bg-[#FF9933] group-hover:text-[#0A1930] transition-colors shadow-sm">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-[#12295A]/60 uppercase">Direct Studio Phone</div>
                      <div className="text-base font-bold text-[#0A1930] group-hover:text-[#2F6FED] transition-colors">
                        +91 98765 43210
                      </div>
                      <div className="text-xs text-[#161B22]/60 mt-0.5">Mon–Sat, 10:00 AM – 7:00 PM IST</div>
                    </div>
                  </a>

                  {/* WhatsApp Quick Chat */}
                  <a
                    href="https://wa.me/919876543210?text=Hi%20AGL%20Creatives,%20I'd%20like%20to%20discuss%20a%20packaging%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 group p-3 -mx-3 rounded-2xl hover:bg-white/80 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#0A1930] text-[#25D366] flex items-center justify-center shrink-0 group-hover:bg-[#25D366] group-hover:text-white transition-colors shadow-sm">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-[#12295A]/60 uppercase">WhatsApp Instant Support</div>
                      <div className="text-base font-bold text-[#0A1930] group-hover:text-[#2F6FED] transition-colors">
                        +91 98765 43210
                      </div>
                      <div className="text-xs text-[#161B22]/60 mt-0.5">Direct chat for specs &amp; fast quote estimates</div>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:hello@aglcreatives.com"
                    className="flex items-start gap-4 group p-3 -mx-3 rounded-2xl hover:bg-white/80 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#0A1930] text-white flex items-center justify-center shrink-0 group-hover:bg-[#FF9933] group-hover:text-[#0A1930] transition-colors shadow-sm">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-[#12295A]/60 uppercase">Production & Inquiries</div>
                      <div className="text-base font-bold text-[#0A1930] group-hover:text-[#2F6FED] transition-colors">
                        hello@aglcreatives.com
                      </div>
                      <div className="text-xs text-[#161B22]/60 mt-0.5">Quotes returned within 24 business hours</div>
                    </div>
                  </a>

                  {/* Address */}
                  <div className="flex items-start gap-4 p-3 -mx-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#0A1930] text-white flex items-center justify-center shrink-0 shadow-sm">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-[#12295A]/60 uppercase">Studio & Print Facility</div>
                      <div className="text-sm sm:text-base font-bold text-[#0A1930]">
                        Plot 14, Industrial Area Phase 2
                      </div>
                      <div className="text-xs text-[#161B22]/60 mt-0.5">
                        Okhla, New Delhi – 110020, India
                      </div>
                    </div>
                  </div>

                  {/* Facility Hours */}
                  <div className="flex items-start gap-4 p-3 -mx-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#0A1930]/10 text-[#0A1930] flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-[#2F6FED]" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-[#12295A]/60 uppercase">Sample Room & Working Hours</div>
                      <div className="text-sm font-bold text-[#0A1930]">
                        Mon–Sat, 10:00 AM – 7:00 PM IST
                      </div>
                      <div className="text-xs text-[#161B22]/60 mt-0.5">
                        Material archive &amp; sampling room visits by appointment
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Channels (Navy circles that fill saffron on hover) */}
                <div className="mt-10 pt-6 border-t border-[#12295A]/10">
                  <div className="text-xs font-mono uppercase tracking-widest text-[#12295A]/70 mb-3">
                    Follow The Studio
                  </div>
                  <div className="flex items-center gap-3">
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
                          id={`social-${social.label.toLowerCase()}`}
                          aria-label={`Visit AGL Creatives on ${social.label}`}
                          className="w-10 h-10 rounded-full bg-[#0A1930] text-white flex items-center justify-center hover:bg-[#FF9933] hover:text-[#0A1930] hover:scale-110 shadow-sm transition-all duration-200 cursor-pointer"
                        >
                          <Icon className="w-4 h-4" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Contact Form Card with Floating Labels */}
            <div className="lg:col-span-7">
              <div
                id="contact-form-card"
                className="relative bg-white rounded-3xl p-8 sm:p-10 shadow-[0_16px_40px_rgba(10,25,48,0.08)] border border-[#12295A]/12"
              >
                {/* Folded Corner Detail in Top-Right (Unfold Theme) */}
                <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none overflow-hidden rounded-tr-3xl">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#FAF7F2] -rotate-45 translate-x-12 -translate-y-12 border-b border-[#12295A]/20 shadow-xs" />
                </div>

                <div className="mb-8">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#2F6FED]">
                    PROJECT INQUIRY FORM
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#0A1930] mt-1">
                    Tell Us About Your Packaging Needs
                  </h3>
                  <p className="text-xs text-[#161B22]/70 mt-1">
                    Fill out the specifications below and our structural design team will respond within 24h.
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="py-12 px-4 text-center flex flex-col items-center justify-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-[#FF9933]/20 border border-[#FF9933] flex items-center justify-center text-[#FF9933] mb-4">
                        <CheckCircle2 className="w-9 h-9" />
                      </div>
                      <h4 className="font-heading text-2xl font-bold text-[#0A1930]">
                        Inquiry Received!
                      </h4>
                      <p className="text-sm text-[#161B22]/75 max-w-md mt-2 leading-relaxed">
                        Thank you for reaching out to AGL Creatives. One of our senior packaging engineers has been assigned to your brief and will review your specifications shortly.
                      </p>
                      <button
                        type="button"
                        onClick={handleReset}
                        className="mt-6 px-6 py-2.5 rounded-full bg-[#0A1930] text-white text-xs font-bold hover:bg-[#12295A] transition-colors"
                      >
                        Send Another Inquiry
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-6"
                      noValidate
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Full Name Floating-Label Input */}
                        <div className="relative">
                          <input
                            type="text"
                            id="contact-fullname"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            onFocus={() => setFocusedField('fullName')}
                            onBlur={() => setFocusedField(null)}
                            placeholder=" "
                            className={`peer w-full pt-6 pb-2 text-sm text-[#0A1930] font-medium bg-transparent border-b-2 transition-colors duration-200 outline-none ${
                              errors.fullName
                                ? 'border-red-500'
                                : focusedField === 'fullName'
                                ? 'border-[#FF9933]'
                                : 'border-[#12295A]/20'
                            }`}
                          />
                          <label
                            htmlFor="contact-fullname"
                            className={`absolute left-0 transition-all duration-200 pointer-events-none text-xs ${
                              formData.fullName || focusedField === 'fullName'
                                ? 'top-1 text-[#FF9933] font-bold text-[11px]'
                                : 'top-5 text-[#12295A]/50 text-sm'
                            }`}
                          >
                            Full Name *
                          </label>
                          {errors.fullName && (
                            <span className="text-[11px] text-red-500 mt-1 block">
                              {errors.fullName}
                            </span>
                          )}
                        </div>

                        {/* Email Floating-Label Input */}
                        <div className="relative">
                          <input
                            type="email"
                            id="contact-email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                            placeholder=" "
                            className={`peer w-full pt-6 pb-2 text-sm text-[#0A1930] font-medium bg-transparent border-b-2 transition-colors duration-200 outline-none ${
                              errors.email
                                ? 'border-red-500'
                                : focusedField === 'email'
                                ? 'border-[#FF9933]'
                                : 'border-[#12295A]/20'
                            }`}
                          />
                          <label
                            htmlFor="contact-email"
                            className={`absolute left-0 transition-all duration-200 pointer-events-none text-xs ${
                              formData.email || focusedField === 'email'
                                ? 'top-1 text-[#FF9933] font-bold text-[11px]'
                                : 'top-5 text-[#12295A]/50 text-sm'
                            }`}
                          >
                            Work Email *
                          </label>
                          {errors.email && (
                            <span className="text-[11px] text-red-500 mt-1 block">
                              {errors.email}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Phone Floating-Label Input */}
                        <div className="relative">
                          <input
                            type="tel"
                            id="contact-phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            onFocus={() => setFocusedField('phone')}
                            onBlur={() => setFocusedField(null)}
                            placeholder=" "
                            className={`peer w-full pt-6 pb-2 text-sm text-[#0A1930] font-medium bg-transparent border-b-2 transition-colors duration-200 outline-none ${
                              focusedField === 'phone'
                                ? 'border-[#FF9933]'
                                : 'border-[#12295A]/20'
                            }`}
                          />
                          <label
                            htmlFor="contact-phone"
                            className={`absolute left-0 transition-all duration-200 pointer-events-none text-xs ${
                              formData.phone || focusedField === 'phone'
                                ? 'top-1 text-[#FF9933] font-bold text-[11px]'
                                : 'top-5 text-[#12295A]/50 text-sm'
                            }`}
                          >
                            Phone Number (Optional)
                          </label>
                        </div>

                        {/* Project Type Dropdown */}
                        <div className="relative">
                          <select
                            id="contact-project-type"
                            name="projectType"
                            value={formData.projectType}
                            onChange={handleInputChange}
                            onFocus={() => setFocusedField('projectType')}
                            onBlur={() => setFocusedField(null)}
                            className="w-full pt-6 pb-2 text-sm text-[#0A1930] font-medium bg-transparent border-b-2 border-[#12295A]/20 focus:border-[#FF9933] outline-none appearance-none cursor-pointer"
                          >
                            <option value="Boxes">Rigid & Folding Boxes</option>
                            <option value="E-commerce Mailers">E-Commerce Mailers</option>
                            <option value="Pouches">Flexible Pouches & Bags</option>
                            <option value="Labels">Labels & Stickers</option>
                            <option value="Corporate Print">Corporate Print Suites</option>
                            <option value="Other">Other Bespoke Format</option>
                          </select>
                          <label
                            htmlFor="contact-project-type"
                            className="absolute left-0 top-1 text-[#FF9933] font-bold text-[11px] pointer-events-none"
                          >
                            Project Type
                          </label>
                          <ChevronDown className="w-4 h-4 text-[#12295A]/50 absolute right-1 bottom-2.5 pointer-events-none" />
                        </div>
                      </div>

                      {/* Message Floating-Label Textarea */}
                      <div className="relative pt-2">
                        <textarea
                          id="contact-message"
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField('message')}
                          onBlur={() => setFocusedField(null)}
                          placeholder=" "
                          className={`peer w-full pt-6 pb-2 text-sm text-[#0A1930] font-medium bg-transparent border-b-2 transition-colors duration-200 outline-none resize-none ${
                            errors.message
                              ? 'border-red-500'
                              : focusedField === 'message'
                              ? 'border-[#FF9933]'
                              : 'border-[#12295A]/20'
                          }`}
                        />
                        <label
                          htmlFor="contact-message"
                          className={`absolute left-0 transition-all duration-200 pointer-events-none text-xs ${
                            formData.message || focusedField === 'message'
                              ? 'top-1 text-[#FF9933] font-bold text-[11px]'
                              : 'top-7 text-[#12295A]/50 text-sm'
                          }`}
                        >
                          Describe your packaging project (quantities, dimensions, finish preferences) *
                        </label>
                        {errors.message && (
                          <span className="text-[11px] text-red-500 mt-1 block">
                            {errors.message}
                          </span>
                        )}
                      </div>

                      {/* Full-width Solid Saffron Submit Button */}
                      <div className="pt-4">
                        <button
                          id="contact-form-submit-btn"
                          type="submit"
                          disabled={status === 'loading'}
                          className="w-full py-4 rounded-2xl bg-[#FF9933] text-[#0A1930] font-bold text-sm sm:text-base hover:bg-[#FFB35C] shadow-[0_8px_20px_rgba(255,153,51,0.35)] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                        >
                          {status === 'loading' ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin text-[#0A1930]" />
                              <span>Submitting Specs to Studio...</span>
                            </>
                          ) : (
                            <>
                              <span>Submit Packaging Inquiry</span>
                              <Send className="w-4 h-4 text-[#0A1930]" />
                            </>
                          )}
                        </button>
                      </div>

                      <div className="text-center">
                        <span className="text-[11px] font-mono text-[#12295A]/60">
                          🔒 Direct NDA protection • No obligation quote • 24h reply time
                        </span>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
