import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools/registry";
import { JsonFormatter } from "@/components/tools/impl/JsonFormatter";

const slug = "json-formatter";
export const metadata: Metadata = toolMetadata(getTool(slug)!);

export default function Page() {
  return (
    <ToolPageLayout slug={slug}>
      <JsonFormatter />
    </ToolPageLayout>
  );
}
