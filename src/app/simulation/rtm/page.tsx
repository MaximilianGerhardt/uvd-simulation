import { SubpageLayout } from "@/components/subpage-layout";
import { RTMSimulator } from "@/components/rtm-simulator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RTM Live Simulator — Universe Dollar Simulation",
  description:
    "Visualize the Relative Theory of Money in real time. Adjust member count, growth rate, and time horizon to explore symmetric money creation dynamics.",
};

export default function RTMPage() {
  return (
    <SubpageLayout backLabel="Back to Overview">
      <RTMSimulator />
    </SubpageLayout>
  );
}
