import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PercentageCalculator } from "@/components/tools/impl/PercentageCalculator";
import { AdSlot } from "@/components/ads/AdSlot";
import {
  percentPresets,
  percentPresetBySlug,
  percentSiblings,
  percentColumn,
} from "@/lib/tools/presets";
import { fmt } from "@/lib/format";
import { site } from "@/lib/site";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";

export function generateStaticParams() {
  return percentPresets.map((p) => ({ calc: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ calc: string }>;
}): Promise<Metadata> {
  const { calc } = await params;
  const p = percentPresetBySlug[calc];
  if (!p) return {};
  const description = `${p.percent}% of ${p.value} is ${fmt(p.answer)}. See the simple formula worked out step by step, and calculate any percentage instantly with our free tool.`;
  const path = `/percentage-calculator/${p.slug}`;
  return {
    title: p.title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: `${p.title} — ${site.name}`,
      description,
      url: `${site.url}${path}`,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(p.title)}&subtitle=${encodeURIComponent(
            `${p.percent}% of ${p.value} = ${fmt(p.answer)}`,
          )}&kicker=${encodeURIComponent("Percentage Calculator")}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function PercentPresetPage({
  params,
}: {
  params: Promise<{ calc: string }>;
}) {
  const { calc } = await params;
  const p = percentPresetBySlug[calc];
  if (!p) notFound();

  const answer = fmt(p.answer);
  const decimal = p.percent / 100;
  const trail = [
    { name: "Home", path: "/" },
    { name: "Calculators", path: "/tools/calculators" },
    { name: "Percentage Calculator", path: "/percentage-calculator" },
    { name: p.title, path: `/percentage-calculator/${p.slug}` },
  ];

  const faqs = [
    {
      q: `How do you calculate ${p.percent}% of ${p.value}?`,
      a: `Convert ${p.percent}% to a decimal by dividing by 100 (${p.percent} ÷ 100 = ${decimal}), then multiply by ${p.value}: ${decimal} × ${p.value} = ${answer}.`,
    },
    {
      q: `What is ${p.percent}% as a decimal?`,
      a: `${p.percent}% written as a decimal is ${decimal}. To convert any percentage to a decimal, divide it by 100.`,
    },
    {
      q: `${answer} is what percent of ${p.value}?`,
      a: `${answer} is ${p.percent}% of ${p.value}. To check: (${answer} ÷ ${p.value}) × 100 = ${p.percent}%.`,
    },
  ];

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const sameValue = percentColumn(p.value).filter((x) => x.slug !== p.slug);
  const samePercent = percentSiblings(p.percent).filter((x) => x.slug !== p.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd(trail)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqLd) }}
      />

      <Container className="pb-10 pt-6 sm:pt-8">
        <Breadcrumbs trail={trail} />
        <header className="mt-5 max-w-[640px]">
          <h1 className="text-[28px] font-semibold tracking-[-0.02em] text-ink sm:text-[34px]">
            {p.title}
          </h1>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
            {p.percent}% of {p.value} is <strong className="font-semibold text-ink">{answer}</strong>.
            Here&apos;s the quick way to work it out, plus a calculator for any other numbers.
          </p>
        </header>

        <div className="mt-6 rounded-[var(--radius-md)] border border-accent-line bg-accent-tint px-6 py-8 text-center">
          <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-ink-soft">
            {p.percent}% of {p.value}
          </p>
          <p className="tabular mt-1 text-[44px] font-semibold leading-none tracking-[-0.02em] text-ink sm:text-[56px]">
            {answer}
          </p>
        </div>

        <section className="mt-8 max-w-[68ch]">
          <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-ink">
            How to work it out
          </h2>
          <ol className="space-y-2.5">
            <li className="flex gap-3 leading-relaxed text-ink-soft">
              <Step n={1} />
              <span>
                Turn the percentage into a decimal: {p.percent} ÷ 100 ={" "}
                <span className="tabular font-medium text-ink">{decimal}</span>.
              </span>
            </li>
            <li className="flex gap-3 leading-relaxed text-ink-soft">
              <Step n={2} />
              <span>
                Multiply by the number:{" "}
                <span className="tabular font-medium text-ink">
                  {decimal} × {p.value} = {answer}
                </span>
                .
              </span>
            </li>
            <li className="flex gap-3 leading-relaxed text-ink-soft">
              <Step n={3} />
              <span>
                So {p.percent}% of {p.value} is{" "}
                <span className="tabular font-medium text-ink">{answer}</span>.
              </span>
            </li>
          </ol>
        </section>

        <section className="mt-10">
          <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-ink">
            Try other numbers
          </h2>
          <PercentageCalculator
            initialMode="of"
            initialA={String(p.percent)}
            initialB={String(p.value)}
          />
        </section>

        <AdSlot slot={process.env.NEXT_PUBLIC_AD_SLOT_TOOL} className="mt-8" />

        {/* Internal cross-link tables */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          <LinkList
            title={`Other percentages of ${p.value}`}
            items={sameValue.map((x) => ({
              href: `/percentage-calculator/${x.slug}`,
              label: `${x.percent}% of ${x.value}`,
              value: fmt(x.answer),
            }))}
          />
          <LinkList
            title={`${p.percent}% of other amounts`}
            items={samePercent.map((x) => ({
              href: `/percentage-calculator/${x.slug}`,
              label: `${x.percent}% of ${x.value}`,
              value: fmt(x.answer),
            }))}
          />
        </div>

        <section className="mt-12 max-w-[68ch]">
          <h2 className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-ink">
            Frequently asked questions
          </h2>
          <dl className="divide-y divide-border">
            {faqs.map((f, i) => (
              <div key={i} className="py-4 first:pt-0">
                <dt className="text-[15px] font-medium text-ink">{f.q}</dt>
                <dd className="mt-1.5 leading-relaxed text-ink-soft">{f.a}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-[14px] text-ink-soft">
            Working with prices? Try the{" "}
            <Link href="/discount-calculator" className="font-medium text-[var(--accent-text)] hover:underline">
              discount calculator
            </Link>{" "}
            or the full{" "}
            <Link href="/percentage-calculator" className="font-medium text-[var(--accent-text)] hover:underline">
              percentage calculator
            </Link>
            .
          </p>
        </section>
      </Container>
    </>
  );
}

function Step({ n }: { n: number }) {
  return (
    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-surface-inset text-[11px] font-semibold text-ink">
      {n}
    </span>
  );
}

function LinkList({
  title,
  items,
}: {
  title: string;
  items: { href: string; label: string; value: string }[];
}) {
  return (
    <section>
      <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-ink">
        {title}
      </h2>
      <ul className="overflow-hidden rounded-[var(--radius-md)] border border-border">
        {items.map((it) => (
          <li key={it.href} className="border-b border-border last:border-0">
            <Link
              href={it.href}
              className="flex items-center justify-between px-4 py-2.5 text-[14px] transition-colors hover:bg-surface-inset"
            >
              <span className="text-ink-soft">{it.label}</span>
              <span className="tabular font-medium text-ink">= {it.value}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
