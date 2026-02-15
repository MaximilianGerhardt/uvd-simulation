import { SubpageLayout } from "@/components/subpage-layout";
import { Glossary } from "@/components/glossary";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Glossary — Monetary Theory Explained",
  description:
    "Precise definitions of key monetary theory concepts: Cantillon Effect, Universal Dividend, RTM, Purchasing Power, Money Creation. With primary sources and plain language.",
  keywords: ["Monetary Theory Glossary", "Cantillon Effect", "Universal Dividend", "RTM", "Money Creation", "Purchasing Power", "Inflation Explained"],
  alternates: { canonical: "https://uvd.trading/glossary" },
  openGraph: {
    title: "Glossary — The Language of Fair Money",
    description: "From Cantillon Effect to Universal Dividend: every term explained with primary sources.",
    url: "https://uvd.trading/glossary",
  },
};

export default function GlossaryPage() {
  return (
    <SubpageLayout backLabel="Back to Overview">
      <Glossary />
    </SubpageLayout>
  );
}
