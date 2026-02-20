import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import {
  Flame,
  ShieldOff,
  Cpu,
  Globe,
  Activity,
  Gauge,
  ExternalLink,
  ArrowRight,
  Clock,
  FileText,
  User,
  Timer,
  Zap,
  BookOpen,
} from "lucide-react";
import { SubpageLayout } from "@/components/subpage-layout";
import { PageBreadcrumb, FAQPageSchema } from "@/components/structured-data";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Link } from "@/i18n/navigation";

const BASE_URL = "https://www.uvd.trading";

const THREE_PILLARS = [
  { key: "thermodynamic" as const, icon: Flame, color: "#FF6B00" },
  { key: "zeroGovernance" as const, icon: ShieldOff, color: "#297FF3" },
  { key: "proofOfInfinity" as const, icon: Cpu, color: "#4ade80" },
] as const;

const DASHBOARD_STATS = [
  { key: "network" as const, icon: Globe, color: "#297FF3" },
  { key: "transactions" as const, icon: Activity, color: "#4ade80" },
  { key: "tps" as const, icon: Gauge, color: "#FF6B00" },
  { key: "status" as const, icon: Activity, color: "#35C2FF" },
] as const;

const TIMELINE = ["t1", "t2", "t3", "t4"] as const;
const FAQ_KEYS = ["q1", "q2", "q3", "q4"] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "entropyPillar" });
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const url = `${BASE_URL}${prefix}/entropy-network`;
  const alternates: Record<string, string> = {};
  for (const loc of routing.locales) {
    const p = loc === routing.defaultLocale ? "" : `/${loc}`;
    alternates[loc] = `${BASE_URL}${p}/entropy-network`;
  }
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: url, languages: alternates },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url,
      siteName: "UVD Simulation",
      locale: locale === "de" ? "de_DE" : locale === "ar" ? "ar_AE" : locale === "es" ? "es_ES" : locale === "fr" ? "fr_FR" : "en_US",
      type: "article",
      publishedTime: "2026-02-20T00:00:00Z",
      modifiedTime: "2026-02-20T19:00:00Z",
      authors: ["Prime Associates LLC"],
      tags: ["Entropy Network", "o.day", "Kiyan Sasan", "Proof of Infinity", "Thermodynamic Settlement", "UVD", "Universe Dollar", "Testnet", "Blockchain"],
    },
    twitter: {
      card: "summary_large_image",
      title: t("metaTitle"),
      description: t("metaDescription"),
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function EntropyNetworkPillarPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "entropyPillar" });

  return (
    <SubpageLayout>
      <PageBreadcrumb items={[{ name: t("breadcrumb"), path: "/entropy-network" }]} />
      <FAQPageSchema
        items={FAQ_KEYS.map((key) => ({
          question: t(`faq.${key}`),
          answer: t(`faq.a${key.slice(1)}`),
        }))}
      />
      <article className="px-6 py-16 bg-white">
        <div className="mx-auto max-w-3xl">
          {/* Hero */}
          <ScrollReveal>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D0D0D0] bg-[#f8f8f8] px-4 py-1.5">
              <BookOpen className="h-3.5 w-3.5 text-[#1b1b1b]/50" />
              <span className="text-xs font-medium text-[#1b1b1b]/50">
                {t("badge")}
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

          {/* Overview */}
          <ScrollReveal>
            <section className="mb-16">
              <h2 className="mb-4 text-2xl font-light tracking-[-0.02em] text-[#1b1b1b]">
                {t("overviewTitle")}
              </h2>
              <p className="text-base leading-[1.8] text-[#1b1b1b]/60">
                {t("overviewText")}
              </p>
            </section>
          </ScrollReveal>

          {/* Three Pillars */}
          <ScrollReveal>
            <section className="mb-16">
              <h2 className="mb-2 text-2xl font-light tracking-[-0.02em] text-[#1b1b1b]">
                {t("pillarsTitle")}
              </h2>
              <p className="mb-8 text-sm text-[#1b1b1b]/40">
                {t("pillarsSubtitle")}
              </p>
              <div className="space-y-6">
                {THREE_PILLARS.map((pillar, index) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={pillar.key}
                      className="rounded-2xl border-2 p-6"
                      style={{ borderColor: `${pillar.color}30`, backgroundColor: `${pillar.color}08` }}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                          style={{ backgroundColor: `${pillar.color}15` }}
                        >
                          <Icon className="h-5 w-5" style={{ color: pillar.color }} />
                        </div>
                        <div>
                          <div className="mb-1 flex items-center gap-2">
                            <span
                              className="text-xs font-semibold uppercase tracking-[0.05em]"
                              style={{ color: `${pillar.color}99` }}
                            >
                              {String(index + 1).padStart(2, "0")}
                            </span>
                          </div>
                          <h3 className="mb-2 text-lg font-semibold text-[#1b1b1b]">
                            {t(`pillars.${pillar.key}.title`)}
                          </h3>
                          <p className="mb-3 text-sm leading-relaxed text-[#1b1b1b]/50">
                            {t(`pillars.${pillar.key}.text`)}
                          </p>
                          <p className="text-xs leading-relaxed text-[#1b1b1b]/35 border-s-2 ps-3" style={{ borderColor: `${pillar.color}40` }}>
                            {t(`pillars.${pillar.key}.detail`)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </ScrollReveal>

          {/* o.day + Testnet */}
          <ScrollReveal>
            <section className="mb-16">
              <div className="mb-3 flex items-center gap-2">
                <Globe className="h-5 w-5 text-[#FF6B00]" />
                <h2 className="text-xl font-medium text-[#1b1b1b]">
                  {t("odayTitle")}
                </h2>
              </div>
              <p className="mb-2 text-sm text-[#1b1b1b]/40">{t("odaySubtitle")}</p>
              <p className="mb-6 text-base leading-[1.8] text-[#1b1b1b]/60">
                {t("odayText")}
              </p>
              <div className="mb-6 rounded-2xl bg-[#1b1b1b] p-6">
                <p className="mb-1 text-[11px] italic leading-relaxed text-white/40">
                  &ldquo;{t("odayQuote")}&rdquo;
                </p>
                <p className="text-[10px] text-white/20">— Kiyan Sasan, X, Feb 20 2026</p>
              </div>
              <div className="rounded-2xl border border-[#4ade80]/20 bg-[#4ade80]/5 p-6 text-center">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#4ade80]/10">
                  <Timer className="h-5 w-5 text-[#4ade80]" />
                </div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.05em] text-[#4ade80]/80">
                  {t("odayCountdownTitle")}
                </p>
                <p className="text-3xl font-light tracking-[-0.02em] text-[#1b1b1b] font-mono">
                  {t("odayCountdownValue")}
                </p>
                <p className="mt-1 text-xs text-[#1b1b1b]/40">
                  {t("odayCountdownLabel")}
                </p>
              </div>
            </section>
          </ScrollReveal>

          {/* Whitepaper */}
          <ScrollReveal>
            <section className="mb-16">
              <div className="mb-3 flex items-center gap-2">
                <FileText className="h-5 w-5 text-[#297FF3]" />
                <h2 className="text-xl font-medium text-[#1b1b1b]">
                  {t("whitepaperTitle")}
                </h2>
              </div>
              <p className="mb-2 text-sm text-[#1b1b1b]/40">{t("whitepaperSubtitle")}</p>
              <p className="mb-6 text-base leading-[1.8] text-[#1b1b1b]/60">
                {t("whitepaperText")}
              </p>
              <div className="rounded-2xl border border-[#D0D0D0]/50 bg-[#f8f8f8] p-6">
                <ul className="space-y-2">
                  {(["c1", "c2", "c3", "c4", "c5"] as const).map((key) => (
                    <li key={key} className="flex items-start gap-2 text-sm leading-relaxed text-[#1b1b1b]/60">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#297FF3]" />
                      {t(`whitepaperClaims.${key}`)}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </ScrollReveal>

          {/* Connection to UVD */}
          <ScrollReveal>
            <section className="mb-16">
              <h2 className="mb-4 text-2xl font-light tracking-[-0.02em] text-[#1b1b1b]">
                {t("uvdConnectionTitle")}
              </h2>
              <p className="mb-6 text-base leading-[1.8] text-[#1b1b1b]/60">
                {t("uvdConnectionText")}
              </p>
              <div className="rounded-2xl border border-[#FF6B00]/20 bg-[#FF6B00]/5 p-6">
                <ul className="space-y-2">
                  {(["p1", "p2", "p3", "p4"] as const).map((key) => (
                    <li key={key} className="flex items-start gap-2 text-sm leading-relaxed text-[#1b1b1b]/60">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF6B00]" />
                      {t(`uvdConnectionPoints.${key}`)}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </ScrollReveal>

          {/* Dashboard Preview */}
          <ScrollReveal>
            <section className="mb-16">
              <div className="mb-3 flex items-center gap-2">
                <Activity className="h-5 w-5 text-[#FF6B00]" />
                <h2 className="text-xl font-medium text-[#1b1b1b]">
                  {t("dashboardTitle")}
                </h2>
              </div>
              <p className="mb-6 text-base leading-[1.8] text-[#1b1b1b]/60">
                {t("dashboardText")}
              </p>
              <div className="rounded-2xl border border-[#1b1b1b] bg-[#1b1b1b] p-6 overflow-hidden">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.1em] text-white/40">Entropy Testnet</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#4ade80]/20 px-2.5 py-0.5 text-[10px] font-medium text-[#4ade80]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80] animate-pulse" />
                    {t("dashboardLive")}
                  </span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {DASHBOARD_STATS.map((stat) => {
                    const Icon = stat.icon;
                    return (
                      <div key={stat.key} className="rounded-xl bg-white/5 p-4">
                        <div className="mb-2 flex items-center gap-2">
                          <Icon className="h-3.5 w-3.5" style={{ color: stat.color }} />
                          <span className="text-[10px] font-medium uppercase tracking-[0.05em] text-white/40">
                            {t(`dashboardStats.${stat.key}.label`)}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-white">
                          {t(`dashboardStats.${stat.key}.value`)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </ScrollReveal>

          {/* Kiyan Sasan */}
          <ScrollReveal>
            <section className="mb-16">
              <div className="mb-3 flex items-center gap-2">
                <User className="h-5 w-5 text-[#297FF3]" />
                <h2 className="text-xl font-medium text-[#1b1b1b]">
                  {t("sasanTitle")}
                </h2>
              </div>
              <p className="mb-4 text-base leading-[1.8] text-[#1b1b1b]/60">
                {t("sasanText")}
              </p>
              <p className="text-xs italic text-[#1b1b1b]/30">
                {t("sasanDisclaimer")}
              </p>
            </section>
          </ScrollReveal>

          {/* Timeline */}
          <ScrollReveal>
            <section className="mb-16">
              <div className="mb-3 flex items-center gap-2">
                <Clock className="h-5 w-5 text-[#FF6B00]" />
                <h2 className="text-xl font-medium text-[#1b1b1b]">
                  {t("timelineTitle")}
                </h2>
              </div>
              <div className="space-y-4">
                {TIMELINE.map((key) => (
                  <div key={key} className="flex gap-4 rounded-xl border border-[#D0D0D0]/50 bg-[#f8f8f8] p-4">
                    <span className="shrink-0 text-xs font-semibold text-[#FF6B00] whitespace-nowrap">
                      {t(`timeline.${key}date`)}
                    </span>
                    <p className="text-sm leading-relaxed text-[#1b1b1b]/60">
                      {t(`timeline.${key}event`)}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </ScrollReveal>

          {/* FAQ */}
          <ScrollReveal>
            <section className="mb-16">
              <h2 className="mb-6 text-2xl font-light tracking-[-0.02em] text-[#1b1b1b]">
                {t("faqTitle")}
              </h2>
              <div className="space-y-3">
                {FAQ_KEYS.map((key) => (
                  <details
                    key={key}
                    className="group rounded-2xl border border-[#D0D0D0]/50 bg-white transition-all hover:border-[#D0D0D0] hover:shadow-sm"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-4 [&::-webkit-details-marker]:hidden">
                      <h3 className="text-base font-semibold text-[#1b1b1b]">
                        {t(`faq.${key}`)}
                      </h3>
                    </summary>
                    <div className="mx-6 mb-4 rounded-b-xl border-x border-b border-[#D0D0D0]/30 bg-[#f8f8f8] px-6 py-4">
                      <p className="ps-3 text-sm leading-relaxed text-[#1b1b1b]/60 border-s-2 border-[#FF6B00]/30">
                        {t(`faq.a${key.slice(1)}`)}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          </ScrollReveal>

          {/* Official Sources */}
          <ScrollReveal>
            <div className="mb-16 rounded-2xl bg-[#f8f8f8] p-8 text-center">
              <h2 className="mb-3 text-2xl font-light text-[#1b1b1b]">
                {t("sourcesTitle")}
              </h2>
              <p className="mx-auto mb-8 max-w-xl text-base text-[#1b1b1b]/50">
                {t("sourcesText")}
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
                <a
                  href="https://www.uvd.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#1b1b1b] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#333]"
                >
                  {t("ctaUvd")}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <a
                  href="https://o.day"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-[#FF6B00] px-6 py-3 text-sm font-medium text-[#FF6B00] transition-all hover:bg-[#FF6B00]/5"
                >
                  {t("ctaOday")}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <a
                  href="https://x.com/uvd99"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#D0D0D0] px-6 py-3 text-sm font-medium text-[#1b1b1b] transition-all hover:border-[#999]"
                >
                  {t("ctaX")}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Related Pages */}
          <ScrollReveal>
            <div className="border-t border-[#D0D0D0]/30 pt-10">
              <h2 className="mb-6 text-lg font-medium text-[#1b1b1b]">
                {t("relatedTitle")}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Link
                  href="/uwd"
                  className="group rounded-2xl border border-[#D0D0D0]/50 bg-[#f8f8f8] p-5 transition-all hover:border-[#D0D0D0] hover:shadow-sm"
                >
                  <h3 className="mb-1 text-sm font-semibold text-[#1b1b1b] group-hover:text-[#FF6B00] transition-colors">
                    {t("relatedUwd")}
                  </h3>
                  <p className="mb-3 text-xs leading-relaxed text-[#1b1b1b]/40">
                    {t("relatedUwdDesc")}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-[#FF6B00]">
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
                  </span>
                </Link>
                <Link
                  href="/updates/entropy-network"
                  className="group rounded-2xl border border-[#D0D0D0]/50 bg-[#f8f8f8] p-5 transition-all hover:border-[#D0D0D0] hover:shadow-sm"
                >
                  <h3 className="mb-1 text-sm font-semibold text-[#1b1b1b] group-hover:text-[#FF6B00] transition-colors">
                    {t("relatedNews")}
                  </h3>
                  <p className="mb-3 text-xs leading-relaxed text-[#1b1b1b]/40">
                    {t("relatedNewsDesc")}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-[#FF6B00]">
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
                  </span>
                </Link>
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
