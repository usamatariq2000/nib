import { categoryById } from "./tools/categories";
import { tools } from "./tools/registry";
import type { Tool } from "./tools/types";

export interface SearchEntry {
  tool: Tool;
  categoryTitle: string;
  haystack: string;
}

/** Pre-built, lowercased index. Cheap enough to build once at module load. */
export const searchIndex: SearchEntry[] = tools.map((tool) => {
  const categoryTitle = categoryById[tool.category].title;
  return {
    tool,
    categoryTitle,
    haystack: [
      tool.name,
      tool.description,
      tool.tagline,
      categoryTitle,
      ...tool.keywords,
    ]
      .join(" ")
      .toLowerCase(),
  };
});

function scoreEntry(entry: SearchEntry, tokens: string[]): number {
  const name = entry.tool.name.toLowerCase();
  const keywords = entry.tool.keywords.join(" ").toLowerCase();
  let score = 0;

  for (const token of tokens) {
    if (!entry.haystack.includes(token)) return -1; // every token must match
    if (name.startsWith(token)) score += 100;
    else if (name.includes(token)) score += 60;
    if (keywords.includes(token)) score += 25;
    if (entry.categoryTitle.toLowerCase().includes(token)) score += 8;
  }
  if (entry.tool.popular) score += 4;
  return score;
}

export function searchTools(query: string, limit = 8): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) {
    // Surface popular tools first when the query is empty.
    return [...searchIndex]
      .sort(
        (a, b) => Number(b.tool.popular ?? false) - Number(a.tool.popular ?? false),
      )
      .slice(0, limit);
  }
  const tokens = q.split(/\s+/).filter(Boolean);
  return searchIndex
    .map((entry) => ({ entry, score: scoreEntry(entry, tokens) }))
    .filter((r) => r.score >= 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.entry);
}
