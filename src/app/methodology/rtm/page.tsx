import { SubpageLayout } from "@/components/subpage-layout";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Methodik: RTM Simulator — Universaldividende Herleitung",
  description:
    "Vollständige Herleitung der Universaldividende-Formel aus der Relativen Theorie des Geldes. Mathematischer Beweis, Symmetrie-Eigenschaften, Implementierung.",
  keywords: ["RTM Methodik", "Universaldividende Formel", "Relative Theorie des Geldes", "Stéphane Laborde", "Symmetrische Geldschöpfung Beweis", "Duniter"],
  alternates: { canonical: "https://uvd.trading/methodology/rtm" },
  openGraph: {
    title: "Methodik: RTM — Universaldividende mathematisch hergeleitet",
    description: "Formel-Herleitung, Symmetrie-Beweis und Implementierung der Relativen Theorie des Geldes.",
    url: "https://uvd.trading/methodology/rtm",
  },
};

export default function RTMMethodology() {
  return (
    <SubpageLayout backLabel="Back to Overview">
      <article className="px-6 py-16 bg-white">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.05em] text-[#297FF3]">
              Methodology
            </p>
            <h1 className="mb-6 text-[clamp(2.5rem,5vw,4rem)] font-light tracking-[-0.04em] leading-[1.05] text-[#1b1b1b]">
              RTM Live Simulator
            </h1>
            <p className="mb-16 text-[clamp(1.125rem,2vw,1.25rem)] leading-[1.6] text-[#1b1b1b]/45">
              The Relative Theory of Money is a formal mathematical framework
              proving that only one class of monetary systems achieves spatial
              and temporal symmetry. This page documents the derivation, the
              simulation implementation, and all underlying assumptions.
            </p>
          </ScrollReveal>

          {/* Theoretical Foundation */}
          <ScrollReveal>
            <section className="mb-16">
              <h2 className="mb-4 text-2xl font-light tracking-[-0.02em] text-[#1b1b1b]">
                Theoretical Foundation
              </h2>
              <p className="mb-4 text-base leading-[1.8] text-[#1b1b1b]/50">
                The Relative Theory of Money (Théorie Relative de la Monnaie) was
                formalized by Stéphane Laborde in 2010. Its central theorem proves
                that for a monetary system to treat all participants equally —
                regardless of when they join or leave — newly created monetary
                units must be distributed equally to every living member.
              </p>
              <p className="mb-4 text-base leading-[1.8] text-[#1b1b1b]/50">
                This equal distribution is called the <strong className="text-[#1b1b1b]">Universal Dividend (UD)</strong>.
                The theory defines a growth rate <em>c</em> that determines how much
                new money enters the system each period. For a human lifespan of
                approximately 80 years, the optimal rate converges to roughly 10% per year.
              </p>
              <p className="text-base leading-[1.8] text-[#1b1b1b]/50">
                The key insight: in fiat systems, money enters via bank lending
                (credit creation), benefiting borrowers and financial institutions
                first. RTM replaces this asymmetric mechanism with a symmetric one
                where every participant receives the same share of new money creation.
              </p>
            </section>
          </ScrollReveal>

          {/* Core Formulas */}
          <ScrollReveal>
            <section className="mb-16">
              <h2 className="mb-4 text-2xl font-light tracking-[-0.02em] text-[#1b1b1b]">
                Core Formulas
              </h2>

              <div className="mb-6 rounded-2xl border border-[#D0D0D0]/50 bg-[#f8f8f8] p-6">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.05em] text-[#1b1b1b]/30">
                  Universal Dividend Recurrence
                </p>
                <code className="block text-lg font-mono text-[#FF6B00]">
                  UD(t+1) = UD(t) + c² × (M(t) / N(t+1))
                </code>
                <div className="mt-4 space-y-2 text-sm text-[#1b1b1b]/50">
                  <p><span className="font-mono text-[#1b1b1b]">UD(t)</span> — Universal Dividend at time t</p>
                  <p><span className="font-mono text-[#1b1b1b]">c</span> — Growth rate (annual, e.g., 0.10 for 10%)</p>
                  <p><span className="font-mono text-[#1b1b1b]">M(t)</span> — Total money supply at time t</p>
                  <p><span className="font-mono text-[#1b1b1b]">N(t+1)</span> — Number of active members at time t+1</p>
                </div>
              </div>

              <div className="mb-6 rounded-2xl border border-[#D0D0D0]/50 bg-[#f8f8f8] p-6">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.05em] text-[#1b1b1b]/30">
                  Money Supply Evolution
                </p>
                <code className="block text-lg font-mono text-[#FF6B00]">
                  M(t+1) = M(t) + UD(t+1) × N(t+1)
                </code>
                <div className="mt-4 text-sm text-[#1b1b1b]/50">
                  <p>The total money supply grows by exactly the aggregate Universal
                  Dividend — the sum of all individual UD payments. No money is created
                  outside this mechanism.</p>
                </div>
              </div>

              <div className="mb-6 rounded-2xl border border-[#D0D0D0]/50 bg-[#f8f8f8] p-6">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.05em] text-[#1b1b1b]/30">
                  Initial Conditions
                </p>
                <code className="block text-lg font-mono text-[#297FF3]">
                  UD(0) = c × M(0) / N(0)
                </code>
                <div className="mt-4 text-sm text-[#1b1b1b]/50">
                  <p>The initial Universal Dividend is set as the growth rate times the
                  per-capita money supply. In our simulation, <span className="font-mono text-[#1b1b1b]">M(0) = N × 1000</span> (each
                  member starts with 1000 units).</p>
                </div>
              </div>

              <div className="rounded-2xl border border-[#D0D0D0]/50 bg-[#f8f8f8] p-6">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.05em] text-[#1b1b1b]/30">
                  Optimal Growth Rate
                </p>
                <code className="block text-lg font-mono text-[#FF6B00]">
                  c = ln(ev) / (ev / 2) ≈ 0.10
                </code>
                <div className="mt-4 text-sm text-[#1b1b1b]/50">
                  <p>Where <span className="font-mono text-[#1b1b1b]">ev</span> is average life expectancy
                  (~80 years). This ensures that over a complete human lifetime, no
                  generation accumulates a disproportionate monetary advantage. The
                  simulator allows adjusting <em>c</em> from 1% to 20% to observe sensitivity.</p>
                </div>
              </div>
            </section>
          </ScrollReveal>

          {/* Symmetry Properties */}
          <ScrollReveal>
            <section className="mb-16">
              <h2 className="mb-4 text-2xl font-light tracking-[-0.02em] text-[#1b1b1b]">
                Symmetry Properties
              </h2>
              <div className="space-y-4">
                <div className="rounded-2xl border border-[#D0D0D0]/50 bg-white p-5">
                  <p className="mb-1 font-medium text-[#1b1b1b]">Spatial Symmetry</p>
                  <p className="text-base leading-[1.8] text-[#1b1b1b]/50">
                    At any given moment, every member receives the same Universal Dividend.
                    There is no privileged position in the network. Unlike fiat systems
                    where proximity to the central bank confers advantage, RTM distributes
                    new money identically to all participants.
                  </p>
                </div>
                <div className="rounded-2xl border border-[#D0D0D0]/50 bg-white p-5">
                  <p className="mb-1 font-medium text-[#1b1b1b]">Temporal Symmetry</p>
                  <p className="text-base leading-[1.8] text-[#1b1b1b]/50">
                    A person entering the system today receives the same relative share
                    of the money supply as someone who entered 40 years ago. The growth
                    rate <em>c</em> is calibrated so that over one human lifetime, the
                    relative monetary position converges. No generation is structurally
                    advantaged over another.
                  </p>
                </div>
              </div>
            </section>
          </ScrollReveal>

          {/* Source Code */}
          <ScrollReveal>
            <section className="mb-16">
              <h2 className="mb-4 text-2xl font-light tracking-[-0.02em] text-[#1b1b1b]">
                Implementation
              </h2>
              <p className="mb-6 text-base leading-[1.8] text-[#1b1b1b]/50">
                The simulator iterates the recurrence relation year by year:
              </p>
              <div className="rounded-2xl border border-[#D0D0D0]/50 bg-[#1b1b1b] p-6 overflow-x-auto">
                <pre className="text-sm leading-relaxed text-white/70">
                  <code>{`function simulateRTM({ members, growthRate, years, initialMoneySupply }) {
  let M = initialMoneySupply;        // M(0)
  let UD = growthRate * M / members;  // UD(0)
  let cumulative = 0;

  for (let y = 0; y <= years; y++) {
    cumulative += (y === 0) ? 0 : UD;

    record(y, M, UD, cumulative);

    // Apply RTM recurrence:
    const nextUD = UD + growthRate² × (M / members);
    M += nextUD × members;
    UD = nextUD;
  }
}`}</code>
                </pre>
              </div>
              <p className="mt-4 text-sm text-[#1b1b1b]/40">
                Full source:{" "}
                <a
                  href="https://github.com/MaximilianGerhardt/uvd-simulation/blob/main/src/lib/simulation.ts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#297FF3] hover:underline"
                >
                  simulation.ts on GitHub
                </a>
              </p>
            </section>
          </ScrollReveal>

          {/* Assumptions */}
          <ScrollReveal>
            <section className="mb-16">
              <h2 className="mb-4 text-2xl font-light tracking-[-0.02em] text-[#1b1b1b]">
                Assumptions &amp; Limitations
              </h2>
              <div className="space-y-4 text-base leading-[1.8] text-[#1b1b1b]/50">
                <div className="rounded-2xl border border-[#D0D0D0]/50 bg-white p-5">
                  <p className="mb-1 font-medium text-[#1b1b1b]">Constant member count</p>
                  <p>The simulation holds N constant. In reality, members join and leave
                  over time. The RTM formula handles this via N(t+1) in the denominator,
                  but for clarity the simulator lets you set a fixed population.</p>
                </div>
                <div className="rounded-2xl border border-[#D0D0D0]/50 bg-white p-5">
                  <p className="mb-1 font-medium text-[#1b1b1b]">No external economic factors</p>
                  <p>The model is purely monetary — it does not account for productivity
                  growth, trade dynamics, or fiscal policy. It isolates the effect of
                  the money creation mechanism itself.</p>
                </div>
                <div className="rounded-2xl border border-[#D0D0D0]/50 bg-white p-5">
                  <p className="mb-1 font-medium text-[#1b1b1b]">Deterministic model</p>
                  <p>No randomness or volatility is modeled. This is intentional — the
                  purpose is to demonstrate the mathematical invariants, not to simulate
                  market behavior.</p>
                </div>
              </div>
            </section>
          </ScrollReveal>

          {/* References */}
          <ScrollReveal>
            <section>
              <h2 className="mb-4 text-2xl font-light tracking-[-0.02em] text-[#1b1b1b]">
                Primary Sources
              </h2>
              <div className="space-y-3">
                {[
                  { title: "Théorie Relative de la Monnaie — Stéphane Laborde (2010, rev. 2.718)", url: "https://trm.creationmonetaire.info/" },
                  { title: "RTM Mathematical Appendix (formal proofs)", url: "https://trm.creationmonetaire.info/annexes.html" },
                  { title: "Duniter — Reference implementation of RTM (libre currency Ğ1)", url: "https://duniter.org/" },
                  { title: "Ğ1 Currency — Live RTM implementation with 8,000+ members", url: "https://g1.duniter.fr/" },
                  { title: "UVD Whitepaper (IPFS)", url: "https://rose-biological-bird-527.mypinata.cloud/ipfs/bafkreide3ntd3hitginvxhhkcjspa3xgu4mwcx3nxfocrrl4d4p3jxigoi" },
                ].map((ref) => (
                  <a
                    key={ref.title}
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-xl border border-[#D0D0D0]/30 bg-white px-5 py-3 text-sm text-[#1b1b1b]/60 transition-all hover:border-[#D0D0D0] hover:text-[#1b1b1b]"
                  >
                    <span>{ref.title}</span>
                    <ExternalLink className="h-3.5 w-3.5 shrink-0 ml-3" />
                  </a>
                ))}
              </div>
            </section>
          </ScrollReveal>
        </div>
      </article>
    </SubpageLayout>
  );
}
