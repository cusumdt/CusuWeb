import type { Role, Tool } from "@/lib/types";

export const experience: Role[] = [
  {
    company: "Agência DADS",
    title: "Senior Game Engineer",
    location: "Santos, Brazil",
    start: "Apr 2026",
    end: "Present",
    current: true,
    summary:
      "Leads the technical architecture of Unreal Engine 5 projects, with performance and scalability as the primary constraint across target platforms.",
    highlights: [
      "Builds a high-fidelity PC VR truck showroom (Mercedes-Benz Actros) with a server-driven configurator for real-time cabin, chassis, lighting and trailer variants.",
      "Rebuilt the CAD-to-engine pipeline: decimation and retopology of raw 14-15M triangle meshes, material consolidation, and texture streaming budgets that eliminated memory overruns.",
      "Modified the Unreal shader and mesh importer to remove the UE5 normal recast, making Blender and UE5 shading match exactly and ending recurring normal artifacts across all assets.",
      "Diagnoses stereo VR rendering failures: virtual shadow map overflow, Lumen artifacts, streaming pool exhaustion, silent scalability drops, DLSS/Streamline conflicts.",
      "Owns engine migrations (UE 5.5 to 5.7) and revalidates lighting, materials and performance after each upgrade.",
      "Defines tasks and test plans for junior programmers and writes the technical documentation in Portuguese.",
    ],
    clients: ["Mercedes-Benz"],
    stack: ["Unreal Engine 5", "C++", "Blueprints", "VR", "Lumen", "Nanite", "Blender"],
  },
  {
    company: "CusuTools",
    title: "Founder & Developer",
    location: "Independent",
    start: "Jun 2026",
    end: "Present",
    current: true,
    summary:
      "Designs, develops and ships commercial Blender addons for 3D artists and game developers, owning the full product cycle from market research to support and updates.",
    highlights: [
      "Released TexelPack: UV packing and texel density tooling distributed on Superhive Market, including texel density map export for UV layout inspection.",
      "Building PreflightKit: a pre-flight asset validator that checks and exports game-ready assets, catching pipeline errors before they reach the engine. In development.",
      "Runs the business end to end: pricing, storefront, customer support, refunds, and affiliate and creator outreach.",
    ],
    stack: ["Python", "bpy", "Blender"],
  },
  {
    company: "Bird",
    title: "Co-Founder",
    location: "Santos, Brazil",
    start: "Aug 2025",
    end: "Present",
    current: true,
    summary:
      "Co-founded a small studio offering marketing management, web systems and applications for micro-entrepreneurs.",
    highlights: ["Contributes on the technical side of client websites and web apps."],
    stack: ["JavaScript", "Web"],
  },
  {
    company: "Oh Baby Games",
    title: "Developer / 3D Artist",
    location: "Remote (Australia)",
    start: "Jul 2022",
    end: "Feb 2025",
    summary:
      "Built mobile racing games in Unity for international markets, working with licensed IPs.",
    highlights: [
      "Shipped work on SpongeBob SquarePants, Invader Zim and Tower of God titles.",
      "Created complete 3D environments from concept to implementation: buildings, props, environmental elements, texturing, lighting and atmospherics.",
      "Optimized assets and the rendering pipeline to hold 60fps on mid-range mobile without losing visual quality.",
      "Programmed the maps in Unity for the SpongeBob, Invader Zim and Raid titles: layout, collision, route logic, and the C# gameplay systems that sit on top of them.",
      "Programmed gameplay mechanics, UI systems and interactive elements in C#.",
      "Collaborated with an international team across time zones using Agile.",
    ],
    clients: ["SpongeBob SquarePants", "Invader Zim", "Tower of God"],
    stack: ["Unity", "C#", "Blender", "Substance Painter"],
  },
  {
    company: "Chevrolet Project",
    title: "Freelance Web 3D Developer",
    location: "Remote (Argentina)",
    start: "Sep 2023",
    end: "Apr 2024",
    summary:
      "Built an interactive web 3D platform for vehicle visualization using WebGL and Three.js.",
    highlights: [
      "Implemented real-time customization of colors, wheels and components.",
      "Optimized rendering for a smooth browser-based 3D experience on desktop and mobile.",
      "Iterated directly with design and product teams against client feedback.",
    ],
    clients: ["Chevrolet"],
    stack: ["Three.js", "WebGL", "JavaScript"],
  },
  {
    company: "Inflextion Studios",
    title: "Project Manager & Unity Developer",
    location: "Remote (Spain)",
    start: "Oct 2021",
    end: "Jun 2022",
    summary:
      "Led project management and technical development for real-time interactive experience projects while staying hands-on in Unity.",
    highlights: [
      "Coordinated multidisciplinary teams of designers, developers and artists across the project lifecycle.",
      "Managed scope, timelines and deliverables.",
      "Established technical and artistic pipelines for efficient asset integration and optimization.",
      "Acted as the bridge between clients and the development team, translating requirements into technical solutions.",
    ],
    stack: ["Unity", "C#"],
  },
  {
    company: "DIGI Learnnials",
    title: "Lead Artist, Art Director & Unity Developer",
    location: "Argentina",
    start: "Feb 2020",
    end: "Dec 2021",
    summary:
      "Led art direction and Unity WebGL development for an educational platform built for Disney.",
    highlights: [
      "Grew from directing a team of 6 artists to 30 by the end of the project, 6 in-house plus 24 from a partner studio brought in to support, on character design and visual assets for children ages 8-11.",
      "Developed an interactive scene and character editor in C# that let students build narrative arcs.",
      "Implemented a teacher dashboard and activity creation tools for classroom integration.",
      "Worked with educational experts so the platform met pedagogical standards.",
      "Established the art style and production pipeline, keeping consistency across culturally diverse characters.",
    ],
    clients: ["Disney"],
    stack: ["Unity", "C#", "WebGL"],
  },
  {
    company: "Image Campus",
    title: "Professor of 3D Art and Database Programming",
    location: "Buenos Aires, Argentina",
    start: "Mar 2021",
    end: "Feb 2023",
    summary:
      "Taught 3D art, Unity, Blender, shaders and object-oriented programming to game development students.",
    highlights: [
      "Instructed database design, SQL optimization and data structures.",
      "Developed curriculum combining technical skills with practical industry application.",
    ],
    stack: ["Unity", "Blender", "SQL"],
  },
  {
    company: "Toyota Argentina",
    title: "Database Programmer",
    location: "Argentina",
    start: "Feb 2017",
    end: "Oct 2019",
    summary: "Developed and maintained internal database systems for business operations.",
    highlights: [
      "Optimized SQL queries and database structures to improve system performance.",
      "Provided technical support and data analysis across departments.",
    ],
    clients: ["Toyota"],
    stack: ["SQL"],
  },
];

