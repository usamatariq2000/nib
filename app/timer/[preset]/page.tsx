import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Timer } from "@/components/tools/impl/Timer";
import { AdSlot } from "@/components/ads/AdSlot";
import { timerPresets, timerPresetBySlug } from "@/lib/tools/presets";
import { site } from "@/lib/site";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";
import { cn } from "@/lib/cn";

export function generateStaticParams() {
  return timerPresets.map((p) => ({ preset: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ preset: string }>;
}): Promise<Metadata> {
  const { preset } = await params;
  const p = timerPresetBySlug[preset];
  if (!p) return {};
  const title = p.title;
  const description = `A free ${p.label} timer that starts the moment the page loads. It counts down and sounds an alarm when time's up — great for ${p.uses}. Runs in your browser.`;
  const path = `/timer/${p.slug}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: `${title} — ${site.name}`,
      description,
      url: `${site.url}${path}`,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(
            `A free online ${p.label} countdown timer with an alarm.`,
          )}&kicker=${encodeURIComponent("Online Timer")}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function TimerPresetPage({
  params,
}: {
  params: Promise<{ preset: string }>;
}) {
  const { preset } = await params;
  const p = timerPresetBySlug[preset];
  if (!p) notFound();

  const trail = [
    { name: "Home", path: "/" },
    { name: "Time & Random", path: "/tools/time-tools" },
    { name: "Online Timer", path: "/timer" },
    { name: p.title, path: `/timer/${p.slug}` },
  ];

  const faqs = [
    {
      q: `How do I start the ${p.label} timer?`,
      a: `It starts automatically when the page opens. Use Pause to stop it and Reset to return it to ${p.label}. You can also change the duration with the presets or the minute and second inputs.`,
    },
    {
      q: "Will it keep running if I switch tabs?",
      a: "Yes. The timer tracks the real elapsed time rather than counting ticks, so it stays accurate even when the tab is in the background.",
    },
    {
      q: "Does it make a sound when it finishes?",
      a: "Yes, it plays an alarm at zero and the tab title changes to let you know. Make sure your device isn't muted.",
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
        <header className="mb-7 mt-5 text-center">
          <h1 className="text-[28px] font-semibold tracking-[-0.02em] text-ink sm:text-[34px]">
            {p.title}
          </h1>
          <p className="mx-auto mt-2 max-w-[52ch] text-[15px] leading-relaxed text-ink-soft">
            A free {p.label} countdown timer — perfect for {p.uses}. It starts on
            its own and rings when time is up.
          </p>
        </header>

        <Timer initialMs={p.ms} autoStart />

        <AdSlot slot={process.env.NEXT_PUBLIC_AD_SLOT_TOOL} className="mt-8" />

        {/* Cross-link mesh to every other duration */}
        <section aria-labelledby="other-timers" className="mt-12">
          <h2
            id="other-timers"
            className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-ink"
          >
            Other timers
          </h2>
          <div className="flex flex-wrap gap-2">
            {timerPresets.map((t) => (
              <Link
                key={t.slug}
                href={`/timer/${t.slug}`}
                className={cn(
                  "rounded-[var(--radius-sm)] border px-3 py-1.5 text-[13px] font-medium transition-colors",
                  t.slug === p.slug
                    ? "border-accent-line bg-accent-tint text-[var(--accent-text)]"
                    : "border-border text-ink-soft hover:border-border-strong hover:text-ink",
                )}
              >
                {t.title.replace(" Timer", "")}
              </Link>
            ))}
          </div>
          <p className="mt-4 text-[14px] text-ink-soft">
            Need something custom? Use the{" "}
            <Link href="/timer" className="font-medium text-[var(--accent-text)] hover:underline">
              full online timer
            </Link>
            , or try the{" "}
            <Link href="/stopwatch" className="font-medium text-[var(--accent-text)] hover:underline">
              stopwatch
            </Link>{" "}
            to count up instead.
          </p>
        </section>

        <section aria-labelledby="timer-faq" className="mt-12 max-w-[68ch]">
          <h2
            id="timer-faq"
            className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-ink"
          >
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
        </section>
      </Container>
    </>
  );
}
