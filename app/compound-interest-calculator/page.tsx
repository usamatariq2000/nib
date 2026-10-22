import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools/registry";
import { CompoundInterestCalculator } from "@/components/tools/impl/CompoundInterestCalculator";

const slug = "compound-interest-calculator";
export const metadata: Metadata = toolMetadata(getTool(slug)!);

export default function Page() {
  return (
    <ToolPageLayout slug={slug}>
      <CompoundInterestCalculator />
    </ToolPageLayout>
  );
}
