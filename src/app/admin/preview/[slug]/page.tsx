import React from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import {
  getArticleBySlug,
  getAuthor,
  getRelatedArticles,
} from "@/lib/cms/store";
import { verifyPreviewToken, verifySessionToken } from "@/lib/cms/auth";
import { SERVICE_CASES } from "@/data/services";
import { ArticleView } from "@/components/blog/ArticleView";

export const dynamic = "force-dynamic";

const COOKIE_NAME = "sindicone_cms_session";

export const metadata: Metadata = {
  title: "Pré-visualização Editorial (Rascunho) | Síndico Né!",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ token?: string }>;
}) {
  const { slug } = await params;
  const { token } = await searchParams;

  const cookieStore = await cookies();
  const sessionUser = verifySessionToken(cookieStore.get(COOKIE_NAME)?.value);
  const hasPreviewToken = verifyPreviewToken(slug, token);

  if (!sessionUser && !hasPreviewToken) {
    redirect(`/admin/?preview=${encodeURIComponent(slug)}`);
  }

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
