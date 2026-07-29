"use client";

import { Eyebrow, HighlightedTitle } from "@/components/ui/highlighted-title";
import { SectionReveal } from "@/components/ui/section-reveal";
import { TextureWaves } from "@/components/ui/texture-waves";
import { getMediaAlt, getMediaUrl } from "@/lib/utils";
import type { AboutHowWeWorkBlock as AboutHowWeWorkBlockType } from "@/payload-types";
import { motion } from "motion/react";
import Image from "next/image";
import React from "react";

/**
 * AboutHowWeWorkBlock Component - Displays process steps and core principles section.
 */
export const AboutHowWeWorkBlock: React.FC<AboutHowWeWorkBlockType> = ({
  eyebrow,
  titleBeforeHighlight,
  highlightedTitle,
  titleAfterHighlight,
  subtitle,
  textureWavesImage,
  foregroundImage,
  steps,
  principles,
}) => {
  const fgImageUrl = getMediaUrl(foregroundImage);
  const fgImageAlt = getMediaAlt(foregroundImage, "How we work illustration");
  const iconsImageUrls = principles?.map((p) => getMediaUrl(p.icon));
  const iconsImageAlts = principles?.map((p) => getMediaAlt(p.icon, p.title));

  return (
    <section className="relative overflow-hidden bg-background py-10 lg:py-18" id="how-we-work">
      <TextureWaves image={textureWavesImage} position="top" />

      <div className="relative z-10 mx-auto px-4 lg:px-14">
        {/* Heading Section */}
        <SectionReveal direction="up" className="w-full max-w-4xl">
          <div className="flex flex-col items-start gap-4 pb-8 border-b border-primary-100/50">
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
              <p className="font-poppins text-sm leading-[130%] text-gray-500 lg:text-base lg:leading-7.25">
                {subtitle}
              </p>
            )}
          </div>
        </SectionReveal>
      </div>
      {/* Steps */}
      <SectionReveal direction="up" className="w-full mt-8 lg:mt-18 lg:px-14">
        <div className="w-full relative overflow-hidden lg:rounded-[1.5rem] border border-outline/30 pb-10 lg:shadow-sm">
          <div className="flex flex-col gap-6 lg:gap-10">
            {/* Image */}
            <div className="relative overflow-hidden w-full h-55 lg:h-112">
              <Image
                src={fgImageUrl ?? ""}
                alt={fgImageAlt}
                fill
                className="object-cover object-center w-full"
              />
            </div>
            {/* Steps */}
            <div className="flex flex-row flex-wrap gap-8 px-4 lg:px-6 pb-10 border-b lg:border-b-3 border-primary-100/20">
              {steps?.map(({ title, id, paragraphs, tags }, index) => (
                <motion.div key={id ?? index} whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="flex flex-col max-w-110">
                  <div className="border-b-3 border-primary-100/20 mb-4">
                    <h4 className="font-poppins font-semibold text-2xl leading-6 text-foreground mb-3 lg:mb-2">
                      {title}
                    </h4>
                    {paragraphs?.map(({ text, id }, index) => (
                      <p
                        key={id ?? index}
                        className="mb-2 lg:mb-4 text-sm font-poppins text-foreground/70"
                      >
                        {text}
                      </p>
                    ))}
                  </div>
                  <p>
                    {tags?.map(({ tag, id }, tagIdx) => (
                      <span
                        key={id ?? index}
                        className="font-poppins font-semibold text-[0.8125rem] lg:text-sm leading-3.5 text-neutral-bg-600"
                      >
                        {tagIdx > 0 && <span className="text-gray-300 font-normal"> | </span>}
                        {tag}
                      </span>
                    ))}
                  </p>
                </motion.div>
              ))}
            </div>
            {/* Principles */}
            <div className="flex flex-row flex-wrap gap-8.5 items-center  px-4">
              {principles?.map(({ id, description, title, eyebrow }, index) => (
                <motion.div key={id ?? index} whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="flex flex-row gap-4 items-start max-w-101.5">
                  {/* Icon */}
                  <div className="w-8 h-8 lg:w-12 lg:h-12 flex items-center justify-center relative">
                    <Image
                      src={iconsImageUrls?.[index] ?? ""}
                      alt={iconsImageAlts?.[index] ?? ""}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  {/* Content */}
                  <div className="flex flex-col gap-2 max-lg:pb-7.5 max-lg:border-b max-lg:border-outline/30">
                    <div className="flex flex-col">
                      <span className="font-poppins text-sm lg:text-[0.875rem] leading-[130%] uppercase text-primary-500">
                        {eyebrow}
                      </span>
                      <h4 className="font-poppins font-medium text-xl leading-8 tracking-[-7%] uppercase">
                        {title}
                      </h4>
                    </div>
                    <p className="font-poppins text-sm leading-5 text-foreground">{description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
};
