import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import {
  StoryProblem,
  StoryCalculator,
  StorySolution,
  StoryProof,
  StoryLearn,
  StoryClosing,
} from "@/components/story-sections";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <Hero />
        <StoryProblem />
        <StoryCalculator />
        <StorySolution />
        <StoryProof />
        <StoryLearn />
        <StoryClosing />
      </main>
      <Footer />
    </div>
  );
}
