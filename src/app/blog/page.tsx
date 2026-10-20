import React from "react";
import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Blog de Gestão Condominial e Síndico Profissional | Síndico Né!",
  description:
    "Artigos técnicos, legislação condominial (Código Civil Art. 1.348), segurança contra incêndios, assembleias virtuais e gestão financeira para condomínios no Rio de Janeiro.",
  alternates: {
    canonical: "https://www.sindicone.com.br/blog/",
  },
};

export default async function BlogIndexPage() {
  const paginated = await queryArticles({
    status: "published",
    page: 1,
    perPage: 6,
  });
  const allPublished = await getAllArticles({ includeUnpublished: false });
  const categories = getCategoriesWithCounts(allPublished);
  const tags = getTagsWithCounts(allPublished);

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Início", url: "/" },
    { name: "Blog", url: "/blog/" },
  ]);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Subheader
        badge="Central de Conhecimento Condominial"
        title="Blog Síndico Né! — Gestão Condominial, Legislação e Manutenção Predial"
        subtitle="Guias técnicos revisados por Adriano Toledo (CRA-RJ 03-06783 | CRECI-J 12.974) para apoiar conselheiros, síndicos e moradores na tomada de decisões seguras."
        breadcrumbs={[{ label: "Blog" }]}
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
