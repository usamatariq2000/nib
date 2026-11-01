import { site } from "@/lib/site";

/**
 * robots.txt with named AI-crawler groups and a Content-Signal declaration.
 * Policy: fully open — we WANT AI search engines and crawlers to read and cite
 * the tools. (A route handler is used instead of app/robots.ts so we can emit
 * the non-standard Content-Signal directive.)
 */
export const dynamic = "force-static";

export function GET() {
  const body = `# AI search & citation crawlers
User-agent: OAI-SearchBot
User-agent: Claude-SearchBot
User-agent: PerplexityBot
User-agent: Google-Extended
Allow: /

# AI training crawlers
User-agent: GPTBot
User-agent: ClaudeBot
User-agent: CCBot
Allow: /

# Everyone else
User-agent: *
Allow: /
Allow: /api/og
Disallow: /api/
Content-Signal: search=yes, ai-input=yes, ai-train=yes

Host: ${site.url}
Sitemap: ${site.url}/sitemap.xml
`;
  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
