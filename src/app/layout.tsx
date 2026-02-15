import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { StructuredData } from "@/components/structured-data";
import { CookieConsent } from "@/components/cookie-consent";
import "./globals.css";

const BASE_URL = "https://uvd.trading";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "UVD Simulation — Interactive Companion to Universe Dollar",
    template: "%s — UVD Simulation",
  },
  description:
    "Interaktives Simulation Terminal für Universe Dollar. Inflationsrechner, RTM-Visualisierung, Sovereign Basket Builder — transparent, open source, datenbasiert.",
  keywords: [
    "UVD",
    "Universe Dollar",
    "Inflation Rechner",
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
    "Geldschöpfung",
    "Inflationsschutz",
    "Kryptowährung",
    "Basket Currency",
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
    canonical: BASE_URL,
  },
  openGraph: {
    title: "UVD Simulation — Interactive Companion to Universe Dollar",
    description:
      "Inflationsrechner, RTM-Simulation, Sovereign Basket Builder. Erlebe die Mathematik hinter fairem Geld — interaktiv und transparent.",
    type: "website",
    url: BASE_URL,
    siteName: "UVD Simulation",
    locale: "de_DE",
  },
  twitter: {
    card: "summary_large_image",
    title: "UVD Simulation — Interactive Companion to Universe Dollar",
    description:
      "Interaktives Simulation Terminal: Inflationsrechner, RTM-Visualisierung, Basket Builder. Datenbasiert & open source.",
    creator: "@uvd99",
  },
  other: {
    "geo.region": "US-FL",
    "geo.placename": "Estero",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <StructuredData />
        <link rel="canonical" href={BASE_URL} />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <TooltipProvider>{children}</TooltipProvider>
        <CookieConsent />
      </body>
    </html>
  );
}
