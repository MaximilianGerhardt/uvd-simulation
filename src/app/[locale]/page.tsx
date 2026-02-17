import dynamic from "next/dynamic";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { PageBreadcrumb } from "@/components/structured-data";
import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import {
  StoryProblem,
  StorySolution,
  StoryProof,
  StoryInstitutional,
  StoryLearn,
  StoryClosing,
} from "@/components/story-sections";
import { Glossary } from "@/components/glossary";
import { Footer } from "@/components/footer";

const TimeTheftCalculator = dynamic(
  () => import("@/components/time-theft-calculator").then((m) => m.TimeTheftCalculator),
  { ssr: true }
);
const RTMSimulator = dynamic(
  () => import("@/components/rtm-simulator").then((m) => m.RTMSimulator),
  { ssr: true }
);
const BasketVisualizer = dynamic(
  () => import("@/components/basket-visualizer").then((m) => m.BasketVisualizer),
  { ssr: true }
);
const BasketBuilder = dynamic(
  () => import("@/components/basket-builder").then((m) => m.BasketBuilder),
  { ssr: true }
);

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-white">
      <PageBreadcrumb items={[]} />
      <Navigation />
      <main>
        <Hero />
        <StoryProblem />
        <TimeTheftCalculator />
        <StorySolution />
        <RTMSimulator />
        <StoryProof />
        <BasketVisualizer />
        <StoryInstitutional />
        <BasketBuilder />
        <StoryLearn />
        <Glossary />
        <StoryClosing />
      </main>
      <Footer />
    </div>
  );
}
