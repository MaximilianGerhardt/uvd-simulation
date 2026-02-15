import { SubpageLayout } from "@/components/subpage-layout";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Methodik: Inflationsrechner — Formeln, Datenquellen, Annahmen",
  description:
    "Volle Transparenz: Kaufkraftverlust-Formel, Inflationsdaten von Weltbank/EZB/FRED, Berechnungsgrundlagen und Limitierungen. Open Source.",
  keywords: ["Inflationsrechner Methodik", "Kaufkraftverlust Formel", "Inflation Datenquellen", "Weltbank CPI", "FRED", "EZB", "Open Source Finanz-Simulation"],
  alternates: { canonical: "https://uvd.trading/methodology/time-theft" },
  openGraph: {
    title: "Methodik: Inflationsrechner — Jede Zahl nachvollziehbar",
    description: "Formeln, Datenquellen, Annahmen und Quellcode des Inflationsrechners. Volle Transparenz.",
    url: "https://uvd.trading/methodology/time-theft",
  },
};

export default function TimeTheftMethodology() {
  return (
    <SubpageLayout backLabel="Back to Overview">
      <article className="px-6 py-16 bg-white">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.05em] text-[#FF6B00]">
              Methodology
            </p>
            <h1 className="mb-6 text-[clamp(2.5rem,5vw,4rem)] font-light tracking-[-0.04em] leading-[1.05] text-[#1b1b1b]">
              Time-Theft Calculator
            </h1>
            <p className="mb-16 text-[clamp(1.125rem,2vw,1.25rem)] leading-[1.6] text-[#1b1b1b]/45">
              This page documents exactly how the inflation impact simulation works —
              every formula, every data source, every assumption. Nothing is hidden.
            </p>
          </ScrollReveal>

          {/* Core Question */}
          <ScrollReveal>
            <section className="mb-16">
              <h2 className="mb-4 text-2xl font-light tracking-[-0.02em] text-[#1b1b1b]">
                What does it measure?
              </h2>
              <p className="mb-4 text-base leading-[1.8] text-[#1b1b1b]/50">
                The Time-Theft Calculator estimates how much purchasing power a person
                has lost over their working lifetime due to monetary inflation. It
                compares the real value of earnings under the current fiat system against
                a hypothetical system where money creation is symmetric (equally
                distributed to all participants).
              </p>
              <p className="text-base leading-[1.8] text-[#1b1b1b]/50">
                The term &ldquo;time theft&rdquo; refers to the concept that when inflation
                erodes your purchasing power, it effectively takes back a portion of the
                time you spent earning that money — without your consent or awareness.
              </p>
            </section>
          </ScrollReveal>

          {/* Formula */}
          <ScrollReveal>
            <section className="mb-16">
              <h2 className="mb-4 text-2xl font-light tracking-[-0.02em] text-[#1b1b1b]">
                The Formula
              </h2>
              <div className="mb-6 rounded-2xl border border-[#D0D0D0]/50 bg-[#f8f8f8] p-6">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.05em] text-[#1b1b1b]/30">
                  Purchasing Power Decay
                </p>
                <code className="block text-lg font-mono text-[#FF6B00]">
                  PP(t) = (1 / (1 + r))^t × 100
                </code>
                <div className="mt-4 space-y-2 text-sm text-[#1b1b1b]/50">
                  <p><span className="font-mono text-[#1b1b1b]">PP(t)</span> — Purchasing power at year t, indexed to 100</p>
                  <p><span className="font-mono text-[#1b1b1b]">r</span> — Average annual inflation rate for the selected country</p>
                  <p><span className="font-mono text-[#1b1b1b]">t</span> — Years since entering the workforce (age 20)</p>
                </div>
              </div>

              <div className="mb-6 rounded-2xl border border-[#D0D0D0]/50 bg-[#f8f8f8] p-6">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.05em] text-[#1b1b1b]/30">
                  Cumulative Inflation Loss
                </p>
                <code className="block text-lg font-mono text-[#FF6B00]">
                  L = Σ (I × r × (1 / (1 + r))^t)
                </code>
                <div className="mt-4 space-y-2 text-sm text-[#1b1b1b]/50">
                  <p><span className="font-mono text-[#1b1b1b]">L</span> — Total cumulative loss in local currency</p>
                  <p><span className="font-mono text-[#1b1b1b]">I</span> — Annual income (monthly × 12)</p>
                  <p><span className="font-mono text-[#1b1b1b]">r</span> — Annual inflation rate</p>
                  <p><span className="font-mono text-[#1b1b1b]">t</span> — Year index (0 to years worked)</p>
                </div>
              </div>

              <div className="rounded-2xl border border-[#D0D0D0]/50 bg-[#f8f8f8] p-6">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.05em] text-[#1b1b1b]/30">
                  UVD Equivalent Preservation
                </p>
                <code className="block text-lg font-mono text-[#297FF3]">
                  UVD_gain ≈ L × 0.85
                </code>
                <div className="mt-4 text-sm text-[#1b1b1b]/50">
                  <p>
                    Conservative estimate: a symmetric monetary system would preserve
                    approximately 85% of the inflation loss. The 15% discount accounts
                    for transaction costs, network growth dynamics, and the fact that
                    perfect price stability is a theoretical ideal.
                  </p>
                </div>
              </div>
            </section>
          </ScrollReveal>

          {/* Data Sources */}
          <ScrollReveal>
            <section className="mb-16">
              <h2 className="mb-4 text-2xl font-light tracking-[-0.02em] text-[#1b1b1b]">
                Data Sources
              </h2>
              <p className="mb-6 text-base leading-[1.8] text-[#1b1b1b]/50">
                Inflation rates used in this simulation are long-term historical averages
                derived from official central bank and international organization data:
              </p>
              <div className="space-y-3">
                {[
                  { country: "Germany", rate: "3.5%", source: "ECB Statistical Data Warehouse", url: "https://sdw.ecb.europa.eu/" },
                  { country: "United States", rate: "3.8%", source: "FRED (Federal Reserve Economic Data)", url: "https://fred.stlouisfed.org/series/CPIAUCSL" },
                  { country: "United Kingdom", rate: "4.0%", source: "Bank of England Inflation Calculator", url: "https://www.bankofengland.co.uk/monetary-policy/inflation/inflation-calculator" },
                  { country: "Japan", rate: "1.5%", source: "Bank of Japan Statistics", url: "https://www.boj.or.jp/en/statistics/" },
                  { country: "Turkey", rate: "25.0%", source: "TURKSTAT & World Bank", url: "https://data.worldbank.org/indicator/FP.CPI.TOTL.ZG?locations=TR" },
                  { country: "Nigeria", rate: "15.0%", source: "CBN & World Bank", url: "https://data.worldbank.org/indicator/FP.CPI.TOTL.ZG?locations=NG" },
                  { country: "Brazil", rate: "8.0%", source: "IBGE & Banco Central do Brasil", url: "https://data.worldbank.org/indicator/FP.CPI.TOTL.ZG?locations=BR" },
                  { country: "Argentina", rate: "60.0%", source: "INDEC & World Bank", url: "https://data.worldbank.org/indicator/FP.CPI.TOTL.ZG?locations=AR" },
                  { country: "India", rate: "6.0%", source: "RBI & World Bank", url: "https://data.worldbank.org/indicator/FP.CPI.TOTL.ZG?locations=IN" },
                  { country: "UAE", rate: "2.5%", source: "FCSC & World Bank", url: "https://data.worldbank.org/indicator/FP.CPI.TOTL.ZG?locations=AE" },
                ].map((item) => (
                  <div key={item.country} className="flex items-center justify-between rounded-xl border border-[#D0D0D0]/30 bg-[#f8f8f8] px-4 py-3">
                    <div>
                      <span className="text-sm text-[#1b1b1b]">{item.country}</span>
                      <span className="ml-2 font-mono text-sm text-[#FF6B00]">{item.rate}/yr</span>
                    </div>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-[#297FF3] hover:underline"
                    >
                      {item.source}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                ))}
              </div>
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
                  <p className="mb-1 font-medium text-[#1b1b1b]">Constant inflation rate</p>
                  <p>We use long-term historical averages. In reality, inflation fluctuates
                  year-to-year, sometimes dramatically. The model simplifies this to show
                  the structural trend, not short-term volatility.</p>
                </div>
                <div className="rounded-2xl border border-[#D0D0D0]/50 bg-white p-5">
                  <p className="mb-1 font-medium text-[#1b1b1b]">Work start age: 20</p>
                  <p>The model assumes workforce entry at age 20. This is a reasonable
                  median for developed economies. Actual entry varies by education level
                  and country.</p>
                </div>
                <div className="rounded-2xl border border-[#D0D0D0]/50 bg-white p-5">
                  <p className="mb-1 font-medium text-[#1b1b1b]">No wage growth adjustment</p>
                  <p>The model measures purchasing power of a fixed income level. In
                  practice, wages often partially adjust to inflation — but consistently
                  lag behind it, which is the core of the Cantillon Effect argument.</p>
                </div>
                <div className="rounded-2xl border border-[#D0D0D0]/50 bg-white p-5">
                  <p className="mb-1 font-medium text-[#1b1b1b]">UVD preservation estimate</p>
                  <p>The 85% preservation factor is a conservative modeling assumption.
                  The actual performance of a symmetric monetary system depends on
                  adoption dynamics, network size, and governance parameters that are
                  not yet empirically determined.</p>
                </div>
              </div>
            </section>
          </ScrollReveal>

          {/* Source Code */}
          <ScrollReveal>
            <section className="mb-16">
              <h2 className="mb-4 text-2xl font-light tracking-[-0.02em] text-[#1b1b1b]">
                Source Code
              </h2>
              <p className="mb-6 text-base leading-[1.8] text-[#1b1b1b]/50">
                The complete simulation engine is open source. The calculation function
                is implemented in TypeScript:
              </p>
              <div className="rounded-2xl border border-[#D0D0D0]/50 bg-[#1b1b1b] p-6 overflow-x-auto">
                <pre className="text-sm leading-relaxed text-white/70">
                  <code>{`function calculateTimeTheft(
  birthYear: number,
  countryCode: string,
  monthlyIncome: number = 3000,
  currentYear: number = 2025
): TimeTheftResult {
  const country = COUNTRY_INFLATION[countryCode];
  const workStartYear = birthYear + 20;
  const yearsWorked = currentYear - workStartYear;
  const annualIncome = monthlyIncome * 12;

  // For each year worked:
  for (let i = 0; i <= yearsWorked; i++) {
    // Fiat purchasing power decays exponentially
    fiatPP = (1 / (1 + country.rate))^i × 100

    // Cumulative loss compounds over time
    cumulativeLoss += annualIncome × rate
                    × (1 / (1 + rate))^i
  }

  // Total loss percentage
  lossPercent = (1 - PP_final / 100) × 100

  // Conservative UVD preservation
  uvdGain = totalLoss × 0.85
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

          {/* References */}
          <ScrollReveal>
            <section>
              <h2 className="mb-4 text-2xl font-light tracking-[-0.02em] text-[#1b1b1b]">
                Further Reading
              </h2>
              <div className="space-y-3">
                {[
                  { title: "Cantillon Effect — Richard Cantillon, Essai sur la Nature du Commerce en Général (1755)", url: "https://en.wikipedia.org/wiki/Cantillon_effect" },
                  { title: "World Bank Inflation Data (CPI)", url: "https://data.worldbank.org/indicator/FP.CPI.TOTL.ZG" },
                  { title: "FRED CPI for All Urban Consumers", url: "https://fred.stlouisfed.org/series/CPIAUCSL" },
                  { title: "ECB Harmonised Index of Consumer Prices", url: "https://sdw.ecb.europa.eu/" },
                  { title: "Relative Theory of Money — Stéphane Laborde (2010)", url: "https://trm.creationmonetaire.info/" },
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
