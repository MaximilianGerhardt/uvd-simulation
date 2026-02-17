---
description: Use when launching, auditing, or optimizing any web project for SEO and GEO. Triggers on new deployments, domain changes, i18n setup, analytics integration, cookie consent, structured data, or any search visibility task. Also use when preparing a site for AI search engines (Perplexity, ChatGPT Search, Google AI Overviews).
---

# SEO & GEO Complete Checklist

Comprehensive protocol for Search Engine Optimization (SEO) and Generative Engine Optimization (GEO). Covers technical SEO, on-page SEO, structured data, analytics, GDPR compliance, Vercel deployment, and AI search visibility.

---

## 1. Domain & Hosting (Vercel)

### Domain Configuration
- **Custom domain**: Add your domain in Vercel → Settings → Domains
- **Remove default Vercel domain**: Vercel → Settings → Domains → click `...` on `project.vercel.app` → Remove. This prevents duplicate content indexing
- **WWW vs non-WWW**: Choose ONE canonical version. Redirect the other with 308 (permanent). Recommended: `www.example.com` as primary
- **Redirect type**: Vercel → Settings → Domains → set redirect to **308 Permanent Redirect** (not 307 Temporary). This passes full link equity to the target

### SSL/HTTPS
- Vercel provides automatic SSL — verify with `curl -I https://www.example.com`
- Ensure ALL URLs use HTTPS (no mixed content)
- Add HSTS header: `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`

### Security Headers (next.config.ts)
Add to `headers()` in your Next.js config:
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

---

## 2. Meta Tags & HTML Head

### Essential Meta Tags per Page
Check every page has:
- `<title>` — unique, 50-60 chars, primary keyword near front
- `<meta name="description">` — unique, 150-160 chars, includes CTA/value proposition
- `<meta name="viewport" content="width=device-width, initial-scale=1">`
- `<link rel="canonical" href="...">` — self-referencing canonical on every page
- `<html lang="xx">` — correct language code per locale

### Title Formula
```
[Primary Keyword] — [Brand/Value Prop] | [Brand Name]
```
Example: `Time Theft Calculator — See Inflation's Real Cost | UVD`

### i18n / Multilingual Meta
- `<link rel="alternate" hreflang="xx" href="...">` for EVERY locale + `x-default`
- Each locale page must have ALL hreflang variants (including self)
- `x-default` should point to the default locale URL
- Hreflang must be in `<head>`, HTTP headers, OR sitemap (pick one, be consistent — sitemap recommended)

---

## 3. Open Graph & Social Sharing

### Required OG Tags
```html
<meta property="og:title" content="Page Title">
<meta property="og:description" content="Page description">
<meta property="og:image" content="https://www.example.com/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:url" content="https://www.example.com/page">
<meta property="og:type" content="website">
<meta property="og:locale" content="en_US">
<meta property="og:site_name" content="Brand Name">
```

