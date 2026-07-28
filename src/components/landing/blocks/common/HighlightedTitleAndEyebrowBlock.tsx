"use client";

import { Eyebrow, HighlightedTitle } from "@/components/ui/highlighted-title";
import { SectionReveal } from "@/components/ui/section-reveal";
import type { HighlightedTitleAndEyebrowBlock as HighlightedTitleAndEyebrowBlockType } from "@/payload-types";
import React from "react";

/**
 * HighlightedTitleAndEyebrowBlock Component - Displays an eyebrow, highlighted title, and subtitle.
 */
export const HighlightedTitleAndEyebrowBlock: React.FC<HighlightedTitleAndEyebrowBlockType> = ({
  eyebrow,
  titleBeforeHighlight,
  highlightedTitle,
  titleAfterHighlight,
  subtitle,
}) => {
  return (
    <section className="relative overflow-hidden bg-background py-10 lg:py-16" id="title-eyebrow">
      <SectionReveal direction="up" className="w-full">
        <div className="flex flex-col items-start gap-4 px-4 lg:px-14 max-w-5xl">
          <div className="flex flex-col gap-2 lg:gap-1">
            <Eyebrow text={eyebrow} />
            <HighlightedTitle
              titleBeforeHighlight={titleBeforeHighlight}
              highlightedTitle={highlightedTitle}
              titleAfterHighlight={titleAfterHighlight}
            />
          </div>
          {subtitle && (
            <p className="font-poppins text-sm leading-[130%] text-gray-500 lg:text-base lg:leading-7.25">
              {subtitle}
            </p>
          )}
        </div>
      </SectionReveal>
    </section>
  );
};
