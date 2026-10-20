import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/data/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/blog/preview/"],
      },
    ],
    sitemap: [
      `${SITE_CONFIG.url}/sitemap.xml`,
      `${SITE_CONFIG.url}/locations.kml`,
    ],
    host: SITE_CONFIG.url,
  };
}
