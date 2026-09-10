import React from 'react';
import { ArrowRight, Leaf, PenTool, Printer, Package, Phone, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const CAPABILITIES = [
  {
    icon: PenTool,
    title: 'Design for the product',
    description: 'Custom structural dielines, artwork setup and plain samples help every pack fit and present your product well.',
    accent: 'text-[#2F6FED] bg-[#2F6FED]/10 border-[#2F6FED]/20',
  },
  {
    icon: Printer,
    title: 'Print with precision',
    description: 'Offset and digital printing, accurate colour matching and considered finishes keep your brand consistent.',
    accent: 'text-[#FF9933] bg-[#FF9933]/10 border-[#FF9933]/20',
  },
  {
    icon: Package,
    title: 'Pack ready to ship',
    description: 'Die-cutting, folding, gluing and protective inserts bring the finished packaging safely to dispatch.',
    accent: 'text-[#31574F] bg-[#31574F]/10 border-[#31574F]/20',
  },
];

export const AboutPage: React.FC = () => {
  return (
    <div className="overflow-hidden bg-[#FAF7F2] text-[#161B22]">
      <section className="relative isolate flex h-[100dvh] min-h-[100svh] items-center overflow-hidden bg-[#0A1930] px-4 py-20 text-white sm:px-6 sm:py-28 lg:px-8">
        <img src="/images/hero/burgundy-packaging-studio.png" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-[#0A1930]/10" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#081426]/72 via-[#081426]/38 to-transparent" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl">
          <div className="">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#FF9933]/35 bg-[#FF9933]/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#FFB35C]"><Sparkles className="h-3.5 w-3.5" /> About AGL Creatives</p>
            <h1 className="font-heading mt-5 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">Packaging made practical, memorable and ready to move.</h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">AGL Creatives brings design, print and packaging together so brands can move from an idea to a well-made pack with one collaborative production partner.</p>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="absolute -left-28 top-24 h-64 w-64 rounded-full bg-[#FF5B8A]/10 blur-3xl" aria-hidden="true" />
        <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div className="relative order-2 lg:order-1">
            <div className="absolute -left-4 top-10 h-[82%] w-[82%] rounded-3xl bg-[#FFB35C]/35 sm:-left-7" aria-hidden="true" />
            <img src="/images/hero/burgundy-packaging-studio.png" alt="Kraft packaging prepared in AGL Creatives' studio" className="relative aspect-[4/3] w-full rounded-3xl border border-[#0A1930]/10 object-cover shadow-[0_24px_50px_rgba(10,25,48,0.14)]" />
            <div className="absolute -bottom-5 -right-3 hidden rounded-2xl border border-white/70 bg-white/90 p-4 shadow-lg backdrop-blur sm:block">
              <Leaf className="h-6 w-6 text-[#31574F]" />
              <p className="mt-1 text-xs font-bold text-[#0A1930]">Thoughtful material choices</p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#2F6FED]">Who we are</p>
            <h2 className="font-heading mt-3 text-3xl font-bold text-[#0A1930] sm:text-4xl">A hands-on partner for packaging that works.</h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-[#161B22]/75 sm:text-base">
              <p>AGL Creatives is a printing and packaging solutions company that helps businesses turn product requirements into packaging that is ready for the shelf, the shipping box and the customer’s hands.</p>
              <p>We work across folding cartons, rigid boxes, corrugated mailers, labels and protective inserts. That range lets us match the structure, material, print finish and level of protection to the product rather than forcing every brief into one format.</p>
              <p>Our approach stays practical and collaborative: begin with the brief, clarify the details that affect production, and guide the project through dielines, artwork, sampling and final packaging. The aim is a pack that supports your brand while making packing, presentation and delivery easier.</p>
            </div>
            <Link to="/request-quote" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#FF9933] px-5 py-3 text-sm font-bold text-[#0A1930] shadow-[0_5px_16px_rgba(255,153,51,0.3)] transition-all hover:-translate-y-0.5 hover:bg-[#FFB35C]">Discuss your project <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section className="relative border-y border-[#12295A]/10 bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#FF9933]">What we do</p>
            <h2 className="font-heading mt-3 text-3xl font-bold text-[#0A1930] sm:text-4xl">From the first line to the final fold.</h2>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-[#161B22]/70 sm:text-base">
              <p>Our packaging range starts with boxes: folding cartons for retail presentation, rigid boxes for gifting and premium products, and corrugated or mailer boxes for protective shipping and e-commerce orders. We also create display, specialty and food-service formats where the product or retail setting calls for a more specific structure.</p>
              <p>We also create labels and stickers for product identity, information and promotional use. Each can be specified around the surface, print and finishing needs of the application.</p>
              <p>Beyond the primary pack, our retail and e-commerce supplies support the complete delivery experience with shipping protection, packing materials and unboxing details. Together, these solutions help brands prepare products for presentation, fulfillment and distribution from one packaging partner.</p>
            </div>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {CAPABILITIES.map(({ icon: Icon, title, description, accent }) => (
              <article key={title} className="group rounded-3xl border border-[#12295A]/10 bg-[#FAF7F2] p-7 shadow-[0_8px_26px_rgba(10,25,48,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(10,25,48,0.11)]">
                <div className={`flex h-13 w-13 items-center justify-center rounded-2xl border ${accent}`}><Icon className="h-6 w-6" /></div>
                <h3 className="font-heading mt-6 text-2xl font-bold text-[#0A1930]">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#161B22]/70">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#31574F] px-4 py-18 text-white sm:px-6 sm:py-22 lg:px-8">
        <img src="/images/hero/sustainable-retail-studio.png" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-[#173B35]/60" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#FFB35C]">Plan a visit or a call</p>
            <h2 className="font-heading mt-3 max-w-2xl text-3xl font-bold sm:text-4xl">Bring your packaging brief to the table.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">Tell us about the product, format, quantity and timeline. We’ll help turn the essential details into a production-ready quote.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <Link to="/request-quote" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FF9933] px-5 py-3 text-sm font-bold text-[#0A1930] transition-colors hover:bg-[#FFB35C]">Request a quote <ArrowRight className="h-4 w-4" /></Link>
            <a href="tel:+917982214262" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white/20"><Phone className="h-4 w-4" /> Call our team</a>
          </div>
        </div>
      </section>
    </div>
  );
};
