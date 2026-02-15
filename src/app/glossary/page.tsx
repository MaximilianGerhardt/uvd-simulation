import { SubpageLayout } from "@/components/subpage-layout";
import { Glossary } from "@/components/glossary";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Glossar — Geldtheorie verständlich erklärt",
  description:
    "Präzise Definitionen der wichtigsten geldtheoretischen Begriffe: Cantillon-Effekt, Universaldividende, RTM, Kaufkraft, Geldschöpfung. Mit Quellenverweisen und einfacher Sprache.",
  keywords: ["Geldtheorie Glossar", "Cantillon Effekt", "Universaldividende", "RTM", "Geldschöpfung", "Kaufkraft", "Inflation erklärt"],
  alternates: { canonical: "https://uvd.trading/glossary" },
  openGraph: {
    title: "Glossar — Die Sprache des fairen Geldes verstehen",
    description: "Von Cantillon-Effekt bis Universaldividende: Alle Begriffe erklärt mit Primärquellen.",
    url: "https://uvd.trading/glossary",
  },
};

export default function GlossaryPage() {
  return (
    <SubpageLayout backLabel="Back to Overview">
      <Glossary />
    </SubpageLayout>
  );
}
