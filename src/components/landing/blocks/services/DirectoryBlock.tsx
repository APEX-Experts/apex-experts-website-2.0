"use client";

import { BackgroundOverlay } from "@/components/ui/background-overlay";
import { Eyebrow, HighlightedTitle } from "@/components/ui/highlighted-title";
import { SectionReveal } from "@/components/ui/section-reveal";
import { TextureWaves } from "@/components/ui/texture-waves";
import { getMediaAlt, getMediaUrl } from "@/lib/utils";
import type { DirectoryBlock as DirectoryBlockType } from "@/payload-types";
import React from "react";
import { Logo } from "../../layout/logo";

/**
 * DirectoryBlock Component - Renders Directory section.
 */
export const DirectoryBlock: React.FC<DirectoryBlockType> = ({
  eyebrow,
  titleBeforeHighlight,
  highlightedTitle,
  titleAfterHighlight,
  subtitle,
  backgroundImage,
  textureWavesImage,
  list,
}) => {
  const bgUrl = getMediaUrl(backgroundImage);
  const bgAlt = getMediaAlt(backgroundImage, "Background");

  return (
    <section className="relative overflow-hidden bg-background py-10 lg:py-18" id="directory">
      <BackgroundOverlay src={bgUrl} alt={bgAlt} opacityClass="opacity-3" />
      <TextureWaves image={textureWavesImage} position="top" />

      <div className="relative z-10 mx-auto flex flex-col lg:flex-row gap-6 lg:gap-18 px-4 lg:px-14 lg:items-stretch">
        {/* Heading Section */}
        <SectionReveal direction="up" className="w-full max-w-2xl">
          <div className="flex flex-col items-start gap-4">
            <div className="flex flex-col gap-2 lg:gap-1">
              <Eyebrow text={eyebrow} />
              <HighlightedTitle
                titleBeforeHighlight={titleBeforeHighlight}
                highlightedTitle={highlightedTitle}
                titleAfterHighlight={titleAfterHighlight}
                className="lg:text-4xl!"
              />
            </div>
            {subtitle && (
              <p className="font-poppins text-sm leading-[130%] text-gray-500 lg:text-base lg:leading-7.25 max-w-4xl">
                {subtitle}
              </p>
            )}
          </div>
        </SectionReveal>

        {/* Directory List */}
        {list && list.length > 0 && (
          <SectionReveal direction="up" delay={0.1} className="w-full flex lg:mt-7">
            <div className="grid grid-cols-1 lg:grid-cols-2 max-lg:gap-12 lg:justify-between lg:gap-18 flex-1">
              {list?.map(({ description, title, icon, id }, index) => (
                <div key={id ?? index} className="flex flex-row gap-6 items-start h-fit">
                  <Logo
                    logoSvg={icon}
                    width={40}
                    height={40}
                    alt={title}
                    className="text-primary-500 w-10 h-10"
                  />
                  <div className="flex flex-col">
                    <span className="font-poppins font-semibold text-xl leading-[160%] tracking-[-7%] uppercase">
                      {title}
                    </span>
                    <p className="font-poppins text-sm leading-[160%] text-foreground/70">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </SectionReveal>
        )}
      </div>
    </section>
  );
};
