export function StructuredData({ locale = "en" }: { locale?: string }) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "UVD Simulation",
    url: "https://www.uvd.trading",
    logo: "https://www.uvd.trading/icon.svg",
    description:
      "Independent educational companion exploring the economic model behind Universe Dollar through interactive simulations.",
    sameAs: [
      "https://x.com/uvd99",
      "https://github.com/MaximilianGerhardt/uvd-simulation",
      "https://www.uvd.xyz",
      "https://o.day",
      "https://uwd.xyz",
    ],
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
    url: "https://www.uvd.trading",
    description:
      "Run simulations on inflation impact, symmetric money creation, and sovereign basket pricing. Open source, fully transparent methodology.",
    inLanguage: locale,
    creator: {
      "@type": "Organization",
      name: "Prime Associates LLC",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.uvd.trading/glossary?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "UVD Simulation Terminal",
    url: "https://www.uvd.trading",
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

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
    </>
  );
}

const BASE_URL = "https://www.uvd.trading";

interface ArticleSchemaProps {
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  locale: string;
  path: string;
  keywords?: string[];
}

export function ArticleSchema({
  headline,
  description,
  datePublished,
  dateModified,
  locale,
  path,
  keywords,
}: ArticleSchemaProps) {
  const url = `${BASE_URL}${locale === "en" ? "" : `/${locale}`}${path}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline,
    description,
    datePublished,
    dateModified: dateModified || datePublished,
    url,
    inLanguage: locale,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: {
      "@type": "Organization",
      name: "UVD Trading",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "UVD Trading",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/icon.svg`,
      },
    },
    isAccessibleForFree: true,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["article h1", "article > div > p:first-of-type"],
    },
    ...(keywords && keywords.length > 0 && { keywords: keywords.join(", ") }),
  };

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
    />
  );
}

export function FAQPageSchema({ items }: { items: { question: string; answer: string }[] }) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}

export function GlossarySchema({ terms }: { terms: { name: string; description: string; url?: string }[] }) {
  const glossarySchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "UVD Glossary",
    url: BASE_URL + "/glossary",
    hasDefinedTerm: terms.map((term) => ({
      "@type": "DefinedTerm",
      name: term.name,
      description: term.description,
      ...(term.url && { url: term.url }),
    })),
  };

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(glossarySchema) }}
    />
  );
}

export function ItemListSchema({ name, items }: { name: string; items: { name: string; url: string }[] }) {
  const listSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }}
    />
  );
}

export function HowToSchema({ name, description, steps }: { name: string; description: string; steps: { name: string; text: string }[] }) {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
    />
  );
}

export function PageBreadcrumb({ items }: { items: { name: string; path: string }[] }) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.name,
        item: `${BASE_URL}${item.path}`,
      })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  );
}
