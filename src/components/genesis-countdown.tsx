"use client";

import { useEffect, useState } from "react";
import { Timer, ExternalLink, Zap } from "lucide-react";

// Exact target extracted from o.day source code:
// BC (1737331200000) + uL*zm*zC (2857855 * 1000 * 12 = 34294260000)
const GENESIS_TARGET_MS = 1737331200000 + 2857855 * 1000 * 12; // 1771625460000

function formatCountdown(ms: number): string {
  if (ms <= 0) return "00:00:00";
  const totalSeconds = Math.floor(ms / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

interface GenesisCountdownProps {
  title: string;
  labelBefore: string;
  labelAfter: string;
  ctaText: string;
}

export function GenesisCountdown({ title, labelBefore, labelAfter, ctaText }: GenesisCountdownProps) {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setRemaining(Math.max(0, GENESIS_TARGET_MS - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const isLaunched = remaining !== null && remaining <= 0;
  const isMounted = remaining !== null;

  return (
    <div className="rounded-2xl border border-[#4ade80]/20 bg-[#4ade80]/5 p-6 text-center">
      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#4ade80]/10">
        {isLaunched ? (
          <Zap className="h-5 w-5 text-[#4ade80]" />
        ) : (
          <Timer className="h-5 w-5 text-[#4ade80]" />
        )}
      </div>
      <p className="mb-1 text-xs font-semibold uppercase tracking-[0.05em] text-[#4ade80]/80">
        {title}
      </p>
      {!isMounted ? (
        <p className="text-3xl font-light tracking-[-0.02em] text-[#1b1b1b] font-mono">
          --:--:--
        </p>
      ) : isLaunched ? (
        <>
          <p className="text-3xl font-light tracking-[-0.02em] text-[#4ade80] font-mono animate-pulse">
            LIVE
          </p>
          <p className="mt-2 text-xs text-[#1b1b1b]/40">
            {labelAfter}
          </p>
          <a
            href="https://o.day"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full border-2 border-[#4ade80] px-5 py-2.5 text-sm font-medium text-[#4ade80] transition-all hover:bg-[#4ade80]/10"
          >
            {ctaText}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </>
      ) : (
        <>
          <p className="text-3xl font-light tracking-[-0.02em] text-[#1b1b1b] font-mono tabular-nums">
            {formatCountdown(remaining)}
          </p>
          <p className="mt-1 text-xs text-[#1b1b1b]/40">
            {labelBefore}
          </p>
        </>
      )}
    </div>
  );
}
