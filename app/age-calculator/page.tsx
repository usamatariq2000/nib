import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools/registry";
import { AgeCalculator } from "@/components/tools/impl/AgeCalculator";

const slug = "age-calculator";
export const metadata: Metadata = toolMetadata(getTool(slug)!);

export default function Page() {
  return (
    <ToolPageLayout slug={slug}>
      <AgeCalculator />
    </ToolPageLayout>
  );
}
