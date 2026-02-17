"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Mail, Check, Loader2, AlertCircle } from "lucide-react";

export function NewsletterSignup() {
  const t = useTranslations("newsletter");
  const locale = useLocale();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "rate_limited">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || status === "loading") return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), locale }),
      });

      if (res.status === 429) {
        setStatus("rate_limited");
        return;
      }

      if (!res.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-[#FF6B00]/15 bg-gradient-to-b from-[#FF6B00]/5 to-white p-6 text-center">
        <Mail className="mx-auto mb-3 h-8 w-8 text-[#FF6B00]" />
        <p className="text-sm font-medium text-[#1b1b1b]">{t("successTitle")}</p>
        <p className="mt-1 text-xs text-[#1b1b1b]/50">{t("successText")}</p>
        <p className="mt-3 text-[10px] text-[#1b1b1b]/25">{t("checkSpam")}</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#FF6B00]/15 bg-gradient-to-b from-[#FF6B00]/5 to-white p-6">
      <div className="mb-4 flex items-center gap-2">
        <Mail className="h-5 w-5 text-[#FF6B00]" />
        <h3 className="text-base font-medium text-[#1b1b1b]">{t("title")}</h3>
      </div>
      <p className="mb-5 text-sm leading-relaxed text-[#1b1b1b]/50">
        {t("description")}
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error" || status === "rate_limited") setStatus("idle");
          }}
          placeholder={t("placeholder")}
          required
          className="min-w-0 flex-1 rounded-full border border-[#D0D0D0]/50 bg-white px-4 py-2.5 text-sm text-[#1b1b1b] placeholder:text-[#1b1b1b]/30 focus:border-[#FF6B00]/50 focus:outline-none focus:ring-1 focus:ring-[#FF6B00]/20 transition-colors"
        />
        <button
          type="submit"
          disabled={status === "loading" || !email.trim()}
          className="shrink-0 rounded-full bg-[#1b1b1b] px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#333] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            t("subscribe")
          )}
        </button>
      </form>
      {(status === "error" || status === "rate_limited") && (
        <div className="mt-3 flex items-center gap-1.5 text-xs text-red-500/80">
          <AlertCircle className="h-3 w-3" />
          {status === "rate_limited" ? t("rateLimited") : t("error")}
        </div>
      )}
      <p className="mt-3 text-[10px] text-[#1b1b1b]/25">
        {t("privacy")}
      </p>
    </div>
  );
}
