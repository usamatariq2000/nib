import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools/registry";
import { SalesTaxCalculator } from "@/components/tools/impl/SalesTaxCalculator";

const slug = "sales-tax-calculator";
export const metadata: Metadata = toolMetadata(getTool(slug)!);

export default function Page() {
  return (
    <ToolPageLayout slug={slug}>
      <SalesTaxCalculator />
    </ToolPageLayout>
  );
}
