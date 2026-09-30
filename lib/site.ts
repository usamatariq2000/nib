/**
 * Global site configuration. One source of truth for brand + SEO defaults.
 * Override the production URL with NEXT_PUBLIC_SITE_URL at build time.
 */
export const site = {
  name: "Nib",
  /** Used in titles: "<Tool> — Nib". */
  tagline: "Small tools. Big time savings.",
  description:
    "Fast, private, free browser tools for the everyday things you need to get done. No accounts, no clutter — most tools run entirely on your device.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://nibtools.com").replace(
    /\/$/,
    "",
  ),
  locale: "en_US",
  twitter: "@nibtools",
  /** AdSense publisher id — kept here so ads.txt + the loader agree. */
  adsensePublisherId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "",
} as const;

export type Site = typeof site;
