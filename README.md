# Nib — utility tools platform

Fast, private, free browser tools. Built with **Next.js (App Router) + TypeScript + Tailwind CSS v4**. Most tools run entirely client-side, so user data never leaves the device.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm run start   # production build
```

Copy `.env.example` to `.env.local` to set the production URL, AdSense and analytics ids (all optional in development).

## Architecture

Everything is **data-driven from a central registry**, so the homepage, search, category pages, sitemap, related-tool links and per-page metadata all read from one source.

```
app/
  layout.tsx            Root: fonts, theme, search provider, header/footer, JSON-LD
  page.tsx              Homepage tool launcher
  <tool-slug>/page.tsx  One thin route per tool (20 of them)
  tools/                All-tools index + /tools/[category] pages
  api/og/route.tsx      Dynamic branded Open Graph images
  sitemap.ts robots.ts manifest.ts ads.txt/route.ts   SEO/infra
  privacy/ terms/ about/ contact/ not-found.tsx

components/
  layout/     Header, footer, nav, breadcrumbs, theme, container, prose
  search/     ⌘K command palette + provider + triggers
  tools/      ToolPageLayout (shared shell), ToolListRow, impl/<Tool>.tsx
  ui/         Button, Field, Segmented, Workspace, Badge, Callout, CopyButton, Logo, ToolIcon
  ads/        AdProvider + AdSlot (isolated; renders nothing until configured)

lib/
  tools/      types.ts · categories.ts · registry.ts (the source of truth)
  seo.ts      metadata + JSON-LD builders
  search.ts   client-side search index
  format.ts   number/date/crypto helpers
  site.ts     brand + defaults
```

## Adding a new tool

1. **Register it** in `lib/tools/registry.ts` — add a `Tool` entry (slug, name, description, tagline, category, keywords, icon, related, and the `content` used for the SEO sections + FAQ structured data).
2. **Build the UI** as a client component in `components/tools/impl/<Name>.tsx`.
3. **Add an icon glyph** (optional) in `components/ui/ToolIcon.tsx` keyed by the registry `icon`.
4. **Create the route** `app/<slug>/page.tsx`:

   ```tsx
   import type { Metadata } from "next";
   import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
   import { toolMetadata } from "@/lib/seo";
   import { getTool } from "@/lib/tools/registry";
   import { MyTool } from "@/components/tools/impl/MyTool";

   const slug = "my-tool";
   export const metadata: Metadata = toolMetadata(getTool(slug)!);
   export default function Page() {
     return <ToolPageLayout slug={slug}><MyTool /></ToolPageLayout>;
   }
   ```

That's it — the tool now appears in search, the homepage, its category page, the sitemap, related links, and gets full metadata + JSON-LD automatically.

## Design system

Semantic design tokens live as CSS variables in `app/globals.css` (`--paper`, `--surface`, `--ink`, `--accent` …) and are exposed to Tailwind so utilities like `bg-surface` / `text-ink` adapt to light and dark automatically. The accent is a single editorial vermilion. Dark mode is class-based with a no-flash inline script.

## SEO & performance

- Per-page unique titles, descriptions, canonicals, Open Graph + Twitter cards.
- Structured data: `WebSite`, `Organization`, `BreadcrumbList`, `WebApplication`, `FAQPage`, `ItemList`.
- `sitemap.xml`, `robots.txt`, `ads.txt`, web manifest, SVG + Apple icons.
- Static/SSG rendering, per-route code splitting, self-hosted fonts.
- Lighthouse: SEO 100, Accessibility 100, Best Practices 100; CLS 0, sub-100ms LCP locally.

## Ads & analytics

Ad and analytics code is fully isolated and **loads nothing until configured** (`NEXT_PUBLIC_ADSENSE_CLIENT` / `NEXT_PUBLIC_GA_ID`). There are no fake ads and no tracking without a measurement id, keeping the site fast and consent-ready.
