"use client";

import { useTranslations } from "next-intl";
import { ArrowDown, ExternalLink } from "lucide-react";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-16 bg-white">
      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFadeUpLarge {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes heroBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        .hero-badge { animation: heroFadeUp 0.7s cubic-bezier(0.23,1,0.32,1) both; }
        .hero-title { animation: heroFadeUpLarge 0.7s cubic-bezier(0.23,1,0.32,1) 0.1s both; }
        .hero-subtitle { animation: heroFadeUp 0.7s cubic-bezier(0.23,1,0.32,1) 0.2s both; }
        .hero-cta { animation: heroFadeUp 0.7s cubic-bezier(0.23,1,0.32,1) 0.3s both; }
        .hero-scroll { animation: heroFadeIn 0.5s ease 1.5s both; }
        .hero-scroll-arrow { animation: heroBounce 2s ease-in-out infinite; }
      `}</style>
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* Badge */}
        <div className="hero-badge mb-10 inline-flex items-center gap-2 rounded-full border border-[#D0D0D0] bg-white px-4 py-2">
          <div className="h-1.5 w-1.5 rounded-full bg-[#FF6B00] animate-pulse" />
          <span className="text-[clamp(0.75rem,1.2vw,0.875rem)] text-[#1b1b1b]/60">
            {t("badge")}
          </span>
          <a
            href="https://www.uvd.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[clamp(0.75rem,1.2vw,0.875rem)] font-medium text-[#FF6B00]/80 hover:text-[#FF6B00] transition-colors"
          >
            uvd.xyz
            <ExternalLink className="h-2.5 w-2.5" />
          </a>
        </div>

        {/* Main Title */}
        <h1 className="hero-title mb-8 text-[clamp(3rem,8vw,6rem)] font-light leading-[1.05] tracking-[-0.04em] text-[#1b1b1b]">
          {t("title1")}<br />
          {t("title2")} <span className="text-[#FF6B00]">{t("titleHighlight")}</span>?
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle mx-auto mb-14 max-w-2xl text-[clamp(1.125rem,2vw,1.25rem)] text-[#1b1b1b]/45 leading-[1.6]">
          {t("subtitle")}
        </p>

        {/* CTA Buttons */}
        <div className="hero-cta flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#story"
            className="group flex items-center gap-2 rounded-full bg-[#1b1b1b] px-8 py-4 text-[clamp(0.9375rem,1.5vw,1.0625rem)] font-medium text-white transition-all hover:bg-[#333]"
          >
            {t("ctaStory")}
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>
          <a
            href="https://www.uvd.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-[#D0D0D0] px-8 py-4 text-[clamp(0.9375rem,1.5vw,1.0625rem)] font-medium text-[#1b1b1b] transition-all hover:border-[#999]"
          >
            {t("ctaOfficial")}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll absolute bottom-8 start-1/2 -translate-x-1/2">
        <div className="hero-scroll-arrow">
          <ArrowDown className="h-4 w-4 text-[#1b1b1b]/20" />
        </div>
      </div>
    </section>
  );
}
