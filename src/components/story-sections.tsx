"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, Activity, ShoppingBasket, BookOpen, MessageCircle } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Link } from "@/i18n/navigation";

export function StoryProblem() {
  const t = useTranslations("storyProblem");

  return (
    <section id="story" className="relative px-6 py-32 bg-white">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <p className="mb-6 text-[clamp(0.875rem,1.2vw,1rem)] font-medium uppercase tracking-[0.05em] text-[#FF6B00]">
            {t("label")}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="mb-8 text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[1.05] tracking-[-0.04em] text-[#1b1b1b]">
            {t("title1")}<br />
            {t("title2")}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="mb-10 max-w-2xl text-[clamp(1.125rem,2vw,1.25rem)] leading-[1.6] text-[#1b1b1b]/45">
            {t("p1")}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <p className="max-w-2xl text-[clamp(1.125rem,2vw,1.25rem)] leading-[1.6] text-[#1b1b1b]/45">
            {t("p2start")}<span className="text-[#1b1b1b]">{t("p2highlight")}</span>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

export function StorySolution() {
  const t = useTranslations("storySolution");

  return (
    <section className="relative px-6 py-32 bg-white">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <p className="mb-6 text-[clamp(0.875rem,1.2vw,1rem)] font-medium uppercase tracking-[0.05em] text-[#297FF3]">
            {t("label")}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="mb-8 text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[1.05] tracking-[-0.04em] text-[#1b1b1b]">
            {t("title1")}<br />
            {t("title2")}<span className="gradient-text">{t("titleHighlight")}</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="mb-8 max-w-2xl text-[clamp(1.125rem,2vw,1.25rem)] leading-[1.6] text-[#1b1b1b]/45">
            {t("p1")}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.25}>
          <p className="mb-12 max-w-2xl text-[clamp(1.125rem,2vw,1.25rem)] leading-[1.6] text-[#1b1b1b]/45">
            {t("p2")}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/simulation/rtm"
              className="group inline-flex items-center gap-3 rounded-full bg-[#1b1b1b] px-8 py-4 text-[clamp(0.9375rem,1.5vw,1.0625rem)] font-medium text-white transition-all hover:bg-[#333]"
            >
              <Activity className="h-4 w-4" />
              {t("cta")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export function StoryProof() {
  const t = useTranslations("storyProof");

  return (
    <section className="relative px-6 py-32 bg-[#f8f8f8]">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#4ade80]/20 bg-[#4ade80]/5 px-4 py-1.5">
            <ShoppingBasket className="h-3.5 w-3.5 text-[#4ade80]" />
            <span className="text-xs font-medium text-[#16a34a]">
              {t("badge")}
            </span>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="mb-8 text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[1.05] tracking-[-0.04em] text-[#1b1b1b]">
            {t("title1")}<br />
            {t("title2")}<span className="text-[#FF6B00]">{t("titleHighlight")}</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="mb-12 max-w-2xl text-[clamp(1.125rem,2vw,1.25rem)] leading-[1.6] text-[#1b1b1b]/45">
            {t("p1")}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <Link
            href="/simulation/basket"
            className="group inline-flex items-center gap-3 rounded-full bg-[#1b1b1b] px-8 py-4 text-[clamp(0.9375rem,1.5vw,1.0625rem)] font-medium text-white transition-all hover:bg-[#333]"
          >
            <ShoppingBasket className="h-4 w-4" />
            {t("cta")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}

export function StoryInstitutional() {
  const t = useTranslations("storyInstitutional");

  return (
    <section className="relative px-6 py-32 bg-white">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <p className="mb-6 text-[clamp(0.875rem,1.2vw,1rem)] font-medium uppercase tracking-[0.05em] text-[#297FF3]">
            {t("label")}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="mb-8 text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[1.05] tracking-[-0.04em] text-[#1b1b1b]">
            {t("title1")}<br />
            {t("title2")}<span className="gradient-text">{t("titleHighlight")}</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="mb-8 max-w-2xl text-[clamp(1.125rem,2vw,1.25rem)] leading-[1.6] text-[#1b1b1b]/45">
            {t("p1")}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.25}>
          <div className="mb-12 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#D0D0D0]/50 bg-[#f8f8f8] p-5">
              <p className="mb-2 text-sm font-semibold text-[#1b1b1b]">
                {t("card1Title")}
              </p>
              <p className="text-xs leading-relaxed text-[#1b1b1b]/60">
                {t("card1Text")}
              </p>
            </div>
            <div className="rounded-2xl border border-[#D0D0D0]/50 bg-[#f8f8f8] p-5">
              <p className="mb-2 text-sm font-semibold text-[#1b1b1b]">
                {t("card2Title")}
              </p>
              <p className="text-xs leading-relaxed text-[#1b1b1b]/60">
                {t("card2Text")}
              </p>
            </div>
            <div className="rounded-2xl border border-[#D0D0D0]/50 bg-[#f8f8f8] p-5">
              <p className="mb-2 text-sm font-semibold text-[#1b1b1b]">
                {t("card3Title")}
              </p>
              <p className="text-xs leading-relaxed text-[#1b1b1b]/60">
                {t("card3Text")}
              </p>
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <p className="max-w-2xl text-[clamp(1.125rem,2vw,1.25rem)] leading-[1.6] text-[#1b1b1b]/45">
            {t("p2")}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

export function StoryLearn() {
  const t = useTranslations("storyLearn");

  return (
    <section className="relative px-6 py-32 bg-white">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <p className="mb-6 text-[clamp(0.875rem,1.2vw,1rem)] font-medium uppercase tracking-[0.05em] text-[#1b1b1b]/30">
            {t("label")}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="mb-8 text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[1.05] tracking-[-0.04em] text-[#1b1b1b]">
            {t("title1")}<br />
            <span className="gradient-text">{t("titleHighlight")}</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="mb-12 max-w-2xl text-[clamp(1.125rem,2vw,1.25rem)] leading-[1.6] text-[#1b1b1b]/45">
            {t("p1")}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <Link
            href="/glossary"
            className="group inline-flex items-center gap-3 rounded-full border border-[#D0D0D0] px-8 py-4 text-[clamp(0.9375rem,1.5vw,1.0625rem)] font-medium text-[#1b1b1b] transition-all hover:border-[#999]"
          >
            <BookOpen className="h-4 w-4" />
            {t("cta")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}

export function StoryClosing() {
  const t = useTranslations("storyClosing");

  return (
    <section className="relative px-6 py-40 bg-[#1b1b1b]">
      <div className="mx-auto max-w-4xl text-center">
        <ScrollReveal>
          <h2 className="mb-8 text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[1.05] tracking-[-0.04em] text-white">
            {t("title1")}<br />
            {t("title2")}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <p className="mx-auto mb-12 max-w-xl text-[clamp(1.125rem,2vw,1.25rem)] leading-[1.6] text-white/40">
            {t("p1")}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.25}>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://www.uvd.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-[clamp(0.9375rem,1.5vw,1.0625rem)] font-medium text-[#1b1b1b] transition-all hover:bg-white/90"
            >
              {t("ctaOfficial")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
            </a>
            <a
              href="https://rose-biological-bird-527.mypinata.cloud/ipfs/bafkreig5445hg6o5lgjjtq7ftprhdbrvbfmoekjopimibxazqv3xtwsqi4"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-4 text-[clamp(0.9375rem,1.5vw,1.0625rem)] font-medium text-white/60 transition-all hover:border-white/30 hover:text-white"
            >
              {t("ctaShortpaper")}
            </a>
            <Link
              href="/community"
              className="group inline-flex items-center gap-2 rounded-full border border-[#FF6B00]/40 px-8 py-4 text-[clamp(0.9375rem,1.5vw,1.0625rem)] font-medium text-[#FF6B00] transition-all hover:border-[#FF6B00] hover:bg-[#FF6B00]/10"
            >
              <MessageCircle className="h-4 w-4" />
              {t("ctaCommunity")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
