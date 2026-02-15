"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";
import { Globe } from "lucide-react";

const LOCALE_LABELS: Record<Locale, { label: string; flag: string }> = {
  en: { label: "English", flag: "🇺🇸" },
  de: { label: "Deutsch", flag: "🇩🇪" },
  ar: { label: "العربية", flag: "🇦🇪" },
  es: { label: "Español", flag: "🇪🇸" },
  fr: { label: "Français", flag: "🇫🇷" },
};

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function switchLocale(newLocale: Locale) {
    setOpen(false);
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-full border border-[#D0D0D0]/50 px-3 py-1.5 text-xs text-[#1b1b1b]/60 transition-all hover:border-[#D0D0D0] hover:text-[#1b1b1b]"
        aria-label="Switch language"
      >
        <Globe className="h-3 w-3" />
        <span>{LOCALE_LABELS[locale].flag}</span>
        <span className="hidden sm:inline">{LOCALE_LABELS[locale].label}</span>
      </button>

      {open && (
        <div className="absolute end-0 top-full z-50 mt-2 min-w-[160px] overflow-hidden rounded-xl border border-[#D0D0D0]/50 bg-white shadow-lg">
          {routing.locales.map((loc) => (
            <button
              key={loc}
              onClick={() => switchLocale(loc)}
              className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-start text-sm transition-colors hover:bg-[#f8f8f8] ${
                loc === locale
                  ? "bg-[#f8f8f8] font-medium text-[#FF6B00]"
                  : "text-[#1b1b1b]/60"
              }`}
            >
              <span>{LOCALE_LABELS[loc].flag}</span>
              <span>{LOCALE_LABELS[loc].label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
