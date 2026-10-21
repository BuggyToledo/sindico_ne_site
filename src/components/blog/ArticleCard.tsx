import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/types/editorial";
import { EDITORIAL_CATEGORIES, AUTHORS } from "@/data/site-config";

interface ArticleCardProps {
  article: Article;
  preferBlogPath?: boolean;
  priority?: boolean;
}

export function ArticleCard({
  article,
  preferBlogPath = false,
  priority = false,
}: ArticleCardProps) {
  const category =
    EDITORIAL_CATEGORIES.find((c) => c.slug === article.categorySlug) ??
    EDITORIAL_CATEGORIES[0];
  const author = AUTHORS[article.authorId] ?? AUTHORS["adriano-toledo"];

  // Preserve original root URLs by default or link to /blog/[slug]/ when inside the /blog/ experience
  const href =
    preferBlogPath || !article.LegacyRootUrl
      ? `/blog/${article.slug}/`
      : `/${article.slug}/`;

  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(article.publishedAt));

  const initials = author.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <article className="group bg-white rounded-2xl border border-[#e2e8f0] shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between h-full hover:-translate-y-1">
      <div>
        <Link
          href={href}
          className="relative block h-52 w-full overflow-hidden bg-[#131b2e]"
        >
          <Image
            src={article.featuredImage.url}
            alt={article.featuredImage.alt || article.title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4 right-4">
            <span className="inline-block px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#0051d5] font-bold text-[10px] uppercase tracking-[0.06em] shadow-xs">
              {category.name}
            </span>
          </div>
        </Link>

        <div className="p-6">
          <div className="flex items-center gap-2 text-[#45464d] font-bold text-[11px] uppercase tracking-[0.04em] mb-3">
            <span
              className="material-symbols-outlined text-[14px] text-[#0051d5]"
              aria-hidden="true"
            >
              calendar_today
            </span>
            <time dateTime={article.publishedAt}>{formattedDate}</time>
            <span>•</span>
            <span
              className="material-symbols-outlined text-[14px] text-[#0051d5]"
              aria-hidden="true"
            >
              timer
            </span>
            <span>{article.readingTimeMinutes} min de leitura</span>
          </div>

          <h3 className="text-[18px] leading-[26px] font-bold text-[#0b1c30] mb-3 group-hover:text-[#0051d5] transition-colors line-clamp-2">
            <Link href={href}>{article.title}</Link>
          </h3>

          <p className="text-[15px] text-[#45464d] line-clamp-3 mb-4 leading-relaxed">
            {article.excerpt}
          </p>
        </div>
      </div>

      <div className="px-6 pb-6 pt-3 flex items-center justify-between border-t border-[#dce9ff]/80">
        <Link
          href={`/author/${author.slug}/`}
          className="flex items-center gap-2 group/author"
        >
          <div className="w-7 h-7 rounded-full bg-[#131b2e] flex items-center justify-center text-white font-bold text-[11px]">
            {initials}
          </div>
          <span className="font-semibold text-[12px] text-[#0b1c30] group-hover/author:text-[#0051d5] transition-colors">
            {author.name}
          </span>
        </Link>

        <Link
          href={href}
          className="font-semibold text-[13px] text-[#0051d5] inline-flex items-center gap-1 hover:underline"
        >
          <span>Ler artigo</span>
          <span
            className="material-symbols-outlined text-[16px]"
            aria-hidden="true"
          >
            arrow_right_alt
          </span>
        </Link>
      </div>
    </article>
  );
}
