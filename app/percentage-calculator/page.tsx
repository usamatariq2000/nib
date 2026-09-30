import type { Metadata } from "next";
import Link from "next/link";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools/registry";
import { PercentageCalculator } from "@/components/tools/impl/PercentageCalculator";
import { percentPresets } from "@/lib/tools/presets";
import { fmt } from "@/lib/format";

const slug = "percentage-calculator";
export const metadata: Metadata = toolMetadata(getTool(slug)!);

function CommonCalculations() {
  return (
    <section aria-labelledby="common-calcs">
      <h2
        id="common-calcs"
        className="mb-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-ink"
      >
        Common calculations
      </h2>
      <div className="flex flex-wrap gap-2">
        {percentPresets.map((p) => (
          <Link
            key={p.slug}
            href={`/percentage-calculator/${p.slug}`}
            className="rounded-[var(--radius-sm)] border border-border px-3 py-1.5 text-[13px] font-medium text-ink-soft transition-colors hover:border-border-strong hover:text-ink"
            title={`${p.percent}% of ${p.value} = ${fmt(p.answer)}`}
          >
            {p.percent}% of {p.value}
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <ToolPageLayout slug={slug} presetSection={<CommonCalculations />}>
      <PercentageCalculator />
    </ToolPageLayout>
  );
}
