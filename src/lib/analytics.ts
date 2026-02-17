type GTagEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

export function trackEvent({ action, category, label, value }: GTagEvent) {
  if (typeof window === "undefined") return;
  const w = window as typeof window & { gtag?: (...args: unknown[]) => void };
  w.gtag?.("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
}
