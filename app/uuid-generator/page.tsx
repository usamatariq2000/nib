import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools/registry";
import { UuidGenerator } from "@/components/tools/impl/UuidGenerator";

const slug = "uuid-generator";
export const metadata: Metadata = toolMetadata(getTool(slug)!);

export default function Page() {
  return (
    <ToolPageLayout slug={slug}>
      <UuidGenerator />
    </ToolPageLayout>
  );
}
