import { site, links } from "@/content/site";
import { skills } from "@/content/skills";
import { experience } from "@/content/experience";
import type { Project } from "@/lib/types";

/**
 * Structured data must describe what is actually on the page. No awards, no
 * ratings, no organizations that do not exist.
 */
function Script({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Serialized from typed content modules, never from user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function PersonJsonLd() {
  const current = experience.find((r) => r.current);

  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "Person",
        name: site.name,
        alternateName: site.alias,
        url: site.url,
        email: site.email,
        jobTitle: "Senior Game Engineer and Technical Artist",
        description: site.description,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Santos",
          addressRegion: "São Paulo",
          addressCountry: "BR",
        },
        worksFor: current
          ? { "@type": "Organization", name: current.company }
          : undefined,
        knowsAbout: skills.flatMap((g) => g.items),
        knowsLanguage: site.languages.map((l) => l.name),
        sameAs: [links.linkedin, links.artstation, links.github],
      }}
    />
  );
}

/**
 * TexelPack only. PreflightKit is unreleased, and marking an unshipped product
 * as a SoftwareApplication would be claiming something that does not exist.
 * No price and no rating here: neither is a fact this repo holds.
 */
export function TexelPackJsonLd() {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "TexelPack",
        applicationCategory: "DesignApplication",
        applicationSubCategory: "Blender add-on",
        operatingSystem: "Windows, macOS, Linux",
        softwareRequirements: "Blender 3.6 LTS, 4.x or 5.x",
        license: "https://spdx.org/licenses/GPL-3.0-or-later.html",
        description:
          "One-click UV packing for Blender with a texel density toolkit built in: four packing algorithms, density normalization against real 3D surface area, and viewport overlays for density and distortion.",
        url: "https://texelpack.vercel.app/",
        downloadUrl: "https://superhivemarket.com/products/texelpack",
        author: { "@type": "Person", name: site.name, url: site.url },
        publisher: { "@type": "Organization", name: "CusuTools" },
      }}
    />
  );
}

export function ProjectJsonLd({ project }: { project: Project }) {
  const hasImage = project.visuals.status === "public" && project.cover;

  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: project.title,
        description: project.metaDescription ?? project.tagline,
        url: `${site.url}/work/${project.slug}`,
        creator: { "@type": "Person", name: site.name, url: site.url },
        // Only claim an image when one is actually published.
        image: hasImage ? `${site.url}${project.cover!.src}` : undefined,
        about: project.disciplines,
        keywords: project.stack.join(", "),
        dateCreated: project.year,
        ...(project.client !== "Independent product"
          ? { sourceOrganization: { "@type": "Organization", name: project.client } }
          : {}),
      }}
    />
  );
}
