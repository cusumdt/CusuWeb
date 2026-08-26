"use client";

import { useState } from "react";
import Image from "next/image";
import type { VideoEmbed } from "@/lib/types";
import { getBlur } from "@/lib/media";

/**
 * Click-to-load YouTube embed.
 *
 * Nothing from youtube.com loads until the reader asks for it: the poster is
 * self-hosted and the iframe is only mounted on click. That keeps YouTube's
 * scripts and cookies off the page for everyone who never presses play, and
 * keeps them out of the performance budget.
 *
 * Falls back to a plain link to the video if JavaScript never runs, since the
 * button is rendered as part of a client component and the noscript link is
 * always in the markup.
 */
export function VideoFacade({ video }: { video: VideoEmbed }) {
  const [playing, setPlaying] = useState(false);
  const blur = getBlur(video.poster);

  if (playing) {
    return (
      <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    );
  }

  return (
    <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
      <button
        type="button"
        onClick={() => setPlaying(true)}
        className="group absolute inset-0 h-full w-full cursor-pointer"
      >
        <Image
          src={video.poster}
          alt=""
          fill
          sizes="(min-width: 768px) 60rem, 100vw"
          className="object-cover"
          {...(blur ? { placeholder: "blur" as const, blurDataURL: blur } : {})}
        />
        <span className="absolute inset-0 bg-ink/40 transition-colors duration-base ease-out-quint group-hover:bg-ink/25" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="bg-accent px-6 py-3 font-mono text-label uppercase text-ink">
            Play video
          </span>
        </span>
        <span className="sr-only">{video.title}</span>
      </button>

      <noscript>
        <a
          href={`https://www.youtube.com/watch?v=${video.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 flex items-end p-6 font-mono text-label uppercase text-accent"
        >
          Watch on YouTube
        </a>
      </noscript>
    </div>
  );
}
