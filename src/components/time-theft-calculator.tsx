"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  TrendingDown,
  Shield,
  ChevronDown,
  Info,
} from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { calculateTimeTheft, COUNTRY_INFLATION } from "@/lib/simulation";

export function TimeTheftCalculator() {
  const [birthYear, setBirthYear] = useState(1985);
  const [country, setCountry] = useState("DE");
  const [income, setIncome] = useState(3000);
  const [hasCalculated, setHasCalculated] = useState(false);

  const result = useMemo(
    () => calculateTimeTheft(birthYear, country, income),
    [birthYear, country, income]
  );

  const countryInfo = COUNTRY_INFLATION[country];

  const handleCalculate = () => {
    setHasCalculated(true);
  };

  return (
    <section id="simulation" className="relative px-6 py-32 bg-[#f8f8f8]">
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FF6B00]/20 bg-[#FF6B00]/5 px-4 py-1.5">
            <Clock className="h-3.5 w-3.5 text-[#FF6B00]" />
            <span className="text-xs font-medium text-[#FF6B00]">
              Time-Theft Calculator
            </span>
          </div>
          <h2 className="mb-4 text-[clamp(2rem,4vw,3rem)] font-normal tracking-[-0.03em] leading-[1.1] text-[#1b1b1b]">
            How much has inflation{" "}
            <span className="text-[#FF6B00]">stolen</span> from you?
          </h2>
          <p className="mx-auto max-w-2xl text-base text-[#1b1b1b]/50 md:text-lg">
            Enter your details to discover how the current monetary system has
            eroded your purchasing power — and what symmetric money creation
            would have meant for you.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Input Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl border border-[#D0D0D0]/50 bg-white p-6 lg:col-span-2"
          >
            <h3 className="mb-6 text-lg font-semibold text-[#1b1b1b]">
              Your Parameters
            </h3>

            <div className="space-y-6">
              {/* Birth Year */}
              <div>
                <label className="mb-2 flex items-center justify-between text-sm text-[#1b1b1b]/60">
                  <span>Birth Year</span>
                  <span className="font-mono text-[#FF6B00]">{birthYear}</span>
                </label>
                <input
                  type="range"
                  min={1950}
                  max={2005}
                  value={birthYear}
                  onChange={(e) => setBirthYear(Number(e.target.value))}
                  className="w-full accent-[#FF6B00]"
                />
                <div className="mt-1 flex justify-between text-xs text-[#1b1b1b]/25">
                  <span>1950</span>
                  <span>2005</span>
                </div>
              </div>

              {/* Country */}
              <div>
                <label className="mb-2 block text-sm text-[#1b1b1b]/60">
                  Country
                </label>
                <div className="relative">
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-[#D0D0D0] bg-white px-4 py-3 pr-10 text-sm text-[#1b1b1b] outline-none transition-colors focus:border-[#FF6B00]/50"
                  >
                    {Object.entries(COUNTRY_INFLATION).map(([code, info]) => (
                      <option key={code} value={code}>
                        {info.name} ({info.currency}) — avg. {(info.rate * 100).toFixed(1)}%/yr
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1b1b1b]/30" />
                </div>
              </div>

              {/* Monthly Income */}
              <div>
                <label className="mb-2 flex items-center justify-between text-sm text-[#1b1b1b]/60">
                  <span>Monthly Income ({countryInfo.currency})</span>
                  <span className="font-mono text-[#FF6B00]">
                    {income.toLocaleString()}
                  </span>
                </label>
                <input
                  type="range"
                  min={500}
                  max={20000}
                  step={100}
                  value={income}
                  onChange={(e) => setIncome(Number(e.target.value))}
                  className="w-full accent-[#FF6B00]"
                />
                <div className="mt-1 flex justify-between text-xs text-[#1b1b1b]/25">
                  <span>500</span>
                  <span>20,000</span>
                </div>
              </div>

              <button
                onClick={handleCalculate}
                className="w-full rounded-full bg-[#1b1b1b] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#333]"
              >
                Calculate Time Theft
              </button>

              <div className="flex items-start gap-2 rounded-xl border border-[#D0D0D0]/50 bg-[#f8f8f8] p-3">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#1b1b1b]/30" />
                <p className="text-xs leading-relaxed text-[#1b1b1b]/40">
                  Based on historical average inflation rates. Actual individual
                  impact varies by spending patterns, investments, and local
                  conditions. Sources: World Bank, FRED, ECB.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Results Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6 lg:col-span-3"
          >
            {hasCalculated && result.yearsWorked > 0 ? (
              <>
                {/* Key Metrics */}
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-[#D0D0D0]/50 bg-white p-5">
                    <div className="mb-2 flex items-center gap-2">
                      <TrendingDown className="h-4 w-4 text-[#ef4444]" />
                      <span className="text-xs text-[#1b1b1b]/40">
                        Purchasing Power Lost
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-[#ef4444]">
                      {result.lossPercentage}%
                    </div>
                    <div className="mt-1 text-xs text-[#1b1b1b]/30">
                      over {result.yearsWorked} years
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[#D0D0D0]/50 bg-white p-5">
                    <div className="mb-2 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-[#FF6B00]" />
                      <span className="text-xs text-[#1b1b1b]/40">
                        Total Value Lost
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-[#FF6B00]">
                      {result.totalInflationLoss.toLocaleString()}
                    </div>
                    <div className="mt-1 text-xs text-[#1b1b1b]/30">
                      {countryInfo.currency} equivalent
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[#D0D0D0]/50 bg-white p-5">
                    <div className="mb-2 flex items-center gap-2">
                      <Shield className="h-4 w-4 text-[#297FF3]" />
                      <span className="text-xs text-[#1b1b1b]/40">
                        UVD Would Preserve
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-[#297FF3]">
                      ~{result.uvdEquivalentGain.toLocaleString()}
                    </div>
                    <div className="mt-1 text-xs text-[#1b1b1b]/30">
                      {countryInfo.currency} in purchasing power
                    </div>
                  </div>
                </div>

                {/* Chart */}
                <div className="rounded-2xl border border-[#D0D0D0]/50 bg-white p-6">
                  <h4 className="mb-1 text-sm font-semibold text-[#1b1b1b]">
                    Purchasing Power Over Time
                  </h4>
                  <p className="mb-6 text-xs text-[#1b1b1b]/40">
                    Fiat currency vs. UVD — indexed to 100 at start
                  </p>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={result.yearlyData}>
                        <defs>
                          <linearGradient
                            id="blueGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#297FF3"
                              stopOpacity={0.15}
                            />
                            <stop
                              offset="95%"
                              stopColor="#297FF3"
                              stopOpacity={0}
                            />
                          </linearGradient>
                          <linearGradient
                            id="redGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#ef4444"
                              stopOpacity={0.1}
                            />
                            <stop
                              offset="95%"
                              stopColor="#ef4444"
                              stopOpacity={0}
                            />
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
                          domain={[0, 120]}
                          tickFormatter={(v) => `${v}%`}
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
                          dataKey="uvdPurchasingPower"
                          stroke="#297FF3"
                          fill="url(#blueGradient)"
                          strokeWidth={2}
                          name="UVD Purchasing Power"
                          dot={false}
                        />
                        <Area
                          type="monotone"
                          dataKey="fiatPurchasingPower"
                          stroke="#ef4444"
                          fill="url(#redGradient)"
                          strokeWidth={2}
                          name={`${countryInfo.currency} Purchasing Power`}
                          dot={false}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex h-full min-h-[400px] items-center justify-center rounded-2xl border border-dashed border-[#D0D0D0]/50 bg-white">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#f8f8f8]">
                    <Clock className="h-7 w-7 text-[#1b1b1b]/20" />
                  </div>
                  <p className="text-sm text-[#1b1b1b]/40">
                    Adjust parameters and click
                  </p>
                  <p className="text-sm font-medium text-[#1b1b1b]/60">
                    &quot;Calculate Time Theft&quot;
                  </p>
                  <p className="mt-2 text-xs text-[#1b1b1b]/30">
                    to reveal your personal inflation impact
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
