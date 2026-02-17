import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import {
  Globe,
  Layers,
  Landmark,
  Coins,
  ArrowRight,
  ExternalLink,
  Clock,
  Building2,
  Users,
  Leaf,
  Shield,
  Handshake,
  Smartphone,
  CreditCard,
  ChevronDown,
  Wallet,
  ArrowDownUp,
  BadgeCheck,
} from "lucide-react";
import { SubpageLayout } from "@/components/subpage-layout";
import { PageBreadcrumb } from "@/components/structured-data";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Link } from "@/i18n/navigation";
import { NewsletterCTA } from "@/components/newsletter-cta";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "uwdReveal" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      type: "article",
      publishedTime: "2026-02-17T00:00:00Z",
      authors: ["Prime Associates LLC"],
      tags: ["UWD", "UDRP", "UVD", "Universe Dollar", "Sovereign Reform"],
    },
  };
}

const UWD_PILLARS = [
  { key: "money" as const, icon: Coins, color: "#FF6B00" },
  { key: "infrastructure" as const, icon: Building2, color: "#297FF3" },
  { key: "resources" as const, icon: Leaf, color: "#4ade80" },
  { key: "people" as const, icon: Users, color: "#a3e635" },
  { key: "cohesion" as const, icon: Handshake, color: "#35C2FF" },
  { key: "governance" as const, icon: Shield, color: "#FF6B00" },
] as const;

