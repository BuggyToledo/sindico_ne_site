import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight, UserCheck } from "lucide-react";
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

  return (
    <article className="group bg-white rounded-xl border border-gray-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col h-full">
      <Link
        href={href}
        className="relative block aspect-[16/9] overflow-hidden bg-[#171c24]"
      >
        <Image
          src={article.featuredImage.url}
          alt={article.featuredImage.alt || article.title}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 bg-[#171c24]/90 backdrop-blur-xs text-[#d9e141] text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
          {category.name}
        </span>
      </Link>

      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#68707c] mb-3">
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#171c24]" aria-hidden="true" />
              <time dateTime={article.publishedAt}>{formattedDate}</time>
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#171c24]" aria-hidden="true" />
              <span>{article.readingTimeMinutes} min de leitura</span>
            </span>
          </div>

          <h2 className="font-heading text-xl font-bold text-[#171c24] group-hover:text-[#2a3442] leading-snug line-clamp-2">
            <Link href={href} className="hover:underline decoration-[#d9e141] decoration-2">
              {article.title}
            </Link>
          </h2>

          <p className="mt-2.5 text-sm text-[#5c6470] leading-relaxed line-clamp-3">
            {article.excerpt}
          </p>
        </div>

        <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
          <Link
            href={`/author/${author.slug}/`}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#4a525d] hover:text-[#171c24]"
          >
            <UserCheck className="w-3.5 h-3.5 text-[#171c24]" aria-hidden="true" />
            <span>{author.name}</span>
          </Link>

          <Link
            href={href}
            className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#171c24] group-hover:translate-x-0.5 transition-transform"
          >
            <span>Ler artigo</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#171c24]" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
