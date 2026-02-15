"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ShoppingBasket, ArrowUpRight, ArrowDownRight, Code2 } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import { simulateBasketPrice, BASKETS, COUNTRY_INFLATION } from "@/lib/simulation";

export function BasketVisualizer() {
  const [selectedCountry, setSelectedCountry] = useState("DE");
  const [years, setYears] = useState(20);

  const data = useMemo(
    () => simulateBasketPrice(selectedCountry, years),
    [selectedCountry, years]
  );

  const basket = BASKETS[selectedCountry];
  const country = COUNTRY_INFLATION[selectedCountry];
  const lastYear = data[data.length - 1];
  const firstYear = data[0];
  const fiatIncrease = ((lastYear.fiatTotal / firstYear.fiatTotal - 1) * 100).toFixed(1);
  const uvdIncrease = ((lastYear.uvdTotal / firstYear.uvdTotal - 1) * 100).toFixed(1);

  return (
    <section id="basket" className="relative px-6 py-32 bg-[#f8f8f8]">
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#4ade80]/20 bg-[#4ade80]/5 px-4 py-1.5">
            <ShoppingBasket className="h-3.5 w-3.5 text-[#4ade80]" />
            <span className="text-xs font-medium text-[#16a34a]">
              Sovereign Basket Index
            </span>
          </div>
          <h2 className="mb-4 text-[clamp(2.5rem,5vw,4rem)] font-light tracking-[-0.04em] leading-[1.05] text-[#1b1b1b]">
            The <span className="text-[#FF6B00]">Inflation Reveal</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-[#1b1b1b]/50 md:text-lg">
            Same goods, two price tags. Watch how fiat inflation erodes the cost
            of living while UVD maintains stable purchasing power through
            basket-indexed measurement.
          </p>
        </motion.div>

        {/* Country Selector */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
          {Object.entries(BASKETS).map(([code, b]) => (
            <button
              key={code}
              onClick={() => setSelectedCountry(code)}
              className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all ${
                selectedCountry === code
                  ? "border-[#FF6B00]/40 bg-[#FF6B00]/10 text-[#FF6B00]"
                  : "border-[#D0D0D0]/50 bg-white text-[#1b1b1b]/40 hover:text-[#1b1b1b]/60 hover:border-[#D0D0D0]"
              }`}
            >
              {b.country}
            </button>
          ))}
        </div>

        {/* Year Slider */}
        <div className="mb-8 flex items-center justify-center gap-4">
          <span className="text-sm text-[#1b1b1b]/40">Projection:</span>
          <input
            type="range"
            min={5}
            max={40}
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-48 accent-[#FF6B00]"
          />
          <span className="font-mono text-sm text-[#FF6B00]">{years} years</span>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Basket Items */}
          <motion.div
            key={selectedCountry}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-[#D0D0D0]/50 bg-white p-6"
          >
            <h4 className="mb-1 text-sm font-semibold text-[#1b1b1b]">
              Basket: {basket.country}
            </h4>
            <p className="mb-5 text-xs text-[#1b1b1b]/40">
              Monthly cost of living index — {basket.currency}
            </p>

            <div className="space-y-3">
              {lastYear.items.map((item, i) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between rounded-xl border border-[#D0D0D0]/30 bg-[#f8f8f8] px-4 py-3"
                >
                  <div>
                    <div className="text-sm text-[#1b1b1b]/80">{item.name}</div>
                    <div className="text-xs text-[#1b1b1b]/30">
                      Base: {basket.items[i].basePrice.toLocaleString()}{" "}
                      {basket.currency}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm text-[#ef4444]">
                      <ArrowUpRight className="h-3 w-3" />
                      {item.fiatPrice.toLocaleString()}
                    </div>
                    <div className="flex items-center justify-end gap-1 text-xs text-[#297FF3]">
                      <ArrowDownRight className="h-3 w-3" />
                      {item.uvdPrice.toLocaleString()} UVD
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-[#D0D0D0]/30 bg-[#f8f8f8] p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#1b1b1b]/60">
                  Total after {years} years
                </span>
              </div>
              <div className="mt-2 flex justify-between">
                <div>
                  <div className="text-lg font-bold text-[#ef4444]">
                    {lastYear.fiatTotal.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}{" "}
                    <span className="text-xs font-normal">{basket.currency}</span>
                  </div>
                  <div className="text-xs text-[#ef4444]/60">
                    +{fiatIncrease}% inflation
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-[#297FF3]">
                    {lastYear.uvdTotal.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}{" "}
                    <span className="text-xs font-normal">UVD</span>
                  </div>
                  <div className="text-xs text-[#297FF3]/60">
                    +{uvdIncrease}% stable
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Chart */}
          <div className="rounded-2xl border border-[#D0D0D0]/50 bg-white p-6 lg:col-span-2">
            <div className="mb-1 flex items-center justify-between">
              <h4 className="text-sm font-semibold text-[#1b1b1b]">
                Basket Price Comparison
              </h4>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-[#ef4444]" />
                  <span className="text-xs text-[#1b1b1b]/40">{basket.currency}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-[#297FF3]" />
                  <span className="text-xs text-[#1b1b1b]/40">UVD</span>
                </div>
              </div>
            </div>
            <p className="mb-6 text-xs text-[#1b1b1b]/40">
              Total monthly basket cost — {country.name} ({(country.rate * 100).toFixed(1)}% avg. inflation)
            </p>

            <div className="h-[380px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="basketFiat" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="basketUvd" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#297FF3" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#297FF3" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(0,0,0,0.05)"
                  />
                  <XAxis
                    dataKey="year"
                    stroke="rgba(0,0,0,0.1)"
                    tick={{ fontSize: 11, fill: "rgba(27,27,27,0.4)" }}
                  />
                  <YAxis
                    stroke="rgba(0,0,0,0.1)"
                    tick={{ fontSize: 11, fill: "rgba(27,27,27,0.4)" }}
                    tickFormatter={(v) =>
                      v >= 1e6
                        ? `${(v / 1e6).toFixed(1)}M`
                        : v >= 1e3
                        ? `${(v / 1e3).toFixed(1)}K`
                        : v.toFixed(0)
                    }
                  />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #D0D0D0",
                      borderRadius: "12px",
                      fontSize: "12px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    }}
                    labelStyle={{ color: "rgba(27,27,27,0.5)" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="fiatTotal"
                    stroke="#ef4444"
                    fill="url(#basketFiat)"
                    strokeWidth={2}
                    name={`${basket.currency} Total`}
                    dot={false}
                  />
                  <Area
                    type="monotone"
                    dataKey="uvdTotal"
                    stroke="#297FF3"
                    fill="url(#basketUvd)"
                    strokeWidth={2}
                    name="UVD Total"
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Link
            href="/methodology/basket"
            className="inline-flex items-center gap-2 rounded-full border border-[#D0D0D0]/50 px-5 py-2.5 text-xs text-[#1b1b1b]/50 transition-all hover:border-[#D0D0D0] hover:text-[#1b1b1b]/70"
          >
            <Code2 className="h-3.5 w-3.5" />
            View basket composition &amp; inflation data sources
          </Link>
        </div>
      </div>
    </section>
  );
}
