import { ImageResponse } from "next/og";
import { OgCard, ogFonts, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Work, Cristian Cusumano";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OpengraphImage() {
  return new ImageResponse(
    <OgCard eyebrow="Selected work" title="Work" meta="Twelve projects across engine, technical art, 3D and web 3D" />,
    { ...size, fonts: await ogFonts() },
  );
}
