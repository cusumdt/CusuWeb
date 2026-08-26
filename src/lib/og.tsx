import { readFile } from "node:fs/promises";
import path from "node:path";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/** Tokens duplicated here because satori cannot read the CSS custom properties. */
const INK = "#0A0B0D";
const TEXT = "#EDEDF0";
const MUTED = "#9B9DA6";
const ACCENT = "#FC7816";
const LINE = "#2A2C33";

const FONT_DIR = path.join(process.cwd(), "src", "app", "_og-fonts");

export async function ogFonts() {
  const [display, mono] = await Promise.all([
    readFile(path.join(FONT_DIR, "SpaceGrotesk-Bold.ttf")),
    readFile(path.join(FONT_DIR, "JetBrainsMono-400.ttf")),
  ]);
  return [
    { name: "Space Grotesk", data: display, weight: 700 as const, style: "normal" as const },
    { name: "JetBrains Mono", data: mono, weight: 400 as const, style: "normal" as const },
  ];
}

/**
 * One card layout for every route, so a shared link is recognisable as this
 * site whichever page it points at. Dark ground, hairline frame, one accent
 * rule, mono metadata, large display title.
 */
export function OgCard({
  eyebrow,
  title,
  meta,
}: {
  eyebrow: string;
  title: string;
  meta?: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: INK,
        padding: 72,
        border: `1px solid ${LINE}`,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontFamily: "JetBrains Mono",
            fontSize: 22,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: ACCENT,
          }}
        >
          {eyebrow}
        </div>
        <div style={{ display: "flex", width: 96, height: 2, backgroundColor: ACCENT, marginTop: 28 }} />
      </div>

      <div
        style={{
          display: "flex",
          fontFamily: "Space Grotesk",
          fontSize: title.length > 42 ? 62 : 78,
          lineHeight: 1.05,
          letterSpacing: -1.5,
          color: TEXT,
          maxWidth: 1000,
        }}
      >
        {title}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          borderTop: `1px solid ${LINE}`,
          paddingTop: 28,
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "JetBrains Mono",
            fontSize: 20,
            color: MUTED,
            maxWidth: 760,
          }}
        >
          {meta ?? "Senior Game Engineer, Technical Artist"}
        </div>
        <div style={{ display: "flex", fontFamily: "JetBrains Mono", fontSize: 20, color: TEXT }}>
          cusu-dev.vercel.app
        </div>
      </div>
    </div>
  );
}
