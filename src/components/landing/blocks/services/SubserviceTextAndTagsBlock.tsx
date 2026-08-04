"use client";

import { BackgroundOverlay } from "@/components/ui/background-overlay";
import { Eyebrow, HighlightedTitle } from "@/components/ui/highlighted-title";
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
    <section
      className="relative overflow-hidden bg-background py-6 px-4 lg:px-10"
      id="subservice-text-tags"
    >
      <BackgroundOverlay
        src={bgUrl}
        alt={bgAlt}
        opacityClass="opacity-100"
        overlayClass="bg-black/60"
      />
      <div className="flex flex-col lg:flex-row bg-black/50 border border-outline/30 rounded-[1.5rem] gap-8 p-6 lg:p-10 lg:justify-between lg:gap-4 lg:rounded-[2rem] lg:bg-black/30 text-white relative items-start lg:items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col gap-2 lg:gap-1">
            <Eyebrow text={eyebrow} />
            <HighlightedTitle
              titleBeforeHighlight={titleBeforeHighlight}
              highlightedTitle={highlightedTitle}
              titleAfterHighlight={titleAfterHighlight}
              className="lg:max-w-145 text-white"
            />
          </div>
          {subtitle && (
            <p className="font-poppins text-sm leading-[130%] text-gray-500 lg:text-base lg:leading-7.25 max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-x-2.5 lg:gap-y-4 lg:px-6 flex-1 w-full">
          {tags?.map(({ tag, id }, index) => (
            <li
              key={id ?? index}
              className="rounded-full p-4 border border-outline/30 font-montserrat font-semibold text-base leading-[160%] text-white text-center"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
