import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ToolListRow } from "@/components/tools/ToolListRow";
import { categories, getCategoryBySlug } from "@/lib/tools/categories";
import { getToolsByCategory } from "@/lib/tools/registry";
import { categoryMetadata, breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  return categoryMetadata(category);
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const list = getToolsByCategory(category.id);
  const trail = [
    { name: "Home", path: "/" },
    { name: category.title, path: `/tools/${category.slug}` },
  ];

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: category.title,
    itemListElement: list.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${site.url}/${t.slug}`,
      name: t.name,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd(trail)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(itemList) }}
      />
      <Container className="pb-10 pt-6 sm:pt-8">
        <Breadcrumbs trail={trail} />
        <header className="mt-5 max-w-[640px]">
          <h1 className="text-[28px] font-semibold tracking-[-0.02em] text-ink sm:text-[34px]">
            {category.title}
          </h1>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
            {category.description}
          </p>
        </header>

        <div className="mt-8 grid gap-x-6 sm:grid-cols-2">
          {list.map((tool) => (
            <ToolListRow key={tool.slug} tool={tool} />
          ))}
        </div>
      </Container>
    </>
  );
}
