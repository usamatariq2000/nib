import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools/registry";
import { UrlEncoderTool } from "@/components/tools/impl/UrlEncoderTool";

const slug = "url-encoder";
export const metadata: Metadata = toolMetadata(getTool(slug)!);

export default function Page() {
  return (
    <ToolPageLayout slug={slug}>
      <UrlEncoderTool />
    </ToolPageLayout>
  );
}
