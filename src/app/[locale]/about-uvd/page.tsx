"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Info, ArrowRight, ExternalLink } from "lucide-react";
import { SubpageLayout } from "@/components/subpage-layout";
import { Link } from "@/i18n/navigation";

export default function AboutUVDPage() {
  const t = useTranslations("aboutUvd");

  const sections = [
    { titleKey: "whatTitle" as const, textKey: "whatText" as const },
    { titleKey: "howTitle" as const, textKey: "howText" as const },
    { titleKey: "whyTitle" as const, textKey: "whyText" as const },
    { titleKey: "whoTitle" as const, textKey: "whoText" as const },
  ];

  return (
    <SubpageLayout>
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D0D0D0] bg-[#f8f8f8] px-4 py-1.5">
              <Info className="h-3.5 w-3.5 text-[#1b1b1b]/50" />
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

          {/* Content Sections */}
          <div className="space-y-12">
            {sections.map((section, index) => (
              <motion.div
                key={section.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl border border-[#D0D0D0]/50 bg-white p-8"
              >
                <div className="flex items-start gap-4">
                  <span className="mt-1 font-mono text-sm text-[#FF6B00]/60">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="mb-3 text-xl font-semibold text-[#1b1b1b]">
                      {t(section.titleKey)}
                    </h2>
                    <p className="text-base leading-[1.7] text-[#1b1b1b]/50">
                      {t(section.textKey)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Learn More Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16 rounded-2xl bg-[#f8f8f8] p-8 text-center"
          >
            <h2 className="mb-3 text-2xl font-light text-[#1b1b1b]">
              {t("learnMore")}
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-base text-[#1b1b1b]/50">
              {t("learnMoreText")}
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/simulation/time-theft"
                className="group inline-flex items-center gap-2 rounded-full bg-[#1b1b1b] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#333]"
              >
                {t("ctaSimulation")}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
              </Link>
              <Link
                href="/glossary"
                className="group inline-flex items-center gap-2 rounded-full border border-[#D0D0D0] px-6 py-3 text-sm font-medium text-[#1b1b1b] transition-all hover:border-[#999]"
              >
                {t("ctaGlossary")}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
              </Link>
              <a
                href="https://www.uvd.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#D0D0D0] px-6 py-3 text-sm font-medium text-[#1b1b1b] transition-all hover:border-[#999]"
              >
                {t("ctaOfficial")}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </SubpageLayout>
  );
}
