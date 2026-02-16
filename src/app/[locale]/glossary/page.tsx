import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SubpageLayout } from "@/components/subpage-layout";
import { Glossary } from "@/components/glossary";

const BASE_URL = "https://uvd.trading";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const url = `${BASE_URL}${prefix}/glossary`;
  const alternates: Record<string, string> = {};
  for (const loc of routing.locales) {
    const p = loc === routing.defaultLocale ? "" : `/${loc}`;
    alternates[loc] = `${BASE_URL}${p}/glossary`;
  }
  return {
    title: t("glossary.title"),
    description: t("glossary.description"),
    keywords: ["Monetary Theory Glossary", "Cantillon Effect", "Universal Dividend", "RTM", "Money Creation", "Purchasing Power", "Inflation Explained"],
    alternates: { canonical: url, languages: alternates },
    openGraph: {
      title: t("glossary.title"),
      description: t("glossary.description"),
      url,
      siteName: "UVD Simulation",
      locale: locale === "de" ? "de_DE" : locale === "ar" ? "ar_AE" : locale === "es" ? "es_ES" : locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
      images: [{ url: `${BASE_URL}/og${locale === "en" ? "" : `-${locale}`}.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("glossary.title"),
      description: t("glossary.description"),
      images: [`${BASE_URL}/og${locale === "en" ? "" : `-${locale}`}.png`],
    },
  };
}

export default function GlossaryPage() {
  return (
    <SubpageLayout>
      <Glossary />
    </SubpageLayout>
  );
}
