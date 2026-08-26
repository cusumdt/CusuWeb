import type { Discipline } from "@/lib/types";

/** Display labels for the discipline filter and the project metadata blocks. */
export const DISCIPLINE_LABELS: Record<Discipline, string> = {
  engine: "Engine",
  "technical-art": "Technical art",
  "3d-art": "3D art",
  "web-3d": "Web 3D",
  tooling: "Tooling",
  "art-direction": "Art direction",
};

export const DISCIPLINES = Object.keys(DISCIPLINE_LABELS) as Discipline[];

export function isDiscipline(value: string | undefined): value is Discipline {
  return !!value && value in DISCIPLINE_LABELS;
}
