"use client";

import { Eyebrow, HighlightedTitle } from "@/components/ui/highlighted-title";
import { SectionReveal } from "@/components/ui/section-reveal";
import { TextureWaves } from "@/components/ui/texture-waves";
import { getMediaAlt, getMediaUrl } from "@/lib/utils";
import type { AboutWaysBlock as AboutWaysBlockType } from "@/payload-types";
import { motion } from "motion/react";
import React from "react";

/**
 * AboutWaysBlock Component - Displays the "Ways" section with header and cards.
 */
export const AboutWaysBlock: React.FC<AboutWaysBlockType> = ({
  eyebrow,
  titleBeforeHighlight,
  highlightedTitle,
  titleAfterHighlight,
  subtitle,
  textureWavesImage,
  bestSuitedForLabel,
  ways,
}) => {
  return (
    <section className="relative overflow-hidden bg-background py-10 lg:py-18" id="about-ways">
      <TextureWaves image={textureWavesImage} position="both" />

      <div className="relative z-10 mx-auto flex flex-col lg:flex-row gap-6 lg:gap-16 px-4 lg:px-14">
        {/* Heading Section */}
        <SectionReveal direction="up" className="w-full max-w-140">
          <div className="flex flex-col items-start gap-4">
            <div className="flex flex-col gap-2 lg:gap-1">
              <Eyebrow text={eyebrow} />
              <HighlightedTitle
                titleBeforeHighlight={titleBeforeHighlight}
                highlightedTitle={highlightedTitle}
                titleAfterHighlight={titleAfterHighlight}
                className="lg:max-w-4xl"
              />
            </div>
            {subtitle && (
              <p className="font-poppins text-sm leading-[130%] text-gray-500 lg:text-base lg:leading-7.25 max-w-4xl">
                {subtitle}
              </p>
            )}
          </div>
        </SectionReveal>

        {/* Ways Grid */}
        {ways && ways.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.12,
                },
              },
            }}
            className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
          >
            {ways.map((way, index) => (
              <motion.div
                key={way.id || index}
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                }}
                whileHover={{ y: -4 }}
                className="flex flex-col pb-8 lg:px-6 lg:py-8 lg:rounded-[1.5rem] bg-white border-b lg:border border-outline/30 lg:shadow-sm gap-4 justify-between"
              >
                <div className="flex flex-col gap-2">
                  {way.eyebrow && (
                    <span className="font-poppins text-sm lg:text-base text-primary-500 uppercase leading-[130%]">
                      {way.eyebrow}
                    </span>
                  )}
                  <h3 className="font-montserrat font-semibold text-2xl text-foreground uppercase leading-[130%]">
                    {way.title}
                  </h3>
                  <p className="font-poppins text-sm lg:text-base leading-[130%] lg:leading-7.25 text-foreground/70">
                    {way.description}
                  </p>
                </div>

                {way.bestSuitedForText && (
                  <div className="pt-4 border-t border-error-100 mt-auto flex flex-col gap-2">
                    <span className="font-poppins font-medium text-foreground uppercase leading-[130%]">
                      {bestSuitedForLabel || "Best suited for"}
                    </span>
                    <p className="font-poppins text-sm lg:text-base text-foreground/70 leading-[130%] lg:leading-7.25">
                      {way.bestSuitedForText}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};
