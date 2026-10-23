"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, X, FolderOpen, Tag as TagIcon, FileQuestion } from "lucide-react";
import type { Article, ArticleCategory, ArticleTag } from "@/types/editorial";
import { ArticleCard } from "./ArticleCard";

interface BlogSearchAndFilterProps {
  initialArticles: Article[];
  allArticlesForSearch: Article[];
  categories: Array<ArticleCategory & { count: number }>;
  tags: Array<ArticleTag & { count: number }>;
  activeCategorySlug?: string;
  activeTagSlug?: string;
  initialQuery?: string;
}

export function BlogSearchAndFilter({
  initialArticles,
  allArticlesForSearch,
  categories,
  tags,
  activeCategorySlug,
  activeTagSlug,
  initialQuery = "",
}: BlogSearchAndFilterProps) {
  const [query, setQuery] = useState(initialQuery);

  const filteredArticles = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return initialArticles;
    return allArticlesForSearch.filter(
      (a) =>
        a.title.toLowerCase().includes(trimmed) ||
        a.excerpt.toLowerCase().includes(trimmed) ||
        a.contentHtml.toLowerCase().includes(trimmed) ||
        a.tags.some((t) => t.toLowerCase().includes(trimmed))
    );
  }, [query, initialArticles, allArticlesForSearch]);

  const indexableTags = tags.filter((t) => t.indexable && t.count > 0);

  return (
    <div className="space-y-8">
      {/* Search Bar & Category Pills */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6 shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <label htmlFor="blog-search-input" className="sr-only">
              Pesquisar artigos no blog
            </label>
            <Search
              className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="blog-search-input"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por tema (ex.: Código Civil 1.348, assembleia virtual, incêndio, implantação)..."
              className="w-full pl-11 pr-10 py-3 rounded-lg border border-gray-300 text-sm text-[#171c24] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#171c24] focus:border-transparent"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Limpar busca"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#171c24]"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>

          <div className="text-xs text-[#5c6470] shrink-0">
            Exibindo{" "}
            <strong className="text-[#171c24]">{filteredArticles.length}</strong>{" "}
            {filteredArticles.length === 1 ? "artigo técnico" : "artigos técnicos"}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#171c24] mr-1 shrink-0">
            <FolderOpen className="w-3.5 h-3.5 text-[#171c24]" aria-hidden="true" />
            Categorias:
          </span>
          <Link
            href="/noticias-e-eventos/"
            className={`inline-flex items-center min-h-11 px-4 py-2 rounded-full text-[13px] font-semibold transition-colors shrink-0 ${
              !activeCategorySlug && !activeTagSlug
                ? "bg-[#171c24] text-[#d9e141]"
                : "bg-[#f4f6f8] text-[#4a525d] hover:bg-gray-200"
            }`}
          >
            Todas ({allArticlesForSearch.length})
          </Link>
          {categories
            .filter((c) => c.slug !== "noticias")
            .map((cat) => {
              const isActive = activeCategorySlug === cat.slug;
              return (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}/`}
                  className={`inline-flex items-center min-h-11 px-4 py-2 rounded-full text-[13px] font-semibold transition-colors shrink-0 ${
                    isActive
                      ? "bg-[#171c24] text-[#d9e141]"
                      : "bg-[#f4f6f8] text-[#4a525d] hover:bg-gray-200"
                  }`}
                >
                  {cat.name} ({cat.count})
                </Link>
              );
            })}
        </div>

        {/* High-value Tag Pills */}
        {indexableTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-gray-100">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-[#68707c] mr-1">
              <TagIcon className="w-3 h-3" aria-hidden="true" />
              Tópicos frequentes:
            </span>
            {indexableTags.map((tag) => {
              const isActive = activeTagSlug === tag.slug;
              return (
                <Link
                  key={tag.slug}
                  href={`/tag/${tag.slug}/`}
                  className={`px-2.5 py-0.5 rounded text-xs transition-colors ${
                    isActive
                      ? "bg-[#d9e141] text-[#171c24] font-bold"
                      : "bg-gray-100 text-[#5c6470] hover:bg-gray-200"
                  }`}
                >
                  #{tag.name}
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Results or Empty State */}
      {filteredArticles.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center max-w-xl mx-auto my-6">
          <FileQuestion
            className="w-12 h-12 text-[#171c24] mx-auto mb-3 opacity-80"
            aria-hidden="true"
          />
          <h3 className="font-heading text-xl font-bold text-[#171c24]">
            Nenhum artigo encontrado para &ldquo;{query}&rdquo;
          </h3>
          <p className="mt-2 text-sm text-[#5c6470]">
            Tente buscar por termos como &ldquo;síndico profissional&rdquo;, &ldquo;assembleia&rdquo;, &ldquo;incêndio&rdquo; ou &ldquo;implantação&rdquo;.
          </p>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="mt-5 inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-[#171c24] text-[#d9e141] text-xs font-bold uppercase tracking-wider"
          >
            Ver todos os artigos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredArticles.map((article, idx) => (
            <ArticleCard
              key={article.id}
              article={article}
              preferBlogPath={false}
              priority={idx < 2}
            />
          ))}
        </div>
      )}
    </div>
  );
}
