import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

const BASE_URL = "https://www.uvd.trading";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const url = `${BASE_URL}${prefix}/about-uvd`;
  const alternates: Record<string, string> = {};
  for (const loc of routing.locales) {
    const p = loc === routing.defaultLocale ? "" : `/${loc}`;
    alternates[loc] = `${BASE_URL}${p}/about-uvd`;
  }
  return {
    title: t("aboutUvd.title"),
    description: t("aboutUvd.description"),
    alternates: { canonical: url, languages: alternates },
    openGraph: {
      title: t("aboutUvd.title"),
      description: t("aboutUvd.description"),
      url,
      siteName: "UVD Simulation",
      locale: locale === "de" ? "de_DE" : locale === "ar" ? "ar_AE" : locale === "es" ? "es_ES" : locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
      images: [{ url: `${BASE_URL}/${locale}/og/about-uvd`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("aboutUvd.title"),
      description: t("aboutUvd.description"),
      images: [`${BASE_URL}/${locale}/og/about-uvd`],
    },
  };
}

export default function AboutUVDLayout({ children }: { children: React.ReactNode }) {
  return children;
}
