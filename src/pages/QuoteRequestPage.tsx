import React, { useState } from "react";
import {
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileText,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { readApiResult } from "../lib/api";

interface QuoteFormState {
  name: string;
  email: string;
  company: string;
  quantity: string;
  requirements: string;
}
const INITIAL_FORM: QuoteFormState = {
  name: "",
  email: "",
  company: "",
  quantity: "",
  requirements: "",
};
const FAQS = [
  [
    "What information should I provide for a quote?",
    "Share your product type, preferred packaging format, dimensions if known, expected quantity, artwork status and delivery timeline. A rough brief is enough to start the conversation.",
  ],
  [
    "Can I request custom packaging?",
    "Yes. We can help with custom box sizing, structural dielines, artwork setup and production for packaging shaped around your product.",
  ],
  [
    "What packaging materials do you offer?",
    "Our projects include folding carton board, rigid box materials, corrugated board, kraft paper, labels and protective inserts. We will recommend options based on the product and finish you need.",
  ],
  [
    "What are the minimum order quantities?",
    "Minimum quantities depend on the format, material, printing method and finish. Include your expected quantity in the form and we’ll advise on the most practical production route.",
  ],
  [
    "How long does it take to receive a quote?",
    "Our production team aims to respond within 24 business hours. More detailed or custom briefs may need a follow-up before we can provide an accurate quote.",
  ],
  [
    "Can I request samples or help with specifications?",
    "Yes. We can arrange plain white samples for size fitting and help you work through dielines, material weight, print finishes and other specifications before production.",
  ],
];

export const QuoteRequestPage: React.FC = () => {
  const [form, setForm] = useState<QuoteFormState>(INITIAL_FORM);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [error, setError] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const updateField = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) =>
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  const submitQuote = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/inquiries/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await readApiResult(response);
      if (!response.ok)
        throw new Error(result.message || "Unable to send your request.");
      setStatus("sent");
      setForm(INITIAL_FORM);
    } catch (submissionError) {
      setStatus("error");
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Unable to send your request.",
      );
    }
  };
  const fieldClass =
    "mt-2 w-full border-b-2 border-[#12295A]/15 bg-transparent px-0 py-2 text-base font-medium text-[#0A1930] outline-none transition-colors focus:border-[#FF9933]";
  return (
    <div className="bg-[#FAF7F2] text-[#161B22]">
      <section className="relative isolate flex h-[60dvh] min-h-[60svh] items-center overflow-hidden bg-[#0A1930] px-4 pb-28 pt-28 text-white sm:px-6 sm:pt-32 lg:pb-36">
        <img
          src="/images/hero/folding-cartons-studio.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0A1930]/75" aria-hidden="true" />
        <div
          className="absolute -right-20 -top-28 h-72 w-72 rounded-full border-[40px] border-[#FF9933]/20"
          aria-hidden="true"
        />
        <div className="relative mx-auto w-full max-w-7xl text-left">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#FF9933]/30 bg-[#FF9933]/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#FFB35C]">
            <FileText className="h-4 w-4" /> Quote request
          </p>
          <h1 className="font-heading mt-4 text-4xl font-bold leading-tight sm:text-5xl">
            Let&apos;s build your next package.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-200 sm:text-base">
            Tell us what you need and our packaging team will turn your brief
            into a practical production plan and quote.
          </p>
        </div>
      </section>
      <section className="relative mx-auto -mt-20 w-full max-w-6xl px-4 pb-18 sm:-mt-28 sm:px-6 lg:px-8 lg:pb-24">
        <div className="overflow-hidden rounded-3xl border border-[#12295A]/10 bg-white shadow-[0_20px_55px_rgba(10,25,48,0.16)] lg:grid lg:grid-cols-[minmax(270px,0.82fr)_minmax(0,1.55fr)]">
          <aside
            className="relative overflow-hidden bg-[#31574F] p-7 text-white sm:p-9 lg:p-10"
            aria-label="Contact information"
          >
            <img
              src="/images/hero/kraft-mailer-studio.png"
              alt="Custom packaging sample"
              className="absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-multiply"
            />
            <div
              className="absolute -bottom-20 -right-20 h-56 w-56 rounded-full border-[28px] border-[#FFB35C]/25"
              aria-hidden="true"
            />
            <div className="relative flex h-full flex-col">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#FFB35C]">
                  AGL Creatives
                </p>
                <h2 className="font-heading mt-3 text-3xl font-bold">
                  Project details, handled with care.
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-white/85">
                  From first specifications to final delivery, our team will
                  help you choose the right structure, material and print
                  finish.
                </p>
              </div>
              <div className="mt-10 space-y-5 text-sm">
                <a
                  href="tel:+917982214262"
                  className="flex items-start gap-3 transition-opacity hover:opacity-75"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#FFB35C]" />
                  <span>
                    <strong className="block">+91 79822 14262</strong>
                    <span className="text-white/75">
                      Mon-Sat, 10 AM-6 PM IST
                    </span>
                  </span>
                </a>
                <a
                  href="mailto:support@aglcreatives.in"
                  className="flex items-start gap-3 transition-opacity hover:opacity-75"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#FFB35C]" />
                  <span>
                    <strong className="block">support@aglcreatives.in</strong>
                    <span className="text-white/75">
                      For production inquiries
                    </span>
                  </span>
                </a>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#FFB35C]" />
                  <span>
                    <strong className="block">Faridabad, Haryana</strong>
                    <span className="text-white/75">India</span>
                  </span>
                </div>
              </div>
              <div className="mt-10 border-t border-white/20 pt-5 text-sm text-white/85">
                <span className="flex items-center gap-2">
                  <Clock3 className="h-4 w-4 text-[#FFB35C]" /> Response within
                  24 business hours
                </span>
              </div>
            </div>
          </aside>
          <div className="p-7 sm:p-9 lg:p-11">
            {status === "sent" ? (
              <div className="flex min-h-[430px] max-w-xl flex-col justify-center">
                <CheckCircle2 className="h-12 w-12 text-[#2F6FED]" />
                <h2 className="font-heading mt-5 text-3xl font-bold text-[#0A1930]">
                  Inquiry received
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#161B22]/70">
                  Thank you. Your quote request has been sent to our production
                  team at AGL Creatives.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-7 w-fit rounded-full border border-[#0A1930] px-5 py-3 text-sm font-bold text-[#0A1930] transition-colors hover:bg-[#0A1930] hover:text-white"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={submitQuote} className="space-y-7">
                <div>
                  <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#2F6FED]">
                    <Sparkles className="h-3.5 w-3.5" /> Your packaging brief
                  </p>
                  <h2 className="font-heading mt-2 text-3xl font-bold text-[#0A1930]">
                    Share the essentials.
                  </h2>
                </div>
                <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                  <label className="block text-xs font-bold text-[#0A1930]/70">
                    YOUR NAME *
                    <input
                      required
                      name="name"
                      value={form.name}
                      onChange={updateField}
                      autoComplete="name"
                      className={fieldClass}
                    />
                  </label>
                  <label className="block text-xs font-bold text-[#0A1930]/70">
                    YOUR EMAIL *
                    <input
                      required
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={updateField}
                      autoComplete="email"
                      className={fieldClass}
                    />
                  </label>
                  <label className="block text-xs font-bold text-[#0A1930]/70">
                    COMPANY / BRAND
                    <input
                      name="company"
                      value={form.company}
                      onChange={updateField}
                      autoComplete="organization"
                      className={fieldClass}
                    />
                  </label>
                  <label className="block text-xs font-bold text-[#0A1930]/70">
                    EXPECTED QUANTITY
                    <select
                      required
                      name="quantity"
                      value={form.quantity}
                      onChange={updateField}
                      className={fieldClass}
                    >
                      <option value="">Select quantity</option>
                      <option>250 - 500 units</option>
                      <option>1,000 - 5,000 units</option>
                      <option>10,000 - 50,000 units</option>
                      <option>100,000+ units</option>
                    </select>
                  </label>
                </div>
                <label className="block text-xs font-bold text-[#0A1930]/70">
                  PROJECT REQUIREMENTS *
                  <textarea
                    required
                    name="requirements"
                    value={form.requirements}
                    onChange={updateField}
                    rows={5}
                    placeholder="Product details, dimensions, material preferences, artwork status, delivery timeline..."
                    className={`${fieldClass} resize-y font-normal leading-relaxed placeholder:text-[#0A1930]/35`}
                  />
                </label>
                {status === "error" && (
                  <p
                    role="alert"
                    className="border-l-4 border-red-600 bg-red-50 px-4 py-3 text-sm text-red-800"
                  >
                    {error}
                  </p>
                )}
                <div className="flex flex-col gap-4 border-t border-[#12295A]/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="flex items-center gap-2 text-xs leading-relaxed text-[#161B22]/60">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-[#2F6FED]" />{" "}
                    Your project details stay with our production team.
                  </p>
                  <button
                    disabled={status === "sending"}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#FF9933] px-6 py-3 text-sm font-bold text-[#0A1930] transition-all hover:bg-[#FFB35C] hover:shadow-[0_5px_16px_rgba(255,153,51,0.3)] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {status === "sending" ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    {status === "sending"
                      ? "Sending request"
                      : "Send quote request"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
      <section className="relative border-t border-[#12295A]/10 bg-white px-4 py-18 sm:px-6 sm:py-22 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#FF9933]">
              Helpful details
            </p>
            <h2 className="font-heading mt-3 text-3xl font-bold text-[#0A1930] sm:text-4xl">
              Quote request FAQs
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#161B22]/70">
              A few practical answers before you send us your packaging brief.
            </p>
          </div>
          <div className="mt-10 divide-y divide-[#12295A]/10 rounded-2xl border border-[#12295A]/10 bg-[#FAF7F2] px-5 sm:px-7">
            {FAQS.map(([question, answer], index) => {
              const isOpen = openFaq === index;
              const panelId = `quote-faq-panel-${index}`;
              const buttonId = `quote-faq-button-${index}`;
              return (
                <div key={question}>
                  <button
                    id={buttonId}
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between gap-5 py-5 text-left text-sm font-bold text-[#0A1930] sm:text-base"
                  >
                    <span>{question}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-[#FF9933] transition-transform duration-300 ease-out motion-reduce:transition-none ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    aria-hidden={!isOpen}
                    className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <p
                        className={`max-w-3xl pb-5 text-sm leading-relaxed text-[#161B22]/70 transition-all duration-300 ease-out motion-reduce:transition-none ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"}`}
                      >
                        {answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
