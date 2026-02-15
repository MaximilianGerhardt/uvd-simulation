import { SubpageLayout } from "@/components/subpage-layout";
import { TimeTheftCalculator } from "@/components/time-theft-calculator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Time-Theft Calculator — How Much Has Inflation Cost You?",
  description:
    "Calculate how much purchasing power inflation has stolen from you. Personal inflation calculator with World Bank, ECB, and FRED data. Fiat vs. symmetric money creation.",
  keywords: ["Inflation Calculator", "Purchasing Power Loss", "Time Theft", "Cantillon Effect", "UVD", "Purchasing Power Calculator", "Cost of Inflation"],
  alternates: { canonical: "https://uvd.trading/simulation/time-theft" },
  openGraph: {
    title: "Time-Theft Calculator — How Much Has Inflation Cost You?",
    description: "Personal purchasing power calculator based on historical central bank data.",
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
