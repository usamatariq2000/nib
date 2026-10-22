import type { Category, CategoryId } from "./types";

export const categories: Category[] = [
  {
    id: "calculate",
    slug: "calculators",
    nav: "Calculate",
    title: "Calculators",
    description:
      "Everyday math without the mental arithmetic — percentages, ages, ratios, discounts and dates.",
    order: 1,
  },
  {
    id: "finance",
    slug: "finance-calculators",
    nav: "Money",
    title: "Finance Calculators",
    description:
      "Plan payments and interest with confidence — mortgages, loans, savings, tips and tax, all worked out instantly.",
    order: 2,
  },
  {
    id: "develop",
    slug: "developer-tools",
    nav: "Develop",
    title: "Developer Tools",
    description:
      "Format, encode, decode and generate. Fast utilities that run in your browser, so your data stays put.",
    order: 3,
  },
  {
    id: "write",
    slug: "text-tools",
    nav: "Write",
    title: "Text Tools",
    description:
      "Count, compare, clean and convert text. Built for writers, editors and anyone working with words.",
    order: 4,
  },
  {
    id: "time",
    slug: "time-tools",
    nav: "Time",
    title: "Time & Random",
    description:
      "Timers, stopwatches and fair random generators — for focus sessions, games and decisions.",
    order: 5,
  },
];

export const categoryById: Record<CategoryId, Category> = categories.reduce(
  (acc, c) => {
    acc[c.id] = c;
    return acc;
  },
  {} as Record<CategoryId, Category>,
);

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
