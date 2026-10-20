import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { queryArticles, getCategoriesWithCounts, getTagsWithCounts, getAllArticles } from "@/lib/cms/store";
import { Subheader } from "@/components/layout/Subheader";
import { ShortcutStrip } from "@/components/layout/ShortcutStrip";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { Pagination } from "@/components/blog/Pagination";
import { buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";

export const metadata: Metadata = {
  title: "Notícias e Eventos Condominiais - Síndico Né!",
  description:
    "Acompanhe notícias, eventos, orientações jurídicas e guias práticos sobre administração condominial e síndico profissional no Rio de Janeiro.",
  alternates: {
    canonical: "https://www.sindicone.com.br/noticias-e-eventos/",
  },
};

export default async function NoticiasEEventosPage() {
  const result = await queryArticles({ status: "published", page: 1, perPage: 6 });
  const allPublished = await getAllArticles({ includeUnpublished: false });
  const categories = getCategoriesWithCounts(allPublished);
  const tags = getTagsWithCounts(allPublished).filter((t) => t.indexable && t.count > 0);

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
        badge="Arquivo Editorial Preserved"
        title="Notícias e Eventos"
        subtitle="Artigos técnicos, novidades legislativas e orientações práticas sobre vida em condomínio e gestão profissional no Rio de Janeiro."
        breadcrumbs={[{ label: "Notícias e Eventos" }]}
      />

      <ShortcutStrip overlap={true} />

      <section className="py-12 sm:py-16 bg-[#f4f6f8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="bg-white rounded-xl border border-gray-200 p-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#171c24] mr-1">
                Editorias:
              </span>
              {categories
                .filter((c) => c.slug !== "noticias")
                .map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/blog/categoria/${cat.slug}/`}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-[#f4f6f8] text-[#4a525d] hover:bg-[#171c24] hover:text-[#d9e141] transition-colors"
                  >
                    {cat.name} ({cat.count})
                  </Link>
                ))}
            </div>
            <Link
              href="/blog/"
              className="text-xs font-bold uppercase tracking-wider text-[#171c24] bg-[#d9e141] px-3.5 py-2 rounded-md"
            >
              Ir para Busca Interativa no Blog →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {result.items.map((article, idx) => (
              <ArticleCard
                key={article.id}
                article={article}
                priority={idx < 2}
              />
            ))}
          </div>

          <Pagination
            currentPage={result.page}
            totalPages={result.totalPages}
            basePath="/noticias-e-eventos"
          />

          {tags.length > 0 && (
            <div className="pt-8 border-t border-gray-200 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#5c6470]">
                Tópicos em destaque:
              </span>
              {tags.map((t) => (
                <Link
                  key={t.slug}
                  href={`/tag/${t.slug}/`}
                  className="text-xs bg-white border border-gray-200 px-3 py-1 rounded-full text-[#4a525d] hover:border-[#171c24]"
                >
                  #{t.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
