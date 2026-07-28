"use client";

import { BackgroundOverlay } from "@/components/ui/background-overlay";
import { Eyebrow, HighlightedTitle } from "@/components/ui/highlighted-title";
import { SectionReveal } from "@/components/ui/section-reveal";
import { getMediaAlt, getMediaUrl } from "@/lib/utils";
import type { IndustriesBlock as IndustriesBlockType } from "@/payload-types";
import Image from "next/image";
import React from "react";

/**
 * IndustriesBlock Component - Displays the Industries section with header and grid of industry cards.
 */
export const IndustriesBlock: React.FC<IndustriesBlockType> = ({
  eyebrow,
  titleBeforeHighlight,
  highlightedTitle,
  titleAfterHighlight,
  subtitle,
  backgroundImage,
  industriesBackgroundImage,
  industries,
}) => {
  const bgImageUrl = getMediaUrl(backgroundImage);
  const bgImageAlt = getMediaAlt(backgroundImage, "Industries background");
  const industriesBgUrl = getMediaUrl(industriesBackgroundImage);
  const industriesBgAlt = getMediaAlt(industriesBackgroundImage, "Industries texture");

  return (
    <section className="relative overflow-hidden bg-background py-10 lg:py-18" id="industries">
      <BackgroundOverlay src={bgImageUrl} alt={bgImageAlt} opacityClass="opacity-5" />

      <div className="relative z-10 mx-auto flex flex-col gap-8 lg:gap-18">
        {/* Heading Section */}
        <SectionReveal direction="up" className="w-full px-4 lg:px-14">
          <div className="flex flex-col items-start gap-4">
            <div className="flex flex-col gap-2 lg:gap-1">
              <Eyebrow text={eyebrow} />
              <HighlightedTitle
                titleBeforeHighlight={titleBeforeHighlight}
                highlightedTitle={highlightedTitle}
                titleAfterHighlight={titleAfterHighlight}
                className="lg:max-w-4xl"
              />
            </div>
            {subtitle && (
              <p className="font-poppins text-sm leading-[130%] text-gray-500 lg:text-base lg:leading-7.25 max-w-4xl">
                {subtitle}
              </p>
            )}
          </div>
        </SectionReveal>

        {/* Industries Grid & Card Content */}
        {industries && industries.length > 0 && (
          <SectionReveal direction="up" delay={0.1} className="w-full lg:px-14">
            <div className="relative lg:rounded-[2rem] px-4 py-6 lg:p-10 border border-outline/30 overflow-hidden bg-white/5 backdrop-blur-xs">
              {industriesBgUrl && (
                <div className="absolute inset-0 w-full h-full pointer-events-none">
                  <Image
                    src={industriesBgUrl}
                    alt={industriesBgAlt}
                    fill
                    className="object-cover object-center"
                  />
                </div>
              )}
              <div className="absolute inset-0 w-full h-full pointer-events-none bg-black/50" />

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
                {industries.map((item, index) => (
                  <div
                    key={item.id || index}
                    className="flex flex-col gap-2 px-4 py-6 lg:py-8 rounded-[1.5rem] bg-black/30 border border-outline/30"
                  >
                    {item.eyebrow && (
                      <span className="font-poppins text-[0.8125rem] lg:text-base text-white uppercase max-lg:mb-1">
                        {item.eyebrow}
                      </span>
                    )}
                    <h3 className="font-montserrat font-semibold text-white text-[1.375rem] leading-[130%] uppercase lg:text-[2.3125rem] mb-3 lg:mb-2">
                      {item.title}
                    </h3>
                    <p className="font-poppins text-sm leading-[130%] text-white">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>
        )}
      </div>
    </section>
  );
};
