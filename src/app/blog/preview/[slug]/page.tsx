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
import { ArticleView } from "@/components/blog/ArticleView";

export async function generateStaticParams() {
  const articles = await getAllArticles({ includeUnpublished: true });
  return articles.map((a) => ({ slug: a.slug }));
}

export const metadata: Metadata = {
  title: "Pré-visualização Editorial (Rascunho) | Síndico Né!",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function BlogPreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug, { allowUnpublished: true });
  if (!article) notFound();

  const author = getAuthor(article.authorId);
  const reviewer = article.reviewerId
    ? getAuthor(article.reviewerId)
    : undefined;
  const relatedArticles = await getRelatedArticles(article, 3);
  const relatedServices = SERVICE_CASES.filter((s) =>
    (article.relatedServiceSlugs ?? []).includes(s.slug)
  );

  return (
    <ArticleView
      article={article}
      author={author}
      reviewer={reviewer}
      relatedArticles={relatedArticles}
      relatedServices={relatedServices}
      isPreview={true}
    />
  );
}
