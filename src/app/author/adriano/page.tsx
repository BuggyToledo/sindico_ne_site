import React from "react";
import type { Metadata } from "next";
import { ShieldCheck, Award } from "lucide-react";
import { AUTHORS, SITE_CONFIG } from "@/data/site-config";
import { queryArticles } from "@/lib/cms/store";
import { Subheader } from "@/components/layout/Subheader";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { Pagination } from "@/components/blog/Pagination";
import { buildAuthorJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";

const author = AUTHORS["adriano-toledo"];

export const metadata: Metadata = {
  title: `${author.name} | Síndico Profissional (CRA-RJ ${SITE_CONFIG.credentials.craRj}) | Síndico Né!`,
  description: author.bio,
  alternates: {
    canonical: "https://www.sindicone.com.br/author/adriano/",
  },
};

export default async function AuthorAdrianoPage() {
  const result = await queryArticles({
    status: "published",
    authorId: "adriano-toledo",
    page: 1,
    perPage: 6,
  });

  const authorJsonLd = buildAuthorJsonLd(author);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Início", url: "/" },
    { name: "Notícias e Eventos", url: "/noticias-e-eventos/" },
    { name: author.name, url: "/author/adriano/" },
  ]);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(authorJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Subheader
        badge="Autor e Responsável Técnico"
        title={author.name}
        subtitle={`${author.role}: ${author.credentials}`}
        breadcrumbs={[
          { label: "Notícias e Eventos", href: "/noticias-e-eventos/" },
          { label: author.name },
        ]}
      />

      <section className="py-12 sm:py-16 bg-[#f4f6f8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* E-E-A-T Author Profile Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-7 sm:p-10 shadow-xs flex flex-col md:flex-row items-start gap-7">
            <div className="w-20 h-20 rounded-full bg-[#171c24] text-[#d9e141] flex items-center justify-center font-heading text-3xl font-bold shrink-0">
              AT
            </div>
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider bg-[#d9e141] text-[#171c24] px-3 py-1 rounded">
                  <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                  {author.credentials}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold bg-gray-100 text-[#171c24] px-3 py-1 rounded">
                  <Award className="w-3.5 h-3.5" aria-hidden="true" />
                  Certificado com Louvor Gábor RH
                </span>
                {author.socialLinks.linkedin && (
                  <a
                    href={author.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer me"
                    className="inline-flex items-center text-xs font-semibold text-[#0051d5] underline px-1 py-1"
                  >
                    LinkedIn de Adriano Toledo
                  </a>
                )}
              </div>
              <h2 className="font-heading text-2xl font-bold text-[#171c24]">
                Sobre {author.name}
              </h2>
              <p className="text-sm sm:text-base text-[#4a525d] leading-relaxed">
                {author.bio}
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#171c24] mb-6">
              Artigos Técnicos Publicados por {author.name} ({result.total})
            </h2>
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
        </div>
      </section>
    </div>
  );
}
