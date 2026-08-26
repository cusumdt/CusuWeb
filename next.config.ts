import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * AVIF first, WebP as the fallback.
     *
     * These are the formats Next *encodes to*. It cannot resize an AVIF source
     * at all: hand it one and it streams the original back at every requested
     * width, which meant a 384px card slot was downloading an 86 KB file built
     * for a 1877px hero. The content modules therefore point at the WebP
     * siblings, and Next downsamples and re-encodes from those.
     */
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
