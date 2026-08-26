/**
 * Long-form About copy. First person, because the site is his.
 *
 * Every claim here traces to docs/CONTENT.md. Nothing is invented, rounded up,
 * or borrowed from a job description. See the content-copy agent for the voice.
 */

export const aboutLead =
  "I write engine code and I art-direct. Most people do one. Working across both is what lets me fix a pipeline problem at its root instead of working around it downstream.";

export const aboutNarrative: { heading: string; paragraphs: string[] }[] = [
  {
    heading: "Where I started",
    paragraphs: [
      "I spent my first three years writing SQL at Toyota Argentina, building and maintaining the internal database systems the business ran on, and optimizing queries that other people's work depended on. It was not games, and it taught me something games taught me again later: most performance problems are structural, and you fix them by changing the shape of the data, not by tuning the thing that is slow.",
      "I studied game development at Image Campus while that was happening, and later went back to teach there. Five years of database and data structures work sits under everything I do now, which is why I reach for a profiler before I reach for an opinion.",
    ],
  },
  {
    heading: "The hybrid part",
    paragraphs: [
      "At DIGI Learnnials I directed six artists on a platform Disney put its name on, and wrote the C# scene and character editor those artists were making assets for. Doing both is unusual, and it is the reason the pipeline held: I knew what the editor could load because I had written it, and I knew what the artists needed because I was one.",
      "That pattern repeated. On the Oh Baby Games titles I textured the environments and then programmed the maps in Unity that those environments became. On the Chevrolet configurator I built the Three.js renderer and the customization system on top of it. The handoff between art and code is where projects usually leak time, and I keep ending up on both sides of it.",
    ],
  },
  {
    heading: "What I do now",
    paragraphs: [
      "I lead the technical architecture of Unreal Engine 5 VR projects at Agência DADS, currently a PC VR showroom for the Mercedes-Benz Actros. The interesting work there is not the rendering, it is everything upstream of it: raw CAD arriving at 14 to 15 million triangles per mesh, hundreds of unmanaged materials, and a stereo VR frame budget that does not care.",
      "The fix that best describes how I work: Blender and UE5 kept disagreeing on shading, producing normal artifacts across every asset. Rather than patch each mesh, I modified Unreal's shader and mesh importer to remove the engine's normal recast. One change at engine level, and the whole class of bug stopped existing.",
      "Alongside that I build and sell Blender addons as CusuTools. TexelPack is out on Superhive Market with its own customers, support load and update cycle. Shipping software to strangers is a different discipline from shipping it to a team: the failure modes are theirs, in scenes I will never see, on Blender versions I did not test. That is why it runs on Blender's bundled Python with zero external dependencies.",
    ],
  },
  {
    heading: "How I work with teams",
    paragraphs: [
      "I have worked with studios in Australia, Spain, Argentina and Brazil, mostly remote, mostly across time zones. I write documentation in Portuguese for the team I am on now, define tasks and test plans for the junior programmers, and taught long enough to know that explaining a thing properly is usually faster than fixing it twice.",
      "I am direct about tradeoffs. If something will not hold at 60fps, I would rather say so in the first week than in the last one.",
    ],
  },
];
