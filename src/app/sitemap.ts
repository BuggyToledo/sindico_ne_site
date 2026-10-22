import type { MetadataRoute } from "next";
import { SITE_CONFIG, EDITORIAL_CATEGORIES, EDITORIAL_TAGS } from "@/data/site-config";
import { SERVICE_CASES, SERVICE_TYPES } from "@/data/services";
import { getAllArticles } from "@/lib/cms/store";

/**
 * Generates clean, canonical XML Sitemap (`/sitemap.xml`).
 * Explicitly excludes drafts, scheduled posts, noIndex pages, and thin non-indexable tags.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url;
  const now = new Date();

  const publishedArticles = (
    await getAllArticles({ includeUnpublished: false })
  ).filter((a) => !a.noIndex);

  // 1. Core Institutional & Hub Pages
  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/sindico-profissional-na-zona-sul-do-rj/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/servicos-sindico-profissional/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/noticias-e-eventos/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contato/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/author/adriano/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/politica-de-privacidade/`,
      lastModified: new Date("2025-01-15"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // 2. Published Articles (using their canonical URLs, preserving root slugs for original posts)
  const articleEntries: MetadataRoute.Sitemap = publishedArticles.map((art) => {
    const canonical = art.canonicalUrl || art.seo.canonicalUrl;
    return {
      url: canonical.startsWith("http") ? canonical : `${baseUrl}${canonical}`,
      lastModified: new Date(art.updatedAt || art.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    };
  });

  // 3. Service Case Studies (`/servico-item/[slug]/`)
  const serviceCaseEntries: MetadataRoute.Sitemap = SERVICE_CASES.map((srv) => ({
    url: `${baseUrl}/servico-item/${srv.slug}/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // 4. Service Types (`/servico-tipo/[slug]/`)
  const serviceTypeEntries: MetadataRoute.Sitemap = SERVICE_TYPES.map((st) => ({
    url: `${baseUrl}/servico-tipo/${st.slug}/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // 5. Editorial Categories (`/category/[slug]/` + `/category/noticias/`)
  const categoryEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/category/noticias/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...EDITORIAL_CATEGORIES.filter((c) => c.slug !== "noticias").map((cat) => ({
      url: `${baseUrl}/category/${cat.slug}/`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),
  ];

  // 6. Strategic Indexable Tags only (excluding thin 1-post tags from sitemap)
  const indexableTagEntries: MetadataRoute.Sitemap = EDITORIAL_TAGS.filter(
    (t) => t.indexable
  ).map((tag) => ({
    url: `${baseUrl}/tag/${tag.slug}/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...staticEntries,
    ...articleEntries,
    ...serviceCaseEntries,
    ...serviceTypeEntries,
    ...categoryEntries,
    ...indexableTagEntries,
  ];
}
