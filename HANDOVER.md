# UVD Simulation — Handover Document

> Last updated: February 15, 2026

---

## Project Overview

**UVD Simulation** is an interactive educational companion site for [Universe Dollar (UVD)](https://www.uvd.xyz). It provides inflation calculators, RTM visualizations, and a Sovereign Basket Builder — all running client-side in the browser.

- **Domain:** https://uvd.trading
- **Repository:** https://github.com/MaximilianGerhardt/uvd-simulation
- **Branch:** `main`
- **Deployment:** Vercel (auto-deploys from `main`)

---

## Tech Stack

| Layer        | Technology                                      |
| ------------ | ----------------------------------------------- |
| Framework    | Next.js 16 (App Router)                         |
| Styling      | TailwindCSS v4                                  |
| Components   | shadcn/ui, Lucide React icons                   |
| Charts       | Recharts                                        |
| Animations   | Framer Motion                                   |
| Font         | Inter (Google Fonts, locally optimized)          |
| Language     | TypeScript                                      |
| Deployment   | Vercel                                          |

---

## Accounts & Credentials

### GitHub

- **Account:** `MaximilianGerhardt`
- **Auth:** GitHub CLI (`gh auth login` — switch with `gh auth switch`)
- **Remote:** `https://github.com/MaximilianGerhardt/uvd-simulation.git`
- **Push:** `git push origin main`

> If push fails with 403, run `gh auth switch` and select `MaximilianGerhardt`.
> The account `GerhardtConsulting` does NOT have push access.

### Vercel

- Deployment is automatic on push to `main`.
- Domain `uvd.trading` is configured in Vercel project settings.

### Company Information

- **Entity:** Prime Associates LLC
- **Address:** 23160 Fashion Dr Ste 220, Estero, FL 33928, United States
- **Email:** info@p-a.llc
- **Website:** https://www.p-a.llc

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout, SEO metadata, lang="en", locale="en_US"
│   ├── page.tsx                # Homepage (Hero + Story sections + Footer)
│   ├── globals.css             # Global styles
│   ├── sitemap.ts              # Dynamic sitemap for all pages
│   ├── robots.ts               # robots.txt config
│   ├── legal/page.tsx          # US-style Legal Notice (English)
│   ├── privacy/page.tsx        # US-style Privacy Policy (English, CCPA)
│   ├── glossary/page.tsx       # Monetary theory glossary
│   ├── simulation/
│   │   ├── time-theft/page.tsx # Time-Theft Calculator page
│   │   ├── rtm/page.tsx        # RTM Simulator page
│   │   └── basket/page.tsx     # Sovereign Basket Index page
│   └── methodology/
│       ├── time-theft/page.tsx # Methodology: Time-Theft
│       ├── rtm/page.tsx        # Methodology: RTM
│       └── basket/page.tsx     # Methodology: Basket
├── components/
│   ├── navigation.tsx          # Top navigation bar
│   ├── hero.tsx                # Hero section
│   ├── story-sections.tsx      # Narrative sections between simulators
│   ├── footer.tsx              # Footer with legal links, disclaimer, LLC copyright
│   ├── cookie-consent.tsx      # Custom cookie consent banner (English, localStorage)
│   ├── structured-data.tsx     # JSON-LD: Organization, WebSite, WebApplication, Breadcrumbs
│   ├── subpage-layout.tsx      # Shared layout for subpages (back button)
│   ├── scroll-reveal.tsx       # Scroll-triggered reveal animation
│   ├── time-theft-calculator.tsx
│   ├── rtm-simulator.tsx
│   ├── basket-visualizer.tsx
│   └── glossary.tsx
├── lib/
│   └── simulation.ts           # Core simulation engine (RTM, inflation, basket pricing)
└── components/ui/              # shadcn/ui primitives
```

---

## Design System

| Token              | Value                  |
| ------------------ | ---------------------- |
| Background         | `#ffffff`              |
| Text               | `#1b1b1b`             |
| Accent (orange)    | `#FF6B00`             |
| Link blue          | `#297FF3`             |
| Border             | `#D0D0D0`             |
| Alt background     | `#f8f8f8`             |
| Pill buttons       | `#1b1b1b` bg, white text |
| Gradient lime      | `#a3e635`             |
| Gradient blue      | `#297FF3`             |
| Gradient green     | `#4ade80`             |
| Gradient cyan      | `#35C2FF`             |

Theme: **Light** — matches uvd.xyz aesthetic.

---

## SEO Status

- **All metadata in English** — titles, descriptions, keywords, OG, Twitter Cards
- `lang="en"`, `locale: "en_US"`
- JSON-LD structured data: Organization, WebSite, WebApplication, BreadcrumbList
- Canonical URLs pointing to `https://uvd.trading/...`
- `sitemap.xml` and `robots.txt` auto-generated
- **Zero German text remaining** in `src/` (verified via grep for ä/ö/ü/ß)

---

## Legal Pages

| Route      | Content                                                  |
| ---------- | -------------------------------------------------------- |
| `/legal`   | US-style Legal Notice — LLC info, no financial advice, limitation of liability, governing law (Florida, Lee County) |
| `/privacy` | US-style Privacy Policy — CCPA reference, Vercel hosting, custom cookie consent, local data processing, children's privacy, SSL/TLS |

---

## Cookie Consent

- **Custom-built** React component (no Cookiebot or third-party)
- Three categories: Necessary (always on), Preferences, Statistics
- Consent stored in `localStorage` (key: `cookie-consent`)
- Reopen via footer "Cookie Settings" link (dispatches custom DOM event)
- All text in English

---

## Common Commands

```bash
# Install dependencies
npm install

# Dev server
npm run dev

# Production build
npm run build

# Push to GitHub (triggers Vercel deploy)
git add -A && git commit -m "message" && git push origin main

# Switch GitHub account if push fails
gh auth switch
```

---

## Known Notes

- All simulations run **client-side only** — no backend, no database, no API calls for user data.
- Font (Inter) is downloaded at build time — no runtime Google Fonts requests.
- IPFS links (whitepaper/shortpaper) go through Pinata gateway.
- CSS `@custom-variant`/`@theme`/`@apply` lint warnings are **Tailwind v4 false positives** — safe to ignore.
- The `CONTEXT.md` file in `/Users/dev/UVD/` contains additional project architecture notes.
