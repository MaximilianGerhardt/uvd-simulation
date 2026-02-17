"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ScrollReveal } from "@/components/scroll-reveal";
import {
  Plus,
  X,
  Scale,
  TrendingDown,
  TrendingUp,
  Shield,
  AlertTriangle,
  Grip,
} from "lucide-react";

interface Asset {
  id: string;
  name: string;
  symbol: string;
  category: "fiat" | "commodity" | "crypto" | "real";
  color: string;
  annualInflation: number;
  volatility: number;
  example2020: string;
  example2025: string;
}

const AVAILABLE_ASSETS: Asset[] = [
  { id: "eur", name: "Euro", symbol: "EUR", category: "fiat", color: "#297FF3", annualInflation: 0.035, volatility: 0.02, example2020: "€1.00", example2025: "€0.84" },
  { id: "usd", name: "US Dollar", symbol: "USD", category: "fiat", color: "#4ade80", annualInflation: 0.038, volatility: 0.025, example2020: "$1.00", example2025: "$0.83" },
  { id: "gbp", name: "British Pound", symbol: "GBP", category: "fiat", color: "#a78bfa", annualInflation: 0.04, volatility: 0.03, example2020: "£1.00", example2025: "£0.82" },
  { id: "try", name: "Turkish Lira", symbol: "TRY", category: "fiat", color: "#ef4444", annualInflation: 0.25, volatility: 0.15, example2020: "₺1.00", example2025: "₺0.24" },
  { id: "ars", name: "Argentine Peso", symbol: "ARS", category: "fiat", color: "#f97316", annualInflation: 0.60, volatility: 0.30, example2020: "ARS 1.00", example2025: "ARS 0.01" },
  { id: "gold", name: "Gold", symbol: "XAU", category: "commodity", color: "#eab308", annualInflation: -0.06, volatility: 0.12, example2020: "$1,770/oz", example2025: "$2,650/oz" },
  { id: "oil", name: "Crude Oil", symbol: "WTI", category: "commodity", color: "#1b1b1b", annualInflation: 0.03, volatility: 0.35, example2020: "$42/bbl", example2025: "$72/bbl" },
  { id: "wheat", name: "Wheat", symbol: "WHEAT", category: "commodity", color: "#d97706", annualInflation: 0.04, volatility: 0.20, example2020: "$550/bu", example2025: "$680/bu" },
  { id: "btc", name: "Bitcoin", symbol: "BTC", category: "crypto", color: "#f7931a", annualInflation: -0.30, volatility: 0.60, example2020: "$9,200", example2025: "$97,000" },
  { id: "realestate", name: "Real Estate Index", symbol: "RE", category: "real", color: "#6366f1", annualInflation: -0.05, volatility: 0.08, example2020: "Index 100", example2025: "Index 142" },
];

interface BasketEntry {
  asset: Asset;
  weight: number;
}

function categoryLabel(cat: string) {
  switch (cat) {
    case "fiat": return "Fiat Currency";
    case "commodity": return "Commodity";
    case "crypto": return "Cryptocurrency";
    case "real": return "Real Asset";
    default: return cat;
  }
}

