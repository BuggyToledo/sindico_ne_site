import fs from "node:fs";
import path from "node:path";
import type {
  Article,
  ArticleCategory,
  ArticleRevision,
  ArticleStatus,
  ArticleTag,
  Author,
} from "@/types/editorial";
import { INITIAL_ARTICLES } from "@/data/articles-seed";
import {
  AUTHORS,
  EDITORIAL_CATEGORIES,
  EDITORIAL_TAGS,
} from "@/data/site-config";
import { fetchFromWordPressHeadless } from "./wp-headless-adapter";

const CONTENT_DIR = path.join(process.cwd(), "content");
const ARTICLES_FILE = path.join(CONTENT_DIR, "articles.json");

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

  const defaultCanonical = isLegacyRoot
    ? `https://www.sindicone.com.br/${raw.slug}/`
    : `https://www.sindicone.com.br/blog/${raw.slug}/`;

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

/**
 * Ensures the persistent JSON store exists and returns all articles.
 * Implements automatic fallback to INITIAL_ARTICLES if filesystem or external CMS fails
 * (Rule 10: Temporary CMS failure must never take down institutional or public pages).
 */
export function loadAllArticlesSync(): Article[] {
  try {
    if (!fs.existsSync(CONTENT_DIR)) {
      fs.mkdirSync(CONTENT_DIR, { recursive: true });
    }
    const normalizedSeed = INITIAL_ARTICLES.map(normalizeArticle);
    if (!fs.existsSync(ARTICLES_FILE)) {
      fs.writeFileSync(
        ARTICLES_FILE,
        JSON.stringify(normalizedSeed, null, 2),
        "utf-8"
      );
      return normalizedSeed;
    }
    const raw = fs.readFileSync(ARTICLES_FILE, "utf-8");
    const parsed = JSON.parse(raw) as Article[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return normalizedSeed;
    }
    return parsed.map(normalizeArticle);
  } catch (err) {
    console.error(
      "[CMS Store] Fallback ativado — erro ao ler content/articles.json, usando INITIAL_ARTICLES em memória:",
      err
    );
    return INITIAL_ARTICLES.map(normalizeArticle);
  }
}

export function saveAllArticlesSync(articles: Article[]): boolean {
  try {
    if (!fs.existsSync(CONTENT_DIR)) {
      fs.mkdirSync(CONTENT_DIR, { recursive: true });
    }
    fs.writeFileSync(
      ARTICLES_FILE,
      JSON.stringify(articles.map(normalizeArticle), null, 2),
      "utf-8"
    );
    return true;
  } catch (err) {
    console.error("[CMS Store] Erro ao persistir content/articles.json:", err);
    return false;
  }
}

