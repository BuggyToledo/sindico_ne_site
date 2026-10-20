import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { queryArticles, getAllArticles } from "@/lib/cms/store";
import { Subheader } from "@/components/layout/Subheader";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { Pagination } from "@/components/blog/Pagination";

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
    title: `Categoria: Notícias — Página ${pageNum} - Síndico Né!`,
    description: `Publicações sobre sindicância profissional e gestão condominial no RJ — Página ${pageNum}.`,
    alternates: {
      canonical:
        pageNum === 1
          ? "https://www.sindicone.com.br/category/noticias/"
          : `https://www.sindicone.com.br/category/noticias/page/${pageNum}/`,
    },
  };
}

export default async function CategoryNoticiasPaginatedPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const pageNum = Number(page);
  const result = await queryArticles({
    status: "published",
    categorySlug: "noticias",
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

  return (
    <div>
      <Subheader
        badge={`Categoria: Notícias — Página ${pageNum} de ${result.totalPages}`}
        title="Notícias e Orientações Condominiais"
        breadcrumbs={[
          { label: "Categoria: Notícias", href: "/category/noticias/" },
          { label: `Página ${pageNum}` },
        ]}
      />

      <section className="py-12 sm:py-16 bg-[#f4f6f8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {result.items.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          <Pagination
            currentPage={result.page}
            totalPages={result.totalPages}
            basePath="/category/noticias"
          />
        </div>
      </section>
    </div>
  );
}
