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
import { TimeTheftCalculator } from "@/components/time-theft-calculator";
import { RTMSimulator } from "@/components/rtm-simulator";
import { BasketVisualizer } from "@/components/basket-visualizer";
import { BasketBuilder } from "@/components/basket-builder";
import { Glossary } from "@/components/glossary";
import { Footer } from "@/components/footer";

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
