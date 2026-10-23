import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Clock,
  ShieldCheck,
  BookOpen,
  ExternalLink,
  MessageCircle,
  PhoneCall,
  HelpCircle,
  CheckCircle2,
  Tag,
  Building2,
  Share2,
} from "lucide-react";
import type { Article, Author, ServiceCaseStudy } from "@/types/editorial";
import { EDITORIAL_CATEGORIES, SITE_CONFIG } from "@/data/site-config";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ArticleCard } from "./ArticleCard";

interface ArticleViewProps {
  article: Article;
  author: Author;
  reviewer?: Author;
  relatedArticles: Article[];
  relatedServices: ServiceCaseStudy[];
  isPreview?: boolean;
}

export function ArticleView({
  article,
  author,
  reviewer,
  relatedArticles,
  relatedServices,
  isPreview = false,
}: ArticleViewProps) {
  const category =
    EDITORIAL_CATEGORIES.find((c) => c.slug === article.categorySlug) ??
    EDITORIAL_CATEGORIES[0];

  const publishedFormatted = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(article.publishedAt));

  const updatedFormatted = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(article.updatedAt));

  const whatsappHref = article.cta.whatsappMessage
    ? `https://api.whatsapp.com/send?phone=${SITE_CONFIG.contact.whatsappRaw}&text=${encodeURIComponent(
        article.cta.whatsappMessage
      )}`
    : SITE_CONFIG.contact.whatsappUrl;

  const shareUrl = encodeURIComponent(
    article.canonicalUrl || article.seo.canonicalUrl
  );
  const shareTitle = encodeURIComponent(article.title);

  return (
    <div className="bg-[#f4f6f8] pb-20">
      {/* Draft / Preview Warning Banner */}
      {isPreview && (
        <div
          role="status"
          className="bg-amber-400 text-[#171c24] py-3 px-4 border-b border-amber-500 text-center text-sm font-bold"
        >
          MODO DE PRÉ-VISUALIZAÇÃO EDITORIAL: Status atual:{" "}
          <span className="uppercase underline">{article.status}</span> (Esta
          página contém <code>noindex, nofollow</code> e não é indexada por
          buscadores).
        </div>
      )}

      {/* Article Header Banner */}
      <header className="bg-[#171c24] text-white pt-10 pb-14 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            variant="dark"
            items={[
              { label: "Notícias e Eventos", href: "/noticias-e-eventos/" },
              {
                label: category.name,
                href: `/category/${category.slug}/`,
              },
              { label: article.title },
            ]}
          />

          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            <Link
              href={`/category/${category.slug}/`}
              className="bg-[#d9e141] text-[#171c24] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded hover:bg-[#c5cd32] transition-colors"
            >
              {category.name}
            </Link>
            <span className="inline-flex items-center gap-1.5 text-xs text-[#c2c7ce] bg-white/10 px-3 py-1 rounded">
              <Clock className="w-3.5 h-3.5 text-[#d9e141]" aria-hidden="true" />
              <span>Leitura: {article.readingTimeMinutes} min</span>
            </span>
          </div>

          <h1 className="mt-4 font-heading text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-white leading-[1.15]">
            {article.title}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[#d0d6df] leading-relaxed">
            {article.excerpt}
          </p>

          {/* Byline & E-E-A-T Metadata */}
          <div className="mt-7 pt-6 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs sm:text-sm text-[#c2c7ce]">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-white/10 border border-[#d9e141] flex items-center justify-center font-heading font-bold text-[#d9e141] text-base">
                AT
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <span>Por</span>
                  <Link
                    href={`/author/${author.slug}/`}
                    className="font-bold text-white hover:text-[#d9e141] underline decoration-[#d9e141]/60"
                  >
                    {author.name}
                  </Link>
                  <span className="text-[11px] bg-white/10 text-[#d9e141] px-2 py-0.5 rounded font-medium">
                    {author.credentials}
                  </span>
                </div>
                {reviewer && (
                  <p className="text-xs text-[#9ca2aa] mt-0.5">
                    Revisão técnica: {reviewer.name} ({reviewer.role})
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[#b8c0cc]">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#d9e141]" aria-hidden="true" />
                <span>
                  Publicado em{" "}
                  <time dateTime={article.publishedAt}>{publishedFormatted}</time>
                </span>
              </span>
              {article.updatedAt !== article.publishedAt && (
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2
                    className="w-3.5 h-3.5 text-[#d9e141]"
                    aria-hidden="true"
                  />
                  <span>
                    Atualizado em{" "}
                    <time dateTime={article.updatedAt}>{updatedFormatted}</time>
                  </span>
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Article Column (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Featured Image */}
            <figure className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-xs">
              <div className="relative aspect-[16/9] w-full bg-[#171c24]">
                <Image
                  src={article.featuredImage.url}
                  alt={article.featuredImage.alt || article.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover"
                />
              </div>
              {article.featuredImage.caption && (
                <figcaption className="px-5 py-3 text-xs text-[#5c6470] bg-gray-50 border-t border-gray-100">
                  {article.featuredImage.caption}
                </figcaption>
              )}
            </figure>

            {/* GEO Direct Answer Summary Box (for AI Search & Quick Reading) */}
            {article.directAnswer && (
              <aside
                aria-label="Resumo Executivo"
                className="bg-white border-l-4 border-[#171c24] rounded-r-xl p-6 shadow-xs"
              >
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#171c24] mb-2">
                  <ShieldCheck className="w-4 h-4 text-[#171c24]" aria-hidden="true" />
                  <span>Síntese Técnica (Resposta Direta)</span>
                </div>
                <p className="text-sm sm:text-base text-[#2b313a] leading-relaxed font-medium">
                  {article.directAnswer}
                </p>
              </aside>
            )}

            {/* Main Article Body */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-10 shadow-xs">
              <div
                className="article-prose max-w-none text-[#2b313a] leading-relaxed space-y-5"
                dangerouslySetInnerHTML={{ __html: article.contentHtml }}
              />

              {/* Tags */}
              {article.tags.length > 0 && (
                <div className="mt-10 pt-6 border-t border-gray-200 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#171c24] mr-1">
                    <Tag className="w-3.5 h-3.5" aria-hidden="true" />
                    Assuntos:
                  </span>
                  {article.tags.map((tagSlug) => (
                    <Link
                      key={tagSlug}
                      href={`/tag/${tagSlug}/`}
                      className="px-3 py-1 rounded-full bg-[#f4f6f8] hover:bg-[#171c24] hover:text-[#d9e141] text-xs font-medium text-[#4a525d] transition-colors"
                    >
                      #{tagSlug}
                    </Link>
                  ))}
                </div>
              )}

              {/* Social Sharing */}
              <div className="mt-6 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#5c6470]">
                  <Share2 className="w-4 h-4" aria-hidden="true" />
                  Compartilhar este artigo com o Conselho:
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={`https://api.whatsapp.com/send?text=${shareTitle}%20-%20${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded bg-[#25D366]/15 text-[#128C7E] hover:bg-[#25D366] hover:text-white text-xs font-bold transition-colors"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded bg-blue-50 text-blue-800 hover:bg-blue-700 hover:text-white text-xs font-bold transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded bg-indigo-50 text-indigo-800 hover:bg-indigo-700 hover:text-white text-xs font-bold transition-colors"
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </div>

            {/* FAQ Section (Structured for Readers & Schema.org FAQPage) */}
            {article.faq && article.faq.length > 0 && (
              <section
                aria-labelledby="faq-heading"
                className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-xs"
              >
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#171c24] mb-2">
                  <HelpCircle className="w-4 h-4 text-[#171c24]" aria-hidden="true" />
                  <span>Dúvidas Frequentes dos Condôminos e Conselheiros</span>
                </div>
                <h2
                  id="faq-heading"
                  className="font-heading text-2xl font-bold text-[#171c24] mb-6"
                >
                  Perguntas e Respostas sobre o Tema
                </h2>
                <div className="divide-y divide-gray-200">
                  {article.faq.map((item, idx) => (
                    <div key={idx} className="py-4 first:pt-0 last:pb-0">
                      <h3 className="font-heading text-lg font-bold text-[#171c24]">
                        {item.question}
                      </h3>
                      <p className="mt-2 text-sm sm:text-base text-[#4a525d] leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Legal & Technical References */}
            {article.references && article.references.length > 0 && (
              <section
                aria-labelledby="references-heading"
                className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-xs"
              >
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#171c24] mb-3">
                  <BookOpen className="w-4 h-4" aria-hidden="true" />
                  <span>Fontes Legais e Normativas Consultadas</span>
                </div>
                <h2
                  id="references-heading"
                  className="font-heading text-lg font-bold text-[#171c24] mb-4"
                >
                  Embasamento Jurídico e Técnico
                </h2>
                <ul className="space-y-2 text-sm text-[#4a525d]">
                  {article.references.map((ref, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="font-bold text-[#171c24]">•</span>
                      <div>
                        <span className="font-semibold text-[#171c24]">
                          {ref.title}
                        </span>{" "}
                       , <span>{ref.publisher}</span>
                        {ref.url && (
                          <>
                            {" "}
                            <a
                              href={ref.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:underline ml-1"
                            >
                              <span>Consultar fonte oficial</span>
                              <ExternalLink className="w-3 h-3" aria-hidden="true" />
                            </a>
                          </>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Commercial Call-to-Action Box */}
            <section
              aria-label="Solicitar diagnóstico condominial"
              className="bg-[#171c24] text-white rounded-xl p-7 sm:p-9 shadow-lg border border-white/10"
            >
              <span className="inline-block bg-[#d9e141] text-[#171c24] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded mb-3">
                Atendimento Especializado no Rio de Janeiro
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                {article.cta.heading}
              </h2>
              <p className="mt-3 text-[#d0d6df] text-sm sm:text-base leading-relaxed">
                {article.cta.description}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Link
                  href={article.cta.buttonHref}
                  className="inline-flex items-center gap-2 bg-[#d9e141] hover:bg-[#c5cd32] text-[#171c24] font-bold text-sm px-6 py-3.5 rounded-md transition-colors"
                >
                  <PhoneCall className="w-4 h-4" aria-hidden="true" />
                  <span>{article.cta.buttonLabel}</span>
                </Link>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5b] text-white font-bold text-sm px-6 py-3.5 rounded-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>Falar pelo WhatsApp</span>
                </a>
              </div>
            </section>

            {/* Author Box (E-E-A-T) */}
            <section
              aria-label="Sobre o Autor"
              className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-start gap-5"
            >
              <div className="w-16 h-16 rounded-full bg-[#171c24] text-[#d9e141] flex items-center justify-center font-heading text-2xl font-bold shrink-0">
                AT
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#5c6470]">
                  Responsável Técnico e Autor
                </span>
                <h3 className="font-heading text-xl font-bold text-[#171c24] mt-0.5">
                  <Link href={`/author/${author.slug}/`} className="hover:underline">
                    {author.name}
                  </Link>
                </h3>
                <p className="text-xs font-semibold text-[#171c24] bg-[#d9e141]/40 inline-block px-2.5 py-0.5 rounded mt-1">
                  {author.role} • {author.credentials}
                </p>
                <p className="mt-3 text-sm text-[#4a525d] leading-relaxed">
                  {author.bio}
                </p>
              </div>
            </section>
          </div>

          {/* Sidebar Column (4 cols) */}
          <aside className="lg:col-span-4 space-y-7">
            {/* Institutional Credentials Card */}
            <div className="bg-[#171c24] text-white rounded-xl p-6 border border-white/10 shadow-md">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#d9e141]">
                Sindicância Profissional RJ
              </span>
              <h2 className="font-heading text-xl font-bold text-white mt-1">
                Por que condomínios na Zona Sul do Rio escolhem o Síndico Né!?
              </h2>
              <ul className="mt-4 space-y-3 text-xs sm:text-sm text-[#d0d6df]">
                <li className="flex items-start gap-2">
                  <CheckCircle2
                    className="w-4 h-4 text-[#d9e141] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>
                    Registro ativo no <strong>CRA-RJ ({SITE_CONFIG.credentials.craRj})</strong>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2
                    className="w-4 h-4 text-[#d9e141] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>
                    Seguro RCP PJ Tokio Marine (<strong>R$ 1.000.000,00</strong>) e
                    RCP PF Akad Seguros (<strong>R$ 1.000.000,00</strong>)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2
                    className="w-4 h-4 text-[#d9e141] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>
                    Sede própria em <strong>Copacabana</strong> e atendimento de emergências 24h
                  </span>
                </li>
              </ul>
              <Link
                href="/contato/"
                className="mt-6 w-full inline-flex items-center justify-center bg-[#d9e141] hover:bg-[#c5cd32] text-[#171c24] font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-md transition-colors"
              >
                Agendar Reunião com o Conselho
              </Link>
            </div>

            {/* Related Services / Case Studies */}
            {relatedServices.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#171c24] mb-4">
                  <Building2 className="w-4 h-4" aria-hidden="true" />
                  <span>Serviços e Casos Reais Relacionados</span>
                </div>
                <div className="space-y-4">
                  {relatedServices.map((srv) => (
                    <Link
                      key={srv.slug}
                      href={`/servico-item/${srv.slug}/`}
                      className="block group p-3.5 rounded-lg bg-[#f8f9fa] hover:bg-[#171c24] transition-colors border border-gray-200/70"
                    >
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#5c6470] group-hover:text-[#d9e141]">
                        {srv.serviceTypeName}
                      </span>
                      <h3 className="font-heading text-base font-bold text-[#171c24] group-hover:text-white mt-0.5">
                        {srv.title}: {srv.subtitle}
                      </h3>
                      <p className="text-xs text-[#5c6470] group-hover:text-[#c2c7ce] mt-1 line-clamp-2">
                        {srv.excerpt}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Categories Directory */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs">
              <h2 className="font-heading text-lg font-bold text-[#171c24] mb-3">
                Editorias de Notícias e Eventos
              </h2>
              <ul className="divide-y divide-gray-100 text-sm">
                {EDITORIAL_CATEGORIES.filter((c) => c.slug !== "noticias").map(
                  (cat) => (
                    <li key={cat.slug}>
                      <Link
                        href={`/category/${cat.slug}/`}
                        className="py-2.5 flex items-center justify-between text-[#4a525d] hover:text-[#171c24] font-medium"
                      >
                        <span>{cat.name}</span>
                        <span className="text-xs text-gray-400">→</span>
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          </aside>
        </div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <section
            aria-labelledby="related-articles-heading"
            className="mt-16 pt-12 border-t border-gray-200"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#171c24] bg-[#d9e141] px-2.5 py-1 rounded">
                  Leitura Complementar
                </span>
                <h2
                  id="related-articles-heading"
                  className="font-heading text-2xl sm:text-3xl font-bold text-[#171c24] mt-2"
                >
                  Artigos Relacionados por Assunto
                </h2>
              </div>
              <Link
                href="/noticias-e-eventos/"
                className="text-sm font-bold text-[#171c24] hover:underline"
              >
                Ver todos os artigos →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {relatedArticles.map((rel) => (
                <ArticleCard key={rel.id} article={rel} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
