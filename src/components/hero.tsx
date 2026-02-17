"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { ArrowDown, ExternalLink } from "lucide-react";

export function Hero() {
  const t = useTranslations("hero");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-16 bg-white">
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* Badge */}
        <div
          className="mb-10 inline-flex items-center gap-2 rounded-full border border-[#D0D0D0] bg-white px-4 py-2"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "none" : "translateY(20px)",
            transition: "opacity 0.7s cubic-bezier(0.23,1,0.32,1), transform 0.7s cubic-bezier(0.23,1,0.32,1)",
          }}
        >
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

        {/* Main Title — NO animation, always visible for LCP */}
        <h1 className="mb-8 text-[clamp(3rem,8vw,6rem)] font-light leading-[1.05] tracking-[-0.04em] text-[#1b1b1b]">
          {t("title1")}<br />
          {t("title2")} <span className="text-[#FF6B00]">{t("titleHighlight")}</span>?
        </h1>

        {/* Subtitle — NO animation, this is the LCP element */}
        <p className="mx-auto mb-14 max-w-2xl text-[clamp(1.125rem,2vw,1.25rem)] text-[#1b1b1b]/45 leading-[1.6]">
          {t("subtitle")}
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "none" : "translateY(20px)",
            transition: "opacity 0.7s cubic-bezier(0.23,1,0.32,1) 0.2s, transform 0.7s cubic-bezier(0.23,1,0.32,1) 0.2s",
          }}
        >
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
      <div
        className="absolute bottom-8 start-1/2 -translate-x-1/2"
        style={{
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.5s ease 1.5s",
        }}
      >
        <div className="animate-bounce">
          <ArrowDown className="h-4 w-4 text-[#1b1b1b]/20" />
        </div>
      </div>
    </section>
  );
}
