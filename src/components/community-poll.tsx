"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";

const OPTIONS = ["innovative", "interesting", "skeptical", "no_opinion"] as const;
type VoteOption = (typeof OPTIONS)[number];

const OPTION_COLORS: Record<VoteOption, string> = {
  innovative: "#4ade80",
  interesting: "#297FF3",
  skeptical: "#FF6B00",
  no_opinion: "#D0D0D0",
};

export function CommunityPoll() {
  const t = useTranslations("community");
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [total, setTotal] = useState(0);
  const [voted, setVoted] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchVotes = useCallback(async () => {
    try {
      const res = await fetch("/api/community/vote");
      const data = await res.json();
      setCounts(data.counts ?? {});
      setTotal(data.total ?? 0);
    } catch {
      // silent
    }
  }, []);

  useEffect(() => {
    fetchVotes();
    const stored = localStorage.getItem("uvd-community-vote");
    if (stored) setVoted(stored);
  }, [fetchVotes]);

  async function handleVote(option: VoteOption) {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/community/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ option }),
      });
      if (res.ok) {
        setVoted(option);
        localStorage.setItem("uvd-community-vote", option);
        await fetchVotes();
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }

  const showResults = voted !== null;

  return (
    <div className="rounded-2xl border border-[#D0D0D0]/50 bg-[#f8f8f8] p-6 sm:p-8">
      <h3 className="mb-2 text-lg font-medium text-[#1b1b1b]">
        {t("poll.title")}
      </h3>
      <p className="mb-6 text-sm text-[#1b1b1b]/45">
        {t("poll.subtitle")}
      </p>

      <div className="space-y-3">
        {OPTIONS.map((option) => {
          const count = counts[option] ?? 0;
          const pct = total > 0 ? Math.round((count / total) * 100) : 0;
          const isSelected = voted === option;

          return (
            <button
              key={option}
              onClick={() => handleVote(option)}
              disabled={loading}
              className={`relative w-full overflow-hidden rounded-xl border px-4 py-3 text-left transition-all ${
                isSelected
                  ? "border-[#1b1b1b] bg-white"
                  : "border-[#D0D0D0]/50 bg-white hover:border-[#D0D0D0]"
              } ${loading ? "opacity-50 cursor-wait" : "cursor-pointer"}`}
            >
              {showResults && (
                <div
                  className="absolute inset-y-0 left-0 opacity-10 transition-all duration-500"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: OPTION_COLORS[option],
                  }}
                />
              )}
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: OPTION_COLORS[option] }}
                  />
                  <span className="text-sm font-medium text-[#1b1b1b]">
                    {t(`poll.options.${option}`)}
                  </span>
                </div>
                {showResults && (
                  <span className="text-sm tabular-nums text-[#1b1b1b]/45">
                    {pct}%
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {showResults && (
        <p className="mt-4 text-center text-xs text-[#1b1b1b]/30">
          {t("poll.totalVotes", { count: total })}
        </p>
      )}
    </div>
  );
}
