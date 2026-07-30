"use client";

import { Eyebrow, HighlightedTitle } from "@/components/ui/highlighted-title";
import { SectionReveal } from "@/components/ui/section-reveal";
import { TextureWaves } from "@/components/ui/texture-waves";
import { zeroPadNumber } from "@/lib/utils";
import type { ReadinessCheckBlock as ReadinessCheckBlockType } from "@/payload-types";
import React from "react";
import { motion } from "motion/react";

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
      <TextureWaves image={textureWavesImage} position="both-reversed" />

      <div className="relative z-10 mx-auto flex flex-col gap-6 lg:flex-row lg:gap-0 px-4 lg:px-14">
        {/* Heading Section */}
        <SectionReveal direction="up" className="w-full">
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
          <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-7.5">
              {items.map((item, index) => (
                <SectionReveal
                  key={item.id || index}
                  direction="up"
                  delay={0.1 + index * 0.08}
                  className="lg:last:odd:col-span-2"
                >
                  <motion.div
                    whileHover={{ y: -4, scale: 1.01 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-row gap-2 items-start py-8 px-4 rounded-2xl bg-white border border-outline/30 shadow-sm transition-shadow duration-300 hover:shadow-md h-full"
                  >
                    <span className="font-poppins text-base uppercase text-primary-500 whitespace-nowrap mt-1">
                      {zeroPadNumber(index + 1, 2)} /
                    </span>
                    <div className="flex flex-col gap-2">
                      <h3 className="font-montserrat font-semibold text-xl text-foreground uppercase">
                        {item.title}
                      </h3>
                      <p className="font-poppins text-sm leading-[160%] text-foreground/70">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                </SectionReveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

