"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import { SubpageLayout } from "@/components/subpage-layout";
import { Globe, Check, Loader2, AlertCircle } from "lucide-react";

const LOCALES = [
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
  { code: "ar", label: "العربية" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
];

export default function NewsletterSettingsPage() {
  const t = useTranslations("newsletterSettings");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const langParam = searchParams.get("lang");

  const [currentLocale, setCurrentLocale] = useState<string>("");
  const [maskedEmail, setMaskedEmail] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!token) { setLoading(false); return; }

    // If lang param provided, auto-switch language
    if (langParam && ["en", "de", "ar", "es", "fr"].includes(langParam)) {
      fetch("/api/newsletter/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, locale: langParam }),
      }).then(async (res) => {
        if (res.ok) {
          setCurrentLocale(langParam);
          setSaved(true);
          setTimeout(() => setSaved(false), 3000);
        }
      });
    }

    fetch(`/api/newsletter/settings?token=${token}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.locale) {
          setCurrentLocale(langParam || data.locale);
          setMaskedEmail(data.email || "");
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [token, langParam]);

  const handleSave = async (newLocale: string) => {
    if (!token || saving) return;
    setSaving(true);
    setSaved(false);

    try {
      const res = await fetch("/api/newsletter/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, locale: newLocale }),
      });

      if (res.ok) {
        setCurrentLocale(newLocale);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch {
      // silent fail
    } finally {
      setSaving(false);
    }
  };

  if (!token) {
    return (
      <SubpageLayout>
        <div className="mx-auto max-w-xl px-6 py-24 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
          <h1 className="mb-3 text-3xl font-light tracking-[-0.02em] text-[#1b1b1b]">{t("errorTitle")}</h1>
          <p className="text-base text-[#1b1b1b]/50">{t("errorText")}</p>
        </div>
      </SubpageLayout>
    );
  }

  if (loading) {
    return (
      <SubpageLayout>
        <div className="flex items-center justify-center py-32">
          <Loader2 className="h-8 w-8 animate-spin text-[#1b1b1b]/20" />
        </div>
      </SubpageLayout>
    );
  }

  if (error) {
    return (
      <SubpageLayout>
        <div className="mx-auto max-w-xl px-6 py-24 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
          <h1 className="mb-3 text-3xl font-light tracking-[-0.02em] text-[#1b1b1b]">{t("invalidTitle")}</h1>
          <p className="text-base text-[#1b1b1b]/50">{t("invalidText")}</p>
        </div>
      </SubpageLayout>
    );
  }

  return (
    <SubpageLayout>
      <div className="mx-auto max-w-lg px-6 py-24">
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#FF6B00]/10">
            <Globe className="h-8 w-8 text-[#FF6B00]" />
          </div>
          <h1 className="mb-3 text-3xl font-light tracking-[-0.02em] text-[#1b1b1b]">
            {t("title")}
          </h1>
          {maskedEmail && (
            <p className="mb-2 text-sm text-[#1b1b1b]/40">{maskedEmail}</p>
          )}
          <p className="mb-10 text-base text-[#1b1b1b]/50">
            {t("subtitle")}
          </p>
        </div>

        {saved && (
          <div className="mb-6 flex items-center justify-center gap-2 rounded-xl bg-green-500/5 border border-green-500/15 p-3">
            <Check className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-700">{t("saved")}</span>
          </div>
        )}

        {/* Language selection */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-[#1b1b1b]/70">{t("languageLabel")}</p>
          {LOCALES.map((loc) => (
            <button
              key={loc.code}
              onClick={() => handleSave(loc.code)}
              disabled={saving}
              className={`flex w-full items-center justify-between rounded-xl border p-4 transition-all ${
                currentLocale === loc.code
                  ? "border-[#FF6B00]/30 bg-[#FF6B00]/5"
                  : "border-[#D0D0D0]/50 bg-white hover:border-[#D0D0D0]"
              } ${saving ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            >
              <span className="text-sm font-medium text-[#1b1b1b]/70">{loc.label}</span>
              {currentLocale === loc.code && (
                <Check className="h-4 w-4 text-[#FF6B00]" />
              )}
            </button>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-[#1b1b1b]/25">
          {t("note")}
        </p>
      </div>
    </SubpageLayout>
  );
}
