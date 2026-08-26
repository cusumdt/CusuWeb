import { ImageResponse } from "next/og";
import { OgCard, ogFonts, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Blender addons, built as products, Cristian Cusumano";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OpengraphImage() {
  return new ImageResponse(
    <OgCard eyebrow="CusuTools" title="Blender addons, built as products" meta="TexelPack, out now · PreflightKit, in development" />,
    { ...size, fonts: await ogFonts() },
  );
}
