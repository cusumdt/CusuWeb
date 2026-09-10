# One-shot bootstrap: emits src/content/projects.ts.
# After this runs, projects.ts is hand-maintained. Do not re-run without checking.
import json, pathlib

ROOT = pathlib.Path(r"D:\Cusu\CusuWeb")
media = json.load(open(ROOT / "scripts" / "_media_by_project.json", encoding="utf-8"))

META = {
    "mercedes-actros-vr": dict(
        title="Mercedes-Benz Actros: PC VR Showroom",
        tagline="High-fidelity VR truck configurator built in Unreal Engine 5.",
        client="Mercedes-Benz", studio="Agência DADS", year="2026",
        platform="PC VR (Unreal Engine 5)",
        role="Senior Game Engineer: technical architecture, rendering, asset pipeline",
        disciplines=["engine", "technical-art"],
        stack=["Unreal Engine 5", "C++", "Blueprints", "VR", "Lumen", "Nanite", "Blender"],
        summary="A high-fidelity PC VR showroom that lets a viewer stand inside an Actros and reconfigure it in real time. A server-driven configurator UI switches cabin, chassis, lighting and trailer variants without leaving the scene.",
        constraint="Source CAD arrived as raw 14-15M triangle meshes with hundreds of unmanaged materials, against a stereo VR frame budget and a fixed texture streaming pool.",
        contribution=[
            "Rebuilt the CAD-to-engine pipeline: decimation, retopology, material consolidation and streaming budget management.",
            "Modified the Unreal shader and mesh importer to remove the UE5 normal recast so Blender and UE5 shading match exactly.",
            "Resolved virtual shadow map overflow, Lumen artifacts, streaming pool exhaustion and DLSS/Streamline plugin conflicts in stereo.",
            "Owned the UE 5.5 to 5.7 migration and revalidated lighting, materials and performance.",
        ],
        outcome="In production.", featured=True, draft=True,
    ),
    "cusutools": dict(
        title="CusuTools: Blender Addons",
        tagline="Commercial pipeline tooling for 3D artists: TexelPack and PreflightKit.",
        client="Independent product", studio="CusuTools", year="2026",
        platform="Blender (Python / bpy)",
        role="Founder, developer, support",
        disciplines=["tooling"],
        stack=["Python", "bpy", "Blender"],
        summary="Two commercial Blender addons sold on Superhive Market. TexelPack handles UV packing and texel density normalization, including exporting the texel density map as an image for layout inspection. PreflightKit validates and exports game-ready assets, catching pipeline errors before they reach an engine.",
        constraint="Shipping software to strangers means the failure modes are theirs, not yours - scenes you will never see, Blender versions you did not test.",
        contribution=[
            "Full product cycle: market research, development, release, support and updates.",
            "Storefront, pricing, refunds, and affiliate and creator outreach.",
        ],
        outcome="Both addons released and in active use.", featured=True, draft=True,
    ),
    "chevrolet-configurator": dict(
        title="Chevrolet: Web 3D Vehicle Configurator",
        tagline="Real-time car customization in the browser with Three.js and WebGL.",
        client="Chevrolet", studio="Freelance", year="2023-2024",
        platform="Web (Three.js / WebGL)",
        role="Freelance Web 3D Developer",
        disciplines=["web-3d"],
        stack=["Three.js", "WebGL", "JavaScript"],
        summary="An interactive web platform for vehicle visualization, letting users change colors, wheels and components and see the result immediately.",
        constraint="A browser 3D experience that had to stay smooth on desktop and mid-range mobile, with no install and no loading screen worth complaining about.",
        contribution=[
            "Built the real-time customization system across colors, wheels and components.",
            "Optimized the rendering path for consistent framerate across desktop and mobile.",
            "Iterated with design and product against client feedback.",
        ],
        outcome="Delivered.", featured=True, draft=True,
    ),
    "historias-para-armar": dict(
        title="Historias Para Armar: Disney",
        tagline="Art direction and Unity WebGL for a Disney educational platform.",
        client="Disney", studio="DIGI Learnnials", year="2020-2021",
        platform="Web (Unity WebGL)",
        role="Lead Artist, Art Director & Unity Developer",
        disciplines=["art-direction", "web-3d"],
        stack=["Unity", "C#", "WebGL"],
        summary="An educational platform built for Disney where students aged 8 to 11 build narrative arcs in an interactive scene and character editor.",
        constraint="One visual language had to hold up across culturally diverse characters, made by six different artists, and still satisfy Disney and a panel of educational experts.",
        contribution=[
            "Directed a team of 6 artists on character design and visual assets.",
            "Built the scene and character editor in C#.",
            "Implemented a teacher dashboard and activity creation tools for classroom use.",
            "Established the art style and the production pipeline that kept it consistent.",
        ],
        outcome="Shipped.", featured=True, draft=False,
    ),
    "ohbb-kart-spongebob": dict(
        title="SpongeBob Kart: Bikini Bottom",
        tagline="Environment and character art for a licensed mobile kart racer.",
        client="SpongeBob SquarePants (Nickelodeon)", studio="Oh Baby Games", year="2022-2025",
        platform="Mobile (Unity)",
        role="3D Artist / Developer",
        disciplines=["3d-art"],
        stack=["Unity", "Blender", "Substance Painter", "C#"],
        summary="Modeling, UVs and textures for the SpongeBob environment and characters in OHBB Kart - Bikini Bottom houses, props and cast, built to read clearly at racing speed on a phone.",
        constraint="Licensed-IP fidelity on a mobile budget: recognizable silhouettes at 60fps on mid-range devices.",
        contribution=[
            "Modeled and textured environment sets and hero props.",
            "Built characters to the licensor's model sheets.",
            "Optimized meshes and materials against the mobile draw-call budget.",
        ],
        outcome="Shipped.", featured=True, draft=False,
    ),
    "ohbb-kart-invader-zim": dict(
        title="Invader Zim Kart: Environment",
        tagline="Full environment set for the Invader Zim track.",
        client="Invader Zim (Nickelodeon)", studio="Oh Baby Games", year="2022-2025",
        platform="Mobile (Unity)",
        role="3D Artist / Developer",
        disciplines=["3d-art"],
        stack=["Unity", "Blender", "Substance Painter"],
        summary="Modeling, UVs and textures for the Invader Zim environment in OHBB Kart, including Zim's house, the Voot Cruiser and the surrounding street set.",
        constraint="Translating a flat, graphic 2D art style into 3D without losing the angular, off-kilter shape language the show is built on.",
        contribution=[
            "Modeled and textured the full environment set.",
            "Built the hero props: Zim's house and the Voot Cruiser.",
            "Kept the asset lineup consistent in scale and material response across the track.",
        ],
        outcome="Shipped.", featured=True, draft=False,
    ),
    "ohbb-kart-tower-of-god": dict(
        title="Tower of God Kart: Characters",
        tagline="Rak, Baam and Ha-Yuri modeled, unwrapped and textured.",
        client="Tower of God", studio="Oh Baby Games", year="2022-2025",
        platform="Mobile (Unity)",
        role="3D Artist",
        disciplines=["3d-art"],
        stack=["Blender", "Substance Painter", "Unity"],
        summary="Character work for the Tower of God roster in OHBB Kart: modeling, UVs and textures for Rak, Baam and Ha-Yuri.",
        constraint="Three characters with very different proportions had to sit in the same kart rig and read at the same distance.",
        contribution=[
            "Modeled and unwrapped each character.",
            "Textured to match the source illustration style.",
            "Iterated on proportions through several WIP passes against licensor feedback.",
        ],
        outcome="Shipped.", featured=False, draft=False,
    ),
    "ohbb-kart-characters": dict(
        title="OHBB Kart: Original Characters",
        tagline="Original character work outside the licensed roster.",
        client="Oh Baby Games", studio="Oh Baby Games", year="2022-2025",
        platform="Mobile (Unity)",
        role="3D Artist",
        disciplines=["3d-art"],
        stack=["Blender", "Substance Painter", "ZBrush", "Unity"],
        summary="Original characters designed and built for OHBB Kart, covering modeling, UVs and textures.",
        constraint="Original designs still had to sit alongside licensed IP characters without looking like they came from a different game.",
        contribution=["Modeled, unwrapped and textured each character.", "Matched the established roster's proportions and material language."],
        outcome="Shipped.", featured=False, draft=False,
    ),
    "ohbb-raid": dict(
        title="OHBB Raid: Environment, Monster & Materials",
        tagline="Environment art, a hand-painted ice monster, and Substance Designer materials.",
        client="Oh Baby Games", studio="Oh Baby Games", year="2022-2025",
        platform="Mobile (Unity)",
        role="3D Artist / Technical Artist",
        disciplines=["3d-art", "technical-art"],
        stack=["Blender", "Substance Designer", "Substance Painter", "Unity"],
        summary="The largest art contribution on OHBB Raid: environment modeling and texturing, a hand-painted ice monster, and a set of tileable materials authored procedurally in Substance Designer.",
        constraint="A tiling material set had to cover a whole environment on a mobile texture budget while still varying enough to avoid visible repetition.",
        contribution=[
            "Modeled, unwrapped and textured the environment.",
            "Hand-painted the Head Ice monster's textures.",
            "Authored carpet, floor and marble materials procedurally in Substance Designer.",
        ],
        outcome="Shipped.", featured=True, draft=False,
    ),
    "tower-defense-props": dict(
        title="Tower Defense: Prop Library",
        tagline="A full prop library built for a tower defense prototype.",
        client="Oh Baby Games", studio="Oh Baby Games", year="2022-2025",
        platform="Mobile (Unity)",
        role="3D Artist",
        disciplines=["3d-art"],
        stack=["Blender", "Substance Painter", "Unity"],
        summary="Modeling, UVs and textures for the prop library of a tower defense prototype - towers, structures and set dressing built as a consistent kit.",
        constraint="Props had to be readable from a fixed top-down camera at small on-screen size, and reusable across many level layouts.",
        contribution=["Built the prop kit to a shared scale and material set.", "Optimized for instancing across dense levels."],
        outcome="Prototype delivered.", featured=False, draft=False,
    ),
    "weapons-props": dict(
        title="Weapon Set: Game-Ready Props",
        tagline="Four game-ready weapons: pistol, shotgun, rifle, rocket launcher.",
        client="Oh Baby Games", studio="Oh Baby Games", year="2022-2025",
        platform="Mobile (Unity)",
        role="3D Artist",
        disciplines=["3d-art"],
        stack=["Blender", "Substance Painter"],
        summary="A set of game-ready weapon props: modeling, UVs and PBR texturing, built to a shared texel density and material set.",
        constraint="Four silhouettes that had to stay distinguishable at thumbnail size in a weapon-select UI.",
        contribution=["Modeled and unwrapped each weapon.", "Textured to a shared PBR material library."],
        outcome="Prototype delivered.", featured=False, draft=False,
    ),
    "peakmines": dict(
        title="Peakmines: Art & Technical Direction",
        tagline="Art direction, 2D and 3D production for an indie title.",
        client="Peakmines", studio="Inflextion Studios", year="2021-2022",
        platform="PC (Unity)",
        role="Art Director & Unity Developer",
        disciplines=["art-direction", "3d-art"],
        stack=["Unity", "Blender", "Substance Painter", "Photoshop"],
        summary="Art and technical direction on Peakmines, plus hands-on 2D and 3D production including the dwarf character set.",
        constraint="Directing a multidisciplinary team while staying hands-on in production, and keeping the pipeline efficient enough for a small studio.",
        contribution=[
            "Set the art direction and established the asset pipeline.",
            "Modeled, unwrapped and textured the character set.",
            "Coordinated designers, developers and artists across the project lifecycle.",
        ],
        outcome="Delivered.", featured=False, draft=False,
    ),
}

