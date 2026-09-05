import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, Package, Send, Sparkles, Sliders, ShieldCheck } from 'lucide-react';
import { QuoteFormData } from '../types';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PACKAGING_TYPES = [
  'Custom Folding Carton',
  'Rigid Luxury Gift Box',
  'Corrugated E-commerce Mailer',
  'Sleeve & Tray Box',
  'Product Label / Commercial Print',
];

const FINISHES = ['Matte Laminate', 'Gold/Silver Foil Stamping', 'Spot UV Gloss', 'Embossing/Debossing', 'Soft-Touch Velvet'];

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    email: '',
    company: '',
    projectType: PACKAGING_TYPES[0],
    quantity: '1,000 units',
    specifications: '',
  });

  const [selectedFinishes, setSelectedFinishes] = useState<string[]>(['Matte Laminate']);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleFinish = (finish: string) => {
    setSelectedFinishes((prev) =>
      prev.includes(finish) ? prev.filter((f) => f !== finish) : [...prev, finish]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0A1930]/80 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          id="quote-modal-card"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-2xl sm:rounded-3xl border border-[#12295A]/15 shadow-2xl overflow-hidden z-10 my-auto"
        >
          {/* Header */}
          <div className="bg-[#0A1930] text-white p-6 sm:p-7 relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#2F6FED]/30 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#FF9933]/25 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-start justify-between relative z-10">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FF9933]/20 border border-[#FF9933]/30 text-[#FF9933] text-xs font-semibold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3 h-3" />
                  <span>Studio Quote Inquiry</span>
                </div>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight">
                  Request a Packaging Quote
                </h3>
                <p className="text-sm text-slate-300 mt-1">
                  Tell us your packaging specifications for accurate factory pricing & CAD dielines.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close quote modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-8 text-center flex flex-col items-center justify-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-[#FF9933]/20 text-[#0A1930] flex items-center justify-center border border-[#FF9933]/40">
                  <CheckCircle className="w-8 h-8 text-[#FF9933]" />
                </div>
                <h4 className="font-heading text-2xl font-bold text-[#0A1930]">
                  Quote Request Received!
                </h4>
                <p className="text-sm text-[#161B22]/70 max-w-md">
                  Thank you, <strong className="text-[#0A1930]">{formData.name}</strong>. Our packaging engineers are reviewing your specifications for <strong className="text-[#0A1930]">{formData.projectType}</strong>. We will send a dieline proof and tailored quote from our team within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-[#0A1930] text-white font-semibold text-sm hover:bg-[#12295A] transition-colors"
                >
                  Done
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#12295A] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Elena Vance"
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#12295A]/15 text-[#161B22] text-sm focus:outline-none focus:border-[#2F6FED] focus:ring-2 focus:ring-[#2F6FED]/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#12295A] mb-1.5">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="elena@company.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#12295A]/15 text-[#161B22] text-sm focus:outline-none focus:border-[#2F6FED] focus:ring-2 focus:ring-[#2F6FED]/20"
                    />
                  </div>
                </div>

                {/* Company & Quantity */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#12295A] mb-1.5">
                      Brand / Company
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Lumina Goods"
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#12295A]/15 text-[#161B22] text-sm focus:outline-none focus:border-[#2F6FED] focus:ring-2 focus:ring-[#2F6FED]/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#12295A] mb-1.5">
                      Target Quantity
                    </label>
                    <select
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#12295A]/15 text-[#161B22] text-sm focus:outline-none focus:border-[#2F6FED]"
                    >
                      <option>250 – 500 units (Sample / Pilot)</option>
                      <option>1,000 – 5,000 units (Standard Run)</option>
                      <option>10,000 – 50,000 units (High Volume)</option>
                      <option>100,000+ units (Enterprise)</option>
                    </select>
                  </div>
                </div>

                {/* Packaging Structure Type */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#12295A] mb-1.5">
                    Packaging Structure Type
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {PACKAGING_TYPES.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({ ...formData, projectType: type })}
                        className={`px-3 py-2 rounded-xl text-left text-xs font-medium border transition-all flex items-center justify-between ${
                          formData.projectType === type
                            ? 'bg-[#12295A] text-white border-[#12295A] shadow-xs'
                            : 'bg-white text-[#161B22] border-[#12295A]/15 hover:border-[#2F6FED]'
                        }`}
                      >
                        <span>{type}</span>
                        {formData.projectType === type && <Package className="w-3.5 h-3.5 text-[#FF9933]" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Print Finishes & Embellishments */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#12295A] mb-1.5">
                    Finishes & Embellishments
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {FINISHES.map((finish) => {
                      const isSelected = selectedFinishes.includes(finish);
                      return (
                        <button
                          key={finish}
                          type="button"
                          onClick={() => toggleFinish(finish)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                            isSelected
                              ? 'bg-[#FF9933] text-[#0A1930] font-bold shadow-xs'
                              : 'bg-white text-[#12295A] border border-[#12295A]/15 hover:border-[#FF9933]'
                          }`}
                        >
                          {isSelected ? '✓ ' : '+ '}
                          {finish}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Dimensions or Notes */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#12295A] mb-1.5">
                    Box Dimensions or Special Requirements
                  </label>
                  <textarea
                    rows={3}
                    value={formData.specifications}
                    onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
                    placeholder="e.g. 220mm (L) x 150mm (W) x 80mm (H), embossed gold logo on top lid, eco-friendly FSC certified kraft stock..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#12295A]/15 text-[#161B22] text-sm focus:outline-none focus:border-[#2F6FED] focus:ring-2 focus:ring-[#2F6FED]/20 resize-none"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#FF9933] text-[#0A1930] font-bold text-base shadow-[0_4px_16px_rgba(255,153,51,0.35)] hover:bg-[#FFB35C] hover:shadow-[0_6px_22px_rgba(255,153,51,0.45)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Quote Request</span>
                  </button>
                  <p className="text-[11px] text-center text-[#161B22]/50 mt-2">
                    Guaranteed response within 24 business hours • Free dieline CAD template included
                  </p>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
