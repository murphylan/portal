import type { MetadataRoute } from "next";

const siteUrl = "https://murphylan.cloud";
const routes = ["/", "/products", "/products/activity", "/worksync"];

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
