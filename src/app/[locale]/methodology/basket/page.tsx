import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SubpageLayout } from "@/components/subpage-layout";
import { PageBreadcrumb } from "@/components/structured-data";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ExternalLink } from "lucide-react";

const BASE_URL = "https://www.uvd.trading";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const url = `${BASE_URL}${prefix}/methodology/basket`;
  const alternates: Record<string, string> = {};
  for (const loc of routing.locales) {
    const p = loc === routing.defaultLocale ? "" : `/${loc}`;
    alternates[loc] = `${BASE_URL}${p}/methodology/basket`;
  }
  return {
    title: t("methodologyBasket.title"),
    description: t("methodologyBasket.description"),
    alternates: { canonical: url, languages: alternates },
    openGraph: {
      title: t("methodologyBasket.title"),
      description: t("methodologyBasket.description"),
      url,
      siteName: "UVD Simulation",
      type: "website",
      images: [{ url: `${BASE_URL}/${locale}/og/methodology-basket`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("methodologyBasket.title"),
      description: t("methodologyBasket.description"),
      images: [`${BASE_URL}/${locale}/og/methodology-basket`],
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function BasketMethodology({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <SubpageLayout>
      <PageBreadcrumb items={[
        { name: "Sovereign Basket", path: "/simulation/basket" },
        { name: "Methodology", path: "/methodology/basket" },
      ]} />
      <article className="px-6 py-16 bg-white">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.05em] text-[#16a34a]">
              Methodology
            </p>
            <h1 className="mb-6 text-[clamp(2.5rem,5vw,4rem)] font-light tracking-[-0.04em] leading-[1.05] text-[#1b1b1b]">
              Sovereign Basket Index
            </h1>
            <p className="mb-16 text-[clamp(1.125rem,2vw,1.25rem)] leading-[1.6] text-[#1b1b1b]/45">
              The basket visualizer compares the cost of essential goods in fiat
              currency versus UVD over time. This page documents the basket
              composition, price data sources, and projection methodology.
            </p>
          </ScrollReveal>

          {/* What It Shows */}
          <ScrollReveal>
            <section className="mb-16">
              <h2 className="mb-4 text-2xl font-light tracking-[-0.02em] text-[#1b1b1b]">
                What does it show?
              </h2>
              <p className="mb-4 text-base leading-[1.8] text-[#1b1b1b]/50">
                The Sovereign Basket Index tracks a standardized set of essential
                goods — housing, energy, transport, food — across multiple countries.
                Each item is priced in both the local fiat currency (with historical
                inflation applied) and in UVD (with near-stable pricing).
              </p>
              <p className="text-base leading-[1.8] text-[#1b1b1b]/50">
                The divergence between the two lines is not hypothetical. It is the
                arithmetic result of applying each country&apos;s documented inflation
                rate to a fixed basket of goods over time. The fiat price rises
                exponentially; the UVD price stays nearly flat.
              </p>
            </section>
          </ScrollReveal>

          {/* Basket Composition */}
          <ScrollReveal>
            <section className="mb-16">
              <h2 className="mb-4 text-2xl font-light tracking-[-0.02em] text-[#1b1b1b]">
                Basket Composition
              </h2>
              <p className="mb-6 text-base leading-[1.8] text-[#1b1b1b]/50">
                Each country basket contains six essential categories. Base prices
                are calibrated to 2020 average costs from national statistics offices:
              </p>

              {/* Germany */}
              <div className="mb-6">
                <h3 className="mb-3 text-lg font-medium text-[#1b1b1b]">
                  Germany (EUR)
                </h3>
                <div className="space-y-2">
                  {[
                    { item: "50m² Rent (monthly)", price: "€750", source: "Destatis Mietenspiegel 2020" },
                    { item: "100 kWh Electricity", price: "€32", source: "BDEW Strompreisanalyse" },
                    { item: "Public Transport Pass", price: "€49", source: "Deutschlandticket reference" },
                    { item: "Basic Groceries (monthly)", price: "€250", source: "Destatis Verbraucherpreisindex" },
                    { item: "1L Milk", price: "€1.05", source: "Eurostat food prices" },
                    { item: "1kg Bread", price: "€2.80", source: "Eurostat food prices" },
                  ].map((row) => (
                    <div key={row.item} className="flex items-center justify-between rounded-xl border border-[#D0D0D0]/30 bg-[#f8f8f8] px-4 py-2.5">
                      <span className="text-sm text-[#1b1b1b]/70">{row.item}</span>
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-sm text-[#FF6B00]">{row.price}</span>
                        <span className="text-xs text-[#1b1b1b]/30">{row.source}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* US */}
              <div className="mb-6">
                <h3 className="mb-3 text-lg font-medium text-[#1b1b1b]">
                  United States (USD)
                </h3>
                <div className="space-y-2">
                  {[
                    { item: "50m² Rent (monthly)", price: "$1,200", source: "BLS CPI Housing 2020" },
                    { item: "100 kWh Electricity", price: "$14", source: "EIA Electricity Data" },
                    { item: "Public Transport Pass", price: "$75", source: "APTA transit statistics" },
                    { item: "Basic Groceries (monthly)", price: "$350", source: "USDA Food Expenditure Series" },
                    { item: "1 Gallon Milk", price: "$3.50", source: "BLS Average Food Prices" },
                    { item: "1 Loaf Bread", price: "$3.00", source: "BLS Average Food Prices" },
                  ].map((row) => (
                    <div key={row.item} className="flex items-center justify-between rounded-xl border border-[#D0D0D0]/30 bg-[#f8f8f8] px-4 py-2.5">
                      <span className="text-sm text-[#1b1b1b]/70">{row.item}</span>
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-sm text-[#FF6B00]">{row.price}</span>
                        <span className="text-xs text-[#1b1b1b]/30">{row.source}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <p className="mt-4 text-sm text-[#1b1b1b]/40">
                Nigeria (NGN) and UAE (AED) baskets follow the same methodology.
                Full basket data is available in the{" "}
                <a
                  href="https://github.com/MaximilianGerhardt/uvd-simulation/blob/main/src/lib/simulation.ts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#297FF3] hover:underline"
                >
                  source code
                </a>.
              </p>
            </section>
          </ScrollReveal>

          {/* Price Projection Formula */}
          <ScrollReveal>
            <section className="mb-16">
              <h2 className="mb-4 text-2xl font-light tracking-[-0.02em] text-[#1b1b1b]">
                Price Projection Formula
              </h2>

              <div className="mb-6 rounded-2xl border border-[#D0D0D0]/50 bg-[#f8f8f8] p-6">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.05em] text-[#1b1b1b]/30">
                  Fiat Price Projection
                </p>
                <code className="block text-lg font-mono text-[#ef4444]">
                  P_fiat(t) = P_base × (1 + r)^t
                </code>
                <div className="mt-4 space-y-2 text-sm text-[#1b1b1b]/50">
                  <p><span className="font-mono text-[#1b1b1b]">P_base</span> — Base price of the item (2020)</p>
                  <p><span className="font-mono text-[#1b1b1b]">r</span> — Country-specific average annual inflation rate</p>
                  <p><span className="font-mono text-[#1b1b1b]">t</span> — Years into the future</p>
                </div>
              </div>

              <div className="mb-6 rounded-2xl border border-[#D0D0D0]/50 bg-[#f8f8f8] p-6">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.05em] text-[#1b1b1b]/30">
                  UVD Price Projection
                </p>
                <code className="block text-lg font-mono text-[#297FF3]">
                  P_uvd(t) = P_base × (1 + 0.002)^t
                </code>
                <div className="mt-4 text-sm text-[#1b1b1b]/50">
                  <p>
                    UVD prices are projected with a 0.2% annual drift — accounting for
                    minor real economic effects (productivity changes, demand shifts)
                    that persist even under a symmetric monetary system. This is a
                    conservative modeling choice; the actual drift could be zero or
                    slightly negative.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-[#D0D0D0]/50 bg-[#f8f8f8] p-6">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.05em] text-[#1b1b1b]/30">
                  Basket Total
                </p>
                <code className="block text-lg font-mono text-[#FF6B00]">
                  Total(t) = Σ P_item(t) for all items in basket
                </code>
              </div>
            </section>
          </ScrollReveal>

          {/* Inflation Data Sources */}
          <ScrollReveal>
            <section className="mb-16">
              <h2 className="mb-4 text-2xl font-light tracking-[-0.02em] text-[#1b1b1b]">
                Inflation Data Sources
              </h2>
              <p className="mb-6 text-base leading-[1.8] text-[#1b1b1b]/50">
                Country inflation rates are historical long-term averages from
                official statistical agencies and international organizations:
              </p>
              <div className="space-y-3">
                {[
                  { label: "World Bank CPI Data (all countries)", url: "https://data.worldbank.org/indicator/FP.CPI.TOTL.ZG" },
                  { label: "Eurostat HICP (Germany, EU)", url: "https://ec.europa.eu/eurostat/web/hicp" },
                  { label: "BLS Consumer Price Index (United States)", url: "https://www.bls.gov/cpi/" },
                  { label: "FRED CPI All Urban Consumers", url: "https://fred.stlouisfed.org/series/CPIAUCSL" },
                  { label: "Destatis Verbraucherpreisindex (Germany)", url: "https://www.destatis.de/DE/Themen/Wirtschaft/Preise/Verbraucherpreisindex/_inhalt.html" },
                  { label: "EIA Electricity Data (United States)", url: "https://www.eia.gov/electricity/data.php" },
                  { label: "USDA Food Expenditure Series", url: "https://www.ers.usda.gov/data-products/food-expenditure-series/" },
                ].map((ref) => (
                  <a
                    key={ref.label}
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-xl border border-[#D0D0D0]/30 bg-white px-5 py-3 text-sm text-[#1b1b1b]/60 transition-all hover:border-[#D0D0D0] hover:text-[#1b1b1b]"
                  >
                    <span>{ref.label}</span>
                    <ExternalLink className="h-3.5 w-3.5 shrink-0 ml-3" />
                  </a>
                ))}
              </div>
            </section>
          </ScrollReveal>

          {/* Assumptions */}
          <ScrollReveal>
            <section className="mb-16">
              <h2 className="mb-4 text-2xl font-light tracking-[-0.02em] text-[#1b1b1b]">
                Assumptions &amp; Limitations
              </h2>
              <div className="space-y-4 text-base leading-[1.8] text-[#1b1b1b]/50">
                <div className="rounded-2xl border border-[#D0D0D0]/50 bg-white p-5">
                  <p className="mb-1 font-medium text-[#1b1b1b]">Uniform inflation across categories</p>
                  <p>The model applies one inflation rate to all items. In reality,
                  food, energy, and housing inflate at different rates. The model
                  captures the aggregate structural trend, not category-specific dynamics.</p>
                </div>
                <div className="rounded-2xl border border-[#D0D0D0]/50 bg-white p-5">
                  <p className="mb-1 font-medium text-[#1b1b1b]">Static basket composition</p>
                  <p>The basket does not change over time. In practice, consumption
                  patterns shift — but the purpose is to compare the same goods across
                  monetary systems, not to model evolving consumer behavior.</p>
                </div>
                <div className="rounded-2xl border border-[#D0D0D0]/50 bg-white p-5">
                  <p className="mb-1 font-medium text-[#1b1b1b]">Base year: 2020</p>
                  <p>Prices are calibrated to approximately 2020 levels using publicly
                  available data. Minor variations from actual 2020 prices do not
                  materially affect the long-term projection since the structural trend
                  (exponential fiat growth vs. near-flat UVD) dominates.</p>
                </div>
                <div className="rounded-2xl border border-[#D0D0D0]/50 bg-white p-5">
                  <p className="mb-1 font-medium text-[#1b1b1b]">UVD 0.2% drift assumption</p>
                  <p>This is a modeling choice, not a protocol guarantee. A basket-indexed
                  currency aims for near-zero real price drift, but minor fluctuations
                  from supply-demand dynamics are expected. The 0.2% represents a
                  conservative upper bound.</p>
                </div>
              </div>
            </section>
          </ScrollReveal>

          {/* Source Code */}
          <ScrollReveal>
            <section>
              <h2 className="mb-4 text-2xl font-light tracking-[-0.02em] text-[#1b1b1b]">
                Source Code
              </h2>
              <div className="rounded-2xl border border-[#D0D0D0]/50 bg-[#1b1b1b] p-6 overflow-x-auto">
                <pre className="text-sm leading-relaxed text-white/70">
                  <code>{`function simulateBasketPrice(countryCode, years = 20) {
  const basket = BASKETS[countryCode];
  const country = COUNTRY_INFLATION[countryCode];

  for (let y = 0; y <= years; y++) {
    const fiatMultiplier = (1 + country.rate) ^ y;
    const uvdMultiplier  = (1 + 0.002) ^ y;

    items = basket.items.map(item => ({
      fiatPrice: item.basePrice × fiatMultiplier,
      uvdPrice:  item.basePrice × uvdMultiplier,
    }));

    fiatTotal = sum(items.fiatPrice);
    uvdTotal  = sum(items.uvdPrice);
  }
}`}</code>
                </pre>
              </div>
              <p className="mt-4 text-sm text-[#1b1b1b]/40">
                Full source:{" "}
                <a
                  href="https://github.com/MaximilianGerhardt/uvd-simulation/blob/main/src/lib/simulation.ts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#297FF3] hover:underline"
                >
                  simulation.ts on GitHub
                </a>
              </p>
            </section>
          </ScrollReveal>
        </div>
      </article>
    </SubpageLayout>
  );
}
