import React from "react";
import type { Metadata } from "next";
import { queryArticles } from "@/lib/cms/store";
import { Subheader } from "@/components/layout/Subheader";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { Pagination } from "@/components/blog/Pagination";
import { buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";

export const metadata: Metadata = {
  title: "Categoria: Notícias Condominiais - Síndico Né!",
  description:
    "Arquivo de notícias e artigos técnicos sobre sindicância profissional e administração de condomínios no Rio de Janeiro.",
  alternates: {
    canonical: "https://www.sindicone.com.br/category/noticias/",
  },
};

export default async function CategoryNoticiasPage() {
  const result = await queryArticles({
    status: "published",
    categorySlug: "noticias",
    page: 1,
    perPage: 6,
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Início", url: "/" },
    { name: "Notícias", url: "/category/noticias/" },
  ]);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Subheader
        badge="Categoria Editorial"
        title="Notícias e Orientações Condominiais"
        subtitle="Publicações oficiais do Síndico Né! sobre legislação, finanças, assembleias e manutenção predial."
        breadcrumbs={[{ label: "Categoria: Notícias" }]}
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
