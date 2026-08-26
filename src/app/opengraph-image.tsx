import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { OgCard, ogFonts, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = `${site.name}, ${site.shortRole}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow="Portfolio"
        title="Cristian Cusumano"
        meta="Unreal Engine 5 VR · Real-time web 3D · Blender tooling"
      />
    ),
    { ...size, fonts: await ogFonts() },
  );
}