export default async function UWDRevealPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "uwdReveal" });

  return (
    <SubpageLayout backHref="/updates">
      <PageBreadcrumb
        items={[
          { name: "Updates", path: "/updates" },
          { name: t("breadcrumb"), path: "/updates/uwd-reveal" },
        ]}
      />
      <article className="px-6 py-16 bg-white">
        <div className="mx-auto max-w-3xl">
          {/* Release Badge + Hero */}
          <ScrollReveal>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FF6B00]/20 bg-[#FF6B00]/5 px-4 py-1.5">
              <Clock className="h-3.5 w-3.5 text-[#FF6B00]" />
              <span className="text-xs font-medium text-[#FF6B00]">
                {t("releaseBadge")}
              </span>
            </div>
            <h1 className="mb-6 text-[clamp(2.5rem,5vw,4rem)] font-light tracking-[-0.04em] leading-[1.05] text-[#1b1b1b]">
              {t("title")}
              <span className="text-[#FF6B00]">{t("titleHighlight")}</span>
            </h1>
            <p className="mb-16 text-[clamp(1.125rem,2vw,1.25rem)] leading-[1.6] text-[#1b1b1b]/45">
              {t("subtitle")}
            </p>
          </ScrollReveal>

          {/* Context: What happened */}
          <ScrollReveal>
            <section className="mb-12">
              <p className="text-base leading-[1.8] text-[#1b1b1b]/60">
                {t("introText")}
              </p>
            </section>
          </ScrollReveal>

          {/* Executive Summary — 3 cards, instantly graspable */}
          <ScrollReveal>
            <section className="mb-16">
              <h2 className="mb-2 text-2xl font-light tracking-[-0.02em] text-[#1b1b1b]">
                {t("execTitle")}
              </h2>
              <p className="mb-8 text-sm text-[#1b1b1b]/40">
                {t("execSubtitle")}
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                {/* UWD Card */}
                <div className="relative overflow-hidden rounded-2xl border-2 border-[#297FF3]/20 bg-gradient-to-b from-[#297FF3]/5 to-white p-6">
                  <Globe className="mb-4 h-8 w-8 text-[#297FF3]" />
                  <h3 className="mb-1 text-base font-semibold text-[#1b1b1b]">
                    {t("execUwdTitle")}
                  </h3>
                  <p className="mb-4 text-xs leading-relaxed text-[#1b1b1b]/50">
                    {t("execUwdText")}
                  </p>
                  <a href="#uwd-deep-dive" className="inline-flex items-center gap-1 text-xs font-medium text-[#297FF3]">
                    {t("execDeepDive")} <ChevronDown className="h-3 w-3" />
                  </a>
                </div>
                {/* UDRP Card */}
                <div className="relative overflow-hidden rounded-2xl border-2 border-[#35C2FF]/20 bg-gradient-to-b from-[#35C2FF]/5 to-white p-6">
                  <Layers className="mb-4 h-8 w-8 text-[#35C2FF]" />
                  <h3 className="mb-1 text-base font-semibold text-[#1b1b1b]">
                    {t("execUdrpTitle")}
                  </h3>
                  <p className="mb-4 text-xs leading-relaxed text-[#1b1b1b]/50">
                    {t("execUdrpText")}
                  </p>
                  <a href="#udrp-deep-dive" className="inline-flex items-center gap-1 text-xs font-medium text-[#35C2FF]">
                    {t("execDeepDive")} <ChevronDown className="h-3 w-3" />
                  </a>
                </div>
                {/* UVD Card */}
                <div className="relative overflow-hidden rounded-2xl border-2 border-[#FF6B00]/20 bg-gradient-to-b from-[#FF6B00]/5 to-white p-6">
                  <Landmark className="mb-4 h-8 w-8 text-[#FF6B00]" />
                  <h3 className="mb-1 text-base font-semibold text-[#1b1b1b]">
                    {t("execUvdTitle")}
                  </h3>
                  <p className="mb-4 text-xs leading-relaxed text-[#1b1b1b]/50">
                    {t("execUvdText")}
                  </p>
                  <a href="#uvd-context" className="inline-flex items-center gap-1 text-xs font-medium text-[#FF6B00]">
                    {t("execDeepDive")} <ChevronDown className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </section>
          </ScrollReveal>

          {/* Ecosystem Diagram — 3 layers */}
          <ScrollReveal>
            <section className="mb-16">
              <h2 className="mb-8 text-2xl font-light tracking-[-0.02em] text-[#1b1b1b]">
                {t("ecosystemTitle")}
              </h2>
              <div className="space-y-4">
                {/* UWD Layer */}
                <div className="rounded-2xl border-2 border-[#297FF3]/30 bg-[#297FF3]/5 p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#297FF3]/10">
                      <Globe className="h-5 w-5 text-[#297FF3]" />
                    </div>
                    <div>
                      <div className="mb-1 flex items-center gap-2">
                        <span className="text-xs font-semibold uppercase tracking-[0.05em] text-[#297FF3]/60">
                          {t("layerMacro")}
                        </span>
                      </div>
                      <h3 className="mb-2 text-lg font-semibold text-[#1b1b1b]">
                        {t("uwdName")}
                      </h3>
                      <p className="text-sm leading-relaxed text-[#1b1b1b]/50">
                        {t("uwdShort")}
                      </p>
                    </div>
                  </div>

                  {/* UDRP Layer — nested */}
                  <div className="mt-4 ml-4 rounded-2xl border-2 border-[#35C2FF]/30 bg-[#35C2FF]/5 p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#35C2FF]/10">
                        <Layers className="h-5 w-5 text-[#35C2FF]" />
                      </div>
                      <div>
                        <div className="mb-1 flex items-center gap-2">
                          <span className="text-xs font-semibold uppercase tracking-[0.05em] text-[#35C2FF]/60">
                            {t("layerProtocol")}
                          </span>
                        </div>
                        <h3 className="mb-2 text-lg font-semibold text-[#1b1b1b]">
                          {t("udrpName")}
                        </h3>
                        <p className="text-sm leading-relaxed text-[#1b1b1b]/50">
                          {t("udrpShort")}
                        </p>
                      </div>
                    </div>

                    {/* UVD Layer — innermost */}
                    <div className="mt-4 ml-4 rounded-2xl border-2 border-[#FF6B00]/30 bg-[#FF6B00]/5 p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FF6B00]/10">
                          <Landmark className="h-5 w-5 text-[#FF6B00]" />
                        </div>
                        <div>
                          <div className="mb-1 flex items-center gap-2">
                            <span className="text-xs font-semibold uppercase tracking-[0.05em] text-[#FF6B00]/60">
                              {t("layerCurrency")}
                            </span>
                          </div>
                          <h3 className="mb-2 text-lg font-semibold text-[#1b1b1b]">
                            {t("uvdName")}
                          </h3>
                          <p className="text-sm leading-relaxed text-[#1b1b1b]/50">
                            {t("uvdShort")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </ScrollReveal>

          {/* UWD Deep Dive */}
          <ScrollReveal>
            <section id="uwd-deep-dive" className="mb-16 scroll-mt-24">
              <div className="mb-3 flex items-center gap-2">
                <Globe className="h-5 w-5 text-[#297FF3]" />
                <h2 className="text-xl font-medium text-[#1b1b1b]">
                  {t("uwdTitle")}
                </h2>
              </div>
              <p className="mb-8 text-base leading-[1.8] text-[#1b1b1b]/60">
                {t("uwdText")}
              </p>

              {/* 6 Pillars Grid */}
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {UWD_PILLARS.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={pillar.key}
                      className="rounded-xl border border-[#D0D0D0]/50 bg-[#f8f8f8] p-4"
                    >
                      <Icon className="mb-2 h-5 w-5" style={{ color: pillar.color }} />
                      <h3 className="mb-1 text-sm font-semibold text-[#1b1b1b]">
                        {t(`pillars.${pillar.key}.title`)}
                      </h3>
                      <p className="text-xs leading-relaxed text-[#1b1b1b]/50">
                        {t(`pillars.${pillar.key}.text`)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>
          </ScrollReveal>

          {/* UDRP Deep Dive */}
          <ScrollReveal>
            <section id="udrp-deep-dive" className="mb-16 scroll-mt-24">
              <div className="mb-3 flex items-center gap-2">
                <Layers className="h-5 w-5 text-[#35C2FF]" />
                <h2 className="text-xl font-medium text-[#1b1b1b]">
                  {t("udrpTitle")}
                </h2>
              </div>
              <p className="mb-6 text-base leading-[1.8] text-[#1b1b1b]/60">
                {t("udrpText")}
              </p>
              <div className="rounded-2xl border border-[#D0D0D0]/50 bg-[#f8f8f8] p-6">
                <h3 className="mb-3 text-sm font-semibold text-[#1b1b1b]">
                  {t("udrpKeyFeaturesTitle")}
                </h3>
                <ul className="space-y-2">
                  {(["f1", "f2", "f3", "f4"] as const).map((key) => (
                    <li key={key} className="flex items-start gap-2 text-sm leading-relaxed text-[#1b1b1b]/60">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#35C2FF]" />
                      {t(`udrpFeatures.${key}`)}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </ScrollReveal>

          {/* UVD in Context */}
          <ScrollReveal>
            <section id="uvd-context" className="mb-16 scroll-mt-24">
              <div className="mb-3 flex items-center gap-2">
                <Landmark className="h-5 w-5 text-[#FF6B00]" />
                <h2 className="text-xl font-medium text-[#1b1b1b]">
                  {t("uvdContextTitle")}
                </h2>
              </div>
              <p className="mb-6 text-base leading-[1.8] text-[#1b1b1b]/60">
                {t("uvdContextText")}
              </p>
              {/* Analogy Box */}
              <div className="rounded-2xl border border-[#FF6B00]/20 bg-[#FF6B00]/5 p-6">
                <h3 className="mb-3 text-sm font-semibold text-[#1b1b1b]">
                  {t("analogyTitle")}
                </h3>
                <div className="space-y-3">
                  {(["a1", "a2", "a3"] as const).map((key) => (
                    <div key={key} className="flex items-start gap-3 text-sm leading-relaxed text-[#1b1b1b]/60">
                      <span className="mt-0.5 font-mono text-xs text-[#FF6B00]/60">
                        {key === "a1" ? "01" : key === "a2" ? "02" : "03"}
                      </span>
                      {t(`analogies.${key}`)}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </ScrollReveal>

          {/* The App — Built to hold. Built to spend. */}
          <ScrollReveal>
            <section className="mb-16">
              <div className="rounded-2xl border border-[#D0D0D0]/50 bg-[#f8f8f8] p-8">
                <div className="mb-6 text-center">
                  <h2 className="mb-2 text-2xl font-light tracking-[-0.02em] text-[#1b1b1b]">
                    {t("appTitle")}
                  </h2>
                  <p className="text-sm text-[#1b1b1b]/50">
                    {t("appSubtitle")}
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Wallet View */}
                  <div className="rounded-xl border border-[#D0D0D0]/50 bg-white p-5">
                    <div className="mb-3 flex items-center gap-2">
                      <Smartphone className="h-5 w-5 text-[#FF6B00]" />
                      <h3 className="text-sm font-semibold text-[#1b1b1b]">
                        {t("appWalletTitle")}
                      </h3>
                    </div>
                    <p className="mb-4 text-xs leading-relaxed text-[#1b1b1b]/50">
                      {t("appWalletText")}
                    </p>
                    <div className="space-y-2">
                      {(["deposit", "swap", "send", "verify"] as const).map((feature) => {
                        const icons = { deposit: Wallet, swap: ArrowDownUp, send: ArrowRight, verify: BadgeCheck };
                        const FeatureIcon = icons[feature];
                        return (
                          <div key={feature} className="flex items-center gap-2 text-xs text-[#1b1b1b]/60">
                            <FeatureIcon className="h-3.5 w-3.5 text-[#FF6B00]/60" />
                            {t(`appFeatures.${feature}`)}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {/* Card View */}
                  <div className="rounded-xl border border-[#D0D0D0]/50 bg-white p-5">
                    <div className="mb-3 flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-[#1b1b1b]/60" />
                      <h3 className="text-sm font-semibold text-[#1b1b1b]">
                        {t("appCardTitle")}
                      </h3>
                    </div>
                    <p className="mb-4 text-xs leading-relaxed text-[#1b1b1b]/50">
                      {t("appCardText")}
                    </p>
                    <div className="rounded-lg bg-[#1b1b1b] p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-xs font-medium text-white/60">Universe Dollar</span>
                        <span className="text-[10px] text-white/30">Apple Pay</span>
                      </div>
                      <div className="text-lg font-light text-white">$251.20</div>
                      <div className="mt-1 text-[10px] text-white/30">UVD + 0.00289 BTC</div>
                    </div>
                  </div>
                </div>
                <p className="mt-6 text-center text-xs text-[#1b1b1b]/30">
                  {t("appDisclaimer")}
                </p>
              </div>
            </section>
          </ScrollReveal>

          {/* Official Sources & CTAs */}
          <ScrollReveal>
            <div className="rounded-2xl bg-[#f8f8f8] p-8 text-center">
              <h2 className="mb-3 text-2xl font-light text-[#1b1b1b]">
                {t("sourcesTitle")}
              </h2>
              <p className="mx-auto mb-8 max-w-xl text-base text-[#1b1b1b]/50">
                {t("sourcesText")}
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
                <a
                  href="https://uwd.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#1b1b1b] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#333]"
                >
                  {t("ctaUwd")}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <a
                  href="https://uwd.xyz/udrp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#D0D0D0] px-6 py-3 text-sm font-medium text-[#1b1b1b] transition-all hover:border-[#999]"
                >
                  {t("ctaUdrp")}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <a
                  href="https://www.uvd.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#D0D0D0] px-6 py-3 text-sm font-medium text-[#1b1b1b] transition-all hover:border-[#999]"
                >
                  {t("ctaUvd")}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Newsletter CTA */}
          <ScrollReveal>
            <div className="mt-12">
              <NewsletterCTA variant="article" />
            </div>
          </ScrollReveal>

          {/* Related Pages */}
          <ScrollReveal>
            <div className="mt-16 border-t border-[#D0D0D0]/30 pt-10">
              <h2 className="mb-6 text-lg font-medium text-[#1b1b1b]">
                {t("relatedTitle")}
              </h2>
              <div className="grid gap-4 sm:grid-cols-3">
                <Link
                  href="/about-uvd"
                  className="group rounded-2xl border border-[#D0D0D0]/50 bg-[#f8f8f8] p-5 transition-all hover:border-[#D0D0D0] hover:shadow-sm"
                >
                  <h3 className="mb-1 text-sm font-semibold text-[#1b1b1b] group-hover:text-[#FF6B00] transition-colors">
                    {t("relatedAbout")}
                  </h3>
                  <p className="mb-3 text-xs leading-relaxed text-[#1b1b1b]/40">
                    {t("relatedAboutDesc")}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-[#FF6B00]">
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
                  </span>
                </Link>
                <Link
                  href="/simulation/rtm"
                  className="group rounded-2xl border border-[#D0D0D0]/50 bg-[#f8f8f8] p-5 transition-all hover:border-[#D0D0D0] hover:shadow-sm"
                >
                  <h3 className="mb-1 text-sm font-semibold text-[#1b1b1b] group-hover:text-[#FF6B00] transition-colors">
                    {t("relatedRtm")}
                  </h3>
                  <p className="mb-3 text-xs leading-relaxed text-[#1b1b1b]/40">
                    {t("relatedRtmDesc")}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-[#FF6B00]">
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
                  </span>
                </Link>
                <Link
                  href="/simulation/basket"
                  className="group rounded-2xl border border-[#D0D0D0]/50 bg-[#f8f8f8] p-5 transition-all hover:border-[#D0D0D0] hover:shadow-sm"
                >
                  <h3 className="mb-1 text-sm font-semibold text-[#1b1b1b] group-hover:text-[#FF6B00] transition-colors">
                    {t("relatedBasket")}
                  </h3>
                  <p className="mb-3 text-xs leading-relaxed text-[#1b1b1b]/40">
                    {t("relatedBasketDesc")}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-[#FF6B00]">
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
                  </span>
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Legal Note */}
          <ScrollReveal>
            <div className="mt-10 border-t border-[#D0D0D0]/30 pt-8">
              <p className="text-xs leading-relaxed text-[#1b1b1b]/25">
                {t("legalNote")}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </article>
    </SubpageLayout>
  );
}
