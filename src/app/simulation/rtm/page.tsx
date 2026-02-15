import { SubpageLayout } from "@/components/subpage-layout";
import { RTMSimulator } from "@/components/rtm-simulator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RTM Simulator — Relative Theorie des Geldes",
  description:
    "Interaktive Visualisierung der Relativen Theorie des Geldes. Universaldividende, symmetrische Geldschöpfung, zeitliche Symmetrie — live simulieren und verstehen.",
  keywords: ["RTM", "Relative Theorie des Geldes", "Universaldividende", "Universal Dividend", "Symmetrische Geldschöpfung", "Stéphane Laborde", "UVD Simulation"],
  alternates: { canonical: "https://uvd.trading/simulation/rtm" },
  openGraph: {
    title: "RTM Simulator — Symmetrische Geldschöpfung live erleben",
    description: "Relative Theorie des Geldes interaktiv: Parameter anpassen, mathematische Invarianten in Echtzeit beobachten.",
    url: "https://uvd.trading/simulation/rtm",
  },
};

export default function RTMPage() {
  return (
    <SubpageLayout backLabel="Back to Overview">
      <RTMSimulator />
    </SubpageLayout>
  );
}
