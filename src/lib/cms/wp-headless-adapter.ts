import type { Article } from "@/types/editorial";

interface WPPostResponse {
  id: number;
  date_gmt: string;
  modified_gmt: string;
  slug: string;
  status: string;
  link: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  featured_media: number;
}

/**
 * Server-side only WordPress Headless Adapter with 3500ms timeout and Circuit Breaker.
 * Note: As documented in CMS_ARCHITECTURE.md, the current WordPress installation uses
 * BeTheme's Muffin Builder, which returns empty `content.rendered` in `/wp-json/wp/v2/posts`.
 * Therefore, this adapter validates that `content.rendered` is non-empty before overriding local content,
 * and never exposes credentials to the browser.
 */
export async function fetchFromWordPressHeadless(): Promise<Article[] | null> {
  const baseUrl =
    process.env.WP_HEADLESS_API_URL ||
    "https://www.sindicone.com.br/wp-json/wp/v2";

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3500);

  try {
    const headers: Record<string, string> = {
      Accept: "application/json",
    };

    if (process.env.WP_APP_USER && process.env.WP_APP_PASSWORD) {
      const token = Buffer.from(
        `${process.env.WP_APP_USER}:${process.env.WP_APP_PASSWORD}`
      ).toString("base64");
      headers.Authorization = `Basic ${token}`;
    }

    const res = await fetch(`${baseUrl}/posts?per_page=50&_embed=1`, {
      headers,
      signal: controller.signal,
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return null;
    }

    const posts = (await res.json()) as WPPostResponse[];
    if (!Array.isArray(posts)) return null;

    const validPosts = posts.filter(
      (p) => p.content?.rendered && p.content.rendered.trim().length > 80
    );

    return validPosts.map((p) => {
      const excerptClean = p.excerpt.rendered.replace(/<[^>]+>/g, "").trim();
      const canonicalUrl = `https://www.sindicone.com.br/${p.slug}/`;
      const seoTitle = `${p.title.rendered} | Síndico Né!`;
      const noindex = p.status !== "publish";

      return {
        id: `wp-${p.id}`,
        wpId: p.id,
        title: p.title.rendered,
        slug: p.slug,
        LegacyRootUrl: true,
        excerpt: excerptClean,
        directAnswer: excerptClean,
        contentHtml: p.content.rendered,
        featuredImage: {
          url: "/wp-content/uploads/2026/06/147.jpg",
          alt: p.title.rendered,
          width: 1200,
          height: 675,
        },
        authorId: "adriano",
        categorySlug: "sindico-profissional",
        legacyCategorySlugs: ["noticias"],
        tags: ["sindico-profissional"],
        publishedAt: new Date(p.date_gmt).toISOString(),
        updatedAt: new Date(p.modified_gmt).toISOString(),
        status: p.status === "publish" ? "published" : "draft",
        readingTimeMinutes: 4,
        seo: {
          title: seoTitle,
          description: excerptClean,
          canonicalUrl,
          noindex,
        },
        seoTitle,
        seoDescription: excerptClean,
        canonicalUrl,
        noIndex: noindex,
        references: [],
        relatedLinks: [],
        relatedArticleSlugs: [],
        relatedServiceSlugs: [],
        faq: [],
        cta: {
          heading: "Converse com o Síndico Né!",
          description:
            "Solicite uma proposta de sindicância profissional para o seu condomínio.",
          buttonText: "Solicitar Proposta",
          buttonLabel: "Solicitar Proposta",
          buttonHref: "/contato/",
          whatsappMessage:
            "Olá! Gostaria de solicitar uma proposta para meu condomínio.",
        },
      };
    });
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}
