import { SubpageLayout } from "@/components/subpage-layout";
import { TimeTheftCalculator } from "@/components/time-theft-calculator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inflationsrechner — Kaufkraftverlust berechnen",
  description:
    "Berechne wie viel Kaufkraft Inflation dir gestohlen hat. Persönlicher Inflationsrechner mit Daten der Weltbank, EZB und FRED. Vergleich Fiat vs. symmetrische Geldschöpfung.",
  keywords: ["Inflationsrechner", "Kaufkraftverlust", "Inflation berechnen", "Time Theft", "Cantillon Effect", "UVD", "Purchasing Power Calculator"],
  alternates: { canonical: "https://uvd.trading/simulation/time-theft" },
  openGraph: {
    title: "Inflationsrechner — Wie viel hat Inflation dich gekostet?",
    description: "Persönlicher Kaufkraftverlust-Rechner basierend auf historischen Zentralbankdaten.",
    url: "https://uvd.trading/simulation/time-theft",
  },
};

export default function TimeTheftPage() {
  return (
    <SubpageLayout backLabel="Back to Overview">
      <TimeTheftCalculator />
    </SubpageLayout>
  );
}
