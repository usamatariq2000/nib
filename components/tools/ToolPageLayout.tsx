import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ToolListRow } from "./ToolListRow";
import { AdSlot } from "@/components/ads/AdSlot";
import { ToolIcon } from "@/components/ui/ToolIcon";
import { getTool, relatedTools, getToolsByCategory } from "@/lib/tools/registry";
import { categoryById } from "@/lib/tools/categories";
import {
  breadcrumbJsonLd,
  toolJsonLd,
  faqJsonLd,
  howToJsonLd,
  jsonLdScript,
} from "@/lib/seo";

const ShieldIcon = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M8 1.8 13 3.4v4.1c0 3-2 5.4-5 6.7-3-1.3-5-3.7-5-6.7V3.4L8 1.8Z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
    <path d="m6 8 1.6 1.6L10.5 6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * Shared shell for every tool page. Given a slug and the interactive
 * workspace, it renders breadcrumbs, the heading, the tool, SEO content and
 * related links — all driven by the registry, so a new tool needs almost no
 * page code.
 */
export function ToolPageLayout({
  slug,
  children,
  presetSection,
}: {
  slug: string;
  children: ReactNode;
  /** Optional links block (e.g. popular presets) shown just below the tool. */
  presetSection?: ReactNode;
}) {
  const tool = getTool(slug);
  if (!tool) return null;
  const category = categoryById[tool.category];
  const related = relatedTools(slug);
  const siblings = getToolsByCategory(tool.category).filter((t) => t.slug !== slug);

  const trail = [
    { name: "Home", path: "/" },
    { name: category.title, path: `/tools/${category.slug}` },
    { name: tool.name, path: `/${tool.slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd(trail)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(toolJsonLd(tool)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd(tool)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(howToJsonLd(tool)) }}
      />

      <Container className="pb-10 pt-6 sm:pt-8">
        <Breadcrumbs trail={trail} />

        <header className="mt-5 flex items-start gap-4">
          <span className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-[var(--radius-md)] border border-accent-line bg-accent-tint text-[var(--accent)]">
            <ToolIcon name={tool.icon} size={24} />
          </span>
          <div className="min-w-0">
            <div className="mb-1.5 flex flex-wrap items-center gap-2">
              <Link
                href={`/tools/${category.slug}`}
                className="text-[11.5px] font-semibold uppercase tracking-[0.08em] text-[var(--accent-text)] transition-opacity hover:opacity-80"
              >
                {category.title}
              </Link>
              {tool.local ? (
                <span className="inline-flex items-center gap-1 text-[11.5px] font-medium text-ink-soft">
                  <ShieldIcon />
                  Runs in your browser
                </span>
              ) : null}
            </div>
            <h1 className="text-[26px] font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-[30px]">
              {tool.name}
            </h1>
            <p className="mt-2 max-w-[62ch] text-[15px] leading-relaxed text-ink-soft">
              {tool.tagline}
            </p>
          </div>
        </header>

        {/* The tool itself */}
        <section aria-label={`${tool.name} tool`} className="mt-7">
          {children}
        </section>

        {presetSection ? <div className="mt-10">{presetSection}</div> : null}

        <AdSlot slot={process.env.NEXT_PUBLIC_AD_SLOT_TOOL} className="mt-8" />

        {/* SEO / help content */}
        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-14">
          <div className="max-w-[68ch] space-y-10">
            <ContentSection title="What this does">
              <p className="leading-relaxed text-ink-soft">{tool.content.what}</p>
            </ContentSection>

            <ContentSection title="How to use it">
              <ol className="space-y-2.5">
                {tool.content.how.map((step, i) => (
                  <li key={i} className="flex gap-3 leading-relaxed text-ink-soft">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-surface-inset text-[11px] font-semibold text-ink">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </ContentSection>

            {tool.content.examples && tool.content.examples.length > 0 ? (
              <ContentSection title="Examples">
                <ul className="space-y-2">
                  {tool.content.examples.map((ex, i) => (
                    <li
                      key={i}
                      className="rounded-[var(--radius-sm)] border border-border bg-surface px-3.5 py-2.5 font-mono text-[13px] text-ink"
                    >
                      {ex}
                    </li>
                  ))}
                </ul>
              </ContentSection>
            ) : null}

            <ContentSection title="Frequently asked questions">
              <dl className="divide-y divide-border">
                {tool.content.faqs.map((f, i) => (
                  <div key={i} className="py-4 first:pt-0">
                    <dt className="text-[15px] font-medium text-ink">{f.q}</dt>
                    <dd className="mt-1.5 leading-relaxed text-ink-soft">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </ContentSection>
          </div>

          {/* Related tools rail */}
          {related.length > 0 ? (
            <aside aria-label="Related tools" className="lg:pt-1">
              <h2 className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-faint">
                Related tools
              </h2>
              <div className="rounded-[var(--radius-lg)] border border-border bg-surface-inset/50 p-1">
                {related.map((t) => (
                  <ToolListRow key={t.slug} tool={t} stacked />
                ))}
              </div>
            </aside>
          ) : null}
        </div>

        {/* Full category cross-links — spreads crawl depth + topical clustering */}
        {siblings.length > 0 ? (
          <section aria-labelledby="more-in-cat" className="mt-14 border-t border-border pt-8">
            <div className="mb-4 flex items-baseline justify-between gap-4">
              <h2
                id="more-in-cat"
                className="text-[13px] font-semibold uppercase tracking-[0.08em] text-ink"
              >
                More {category.title.toLowerCase()}
              </h2>
              <Link
                href={`/tools/${category.slug}`}
                className="text-[13px] font-medium text-ink-soft transition-colors hover:text-[var(--accent-text)]"
              >
                View all
              </Link>
            </div>
            <div className="grid gap-x-6 sm:grid-cols-2">
              {siblings.map((t) => (
                <ToolListRow key={t.slug} tool={t} />
              ))}
            </div>
          </section>
        ) : null}
      </Container>
    </>
  );
}

function ContentSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-ink">
        {title}
      </h2>
      {children}
    </section>
  );
}
