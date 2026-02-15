"use client";

import { motion } from "framer-motion";
import { ArrowDown, ExternalLink, Shield, Scale, Eye, Globe } from "lucide-react";

const pillars = [
  {
    icon: Scale,
    title: "Just",
    description: "Equal monetary creation for every human. No privilege, no Cantillon effect.",
  },
  {
    icon: Eye,
    title: "Transparent",
    description: "Open-source protocol. Every rule visible, every transaction auditable.",
  },
  {
    icon: Shield,
    title: "Protective",
    description: "Purchasing power preserved through basket-indexed stability.",
  },
  {
    icon: Globe,
    title: "Civilizational",
    description: "A fair unit of account for humanity — infrastructure, not welfare.",
  },
];

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-16 bg-white">
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#D0D0D0] bg-white px-4 py-2"
        >
          <div className="h-1.5 w-1.5 rounded-full bg-[#FF6B00] animate-pulse" />
          <span className="text-xs text-[#1b1b1b]/50">
            Economic Simulation Terminal
          </span>
          <span className="text-xs text-[#D0D0D0]">|</span>
          <a
            href="https://www.uvd.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-[#FF6B00]/70 hover:text-[#FF6B00] transition-colors"
          >
            uvd.xyz
            <ExternalLink className="h-2.5 w-2.5" />
          </a>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 text-[clamp(2.5rem,6vw,4.5rem)] font-normal leading-[1.15] tracking-[-0.035em] text-[#FF6B00]"
        >
          Money for the People
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mb-12 max-w-2xl text-base text-[#1b1b1b]/50 md:text-lg leading-relaxed"
        >
          Explore the mathematics behind symmetric money creation. This
          interactive simulation proves how equal monetary access preserves
          purchasing power across time and space.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-20 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#simulation"
            className="group flex items-center gap-2 rounded-full bg-[#1b1b1b] px-8 py-3.5 text-base font-medium text-white transition-all hover:bg-[#333]"
          >
            Launch Simulation
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>
          <a
            href="https://www.uvd.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-[#D0D0D0] px-8 py-3.5 text-base font-medium text-[#1b1b1b] transition-all hover:border-[#999]"
          >
            Visit uvd.xyz
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </motion.div>

        {/* Four Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              className="group rounded-2xl border border-[#D0D0D0]/50 bg-white px-5 py-6 text-left transition-all hover:border-[#D0D0D0] hover:shadow-sm"
            >
              <pillar.icon className="mb-3 h-5 w-5 text-[#FF6B00]/60 transition-colors group-hover:text-[#FF6B00]" />
              <h3 className="mb-1.5 text-sm font-semibold text-[#1b1b1b]">
                {pillar.title}
              </h3>
              <p className="text-xs leading-relaxed text-[#1b1b1b]/40">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown className="h-4 w-4 text-[#1b1b1b]/20" />
        </motion.div>
      </motion.div>
    </section>
  );
}
