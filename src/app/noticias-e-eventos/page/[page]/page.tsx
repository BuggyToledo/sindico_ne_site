import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  queryArticles,
  getAllArticles,
  getCategoriesWithCounts,
  getTagsWithCounts,
} from "@/lib/cms/store";
import { Subheader } from "@/components/layout/Subheader";
import { ShortcutStrip } from "@/components/layout/ShortcutStrip";
import { BlogSearchAndFilter } from "@/components/blog/BlogSearchAndFilter";
import { Pagination } from "@/components/blog/Pagination";
import { buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";

export async function generateStaticParams() {
  const all = await getAllArticles({ includeUnpublished: false });
  const totalPages = Math.max(1, Math.ceil(all.length / 6));
  return Array.from({ length: totalPages }, (_, i) => ({
    page: String(i + 1),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  const pageNum = Number(page) || 1;
  return {
    title: `Notícias e Eventos — Página ${pageNum} - Síndico Né!`,
    description: `Arquivo de notícias, artigos e eventos sobre gestão condominial no Rio de Janeiro — Página ${pageNum}.`,
    alternates: {
      canonical:
        pageNum === 1
          ? "https://www.sindicone.com.br/noticias-e-eventos/"
          : `https://www.sindicone.com.br/noticias-e-eventos/page/${pageNum}/`,
    },
  };
}

export default async function NoticiasPaginatedPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const pageNum = Number(page);
  const result = await queryArticles({
    status: "published",
    page: pageNum,
    perPage: 6,
  });

  if (
    !Number.isInteger(pageNum) ||
    pageNum < 1 ||
    pageNum > result.totalPages
  ) {
    notFound();
  }

  const allPublished = await getAllArticles({ includeUnpublished: false });
  const categories = getCategoriesWithCounts(allPublished);
  const tags = getTagsWithCounts(allPublished);

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Início", url: "/" },
    { name: "Notícias e Eventos", url: "/noticias-e-eventos/" },
    {
      name: `Página ${pageNum}`,
      url: `/noticias-e-eventos/page/${pageNum}/`,
    },
  ]);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Subheader
        badge={`Notícias e Eventos — Página ${pageNum} de ${result.totalPages}`}
        title="Notícias e Eventos"
        subtitle="Artigos e orientações técnicas sobre administração condominial no Rio de Janeiro."
        breadcrumbs={[
          { label: "Notícias e Eventos", href: "/noticias-e-eventos/" },
          { label: `Página ${pageNum}` },
        ]}
      />

      <ShortcutStrip overlap={true} />

      <section className="py-12 sm:py-16 bg-[#f4f6f8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <BlogSearchAndFilter
            initialArticles={result.items}
            allArticlesForSearch={allPublished}
            categories={categories}
            tags={tags}
          />

          <Pagination
            currentPage={result.page}
            totalPages={result.totalPages}
            basePath="/noticias-e-eventos"
          />
        </div>
      </section>
    </div>
  );
}
