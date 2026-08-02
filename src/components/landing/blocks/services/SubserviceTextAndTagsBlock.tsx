"use client";

import { BackgroundOverlay } from "@/components/ui/background-overlay";
import { Eyebrow, HighlightedTitle } from "@/components/ui/highlighted-title";
import { SectionReveal } from "@/components/ui/section-reveal";
import { getMediaAlt, getMediaUrl } from "@/lib/utils";
import type { SubserviceTextAndTagsBlock as SubserviceTextAndTagsBlockType } from "@/payload-types";
import React from "react";

/**
 * SubserviceTextAndTagsBlock Component - Displays heading with tags list.
 */
export const SubserviceTextAndTagsBlock: React.FC<SubserviceTextAndTagsBlockType> = ({
  eyebrow,
  titleBeforeHighlight,
  highlightedTitle,
  titleAfterHighlight,
  subtitle,
  tags,
  backgroundImage,
}) => {
  const bgUrl = getMediaUrl(backgroundImage);
  const bgAlt = getMediaAlt(backgroundImage, "Background");

  return (
    <section className="relative overflow-hidden bg-background py-10 lg:py-18" id="subservice-text-tags">
      <BackgroundOverlay src={bgUrl} alt={bgAlt} opacityClass="opacity-5" />

      <div className="relative z-10 mx-auto flex flex-col gap-8 lg:gap-12 px-4 lg:px-14">
        {/* Heading Section */}
        <SectionReveal direction="up" className="w-full max-w-4xl">
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

        {/* Tags List */}
        {tags && tags.length > 0 && (
          <SectionReveal direction="up" delay={0.1} className="w-full">
            <div className="flex flex-wrap gap-3">
              {tags.map((t, index) => (
                <span
                  key={t.id || index}
                  className="font-poppins text-sm lg:text-base px-4 py-2 rounded-full bg-white border border-outline/30 text-foreground font-medium shadow-xs"
                >
                  {t.tag}
                </span>
              ))}
            </div>
          </SectionReveal>
        )}
      </div>
    </section>
  );
};