### Twitter Card Tags
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Page Title">
<meta name="twitter:description" content="Page description">
<meta name="twitter:image" content="https://www.example.com/og.png">
```

### OG Image Best Practices
- **Size**: 1200x630px (standard), PNG or WebP
- **Per-locale images**: Create `/public/og.png` (default), `/public/og-de.png`, `/public/og-fr.png`, etc.
- **Content**: Include brand logo, page title text, visual hook — must be readable at thumbnail size
- **Screenshot approach**: Use browser screenshot tools or Playwright to auto-generate OG images from actual page content
- **Validation**: Test with [Facebook Debugger](https://developers.facebook.com/tools/debug/), [Twitter Card Validator](https://cards-dev.twitter.com/validator), [opengraph.xyz](https://www.opengraph.xyz/)
- **After deploy**: Scrape URL in Facebook Debugger to clear cache

### Next.js OG Generation (Optional)
Use `next/og` (ImageResponse) for dynamic OG images generated at build/request time. Great for pages with dynamic content.

---

## 4. Structured Data (Schema.org / JSON-LD)

### Must-Have Schemas
Inject via `<script type="application/ld+json">` in `<head>`:

| Schema | When | Required Fields |
|--------|------|-----------------|
| **Organization** | Every site | name, url, logo, sameAs (socials) |
| **WebSite** | Homepage | name, url, potentialAction (SearchAction) |
| **WebApplication** | If SaaS/Tool | name, url, applicationCategory, operatingSystem |
| **BreadcrumbList** | All subpages | itemListElement with position, name, item |
| **FAQPage** | FAQ pages | mainEntity with Question + acceptedAnswer |
| **Article** | Blog/Updates | headline, datePublished, dateModified, author, image |
| **HowTo** | Tutorial pages | name, step[] with name + text |

### Validation
- Test with [Google Rich Results Test](https://search.google.com/test/rich-results)
- Test with [Schema.org Validator](https://validator.schema.org/)
- Check Google Search Console → Enhancements for errors

### Common Mistakes
- Missing `@context: "https://schema.org"`
- Using wrong `@type` for the content
- Breadcrumb not matching actual URL structure
- FAQ schema on pages that aren't actually FAQ format
- Forgetting `inLanguage` for multilingual sites

---

## 5. Sitemap (sitemap.xml)

### Requirements
- List ALL indexable pages (not noindexed, not redirected)
- Include `<lastmod>` with real dates (not hardcoded)
- Include `<changefreq>` and `<priority>` (signals, not commands)
- For multilingual: include `xhtml:link rel="alternate"` with ALL hreflang variants per URL

### Priority Guidelines
```
1.0  — Homepage
0.9  — Core pages (product, features, pricing)
0.8  — Secondary pages (blog index, about)
0.7  — Individual blog posts, documentation
0.5  — Archive pages
0.3  — Legal, privacy, terms
```

### What NOT to include
- `/api/*` routes
- `/admin` pages
- Authentication pages (login, register)
- Newsletter confirmation/unsubscribe pages
- Query parameter variations
- Paginated pages (use `rel=next/prev` instead)

### Submission
- Submit sitemap URL in Google Search Console → Sitemaps
- Reference sitemap in robots.txt: `Sitemap: https://www.example.com/sitemap.xml`

---

## 6. robots.txt

### Template
```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin
Disallow: /newsletter/confirmed
Disallow: /newsletter/unsubscribed
Disallow: /newsletter/settings

Sitemap: https://www.example.com/sitemap.xml
```

### Rules
- NEVER block CSS/JS files (Google needs them to render)
- NEVER block `/public/` or image assets
- Block all API endpoints
- Block admin/internal areas
- Block user-specific pages (settings, confirm pages)
- Test with Google Search Console → robots.txt Tester
- Verify with `curl https://www.example.com/robots.txt`

---

## 7. Google Search Console (GSC)

### Setup Checklist
1. **Add property**: Use "URL prefix" method with `https://www.` version
2. **Verify ownership**: DNS TXT record (most reliable) or HTML file upload
3. **Submit sitemap**: Sitemaps → Add → `https://www.example.com/sitemap.xml`
4. **Request indexing**: URL Inspection → Enter homepage URL → Request Indexing
5. **Set target country** (if applicable): Legacy → International Targeting

### Regular Monitoring
- **Coverage**: Check for errors (5xx, 404, redirects, excluded pages)
- **Enhancements**: Rich results, structured data errors
- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Mobile Usability**: All pages must pass
- **Links**: Monitor internal/external link profile
- **Index Coverage**: Ensure key pages are indexed, not just crawled

### When Pages Aren't Indexed
1. Check `robots.txt` isn't blocking
2. Check page doesn't have `noindex`
3. Check canonical points to self (not another page)
4. Check page is in sitemap
5. Check page has at least one internal link
6. Request indexing via URL Inspection tool
7. If multilingual: verify hreflang is correct (wrong hreflang = Google ignores all)

### Accelerating Indexing

#### Automated Post-Build Notifications (runs after every build)
A `postbuild` script runs after `npm run build` (including Vercel deploys):
```
scripts/ping-sitemap.mjs:
  1. Warms sitemap in CDN cache (fetches sitemap.xml so crawlers get fast response)
  2. Sends IndexNow notification to Bing/Yandex for instant crawl trigger
```
**Note:** Google deprecated their `/ping` endpoint in 2023. Google discovers sitemaps via `robots.txt` and GSC submission only. There is no public Google ping API.

#### Manual URL Inspection (GSC)
For immediate indexing of specific pages:
1. Open [Google Search Console](https://search.google.com/search-console)
2. URL Inspection → paste URL → "Request Indexing"
3. Limit: ~10 requests per day
4. Priority pages to submit first:
   - Homepage (all locales)
   - Core feature pages (simulation, calculator)
   - Blog/article pages
   - Glossary/FAQ pages

#### Google Indexing API (Advanced)
Only works for `JobPosting` and `BroadcastEvent` structured data. NOT for general pages.
For general pages, use the URL Inspection approach above.

#### Bing URL Submission API
Bing offers a more open URL submission API:
1. Register at [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Get API key from Settings → API Access
3. POST to `https://ssl.bing.com/webmaster/api.svc/json/SubmitUrl`
4. Quota: 10,000 URLs/day (much more generous than Google)

#### IndexNow Protocol
Supported by Bing, Yandex, and others (NOT Google):
```
GET https://www.bing.com/indexnow?url=https://www.uvd.trading/page&key=YOUR_KEY
```
- Drop a key file at `/.well-known/indexnow-key.txt`
- Ping on every content change
- Instant notification to all supporting engines

#### Tips for New Sites
- **First 2-4 weeks**: Google may index slowly — this is normal for new domains
- **Internal linking**: Every page should be reachable within 3 clicks from homepage
- **External backlinks**: Even 1-2 quality backlinks dramatically speed up crawling
- **Social signals**: Share URLs on Twitter/LinkedIn — crawlers follow social links
- **Google Business Profile**: If applicable, link your site there
- **Sitemap in robots.txt**: Ensures crawlers find sitemap even without GSC

---

## 8. Google Analytics 4 (GA4)

### Setup
1. Create GA4 property at [analytics.google.com](https://analytics.google.com)
2. Choose correct **industry category** (affects benchmarks)
3. Get Measurement ID (`G-XXXXXXXXXX`)
4. Implement via `gtag.js` (NOT via `<GoogleAnalytics>` component if GDPR required)

### Integration with GDPR (Critical)
GA4 MUST use **Google Consent Mode v2**:
```javascript
// Initialize BEFORE loading gtag.js
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  functionality_storage: 'denied',
  personalization_storage: 'denied',
  security_storage: 'granted',
  wait_for_update: 500,
});
```
- Load `gtag.js` script AFTER consent defaults are set
- On user consent: call `gtag('consent', 'update', { analytics_storage: 'granted' })`
- On user decline: keep everything `'denied'`
- Restore previous consent from localStorage on return visits

### Custom Events
Track meaningful interactions:
```javascript
gtag('event', 'event_name', {
  event_category: 'category',
  event_label: 'label',
  value: 1,
});
```
Examples: `newsletter_signup`, `ai_chat_open`, `simulation_run`, `pdf_download`

### GA4 Dashboard Setup
- Mark key events as **Conversions** (Admin → Events → toggle "Mark as key event")
- Set up **Internal Traffic Filter** (Admin → Data Streams → Configure → Internal Traffic → add your IP)
- **Link with GSC**: Admin → Product Links → Search Console → Link
- Enable **Enhanced Measurement** (scrolls, outbound clicks, site search, file downloads)

---

## 9. GDPR / DSGVO Compliance

### Cookie Consent Requirements (EU Law)
- **No tracking before consent**: GA4, Facebook Pixel, etc. must NOT fire before explicit opt-in
- **Granular categories**: Users must be able to choose between:
  - Necessary (always on — session, CSRF, locale)
  - Preferences / Functional (theme, language preferences)
  - Statistics / Analytics (GA4, Hotjar)
  - Marketing (Facebook Pixel, Google Ads — if used)
- **Decline must be as easy as accept**: Same number of clicks
- **No pre-checked boxes**: All optional categories must default to OFF
- **Revokable**: User must be able to change consent at any time (e.g., footer link)
- **Consent logging**: Store timestamp + version of consent for audit trail

### Implementation Options
| Solution | Complexity | Cost |
|----------|-----------|------|
| **Custom component** | Medium | Free |
| **Cookiebot** | Low | Free up to 100 pages, then paid |
| **Osano** | Low | Free tier available |
| **cookie-consent-banner (npm)** | Low | Free |

### Google Consent Mode v2 (Required since March 2024)
Google requires Consent Mode v2 for any EU traffic. Without it:
- GA4 data for EU users will be incomplete
- Google Ads remarketing won't work for EU users
- Consent Mode allows "cookieless pings" even when denied (anonymous, no cookies)

### Technical Implementation Pattern
```
1. Page loads → Initialize Consent Mode with ALL denied
2. Load gtag.js → GA4 script present but dormant
3. Show cookie banner → User makes choice
4. User accepts → gtag('consent', 'update', { analytics_storage: 'granted' })
5. User declines → Everything stays 'denied', no cookies set
6. Return visit → Read consent from localStorage, apply immediately
```

### Privacy Page Requirements
- List ALL cookies used (name, purpose, duration, provider)
- Explain data processing purposes
- Name the data processor (Google LLC for GA4)
- Link to Google's privacy policy
- Explain user rights (access, deletion, objection)
- Provide contact for data protection inquiries

---

## 10. GEO — Generative Engine Optimization

### What is GEO?
Optimization for AI-powered search engines: Google AI Overviews, Perplexity, ChatGPT Search, Bing Copilot. These engines cite sources differently than traditional search.

### GEO Ranking Factors
AI search engines prefer sources that are:
- **Authoritative**: Clear expertise signals, structured data, cited sources
- **Directly answerable**: Content that directly answers questions (not buried in fluff)
- **Well-structured**: Headers, lists, tables — easy for AI to parse and extract
- **Unique**: Original data, research, calculators, tools (not rephrased commodity content)
- **Fresh**: Recently updated content with visible dates

### GEO Content Patterns

**FAQ Format** — AI engines love Q&A:
```html
<h2>What is [Topic]?</h2>
<p>[Direct, concise answer in 1-2 sentences.]</p>
<p>[Supporting detail with data/source.]</p>
```

**Definition Blocks** — Get cited in AI definitions:
```html
<p><strong>[Term]</strong> is [concise definition]. It [key differentiator].</p>
```

**Data Tables** — AI engines extract and cite tabular data:
```html
<table>
  <thead><tr><th>Metric</th><th>Value</th><th>Source</th></tr></thead>
  <tbody>...</tbody>
</table>
```

**Comparison Content** — High citation potential:
```
## [A] vs [B]: Key Differences
| Feature | A | B |
|---------|---|---|
```

### GEO Technical Requirements
- **Structured data** (Schema.org) — helps AI engines understand content type
- **Clean HTML** — semantic tags (`<article>`, `<section>`, `<nav>`, `<main>`)
- **Fast load** — AI crawlers have strict timeout budgets
- **No JS-only content** — AI crawlers often don't execute JavaScript. Critical content must be in SSR/SSG HTML
- **Author attribution** — `<meta name="author">` and structured data `author` field
- **Publication dates** — `<time datetime="...">` and structured data `datePublished`/`dateModified`

### GEO Monitoring
- **Google Search Console**: Check "Search appearance" for AI Overview appearances
- **Perplexity**: Search your brand/topics, check if you're cited
- **Track branded queries**: If AI engines mention your brand, users search for it directly

---

## 11. Performance & Core Web Vitals

### Targets
- **LCP** (Largest Contentful Paint): < 2.5 seconds
- **INP** (Interaction to Next Paint): < 200 milliseconds
- **CLS** (Cumulative Layout Shift): < 0.1

### Quick Wins
- Lazy-load below-the-fold images: `loading="lazy"`
- Preload critical fonts: `<link rel="preload" as="font">`
- Use `next/image` for automatic optimization
- Dynamic imports for heavy components: `next/dynamic`
- Minimize JavaScript bundle — tree-shake unused code
- Use `font-display: swap` for web fonts
- Serve images in WebP/AVIF format

### Testing Tools
- [PageSpeed Insights](https://pagespeed.web.dev/) — field + lab data
- [web.dev/measure](https://web.dev/measure/) — Lighthouse audit
- Chrome DevTools → Performance tab
- Google Search Console → Core Web Vitals report

---

## 12. Pre-Launch / Audit Checklist

Run this checklist for every new deployment or major update:

### Technical
- [ ] All pages return 200 (no broken links, no redirect chains)
- [ ] robots.txt is correct and accessible
- [ ] sitemap.xml is valid and submitted to GSC
- [ ] SSL certificate is valid and no mixed content
- [ ] Security headers are set
- [ ] Default Vercel domain removed or redirected
- [ ] WWW/non-WWW redirect is 308 permanent
- [ ] No `noindex` on pages that should be indexed
- [ ] Admin/internal areas excluded from indexing

### On-Page SEO
- [ ] Every page has unique `<title>` (50-60 chars)
- [ ] Every page has unique `<meta description>` (150-160 chars)
- [ ] Every page has self-referencing canonical
- [ ] H1 tag on every page (exactly one per page)
- [ ] Image alt texts are descriptive (not keyword-stuffed)
- [ ] Internal linking between related pages

### Multilingual (if applicable)
- [ ] Hreflang tags for ALL locale combinations + x-default
- [ ] Sitemap includes hreflang alternates
- [ ] `<html lang="xx">` matches page content
- [ ] Content is properly translated (not machine-translated without review)

### Structured Data
- [ ] Organization schema on homepage
- [ ] BreadcrumbList on subpages
- [ ] FAQ schema on FAQ pages
- [ ] No validation errors in Rich Results Test

### Open Graph
- [ ] OG image exists for each page/locale (1200x630)
- [ ] OG tags validated in Facebook Debugger
- [ ] Twitter Card tags present

### Analytics & GDPR
- [ ] Cookie consent banner shows on first visit
- [ ] GA4 does NOT fire before consent
- [ ] Consent Mode v2 defaults are set to "denied"
- [ ] Declining cookies is equally easy as accepting
- [ ] Consent is stored and restored on return visits
- [ ] Privacy page lists all cookies and data processing
- [ ] GA4 linked with Google Search Console
- [ ] Internal traffic filter set in GA4
- [ ] Key events marked as conversions

### GEO
- [ ] Critical content is SSR/SSG (not client-only JS)
- [ ] Content uses semantic HTML (`<article>`, `<section>`, `<main>`)
- [ ] FAQ content uses Q&A format with clear headings
- [ ] Data/statistics presented in structured format (tables, lists)
- [ ] Author and dates visible in content and structured data
