"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { Activity, Users, Percent, Calendar, Info, Code2 } from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { simulateRTM } from "@/lib/simulation";

export function RTMSimulator() {
  const t = useTranslations("rtmSim");
  const [members, setMembers] = useState(10000);
  const [growthRate, setGrowthRate] = useState(10);
  const [years, setYears] = useState(40);

  const data = useMemo(
    () =>
      simulateRTM({
        members,
        growthRate: growthRate / 100,
        years,
        initialMoneySupply: members * 1000,
      }),
    [members, growthRate, years]
  );

  const latestData = data[data.length - 1];

  return (
    <section id="rtm-model" className="relative px-6 py-32 bg-white">
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#297FF3]/20 bg-[#297FF3]/5 px-4 py-1.5">
            <Activity className="h-3.5 w-3.5 text-[#297FF3]" />
            <span className="text-xs font-medium text-[#297FF3]">
              {t("badge")}
            </span>
          </div>
          <h2 className="mb-4 text-[clamp(2.5rem,5vw,4rem)] font-light tracking-[-0.04em] leading-[1.05] text-[#1b1b1b]">
            {t("title")}<span className="gradient-text">{t("titleHighlight")}</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-[#1b1b1b]/50 md:text-lg">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Parameter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 grid gap-6 sm:grid-cols-3"
        >
          <div className="rounded-2xl border border-[#D0D0D0]/50 bg-white p-5">
            <div className="mb-3 flex items-center gap-2">
              <Users className="h-4 w-4 text-[#FF6B00]" />
              <span className="text-sm text-[#1b1b1b]/60">{t("members")}</span>
            </div>
            <div className="mb-2 text-right font-mono text-lg font-bold text-[#1b1b1b]">
              {members.toLocaleString()}
            </div>
            <input
              type="range"
              min={100}
              max={1000000}
              step={100}
              value={members}
              onChange={(e) => setMembers(Number(e.target.value))}
              className="w-full accent-[#FF6B00]"
            />
            <div className="mt-1 flex justify-between text-xs text-[#1b1b1b]/25">
              <span>100</span>
              <span>1,000,000</span>
            </div>
          </div>

          <div className="rounded-2xl border border-[#D0D0D0]/50 bg-white p-5">
            <div className="mb-3 flex items-center gap-2">
              <Percent className="h-4 w-4 text-[#297FF3]" />
              <span className="text-sm text-[#1b1b1b]/60">
                {t("growthRate")}
              </span>
            </div>
            <div className="mb-2 text-right font-mono text-lg font-bold text-[#1b1b1b]">
              {growthRate}%
            </div>
            <input
              type="range"
              min={1}
              max={20}
              step={0.5}
              value={growthRate}
              onChange={(e) => setGrowthRate(Number(e.target.value))}
              className="w-full accent-[#297FF3]"
            />
            <div className="mt-1 flex justify-between text-xs text-[#1b1b1b]/25">
              <span>1%</span>
              <span>20%</span>
            </div>
          </div>

          <div className="rounded-2xl border border-[#D0D0D0]/50 bg-white p-5">
            <div className="mb-3 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[#4ade80]" />
              <span className="text-sm text-[#1b1b1b]/60">
                {t("simPeriod")}
              </span>
            </div>
            <div className="mb-2 text-right font-mono text-lg font-bold text-[#1b1b1b]">
              {years}
            </div>
            <input
              type="range"
              min={5}
              max={80}
              step={1}
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full accent-[#4ade80]"
            />
            <div className="mt-1 flex justify-between text-xs text-[#1b1b1b]/25">
              <span>5 {t("yrs")}</span>
              <span>80 {t("yrs")} ({t("lifetime")})</span>
            </div>
          </div>
        </motion.div>

        {/* Formula Display */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8 flex items-center justify-center"
        >
          <div className="inline-flex items-center gap-4 rounded-full border border-[#D0D0D0]/50 bg-[#f8f8f8] px-6 py-3">
            <span className="text-xs text-[#1b1b1b]/40">{t("formulaLabel")}</span>
            <code className="font-mono text-sm text-[#FF6B00]">
              UD(t+1) = UD(t) + c&sup2; &times; (M(t) / N(t+1))
            </code>
          </div>
        </motion.div>

        {/* Charts Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Money Supply Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-2xl border border-[#D0D0D0]/50 bg-white p-6"
          >
            <h4 className="mb-1 text-sm font-semibold text-[#1b1b1b]">
              {t("moneySupplyTitle")}
            </h4>
            <p className="mb-6 text-xs text-[#1b1b1b]/40">
              {t("moneySupplyDesc")}
            </p>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient
                      id="supplyGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#FF6B00"
                        stopOpacity={0.15}
                      />
                      <stop
                        offset="95%"
                        stopColor="#FF6B00"
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
                    label={{
                      value: "Year",
                      position: "insideBottomRight",
                      offset: -5,
                      style: { fontSize: 10, fill: "rgba(27,27,27,0.3)" },
                    }}
                  />
                  <YAxis
                    stroke="rgba(0,0,0,0.1)"
                    tick={{ fontSize: 11, fill: "rgba(27,27,27,0.4)" }}
                    tickFormatter={(v) =>
                      v >= 1e9
                        ? `${(v / 1e9).toFixed(1)}B`
                        : v >= 1e6
                        ? `${(v / 1e6).toFixed(1)}M`
                        : v >= 1e3
                        ? `${(v / 1e3).toFixed(0)}K`
                        : v.toString()
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
                    formatter={(value: number | undefined) => [
                      (value ?? 0).toLocaleString(),
                      t("moneySupplyTooltip"),
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="moneySupply"
                    stroke="#FF6B00"
                    fill="url(#supplyGradient)"
                    strokeWidth={2}
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* UD Per Person Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="rounded-2xl border border-[#D0D0D0]/50 bg-white p-6"
          >
            <h4 className="mb-1 text-sm font-semibold text-[#1b1b1b]">
              {t("udPerPersonTitle")}
            </h4>
            <p className="mb-6 text-xs text-[#1b1b1b]/40">
              {t("udPerPersonDesc")}
            </p>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient
                      id="udGradient"
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
                    formatter={(value: number | undefined) => [
                      (value ?? 0).toLocaleString(),
                      t("udPerPersonTooltip"),
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="udPerPerson"
                    stroke="#297FF3"
                    fill="url(#udGradient)"
                    strokeWidth={2}
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Key Insight Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 rounded-2xl border border-[#D0D0D0]/50 bg-[#f8f8f8] p-6"
        >
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#FF6B00]" />
            <div>
              <h4 className="mb-2 text-sm font-semibold text-[#1b1b1b]">
                {t("keyInsightTitle")}
              </h4>
              <p className="text-sm leading-relaxed text-[#1b1b1b]/50">
                {t("keyInsightP1")}<span className="text-[#FF6B00]">{t("cantillonEffect")}</span>{t("keyInsightP2")}<span className="font-mono text-[#1b1b1b]">{years} {t("yrs")}</span>{t("keyInsightP3")}<span className="font-mono text-[#FF6B00]">{latestData.cumulativeUdPerPerson.toLocaleString()}</span>{t("keyInsightP4")}<span className="text-[#1b1b1b]">{t("temporalSymmetry")}</span>.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="mt-6 flex justify-center">
          <Link
            href="/methodology/rtm"
            className="inline-flex items-center gap-2 rounded-full border border-[#D0D0D0]/50 px-5 py-2.5 text-xs text-[#1b1b1b]/50 transition-all hover:border-[#D0D0D0] hover:text-[#1b1b1b]/70"
          >
            <Code2 className="h-3.5 w-3.5" />
            {t("methodology")}
          </Link>
        </div>
      </div>
    </section>
  );
}
