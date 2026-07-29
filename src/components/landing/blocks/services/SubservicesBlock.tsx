"use client";

import { BackgroundOverlay } from "@/components/ui/background-overlay";
import { Eyebrow, HighlightedTitle } from "@/components/ui/highlighted-title";
import { SectionReveal } from "@/components/ui/section-reveal";
import { TextureWaves } from "@/components/ui/texture-waves";
import { getMediaAlt, getMediaUrl } from "@/lib/utils";
import type { SubservicesBlock as SubservicesBlockType } from "@/payload-types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
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
      <BackgroundOverlay src={bgUrl} alt={bgAlt} opacityClass="opacity-5" />
      <TextureWaves image={textureWavesImage} position="top" />

      <div className="relative z-10 mx-auto flex flex-col gap-8 lg:gap-14 px-4 lg:px-14">
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

        {/* Count Banner Group */}
        {(countGroup?.countTitle || countGroup?.countDescription) && (
          <SectionReveal direction="up" delay={0.05} className="w-full">
            <div className="relative overflow-hidden rounded-2xl bg-primary-900 border border-outline/30 p-6 lg:p-10 flex flex-col gap-2">
              <BackgroundOverlay src={countBgUrl} alt={countBgAlt} opacityClass="opacity-15" />
              {countGroup.countTitle && (
                <h3 className="font-montserrat font-bold text-2xl lg:text-4xl text-white uppercase">
                  {countGroup.countTitle}
                </h3>
              )}
              {countGroup.countDescription && (
                <p className="font-poppins text-sm lg:text-base text-gray-200 leading-relaxed">
                  {countGroup.countDescription}
                </p>
              )}
            </div>
          </SectionReveal>
        )}

        {/* Subservices List */}
        {subservices && subservices.length > 0 && (
          <SectionReveal direction="up" delay={0.1} className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {subservices.map((item, index) => (
                <div
                  key={item.id || index}
                  className="flex flex-col p-6 rounded-2xl bg-white border border-outline/30 shadow-sm justify-between gap-6"
                >
                  <div className="flex flex-col gap-3">
                    {item.supertitle && (
                      <span className="font-poppins text-xs font-semibold text-primary-500 uppercase">
                        {item.supertitle}
                      </span>
                    )}
                    <h3 className="font-montserrat font-semibold text-lg lg:text-xl text-foreground uppercase">
                      {item.title}
                    </h3>
                    {item.subtitle && (
                      <p className="font-poppins text-sm leading-relaxed text-foreground/70">
                        {item.subtitle}
                      </p>
                    )}
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {item.tags.map((t, tIdx) => (
                          <span
                            key={t.id || tIdx}
                            className="font-poppins text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 font-medium"
                          >
                            {t.tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {item.ctaText && item.ctaHref && (
                    <div className="pt-4 border-t border-outline/20">
                      <Link
                        href={item.ctaHref}
                        className="inline-flex items-center gap-2 font-display font-semibold text-sm text-primary-500 hover:text-primary-600 uppercase"
                      >
                        <span>{item.ctaText}</span>
                        <ArrowRight className="w-4 h-4 -rotate-30" />
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </SectionReveal>
        )}
      </div>
    </section>
  );
};
