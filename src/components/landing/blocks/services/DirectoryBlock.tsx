"use client";

import { BackgroundOverlay } from "@/components/ui/background-overlay";
import { Eyebrow, HighlightedTitle } from "@/components/ui/highlighted-title";
import { SectionReveal } from "@/components/ui/section-reveal";
import { TextureWaves } from "@/components/ui/texture-waves";
import { cn, getMediaAlt, getMediaUrl } from "@/lib/utils";
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
  isProjectPage,
  backgroundImage,
  textureWavesImage,
  list,
}) => {
  const bgUrl = getMediaUrl(backgroundImage);
  const bgAlt = getMediaAlt(backgroundImage, "Background");

  return (
    <section className="relative overflow-hidden bg-background py-10 lg:py-18" id="directory">
      {!isProjectPage && <BackgroundOverlay src={bgUrl} alt={bgAlt} opacityClass="opacity-3" />}
      <TextureWaves image={textureWavesImage} position={isProjectPage ? "both" : "top"} />

      <div className="relative z-10 mx-auto flex flex-col lg:flex-row gap-6 lg:gap-18 px-4 lg:px-14 lg:items-stretch">
        {/* Heading Section */}
        <SectionReveal direction="up" className={cn("w-full", isProjectPage ? "max-w-lg" : "")}>
          <div className="flex flex-col items-start gap-4">
            <div className="flex flex-col gap-2 lg:gap-1">
              <Eyebrow text={eyebrow} />
              <HighlightedTitle
                titleBeforeHighlight={titleBeforeHighlight}
                highlightedTitle={highlightedTitle}
                titleAfterHighlight={titleAfterHighlight}
                className={cn("lg:text-4xl!", isProjectPage ? "max-w-lg" : "")}
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
          <div className={cn("w-full flex", isProjectPage ? "" : "lg:mt-7")}>
            <div
              className={cn(
                "grid grid-cols-1 lg:grid-cols-2 flex-1 h-full",
                isProjectPage ? "gap-7.5 w-full" : "max-lg:gap-12 lg:justify-between lg:gap-18",
              )}
            >
              {list?.map(({ description, title, icon, id }, index) => (
                <SectionReveal
                  key={id ?? index}
                  direction="up"
                  delay={0.1 + index * 0.08}
                  className="h-full last:col-span-2"
                >
                  <div
                    className={cn(
                      "flex gap-6 group h-full",
                      isProjectPage
                        ? "flex-row px-4 py-8 rounded-[1rem] bg-white border border-outline/30 shadow-sm"
                        : "flex-row items-start",
                    )}
                  >
                    <Logo
                      logoSvg={icon}
                      width={isProjectPage ? 24 : 40}
                      height={isProjectPage ? 24 : 40}
                      alt={title}
                      className={cn(
                        "text-primary-500 group-hover:scale-110 transition-transform duration-300 shrink-0",
                        isProjectPage ? "w-6 h-6 mt-1" : "w-10 h-10",
                      )}
                    />
                    <div
                      className={cn(
                        "flex flex-col flex-1",
                        isProjectPage
                          ? "gap-2 pb-4 border-b border-primary-100/70"
                          : "pb-4 border-b border-outline/30",
                      )}
                    >
                      <span className="font-poppins font-semibold text-xl leading-[160%] tracking-[-7%] uppercase group-hover:text-primary-500 transition-colors duration-300">
                        {title}
                      </span>
                      <p className="font-poppins text-sm leading-[160%] text-foreground/70">
                        {description}
                      </p>
                    </div>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
