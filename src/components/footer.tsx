"use client";

import { useTranslations } from "next-intl";
import { ExternalLink } from "lucide-react";
import { reopenCookieConsent } from "@/components/cookie-consent";
import { Link } from "@/i18n/navigation";
import { NewsletterCTA } from "@/components/newsletter-cta";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-[#D0D0D0]/30 bg-[#1b1b1b] px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <span className="text-[17px] font-semibold tracking-tight leading-tight">
                <span className="text-[#FF6B00]">UVD</span>
                <span className="text-white">.TRADING</span>
              </span>
              <p className="mt-0.5 text-[11px] text-white/30">Universe Dollar</p>
            </div>
            <p className="text-sm leading-relaxed text-white/40">
              {t("brandDescription")}
            </p>
          </div>

          {/* Simulations */}
          <div>
            <span role="heading" aria-level={3} className="mb-4 text-xs font-semibold uppercase tracking-[0.05em] text-white/30">
              {t("simulations")}
            </span>
            <div className="space-y-3">
              <Link
                href="/simulation/time-theft"
                className="block text-sm text-white/50 hover:text-white transition-colors"
              >
                {useTranslations("nav")("timeTheft")}
              </Link>
              <Link
                href="/simulation/rtm"
                className="block text-sm text-white/50 hover:text-white transition-colors"
              >
                {useTranslations("nav")("rtmModel")}
              </Link>
              <Link
                href="/simulation/basket"
                className="block text-sm text-white/50 hover:text-white transition-colors"
              >
                {useTranslations("nav")("basketIndex")}
              </Link>
              <Link
                href="/glossary"
                className="block text-sm text-white/50 hover:text-white transition-colors"
              >
                {useTranslations("nav")("glossary")}
              </Link>
              <Link
                href="/community"
                className="block text-sm text-white/50 hover:text-white transition-colors"
              >
                {useTranslations("nav")("community")}
              </Link>
              <Link
                href="/updates"
                className="block text-sm text-white/50 hover:text-white transition-colors"
              >
                {useTranslations("nav")("updates")}
              </Link>
              <Link
                href="/about-uvd"
                className="block text-sm text-white/50 hover:text-white transition-colors"
              >
                {useTranslations("nav")("aboutUvd")}
              </Link>
              <Link
                href="/faq"
                className="block text-sm text-white/50 hover:text-white transition-colors"
              >
                {useTranslations("nav")("faq")}
              </Link>
            </div>
          </div>

          {/* Official Resources */}
          <div>
            <span role="heading" aria-level={3} className="mb-4 text-xs font-semibold uppercase tracking-[0.05em] text-white/30">
              {t("officialResources")}
            </span>
            <div className="space-y-3">
              <a
                href="https://www.uvd.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors"
              >
                uvd.xyz
                <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href="https://rose-biological-bird-527.mypinata.cloud/ipfs/bafkreig5445hg6o5lgjjtq7ftprhdbrvbfmoekjopimibxazqv3xtwsqi4"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors"
              >
                {t("shortpaper")}
                <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href="https://rose-biological-bird-527.mypinata.cloud/ipfs/bafkreide3ntd3hitginvxhhkcjspa3xgu4mwcx3nxfocrrl4d4p3jxigoi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors"
              >
                {t("whitepaper")}
                <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href="https://uwd.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors"
              >
                {t("uwd")}
                <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href="https://uwd.xyz/udrp"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors"
              >
                {t("udrp")}
                <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href="https://x.com/uvd99"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors"
              >
                {t("twitter")}
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Theory */}
          <div>
            <span role="heading" aria-level={3} className="mb-4 text-xs font-semibold uppercase tracking-[0.05em] text-white/30">
              {t("foundation")}
            </span>
            <div className="space-y-3">
              <a
                href="https://trm.creationmonetaire.info/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors"
              >
                {t("relativeTheory")}
                <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href="https://en.wikipedia.org/wiki/Cantillon_effect"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors"
              >
                {t("cantillonEffect")}
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <span role="heading" aria-level={3} className="mb-4 mt-8 text-xs font-semibold uppercase tracking-[0.05em] text-white/30">
              {t("legal")}
            </span>
            <div className="space-y-3">
              <Link
                href="/legal"
                className="block text-sm text-white/50 hover:text-white transition-colors"
              >
                {t("legalNotice")}
              </Link>
              <Link
                href="/privacy"
                className="block text-sm text-white/50 hover:text-white transition-colors"
              >
                {t("privacyPolicy")}
              </Link>
              <button
                onClick={() => reopenCookieConsent()}
                className="block text-sm text-white/50 hover:text-white transition-colors text-start"
              >
                {t("cookieSettings")}
              </button>
            </div>
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="mt-12">
          <NewsletterCTA variant="footer" />
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-12 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
          <span role="heading" aria-level={3} className="mb-2 text-xs font-semibold uppercase tracking-[0.05em] text-white/30">
            {t("disclaimerTitle")}
          </span>
          <p className="text-xs leading-[1.8] text-white/25">
            {t("disclaimer")}
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 md:flex-row">
          <p className="text-xs text-white/20">
            {t("independentSite")} &middot; {t("notFinancialAdvice")} &middot;{" "}
            <Link href="/legal" className="hover:text-white/40 transition-colors">{t("legal")}</Link>
            {" "}&middot;{" "}
            <Link href="/privacy" className="hover:text-white/40 transition-colors">{t("privacyPolicy")}</Link>
          </p>
          <div className="flex flex-col items-center gap-1 md:items-end">
            <p className="text-xs text-white/20">
              &copy; {new Date().getFullYear()} {t("copyright")}
            </p>
            <p className="text-[10px] text-white/15">
              {t("builtBy")}{" "}
              <a
                href="https://p-a.llc"
                target="_blank"
                rel="noopener"
                className="text-white/25 hover:text-white/40 transition-colors"
              >
                Prime Associates LLC
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
