import type { Metadata } from "next";
import Link from "next/link";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools/registry";
import { Timer } from "@/components/tools/impl/Timer";
import { timerPresets } from "@/lib/tools/presets";

const slug = "timer";
export const metadata: Metadata = toolMetadata(getTool(slug)!);

function PopularDurations() {
  return (
    <section aria-labelledby="popular-durations">
      <h2
        id="popular-durations"
        className="mb-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-ink"
      >
        Popular durations
      </h2>
      <div className="flex flex-wrap gap-2">
        {timerPresets.map((p) => (
          <Link
            key={p.slug}
            href={`/timer/${p.slug}`}
            className="rounded-[var(--radius-sm)] border border-border px-3 py-1.5 text-[13px] font-medium text-ink-soft transition-colors hover:border-border-strong hover:text-ink"
          >
            {p.title.replace(" Timer", "")}
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <ToolPageLayout slug={slug} presetSection={<PopularDurations />}>
      <Timer />
    </ToolPageLayout>
  );
}
