/** Category ids used to group tools. */
export type CategoryId = "calculate" | "develop" | "write" | "time";

export interface Category {
  id: CategoryId;
  /** URL segment under /tools, e.g. "calculators" -> /tools/calculators */
  slug: string;
  /** Short label used in navigation. */
  nav: string;
  /** Full display title. */
  title: string;
  /** One-line description for the category page + nav. */
  description: string;
  order: number;
}

export interface Faq {
  q: string;
  a: string;
}

export interface ToolContent {
  /** "What this calculates / does" — one short paragraph. */
  what: string;
  /** "How to use it" — a few concise steps. */
  how: string[];
  /** Concrete, real examples relevant to the tool. */
  examples?: string[];
  /** SEO + genuinely useful Q&A. Also emitted as FAQPage structured data. */
  faqs: Faq[];
}

export interface Tool {
  /** Root-level URL slug, e.g. "percentage-calculator" -> /percentage-calculator */
  slug: string;
  name: string;
  /** One-line description used in lists, cards, search. */
  description: string;
  /** Longer sub-headline shown under the H1 on the tool page. */
  tagline: string;
  category: CategoryId;
  /** Search aliases + keywords (not shown, used by the command palette). */
  keywords: string[];
  /** Icon key resolved by the <ToolIcon /> component. */
  icon: string;
  /** Surface on the homepage "Popular" strip. */
  popular?: boolean;
  /** True when all processing happens client-side (drives the privacy note). */
  local?: boolean;
  /** Related tool slugs for internal linking. */
  related: string[];
  content: ToolContent;
}
