import type { Metadata } from "next";
import { site } from "./site";
import { categoryById } from "./tools/categories";
import type { Category, Tool } from "./tools/types";

const ogImage = (title: string, subtitle: string, kicker: string) =>
  `/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(
    subtitle,
  )}&kicker=${encodeURIComponent(kicker)}`;

/** Root metadata applied in the layout and merged by every page. */
export const baseMetadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  keywords: [
    "free online tools",
    "browser tools",
    "calculators",
    "developer tools",
    "text tools",
    "privacy friendly tools",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    locale: site.locale,
    images: [
      {
        url: ogImage(site.tagline, site.description, site.name),
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    creator: site.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : {},
  },
  category: "technology",
};

/** Site-wide content dates for freshness signals in structured data. */
export const SITE_PUBLISHED = "2026-09-30";
export const SITE_MODIFIED = "2026-09-30";

export function toolMetadata(tool: Tool): Metadata {
  const category = categoryById[tool.category];
  const path = `/${tool.slug}`;
  return {
    title: tool.name,
    description: tool.tagline,
    keywords: [tool.name.toLowerCase(), ...tool.keywords],
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: `${tool.name} — ${site.name}`,
      description: tool.tagline,
      url: `${site.url}${path}`,
      images: [
        {
          url: ogImage(tool.name, tool.description, category.title),
          width: 1200,
          height: 630,
          alt: tool.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${tool.name} — ${site.name}`,
      description: tool.tagline,
    },
  };
}

export function categoryMetadata(category: Category): Metadata {
  const path = `/tools/${category.slug}`;
  const title = `${category.title}`;
  return {
    title,
    description: category.description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: `${category.title} — ${site.name}`,
      description: category.description,
      url: `${site.url}${path}`,
      images: [
        {
          url: ogImage(category.title, category.description, "Tools"),
          width: 1200,
          height: 630,
          alt: category.title,
        },
      ],
    },
  };
}

// ─────────────────────────── Structured data ───────────────────────────

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${site.url}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: `${site.url}/icon.svg`,
  };
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

export function toolJsonLd(tool: Tool) {
  const path = `/${tool.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    url: `${site.url}${path}`,
    description: tool.tagline,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any (web browser)",
    browserRequirements: "Requires JavaScript",
    featureList: tool.keywords,
    softwareVersion: "1.0",
    datePublished: SITE_PUBLISHED,
    dateModified: SITE_MODIFIED,
    inLanguage: "en",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    isAccessibleForFree: true,
    publisher: { "@type": "Organization", name: site.name, url: site.url },
  };
}

/** HowTo structured data built from a tool's "how to use it" steps. */
export function howToJsonLd(tool: Tool) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to use the ${tool.name}`,
    description: tool.tagline,
    step: tool.content.how.map((text, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: `Step ${i + 1}`,
      text,
    })),
    totalTime: "PT1M",
  };
}

export function faqJsonLd(tool: Tool) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tool.content.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Serialize JSON-LD safely for embedding in a <script> tag. */
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
