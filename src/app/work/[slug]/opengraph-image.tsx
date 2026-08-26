import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { publishedProjects, getProject } from "@/content/projects";
import { DISCIPLINE_LABELS } from "@/lib/disciplines";
import { OgCard, ogFonts, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return publishedProjects.map((p) => ({ slug: p.slug }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const meta = [
    project.client,
    project.year,
    project.disciplines.map((d) => DISCIPLINE_LABELS[d]).join(" · "),
  ].join(" · ");

  return new ImageResponse(
    <OgCard eyebrow={project.studio ?? project.client} title={project.title} meta={meta} />,
    { ...size, fonts: await ogFonts() },
  );
}
