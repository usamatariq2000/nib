import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools/registry";
import { RatioCalculator } from "@/components/tools/impl/RatioCalculator";

const slug = "ratio-calculator";
export const metadata: Metadata = toolMetadata(getTool(slug)!);

export default function Page() {
  return (
    <ToolPageLayout slug={slug}>
      <RatioCalculator />
    </ToolPageLayout>
  );
}
