import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools/registry";
import { Stopwatch } from "@/components/tools/impl/Stopwatch";

const slug = "stopwatch";
export const metadata: Metadata = toolMetadata(getTool(slug)!);

export default function Page() {
  return (
    <ToolPageLayout slug={slug}>
      <Stopwatch />
    </ToolPageLayout>
  );
}
