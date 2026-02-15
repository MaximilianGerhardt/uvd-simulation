import { SubpageLayout } from "@/components/subpage-layout";
import { Glossary } from "@/components/glossary";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Glossary — Universe Dollar Simulation",
  description:
    "Precise definitions of monetary theory concepts with primary sources. From Cantillon Effect to Lazy Claiming — understand the language of fair money.",
};

export default function GlossaryPage() {
  return (
    <SubpageLayout backLabel="Back to Overview">
      <Glossary />
    </SubpageLayout>
  );
}
