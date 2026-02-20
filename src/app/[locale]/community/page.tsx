import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SubpageLayout } from "@/components/subpage-layout";
import { PageBreadcrumb, FAQPageSchema } from "@/components/structured-data";
import { ScrollReveal } from "@/components/scroll-reveal";
import { CommunityPoll } from "@/components/community-poll";
import { CommunityComments } from "@/components/community-comments";
import { Link } from "@/i18n/navigation";
import { Shield, FileText, Users, Cpu, MessageCircle, HelpCircle, ArrowRight } from "lucide-react";

const BASE_URL = "https://www.uvd.trading";

const COMMUNITY_FAQ_KEYS = ["q1", "q2", "q3", "q4"] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const url = `${BASE_URL}${prefix}/community`;
  const alternates: Record<string, string> = {};
  for (const loc of routing.locales) {
    const p = loc === routing.defaultLocale ? "" : `/${loc}`;
    alternates[loc] = `${BASE_URL}${p}/community`;
  }
  return {
    title: t("community.title"),
    description: t("community.description"),
    alternates: { canonical: url, languages: alternates },
    openGraph: {
      title: t("community.title"),
      description: t("community.description"),
      url,
      siteName: "UVD Trading",
      locale: locale === "de" ? "de_DE" : locale === "ar" ? "ar_AE" : locale === "es" ? "es_ES" : locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("community.title"),
      description: t("community.description"),
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function CommunityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "community" });

  return (
    <SubpageLayout backHref="/">
      <PageBreadcrumb items={[{ name: "Community", path: "/community" }]} />
      <FAQPageSchema
        items={COMMUNITY_FAQ_KEYS.map((key) => ({
          question: t(`keyQuestions.${key}`),
          answer: t(`keyQuestions.a${key.slice(1)}`),
        }))}
      />
      <article className="px-6 py-16 bg-white">
        <div className="mx-auto max-w-3xl">
          {/* Hero */}
          <ScrollReveal>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.05em] text-[#FF6B00]">
              {t("badge")}
            </p>
            <h1 className="mb-6 text-[clamp(2.5rem,5vw,4rem)] font-light tracking-[-0.04em] leading-[1.05] text-[#1b1b1b]">
              {t("title")}
              <span className="text-[#FF6B00]">{t("titleHighlight")}</span>
            </h1>
            <p className="mb-16 text-[clamp(1.125rem,2vw,1.25rem)] leading-[1.6] text-[#1b1b1b]/45">
              {t("subtitle")}
            </p>
          </ScrollReveal>

          {/* Independence Statement */}
          <ScrollReveal>
            <div className="mb-12 rounded-2xl border border-[#FF6B00]/20 bg-[#FF6B00]/5 p-6 sm:p-8">
              <div className="mb-3 flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#FF6B00]" />
                <h2 className="text-lg font-medium text-[#1b1b1b]">
                  {t("independenceTitle")}
                </h2>
              </div>
              <p className="text-sm leading-relaxed text-[#1b1b1b]/60">
                {t("independenceText")}
              </p>
            </div>
          </ScrollReveal>

          {/* What is UVD */}
          <ScrollReveal>
            <section className="mb-12">
              <div className="mb-3 flex items-center gap-2">
                <FileText className="h-5 w-5 text-[#297FF3]" />
                <h2 className="text-xl font-medium text-[#1b1b1b]">
                  {t("whatIsTitle")}
                </h2>
              </div>
              <p className="text-base leading-[1.8] text-[#1b1b1b]/60">
                {t("whatIsText")}
              </p>
            </section>
          </ScrollReveal>

          {/* Who is behind it */}
          <ScrollReveal>
            <section className="mb-12">
              <div className="mb-3 flex items-center gap-2">
                <Users className="h-5 w-5 text-[#297FF3]" />
                <h2 className="text-xl font-medium text-[#1b1b1b]">
                  {t("whoTitle")}
                </h2>
              </div>
              <p className="text-base leading-[1.8] text-[#1b1b1b]/60">
                {t("whoText")}
              </p>
            </section>
          </ScrollReveal>

          {/* Technical Claims */}
          <ScrollReveal>
            <section className="mb-12">
              <div className="mb-3 flex items-center gap-2">
                <Cpu className="h-5 w-5 text-[#297FF3]" />
                <h2 className="text-xl font-medium text-[#1b1b1b]">
                  {t("techTitle")}
                </h2>
              </div>
              <p className="text-base leading-[1.8] text-[#1b1b1b]/60">
                {t("techText")}
              </p>
            </section>
          </ScrollReveal>

          {/* Public Debate */}
          <ScrollReveal>
            <section className="mb-12">
              <div className="mb-3 flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-[#297FF3]" />
                <h2 className="text-xl font-medium text-[#1b1b1b]">
                  {t("debateTitle")}
                </h2>
              </div>
              <p className="text-base leading-[1.8] text-[#1b1b1b]/60">
                {t("debateText")}
              </p>
            </section>
          </ScrollReveal>

          {/* Key Questions FAQ */}
          <ScrollReveal>
            <section className="mb-16">
              <div className="mb-6 flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-[#FF6B00]" />
                <h2 className="text-xl font-medium text-[#1b1b1b]">
                  {t("keyQuestionsTitle")}
                </h2>
              </div>
              <div className="space-y-6">
                {(["q1", "q2", "q3", "q4"] as const).map((key) => (
                  <div
                    key={key}
                    className="rounded-2xl border border-[#D0D0D0]/50 bg-[#f8f8f8] p-6"
                  >
                    <h3 className="mb-2 text-sm font-medium text-[#1b1b1b]">
                      {t(`keyQuestions.${key}`)}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#1b1b1b]/60">
                      {t(`keyQuestions.a${key.slice(1)}`)}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </ScrollReveal>

          {/* Your Voice Section */}
          <ScrollReveal>
            <section className="mb-8">
              <h2 className="mb-2 text-2xl font-light tracking-[-0.02em] text-[#1b1b1b]">
                {t("yourVoiceTitle")}
              </h2>
              <p className="mb-8 text-base leading-[1.6] text-[#1b1b1b]/45">
                {t("yourVoiceText")}
              </p>
            </section>
          </ScrollReveal>

          {/* Poll */}
          <ScrollReveal>
            <div className="mb-12">
              <CommunityPoll />
            </div>
          </ScrollReveal>

          {/* Comments */}
          <ScrollReveal>
            <CommunityComments />
          </ScrollReveal>

          {/* Related Pages — internal linking for SEO */}
          <ScrollReveal>
            <div className="mt-16 border-t border-[#D0D0D0]/30 pt-10">
              <h2 className="mb-6 text-lg font-medium text-[#1b1b1b]">
                {t("relatedTitle")}
              </h2>
              <div className="grid gap-4 sm:grid-cols-3">
                <Link
                  href="/faq"
                  className="group rounded-2xl border border-[#D0D0D0]/50 bg-[#f8f8f8] p-5 transition-all hover:border-[#D0D0D0] hover:shadow-sm"
                >
                  <h3 className="mb-1 text-sm font-semibold text-[#1b1b1b] group-hover:text-[#FF6B00] transition-colors">
                    {t("relatedFaq")}
                  </h3>
                  <p className="mb-3 text-xs leading-relaxed text-[#1b1b1b]/40">
                    {t("relatedFaqDesc")}
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
                  href="/simulation/time-theft"
                  className="group rounded-2xl border border-[#D0D0D0]/50 bg-[#f8f8f8] p-5 transition-all hover:border-[#D0D0D0] hover:shadow-sm"
                >
                  <h3 className="mb-1 text-sm font-semibold text-[#1b1b1b] group-hover:text-[#FF6B00] transition-colors">
                    {t("relatedSimulation")}
                  </h3>
                  <p className="mb-3 text-xs leading-relaxed text-[#1b1b1b]/40">
                    {t("relatedSimulationDesc")}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-[#FF6B00]">
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
                  </span>
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Legal footer note */}
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
