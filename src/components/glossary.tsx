"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ChevronDown, ExternalLink } from "lucide-react";

interface GlossaryEntry {
  term: string;
  definition: string;
  deepDive?: string;
  source?: { label: string; url: string };
}

const glossaryEntries: GlossaryEntry[] = [
  {
    term: "Inflation",
    definition:
      "The expansion of the money supply, which leads to a general increase in prices. Commonly misunderstood as 'rising prices' — prices are the symptom, monetary expansion is the cause.",
    deepDive:
      "When central banks increase the money supply (via quantitative easing or lowering reserve requirements), each existing unit of currency represents a smaller fraction of the total. This dilution manifests as higher prices — but not uniformly. Assets (stocks, real estate) inflate first, consumer goods follow later.",
    source: {
      label: "ECB Money Supply Data",
      url: "https://www.ecb.europa.eu/stats/money_credit_banking/monetary_aggregates/html/index.en.html",
    },
  },
  {
    term: "Cantillon Effect",
    definition:
      "The uneven distribution of newly created money. Those who receive new money first (banks, governments) benefit from old prices, while those who receive it last suffer from already-inflated prices.",
    deepDive:
      "Named after Richard Cantillon (1680-1734), this describes how money creation is inherently redistributive. In modern fiat systems, commercial banks create money through lending. Borrowers (corporations, real estate investors) receive purchasing power at pre-inflation prices. Wage earners — last in line — face higher prices with unchanged income. This is the core injustice that RTM addresses.",
    source: {
      label: "Original Essay (Cantillon, 1755)",
      url: "https://en.wikipedia.org/wiki/Essai_sur_la_Nature_du_Commerce_en_G%C3%A9n%C3%A9ral",
    },
  },
  {
    term: "Relative Theory of Money (RTM)",
    definition:
      "A mathematical framework by Stéphane Laborde (2010) proving that the only monetary system ensuring spatial and temporal symmetry is one where money creation is distributed equally to all members via a Universal Dividend.",
    deepDive:
      "RTM demonstrates that any money system respecting individual economic freedom must follow specific mathematical constraints. The key insight: if money creation is not symmetric (equal for all members), it creates involuntary wealth transfers. The Universal Dividend is not charity — it is the mathematically necessary condition for a free monetary system.",
    source: {
      label: "Théorie Relative de la Monnaie (Laborde, 2010)",
      url: "https://trm.creationmonetaire.info/",
    },
  },
  {
    term: "Universal Dividend (UD)",
    definition:
      "The equal share of newly created money distributed to each verified member of the monetary system. Calculated as: UD(t+1) = UD(t) + c² × (M(t) / N(t+1)), where c ≈ 10% annually.",
    deepDive:
      "The UD growth rate c is derived from human life expectancy (~80 years). It ensures that over a lifetime, no generation is advantaged over another. The formula guarantees that regardless of when someone joins, after one 'half-life' period, they hold roughly the same relative share as everyone else. This is temporal symmetry.",
  },
  {
    term: "Web of Trust (WoT)",
    definition:
      "A decentralized identity verification system where existing members certify new members through personal relationships. Prevents Sybil attacks (one person creating multiple accounts).",
    deepDive:
      "Unlike Proof-of-Work (energy waste) or Proof-of-Stake (plutocracy), the Web of Trust bases consensus on human relationships. To join, a person must be certified by 5 existing 'Smiths' (validators). This ensures one-person-one-account without centralized KYC. Smith status requires ongoing community participation.",
  },
  {
    term: "Sovereign Basket",
    definition:
      "A standardized set of essential goods and services (housing, energy, food, transport) used to measure real purchasing power across currencies and time periods.",
    deepDive:
      "Unlike CPI (Consumer Price Index), which governments can manipulate through methodological changes (hedonic adjustments, substitution effects), the Sovereign Basket is transparent and fixed. Each community defines its own basket, enabling honest cross-country comparisons. UVD serves as the universal unit of account for these baskets.",
  },
  {
    term: "Time-Equity",
    definition:
      "The principle that every person's time has equal monetary value in the creation process. UVD frames money creation not as income redistribution (taxes), but as a 'monetary birthright' — infrastructure, not welfare.",
    deepDive:
      "Traditional framing of universal dividends as 'basic income' triggers political resistance (association with welfare). Time-Equity reframes: just as every citizen has equal access to roads, courts, and clean air, every person should have equal access to newly created monetary units. This is not redistribution — it is fair initial distribution.",
  },
  {
    term: "Lazy Claiming",
    definition:
      "An on-chain optimization where instead of updating every account each block, a global UD Index is maintained. Individual accounts calculate their accrued UD only when transacting.",
    deepDive:
      "If N = 1,000,000 members, updating each account every block would be computationally prohibitive. Lazy Claiming stores a monotonically increasing UD Index. When a user initiates a transaction, the runtime calculates: pending_ud = (current_index - user_last_claimed_index) × ud_per_unit. This is O(1) per claim instead of O(N) per block.",
  },
];

export function Glossary() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="glossary" className="relative px-6 py-32 bg-white">
      <div className="relative mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D0D0D0] bg-[#f8f8f8] px-4 py-1.5">
            <BookOpen className="h-3.5 w-3.5 text-[#1b1b1b]/50" />
            <span className="text-xs font-medium text-[#1b1b1b]/50">
              Knowledge Base
            </span>
          </div>
          <h2 className="mb-4 text-[clamp(2rem,4vw,3rem)] font-normal tracking-[-0.03em] leading-[1.1] text-[#1b1b1b]">
            Glossary of <span className="gradient-text">Truth</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-[#1b1b1b]/50 md:text-lg">
            Precise definitions backed by primary sources. Understanding the
            language of money is the first step toward monetary sovereignty.
          </p>
        </motion.div>

        <div className="space-y-3">
          {glossaryEntries.map((entry, index) => (
            <motion.div
              key={entry.term}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full rounded-2xl border border-[#D0D0D0]/50 bg-white px-6 py-4 text-left transition-all hover:border-[#D0D0D0] hover:shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[#FF6B00]/60">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-base font-semibold text-[#1b1b1b]">
                      {entry.term}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 text-[#1b1b1b]/30 transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </div>
                <p className="mt-2 pl-9 text-sm leading-relaxed text-[#1b1b1b]/45">
                  {entry.definition}
                </p>
              </button>

              <AnimatePresence>
                {openIndex === index && entry.deepDive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mx-6 mt-1 rounded-b-xl border-x border-b border-[#D0D0D0]/30 bg-[#f8f8f8] px-6 py-4">
                      <p className="pl-3 text-sm leading-relaxed text-[#1b1b1b]/50 border-l-2 border-[#FF6B00]/30">
                        {entry.deepDive}
                      </p>
                      {entry.source && (
                        <a
                          href={entry.source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex items-center gap-1.5 pl-3 text-xs text-[#FF6B00]/70 hover:text-[#FF6B00] transition-colors"
                        >
                          <ExternalLink className="h-3 w-3" />
                          {entry.source.label}
                        </a>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
