const GA_ID = "G-5ZLEQ8LZY0";
const CONSENT_KEY = "uvd_cookie_consent";

type GTagEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

type GTagFn = (...args: unknown[]) => void;

declare global {
  // eslint-disable-next-line no-var
  var dataLayer: unknown[];
  interface Window {
    gtag: GTagFn;
  }
}

/**
 * Initialize Google Consent Mode v2 with all consent denied by default.
 * Must run before gtag.js loads so Google sees the default state.
 */
export function initConsentMode() {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };

  // Default: everything denied (GDPR-safe)
  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    functionality_storage: "denied",
    personalization_storage: "denied",
    security_storage: "granted", // always needed
    wait_for_update: 500, // wait 500ms for consent update before firing
  });

  // Check if user already gave consent in a previous session
  const stored = getStoredConsent();
  if (stored) {
    applyConsent(stored.statistics, stored.preferences);
  }
}

/**
 * Load the GA4 gtag.js script. Only call after initConsentMode().
 */
export function loadGA4Script() {
  if (typeof window === "undefined") return;
  if (document.querySelector(`script[src*="googletagmanager.com/gtag"]`)) return;

  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.async = true;
  document.head.appendChild(script);

  window.gtag("js", new Date());
  window.gtag("config", GA_ID, {
    send_page_view: true,
  });
}

/**
 * Update Google Consent Mode based on user's cookie choices.
 */
export function applyConsent(statistics: boolean, preferences: boolean) {
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("consent", "update", {
    analytics_storage: statistics ? "granted" : "denied",
    ad_storage: "denied", // we don't use ads
    ad_user_data: "denied",
    ad_personalization: "denied",
    functionality_storage: preferences ? "granted" : "denied",
    personalization_storage: preferences ? "granted" : "denied",
  });
}

/**
 * Track a custom event. Respects consent — events are queued by gtag
 * and only processed if analytics_storage is granted.
 */
export function trackEvent({ action, category, label, value }: GTagEvent) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
}

function getStoredConsent(): { statistics: boolean; preferences: boolean } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return { statistics: !!parsed.statistics, preferences: !!parsed.preferences };
  } catch {
    return null;
  }
}
