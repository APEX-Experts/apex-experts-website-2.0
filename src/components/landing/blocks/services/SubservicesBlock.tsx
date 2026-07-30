"use client";

import { BackgroundOverlay } from "@/components/ui/background-overlay";
import { Eyebrow, HighlightedTitle } from "@/components/ui/highlighted-title";
import { SectionReveal } from "@/components/ui/section-reveal";
import { ServiceCard } from "@/components/ui/service-card";
import { getMediaAlt, getMediaUrl, zeroPadNumber } from "@/lib/utils";
import type { SubservicesBlock as SubservicesBlockType } from "@/payload-types";
import React from "react";

/**
 * SubservicesBlock Component - Renders Subservices section with count banner and items grid.
 */
export const SubservicesBlock: React.FC<SubservicesBlockType> = ({
  eyebrow,
  titleBeforeHighlight,
  highlightedTitle,
  titleAfterHighlight,
  subtitle,
  backgroundImage,
  textureWavesImage,
  countGroup,
  subservices,
}) => {
  const bgUrl = getMediaUrl(backgroundImage);
  const bgAlt = getMediaAlt(backgroundImage, "Background");
  const countBgUrl = getMediaUrl(countGroup?.countBackgroundImage);
  const countBgAlt = getMediaAlt(countGroup?.countBackgroundImage, "Count background");

  return (
    <section className="relative overflow-hidden bg-background py-10 lg:py-18" id="subservices">
      <BackgroundOverlay src={bgUrl} alt={bgAlt} opacityClass="opacity-8" />

      <div className="relative z-10 mx-auto flex flex-col gap-8 lg:gap-14">
        <div className="relative flex flex-col lg:flex-row gap-4 lg:justify-between lg:items-end w-full px-4 lg:px-14">
          {/* Heading Section */}
          <SectionReveal direction="up" className="w-full max-w-3xl">
            <div className="flex flex-col items-start gap-4">
              <div className="flex flex-col gap-2 lg:gap-1">
                <Eyebrow text={eyebrow} />
                <HighlightedTitle
                  titleBeforeHighlight={titleBeforeHighlight}
                  highlightedTitle={highlightedTitle}
                  titleAfterHighlight={titleAfterHighlight}
                />
              </div>
              {subtitle && (
                <p className="font-poppins text-sm leading-[130%] text-gray-500 lg:text-base lg:leading-7.25 max-w-4xl">
                  {subtitle}
                </p>
              )}
            </div>
          </SectionReveal>
          <div className="w-full lg:max-w-111 rounded-[0.5rem] p-4 flex flex-row gap-3 relative lg:rounded-[1.5rem] lg:border lg:border-white/40 lg:py-5.5 lg:px-4 overflow-hidden">
            <div className="absolute inset-0 w-full h-full bg-linear-[90deg] from-black/90 to-transparent z-10"></div>
            <BackgroundOverlay
              src={countBgUrl}
              alt={countBgAlt}
              overlayClass="bg-black/30"
              className="scale-150 object-cover"
            />
            <span className="mt-1 text-white relative font-montserrat font-extralight italic text-2xl leading-10 lg:text-6xl z-11">
              {zeroPadNumber(subservices?.length ?? 0, 2)}
            </span>
            <div className="flex flex-col gap-2 z-11">
              <span className="font-montserrat font-semibold text-lg leading-[160%] uppercase text-white lg:text-xl">
                {countGroup?.countTitle}
              </span>
              <p className="font-montserrat text-sm leading-[160%] text-white lg:text-base">
                {countGroup?.countDescription}
              </p>
            </div>
          </div>
        </div>
        {/* List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:px-14 gap-7.5">
          {subservices?.map(
            ({ title, ctaHref, ctaText, id, subtitle, supertitle, tags }, index) => (
              <ServiceCard
                key={id ?? index}
                title={title}
                eyebrow={`${zeroPadNumber(index + 1, 2)} / ${zeroPadNumber(subservices.length, 2)}`}
                supertitle={supertitle}
                subtitle={subtitle}
                tags={tags}
                ctaText={ctaText}
                ctaHref={ctaHref}
                textureWavesImage={textureWavesImage}
                variant="dark"
              />
            ),
          )}
        </div>
      </div>
    </section>
  );
};
