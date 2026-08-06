"use client";

import { SectionReveal } from "@/components/ui/section-reveal";
import { getMediaAlt, getMediaUrl } from "@/lib/utils";
import type { MarqueeIconsBlock as MarqueeIconsBlockType } from "@/payload-types";
import React from "react";
import MarqueeSection from "../../layout/marquee";

/**
 * HeroBlock Component - Displays high-impact landing hero section with main image,
 * title highlights, action CTAs, statistical key metrics, and optional image gallery.
 */
export const MarqueeIconsBlock: React.FC<MarqueeIconsBlockType> = ({ marqueeIcons }) => {
  const marqueeIconUrls = marqueeIcons?.map((icon) => getMediaUrl(icon.icon));
  const marqueeIconAlts = marqueeIcons?.map((icon) => getMediaAlt(icon.icon, "Image"));

  return (
    <section
      className="relative overflow-hidden bg-background flex flex-col items-center px-4 py-6 lg:p-14 gap-6 lg:gap-16"
      id="marquee"
    >
      <SectionReveal direction="up" delay={0.2} className="w-full">
        <div className="relative w-full overflow-hidden">
          {/* Left fade */}
          <div className="pointer-events-none absolute inset-y-0 inset-s-0 z-10 w-24 lg:w-40 bg-linear-to-r rtl:bg-linear-to-l from-background to-transparent" />

          <MarqueeSection
            marqueeIconUrls={(marqueeIconUrls as string[]) ?? []}
            marqueeIconAlts={marqueeIconAlts ?? []}
          />

          {/* Right fade */}
          <div className="pointer-events-none absolute inset-y-0 inset-e-0 z-10 w-24 lg:w-40 bg-linear-to-l rtl:bg-linear-to-r from-background to-transparent" />
        </div>
      </SectionReveal>
    </section>
  );
};
