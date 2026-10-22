import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools/registry";
import { MortgageCalculator } from "@/components/tools/impl/MortgageCalculator";

const slug = "mortgage-calculator";
export const metadata: Metadata = toolMetadata(getTool(slug)!);

export default function Page() {
  return (
    <ToolPageLayout slug={slug}>
      <MortgageCalculator />
    </ToolPageLayout>
  );
}
