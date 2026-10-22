import React from "react";
import type { Metadata } from "next";
import {
  queryArticles,
  getCategoriesWithCounts,
  getTagsWithCounts,
  getAllArticles,
} from "@/lib/cms/store";
import { Subheader } from "@/components/layout/Subheader";
import { ShortcutStrip } from "@/components/layout/ShortcutStrip";
import { BlogSearchAndFilter } from "@/components/blog/BlogSearchAndFilter";
import { Pagination } from "@/components/blog/Pagination";
import { buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";

export const metadata: Metadata = {
  title: "Notícias e Eventos Condominiais - Síndico Né!",
  description:
    "Acompanhe notícias, eventos, orientações jurídicas e guias práticos sobre administração condominial e síndico profissional na Zona Sul do Rio de Janeiro, Barra da Tijuca e Tijuca.",
  alternates: {
    canonical: "https://www.sindicone.com.br/noticias-e-eventos/",
  },
};

export default async function NoticiasEEventosPage() {
  const result = await queryArticles({
    status: "published",
    page: 1,
    perPage: 6,
  });
  const allPublished = await getAllArticles({ includeUnpublished: false });
  const categories = getCategoriesWithCounts(allPublished);
  const tags = getTagsWithCounts(allPublished);

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Início", url: "/" },
    { name: "Notícias e Eventos", url: "/noticias-e-eventos/" },
  ]);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Subheader
        badge="Central de Conhecimento Condominial"
        title="Notícias e Eventos"
        subtitle="Artigos técnicos, novidades legislativas e orientações práticas sobre vida em condomínio e gestão profissional no Rio de Janeiro."
        breadcrumbs={[{ label: "Notícias e Eventos" }]}
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
