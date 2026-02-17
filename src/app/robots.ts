import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/newsletter/confirmed", "/newsletter/unsubscribed", "/newsletter/unsubscribe", "/newsletter/settings"],
      },
    ],
    sitemap: "https://www.uvd.trading/sitemap.xml",
  };
}
