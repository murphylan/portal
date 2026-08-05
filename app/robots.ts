import type { MetadataRoute } from "next";

const siteUrl = "https://murphylan.cloud";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Internal operations console — demo data, no public entry point
      disallow: ["/dpp/console", "/en/dpp/console"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
