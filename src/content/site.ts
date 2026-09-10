export const site = {
  name: "Cristian Cusumano",
  alias: "Cusu",
  role: "Senior Game Engineer · Technical Artist",
  shortRole: "Game Engineer & Technical Artist",
  location: "Santos, São Paulo, Brazil",
  email: "cusumdt@gmail.com",
  phone: "+55 13 9 8192 3786",
  url: "https://cusu-dev.vercel.app",
  description:
    "Senior Game Engineer and Technical Artist, 9+ years bridging code and art. Unreal Engine 5 VR, real-time web 3D and shipped Blender tooling for Mercedes-Benz.",
  availability: "Open to senior engine and technical art roles",
  languages: [
    { name: "Spanish", level: "Native" },
    { name: "Portuguese", level: "Fluent" },
    { name: "English", level: "Professional working" },
  ],
} as const;

/**
 * The home hero image. Cusu's pick: the Invader Zim street he already leads
 * with on LinkedIn.
 *
 * Cropped from the original capture, which was taken in Unity's Scene view and
 * carried the axis gizmo and a "Persp" label in the top right. Shipping an
 * editor screenshot as the first thing a studio sees would undercut the work,
 * so the top 16% is gone. See TASKS 10.6: a clean Game view render would be
 * better still.
 */
export const heroImage = {
  projectSlug: "ohbb-kart-invader-zim",
  credit: "Invader Zim Kart, environment",
  src: "/hero/invader-zim-street.webp",
  alt: "Night street on the Invader Zim track: pink, teal and purple houses with lit windows, a street lamp, and a swirling violet sky overhead.",
  width: 1913,
  height: 741,
} as const;

/** Shot 2026-08-26. The only photograph of Cusu the site publishes. */
export const portrait = {
  src: "/portrait/cusu.webp",
  alt: "Cristian Cusumano, half-smiling and looking off to one side, wearing round glasses and a pale grey t-shirt, lit by a warm rim light against a dark background.",
  width: 896,
  height: 1200,
} as const;

export const links = {
  linkedin: "https://www.linkedin.com/in/cristian-cusumano-524ab1195/",
  artstation: "https://www.artstation.com/cusumdt",
  github: "https://github.com/cusumdt",
  whatsapp: "https://wa.me/5513981923786",
  email: "mailto:cusumdt@gmail.com",
} as const;

export const nav = [
  { label: "Work", href: "/work" },
  { label: "Tools", href: "/tools" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
