"use client";

import { BackgroundOverlay } from "@/components/ui/background-overlay";
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav";
import { SectionReveal } from "@/components/ui/section-reveal";
import { getMediaAlt, getMediaUrl } from "@/lib/utils";
import type { AboutHeroBlock as AboutHeroBlockType } from "@/payload-types";
import React from "react";

/**
 * AboutHeroBlock Component - Render block for the About Hero section.
 */
export const AboutHeroBlock: React.FC<AboutHeroBlockType> = ({
  breadcrumb,
  title,
  subtitle,
  backgroundImage,
}) => {
  const bgImageUrl = getMediaUrl(backgroundImage);
  const bgImageAlt = getMediaAlt(backgroundImage, "About Hero Background");

  return (
    <section
      className="relative overflow-hidden text-white pt-32 pb-20 lg:pt-40 lg:pb-28 rounded-none lg:rounded-b-[3.5rem]"
      id="about-hero"
    >
      <BackgroundOverlay
        src={bgImageUrl}
        alt={bgImageAlt}
        overlayClass="bg-black/85"
        className="object-cover object-top"
        priority
      />

      <div className="relative z-10 mx-auto px-4 lg:px-14 flex flex-col items-center text-center">
        <SectionReveal direction="up" className="w-full max-w-262.5 flex flex-col items-center">
          <BreadcrumbNav items={breadcrumb} />

          <h1 className="font-montserrat font-semibold text-xl lg:text-[4.375rem] leading-[130%] lg:leading-17.25 tracking-[-7%] text-center uppercase mb-2 lg:mb-6">
            {title}
          </h1>

          {subtitle && (
            <p className="font-poppins lg:text-[1.1875rem] leading-[130%] text-sm lg:text-base text-center text-white/70 max-w-4xl">
              {subtitle}
            </p>
          )}
        </SectionReveal>
      </div>
    </section>
  );
};
