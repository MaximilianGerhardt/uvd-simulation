import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SubpageLayout } from "@/components/subpage-layout";
import { BasketVisualizer } from "@/components/basket-visualizer";

const BASE_URL = "https://uvd.trading";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const url = `${BASE_URL}${prefix}/simulation/basket`;
  const alternates: Record<string, string> = {};
  for (const loc of routing.locales) {
    const p = loc === routing.defaultLocale ? "" : `/${loc}`;
    alternates[loc] = `${BASE_URL}${p}/simulation/basket`;
  }
  return {
    title: t("basket.title"),
    description: t("basket.description"),
    keywords: ["Cost of Living", "Inflation Comparison", "Sovereign Basket", "Basket Currency", "UVD", "Purchasing Power", "Price Index"],
    alternates: { canonical: url, languages: alternates },
    openGraph: {
      title: t("basket.title"),
      description: t("basket.description"),
      url,
      siteName: "UVD Simulation",
      locale: locale === "de" ? "de_DE" : locale === "ar" ? "ar_AE" : locale === "es" ? "es_ES" : locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
      images: [{ url: `${BASE_URL}/og${locale === "en" ? "" : `-${locale}`}.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("basket.title"),
      description: t("basket.description"),
      images: [`${BASE_URL}/og${locale === "en" ? "" : `-${locale}`}.png`],
    },
  };
}

export default function BasketPage() {
  return (
    <SubpageLayout>
      <BasketVisualizer />
    </SubpageLayout>
  );
}