export async function getAllArticles(
  options: { includeUnpublished?: boolean } = {}
): Promise<Article[]> {
  let articles = loadAllArticlesSync();

  if (process.env.CMS_PROVIDER === "wp-headless") {
    try {
      const wpArticles = await fetchFromWordPressHeadless();
      if (wpArticles && wpArticles.length > 0) {
        const bySlug = new Map(articles.map((a) => [a.slug, a]));
        for (const wpArt of wpArticles) {
          if (wpArt.contentHtml && wpArt.contentHtml.trim().length > 80) {
            bySlug.set(wpArt.slug, normalizeArticle(wpArt));
          }
        }
        articles = Array.from(bySlug.values());
      }
    } catch {
      // Circuit breaker fallback: keep local articles seamlessly
    }
  }

  // Promote scheduled articles whose scheduledFor timestamp has passed
  const now = Date.now();
  let updated = false;
  for (const article of articles) {
    if (
      article.status === "scheduled" &&
      article.scheduledFor &&
      new Date(article.scheduledFor).getTime() <= now
    ) {
      article.status = "published";
      article.noIndex = false;
      article.seo.noindex = false;
      updated = true;
    }
  }
  if (updated) {
    saveAllArticlesSync(articles);
  }

  if (!options.includeUnpublished) {
    articles = articles.filter((a) => a.status === "published");
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

export async function createOrUpdateArticle(
  input: Partial<Article> & { title: string; slug: string },
  actorEmail: string,
  summaryNote = "Atualização editorial"
): Promise<Article> {
  const articles = loadAllArticlesSync();
  const nowIso = new Date().toISOString();
  const existingIndex = articles.findIndex(
    (a) => (input.id && a.id === input.id) || a.slug === input.slug
  );

  const sanitizedSlug = input.slug
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (existingIndex >= 0) {
    const prev = articles[existingIndex];
    const revId = `rev-${Date.now()}`;
    const newRevision: ArticleRevision = {
      revisionId: revId,
      id: revId,
      timestamp: nowIso,
      editorName: actorEmail,
      authorEmail: actorEmail,
      editorRole: "admin",
      summary: summaryNote,
      previousTitle: prev.title,
      previousStatus: prev.status,
      snapshot: {
        title: prev.title,
        excerpt: prev.excerpt,
        contentHtml: prev.contentHtml,
        status: prev.status,
        seoTitle: prev.seoTitle || prev.seo.title,
        seoDescription: prev.seoDescription || prev.seo.description,
      },
    };

    const status = input.status ?? prev.status;
    const isDraftOrPrivate = status !== "published";
    const seoTitle = input.seoTitle ?? prev.seoTitle ?? prev.seo.title;
    const seoDescription =
      input.seoDescription ?? prev.seoDescription ?? prev.seo.description;
    const canonicalUrl =
      input.canonicalUrl ?? prev.canonicalUrl ?? prev.seo.canonicalUrl;
    const noIndex = isDraftOrPrivate
      ? true
      : Boolean(input.noIndex ?? prev.noIndex);

    const updated = normalizeArticle({
      ...prev,
      ...input,
      slug: sanitizedSlug || prev.slug,
      updatedAt: nowIso,
      readingTimeMinutes: calculateReadingTimeMinutes(
        input.contentHtml ?? prev.contentHtml
      ),
      seoTitle,
      seoDescription,
      canonicalUrl,
      noIndex,
      seo: {
        ...prev.seo,
        title: seoTitle,
        description: seoDescription,
        canonicalUrl,
        noindex: noIndex,
      },
      revisions: [newRevision, ...(prev.revisions ?? []).slice(0, 19)],
    });

    articles[existingIndex] = updated;
    saveAllArticlesSync(articles);
    return updated;
  }

  const status: ArticleStatus = input.status ?? "draft";
  const canonicalUrl =
    input.canonicalUrl || `https://www.sindicone.com.br/blog/${sanitizedSlug}/`;
  const contentHtml = input.contentHtml ?? "<p>Rascunho em elaboração.</p>";
  const seoTitle = input.seoTitle ?? `${input.title} | Síndico Né!`;
  const seoDescription = input.seoDescription ?? input.excerpt ?? input.title;
  const noIndex = status !== "published" ? true : Boolean(input.noIndex);
  const revId = `rev-${Date.now()}`;

  const created = normalizeArticle({
    id: input.id ?? `post-${Date.now()}`,
    title: input.title,
    slug: sanitizedSlug,
    LegacyRootUrl: input.LegacyRootUrl ?? false,
    excerpt: input.excerpt ?? input.title,
    directAnswer: input.directAnswer ?? input.excerpt ?? input.title,
    contentHtml,
    featuredImage: input.featuredImage ?? {
      url: "/wp-content/uploads/2026/06/147.jpg",
      alt: input.title,
      width: 1200,
      height: 675,
    },
    authorId: input.authorId ?? "adriano",
    reviewerId: input.reviewerId ?? "adriano",
    categorySlug: input.categorySlug ?? "sindico-profissional",
    legacyCategorySlugs: ["noticias"],
    tags: input.tags ?? ["sindico-profissional"],
    publishedAt: input.publishedAt ?? nowIso,
    updatedAt: nowIso,
    scheduledFor: input.scheduledFor,
    status,
    readingTimeMinutes: calculateReadingTimeMinutes(contentHtml),
    seoTitle,
    seoDescription,
    canonicalUrl,
    noIndex,
    seo: {
      title: seoTitle,
      description: seoDescription,
      canonicalUrl,
      noindex: noIndex,
    },
    references: input.references ?? [],
    relatedLinks: input.relatedLinks ?? [],
    relatedArticleSlugs: input.relatedArticleSlugs ?? [],
    relatedServiceSlugs: input.relatedServiceSlugs ?? [],
    faq: input.faq ?? [],
    cta: input.cta ?? {
      heading: "Precisa de apoio profissional na gestão do seu condomínio?",
      description:
        "Converse com a equipe do Síndico Né! e solicite um diagnóstico técnico e financeiro sem compromisso.",
      buttonText: "Solicitar Diagnóstico Condominial",
      buttonLabel: "Solicitar Diagnóstico Condominial",
      buttonHref: "/contato/",
      whatsappMessage: `Olá! Li o artigo "${input.title}" e gostaria de conversar sobre meu condomínio.`,
    },
    revisions: [
      {
        revisionId: revId,
        id: revId,
        timestamp: nowIso,
        editorName: actorEmail,
        authorEmail: actorEmail,
        editorRole: "admin",
        summary: "Criação inicial do artigo",
        previousTitle: input.title,
        previousStatus: status,
        snapshot: {
          title: input.title,
          excerpt: input.excerpt ?? input.title,
          contentHtml,
          status,
          seoTitle,
          seoDescription,
        },
      },
    ],
  });

  articles.unshift(created);
  saveAllArticlesSync(articles);
  return created;
}

export async function deleteArticleById(id: string): Promise<boolean> {
  const articles = loadAllArticlesSync();
  const filtered = articles.filter((a) => a.id !== id);
  if (filtered.length === articles.length) return false;
  saveAllArticlesSync(filtered);
  return true;
}

export async function restoreArticleRevision(
  articleId: string,
  revisionId: string,
  actorEmail: string
): Promise<Article | null> {
  const articles = loadAllArticlesSync();
  const idx = articles.findIndex((a) => a.id === articleId);
  if (idx < 0) return null;

  const article = articles[idx];
  const rev = (article.revisions ?? []).find(
    (r) => r.id === revisionId || r.revisionId === revisionId
  );
  if (!rev || !rev.snapshot) return null;

  return createOrUpdateArticle(
    {
      ...article,
      title: rev.snapshot.title,
      excerpt: rev.snapshot.excerpt,
      contentHtml: rev.snapshot.contentHtml,
      status: rev.snapshot.status,
      seoTitle: rev.snapshot.seoTitle,
      seoDescription: rev.snapshot.seoDescription,
    },
    actorEmail,
    `Restauração da revisão ${revisionId} (${rev.timestamp})`
  );
}
