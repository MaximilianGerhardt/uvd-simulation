import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const BASE_URL = "https://www.uvd.trading";

const pages: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number; lastModified: string }[] = [
  { path: "", changeFrequency: "weekly", priority: 1.0, lastModified: "2026-02-18" },
  { path: "/simulation/time-theft", changeFrequency: "monthly", priority: 0.9, lastModified: "2026-02-18" },
  { path: "/simulation/rtm", changeFrequency: "monthly", priority: 0.9, lastModified: "2026-02-18" },
  { path: "/simulation/basket", changeFrequency: "monthly", priority: 0.9, lastModified: "2026-02-18" },
  { path: "/faq", changeFrequency: "weekly", priority: 0.9, lastModified: "2026-02-18" },
  { path: "/about-uvd", changeFrequency: "monthly", priority: 0.9, lastModified: "2026-02-15" },
  { path: "/glossary", changeFrequency: "monthly", priority: 0.8, lastModified: "2026-02-15" },
  { path: "/community", changeFrequency: "weekly", priority: 0.9, lastModified: "2026-02-18" },
  { path: "/methodology/time-theft", changeFrequency: "monthly", priority: 0.7, lastModified: "2026-02-10" },
  { path: "/methodology/rtm", changeFrequency: "monthly", priority: 0.7, lastModified: "2026-02-10" },
  { path: "/methodology/basket", changeFrequency: "monthly", priority: 0.7, lastModified: "2026-02-10" },
  { path: "/updates", changeFrequency: "weekly", priority: 0.9, lastModified: "2026-02-18" },
  { path: "/updates/uwd-reveal", changeFrequency: "monthly", priority: 0.8, lastModified: "2026-02-10" },
  { path: "/updates/entropy-network", changeFrequency: "weekly", priority: 0.9, lastModified: "2026-02-20" },
  { path: "/legal", changeFrequency: "yearly", priority: 0.3, lastModified: "2026-01-29" },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3, lastModified: "2026-01-29" },
];

function getLocalizedUrl(locale: string, path: string): string {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${BASE_URL}${prefix}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    for (const locale of routing.locales) {
      const alternates: Record<string, string> = {};
      for (const altLocale of routing.locales) {
        alternates[altLocale] = getLocalizedUrl(altLocale, page.path);
      }
      alternates["x-default"] = getLocalizedUrl(routing.defaultLocale, page.path);

      entries.push({
        url: getLocalizedUrl(locale, page.path),
        lastModified: page.lastModified,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: alternates,
        },
      });
    }
  }

  return entries;
}
