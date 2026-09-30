import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { tools } from "@/lib/tools/registry";
import { categories } from "@/lib/tools/categories";
import { timerPresets, percentPresets } from "@/lib/tools/presets";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = site.url;

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/tools`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${base}/tools/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const toolPages: MetadataRoute.Sitemap = tools.map((t) => ({
    url: `${base}/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: t.popular ? 0.9 : 0.8,
  }));

  const timerPresetPages: MetadataRoute.Sitemap = timerPresets.map((p) => ({
    url: `${base}/timer/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const percentPresetPages: MetadataRoute.Sitemap = percentPresets.map((p) => ({
    url: `${base}/percentage-calculator/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [
    ...staticPages,
    ...categoryPages,
    ...toolPages,
    ...timerPresetPages,
    ...percentPresetPages,
  ];
}
