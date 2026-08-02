"use client";

import { BackgroundOverlay } from "@/components/ui/background-overlay";
import { Eyebrow, HighlightedTitle } from "@/components/ui/highlighted-title";
import { SectionReveal } from "@/components/ui/section-reveal";
import { TextureWaves } from "@/components/ui/texture-waves";
import { getMediaAlt, getMediaUrl } from "@/lib/utils";
import type { SubservicePipelineBlock as SubservicePipelineBlockType } from "@/payload-types";
import Image from "next/image";
import React from "react";

/**
 * SubservicePipelineBlock Component - Displays pipeline steps with 3 images each.
 */
export const SubservicePipelineBlock: React.FC<SubservicePipelineBlockType> = ({
  eyebrow,
  titleBeforeHighlight,
  highlightedTitle,
  titleAfterHighlight,
  subtitle,
  pipeline,
  backgroundImage,
  textureWavesImage,
}) => {
  const bgUrl = getMediaUrl(backgroundImage);
  const bgAlt = getMediaAlt(backgroundImage, "Background");

  return (
    <section className="relative overflow-hidden bg-background py-10 lg:py-18" id="subservice-pipeline">
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

        {/* Pipeline Steps List */}
        {pipeline && pipeline.length > 0 && (
          <SectionReveal direction="up" delay={0.1} className="w-full flex flex-col gap-8">
            {pipeline.map((step, index) => (
              <div
                key={step.id || index}
                className="flex flex-col lg:flex-row gap-6 lg:gap-8 p-6 lg:p-8 rounded-2xl bg-white border border-outline/30 shadow-sm items-center justify-between"
              >
                <div className="flex flex-col gap-2 flex-1">
                  <h3 className="font-montserrat font-semibold text-xl lg:text-2xl text-foreground uppercase">
                    {step.title}
                  </h3>
                  <p className="font-poppins text-sm lg:text-base leading-relaxed text-foreground/70">
                    {step.description}
                  </p>
                </div>

                {step.images && step.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 w-full lg:w-1/2">
                    {step.images.slice(0, 3).map((imgItem, imgIdx) => {
                      const imgUrl = getMediaUrl(imgItem.image);
                      const imgAlt = getMediaAlt(imgItem.image, `Pipeline ${index + 1} Image ${imgIdx + 1}`);

                      return imgUrl ? (
                        <div
                          key={imgItem.id || imgIdx}
                          className="relative w-full aspect-square rounded-xl overflow-hidden shadow-xs"
                        >
                          <Image src={imgUrl} alt={imgAlt} fill className="object-cover" />
                        </div>
                      ) : null;
                    })}
                  </div>
                )}
              </div>
            ))}
          </SectionReveal>
        )}
      </div>
    </section>
  );
};
