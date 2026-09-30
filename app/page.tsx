import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { HeroSearchField } from "@/components/search/SearchTrigger";
import { ToolListRow } from "@/components/tools/ToolListRow";
import { ToolIcon } from "@/components/ui/ToolIcon";
import { categories } from "@/lib/tools/categories";
import { getToolsByCategory, popularTools, tools } from "@/lib/tools/registry";
import { site } from "@/lib/site";
import { jsonLdScript } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

function itemListJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${site.name} — all tools`,
    itemListElement: tools.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${site.url}/${t.slug}`,
      name: t.name,
    })),
  };
}

const Arrow = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
    className="text-faint transition-all group-hover:translate-x-0.5 group-hover:text-[var(--accent)]"
  >
    <path
      d="M3.5 8h9M9 4.5 12.5 8 9 11.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function HomePage() {
  const popular = popularTools();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(itemListJsonLd()) }}
      />

      <Container className="pb-8 pt-14 sm:pt-20">
        {/* Hero */}
        <div className="max-w-[640px]">
          <h1 className="text-[34px] font-semibold leading-[1.05] tracking-[-0.03em] text-ink sm:text-[46px]">
            Small tools.
            <br />
            <span className="text-[var(--accent)]">Big time savings.</span>
          </h1>
          <p className="mt-5 max-w-[46ch] text-[16px] leading-relaxed text-ink-soft sm:text-[17px]">
            Fast, private utilities for the things you need to get done. No
            accounts, no clutter — most tools run entirely in your browser.
          </p>
        </div>

        <div className="mt-8 max-w-[640px]">
          <HeroSearchField />
        </div>

        {/* Popular */}
        <section className="mt-14" aria-labelledby="popular-heading">
          <h2
            id="popular-heading"
            className="mb-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-faint"
          >
            Popular
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {popular.map((tool) => (
              <Link
                key={tool.slug}
                href={`/${tool.slug}`}
                className="group flex items-center gap-3.5 rounded-[var(--radius-md)] border border-border bg-surface px-4 py-3.5 outline-none transition-all hover:border-border-strong hover:shadow-[var(--shadow-sm)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[var(--radius-sm)] border border-accent-line bg-accent-tint text-[var(--accent)]">
                  <ToolIcon name={tool.icon} size={21} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[14.5px] font-medium text-ink">
                    {tool.name}
                  </span>
                  <span className="block truncate text-[13px] text-ink-soft">
                    {tool.description}
                  </span>
                </span>
                <Arrow />
              </Link>
            ))}
          </div>
        </section>

        {/* Full index by category */}
        <div className="mt-16 space-y-14">
          {categories.map((category) => {
            const list = getToolsByCategory(category.id);
            return (
              <section key={category.id} aria-labelledby={`cat-${category.id}`}>
                <div className="mb-4 flex items-baseline justify-between gap-4 border-b border-border pb-3">
                  <div>
                    <h2
                      id={`cat-${category.id}`}
                      className="text-[11px] font-semibold uppercase tracking-[0.1em] text-faint"
                    >
                      {category.title}
                    </h2>
                    <p className="mt-1.5 max-w-[52ch] text-[13.5px] text-ink-soft">
                      {category.description}
                    </p>
                  </div>
                  <Link
                    href={`/tools/${category.slug}`}
                    className="group hidden shrink-0 items-center gap-1 text-[13px] font-medium text-ink-soft transition-colors hover:text-[var(--accent)] sm:flex"
                  >
                    View all
                    <Arrow />
                  </Link>
                </div>
                <div className="grid gap-x-6 sm:grid-cols-2">
                  {list.map((tool) => (
                    <ToolListRow key={tool.slug} tool={tool} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </Container>
    </>
  );
}
