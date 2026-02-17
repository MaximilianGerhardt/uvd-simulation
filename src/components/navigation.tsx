"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/language-switcher";

export function Navigation() {
  const t = useTranslations("nav");
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/simulation/time-theft" as const, label: t("timeTheft") },
    { href: "/simulation/rtm" as const, label: t("rtmModel") },
    { href: "/simulation/basket" as const, label: t("basketIndex") },
    { href: "/glossary" as const, label: t("glossary") },
    { href: "/community" as const, label: t("community") },
  ];

  return (
    <nav className="fixed top-0 inset-x-0 z-50">
      <div className="absolute inset-0 backdrop-blur-[12px] bg-white/90" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-[#D0D0D0]/50" />
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="text-base font-semibold tracking-tight text-[#1b1b1b]">
            Universe Dollar
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[#1b1b1b]/60 transition-colors hover:text-[#1b1b1b]"
            >
              {link.label}
            </Link>
          ))}
          <LanguageSwitcher />
          <a
            href="https://www.uvd.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full bg-[#1b1b1b] px-5 py-2 text-sm font-medium text-white transition-all hover:bg-[#333]"
          >
            {t("officialSite")}
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <LanguageSwitcher />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-[#1b1b1b]/60"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
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
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm text-[#1b1b1b]/60 transition-colors hover:bg-[#f8f8f8] hover:text-[#1b1b1b]"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://www.uvd.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-1.5 rounded-full bg-[#1b1b1b] px-5 py-2.5 text-sm font-medium text-white"
              >
                {t("officialSite")}
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
