import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EDITORIAL_TAGS } from "@/data/site-config";
import { queryArticles } from "@/lib/cms/store";
import { Subheader } from "@/components/layout/Subheader";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";

/**
 * Preserves all 32 legacy WordPress `/tag/[slug]/` URLs while applying
 * strategic indexation (`index, follow` on high-value pillar tags; `noindex, follow` on thin 1-post tags)
 * as specified in Rule 2 and Rule 5.
 */
export async function generateStaticParams() {
  return EDITORIAL_TAGS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tag = EDITORIAL_TAGS.find((t) => t.slug === slug);
  if (!tag) return {};

  const canonical = `https://www.sindicone.com.br/tag/${tag.slug}/`;
  return {
    title: `Tópico: ${tag.name} — Gestão Condominial | Síndico Né!`,
    description: tag.description,
    alternates: { canonical },
    robots: {
      index: tag.indexable,
      follow: true,
    },
  };
}

export default async function LegacyTagPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tag = EDITORIAL_TAGS.find((t) => t.slug === slug);
  if (!tag) notFound();

  const result = await queryArticles({
    status: "published",
    tagSlug: slug,
    page: 1,
    perPage: 20,
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Início", url: "/" },
    { name: "Notícias e Eventos", url: "/noticias-e-eventos/" },
    { name: `#${tag.name}`, url: `/tag/${tag.slug}/` },
  ]);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Subheader
        badge="Arquivo por Assunto"
        title={`Artigos sobre ${tag.name}`}
        subtitle={tag.description}
        breadcrumbs={[
          { label: "Notícias e Eventos", href: "/noticias-e-eventos/" },
          { label: `#${tag.name}` },
        ]}
      />

      <section className="py-12 sm:py-16 bg-[#f4f6f8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between">
            <span className="text-sm text-[#4a525d]">
              Encontramos{" "}
              <strong className="text-[#171c24]">{result.total}</strong>{" "}
              {result.total === 1
                ? "artigo publicado neste tópico"
                : "artigos publicados neste tópico"}
            </span>
            <Link
              href="/noticias-e-eventos/"
              className="text-xs font-bold uppercase tracking-wider text-[#171c24] hover:underline"
            >
              ← Voltar para Notícias &amp; Eventos
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {result.items.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
