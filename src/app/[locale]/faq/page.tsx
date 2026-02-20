import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { HelpCircle, ChevronDown, AlertTriangle } from "lucide-react";
import { SubpageLayout } from "@/components/subpage-layout";
import { PageBreadcrumb, FAQPageSchema } from "@/components/structured-data";

const BASE_URL = "https://www.uvd.trading";

const ALL_FAQ_KEYS = [
  "whatIsUvd", "whoCreated", "kianHoss", "whatIsThis",
  "isScam", "isLegit", "regulated",
  "howWorks", "stablecoin", "blockchain", "rtmExplained", "cantillonWhat", "inflationCalc",
  "canBuy", "whenLaunch",
] as const;

const FAQ_SECTIONS = [
  {
    sectionKey: "about" as const,
    items: ["whatIsUvd", "whoCreated", "kianHoss", "whatIsThis"] as const,
  },
  {
    sectionKey: "trust" as const,
    items: ["isScam", "isLegit", "regulated"] as const,
  },
  {
    sectionKey: "technology" as const,
    items: ["howWorks", "stablecoin", "blockchain", "rtmExplained", "cantillonWhat", "inflationCalc"] as const,
  },
  {
    sectionKey: "gettingStarted" as const,
    items: ["canBuy", "whenLaunch"] as const,
  },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const url = `${BASE_URL}${prefix}/faq`;
  const alternates: Record<string, string> = {};
  for (const loc of routing.locales) {
    const p = loc === routing.defaultLocale ? "" : `/${loc}`;
    alternates[loc] = `${BASE_URL}${p}/faq`;
  }
  return {
    title: t("faq.title"),
    description: t("faq.description"),
    alternates: { canonical: url, languages: alternates },
    openGraph: {
      title: t("faq.title"),
      description: t("faq.description"),
      url,
      siteName: "UVD Simulation",
      locale: locale === "de" ? "de_DE" : locale === "ar" ? "ar_AE" : locale === "es" ? "es_ES" : locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("faq.title"),
      description: t("faq.description"),
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function FAQPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "faq" });

  let globalIndex = 0;

  return (
    <SubpageLayout>
      <PageBreadcrumb items={[{ name: "FAQ", path: "/faq" }]} />
      <FAQPageSchema
        items={ALL_FAQ_KEYS.map((key) => ({
          question: t(`items.${key}.q`),
          answer: t(`items.${key}.a`),
        }))}
      />
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D0D0D0] bg-[#f8f8f8] px-4 py-1.5">
              <HelpCircle className="h-3.5 w-3.5 text-[#1b1b1b]/50" />
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
          </div>

          {/* Disclaimer Banner */}
          <div className="mb-12 flex items-start gap-3 rounded-xl border border-[#FF6B00]/20 bg-[#FF6B00]/5 p-4">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#FF6B00]" />
            <p className="text-sm text-[#1b1b1b]/60">
              {t("disclaimer")}
            </p>
          </div>

          {/* FAQ Sections — native <details> for SSR-friendly disclosure */}
          {FAQ_SECTIONS.map((section) => (
            <div key={section.sectionKey} className="mb-10">
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.05em] text-[#1b1b1b]/30">
                {t(`sections.${section.sectionKey}`)}
              </h2>
              <div className="space-y-3">
                {section.items.map((itemKey) => {
                  globalIndex++;
                  const num = globalIndex;

                  return (
                    <details
                      key={itemKey}
                      className="group rounded-2xl border border-[#D0D0D0]/50 bg-white transition-all hover:border-[#D0D0D0] hover:shadow-sm"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-4 [&::-webkit-details-marker]:hidden">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-[#FF6B00]/60">
                            {String(num).padStart(2, "0")}
                          </span>
                          <h3 className="text-base font-semibold text-[#1b1b1b]">
                            {t(`items.${itemKey}.q`)}
                          </h3>
                        </div>
                        <ChevronDown className="h-4 w-4 shrink-0 text-[#1b1b1b]/30 transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="mx-6 mb-4 rounded-b-xl border-x border-b border-[#D0D0D0]/30 bg-[#f8f8f8] px-6 py-4">
                        <p className="ps-3 text-sm leading-relaxed text-[#1b1b1b]/60 border-s-2 border-[#FF6B00]/30">
                          {t(`items.${itemKey}.a`)}
                        </p>
                      </div>
                    </details>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </SubpageLayout>
  );
}
