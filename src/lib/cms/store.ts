import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import type {
  Article,
  ArticleCategory,
  ArticleRevision,
  ArticleStatus,
  ArticleTag,
  Author,
} from "@/types/editorial";
import {
  AUTHORS,
  EDITORIAL_CATEGORIES,
  EDITORIAL_TAGS,
} from "@/data/site-config";

export interface ArticleFilterOptions {
  status?: ArticleStatus | "all";
  categorySlug?: string;
  tagSlug?: string;
  authorId?: string;
  searchQuery?: string;
  page?: number;
  perPage?: number;
  includeNoIndex?: boolean;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

/**
 * Normalizes an EditorialArticle so both nested (`article.seo.title`) and
 * top-level convenience fields (`article.seoTitle`, `article.canonicalUrl`, etc.)
 * are always populated and consistent.
 */
export function normalizeArticle(raw: Article): Article {
  const isLegacyRoot =
    raw.LegacyRootUrl !== undefined
      ? raw.LegacyRootUrl
      : Boolean(raw.wpId);

  const defaultCanonical = `https://www.sindicone.com.br/${raw.slug}/`;

  const seoTitle = raw.seoTitle || raw.seo?.title || `${raw.title} | Síndico Né!`;
  const seoDescription =
    raw.seoDescription || raw.seo?.description || raw.excerpt || raw.title;
  const canonicalUrl =
    raw.canonicalUrl || raw.seo?.canonicalUrl || defaultCanonical;
  const noIndex =
    raw.status !== "published"
      ? true
      : Boolean(raw.noIndex ?? raw.seo?.noindex ?? false);

  const relatedArticleSlugs =
    raw.relatedArticleSlugs ??
    (raw.relatedLinks ?? [])
      .filter((l) => l.context === "article")
      .map((l) => l.href.replace(/^\/blog\/|^\/|\/$/g, ""));

  const relatedServiceSlugs =
    raw.relatedServiceSlugs ??
    (raw.relatedLinks ?? [])
      .filter((l) => l.context === "service")
      .map((l) => l.href.replace(/^\/servico-item\/|^\/|\/$/g, ""));

  const normalizedRevisions: ArticleRevision[] = (raw.revisions ?? []).map(
    (rev) => ({
      ...rev,
      id: rev.id || rev.revisionId,
      authorEmail: rev.authorEmail || rev.editorName,
      snapshot: rev.snapshot ?? {
        title: rev.previousTitle || raw.title,
        excerpt: raw.excerpt,
        contentHtml: raw.contentHtml,
        status: rev.previousStatus || raw.status,
        seoTitle,
        seoDescription,
      },
    })
  );

  return {
    ...raw,
    LegacyRootUrl: isLegacyRoot,
    reviewerId: raw.reviewerId || raw.technicalReviewerId || "adriano",
    seoTitle,
    seoDescription,
    canonicalUrl,
    noIndex,
    seo: {
      title: seoTitle,
      description: seoDescription,
      canonicalUrl,
      noindex: noIndex,
      ogTitle: raw.seo?.ogTitle || raw.social?.ogTitle || seoTitle,
      ogDescription:
        raw.seo?.ogDescription || raw.social?.ogDescription || seoDescription,
      ogImage:
        raw.seo?.ogImage || raw.social?.ogImage || raw.featuredImage.url,
    },
    social: {
      ogTitle: raw.social?.ogTitle || raw.seo?.ogTitle || seoTitle,
      ogDescription:
        raw.social?.ogDescription || raw.seo?.ogDescription || seoDescription,
      ogImage:
        raw.social?.ogImage || raw.seo?.ogImage || raw.featuredImage.url,
      twitterCard: "summary_large_image",
    },
    cta: {
      ...raw.cta,
      buttonText:
        raw.cta?.buttonText ||
        raw.cta?.buttonLabel ||
        "Solicitar Diagnóstico Condominial",
      buttonLabel:
        raw.cta?.buttonLabel ||
        raw.cta?.buttonText ||
        "Solicitar Diagnóstico Condominial",
      buttonHref: raw.cta?.buttonHref || "/contato/",
    },
    relatedArticleSlugs,
    relatedServiceSlugs,
    revisions: normalizedRevisions,
  };
}

/** Pasta com os posts editados pelo Decap CMS (um arquivo .md por post). */
export const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function toIso(value: unknown, fallback: string): string {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString();
  }
  if (typeof value === "string" && value.trim()) return value.trim();
  return fallback;
}

function asStringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((v) => (typeof v === "string" ? v : (v as { value?: string })?.value))
    .filter((v): v is string => typeof v === "string" && v.trim().length > 0)
    .map((v) => v.trim());
}

/**
 * Converte um arquivo .md (frontmatter + corpo) em Article.
 * - bodyFormat "html": corpo HTML original (posts migrados do WordPress), usado sem alteração.
 * - caso contrário: corpo em Markdown, convertido para HTML no build.
 */
export function parsePostFile(fileName: string, source: string): Article {
  const { data, content } = matter(source);
  const fm = data as Record<string, unknown> & Partial<Article>;
  const slug = String(fm.slug || fileName.replace(/\.md$/, "")).trim();
  const bodyFormat = fm.bodyFormat === "html" ? "html" : "markdown";
  const contentHtml =
    bodyFormat === "html"
      ? content.replace(/\n$/, "")
      : (marked.parse(content, { async: false }) as string);
  const nowIso = new Date().toISOString();
  const publishedAt = toIso(fm.publishedAt, nowIso);
  const isDraft = fm.draft === true;
  const title = String(fm.title || slug);
  const image = (fm.featuredImage ?? {}) as Partial<Article["featuredImage"]>;

  return normalizeArticle({
    ...(fm as Article),
    id: String(fm.id || `post-${slug}`),
    title,
    slug,
    LegacyRootUrl: Boolean(fm.legacyRootUrl ?? fm.LegacyRootUrl ?? fm.wpId),
    excerpt: String(fm.excerpt || title),
    directAnswer: String(fm.directAnswer || fm.excerpt || title),
    contentHtml,
    featuredImage: {
      ...image,
      url: image.url || "/wp-content/uploads/2026/06/147.jpg",
      alt: image.alt || title,
      width: Number(image.width) || 1200,
      height: Number(image.height) || 675,
    },
    authorId: String(fm.authorId || "adriano"),
    categorySlug: String(fm.categorySlug || "sindico-profissional"),
    legacyCategorySlugs: fm.legacyCategorySlugs ?? ["noticias"],
    tags: asStringList(fm.tags),
    publishedAt,
    updatedAt: toIso(fm.updatedAt, publishedAt),
    status: isDraft ? "draft" : "published",
    readingTimeMinutes:
      Number(fm.readingTimeMinutes) || calculateReadingTimeMinutes(contentHtml),
    noIndex: Boolean(fm.noIndex),
    references: fm.references ?? [],
    relatedLinks: fm.relatedLinks ?? [],
    faq: (fm.faq ?? []).filter((f) => f && f.question && f.answer),
    cta: fm.cta ?? {
      heading: "Precisa de apoio profissional na gestão do seu condomínio?",
      description:
        "Converse com a equipe do Síndico Né! e solicite um diagnóstico técnico e financeiro sem compromisso.",
      buttonText: "Solicitar Diagnóstico Condominial",
      buttonHref: "/contato/",
      whatsappMessage: `Olá! Li o artigo "${title}" e gostaria de conversar sobre meu condomínio.`,
    },
  });
}

/** Lê todos os posts de content/posts/*.md (no build). */
export function loadAllArticlesSync(): Article[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .sort()
    .map((f) => parsePostFile(f, fs.readFileSync(path.join(POSTS_DIR, f), "utf-8")));
}

/**
 * Publicado = não é rascunho E a data de publicação já passou no momento do build.
 * Post com data futura só aparece depois de um novo build (rebuild agendado).
 */
export function isPubliclyVisible(article: Article, now = Date.now()): boolean {
  return (
    article.status === "published" &&
    new Date(article.publishedAt).getTime() <= now
  );
}

