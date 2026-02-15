"use client";

import { motion } from "framer-motion";
import { ArrowDown, ExternalLink } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-16 bg-white">
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="mb-10 inline-flex items-center gap-2 rounded-full border border-[#D0D0D0] bg-white px-4 py-2"
        >
          <div className="h-1.5 w-1.5 rounded-full bg-[#FF6B00] animate-pulse" />
          <span className="text-[clamp(0.75rem,1.2vw,0.875rem)] text-[#1b1b1b]/50">
            Interactive Companion to
          </span>
          <a
            href="https://www.uvd.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[clamp(0.75rem,1.2vw,0.875rem)] font-medium text-[#FF6B00]/80 hover:text-[#FF6B00] transition-colors"
          >
            uvd.xyz
            <ExternalLink className="h-2.5 w-2.5" />
          </a>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          className="mb-8 text-[clamp(3rem,8vw,6rem)] font-light leading-[1.05] tracking-[-0.04em] text-[#1b1b1b]"
        >
          What if money<br />
          were <span className="text-[#FF6B00]">fair</span>?
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="mx-auto mb-14 max-w-2xl text-[clamp(1.125rem,2vw,1.25rem)] text-[#1b1b1b]/45 leading-[1.6]"
        >
          This interactive pitch deck explores the economic model behind
          Universe Dollar — a protocol where monetary creation is mathematically
          equal for every participant. Run the simulations. See the proof.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#story"
            className="group flex items-center gap-2 rounded-full bg-[#1b1b1b] px-8 py-4 text-[clamp(0.9375rem,1.5vw,1.0625rem)] font-medium text-white transition-all hover:bg-[#333]"
          >
            Start the Story
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>
          <a
            href="https://www.uvd.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-[#D0D0D0] px-8 py-4 text-[clamp(0.9375rem,1.5vw,1.0625rem)] font-medium text-[#1b1b1b] transition-all hover:border-[#999]"
          >
            Official Site
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
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
