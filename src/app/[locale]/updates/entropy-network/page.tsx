import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import {
  Zap,
  Flame,
  ShieldOff,
  Cpu,
  Clock,
  ExternalLink,
  ArrowRight,
  Layers,
  Activity,
  Gauge,
  Lock,
  Smartphone,
  Globe,
  Timer,
} from "lucide-react";
import { SubpageLayout } from "@/components/subpage-layout";
import { PageBreadcrumb, ArticleSchema } from "@/components/structured-data";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Link } from "@/i18n/navigation";
import { NewsletterCTA } from "@/components/newsletter-cta";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "entropyNetwork" });
  const BASE_URL = "https://www.uvd.trading";
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const url = `${BASE_URL}${prefix}/updates/entropy-network`;
  const alternates: Record<string, string> = {};
  for (const loc of routing.locales) {
    const p = loc === routing.defaultLocale ? "" : `/${loc}`;
    alternates[loc] = `${BASE_URL}${p}/updates/entropy-network`;
  }
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: url, languages: alternates },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      type: "article",
      publishedTime: "2026-02-20T00:00:00Z",
      authors: ["Prime Associates LLC"],
      tags: ["Entropy Network", "Kiyan Sasan", "UVD", "Universe Dollar", "Proof of Infinity", "Settlement", "Blockchain"],
      url,
      siteName: "UVD Trading",
      modifiedTime: "2026-02-20T21:00:00Z",
      images: [
        {
          url: `${BASE_URL}/og${locale === "en" ? "" : `-${locale}`}.png`,
          width: 1200,
          height: 630,
          alt: t("metaTitle"),
        },
      ],
      locale: locale === "de" ? "de_DE" : locale === "ar" ? "ar_AE" : locale === "es" ? "es_ES" : locale === "fr" ? "fr_FR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: t("metaTitle"),
      description: t("metaDescription"),
      images: [`${BASE_URL}/og${locale === "en" ? "" : `-${locale}`}.png`],
    },
  };
}

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

