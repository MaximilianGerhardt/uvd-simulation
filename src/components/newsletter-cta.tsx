"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Mail, Loader2, AlertCircle, Shield, Inbox } from "lucide-react";

function useNewsletterSubmit() {
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
      if (res.status === 429) { setStatus("rate_limited"); return; }
      if (!res.ok) { setStatus("error"); return; }
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return { email, setEmail, status, setStatus, handleSubmit };
}

export function NewsletterCTA({ variant = "default" }: { variant?: "default" | "footer" | "article" }) {
  const t = useTranslations("newsletterCta");
  const { email, setEmail, status, setStatus, handleSubmit } = useNewsletterSubmit();

  if (variant === "footer") {
    if (status === "success") {
      return (
        <div className="rounded-xl border border-[#FF6B00]/30 bg-[#FF6B00]/10 p-5">
          <div className="flex items-start gap-3">
            <Inbox className="mt-0.5 h-5 w-5 shrink-0 text-[#FF6B00]" />
            <div>
              <p className="text-sm font-semibold text-[#FF6B00]">{t("successTitle")}</p>
              <p className="mt-1 text-xs leading-relaxed text-white/50">{t("successReason")}</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FF6B00]/10">
              <Mail className="h-4 w-4 text-[#FF6B00]" />
            </div>
            <div>
              <p className="text-sm font-medium text-white/80">{t("footerTitle")}</p>
              <p className="text-xs text-white/30">{t("footerText")}</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (status === "error" || status === "rate_limited") setStatus("idle"); }}
              placeholder={t("placeholder")}
              required
              className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-white/25 focus:border-[#FF6B00]/30 focus:outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={status === "loading" || !email.trim()}
              className="shrink-0 rounded-full bg-[#FF6B00] px-5 py-2 text-sm font-medium text-white transition-all hover:bg-[#FF6B00]/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : t("footerButton")}
            </button>
          </form>
          {(status === "error" || status === "rate_limited") && (
            <div className="flex items-center gap-1.5 text-xs text-red-400/80">
              <AlertCircle className="h-3 w-3" />
              {status === "rate_limited" ? t("rateLimited") : t("error")}
            </div>
          )}
          <p className="text-[10px] text-white/15">{t("footerPrivacy")}</p>
        </div>
      </div>
    );
  }

  if (variant === "article") {
    if (status === "success") {
      return (
        <div className="rounded-2xl border border-[#FF6B00]/20 bg-[#FF6B00]/5 p-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#FF6B00]/15">
            <Inbox className="h-5 w-5 text-[#FF6B00]" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-[#FF6B00]">{t("successTitle")}</h3>
          <p className="mx-auto max-w-md text-sm leading-relaxed text-[#1b1b1b]/50">{t("successReason")}</p>
        </div>
      );
    }

    return (
      <div className="rounded-2xl border border-[#FF6B00]/15 bg-gradient-to-br from-[#FF6B00]/5 via-white to-[#FF6B00]/5 p-8 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#FF6B00]/10">
          <Mail className="h-5 w-5 text-[#FF6B00]" />
        </div>
        <h3 className="mb-2 text-lg font-medium text-[#1b1b1b]">{t("articleTitle")}</h3>
        <p className="mx-auto mb-5 max-w-md text-sm text-[#1b1b1b]/50">{t("articleText")}</p>
        <form onSubmit={handleSubmit} className="mx-auto flex max-w-sm gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); if (status === "error" || status === "rate_limited") setStatus("idle"); }}
            placeholder={t("placeholder")}
            required
            className="min-w-0 flex-1 rounded-full border border-[#D0D0D0]/50 bg-white px-4 py-2.5 text-sm text-[#1b1b1b] placeholder:text-[#1b1b1b]/30 focus:border-[#FF6B00]/50 focus:outline-none focus:ring-1 focus:ring-[#FF6B00]/20 transition-colors"
          />
          <button
            type="submit"
            disabled={status === "loading" || !email.trim()}
            className="shrink-0 rounded-full bg-[#1b1b1b] px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#333] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : t("articleButton")}
          </button>
        </form>
        {(status === "error" || status === "rate_limited") && (
          <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-red-500/80">
            <AlertCircle className="h-3 w-3" />
            {status === "rate_limited" ? t("rateLimited") : t("error")}
          </div>
        )}
        <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-[#1b1b1b]/25">
          <Shield className="h-3 w-3" />
          {t("homePrivacy")}
        </div>
      </div>
    );
  }

  // Default: Homepage full-width CTA
  if (status === "success") {
    return (
      <section className="border-t border-[#FF6B00]/10 bg-[#FF6B00]/[0.03] px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#FF6B00]/15">
            <Inbox className="h-6 w-6 text-[#FF6B00]" />
          </div>
          <h2 className="mb-3 text-2xl font-semibold tracking-[-0.02em] text-[#FF6B00]">{t("successTitle")}</h2>
          <p className="mx-auto max-w-lg text-base leading-relaxed text-[#1b1b1b]/50">{t("successReason")}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="border-t border-[#D0D0D0]/20 bg-[#f8f8f8] px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#FF6B00]/10">
          <Mail className="h-6 w-6 text-[#FF6B00]" />
        </div>
        <h2 className="mb-3 text-2xl font-light tracking-[-0.02em] text-[#1b1b1b]">
          {t("homeTitle")}
        </h2>
        <p className="mb-6 text-base text-[#1b1b1b]/50">
          {t("homeText")}
        </p>
        <form onSubmit={handleSubmit} className="mx-auto flex max-w-md gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); if (status === "error" || status === "rate_limited") setStatus("idle"); }}
            placeholder={t("placeholder")}
            required
            className="min-w-0 flex-1 rounded-full border border-[#D0D0D0]/50 bg-white px-5 py-3 text-sm text-[#1b1b1b] placeholder:text-[#1b1b1b]/30 focus:border-[#FF6B00]/50 focus:outline-none focus:ring-1 focus:ring-[#FF6B00]/20 transition-colors"
          />
          <button
            type="submit"
            disabled={status === "loading" || !email.trim()}
            className="shrink-0 rounded-full bg-[#1b1b1b] px-7 py-3 text-sm font-medium text-white transition-all hover:bg-[#333] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : t("homeButton")}
          </button>
        </form>
        {(status === "error" || status === "rate_limited") && (
          <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-red-500/80">
            <AlertCircle className="h-3 w-3" />
            {status === "rate_limited" ? t("rateLimited") : t("error")}
          </div>
        )}
        <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-[#1b1b1b]/25">
          <Shield className="h-3 w-3" />
          {t("homePrivacy")}
        </div>
      </div>
    </section>
  );
}
