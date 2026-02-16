import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SubpageLayout } from "@/components/subpage-layout";
import { RTMSimulator } from "@/components/rtm-simulator";

const BASE_URL = "https://uvd.trading";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const url = `${BASE_URL}${prefix}/simulation/rtm`;
  const alternates: Record<string, string> = {};
  for (const loc of routing.locales) {
    const p = loc === routing.defaultLocale ? "" : `/${loc}`;
    alternates[loc] = `${BASE_URL}${p}/simulation/rtm`;
  }
  return {
    title: t("rtm.title"),
    description: t("rtm.description"),
    keywords: ["RTM", "Relative Theory of Money", "Universal Dividend", "Symmetric Money Creation", "Stéphane Laborde", "UVD Simulation", "Monetary Theory"],
    alternates: { canonical: url, languages: alternates },
    openGraph: {
      title: t("rtm.title"),
      description: t("rtm.description"),
      url,
      siteName: "UVD Simulation",
      locale: locale === "de" ? "de_DE" : locale === "ar" ? "ar_AE" : locale === "es" ? "es_ES" : locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
      images: [{ url: `${BASE_URL}/og${locale === "en" ? "" : `-${locale}`}.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("rtm.title"),
      description: t("rtm.description"),
      images: [`${BASE_URL}/og${locale === "en" ? "" : `-${locale}`}.png`],
    },
  };
}

export default function RTMPage() {
  return (
    <SubpageLayout>
      <RTMSimulator />
    </SubpageLayout>
  );
}
