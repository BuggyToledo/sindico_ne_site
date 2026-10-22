import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllArticles,
  getArticleBySlug,
  getAuthor,
  getRelatedArticles,
} from "@/lib/cms/store";
import { SERVICE_CASES } from "@/data/services";
import { EDITORIAL_CATEGORIES } from "@/data/site-config";
import { ArticleView } from "@/components/blog/ArticleView";
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
} from "@/lib/seo/json-ld";

/**
 * Preserves the exact root-level WordPress permalinks (`/[slug]/`) for all 11 original articles
 * so zero organic rankings or backlinks are lost during the migration (Rules 2, 5, and 9).
 */
export async function generateStaticParams() {
  const articles = await getAllArticles({ includeUnpublished: false });
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug, { allowUnpublished: false });
  if (!article) return {};

  const canonical = article.canonicalUrl || article.seo.canonicalUrl;
  return {
    title: article.seoTitle || article.seo.title,
    description: article.seoDescription || article.seo.description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "article",
      title: article.social?.ogTitle || article.seoTitle || article.seo.title,
      description:
        article.social?.ogDescription ||
        article.seoDescription ||
        article.seo.description,
      url: canonical,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      images: [
        {
          url: article.social?.ogImage || article.featuredImage.url,
          width: article.featuredImage.width,
          height: article.featuredImage.height,
          alt: article.featuredImage.alt,
        },
      ],
    },
    robots: {
      index: !article.noIndex,
      follow: !article.noIndex,
    },
  };
}

export default async function RootArticleSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug, { allowUnpublished: false });
  if (!article) notFound();

  const author = getAuthor(article.authorId);
  const reviewer = article.reviewerId
    ? getAuthor(article.reviewerId)
    : undefined;
  const relatedArticles = await getRelatedArticles(article, 3);
  const relatedServices = SERVICE_CASES.filter((s) =>
    (article.relatedServiceSlugs ?? []).includes(s.slug)
  );
  const category =
    EDITORIAL_CATEGORIES.find((c) => c.slug === article.categorySlug) ??
    EDITORIAL_CATEGORIES[0];

  const articleJsonLd = buildArticleJsonLd(article, author);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Início", url: "/" },
    { name: "Notícias e Eventos", url: "/noticias-e-eventos/" },
    { name: category.name, url: `/category/${category.slug}/` },
    {
      name: article.title,
      url: article.canonicalUrl || article.seo.canonicalUrl,
    },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ArticleView
        article={article}
        author={author}
        reviewer={reviewer}
        relatedArticles={relatedArticles}
        relatedServices={relatedServices}
      />
    </>
  );
}
