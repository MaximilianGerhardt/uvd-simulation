import { SubpageLayout } from "@/components/subpage-layout";
import { BasketVisualizer } from "@/components/basket-visualizer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sovereign Basket Index — Warenkorb-Vergleich Fiat vs. UVD",
  description:
    "Vergleiche die realen Lebenshaltungskosten in verschiedenen Ländern. Warenkorb-Simulation: Miete, Energie, Lebensmittel — Fiat-Inflation vs. UVD-Stabilität über 20 Jahre.",
  keywords: ["Warenkorb", "Lebenshaltungskosten", "Inflation Vergleich", "Sovereign Basket", "Basket Currency", "UVD", "Kaufkraft"],
  alternates: { canonical: "https://uvd.trading/simulation/basket" },
  openGraph: {
    title: "Sovereign Basket — Gleicher Warenkorb, zwei Preisschilder",
    description: "Miete, Strom, Lebensmittel: Wie sich Fiat-Preise vs. UVD-Preise über 20 Jahre entwickeln.",
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
