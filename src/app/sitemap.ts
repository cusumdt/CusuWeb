import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { publishedProjects } from "@/content/projects";

/**
 * Generated from the same content modules the pages read, so it cannot drift.
 * /styleguide is an internal reference and is deliberately absent.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/work", priority: 0.9 },
    { path: "/tools", priority: 0.8 },
    { path: "/about", priority: 0.8 },
    { path: "/contact", priority: 0.5 },
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: `${site.url}${r.path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: r.priority,
    })),
    ...publishedProjects.map((p) => ({
      url: `${site.url}/work/${p.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: p.featured ? 0.8 : 0.6,
    })),
  ];
}
