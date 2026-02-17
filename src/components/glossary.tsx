"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { BookOpen, ChevronDown, ExternalLink } from "lucide-react";

const GLOSSARY_KEYS = [
  { key: "inflation", sourceUrl: "https://www.ecb.europa.eu/stats/money_credit_banking/monetary_aggregates/html/index.en.html" },
  { key: "cantillon", sourceUrl: "https://en.wikipedia.org/wiki/Essai_sur_la_Nature_du_Commerce_en_G%C3%A9n%C3%A9ral" },
  { key: "rtm", sourceUrl: "https://trm.creationmonetaire.info/" },
  { key: "ud", sourceUrl: undefined },
  { key: "wot", sourceUrl: undefined },
  { key: "basket", sourceUrl: undefined },
  { key: "timeEquity", sourceUrl: undefined },
  { key: "lazyClaiming", sourceUrl: undefined },
] as const;

function useInView(rootMargin = "-50px") {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin]);
  return { ref, visible };
}

export function Glossary() {
  const t = useTranslations("glossary");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const header = useInView();

  return (
    <section id="glossary" className="relative px-6 py-32 bg-white">
      <div className="relative mx-auto max-w-4xl">
        <div
          ref={header.ref}
          className="mb-16 text-center transition-all duration-600"
          style={{
            opacity: header.visible ? 1 : 0,
            transform: header.visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s cubic-bezier(0.23,1,0.32,1), transform 0.6s cubic-bezier(0.23,1,0.32,1)",
          }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D0D0D0] bg-[#f8f8f8] px-4 py-1.5">
            <BookOpen className="h-3.5 w-3.5 text-[#1b1b1b]/60" />
            <span className="text-xs font-medium text-[#1b1b1b]/60">
              {t("badge")}
            </span>
          </div>
          <h2 className="mb-4 text-[clamp(2.5rem,5vw,4rem)] font-light tracking-[-0.04em] leading-[1.05] text-[#1b1b1b]">
            {t("title")}<span className="gradient-text">{t("titleHighlight")}</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-[#1b1b1b]/60 md:text-lg">
            {t("subtitle")}
          </p>
        </div>

        <div className="space-y-3">
          {GLOSSARY_KEYS.map((entry, index) => (
            <GlossaryItem
              key={entry.key}
              entry={entry}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              t={t}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function GlossaryItem({ entry, index, isOpen, onToggle, t }: {
  entry: { key: string; sourceUrl: string | undefined };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  t: ReturnType<typeof useTranslations<"glossary">>;
}) {
  const item = useInView();

  return (
    <div
      ref={item.ref}
      style={{
        opacity: item.visible ? 1 : 0,
        transform: item.visible ? "translateY(0)" : "translateY(10px)",
        transition: `opacity 0.3s cubic-bezier(0.23,1,0.32,1) ${index * 0.05}s, transform 0.3s cubic-bezier(0.23,1,0.32,1) ${index * 0.05}s`,
      }}
    >
      <button
        onClick={onToggle}
        className="w-full rounded-2xl border border-[#D0D0D0]/50 bg-white px-6 py-4 text-start transition-all hover:border-[#D0D0D0] hover:shadow-sm"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#FF6B00]/60">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-base font-semibold text-[#1b1b1b]">
              {t(`terms.${entry.key}.term`)}
            </h3>
          </div>
          <ChevronDown
            className={`h-4 w-4 text-[#1b1b1b]/30 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
        <p className="mt-2 ps-9 text-sm leading-relaxed text-[#1b1b1b]/45">
          {t(`terms.${entry.key}.definition`)}
        </p>
      </button>

      <div
        className="overflow-hidden transition-all duration-300"
        style={{
          maxHeight: isOpen ? "300px" : "0",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="mx-6 mt-1 rounded-b-xl border-x border-b border-[#D0D0D0]/30 bg-[#f8f8f8] px-6 py-4">
          <p className="ps-3 text-sm leading-relaxed text-[#1b1b1b]/60 border-s-2 border-[#FF6B00]/30">
            {t(`terms.${entry.key}.deepDive`)}
          </p>
          {entry.sourceUrl && (
            <a
              href={entry.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 ps-3 text-xs text-[#FF6B00]/70 hover:text-[#FF6B00] transition-colors"
            >
              <ExternalLink className="h-3 w-3" />
              {t(`terms.${entry.key}.sourceLabel`)}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
