import React, { useState } from 'react';
import { CheckCircle2, Clock3, FileText, Loader2, Mail, MapPin, Phone, Send, ShieldCheck } from 'lucide-react';
import { readApiResult } from '../lib/api';

interface QuoteFormState {
  name: string;
  email: string;
  company: string;
  quantity: string;
  requirements: string;
}

const INITIAL_FORM: QuoteFormState = { name: '', email: '', company: '', quantity: '', requirements: '' };

export const QuoteRequestPage: React.FC = () => {
  const [form, setForm] = useState<QuoteFormState>(INITIAL_FORM);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');

  const updateField = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const submitQuote = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('sending');
    setError('');

    try {
      const response = await fetch('/api/inquiries/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await readApiResult(response);
      if (!response.ok) throw new Error(result.message || 'Unable to send your request.');
      setStatus('sent');
      setForm(INITIAL_FORM);
    } catch (submissionError) {
      setStatus('error');
      setError(submissionError instanceof Error ? submissionError.message : 'Unable to send your request.');
    }
  };

  return (
    <div className="bg-[#edf0ea] pt-20 text-[#173b35] sm:pt-24">
      <section className="relative overflow-hidden bg-[#dff4f1] px-4 pb-28 pt-14 sm:px-6 sm:pt-20 lg:pb-36">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.5),transparent_55%)]" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#d86f21]"><FileText className="h-4 w-4" /> Quote request</p>
          <h1 className="font-heading mt-4 text-4xl font-bold leading-tight text-[#173b35] sm:text-5xl">Let&apos;s build your next package.</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#173b35]/70 sm:text-base">Tell us what you need and our packaging team will turn your brief into a practical production plan and quote.</p>
        </div>
      </section>

      <section className="relative mx-auto -mt-20 w-full max-w-6xl px-4 pb-16 sm:-mt-28 sm:px-6 lg:px-8 lg:pb-20">
        <div className="overflow-hidden border border-[#173b35]/10 bg-[#fffdf8] shadow-[0_20px_55px_rgba(23,59,53,0.13)] lg:grid lg:grid-cols-[minmax(270px,0.82fr)_minmax(0,1.55fr)]">
          <aside className="relative overflow-hidden bg-[#14b8af] p-7 text-white sm:p-9 lg:p-10" aria-label="Contact information">
            <img src="/images/hero/kraft-mailer-studio.png" alt="Custom packaging sample" className="absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-multiply" />
            <div className="absolute -bottom-20 -right-20 h-56 w-56 rounded-full border-[28px] border-white/20" aria-hidden="true" />
            <div className="relative flex h-full flex-col">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/75">AGL Creatives</p>
                <h2 className="font-heading mt-3 text-3xl font-bold">Project details, handled with care.</h2>
                <p className="mt-4 text-sm leading-relaxed text-white/85">From first specifications to final delivery, our team will help you choose the right structure, material and print finish.</p>
              </div>
              <div className="mt-10 space-y-5 text-sm">
                <a href="tel:+917982214262" className="flex items-start gap-3 transition-opacity hover:opacity-75"><Phone className="mt-0.5 h-4 w-4 shrink-0" /><span><strong className="block">+91 79822 14262</strong><span className="text-white/75">Mon-Sat, 10 AM-6 PM IST</span></span></a>
                <a href="mailto:support@aglcreatives.com" className="flex items-start gap-3 transition-opacity hover:opacity-75"><Mail className="mt-0.5 h-4 w-4 shrink-0" /><span><strong className="block">support@aglcreatives.com</strong><span className="text-white/75">For production inquiries</span></span></a>
                <div className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0" /><span><strong className="block">Faridabad, Haryana</strong><span className="text-white/75">India</span></span></div>
              </div>
              <div className="mt-10 border-t border-white/25 pt-5 text-sm text-white/85"><span className="flex items-center gap-2"><Clock3 className="h-4 w-4" /> Response within 24 business hours</span></div>
            </div>
          </aside>

          <div className="p-7 sm:p-9 lg:p-11">
            {status === 'sent' ? (
              <div className="flex min-h-[430px] max-w-xl flex-col justify-center">
                <CheckCircle2 className="h-12 w-12 text-[#14b8af]" />
                <h2 className="font-heading mt-5 text-3xl font-bold">Inquiry received</h2>
                <p className="mt-3 text-sm leading-relaxed text-[#173b35]/70">Thank you. Your quote request has been sent to our production team at AGL Creatives.</p>
                <button type="button" onClick={() => setStatus('idle')} className="mt-7 w-fit border border-[#173b35] px-5 py-3 text-sm font-bold transition-colors hover:bg-[#173b35] hover:text-white">Submit another request</button>
              </div>
            ) : (
              <form onSubmit={submitQuote} className="space-y-7">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#14b8af]">Your packaging brief</p>
                  <h2 className="font-heading mt-2 text-3xl font-bold">Share the essentials.</h2>
                </div>
                <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                  <label className="block text-xs font-bold text-[#173b35]/70">YOUR NAME *<input required name="name" value={form.name} onChange={updateField} autoComplete="name" className="mt-2 w-full border-b-2 border-[#173b35]/15 bg-transparent px-0 py-2 text-base font-medium text-[#173b35] outline-none transition-colors focus:border-[#14b8af]" /></label>
                  <label className="block text-xs font-bold text-[#173b35]/70">YOUR EMAIL *<input required type="email" name="email" value={form.email} onChange={updateField} autoComplete="email" className="mt-2 w-full border-b-2 border-[#173b35]/15 bg-transparent px-0 py-2 text-base font-medium text-[#173b35] outline-none transition-colors focus:border-[#14b8af]" /></label>
                  <label className="block text-xs font-bold text-[#173b35]/70">COMPANY / BRAND<input name="company" value={form.company} onChange={updateField} autoComplete="organization" className="mt-2 w-full border-b-2 border-[#173b35]/15 bg-transparent px-0 py-2 text-base font-medium text-[#173b35] outline-none transition-colors focus:border-[#14b8af]" /></label>
                  <label className="block text-xs font-bold text-[#173b35]/70">EXPECTED QUANTITY<select required name="quantity" value={form.quantity} onChange={updateField} className="mt-2 w-full border-b-2 border-[#173b35]/15 bg-transparent px-0 py-2 text-base font-medium text-[#173b35] outline-none transition-colors focus:border-[#14b8af]"><option value="">Select quantity</option><option>250 - 500 units</option><option>1,000 - 5,000 units</option><option>10,000 - 50,000 units</option><option>100,000+ units</option></select></label>
                </div>
                <label className="block text-xs font-bold text-[#173b35]/70">PROJECT REQUIREMENTS *<textarea required name="requirements" value={form.requirements} onChange={updateField} rows={5} placeholder="Product details, dimensions, material preferences, artwork status, delivery timeline..." className="mt-2 w-full resize-y border-b-2 border-[#173b35]/15 bg-transparent px-0 py-2 text-base font-normal leading-relaxed text-[#173b35] outline-none transition-colors placeholder:text-[#173b35]/35 focus:border-[#14b8af]" /></label>
                {status === 'error' && <p role="alert" className="border-l-4 border-red-600 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}
                <div className="flex flex-col gap-4 border-t border-[#173b35]/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="flex items-center gap-2 text-xs leading-relaxed text-[#173b35]/60"><ShieldCheck className="h-4 w-4 shrink-0 text-[#14b8af]" /> Your project details stay with our production team.</p>
                  <button disabled={status === 'sending'} className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#14b8af] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0f958e] disabled:cursor-not-allowed disabled:opacity-70">{status === 'sending' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}{status === 'sending' ? 'Sending request' : 'Send quote request'}</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