ORDER = [
    "mercedes-actros-vr", "cusutools", "chevrolet-configurator",
    "ohbb-raid", "ohbb-kart-spongebob", "ohbb-kart-invader-zim",
    "historias-para-armar", "peakmines", "ohbb-kart-tower-of-god",
    "ohbb-kart-characters", "tower-defense-props", "weapons-props",
]


def q(s):
    return '"' + str(s).replace("\\", "\\\\").replace('"', '\\"') + '"'


def media_lit(m, indent="    "):
    lines = [indent + "{"]
    lines.append(f'{indent}  kind: {q(m["kind"])},')
    lines.append(f'{indent}  src: {q(m["src"])},')
    lines.append(f'{indent}  alt: {q("TODO: " + m["alt"])},')
    lines.append(f'{indent}  width: {m["width"]},')
    lines.append(f'{indent}  height: {m["height"]},')
    lines.append(indent + "},")
    return "\n".join(lines)


out = []
out.append('import type { Project } from "@/lib/types";\n')
out.append("/**")
out.append(" * Bootstrapped from the recovered Netlify site, then hand-maintained.")
out.append(" * Media paths point at optimized output produced by scripts/optimize-media.mjs")
out.append(" * from scripts/media-manifest.json. Run that script before the images resolve.")
out.append(" *")
out.append(' * Every alt string still marked "TODO:" needs a human pass - see TASKS.md.')
out.append(" */")
out.append("export const projects: Project[] = [")

