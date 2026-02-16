import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SubpageLayout } from "@/components/subpage-layout";
import { TimeTheftCalculator } from "@/components/time-theft-calculator";

const BASE_URL = "https://uvd.trading";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const url = `${BASE_URL}${prefix}/simulation/time-theft`;
  const alternates: Record<string, string> = {};
  for (const loc of routing.locales) {
    const p = loc === routing.defaultLocale ? "" : `/${loc}`;
    alternates[loc] = `${BASE_URL}${p}/simulation/time-theft`;
  }
  return {
    title: t("timeTheft.title"),
    description: t("timeTheft.description"),
    keywords: ["Inflation Calculator", "Purchasing Power Loss", "Time Theft", "Cantillon Effect", "UVD", "Purchasing Power Calculator", "Cost of Inflation"],
    alternates: { canonical: url, languages: alternates },
    openGraph: {
      title: t("timeTheft.title"),
      description: t("timeTheft.description"),
      url,
      siteName: "UVD Simulation",
      locale: locale === "de" ? "de_DE" : locale === "ar" ? "ar_AE" : locale === "es" ? "es_ES" : locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("timeTheft.title"),
      description: t("timeTheft.description"),
    },
  };
}

export default function TimeTheftPage() {
  return (
    <SubpageLayout>
      <TimeTheftCalculator />
    </SubpageLayout>
  );
}
