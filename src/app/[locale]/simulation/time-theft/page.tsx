import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SubpageLayout } from "@/components/subpage-layout";
import { PageBreadcrumb, HowToSchema } from "@/components/structured-data";
import { TimeTheftCalculator } from "@/components/time-theft-calculator";

const BASE_URL = "https://www.uvd.trading";

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
    alternates: { canonical: url, languages: alternates },
    openGraph: {
      title: t("timeTheft.title"),
      description: t("timeTheft.description"),
      url,
      siteName: "UVD Trading",
      locale: locale === "de" ? "de_DE" : locale === "ar" ? "ar_AE" : locale === "es" ? "es_ES" : locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
      images: [{ url: `${BASE_URL}/${locale}/og/time-theft`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("timeTheft.title"),
      description: t("timeTheft.description"),
      images: [`${BASE_URL}/${locale}/og/time-theft`],
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function TimeTheftPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <SubpageLayout>
      <PageBreadcrumb items={[{ name: "Time-Theft Calculator", path: "/simulation/time-theft" }]} />
      <HowToSchema
        name="Calculate Your Personal Inflation Loss"
        description="Use the Time-Theft Calculator to discover how much purchasing power inflation has stolen from you over time, based on official World Bank, ECB, and FRED data."
        steps={[
          { name: "Select your country", text: "Choose your country from the dropdown to load its specific historical inflation data from official sources." },
          { name: "Enter your monthly savings", text: "Input how much you save or earn per month to calculate the personal impact of inflation on your purchasing power." },
          { name: "Choose the time period", text: "Select the number of years to simulate — see how inflation compounds over 5, 10, or 20 years." },
          { name: "View your results", text: "See exactly how much purchasing power you have lost to inflation, displayed as a Time-Theft metric showing the hours of work effectively stolen." },
        ]}
      />
      <TimeTheftCalculator />
    </SubpageLayout>
  );
}
