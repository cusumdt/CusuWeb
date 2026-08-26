export type Discipline =
  | "engine"
  | "technical-art"
  | "3d-art"
  | "web-3d"
  | "tooling"
  | "art-direction";

export type MediaKind = "image" | "video";

export interface Media {
  kind: MediaKind;
  /** Path under /public, e.g. /work/spongebob-kart/01-secret-map.avif */
  src: string;
  /** Poster frame, videos only */
  poster?: string;
  /** Describes the content of the asset, not the medium. Required. */
  alt: string;
  width: number;
  height: number;
  /** base64 blur placeholder produced by scripts/optimize-media.mjs */
  blurDataURL?: string;
  /** Renders full-bleed instead of inside the figure grid */
  feature?: boolean;
  caption?: string;
}

export interface Project {
  slug: string;
  title: string;
  /** One line under the title in listings */
  tagline: string;
  client: string;
  studio?: string;
  year: string;
  /** Platform / target, e.g. "PC VR (Unreal Engine 5)" */
  platform: string;
  role: string;
  disciplines: Discipline[];
  stack: string[];
  /** Ordered narrative body. See content-copy agent for the required shape. */
  summary: string;
  constraint?: string;
  contribution?: string[];
  outcome?: string;
  cover: Media;
  media: Media[];
  featured: boolean;
  /** Hidden from listings while assets or copy are still missing */
  draft?: boolean;
  links?: { label: string; href: string }[];
}

export interface Role {
  company: string;
  title: string;
  location: string;
  start: string;
  end: string | "Present";
  current?: boolean;
  summary: string;
  highlights: string[];
  clients?: string[];
  stack?: string[];
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface Tool {
  name: string;
  tagline: string;
  description: string;
  marketplace: string;
  href?: string;
  status: "released" | "in-development";
}
