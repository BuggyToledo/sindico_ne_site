import { NextResponse } from "next/server";
import { SITE_CONFIG } from "@/data/site-config";
import { getAllArticles } from "@/lib/cms/store";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const articles = await getAllArticles({ includeUnpublished: false });

  const itemsXml = articles
    .map((art) => {
      const link = art.canonicalUrl || art.seo.canonicalUrl;
      return `
    <item>
      <title>${escapeXml(art.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${new Date(art.publishedAt).toUTCString()}</pubDate>
      <description>${escapeXml(art.excerpt)}</description>
    </item>`;
    })
    .join("\n");

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_CONFIG.defaultTitle)}</title>
    <link>${SITE_CONFIG.url}/</link>
    <description>${escapeXml(SITE_CONFIG.description)}</description>
    <language>pt-BR</language>
    <atom:link href="${SITE_CONFIG.url}/feed/" rel="self" type="application/rss+xml" />
    ${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(rssXml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
