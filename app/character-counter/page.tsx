import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools/registry";
import { CharacterCounter } from "@/components/tools/impl/CharacterCounter";

const slug = "character-counter";
export const metadata: Metadata = toolMetadata(getTool(slug)!);

export default function Page() {
  return (
    <ToolPageLayout slug={slug}>
      <CharacterCounter />
    </ToolPageLayout>
  );
}
