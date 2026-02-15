import { SubpageLayout } from "@/components/subpage-layout";
import { TimeTheftCalculator } from "@/components/time-theft-calculator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Time-Theft Calculator — Universe Dollar Simulation",
  description:
    "Calculate how inflation has eroded your purchasing power over your lifetime. Compare fiat currency depreciation against the UVD symmetric money model.",
};

export default function TimeTheftPage() {
  return (
    <SubpageLayout backLabel="Back to Overview">
      <TimeTheftCalculator />
    </SubpageLayout>
  );
}
