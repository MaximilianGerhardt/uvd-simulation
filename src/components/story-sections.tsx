"use client";

import Link from "next/link";
import { ArrowRight, Activity, ShoppingBasket, BookOpen } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";

export function StoryProblem() {
  return (
    <section id="story" className="relative px-6 py-32 bg-white">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <p className="mb-6 text-[clamp(0.875rem,1.2vw,1rem)] font-medium uppercase tracking-[0.05em] text-[#FF6B00]">
            The Problem
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="mb-8 text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[1.05] tracking-[-0.04em] text-[#1b1b1b]">
            Every day, your savings<br />
            lose purchasing power.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="mb-10 max-w-2xl text-[clamp(1.125rem,2vw,1.25rem)] leading-[1.6] text-[#1b1b1b]/45">
            When central banks expand the money supply, the first recipients — financial
            institutions, governments, large corporations — spend at yesterday&apos;s prices.
            By the time new money reaches ordinary people, prices have already adjusted
            upward. Economists call this the Cantillon Effect. We call it a structural
            transfer of wealth from the many to the few.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <p className="max-w-2xl text-[clamp(1.125rem,2vw,1.25rem)] leading-[1.6] text-[#1b1b1b]/45">
            The question is not whether this happens — it is measurable, documented, and
            ongoing. The question is: <span className="text-[#1b1b1b]">how much has it cost you, personally?</span>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

export function StorySolution() {
  return (
    <section className="relative px-6 py-32 bg-white">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <p className="mb-6 text-[clamp(0.875rem,1.2vw,1rem)] font-medium uppercase tracking-[0.05em] text-[#297FF3]">
            The Model
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="mb-8 text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[1.05] tracking-[-0.04em] text-[#1b1b1b]">
            Symmetric money<br />
            creation, <span className="gradient-text">proven.</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="mb-8 max-w-2xl text-[clamp(1.125rem,2vw,1.25rem)] leading-[1.6] text-[#1b1b1b]/45">
            The Relative Theory of Money, formalized by Stéphane Laborde in 2010,
            demonstrates that there is exactly one class of monetary systems where
            no individual is structurally advantaged over another: systems where
            newly created units are distributed equally to all participants via a
            Universal Dividend.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.25}>
          <p className="mb-12 max-w-2xl text-[clamp(1.125rem,2vw,1.25rem)] leading-[1.6] text-[#1b1b1b]/45">
            Universe Dollar implements this framework on a blockchain layer. The
            simulation below lets you adjust the parameters — member count,
            growth rate, time horizon — and observe the mathematical invariants
            in real time.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/simulation/rtm"
              className="group inline-flex items-center gap-3 rounded-full bg-[#1b1b1b] px-8 py-4 text-[clamp(0.9375rem,1.5vw,1.0625rem)] font-medium text-white transition-all hover:bg-[#333]"
            >
              <Activity className="h-4 w-4" />
              RTM Live Simulator
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export function StoryProof() {
  return (
    <section className="relative px-6 py-32 bg-[#f8f8f8]">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#4ade80]/20 bg-[#4ade80]/5 px-4 py-1.5">
            <ShoppingBasket className="h-3.5 w-3.5 text-[#4ade80]" />
            <span className="text-xs font-medium text-[#16a34a]">
              Real-World Comparison
            </span>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="mb-8 text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[1.05] tracking-[-0.04em] text-[#1b1b1b]">
            Same groceries,<br />
            two <span className="text-[#FF6B00]">price tags.</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="mb-12 max-w-2xl text-[clamp(1.125rem,2vw,1.25rem)] leading-[1.6] text-[#1b1b1b]/45">
            Pick a country. See a standardized basket of essential goods — housing,
            energy, food, transport — priced in both the local fiat currency and
            UVD over time. The divergence is not hypothetical. It is arithmetic
            applied to publicly available inflation data from the World Bank,
            ECB, and FRED.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <Link
            href="/simulation/basket"
            className="group inline-flex items-center gap-3 rounded-full bg-[#1b1b1b] px-8 py-4 text-[clamp(0.9375rem,1.5vw,1.0625rem)] font-medium text-white transition-all hover:bg-[#333]"
          >
            <ShoppingBasket className="h-4 w-4" />
            Sovereign Basket Index
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}

export function StoryLearn() {
  return (
    <section className="relative px-6 py-32 bg-white">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <p className="mb-6 text-[clamp(0.875rem,1.2vw,1rem)] font-medium uppercase tracking-[0.05em] text-[#1b1b1b]/30">
            Go Deeper
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="mb-8 text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[1.05] tracking-[-0.04em] text-[#1b1b1b]">
            Understand the<br />
            <span className="gradient-text">language of money.</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="mb-12 max-w-2xl text-[clamp(1.125rem,2vw,1.25rem)] leading-[1.6] text-[#1b1b1b]/45">
            Every term used on this site is precisely defined, with deep dives
            and primary source references. From the Cantillon Effect to Lazy Claiming —
            the glossary is your entry point into the economic theory behind the protocol.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <Link
            href="/glossary"
            className="group inline-flex items-center gap-3 rounded-full border border-[#D0D0D0] px-8 py-4 text-[clamp(0.9375rem,1.5vw,1.0625rem)] font-medium text-[#1b1b1b] transition-all hover:border-[#999]"
          >
            <BookOpen className="h-4 w-4" />
            Open Glossary
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}

export function StoryClosing() {
  return (
    <section className="relative px-6 py-40 bg-[#1b1b1b]">
      <div className="mx-auto max-w-4xl text-center">
        <ScrollReveal>
          <h2 className="mb-8 text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[1.05] tracking-[-0.04em] text-white">
            The math is public.<br />
            The protocol is open.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <p className="mx-auto mb-12 max-w-xl text-[clamp(1.125rem,2vw,1.25rem)] leading-[1.6] text-white/40">
            This companion site presents the economic simulations and research
            supporting Universe Dollar. For the full project — whitepaper,
            shortpaper, and roadmap — visit the official site.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.25}>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://www.uvd.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-[clamp(0.9375rem,1.5vw,1.0625rem)] font-medium text-[#1b1b1b] transition-all hover:bg-white/90"
            >
              Visit uvd.xyz
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="https://rose-biological-bird-527.mypinata.cloud/ipfs/bafkreig5445hg6o5lgjjtq7ftprhdbrvbfmoekjopimibxazqv3xtwsqi4"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-4 text-[clamp(0.9375rem,1.5vw,1.0625rem)] font-medium text-white/60 transition-all hover:border-white/30 hover:text-white"
            >
              Read Shortpaper
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