export async function getAllArticles(
  options: { includeUnpublished?: boolean } = {}
): Promise<Article[]> {
  let articles = loadAllArticlesSync();
  if (!options.includeUnpublished) {
    articles = articles.filter((a) => isPubliclyVisible(a));
  }
  return articles.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function queryArticles(
  filter: ArticleFilterOptions = {}
): Promise<PaginatedResult<Article>> {
  const includeUnpublished =
    filter.status !== undefined && filter.status !== "published";
  let items = await getAllArticles({ includeUnpublished });

  if (filter.status && filter.status !== "all") {
    items = items.filter((a) => a.status === filter.status);
  } else if (!filter.status) {
    items = items.filter((a) => a.status === "published");
  }

  if (
    !filter.includeNoIndex &&
    (!filter.status || filter.status === "published")
  ) {
    items = items.filter((a) => !a.noIndex);
  }

  if (filter.categorySlug) {
    items = items.filter(
      (a) =>
        a.categorySlug === filter.categorySlug ||
        (filter.categorySlug === "noticias" && a.status === "published")
    );
  }

  if (filter.tagSlug) {
    items = items.filter((a) => a.tags.includes(filter.tagSlug!));
  }

  if (filter.authorId) {
    items = items.filter(
      (a) =>
        a.authorId === filter.authorId ||
        a.authorId === "adriano" ||
        AUTHORS[a.authorId]?.slug === filter.authorId
    );
  }

  if (filter.searchQuery && filter.searchQuery.trim().length > 0) {
    const q = filter.searchQuery.toLowerCase().trim();
    items = items.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.contentHtml.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  const total = items.length;
  const page = Math.max(1, filter.page ?? 1);
  const perPage = Math.max(1, filter.perPage ?? 6);
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const start = (page - 1) * perPage;
  const pagedItems = items.slice(start, start + perPage);

  return {
    items: pagedItems,
    total,
    page,
    perPage,
    totalPages,
  };
}

export async function getArticleBySlug(
  slug: string,
  options: { allowUnpublished?: boolean } = {}
): Promise<Article | null> {
  const all = await getAllArticles({
    includeUnpublished: options.allowUnpublished ?? false,
  });
  return all.find((a) => a.slug === slug) ?? null;
}

export async function getArticleById(id: string): Promise<Article | null> {
  const all = await getAllArticles({ includeUnpublished: true });
  return all.find((a) => a.id === id) ?? null;
}

export async function getRelatedArticles(
  article: Article,
  limit = 3
): Promise<Article[]> {
  const published = await getAllArticles({ includeUnpublished: false });
  const explicit: Article[] = [];

  for (const relSlug of article.relatedArticleSlugs ?? []) {
    const found = published.find(
      (a) => a.slug === relSlug && a.slug !== article.slug
    );
    if (found && !explicit.some((e) => e.slug === found.slug)) {
      explicit.push(found);
    }
  }

  if (explicit.length >= limit) {
    return explicit.slice(0, limit);
  }

  const remaining = published
    .filter(
      (a) =>
        a.slug !== article.slug && !explicit.some((e) => e.slug === a.slug)
    )
    .map((candidate) => {
      let score = 0;
      if (candidate.categorySlug === article.categorySlug) score += 3;
      for (const t of candidate.tags) {
        if (article.tags.includes(t)) score += 2;
      }
      return { candidate, score };
    })
    .sort((a, b) => b.score - a.score);

  return [
    ...explicit,
    ...remaining.slice(0, limit - explicit.length).map((r) => r.candidate),
  ];
}

export function getCategoriesWithCounts(
  publishedArticles: Article[]
): (ArticleCategory & { count: number })[] {
  return EDITORIAL_CATEGORIES.map((cat) => {
    const count =
      cat.slug === "noticias"
        ? publishedArticles.length
        : publishedArticles.filter((a) => a.categorySlug === cat.slug).length;
    return { ...cat, count };
  });
}

export function getTagsWithCounts(
  publishedArticles: Article[]
): (ArticleTag & { count: number })[] {
  return EDITORIAL_TAGS.map((tag) => {
    const count = publishedArticles.filter((a) =>
      a.tags.includes(tag.slug)
    ).length;
    return { ...tag, count };
  });
}

export function getAuthor(authorIdOrSlug: string): Author {
  if (AUTHORS[authorIdOrSlug]) return AUTHORS[authorIdOrSlug];
  const found = Object.values(AUTHORS).find((a) => a.slug === authorIdOrSlug);
  return found ?? AUTHORS.adriano;
}

export function calculateReadingTimeMinutes(html: string): number {
  const plainText = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const words = plainText ? plainText.split(" ").length : 0;
  return Math.max(1, Math.ceil(words / 180));
}
