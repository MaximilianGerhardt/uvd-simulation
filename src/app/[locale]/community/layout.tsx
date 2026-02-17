import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Script from "next/script";

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
          url: `${BASE_URL}/${locale}/og/community`,
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
        `${BASE_URL}/${locale}/og/community`,
      ],
    },
  };
}

export default async function CommunityLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "community" });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: t("keyQuestions.q1"),
        acceptedAnswer: { "@type": "Answer", text: t("keyQuestions.a1") },
      },
      {
        "@type": "Question",
        name: t("keyQuestions.q2"),
        acceptedAnswer: { "@type": "Answer", text: t("keyQuestions.a2") },
      },
      {
        "@type": "Question",
        name: t("keyQuestions.q3"),
        acceptedAnswer: { "@type": "Answer", text: t("keyQuestions.a3") },
      },
      {
        "@type": "Question",
        name: t("keyQuestions.q4"),
        acceptedAnswer: { "@type": "Answer", text: t("keyQuestions.a4") },
      },
    ],
  };

  return (
    <>
      <Script
        id="community-faq-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
