import type { MetadataRoute } from "next";

const siteUrl = "https://murphylan.cloud";
// /dpp/console is intentionally absent — internal demo view, see app/robots.ts
const routes = [
  "/",
  "/dpp",
  "/dpp/tools",
  "/products",
  "/products/activity",
  "/worksync",
  "/worksync/workgraph",
  "/enterprise",
  "/apps",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.flatMap((route) => {
    const path = route === "/" ? "" : route;
    return [
      {
        url: `${siteUrl}${path}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: route === "/" ? 1 : 0.8,
      },
      {
        url: `${siteUrl}/en${path}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: route === "/" ? 0.9 : 0.7,
      },
    ];
  });
}
