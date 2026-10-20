import type { Article, Author, ServiceCaseStudy } from "@/types/editorial";
import { SITE_CONFIG } from "@/data/site-config";

/**
 * Generates Organization + LocalBusiness + ProfessionalService JSON-LD
 * with verified CRA-RJ, CRECI-J, Copacabana coordinates, and Areas Served.
 */
export function buildLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["ProfessionalService", "LocalBusiness", "RealEstateAgent"],
        "@id": `${SITE_CONFIG.url}/#organization`,
        name: SITE_CONFIG.legalName,
        alternateName: SITE_CONFIG.name,
        url: `${SITE_CONFIG.url}/`,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_CONFIG.url}${SITE_CONFIG.logoUrl}`,
          width: 300,
          height: 85,
        },
        image: `${SITE_CONFIG.url}${SITE_CONFIG.defaultOgImage}`,
        description: SITE_CONFIG.description,
        telephone: SITE_CONFIG.contact.phoneInternational,
        email: SITE_CONFIG.contact.email,
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          streetAddress: `${SITE_CONFIG.address.street}, ${SITE_CONFIG.address.complement}`,
          addressLocality: SITE_CONFIG.address.city,
          addressRegion: SITE_CONFIG.address.state,
          postalCode: SITE_CONFIG.address.postalCode,
          addressCountry: SITE_CONFIG.address.country,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: SITE_CONFIG.geo.latitude,
          longitude: SITE_CONFIG.geo.longitude,
        },
        hasMap: SITE_CONFIG.geo.googleMapsUrl,
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "17:00",
          },
        ],
        sameAs: [
          SITE_CONFIG.social.instagram,
          SITE_CONFIG.social.facebook,
          SITE_CONFIG.social.youtube,
        ],
        founder: {
          "@type": "Person",
          "@id": `${SITE_CONFIG.url}/author/adriano/#person`,
          name: SITE_CONFIG.credentials.founder,
          jobTitle: SITE_CONFIG.credentials.founderRole,
          url: `${SITE_CONFIG.url}/author/adriano/`,
        },
        identifier: [
          {
            "@type": "PropertyValue",
            name: "CRA-RJ",
            value: SITE_CONFIG.credentials.craRj,
          },
          {
            "@type": "PropertyValue",
            name: "CRECI-J",
            value: SITE_CONFIG.credentials.creciJ,
          },
        ],
        areaServed: SITE_CONFIG.areasServed.map((area) => ({
          "@type": "Place",
          name: `${area}, Rio de Janeiro - RJ`,
        })),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_CONFIG.url}/#website`,
        url: `${SITE_CONFIG.url}/`,
        name: SITE_CONFIG.name,
        description: SITE_CONFIG.description,
        publisher: {
          "@id": `${SITE_CONFIG.url}/#organization`,
        },
        inLanguage: "pt-BR",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_CONFIG.url}/blog/?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };
}

export function buildBreadcrumbJsonLd(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url.startsWith("http")
        ? item.url
        : `${SITE_CONFIG.url}${item.url.startsWith("/") ? item.url : `/${item.url}`}`,
    })),
  };
}

export function buildArticleJsonLd(article: Article, author: Author) {
  const rawCanonical = article.canonicalUrl || article.seo.canonicalUrl;
  const canonical = rawCanonical.startsWith("http")
    ? rawCanonical
    : `${SITE_CONFIG.url}${rawCanonical}`;

  const imageUrl = article.featuredImage.url.startsWith("http")
    ? article.featuredImage.url
    : `${SITE_CONFIG.url}${article.featuredImage.url}`;

  const graph: Record<string, unknown>[] = [
    {
      "@type": "BlogPosting",
      "@id": `${canonical}#article`,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": canonical,
      },
      headline: article.title,
      description: article.seoDescription || article.excerpt,
      abstract: article.directAnswer,
      image: [imageUrl],
      datePublished: article.publishedAt,
      dateModified: article.updatedAt,
      inLanguage: "pt-BR",
      timeRequired: `PT${article.readingTimeMinutes}M`,
      author: {
        "@type": "Person",
        "@id": `${SITE_CONFIG.url}/author/${author.slug}/#person`,
        name: author.name,
        jobTitle: author.role,
        url: `${SITE_CONFIG.url}/author/${author.slug}/`,
        identifier: author.credentials,
      },
      publisher: {
        "@id": `${SITE_CONFIG.url}/#organization`,
        name: SITE_CONFIG.name,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_CONFIG.url}${SITE_CONFIG.logoUrl}`,
        },
      },
      keywords: article.tags.join(", "),
      citation: article.references.map((ref) => ({
        "@type": "CreativeWork",
        name: ref.title,
        publisher: ref.publisher,
        ...(ref.url ? { url: ref.url } : {}),
      })),
    },
  ];

  if (article.faq && article.faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${canonical}#faq`,
      mainEntity: article.faq.map((q) => ({
        "@type": "Question",
        name: q.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: q.answer,
        },
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export function buildServiceCaseJsonLd(service: ServiceCaseStudy) {
  const canonical = `${SITE_CONFIG.url}/servico-item/${service.slug}/`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonical}#service`,
    name: `${service.title} — ${service.subtitle}`,
    description: service.seoDescription,
    provider: {
      "@id": `${SITE_CONFIG.url}/#organization`,
    },
    areaServed: {
      "@type": "City",
      name: "Rio de Janeiro",
    },
    serviceType: service.serviceTypeName,
    url: canonical,
    image: `${SITE_CONFIG.url}${service.featuredImage.url}`,
  };
}

export function buildAuthorJsonLd(author: Author) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      "@id": `${SITE_CONFIG.url}/author/${author.slug}/#person`,
      name: author.name,
      jobTitle: author.role,
      description: author.bio,
      image: `${SITE_CONFIG.url}${author.avatarUrl}`,
      url: `${SITE_CONFIG.url}/author/${author.slug}/`,
      worksFor: {
        "@id": `${SITE_CONFIG.url}/#organization`,
      },
      knowsAbout: [
        "Sindicância Profissional",
        "Administração de Condomínios",
        "Código Civil Art. 1.348",
        "Gestão Financeira Condominial",
        "Manutenção Predial e Autovistoria RJ",
        "Implantação de Condomínios",
      ],
    },
  };
}
