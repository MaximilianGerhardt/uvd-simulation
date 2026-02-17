"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Sparkles } from "lucide-react";

export function LatestUpdate() {
  const t = useTranslations("latestUpdate");

  return (
    <section className="px-6 py-6">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/updates/uwd-reveal"
          className="group flex items-center gap-4 rounded-2xl border border-[#FF6B00]/15 bg-gradient-to-r from-[#FF6B00]/5 via-white to-[#297FF3]/5 px-5 py-4 transition-all hover:border-[#FF6B00]/30 hover:shadow-sm sm:px-6"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FF6B00]/10">
            <Sparkles className="h-4 w-4 text-[#FF6B00]" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-0.5 flex items-center gap-2">
              <span className="rounded-full bg-[#FF6B00] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                {t("tag")}
              </span>
              <span className="text-xs text-[#1b1b1b]/30">
                {t("date")}
              </span>
            </div>
            <p className="truncate text-sm font-medium text-[#1b1b1b]">
              {t("title")}
            </p>
          </div>
          <ArrowRight className="h-4 w-4 shrink-0 text-[#FF6B00]/50 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
