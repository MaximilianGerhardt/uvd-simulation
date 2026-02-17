"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { SubpageLayout } from "@/components/subpage-layout";
import { Mail, Loader2, MessageSquare } from "lucide-react";

const REASONS = ["too_frequent", "not_relevant", "never_subscribed", "other"] as const;

export default function NewsletterUnsubscribePage() {
  const t = useTranslations("newsletterUnsubscribe");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [reason, setReason] = useState<string>("");
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const handleUnsubscribe = async () => {
    if (!token || status === "loading") return;
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, reason, feedback: feedback.trim() || undefined }),
      });

      if (!res.ok) {
        setStatus("error");
        return;
      }

      const prefix = locale === "en" ? "" : `/${locale}`;
      router.push(`${prefix}/newsletter/unsubscribed?status=success`);
    } catch {
      setStatus("error");
    }
  };

  if (!token) {
    return (
      <SubpageLayout>
        <div className="mx-auto max-w-xl px-6 py-24 text-center">
          <h1 className="mb-3 text-3xl font-light tracking-[-0.02em] text-[#1b1b1b]">{t("errorTitle")}</h1>
          <p className="text-base text-[#1b1b1b]/50">{t("errorText")}</p>
        </div>
      </SubpageLayout>
    );
  }

  return (
    <SubpageLayout>
      <div className="mx-auto max-w-lg px-6 py-24">
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#1b1b1b]/5">
            <Mail className="h-8 w-8 text-[#1b1b1b]/30" />
          </div>
          <h1 className="mb-3 text-3xl font-light tracking-[-0.02em] text-[#1b1b1b]">
            {t("title")}
          </h1>
          <p className="mb-10 text-base text-[#1b1b1b]/50">
            {t("subtitle")}
          </p>
        </div>

        {/* Reason selection */}
        <div className="mb-6 space-y-3">
          <p className="text-sm font-medium text-[#1b1b1b]/70">{t("reasonLabel")}</p>
          {REASONS.map((r) => (
            <label
              key={r}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors ${
                reason === r
                  ? "border-[#FF6B00]/30 bg-[#FF6B00]/5"
                  : "border-[#D0D0D0]/50 bg-white hover:border-[#D0D0D0]"
              }`}
            >
              <input
                type="radio"
                name="reason"
                value={r}
                checked={reason === r}
                onChange={(e) => setReason(e.target.value)}
                className="accent-[#FF6B00]"
              />
              <span className="text-sm text-[#1b1b1b]/70">{t(`reason_${r}`)}</span>
            </label>
          ))}
        </div>

        {/* Optional feedback */}
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-[#1b1b1b]/30" />
            <p className="text-sm font-medium text-[#1b1b1b]/70">{t("feedbackLabel")}</p>
          </div>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder={t("feedbackPlaceholder")}
            rows={3}
            className="w-full resize-none rounded-xl border border-[#D0D0D0]/50 bg-white px-4 py-3 text-sm text-[#1b1b1b] placeholder:text-[#1b1b1b]/25 focus:border-[#FF6B00]/50 focus:outline-none focus:ring-1 focus:ring-[#FF6B00]/20 transition-colors"
          />
        </div>

        {status === "error" && (
          <p className="mb-4 text-center text-sm text-red-500">{t("error")}</p>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={handleUnsubscribe}
            disabled={status === "loading"}
            className="rounded-full bg-[#1b1b1b] px-8 py-3 text-sm font-medium text-white transition-all hover:bg-[#333] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "loading" ? (
              <Loader2 className="mx-auto h-4 w-4 animate-spin" />
            ) : (
              t("confirmButton")
            )}
          </button>
          <button
            onClick={() => router.back()}
            className="rounded-full border border-[#D0D0D0] px-8 py-3 text-sm font-medium text-[#1b1b1b]/60 transition-all hover:border-[#999]"
          >
            {t("cancelButton")}
          </button>
        </div>

        <p className="mt-8 text-center text-xs text-[#1b1b1b]/25">
          {t("privacyNote")}
        </p>
      </div>
    </SubpageLayout>
  );
}
