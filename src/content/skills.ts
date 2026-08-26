import type { SkillGroup } from "@/lib/types";

export const skills: SkillGroup[] = [
  {
    label: "Programming",
    items: ["C++", "C#", "Python", "SQL", "JavaScript", "Blueprints", "HLSL", "Git"],
  },
  {
    label: "Engines & Real-time",
    items: [
      "Unreal Engine 5 (Certified)",
      "Unity",
      "VR / XR",
      "Lumen",
      "Nanite",
      "Niagara",
      "WebGL",
      "Three.js",
    ],
  },
  {
    label: "3D & Art",
    items: [
      "Blender",
      "Substance Painter",
      "Substance Designer",
      "Maya",
      "ZBrush",
      "Photoshop",
      "Illustrator",
    ],
  },
  {
    label: "Tooling & DCC Dev",
    items: ["Blender addons (Python / bpy)", "JetBrains Rider", "Visual Studio", "Figma"],
  },
  {
    label: "Specializations",
    items: [
      "Technical Art",
      "Real-time Rendering",
      "Shaders",
      "Performance Profiling",
      "Asset Pipelines",
      "Mobile & VR Optimization",
      "Database Design",
    ],
  },
];

export const strengths = [
  {
    title: "Hybrid technical profile",
    body: "Bridges programming and art, so technical and creative teams stop talking past each other.",
  },
  {
    title: "Full pipeline ownership",
    body: "Works end to end — database architecture, engine code, and the final render.",
  },
  {
    title: "Engine-level problem solving",
    body: "Modifies shaders, importers and rendering settings at engine level to fix pipeline problems at the root.",
  },
  {
    title: "Shipped products",
    body: "Commercial Blender addons in active use, with their own customers, support and update cycle.",
  },
];
