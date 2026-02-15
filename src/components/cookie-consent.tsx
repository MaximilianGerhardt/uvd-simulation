"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { Cookie, X, ChevronDown, ChevronUp } from "lucide-react";

const CONSENT_KEY = "uvd_cookie_consent";
const CONSENT_VERSION = "1";

interface ConsentState {
  necessary: boolean;
  preferences: boolean;
  statistics: boolean;
  version: string;
  timestamp: string;
}

function getStoredConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

function storeConsent(consent: ConsentState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
}

export function CookieConsent() {
  const t = useTranslations("cookie");
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState(false);
  const [statistics, setStatistics] = useState(false);

  useEffect(() => {
    const stored = getStoredConsent();
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handler = () => setVisible(true);
    window.addEventListener("uvd_reopen_consent", handler);
    return () => window.removeEventListener("uvd_reopen_consent", handler);
  }, []);

  const accept = useCallback(
    (all: boolean) => {
      const consent: ConsentState = {
        necessary: true,
        preferences: all ? true : preferences,
        statistics: all ? true : statistics,
        version: CONSENT_VERSION,
        timestamp: new Date().toISOString(),
      };
      storeConsent(consent);
      setVisible(false);
    },
    [preferences, statistics]
  );

  const decline = useCallback(() => {
    const consent: ConsentState = {
      necessary: true,
      preferences: false,
      statistics: false,
      version: CONSENT_VERSION,
      timestamp: new Date().toISOString(),
    };
    storeConsent(consent);
    setVisible(false);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
        >
          <div className="mx-auto max-w-2xl rounded-2xl border border-[#D0D0D0]/50 bg-white p-5 shadow-2xl shadow-black/10">
            {/* Header */}
            <div className="mb-3 flex items-start justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <Cookie className="h-4 w-4 text-[#FF6B00]" />
                <h3 className="text-sm font-semibold text-[#1b1b1b]">
                  {t("title")}
                </h3>
              </div>
              <button
                onClick={decline}
                className="rounded-full p-1 text-[#D0D0D0] hover:text-[#1b1b1b] transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Description */}
            <p className="mb-4 text-xs leading-relaxed text-[#1b1b1b]/50">
              {t("description")}{" "}
              {t("learnMore")}{" "}
              <Link href="/privacy" className="text-[#297FF3] hover:underline">
                {t("privacyPolicy")}
              </Link>.
            </p>

            {/* Details Toggle */}
            <button
              onClick={() => setShowDetails((v) => !v)}
              className="mb-4 flex items-center gap-1.5 text-xs text-[#1b1b1b]/40 hover:text-[#1b1b1b]/60 transition-colors"
            >
              {showDetails ? (
                <ChevronUp className="h-3 w-3" />
              ) : (
                <ChevronDown className="h-3 w-3" />
              )}
              {t("showDetails")}
            </button>

            {/* Cookie Categories */}
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mb-4 overflow-hidden"
                >
                  <div className="space-y-3 rounded-xl border border-[#D0D0D0]/30 bg-[#f8f8f8] p-4">
                    {/* Necessary */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium text-[#1b1b1b]">
                          {t("necessary")}
                        </p>
                        <p className="text-[10px] text-[#1b1b1b]/40">
                          {t("necessaryDesc")}
                        </p>
                      </div>
                      <div className="rounded-full bg-[#4ade80]/20 px-2 py-0.5 text-[10px] font-medium text-[#16a34a]">
                        {t("alwaysOn")}
                      </div>
                    </div>

                    {/* Preferences */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium text-[#1b1b1b]">
                          {t("preferences")}
                        </p>
                        <p className="text-[10px] text-[#1b1b1b]/40">
                          {t("preferencesDesc")}
                        </p>
                      </div>
                      <button
                        onClick={() => setPreferences((v) => !v)}
                        className={`relative h-5 w-9 rounded-full transition-colors ${
                          preferences ? "bg-[#FF6B00]" : "bg-[#D0D0D0]"
                        }`}
                        aria-label="Toggle preferences"
                      >
                        <span
                          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                            preferences ? "left-[18px]" : "left-0.5"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Statistics */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium text-[#1b1b1b]">
                          {t("statistics")}
                        </p>
                        <p className="text-[10px] text-[#1b1b1b]/40">
                          {t("statisticsDesc")}
                        </p>
                      </div>
                      <button
                        onClick={() => setStatistics((v) => !v)}
                        className={`relative h-5 w-9 rounded-full transition-colors ${
                          statistics ? "bg-[#FF6B00]" : "bg-[#D0D0D0]"
                        }`}
                        aria-label="Toggle statistics"
                      >
                        <span
                          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                            statistics ? "left-[18px]" : "left-0.5"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Buttons */}
            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                onClick={() => accept(true)}
                className="flex-1 rounded-full bg-[#1b1b1b] px-5 py-2.5 text-xs font-medium text-white transition-colors hover:bg-[#333]"
              >
                {t("acceptAll")}
              </button>
              <button
                onClick={() => accept(false)}
                className="flex-1 rounded-full border border-[#D0D0D0] px-5 py-2.5 text-xs font-medium text-[#1b1b1b] transition-colors hover:border-[#999]"
              >
                {t("saveSelection")}
              </button>
              <button
                onClick={decline}
                className="flex-1 rounded-full px-5 py-2.5 text-xs font-medium text-[#1b1b1b]/40 transition-colors hover:text-[#1b1b1b]/60"
              >
                {t("necessaryOnly")}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function reopenCookieConsent() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CONSENT_KEY);
  window.dispatchEvent(new Event("uvd_reopen_consent"));
}
