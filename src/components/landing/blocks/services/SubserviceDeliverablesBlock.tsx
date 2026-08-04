"use client";

import { BackgroundOverlay } from "@/components/ui/background-overlay";
import { Eyebrow, HighlightedTitle } from "@/components/ui/highlighted-title";
import { SectionReveal } from "@/components/ui/section-reveal";
import { getMediaAlt, getMediaUrl } from "@/lib/utils";
import type { SubserviceDeliverablesBlock as SubserviceDeliverablesBlockType } from "@/payload-types";
import React from "react";
import { Logo } from "../../layout/logo";

/**
 * SubserviceDeliverablesBlock Component - Displays deliverables with marker SVG.
 */
export const SubserviceDeliverablesBlock: React.FC<SubserviceDeliverablesBlockType> = ({
  eyebrow,
  titleBeforeHighlight,
  highlightedTitle,
  titleAfterHighlight,
  subtitle,
  deliverables,
  markerSvg,
  backgroundImage,
}) => {
  const bgUrl = getMediaUrl(backgroundImage);
  const bgAlt = getMediaAlt(backgroundImage, "Background");
  return (
    <section
      className="relative overflow-hidden bg-background py-10 lg:py-18"
      id="subservice-deliverables"
    >
      <BackgroundOverlay src={bgUrl} alt={bgAlt} opacityClass="opacity-3" />
      <div className="relative z-10 mx-auto flex flex-col gap-8 lg:gap-14">
        {/* Heading Section */}
        <SectionReveal direction="up" className="w-full max-w-4xl px-4 lg:px-14">
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
              <p className="font-poppins text-sm leading-[130%] text-gray-500 lg:text-base lg:leading-7.25 max-w-4xl">
                {subtitle}
              </p>
            )}
          </div>
        </SectionReveal>

        {/* Deliverables Grid */}
        {deliverables && deliverables.length > 0 && (
          <SectionReveal direction="up" delay={0.1} className="w-full lg:px-14">
            <div className="max-lg:py-4 max-lg:px-4 grid gird-cols-1 lg:grid-cols-2 gap-6 bg-transparent rounded-none max-lg:border-t max-lg:border-outline/30 lg:rounded-[1.5rem] lg:p-10 lg:bg-white lg:gap-x-10 lg:gap-y-14">
              {deliverables.map(({ deliverable, id }, index) => (
                <div
                  key={id ?? index}
                  className="rounded-[0.75rem] border border-outline/30 flex flex-row justify-between py-6 px-4 lg:rounded-[1.5rem] lg:py-10 lg:px-6"
                >
                  <Logo
                    logoSvg={markerSvg}
                    width={24}
                    height={24}
                    className="w-4 h-4 lg:w-6 lg:h-6 text-primary-500/32"
                  />
                  <span className="font-montserrat font-semibold text-sm text-center uppercase text-foreground lg:text-2xl">
                    {deliverable}
                  </span>
                  <Logo
                    logoSvg={markerSvg}
                    width={24}
                    height={24}
                    className="w-4 h-4 lg:w-6 lg:h-6 text-primary-500/32"
                  />
                </div>
              ))}
            </div>
          </SectionReveal>
        )}
      </div>
    </section>
  );
};
