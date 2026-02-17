#!/usr/bin/env node

/**
 * Notify search engines about updated content after each build/deploy.
 * Run via: node scripts/ping-sitemap.mjs
 * Or automatically via: npm run postbuild
 *
 * Google: Deprecated the /ping endpoint in 2023. Indexing is driven by
 *         sitemap.xml in robots.txt + GSC submission. We fetch our own
 *         sitemap to ensure it's warm in CDN cache for crawlers.
 * Bing:   Supports IndexNow protocol for instant crawl notification.
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.uvd.trading";
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

async function ping() {
  console.log(`\n🔔 Post-build: notifying search engines\n`);

  // 1. Warm the sitemap in CDN cache so crawlers get a fast response
  try {
    const res = await fetch(SITEMAP_URL);
    if (res.ok) {
      const body = await res.text();
      const urlCount = (body.match(/<loc>/g) || []).length;
      console.log(`  ✅ Sitemap warmed — ${urlCount} URLs in ${SITEMAP_URL}`);
    } else {
      console.log(`  ⚠️  Sitemap fetch returned ${res.status}`);
    }
  } catch (err) {
    console.log(`  ❌ Sitemap fetch failed: ${err.message}`);
  }

  // 2. Bing IndexNow — notify about homepage (Bing crawls sitemap from there)
  try {
    const indexNowUrl = `https://api.indexnow.org/indexnow?url=${encodeURIComponent(SITE_URL)}&key=ca17dd5917fd129ed611768f605d56ed&keyLocation=${encodeURIComponent(SITE_URL + "/ca17dd5917fd129ed611768f605d56ed.txt")}`;
    const res = await fetch(indexNowUrl);
    if (res.ok || res.status === 202) {
      console.log(`  ✅ IndexNow (Bing/Yandex) — notified (${res.status})`);
    } else {
      console.log(`  ⚠️  IndexNow — responded with ${res.status} (key file may be needed)`);
    }
  } catch (err) {
    console.log(`  ❌ IndexNow failed: ${err.message}`);
  }

  console.log(`\n  ℹ️  Google: sitemap discovery via robots.txt + GSC. No ping API available.`);
  console.log(`  ℹ️  Tip: Manually request indexing in GSC → URL Inspection for new pages.\n`);
}

ping();
