import { ImageResponse } from "next/og";
import { OgCard, ogFonts, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Nine years of code and art, Cristian Cusumano";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OpengraphImage() {
  return new ImageResponse(
    <OgCard eyebrow="About" title="Nine years of code and art" meta="Senior Game Engineer, Technical Artist, Santos, Brazil" />,
    { ...size, fonts: await ogFonts() },
  );
}