export const education = [
  {
    title: "Unreal Engine Certification",
    org: "Epic Games",
    period: "",
    detail: "Certified in Unreal Engine development, Blueprints and C++.",
  },
  {
    title: "Higher Technician in Video Game Development",
    org: "Image Campus, Buenos Aires",
    period: "2018 - 2020",
    detail: "",
  },
  {
    title: "Technical Degree in Computer Programming",
    org: "Escuela Técnica N.º 1 Raúl Scalabrini Ortiz, Argentina",
    period: "2011 - 2017",
    detail: "",
  },
];

export const tools: Tool[] = [
  {
    name: "TexelPack",
    tagline: "One-click UV packing, with the texel density toolkit built in",
    description:
      "Packs UV islands into a tight atlas across one object or a whole selection, holds texel density consistent by measuring real 3D surface area, and draws the result as a viewport overlay so wasted space and stretching are visible before a bake. Four packing algorithms, mirrored-island stacking, UDIM and group packing, pixel-exact padding, and JSON / CSV / SVG layout export. Runs on Blender's bundled Python with zero external dependencies.",
    marketplace: "Superhive Market",
    href: "https://superhivemarket.com/products/texelpack",
    status: "released",
  },
  {
    name: "PreflightKit",
    tagline: "Pre-flight validation for game-ready assets",
    description:
      "Checks and exports game-ready assets, catching pipeline errors in naming, scale, transforms and materials before they reach the engine. Still in development, not yet released.",
    marketplace: "Superhive Market",
    status: "in-development",
  },
];
