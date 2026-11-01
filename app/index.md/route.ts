import { site } from "@/lib/site";
import { categories } from "@/lib/tools/categories";
import { getToolsByCategory } from "@/lib/tools/registry";

/**
 * Markdown delivery of the site index for AI agents that request/prefer
 * text/markdown. Linked from <head> via rel="alternate".
 */
export const dynamic = "force-static";

export function GET() {
  const sections = categories
    .map((c) => {
      const rows = getToolsByCategory(c.id)
        .map((t) => `- [${t.name}](${site.url}/${t.slug}) — ${t.description}`)
        .join("\n");
      return `## ${c.title}\n\n${rows}`;
    })
    .join("\n\n");

  const md = `# ${site.name}

${site.description}

${sections}
`;

  return new Response(md, {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  });
}
