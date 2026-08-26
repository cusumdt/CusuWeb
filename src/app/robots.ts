import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Internal design reference, not content.
      disallow: ["/styleguide"],
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