export default async function EntropyNetworkPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "entropyNetwork" });

  return (
    <SubpageLayout backHref="/updates">
      <PageBreadcrumb
        items={[
          { name: "Updates", path: "/updates" },
          { name: t("breadcrumb"), path: "/updates/entropy-network" },
        ]}
      />
      <ArticleSchema
        headline={t("metaTitle")}
        description={t("metaDescription")}
        datePublished="2026-02-20T00:00:00Z"
        locale={locale}
        path="/updates/entropy-network"
        keywords={[
          "Entropy Network",
          "Kiyan Sasan",
          "uvd.trading",
          "Universe Dollar",
          "Proof of Infinity",
          "Thermodynamic Settlement",
          "Zero Governance",
          "Blockchain",
          "Crypto News",
          "Whitepaper Leak",
          "ala.xyz",
          "US Dollar Hegemony",
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

          {/* Source: What we know */}
          <ScrollReveal>
            <section className="mb-16">
              <h2 className="mb-2 text-2xl font-light tracking-[-0.02em] text-[#1b1b1b]">
                {t("sourceTitle")}
              </h2>
              <p className="mb-8 text-sm text-[#1b1b1b]/40">
                {t("sourceSubtitle")}
              </p>
              <div className="rounded-2xl border border-[#D0D0D0]/50 bg-[#f8f8f8] p-6">
                <p className="text-sm leading-[1.8] text-[#1b1b1b]/60">
                  {t("sourceText")}
                </p>
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
              {/* Mock Dashboard Card */}
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
                <div className="mt-4 rounded-xl bg-white/5 p-4">
                  <p className="text-[11px] italic leading-relaxed text-white/30">
                    &ldquo;{t("dashboardQuote")}&rdquo;
                  </p>
                </div>
              </div>
            </section>
          </ScrollReveal>

          {/* Three Pillars */}
          <ScrollReveal>
            <section id="three-pillars" className="mb-16 scroll-mt-24">
              <h2 className="mb-2 text-2xl font-light tracking-[-0.02em] text-[#1b1b1b]">
                {t("pillarsTitle")}
              </h2>
              <p className="mb-8 text-sm text-[#1b1b1b]/40">
                {t("pillarsSubtitle")}
              </p>
              <div className="space-y-4">
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
                          <p className="text-sm leading-relaxed text-[#1b1b1b]/50">
                            {t(`pillars.${pillar.key}.text`)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </ScrollReveal>

          {/* Connection to uvd.trading */}
          <ScrollReveal>
            <section id="uvd-connection" className="mb-16 scroll-mt-24">
              <div className="mb-3 flex items-center gap-2">
                <Layers className="h-5 w-5 text-[#FF6B00]" />
                <h2 className="text-xl font-medium text-[#1b1b1b]">
                  {t("connectionTitle")}
                </h2>
              </div>
              <p className="mb-6 text-base leading-[1.8] text-[#1b1b1b]/60">
                {t("connectionText")}
              </p>
              <div className="rounded-2xl border border-[#FF6B00]/20 bg-[#FF6B00]/5 p-6">
                <h3 className="mb-3 text-sm font-semibold text-[#1b1b1b]">
                  {t("connectionKeyTitle")}
                </h3>
                <ul className="space-y-2">
                  {(["k1", "k2", "k3", "k4"] as const).map((key) => (
                    <li key={key} className="flex items-start gap-2 text-sm leading-relaxed text-[#1b1b1b]/60">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF6B00]" />
                      {t(`connectionKeys.${key}`)}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </ScrollReveal>

          {/* Countdown Section */}
          <ScrollReveal>
            <section className="mb-16">
              <div className="rounded-2xl border border-[#D0D0D0]/50 bg-[#f8f8f8] p-8">
                <div className="mb-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#FF6B00]/10">
                    <Timer className="h-6 w-6 text-[#FF6B00]" />
                  </div>
                  <h2 className="mb-2 text-2xl font-light tracking-[-0.02em] text-[#1b1b1b]">
                    {t("countdownTitle")}
                  </h2>
                  <p className="text-sm text-[#1b1b1b]/50">
                    {t("countdownSubtitle")}
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-[#D0D0D0]/50 bg-white p-5">
                    <div className="mb-2 flex items-center gap-2">
                      <Zap className="h-4 w-4 text-[#4ade80]" />
                      <span className="text-xs font-semibold uppercase tracking-[0.05em] text-[#4ade80]/80">Genesis</span>
                    </div>
                    <p className="text-lg font-light text-[#1b1b1b]">{t("countdownGenesis")}</p>
                    <p className="mt-1 text-xs text-[#1b1b1b]/40">{t("countdownGenesisDesc")}</p>
                  </div>
                  <div className="rounded-xl border border-[#D0D0D0]/50 bg-white p-5">
                    <div className="mb-2 flex items-center gap-2">
                      <Lock className="h-4 w-4 text-[#FF6B00]" />
                      <span className="text-xs font-semibold uppercase tracking-[0.05em] text-[#FF6B00]/80">Hegemony</span>
                    </div>
                    <p className="text-lg font-light text-[#1b1b1b]">{t("countdownHegemony")}</p>
                    <p className="mt-1 text-xs text-[#1b1b1b]/40">{t("countdownHegemonyDesc")}</p>
                  </div>
                </div>
                <div className="mt-4 rounded-xl bg-[#1b1b1b] p-4">
                  <p className="text-[11px] italic leading-relaxed text-white/40 text-center">
                    &ldquo;{t("countdownQuote")}&rdquo;
                  </p>
                </div>
              </div>
            </section>
          </ScrollReveal>

          {/* Conclusion */}
          <ScrollReveal>
            <section className="mb-16">
              <h2 className="mb-4 text-2xl font-light tracking-[-0.02em] text-[#1b1b1b]">
                {t("conclusionTitle")}
              </h2>
              <p className="text-base leading-[1.8] text-[#1b1b1b]/60">
                {t("conclusionText")}
              </p>
              <div className="mt-6 rounded-2xl border border-[#D0D0D0]/50 bg-[#f8f8f8] p-6">
                <p className="text-center text-sm font-medium italic text-[#1b1b1b]/40">
                  &ldquo;{t("conclusionTagline")}&rdquo;
                </p>
              </div>
            </section>
          </ScrollReveal>

          {/* SEO Keywords (hidden) */}
          <div className="sr-only" aria-hidden="true">
            Entropy Network, Kiyan Sasan, uvd.trading, Universe Dollar, Proof of Infinity, ala.xyz, Thermodynamic Settlement, Zero Governance, Whitepaper v0.8.1
          </div>

          {/* Official Sources */}
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
                  href="https://www.uvd.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#1b1b1b] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#333]"
                >
                  {t("ctaUvd")}
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
                  href="/updates/uwd-reveal"
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
