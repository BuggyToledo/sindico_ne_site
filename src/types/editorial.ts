export type EditorialStatus =
  | "draft"
  | "review"
  | "in_review"
  | "scheduled"
  | "published"
  | "archived";

export type ArticleStatus = EditorialStatus;

export type EditorialRole = "admin" | "editor" | "author";

export interface EditorialUser {
  id: string;
  name: string;
  email: string;
  role: EditorialRole;
}

export type EditorialPillarSlug =
  | "financas-e-orcamento"
  | "manutencao-e-obras"
  | "legislacao-e-governanca"
  | "sindico-profissional"
  | "condominios-no-rio"
  | "gestao-condominial"
  | "noticias";

export interface EditorialAuthor {
  id: string;
  wpUserId?: number;
  name: string;
  slug: string;
  roleTitle: string;
  role?: string;
  credentials: string[];
  bio: string;
  avatarUrl: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    whatsapp?: string;
  };
}

export type Author = EditorialAuthor;

export interface EditorialReference {
  title: string;
  publisher?: string;
  url?: string;
  type?: "legislation" | "institution" | "press" | "technical_norm";
}

export interface EditorialRelatedLink {
  label: string;
  href: string;
  context: "service" | "article" | "institutional";
}

export interface EditorialCTA {
  heading: string;
  description: string;
  buttonText: string;
  buttonLabel?: string;
  buttonHref: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  whatsappMessage?: string;
}

export interface EditorialFAQItem {
  question: string;
  answer: string;
}

export interface EditorialRevision {
  revisionId: string;
  id?: string;
  timestamp: string;
  editorName: string;
  authorEmail?: string;
  editorRole: EditorialRole;
  summary: string;
  previousTitle: string;
  previousStatus: EditorialStatus;
  snapshot?: {
    title: string;
    excerpt: string;
    contentHtml: string;
    status: EditorialStatus;
    seoTitle: string;
    seoDescription: string;
  };
}

export type ArticleRevision = EditorialRevision;

export interface EditorialArticle {
  id: string;
  /** Identificador numérico original do WordPress para reconciliação e auditoria (REGRA 10) */
  wpId?: number;
  wpGuid?: string;
  title: string;
  slug: string;
  LegacyRootUrl?: boolean;
  /** Resumo executivo do artigo (excerpt) */
  excerpt: string;
  /** Resposta objetiva direta à pergunta central para leitores e motores de IA (REGRA 6 e REGRA 8) */
  directAnswer: string;
  /** Conteúdo HTML semântico completo (preservando 100% do texto original + tabelas/listas acessíveis) */
  contentHtml: string;
  featuredImage: {
    url: string;
    alt: string;
    width: number;
    height: number;
    caption?: string;
    wpMediaId?: number;
  };
  galleryImages?: Array<{
    url: string;
    alt: string;
    width: number;
    height: number;
  }>;
  authorId: string;
  technicalReviewerId?: string;
  reviewerId?: string;
  /** Categoria primária / Pilar Editorial */
  categorySlug: EditorialPillarSlug | string;
  /** Compatibilidade histórica com /category/noticias/ do WordPress */
  legacyCategorySlugs?: string[];
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  scheduledFor?: string;
  status: EditorialStatus;
  readingTimeMinutes: number;
  seo: {
    title: string;
    description: string;
    canonicalUrl: string;
    noindex: boolean;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
  };
  // Flattened convenience fields synced automatically by the CMS store
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  social?: {
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    twitterCard?: string;
  };
  references: EditorialReference[];
  relatedLinks?: EditorialRelatedLink[];
  relatedArticleSlugs?: string[];
  relatedServiceSlugs?: string[];
  faq?: EditorialFAQItem[];
  authorCommentary?: {
    authorName: string;
    authorRole: string;
    text: string;
  };
  cta: EditorialCTA;
  likeCount?: number;
  revisions?: EditorialRevision[];
}

export type Article = EditorialArticle;

export interface EditorialCategory {
  slug: EditorialPillarSlug | string;
  name: string;
  shortName: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  commercialTargetHref: string;
  commercialTargetLabel: string;
}

export type ArticleCategory = EditorialCategory;

export interface EditorialTag {
  slug: string;
  name: string;
  description: string;
  wpTagId?: number;
  indexable: boolean;
}

export type ArticleTag = EditorialTag;

export interface ServiceCaseStudy {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  neighborhood: string;
  serviceTypeSlug: string;
  serviceTypeName: string;
  excerpt: string;
  paragraphs: string[];
  results: string[];
  ctaQuestion: string;
  ctaButtonText: string;
  ctaButtonHref: string;
  featuredImage: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  secondaryImage?: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  seo: {
    title: string;
    description: string;
    canonicalUrl: string;
  };
  seoTitle?: string;
  seoDescription?: string;
  contentHtml?: string;
  likeCount: number;
}

export interface ServiceTypeTaxonomy {
  slug: string;
  name: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  relatedCaseSlugs: string[];
  thumbnailUrl: string;
}
