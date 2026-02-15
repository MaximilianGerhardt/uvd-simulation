export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "UVD Simulation",
    url: "https://uvd.trading",
    description:
      "Independent educational companion exploring the economic model behind Universe Dollar through interactive simulations.",
    founder: {
      "@type": "Person",
      name: "Maximilian Gerhardt",
    },
    parentOrganization: {
      "@type": "Organization",
      name: "Prime Associates LLC",
      url: "https://www.p-a.llc",
      address: {
        "@type": "PostalAddress",
        streetAddress: "23160 Fashion Dr Ste 220",
        addressLocality: "Estero",
        addressRegion: "FL",
        postalCode: "33928",
        addressCountry: "US",
      },
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "UVD Simulation — Interactive Companion to Universe Dollar",
    url: "https://uvd.trading",
    description:
      "Run simulations on inflation impact, symmetric money creation, and sovereign basket pricing. Open source, fully transparent methodology.",
    inLanguage: "en",
    creator: {
      "@type": "Organization",
      name: "Prime Associates LLC",
    },
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "UVD Simulation Terminal",
    url: "https://uvd.trading",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Time-Theft Calculator — Personal inflation impact simulation",
      "RTM Live Simulator — Relative Theory of Money visualization",
      "Sovereign Basket Visualizer — Fiat vs UVD price comparison",
      "Interactive Basket Builder — Drag & drop asset composition",
      "Methodology pages — Full formula and data source transparency",
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://uvd.trading",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Time-Theft Calculator",
        item: "https://uvd.trading/simulation/time-theft",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "RTM Simulator",
        item: "https://uvd.trading/simulation/rtm",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Sovereign Basket",
        item: "https://uvd.trading/simulation/basket",
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Glossary",
        item: "https://uvd.trading/glossary",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
