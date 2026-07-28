"use client";

import { getMediaAlt, getMediaUrl } from "@/lib/utils";
import type { ClipTextMarqueeBlock as ClipTextMarqueeBlockType } from "@/payload-types";
import React from "react";
import Image from "next/image";
import { Marquee } from "@/components/ui/marquee";
import { SectionReveal } from "@/components/ui/section-reveal";

/**
 * HeroBlock Component - Displays high-impact landing hero section with main image,
 * title highlights, action CTAs, statistical key metrics, and optional image gallery.
 */
export const HeroMarqueeBlock: React.FC<ClipTextMarqueeBlockType> = ({
  clipImage,
  textBeforeHighlight,
  highlightedText,
  textAfterHighlight,
  marqueeIcons,
}) => {
  const clipImageUrl = getMediaUrl(clipImage);
  const marqueeIconUrls = marqueeIcons?.map((icon) => getMediaUrl(icon.icon));
  const marqueeIconAlts = marqueeIcons?.map((icon) => getMediaAlt(icon.icon, "Image"));

  return (
    <section
      className="relative overflow-hidden bg-background flex flex-col items-center px-4 py-6 lg:p-14 gap-6 lg:gap-16"
      id="marquee"
    >
      <SectionReveal direction="up" className="w-full">
        <div className="flex flex-col lg:flex-row items-center w-full gap-0 lg:gap-6 lg:justify-between ">
          {/* Logo Clipped */}
          <div className="min-w-130 h-30 lg:h-50 max-lg:scale-60 overflow-hidden relative">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${clipImageUrl})`,
                maskImage: "url('/logo/mark/currentColor.svg')",
                WebkitMaskImage: "url('/logo/mark/currentColor.svg')",
                maskSize: "contain",
                WebkitMaskSize: "contain",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                maskPosition: "center",
                WebkitMaskPosition: "center",
                scale: "200%",
              }}
            />
          </div>
          {/* Text */}
          <p className="font-display font-semibold text-xl md:text-3xl lg:text-5xl max-lg:text-center lg:leading-[150%] lg:tracking-[-7%] uppercase text-foreground">
            {textBeforeHighlight} <span className="text-primary-500">{highlightedText}</span>{" "}
            {textAfterHighlight}
          </p>
        </div>
      </SectionReveal>
      <SectionReveal direction="up" delay={0.2} className="w-full">
        <div className="relative w-full overflow-hidden">
          {/* Left fade */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 lg:w-40 bg-linear-to-r from-background to-transparent" />

          <Marquee className="[--duration:20s] [--gap:24px] lg:[--gap:72px] px-4 lg:px-14" repeat={4}>
            {marqueeIconUrls?.map((src, index) => (
              <Image
                key={index}
                src={src ?? ""}
                alt={marqueeIconAlts?.[index] ?? "Icon"}
                width={56}
                height={56}
                className="w-8 h-8 lg:w-14 lg:h-14"
              />
            ))}
          </Marquee>

          {/* Right fade */}
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 lg:w-40 bg-linear-to-l from-background to-transparent" />
        </div>
      </SectionReveal>
    </section>
  );
};

