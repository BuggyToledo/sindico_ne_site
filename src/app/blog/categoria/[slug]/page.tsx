import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EDITORIAL_CATEGORIES } from "@/data/site-config";
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
  return EDITORIAL_CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = EDITORIAL_CATEGORIES.find((c) => c.slug === slug);
  if (!category) return {};

  return {
    title: category.seoTitle,
    description: category.seoDescription,
    alternates: {
      canonical: `https://www.sindicone.com.br/blog/categoria/${category.slug}/`,
    },
  };
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = EDITORIAL_CATEGORIES.find((c) => c.slug === slug);
  if (!category) notFound();

  const result = await queryArticles({
    status: "published",
    categorySlug: slug,
    page: 1,
    perPage: 20,
  });

  const allPublished = await getAllArticles({ includeUnpublished: false });
  const categories = getCategoriesWithCounts(allPublished);
  const tags = getTagsWithCounts(allPublished);

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Início", url: "/" },
    { name: "Blog", url: "/blog/" },
    { name: category.name, url: `/blog/categoria/${category.slug}/` },
  ]);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Subheader
        badge="Editoria Especializada"
        title={category.name}
        subtitle={category.description}
        breadcrumbs={[
          { label: "Blog", href: "/blog/" },
          { label: category.name },
        ]}
      />

      <section className="py-12 sm:py-16 bg-[#f4f6f8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogSearchAndFilter
            initialArticles={result.items}
            allArticlesForSearch={allPublished}
            categories={categories}
            tags={tags}
            activeCategorySlug={category.slug}
          />
        </div>
      </section>
    </div>
  );
}
