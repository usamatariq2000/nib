import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ToolListRow } from "@/components/tools/ToolListRow";
import { categories } from "@/lib/tools/categories";
import { getToolsByCategory, tools } from "@/lib/tools/registry";

export const metadata: Metadata = {
  title: "All Tools",
  description: `Browse all ${tools.length} free browser tools — calculators, developer utilities, text tools, timers and random generators.`,
  alternates: { canonical: "/tools" },
};

export default function ToolsIndexPage() {
  return (
    <Container className="pb-10 pt-6 sm:pt-8">
      <Breadcrumbs
        trail={[
          { name: "Home", path: "/" },
          { name: "All tools", path: "/tools" },
        ]}
      />
      <header className="mt-5 max-w-[640px]">
        <h1 className="text-[28px] font-semibold tracking-[-0.02em] text-ink sm:text-[34px]">
          All tools
        </h1>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
          {tools.length} fast, free utilities. Most run entirely in your browser
          — nothing you enter is uploaded.
        </p>
      </header>

      <div className="mt-12 space-y-14">
        {categories.map((category) => (
          <section key={category.id} aria-labelledby={`cat-${category.id}`}>
            <div className="mb-4 flex items-baseline justify-between gap-4 border-b border-border pb-3">
              <h2
                id={`cat-${category.id}`}
                className="text-[11px] font-semibold uppercase tracking-[0.1em] text-faint"
              >
                {category.title}
              </h2>
              <Link
                href={`/tools/${category.slug}`}
                className="text-[13px] font-medium text-ink-soft transition-colors hover:text-[var(--accent)]"
              >
                Open category
              </Link>
            </div>
            <div className="grid gap-x-6 sm:grid-cols-2">
              {getToolsByCategory(category.id).map((tool) => (
                <ToolListRow key={tool.slug} tool={tool} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </Container>
  );
}
