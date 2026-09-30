import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools/registry";
import { DateDifferenceCalculator } from "@/components/tools/impl/DateDifferenceCalculator";

const slug = "date-difference-calculator";
export const metadata: Metadata = toolMetadata(getTool(slug)!);

export default function Page() {
  return (
    <ToolPageLayout slug={slug}>
      <DateDifferenceCalculator />
    </ToolPageLayout>
  );
}
