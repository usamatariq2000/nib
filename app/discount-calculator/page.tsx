import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools/registry";
import { DiscountCalculator } from "@/components/tools/impl/DiscountCalculator";

const slug = "discount-calculator";
export const metadata: Metadata = toolMetadata(getTool(slug)!);

export default function Page() {
  return (
    <ToolPageLayout slug={slug}>
      <DiscountCalculator />
    </ToolPageLayout>
  );
}
