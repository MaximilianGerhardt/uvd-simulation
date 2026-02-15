import { SubpageLayout } from "@/components/subpage-layout";
import { RTMSimulator } from "@/components/rtm-simulator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RTM Simulator — Relative Theory of Money Live",
  description:
    "Interactive visualization of the Relative Theory of Money. Universal Dividend, symmetric money creation, temporal symmetry — simulate and understand in real time.",
  keywords: ["RTM", "Relative Theory of Money", "Universal Dividend", "Symmetric Money Creation", "Stéphane Laborde", "UVD Simulation", "Monetary Theory"],
  alternates: { canonical: "https://uvd.trading/simulation/rtm" },
  openGraph: {
    title: "RTM Simulator — Symmetric Money Creation Live",
    description: "Relative Theory of Money interactive: adjust parameters, observe mathematical invariants in real time.",
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
