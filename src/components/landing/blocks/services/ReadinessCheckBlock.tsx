"use client";

import { Eyebrow, HighlightedTitle } from "@/components/ui/highlighted-title";
import { SectionReveal } from "@/components/ui/section-reveal";
import { TextureWaves } from "@/components/ui/texture-waves";
import type { ReadinessCheckBlock as ReadinessCheckBlockType } from "@/payload-types";
import React from "react";

/**
 * ReadinessCheckBlock Component - Renders Readiness Check items list.
 */
export const ReadinessCheckBlock: React.FC<ReadinessCheckBlockType> = ({
  eyebrow,
  titleBeforeHighlight,
  highlightedTitle,
  titleAfterHighlight,
  subtitle,
  items,
  textureWavesImage,
}) => {
  return (
    <section className="relative overflow-hidden bg-background py-10 lg:py-18" id="readiness-check">
      <TextureWaves image={textureWavesImage} position="top" />

      <div className="relative z-10 mx-auto flex flex-col gap-8 lg:gap-18 px-4 lg:px-14">
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

        {/* Readiness Checklist Grid */}
        {items && items.length > 0 && (
          <SectionReveal direction="up" delay={0.1} className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {items.map((item, index) => (
                <div
                  key={item.id || index}
                  className="flex flex-col p-6 rounded-2xl bg-white border border-outline/30 shadow-sm gap-3"
                >
                  <h3 className="font-montserrat font-semibold text-lg lg:text-xl text-foreground uppercase">
                    {item.title}
                  </h3>
                  <p className="font-poppins text-sm leading-relaxed text-foreground/70">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </SectionReveal>
        )}
      </div>
    </section>
  );
};
