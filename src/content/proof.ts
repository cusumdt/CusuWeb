/**
 * The credibility band on the home page.
 *
 * Its job is to make the profile legible in about three seconds, before anyone
 * reads a paragraph. Everything here traces to `docs/CONTENT.md`: these are the
 * only clients that may be named and the only numbers with a source. Do not add
 * a figure that is not in that file, and do not round one up.
 *
 * Clients and licensed IPs are separate on purpose. Mercedes-Benz, Disney,
 * Chevrolet and Toyota commissioned or employed the work. SpongeBob, Invader
 * Zim and Tower of God are properties he built games on; Nickelodeon never
 * hired him. Listing them together would claim a relationship that does not
 * exist, and it is the kind of overstatement a recruiter checks.
 */

export const clients = ["Mercedes-Benz", "Disney", "Chevrolet", "Toyota"] as const;

export const licensedIps = ["SpongeBob SquarePants", "Invader Zim", "Tower of God"] as const;

export const metrics: { value: string; label: string }[] = [
  {
    value: "9+",
    label: "years bridging engine code and 3D art",
  },
  {
    value: "6",
    label: "artists directed on a Disney education platform",
  },
  {
    value: "60fps",
    label: "held on mid-range mobile without losing the licensed look",
  },
  {
    value: "100k",
    label: "polygons packed in under a second by TexelPack",
  },
];
