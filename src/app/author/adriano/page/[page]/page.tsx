import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AUTHORS } from "@/data/site-config";
import { queryArticles, getAllArticles } from "@/lib/cms/store";
import { Subheader } from "@/components/layout/Subheader";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { Pagination } from "@/components/blog/Pagination";

const author = AUTHORS["adriano-toledo"];

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
    title: `Artigos de ${author.name}, página ${pageNum} | Síndico Né!`,
    description: `${author.bio}, página ${pageNum}.`,
    alternates: {
      canonical:
        pageNum === 1
          ? "https://www.sindicone.com.br/author/adriano/"
          : `https://www.sindicone.com.br/author/adriano/page/${pageNum}/`,
    },
  };
}

export default async function AuthorAdrianoPaginatedPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const pageNum = Number(page);
  const result = await queryArticles({
    status: "published",
    authorId: "adriano-toledo",
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
        badge={`Autor: ${author.name}, página ${pageNum} de ${result.totalPages}`}
        title={`Publicações de ${author.name}`}
        subtitle={`${author.role}: ${author.credentials}`}
        breadcrumbs={[
          { label: "Notícias e Eventos", href: "/noticias-e-eventos/" },
          { label: author.name, href: "/author/adriano/" },
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
            basePath="/author/adriano"
          />
        </div>
      </section>
    </div>
  );
}
