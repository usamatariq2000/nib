import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools/registry";
import { RandomNumberGenerator } from "@/components/tools/impl/RandomNumberGenerator";

const slug = "random-number-generator";
export const metadata: Metadata = toolMetadata(getTool(slug)!);

export default function Page() {
  return (
    <ToolPageLayout slug={slug}>
      <RandomNumberGenerator />
    </ToolPageLayout>
  );
}
