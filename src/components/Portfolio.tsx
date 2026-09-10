import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { CATALOG_ROOT, catalogPath } from "../data/catalog";

interface PortfolioProps {
  onOpenQuoteModal: () => void;
}

export const Portfolio: React.FC<PortfolioProps> = () => (
  <section
    id="portfolio"
    className="relative overflow-hidden bg-[#0A1930] py-20 text-white sm:py-28"
  >
    <img
      src="/images/hero/sustainable-retail-studio.png"
      alt=""
      className="absolute inset-0 h-full w-full object-cover opacity-30"
      aria-hidden="true"
    />
    <div className="absolute inset-0 bg-[#0A1930]/25" aria-hidden="true" />
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end">
        <div>
          <div className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#FFB35C]">
            <Sparkles className="h-4 w-4" /> Explore our packaging
          </div>
          <h2 className="font-heading max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            Find the format made for your product.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            Explore the key packaging categories we design, print, and
            produce—then move into the format details that fit your product.
          </p>
        </div>
        <Link
          to="/products"
          className="inline-flex shrink-0 items-center gap-2 border-b border-[#FF9933] pb-1 font-semibold text-[#FFB35C] transition-colors hover:text-white"
        >
          View full catalogue <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
        {CATALOG_ROOT.map((family) => (
          <Link
            key={family.slug}
            to={catalogPath([family])}
            className="group overflow-hidden border border-[#0A1930]/15 bg-white/95 shadow-[0_8px_24px_rgba(10,25,48,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[#FF9933] hover:shadow-[0_16px_32px_rgba(10,25,48,0.16)]"
          >
            <img
              src={family.image}
              alt={`${family.title} packaging`}
              loading="lazy"
              className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="p-5">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#d86f21]">
                {family.subtitle}
              </p>
              <h3 className="font-heading mt-2 text-2xl font-bold text-[#0A1930]">
                {family.title}
              </h3>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#0A1930]/70">
                {family.description}
              </p>
              <span className="bottom-0 mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#d86f21] transition-colors group-hover:text-[#0A1930]">
                Explore {family.title}{" "}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);
