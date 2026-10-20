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
    title: `Blog de Gestão Condominial — Página ${pageNum} | Síndico Né!`,
    description: `Artigos técnicos sobre sindicância profissional, legislação condominial e manutenção predial no Rio de Janeiro — Página ${pageNum}.`,
    alternates: {
      canonical:
        pageNum === 1
          ? "https://www.sindicone.com.br/blog/"
          : `https://www.sindicone.com.br/blog/page/${pageNum}/`,
    },
  };
}

export default async function BlogPaginatedPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const pageNum = Number(page);
  const paginated = await queryArticles({
    status: "published",
    page: pageNum,
    perPage: 6,
  });

  if (
    !Number.isInteger(pageNum) ||
    pageNum < 1 ||
    pageNum > paginated.totalPages
  ) {
    notFound();
  }

  const allPublished = await getAllArticles({ includeUnpublished: false });
  const categories = getCategoriesWithCounts(allPublished);
  const tags = getTagsWithCounts(allPublished);

  return (
    <div>
      <Subheader
        badge={`Blog Síndico Né! — Página ${pageNum} de ${paginated.totalPages}`}
        title="Artigos e Guias de Gestão Condominial"
        subtitle="Explore nossa biblioteca técnica sobre administração condominial profissional no Rio de Janeiro."
        breadcrumbs={[
          { label: "Blog", href: "/blog/" },
          { label: `Página ${pageNum}` },
        ]}
      />

      <ShortcutStrip overlap={true} />

      <section className="py-12 sm:py-16 bg-[#f4f6f8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogSearchAndFilter
            initialArticles={paginated.items}
            allArticlesForSearch={allPublished}
            categories={categories}
            tags={tags}
          />

          <Pagination
            currentPage={paginated.page}
            totalPages={paginated.totalPages}
            basePath="/blog"
          />
        </div>
      </section>
    </div>
  );
}