export function BasketBuilder() {
  const [basket, setBasket] = useState<BasketEntry[]>([
    { asset: AVAILABLE_ASSETS[0], weight: 25 },
    { asset: AVAILABLE_ASSETS[1], weight: 25 },
    { asset: AVAILABLE_ASSETS[5], weight: 30 },
    { asset: AVAILABLE_ASSETS[8], weight: 20 },
  ]);
  const [dragOver, setDragOver] = useState(false);

  const availableToAdd = AVAILABLE_ASSETS.filter(
    (a) => !basket.some((b) => b.asset.id === a.id)
  );

  const totalWeight = basket.reduce((s, b) => s + b.weight, 0);

  const addToBasket = useCallback((asset: Asset) => {
    if (basket.some((b) => b.asset.id === asset.id)) return;
    setBasket((prev) => [...prev, { asset, weight: 10 }]);
  }, [basket]);

  const removeFromBasket = useCallback((id: string) => {
    setBasket((prev) => prev.filter((b) => b.asset.id !== id));
  }, []);

  const updateWeight = useCallback((id: string, weight: number) => {
    setBasket((prev) =>
      prev.map((b) => (b.asset.id === id ? { ...b, weight } : b))
    );
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const assetId = e.dataTransfer.getData("text/plain");
      const asset = AVAILABLE_ASSETS.find((a) => a.id === assetId);
      if (asset) addToBasket(asset);
    },
    [addToBasket]
  );

  const weightedInflation =
    totalWeight > 0
      ? basket.reduce((s, b) => s + b.asset.annualInflation * (b.weight / totalWeight), 0)
      : 0;
  const weightedVolatility =
    totalWeight > 0
      ? basket.reduce((s, b) => s + b.asset.volatility * (b.weight / totalWeight), 0)
      : 0;

  const diversificationScore = Math.min(100, basket.length * 18 + (1 - weightedVolatility) * 30);
  const stabilityScore = Math.min(
    100,
    Math.max(0, 70 - Math.abs(weightedInflation) * 200 + basket.length * 8 - weightedVolatility * 80)
  );

  const fiatWeight = basket
    .filter((b) => b.asset.category === "fiat")
    .reduce((s, b) => s + b.weight, 0);
  const hardWeight = basket
    .filter((b) => b.asset.category !== "fiat")
    .reduce((s, b) => s + b.weight, 0);

  return (
    <section className="relative px-6 py-32 bg-white">
      <div className="mx-auto max-w-7xl">
        {/* Story Intro */}
        <ScrollReveal>
          <p className="mb-6 text-[clamp(0.875rem,1.2vw,1rem)] font-medium uppercase tracking-[0.05em] text-[#FF6B00]">
            The Sovereign Basket
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="mb-8 text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[1.05] tracking-[-0.04em] text-[#1b1b1b]">
            Build your own<br />
            <span className="text-[#FF6B00]">stability index.</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <p className="mb-16 max-w-2xl text-[clamp(1.125rem,2vw,1.25rem)] leading-[1.6] text-[#1b1b1b]/45">
            UVD is backed by a diversified basket of currencies, commodities, and
            real assets — not a single fiat currency. Drag assets into the basket
            to see how composition affects stability. This is how states,
            institutions, and sovereign funds can construct a monetary anchor
            that resists any single point of failure.
          </p>
        </ScrollReveal>

        {/* Interactive Area */}
        <ScrollReveal delay={0.2}>
          <div className="grid gap-6 lg:grid-cols-5">
            {/* Left: Available Assets */}
            <div className="lg:col-span-2 space-y-3">
              <h3 className="mb-4 text-sm font-semibold text-[#1b1b1b]/60">
                Available Assets — drag or tap to add
              </h3>
              {availableToAdd.length === 0 && (
                <p className="text-sm text-[#1b1b1b]/30 italic">All assets added to basket</p>
              )}
              {availableToAdd.map((asset) => (
                <motion.div
                  key={asset.id}
                  layout
                  draggable
                  onDragStart={(e) => {
                    const de = e as unknown as React.DragEvent;
                    if (de.dataTransfer) de.dataTransfer.setData("text/plain", asset.id);
                  }}
                  onClick={() => addToBasket(asset)}
                  className="group flex cursor-grab items-center gap-3 rounded-2xl border border-[#D0D0D0]/50 bg-white p-4 transition-all hover:border-[#D0D0D0] hover:shadow-sm active:cursor-grabbing"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Grip className="h-4 w-4 text-[#D0D0D0] group-hover:text-[#1b1b1b]/30" />
                  <div
                    className="h-3 w-3 rounded-full shrink-0"
                    style={{ backgroundColor: asset.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[#1b1b1b]">{asset.name}</span>
                      <span className="text-xs text-[#1b1b1b]/30">{asset.symbol}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs text-[#1b1b1b]/30">{categoryLabel(asset.category)}</span>
                      <span className={`text-xs font-mono ${asset.annualInflation > 0 ? "text-[#ef4444]" : "text-[#4ade80]"}`}>
                        {asset.annualInflation > 0 ? "+" : ""}{(asset.annualInflation * 100).toFixed(1)}%/yr
                      </span>
                    </div>
                  </div>
                  <Plus className="h-4 w-4 text-[#D0D0D0] group-hover:text-[#FF6B00] transition-colors" />
                </motion.div>
              ))}
            </div>

            {/* Right: Basket Drop Zone */}
            <div
              className="lg:col-span-3 space-y-4"
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
            >
              {/* Drop Zone Header */}
              <div
                className={`rounded-2xl border-2 border-dashed p-4 text-center transition-all ${
                  dragOver
                    ? "border-[#FF6B00] bg-[#FF6B00]/5"
                    : "border-[#D0D0D0]/50 bg-[#f8f8f8]"
                }`}
              >
                <Scale className={`mx-auto h-5 w-5 mb-1 ${dragOver ? "text-[#FF6B00]" : "text-[#1b1b1b]/20"}`} />
                <p className={`text-xs ${dragOver ? "text-[#FF6B00]" : "text-[#1b1b1b]/30"}`}>
                  {dragOver ? "Release to add to basket" : "UVD Sovereign Basket — drop assets here"}
                </p>
              </div>

              {/* Basket Contents */}
              <AnimatePresence mode="popLayout">
                {basket.map((entry) => (
                  <motion.div
                    key={entry.asset.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="rounded-2xl border border-[#D0D0D0]/50 bg-white p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="h-3 w-3 rounded-full shrink-0"
                        style={{ backgroundColor: entry.asset.color }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-[#1b1b1b]">
                            {entry.asset.name}
                          </span>
                          <span className="text-xs text-[#1b1b1b]/30">
                            {entry.asset.symbol}
                          </span>
                          <span className="text-xs text-[#1b1b1b]/20">
                            {categoryLabel(entry.asset.category)}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs text-[#1b1b1b]/30">
                            2020: {entry.asset.example2020}
                          </span>
                          <span className="text-xs text-[#1b1b1b]/30">→</span>
                          <span className="text-xs font-medium text-[#1b1b1b]/60">
                            2025: {entry.asset.example2025}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="flex items-center gap-1.5">
                          <input
                            aria-label={`Weight for ${entry.asset.name}`}
                            type="range"
                            min={1}
                            max={60}
                            value={entry.weight}
                            onChange={(e) =>
                              updateWeight(entry.asset.id, Number(e.target.value))
                            }
                            className="w-20 accent-[#FF6B00]"
                          />
                          <span className="w-10 text-right font-mono text-xs text-[#FF6B00]">
                            {entry.weight}%
                          </span>
                        </div>
                        <button
                          onClick={() => removeFromBasket(entry.asset.id)}
                          aria-label={`Remove ${entry.asset.name}`}
                          className="rounded-full p-1 text-[#D0D0D0] hover:text-[#ef4444] transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Basket Metrics */}
              {basket.length > 0 && (
                <motion.div layout className="space-y-4">
                  {/* Weight Balance Bar */}
                  <div className="rounded-2xl border border-[#D0D0D0]/50 bg-[#f8f8f8] p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-xs font-medium text-[#1b1b1b]/60">Basket Composition</span>
                      <span className="font-mono text-xs text-[#1b1b1b]/30">
                        {totalWeight}% allocated
                      </span>
                    </div>
                    <div className="mb-3 flex h-4 overflow-hidden rounded-full bg-white">
                      {basket.map((entry) => (
                        <motion.div
                          key={entry.asset.id}
                          layout
                          className="h-full"
                          style={{
                            width: `${totalWeight > 0 ? (entry.weight / totalWeight) * 100 : 0}%`,
                            backgroundColor: entry.asset.color,
                          }}
                          title={`${entry.asset.name}: ${entry.weight}%`}
                        />
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {basket.map((entry) => (
                        <div key={entry.asset.id} className="flex items-center gap-1.5">
                          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.asset.color }} />
                          <span className="text-xs text-[#1b1b1b]/60">
                            {entry.asset.symbol}{" "}
                            {totalWeight > 0 ? Math.round((entry.weight / totalWeight) * 100) : 0}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Scores */}
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-2xl border border-[#D0D0D0]/50 bg-white p-4">
                      <div className="mb-2 flex items-center gap-2">
                        {weightedInflation > 0.02 ? (
                          <TrendingDown className="h-4 w-4 text-[#ef4444]" />
                        ) : (
                          <TrendingUp className="h-4 w-4 text-[#4ade80]" />
                        )}
                        <span className="text-xs text-[#1b1b1b]/60">Net Inflation</span>
                      </div>
                      <div className={`text-xl font-bold ${weightedInflation > 0.02 ? "text-[#ef4444]" : weightedInflation < 0 ? "text-[#4ade80]" : "text-[#FF6B00]"}`}>
                        {weightedInflation > 0 ? "+" : ""}{(weightedInflation * 100).toFixed(1)}%
                      </div>
                      <div className="mt-0.5 text-xs text-[#1b1b1b]/25">weighted annual avg.</div>
                    </div>

                    <div className="rounded-2xl border border-[#D0D0D0]/50 bg-white p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-[#FF6B00]" />
                        <span className="text-xs text-[#1b1b1b]/60">Volatility</span>
                      </div>
                      <div className="text-xl font-bold text-[#1b1b1b]">
                        {(weightedVolatility * 100).toFixed(1)}%
                      </div>
                      <div className="mt-0.5 text-xs text-[#1b1b1b]/25">weighted avg.</div>
                    </div>

                    <div className="rounded-2xl border border-[#D0D0D0]/50 bg-white p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Scale className="h-4 w-4 text-[#297FF3]" />
                        <span className="text-xs text-[#1b1b1b]/60">Diversification</span>
                      </div>
                      <div className="text-xl font-bold text-[#297FF3]">
                        {Math.round(diversificationScore)}
                      </div>
                      <div className="mt-0.5 text-xs text-[#1b1b1b]/25">out of 100</div>
                    </div>

                    <div className="rounded-2xl border border-[#D0D0D0]/50 bg-white p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Shield className="h-4 w-4 text-[#4ade80]" />
                        <span className="text-xs text-[#1b1b1b]/60">Stability Score</span>
                      </div>
                      <div className={`text-xl font-bold ${stabilityScore > 60 ? "text-[#4ade80]" : stabilityScore > 35 ? "text-[#FF6B00]" : "text-[#ef4444]"}`}>
                        {Math.round(stabilityScore)}
                      </div>
                      <div className="mt-0.5 text-xs text-[#1b1b1b]/25">out of 100</div>
                    </div>
                  </div>

                  {/* Fiat vs Hard Assets Balance */}
                  <div className="rounded-2xl border border-[#D0D0D0]/50 bg-[#f8f8f8] p-5">
                    <div className="mb-3 text-xs font-medium text-[#1b1b1b]/60">
                      Fiat vs. Hard Asset Balance
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="mb-1 flex justify-between text-xs">
                          <span className="text-[#ef4444]">Fiat Currencies</span>
                          <span className="font-mono text-[#ef4444]">
                            {totalWeight > 0 ? Math.round((fiatWeight / totalWeight) * 100) : 0}%
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-white overflow-hidden">
                          <div
                            className="h-full rounded-full bg-[#ef4444]/60 transition-all"
                            style={{ width: `${totalWeight > 0 ? (fiatWeight / totalWeight) * 100 : 0}%` }}
                          />
                        </div>
                      </div>
                      <Scale className="h-5 w-5 text-[#D0D0D0] shrink-0" />
                      <div className="flex-1">
                        <div className="mb-1 flex justify-between text-xs">
                          <span className="text-[#4ade80]">Hard Assets</span>
                          <span className="font-mono text-[#4ade80]">
                            {totalWeight > 0 ? Math.round((hardWeight / totalWeight) * 100) : 0}%
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-white overflow-hidden">
                          <div
                            className="h-full rounded-full bg-[#4ade80]/60 transition-all"
                            style={{ width: `${totalWeight > 0 ? (hardWeight / totalWeight) * 100 : 0}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-[#1b1b1b]/30">
                      {fiatWeight > hardWeight
                        ? "⚠ Basket is fiat-heavy. Consider adding commodities or real assets for better inflation protection."
                        : hardWeight > fiatWeight * 3
                        ? "Strong hard-asset backing. This basket resists monetary inflation well but may have higher short-term volatility."
                        : "✓ Balanced composition. Good mix of liquidity (fiat) and inflation protection (hard assets)."}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
