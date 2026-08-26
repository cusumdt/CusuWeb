import { ImageResponse } from "next/og";
import { OgCard, ogFonts, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Get in touch, Cristian Cusumano";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OpengraphImage() {
  return new ImageResponse(
    <OgCard eyebrow="Contact" title="Get in touch" meta="Open to senior engine and technical art roles" />,
    { ...size, fonts: await ogFonts() },
  );
}
