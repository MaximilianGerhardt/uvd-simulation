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
  const url = `${BASE_URL}${prefix}/community`;
  const alternates: Record<string, string> = {};
  for (const loc of routing.locales) {
    const p = loc === routing.defaultLocale ? "" : `/${loc}`;
    alternates[loc] = `${BASE_URL}${p}/community`;
  }
  return {
    title: t("community.title"),
    description: t("community.description"),
    keywords: [
      "Universe Dollar",
      "UVD",
      "Kian Hoss",
      "Kiarash Hossainpour",
      "UVD Scam",
      "Universe Dollar Review",
      "UVD Review",
      "Hoss Crypto",
      "UVD Whitepaper",
      "Universe Dollar Kian Hoss",
      "UVD Kian Hoss",
      "Is UVD a Scam",
      "Universe Dollar Scam",
      "Hoss & Hopf",
      "Crypto Review",
    ],
    alternates: { canonical: url, languages: alternates },
    openGraph: {
      title: t("community.title"),
      description: t("community.description"),
      url,
      siteName: "UVD Simulation",
      locale:
        locale === "de"
          ? "de_DE"
          : locale === "ar"
            ? "ar_AE"
            : locale === "es"
              ? "es_ES"
              : locale === "fr"
                ? "fr_FR"
                : "en_US",
      type: "website",
      images: [
        {
          url: `${BASE_URL}/og${locale === "en" ? "" : `-${locale}`}.png`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("community.title"),
      description: t("community.description"),
      images: [
        `${BASE_URL}/og${locale === "en" ? "" : `-${locale}`}.png`,
      ],
    },
  };
}

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
