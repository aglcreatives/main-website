import React from "react";
import { ArrowRight, Clock3, PackageCheck } from "lucide-react";

interface ProductsPageProps {
  onOpenQuoteModal: () => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  onOpenQuoteModal,
}) => (
  <div className="relative isolate min-h-screen overflow-hidden bg-[#f2eee7] text-[#0A1930]">
    <img
      src="/images/hero/folding-cartons-studio.png"
      alt=""
      className="absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-30"
      aria-hidden="true"
    />
    <div
      className="absolute inset-0 -z-10 bg-[#f2eee7]/25"
      aria-hidden="true"
    />
    <section className="mx-auto flex min-h-[calc(100vh-7rem)] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 border border-[#0A1930]/20 bg-white/65 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] backdrop-blur-sm">
          <Clock3 className="h-4 w-4 text-[#d86f21]" /> Product catalogue
        </div>
        <h1 className="font-heading mt-6 text-5xl font-bold leading-[1.03] sm:text-6xl lg:text-7xl">
          Our product page is coming soon.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#0A1930]/75 sm:text-lg">
          We are building a better way to explore every box, bag, label,
          material, and finish. For now, our team can help you find the right
          format directly.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onOpenQuoteModal}
            className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#0A1930] px-6 py-3 font-bold text-white transition-colors hover:bg-[#12295A]"
          >
            Request a product quote <ArrowRight className="h-4 w-4" />
          </button>
          <a
            href="/#services"
            className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#0A1930]/30 bg-white/60 px-6 py-3 font-semibold transition-colors hover:bg-white"
          >
            Explore our services <PackageCheck className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  </div>
);
