import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SubpageLayout } from "@/components/subpage-layout";
import { PageBreadcrumb, GlossarySchema } from "@/components/structured-data";
import { Glossary } from "@/components/glossary";

const BASE_URL = "https://www.uvd.trading";

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
    alternates: { canonical: url, languages: alternates },
    openGraph: {
      title: t("glossary.title"),
      description: t("glossary.description"),
      url,
      siteName: "UVD Simulation",
      locale: locale === "de" ? "de_DE" : locale === "ar" ? "ar_AE" : locale === "es" ? "es_ES" : locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
      images: [{ url: `${BASE_URL}/${locale}/og/glossary`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("glossary.title"),
      description: t("glossary.description"),
      images: [`${BASE_URL}/${locale}/og/glossary`],
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const GLOSSARY_KEYS = ["inflation", "cantillon", "rtm", "ud", "wot", "basket", "timeEquity", "lazyClaiming"] as const;

export default async function GlossaryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "glossary" });

  return (
    <SubpageLayout>
      <PageBreadcrumb items={[{ name: "Glossary", path: "/glossary" }]} />
      <GlossarySchema
        terms={GLOSSARY_KEYS.map((key) => ({
          name: t(`terms.${key}.term`),
          description: t(`terms.${key}.definition`),
        }))}
      />
      <Glossary />
    </SubpageLayout>
  );
}
