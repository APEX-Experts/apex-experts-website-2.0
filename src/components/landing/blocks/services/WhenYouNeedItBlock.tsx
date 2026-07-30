"use client";

import { BackgroundOverlay } from "@/components/ui/background-overlay";
import { Eyebrow, HighlightedTitle } from "@/components/ui/highlighted-title";
import { SectionReveal } from "@/components/ui/section-reveal";
import { ServiceCard } from "@/components/ui/service-card";
import { getMediaAlt, getMediaUrl } from "@/lib/utils";
import type { WhenYouNeedItBlock as WhenYouNeedItBlockType } from "@/payload-types";
import React from "react";

/**
 * WhenYouNeedItBlock Component - Renders "When You Need It" scenario cards.
 */
export const WhenYouNeedItBlock: React.FC<WhenYouNeedItBlockType> = ({
  eyebrow,
  titleBeforeHighlight,
  highlightedTitle,
  titleAfterHighlight,
  subtitle,
  textureWavesImage,
  backgroundImage,
  items,
}) => {
  const bgUrl = getMediaUrl(backgroundImage);
  const bgAlt = getMediaAlt(backgroundImage, "Background");

  return (
    <section
      className="relative overflow-hidden bg-background py-10 lg:py-18"
      id="when-you-need-it"
    >
      <BackgroundOverlay src={bgUrl} alt={bgAlt} opacityClass="opacity-3" />

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
                className="lg:max-w-3xl"
              />
            </div>
            {subtitle && (
              <p className="font-poppins text-sm leading-[130%] text-gray-500 lg:text-base lg:leading-7.25 max-w-6xl">
                {subtitle}
              </p>
            )}
          </div>
        </SectionReveal>

        {/* Scenario Items */}
        {items && items.length > 0 && (
          <div className="w-full lg:px-14">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-7.5">
              {items.map(({ title, eyebrow, id, subtitle, supertitle, tags }, index) => (
                <SectionReveal key={id ?? index} direction="up" delay={0.1 + index * 0.08}>
                  <ServiceCard
                    title={title}
                    eyebrow={eyebrow}
                    supertitle={supertitle}
                    subtitle={subtitle}
                    tags={tags}
                    textureWavesImage={textureWavesImage}
                    variant="light"
                  />
                </SectionReveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
