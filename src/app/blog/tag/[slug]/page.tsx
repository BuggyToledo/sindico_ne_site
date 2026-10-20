import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EDITORIAL_TAGS } from "@/data/site-config";
import {
  queryArticles,
  getAllArticles,
  getCategoriesWithCounts,
  getTagsWithCounts,
} from "@/lib/cms/store";
import { Subheader } from "@/components/layout/Subheader";
import { BlogSearchAndFilter } from "@/components/blog/BlogSearchAndFilter";
import { buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";

export async function generateStaticParams() {
  return EDITORIAL_TAGS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tag = EDITORIAL_TAGS.find((t) => t.slug === slug);
  if (!tag) return {};

  // Canonicalize to the preserved /tag/[slug]/ URL to avoid duplicate tag archives
  return {
    title: `Artigos sobre ${tag.name} | Blog Síndico Né!`,
    description: tag.description,
    alternates: {
      canonical: `https://www.sindicone.com.br/tag/${tag.slug}/`,
    },
    robots: {
      index: tag.indexable,
      follow: true,
    },
  };
}

export default async function BlogTagPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tag = EDITORIAL_TAGS.find((t) => t.slug === slug);
  if (!tag) notFound();

  const result = await queryArticles({
    status: "published",
    tagSlug: slug,
    page: 1,
    perPage: 20,
  });

  const allPublished = await getAllArticles({ includeUnpublished: false });
  const categories = getCategoriesWithCounts(allPublished);
  const tags = getTagsWithCounts(allPublished);

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Início", url: "/" },
    { name: "Blog", url: "/blog/" },
    { name: `#${tag.name}`, url: `/tag/${tag.slug}/` },
  ]);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Subheader
        badge="Tópico Temático"
        title={`Artigos sobre ${tag.name}`}
        subtitle={tag.description}
        breadcrumbs={[
          { label: "Blog", href: "/blog/" },
          { label: `#${tag.name}` },
        ]}
      />

      <section className="py-12 sm:py-16 bg-[#f4f6f8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogSearchAndFilter
            initialArticles={result.items}
            allArticlesForSearch={allPublished}
            categories={categories}
            tags={tags}
            activeTagSlug={tag.slug}
          />
        </div>
      </section>
    </div>
  );
}
