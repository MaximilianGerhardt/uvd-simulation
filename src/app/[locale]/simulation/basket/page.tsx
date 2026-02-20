import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SubpageLayout } from "@/components/subpage-layout";
import { PageBreadcrumb, HowToSchema } from "@/components/structured-data";
import { BasketVisualizer } from "@/components/basket-visualizer";

const BASE_URL = "https://www.uvd.trading";

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
    alternates: { canonical: url, languages: alternates },
    openGraph: {
      title: t("basket.title"),
      description: t("basket.description"),
      url,
      siteName: "UVD Simulation",
      locale: locale === "de" ? "de_DE" : locale === "ar" ? "ar_AE" : locale === "es" ? "es_ES" : locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
      images: [{ url: `${BASE_URL}/${locale}/og/basket`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("basket.title"),
      description: t("basket.description"),
      images: [`${BASE_URL}/${locale}/og/basket`],
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function BasketPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <SubpageLayout>
      <PageBreadcrumb items={[{ name: "Sovereign Basket", path: "/simulation/basket" }]} />
      <HowToSchema
        name="Compare Cost of Living: Fiat vs UVD"
        description="Use the Sovereign Basket Visualizer to compare how the cost of essential goods (rent, energy, groceries) changes under fiat inflation versus UVD stability over 20 years."
        steps={[
          { name: "Select a country", text: "Choose a country to load its specific cost of living data for housing, energy, food, and transport." },
          { name: "Review the basket composition", text: "See the standardized Sovereign Basket of essential goods and services used to measure real purchasing power." },
          { name: "Compare fiat vs UVD", text: "Watch side-by-side how the same basket costs more in fiat money over time due to inflation, while remaining stable when priced in UVD." },
          { name: "Explore the 20-year projection", text: "Analyze the long-term divergence between fiat-priced and UVD-priced baskets to understand the impact of monetary policy on everyday life." },
        ]}
      />
      <BasketVisualizer />
    </SubpageLayout>
  );
}
