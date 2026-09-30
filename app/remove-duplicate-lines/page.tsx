import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools/registry";
import { RemoveDuplicateLines } from "@/components/tools/impl/RemoveDuplicateLines";

const slug = "remove-duplicate-lines";
export const metadata: Metadata = toolMetadata(getTool(slug)!);

export default function Page() {
  return (
    <ToolPageLayout slug={slug}>
      <RemoveDuplicateLines />
    </ToolPageLayout>
  );
}