for slug in ORDER:
    m = META[slug]
    items = media.get(slug, [])
    cover = items[0] if items else None
    out.append("  {")
    out.append(f"    slug: {q(slug)},")
    out.append(f'    title: {q(m["title"])},')
    out.append(f'    tagline: {q(m["tagline"])},')
    out.append(f'    client: {q(m["client"])},')
    out.append(f'    studio: {q(m["studio"])},')
    out.append(f'    year: {q(m["year"])},')
    out.append(f'    platform: {q(m["platform"])},')
    out.append(f'    role: {q(m["role"])},')
    out.append(f'    disciplines: [{", ".join(q(d) for d in m["disciplines"])}],')
    out.append(f'    stack: [{", ".join(q(s) for s in m["stack"])}],')
    out.append(f'    summary:\n      {q(m["summary"])},')
    if m.get("constraint"):
        out.append(f'    constraint:\n      {q(m["constraint"])},')
    if m.get("contribution"):
        out.append("    contribution: [")
        for c in m["contribution"]:
            out.append(f"      {q(c)},")
        out.append("    ],")
    if m.get("outcome"):
        out.append(f'    outcome: {q(m["outcome"])},')
    if cover:
        out.append("    cover: {")
        out.append(f'      kind: "image",')
        out.append(f'      src: {q(cover["src"])},')
        out.append(f'      alt: {q("TODO: " + cover["alt"])},')
        out.append(f'      width: {cover["width"]},')
        out.append(f'      height: {cover["height"]},')
        out.append("    },")
    else:
        out.append("    cover: {")
        out.append(f'      kind: "image",')
        out.append(f'      src: "/work/{slug}/cover.avif",')
        out.append(f'      alt: "TODO: cover image pending - no asset recovered for this project",')
        out.append("      width: 1600,")
        out.append("      height: 900,")
        out.append("    },")
    out.append("    media: [")
    for it in items[1:]:
        out.append(media_lit(it, "      "))
    out.append("    ],")
    out.append(f'    featured: {"true" if m["featured"] else "false"},')
    if m.get("draft"):
        out.append("    draft: true,")
    out.append("  },")

out.append("];\n")
out.append("export const featuredProjects = projects.filter((p) => p.featured && !p.draft);")
out.append("export const publishedProjects = projects.filter((p) => !p.draft);")
out.append("")
out.append("export function getProject(slug: string) {")
out.append("  return projects.find((p) => p.slug === slug);")
out.append("}")
out.append("")

(ROOT / "src" / "content" / "projects.ts").write_text("\n".join(out), encoding="utf-8")
print("wrote projects.ts:", len(ORDER), "projects")
