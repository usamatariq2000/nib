import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools/registry";
import { TimestampConverter } from "@/components/tools/impl/TimestampConverter";

const slug = "timestamp-converter";
export const metadata: Metadata = toolMetadata(getTool(slug)!);

export default function Page() {
  return (
    <ToolPageLayout slug={slug}>
      <TimestampConverter />
    </ToolPageLayout>
  );
}
