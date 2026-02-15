import { SubpageLayout } from "@/components/subpage-layout";
import { BasketVisualizer } from "@/components/basket-visualizer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sovereign Basket Index — Universe Dollar Simulation",
  description:
    "Compare the real cost of living across countries. Explore how fiat inflation distorts everyday prices while basket-indexed measurement preserves clarity.",
};

export default function BasketPage() {
  return (
    <SubpageLayout backLabel="Back to Overview">
      <BasketVisualizer />
    </SubpageLayout>
  );
}
