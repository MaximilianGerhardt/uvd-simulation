import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, isRTL } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";
import { TooltipProvider } from "@/components/ui/tooltip";
import { StructuredData } from "@/components/structured-data";
import { CookieConsent } from "@/components/cookie-consent";
import { AIChat } from "@/components/ai-chat";
import "../globals.css";

const BASE_URL = "https://uvd.trading";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const localePrefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const canonicalUrl = `${BASE_URL}${localePrefix}`;

  const alternates: Record<string, string> = {};
  for (const loc of routing.locales) {
    const prefix = loc === routing.defaultLocale ? "" : `/${loc}`;
    alternates[loc] = `${BASE_URL}${prefix}`;
  }

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: t("home.title"),
      template: `%s — UVD Simulation`,
    },
    description: t("home.description"),
    keywords: [
      "UVD",
      "Universe Dollar",
      "Inflation Calculator",
      "Relative Theory of Money",
      "RTM",
      "Symmetric Money Creation",
      "Universal Dividend",
      "Sovereign Basket",
      "Cantillon Effect",
      "Purchasing Power",
      "Monetary Simulation",
      "Fair Money",
      "Money Creation",
      "Inflation Protection",
      "Cryptocurrency",
      "Basket Currency",
      "Kian Hoss",
      "UVD Scam",
      "UVD Review",
    ],
    authors: [{ name: "Maximilian Gerhardt", url: BASE_URL }],
    creator: "Prime Associates LLC",
    publisher: "Prime Associates LLC",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: canonicalUrl,
      languages: alternates,
    },
    openGraph: {
      title: t("home.title"),
      description: t("home.description"),
      type: "website",
      url: canonicalUrl,
      siteName: "UVD Simulation",
      locale: locale === "de" ? "de_DE" : locale === "ar" ? "ar_AE" : locale === "es" ? "es_ES" : locale === "fr" ? "fr_FR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: t("home.title"),
      description: t("home.description"),
      creator: "@uvd99",
    },
    other: {
      "geo.region": "US-FL",
      "geo.placename": "Estero",
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const dir = isRTL(locale as Locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <head>
        <StructuredData />
        {routing.locales.map((loc) => {
          const prefix = loc === routing.defaultLocale ? "" : `/${loc}`;
          return (
            <link
              key={loc}
              rel="alternate"
              hrefLang={loc}
              href={`${BASE_URL}${prefix}`}
            />
          );
        })}
        <link rel="alternate" hrefLang="x-default" href={BASE_URL} />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <NextIntlClientProvider>
          <TooltipProvider>{children}</TooltipProvider>
          <AIChat />
          <CookieConsent />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
