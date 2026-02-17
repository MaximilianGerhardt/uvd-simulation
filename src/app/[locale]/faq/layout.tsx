import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Script from "next/script";

const BASE_URL = "https://uvd.trading";

const ALL_FAQ_KEYS = [
  "whatIsUvd", "whoCreated", "kianHoss", "whatIsThis",
  "isScam", "isLegit", "regulated",
  "howWorks", "stablecoin", "blockchain", "rtmExplained", "cantillonWhat", "inflationCalc",
  "canBuy", "whenLaunch",
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
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
      images: [{ url: `${BASE_URL}/${locale}/og/faq`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("faq.title"),
      description: t("faq.description"),
      images: [`${BASE_URL}/${locale}/og/faq`],
    },
  };
}

export default async function FAQLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faq" });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ALL_FAQ_KEYS.map((key) => ({
      "@type": "Question",
      name: t(`items.${key}.q`),
      acceptedAnswer: { "@type": "Answer", text: t(`items.${key}.a`) },
    })),
  };

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
