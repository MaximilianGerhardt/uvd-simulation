"use client";

import { useState } from "react";
import { Menu, X, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/simulation/time-theft", label: "Time-Theft" },
  { href: "/simulation/rtm", label: "RTM Model" },
  { href: "/simulation/basket", label: "Basket Index" },
  { href: "/glossary", label: "Glossary" },
];

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 backdrop-blur-[12px] bg-white/90" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-[#D0D0D0]/50" />
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#" className="flex items-center gap-2.5">
          <span className="text-base font-semibold tracking-tight text-[#1b1b1b]">
            Universe Dollar
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[#1b1b1b]/50 transition-colors hover:text-[#1b1b1b]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://www.uvd.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full bg-[#1b1b1b] px-5 py-2 text-sm font-medium text-white transition-all hover:bg-[#333]"
          >
            uvd.xyz
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-[#1b1b1b]/60 md:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="relative border-t border-[#D0D0D0]/50 bg-white/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm text-[#1b1b1b]/60 transition-colors hover:bg-[#f8f8f8] hover:text-[#1b1b1b]"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://www.uvd.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-1.5 rounded-full bg-[#1b1b1b] px-5 py-2.5 text-sm font-medium text-white"
              >
                uvd.xyz
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
