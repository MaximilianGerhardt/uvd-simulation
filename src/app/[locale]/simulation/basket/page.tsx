import { SubpageLayout } from "@/components/subpage-layout";
import { BasketVisualizer } from "@/components/basket-visualizer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sovereign Basket Index — Fiat vs. UVD Cost of Living",
  description:
    "Compare real cost of living across countries. Basket simulation: rent, energy, groceries — fiat inflation vs. UVD stability over 20 years.",
  keywords: ["Cost of Living", "Inflation Comparison", "Sovereign Basket", "Basket Currency", "UVD", "Purchasing Power", "Price Index"],
  alternates: { canonical: "https://uvd.trading/simulation/basket" },
  openGraph: {
    title: "Sovereign Basket — Same Basket, Two Price Tags",
    description: "Rent, energy, groceries: how fiat prices vs. UVD prices evolve over 20 years.",
    url: "https://uvd.trading/simulation/basket",
  },
};

export default function BasketPage() {
  return (
    <SubpageLayout backLabel="Back to Overview">
      <BasketVisualizer />
    </SubpageLayout>
  );
}
