import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import {
  Globe,
  Layers,
  Coins,
  Building2,
  Leaf,
  Users,
  Handshake,
  Shield,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Landmark,
} from "lucide-react";
import { SubpageLayout } from "@/components/subpage-layout";
import { PageBreadcrumb, FAQPageSchema } from "@/components/structured-data";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Link } from "@/i18n/navigation";

const BASE_URL = "https://www.uvd.trading";

const UWD_PILLARS = [
  { key: "money" as const, icon: Coins, color: "#FF6B00" },
  { key: "infrastructure" as const, icon: Building2, color: "#297FF3" },
  { key: "resources" as const, icon: Leaf, color: "#4ade80" },
  { key: "people" as const, icon: Users, color: "#a3e635" },
  { key: "cohesion" as const, icon: Handshake, color: "#35C2FF" },
  { key: "governance" as const, icon: Shield, color: "#FF6B00" },
] as const;

const ECOSYSTEM_LAYERS = [
  { key: "macro" as const, icon: Globe, color: "#297FF3" },
  { key: "protocol" as const, icon: Layers, color: "#4ade80" },
  { key: "currency" as const, icon: Coins, color: "#FF6B00" },
] as const;

const FAQ_KEYS = ["q1", "q2", "q3", "q4"] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "uwdPillar" });
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const url = `${BASE_URL}${prefix}/uwd`;
  const alternates: Record<string, string> = {};
  for (const loc of routing.locales) {
    const p = loc === routing.defaultLocale ? "" : `/${loc}`;
    alternates[loc] = `${BASE_URL}${p}/uwd`;
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
      authors: ["Prime Associates LLC"],
      tags: ["UWD", "United World Dynamics", "UDRP", "United Digital Reserve Protocol", "UVD", "Universe Dollar", "Sovereign Reform", "CBDC"],
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

export default async function UWDPillarPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "uwdPillar" });

  return (
    <SubpageLayout>
      <PageBreadcrumb items={[{ name: t("breadcrumb"), path: "/uwd" }]} />
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

          {/* Three-Layer Ecosystem */}
          <ScrollReveal>
            <section className="mb-16">
              <h2 className="mb-2 text-2xl font-light tracking-[-0.02em] text-[#1b1b1b]">
                {t("ecosystemTitle")}
              </h2>
              <p className="mb-8 text-sm text-[#1b1b1b]/40">
                {t("ecosystemSubtitle")}
              </p>
              <div className="space-y-4">
                {ECOSYSTEM_LAYERS.map((layer) => {
                  const Icon = layer.icon;
                  return (
                    <div
                      key={layer.key}
                      className="relative overflow-hidden rounded-2xl border-2 p-6"
                      style={{ borderColor: `${layer.color}30`, backgroundColor: `${layer.color}08` }}
                    >
                      <div className="flex items-start gap-4">
                        <Icon className="h-8 w-8 shrink-0" style={{ color: layer.color }} />
                        <div>
                          <span
                            className="mb-1 block text-xs font-semibold uppercase tracking-[0.05em]"
                            style={{ color: `${layer.color}99` }}
                          >
                            {t(`layers.${layer.key}.label`)}
                          </span>
                          <h3 className="mb-1 text-base font-semibold text-[#1b1b1b]">
                            {t(`layers.${layer.key}.name`)}
                          </h3>
                          <p className="text-sm leading-relaxed text-[#1b1b1b]/50">
                            {t(`layers.${layer.key}.text`)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </ScrollReveal>

          {/* What is UWD */}
          <ScrollReveal>
            <section className="mb-16">
              <div className="mb-3 flex items-center gap-2">
                <Globe className="h-5 w-5 text-[#297FF3]" />
                <h2 className="text-xl font-medium text-[#1b1b1b]">
                  {t("uwdTitle")}
                </h2>
              </div>
              <p className="mb-2 text-sm italic text-[#1b1b1b]/40">{t("uwdSubtitle")}</p>
              <p className="mb-8 text-base leading-[1.8] text-[#1b1b1b]/60">
                {t("uwdText")}
              </p>

              {/* Six Pillars */}
              <h3 className="mb-4 text-lg font-medium text-[#1b1b1b]">
                {t("pillarsTitle")}
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {UWD_PILLARS.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={pillar.key}
                      className="rounded-xl border p-4"
                      style={{ borderColor: `${pillar.color}25`, backgroundColor: `${pillar.color}06` }}
                    >
                      <div className="mb-2 flex items-center gap-2">
                        <Icon className="h-4 w-4" style={{ color: pillar.color }} />
                        <h4 className="text-sm font-semibold text-[#1b1b1b]">
                          {t(`pillars.${pillar.key}.title`)}
                        </h4>
                      </div>
                      <p className="text-xs leading-relaxed text-[#1b1b1b]/50">
                        {t(`pillars.${pillar.key}.text`)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>
          </ScrollReveal>

          {/* What is UDRP */}
          <ScrollReveal>
            <section className="mb-16">
              <div className="mb-3 flex items-center gap-2">
                <Landmark className="h-5 w-5 text-[#4ade80]" />
                <h2 className="text-xl font-medium text-[#1b1b1b]">
                  {t("udrpTitle")}
                </h2>
              </div>
              <p className="mb-2 text-sm italic text-[#1b1b1b]/40">{t("udrpSubtitle")}</p>
              <p className="mb-6 text-base leading-[1.8] text-[#1b1b1b]/60">
                {t("udrpText")}
              </p>
              <div className="rounded-2xl border border-[#4ade80]/20 bg-[#4ade80]/5 p-6">
                <h3 className="mb-3 text-sm font-semibold text-[#1b1b1b]">
                  {t("udrpFeaturesTitle")}
                </h3>
                <ul className="space-y-2">
                  {(["f1", "f2", "f3", "f4"] as const).map((key) => (
                    <li key={key} className="flex items-start gap-2 text-sm leading-relaxed text-[#1b1b1b]/60">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#4ade80]" />
                      {t(`udrpFeatures.${key}`)}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </ScrollReveal>

          {/* Where UVD Fits In */}
          <ScrollReveal>
            <section className="mb-16">
              <h2 className="mb-4 text-2xl font-light tracking-[-0.02em] text-[#1b1b1b]">
                {t("uvdContextTitle")}
              </h2>
              <p className="mb-6 text-base leading-[1.8] text-[#1b1b1b]/60">
                {t("uvdContextText")}
              </p>
              <div className="rounded-2xl border border-[#D0D0D0]/50 bg-[#f8f8f8] p-6">
                <h3 className="mb-4 text-sm font-semibold text-[#1b1b1b]">
                  {t("analogyTitle")}
                </h3>
                <div className="space-y-3">
                  {(["a1", "a2", "a3"] as const).map((key, i) => (
                    <div key={key} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FF6B00]/10 text-xs font-semibold text-[#FF6B00]">
                        {i + 1}
                      </span>
                      <p className="text-sm leading-relaxed text-[#1b1b1b]/60">
                        {t(`analogies.${key}`)}
                      </p>
                    </div>
                  ))}
                </div>
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
                  className="inline-flex items-center gap-2 rounded-full border-2 border-[#4ade80] px-6 py-3 text-sm font-medium text-[#4ade80] transition-all hover:bg-[#4ade80]/5"
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

          {/* Related Pages */}
          <ScrollReveal>
            <div className="border-t border-[#D0D0D0]/30 pt-10">
              <h2 className="mb-6 text-lg font-medium text-[#1b1b1b]">
                {t("relatedTitle")}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Link
                  href="/entropy-network"
                  className="group rounded-2xl border border-[#D0D0D0]/50 bg-[#f8f8f8] p-5 transition-all hover:border-[#D0D0D0] hover:shadow-sm"
                >
                  <h3 className="mb-1 text-sm font-semibold text-[#1b1b1b] group-hover:text-[#FF6B00] transition-colors">
                    {t("relatedEntropy")}
                  </h3>
                  <p className="mb-3 text-xs leading-relaxed text-[#1b1b1b]/40">
                    {t("relatedEntropyDesc")}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-[#FF6B00]">
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
                  </span>
                </Link>
                <Link
                  href="/updates/uwd-reveal"
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
