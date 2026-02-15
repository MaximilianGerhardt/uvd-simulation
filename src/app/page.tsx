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

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
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
