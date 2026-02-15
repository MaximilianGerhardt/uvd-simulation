"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, AlertTriangle } from "lucide-react";
import { SubpageLayout } from "@/components/subpage-layout";

const FAQ_SECTIONS = [
  {
    sectionKey: "about" as const,
    items: ["whatIsUvd", "whoCreated", "kianHoss", "whatIsThis"] as const,
  },
  {
    sectionKey: "trust" as const,
    items: ["isScam", "isLegit", "regulated"] as const,
  },
  {
    sectionKey: "technology" as const,
    items: ["howWorks", "stablecoin", "blockchain", "rtmExplained", "cantillonWhat", "inflationCalc"] as const,
  },
  {
    sectionKey: "gettingStarted" as const,
    items: ["canBuy", "whenLaunch"] as const,
  },
];

export default function FAQPage() {
  const t = useTranslations("faq");
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  let globalIndex = 0;

  return (
    <SubpageLayout>
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D0D0D0] bg-[#f8f8f8] px-4 py-1.5">
              <HelpCircle className="h-3.5 w-3.5 text-[#1b1b1b]/50" />
              <span className="text-xs font-medium text-[#1b1b1b]/50">
                {t("badge")}
              </span>
            </div>
            <h1 className="mb-4 text-[clamp(2.5rem,5vw,4rem)] font-light tracking-[-0.04em] leading-[1.05] text-[#1b1b1b]">
              {t("title")}<span className="text-[#FF6B00]">{t("titleHighlight")}</span>
            </h1>
            <p className="mx-auto max-w-2xl text-base text-[#1b1b1b]/50 md:text-lg">
              {t("subtitle")}
            </p>
          </motion.div>

          {/* Disclaimer Banner */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mb-12 flex items-start gap-3 rounded-xl border border-[#FF6B00]/20 bg-[#FF6B00]/5 p-4"
          >
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#FF6B00]" />
            <p className="text-sm text-[#1b1b1b]/60">
              {t("disclaimer")}
            </p>
          </motion.div>

          {/* FAQ Sections */}
          {FAQ_SECTIONS.map((section) => (
            <div key={section.sectionKey} className="mb-10">
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.05em] text-[#1b1b1b]/30">
                {t(`sections.${section.sectionKey}`)}
              </h2>
              <div className="space-y-3">
                {section.items.map((itemKey) => {
                  const currentIndex = `${section.sectionKey}-${itemKey}`;
                  globalIndex++;
                  const num = globalIndex;

                  return (
                    <motion.div
                      key={itemKey}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3 }}
                    >
                      <button
                        onClick={() =>
                          setOpenIndex(openIndex === currentIndex ? null : currentIndex)
                        }
                        className="w-full rounded-2xl border border-[#D0D0D0]/50 bg-white px-6 py-4 text-start transition-all hover:border-[#D0D0D0] hover:shadow-sm"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs text-[#FF6B00]/60">
                              {String(num).padStart(2, "0")}
                            </span>
                            <h3 className="text-base font-semibold text-[#1b1b1b]">
                              {t(`items.${itemKey}.q`)}
                            </h3>
                          </div>
                          <ChevronDown
                            className={`h-4 w-4 shrink-0 text-[#1b1b1b]/30 transition-transform ${
                              openIndex === currentIndex ? "rotate-180" : ""
                            }`}
                          />
                        </div>
                      </button>

                      <AnimatePresence>
                        {openIndex === currentIndex && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="mx-6 mt-1 rounded-b-xl border-x border-b border-[#D0D0D0]/30 bg-[#f8f8f8] px-6 py-4">
                              <p className="ps-3 text-sm leading-relaxed text-[#1b1b1b]/60 border-s-2 border-[#FF6B00]/30">
                                {t(`items.${itemKey}.a`)}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </SubpageLayout>
  );
}
