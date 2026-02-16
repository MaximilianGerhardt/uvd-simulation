import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

const BASE_URL = "https://uvd.trading";

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
    keywords: ["Universe Dollar", "UVD Explained", "What is UVD", "UVD Crypto", "Symmetric Money", "Relative Theory of Money"],
    alternates: { canonical: url, languages: alternates },
    openGraph: {
      title: t("aboutUvd.title"),
      description: t("aboutUvd.description"),
      url,
      siteName: "UVD Simulation",
      locale: locale === "de" ? "de_DE" : locale === "ar" ? "ar_AE" : locale === "es" ? "es_ES" : locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("aboutUvd.title"),
      description: t("aboutUvd.description"),
    },
  };
}

export default function AboutUVDLayout({ children }: { children: React.ReactNode }) {
  return children;
}
