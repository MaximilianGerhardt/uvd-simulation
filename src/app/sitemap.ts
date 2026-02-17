import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const BASE_URL = "https://www.uvd.trading";

const pages: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "", changeFrequency: "weekly", priority: 1.0 },
  { path: "/simulation/time-theft", changeFrequency: "monthly", priority: 0.9 },
  { path: "/simulation/rtm", changeFrequency: "monthly", priority: 0.9 },
  { path: "/simulation/basket", changeFrequency: "monthly", priority: 0.9 },
  { path: "/faq", changeFrequency: "weekly", priority: 0.9 },
  { path: "/about-uvd", changeFrequency: "monthly", priority: 0.9 },
  { path: "/glossary", changeFrequency: "monthly", priority: 0.8 },
  { path: "/community", changeFrequency: "weekly", priority: 0.9 },
  { path: "/methodology/time-theft", changeFrequency: "monthly", priority: 0.7 },
  { path: "/methodology/rtm", changeFrequency: "monthly", priority: 0.7 },
  { path: "/methodology/basket", changeFrequency: "monthly", priority: 0.7 },
  { path: "/updates", changeFrequency: "weekly", priority: 0.9 },
  { path: "/updates/uwd-reveal", changeFrequency: "monthly", priority: 0.8 },
  { path: "/legal", changeFrequency: "yearly", priority: 0.3 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
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
