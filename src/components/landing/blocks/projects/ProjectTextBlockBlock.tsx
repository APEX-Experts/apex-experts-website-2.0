"use client";

import { BackgroundOverlay } from "@/components/ui/background-overlay";
import { Eyebrow, HighlightedTitle } from "@/components/ui/highlighted-title";
import { SectionReveal } from "@/components/ui/section-reveal";
import { TextureWaves } from "@/components/ui/texture-waves";
import { getMediaAlt, getMediaUrl } from "@/lib/utils";
import type { ProjectTextBlockBlock as ProjectTextBlockBlockType } from "@/payload-types";
import { motion, useReducedMotion } from "motion/react";
import React from "react";

/**
 * ProjectTextBlockBlock Component - Renders flex row header layout on large screens.
 */
export const ProjectTextBlockBlock: React.FC<ProjectTextBlockBlockType> = ({
  eyebrow,
  titleBeforeHighlight,
  highlightedTitle,
  titleAfterHighlight,
  subtitle,
  backgroundImage,
  wavesTextureImage,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const bgUrl = getMediaUrl(backgroundImage);
  const bgAlt = getMediaAlt(backgroundImage, "Background");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      className="relative overflow-hidden bg-background py-10 lg:py-18"
      id="project-text-block"
    >
      <BackgroundOverlay src={bgUrl} alt={bgAlt} opacityClass="opacity-3" />
      <TextureWaves image={wavesTextureImage} position="top" />

      <div className="relative z-10 mx-auto px-4 lg:px-14">
        <SectionReveal direction="up" className="w-full">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="flex flex-col lg:flex-row gap-6 lg:gap-12 lg:items-start lg:justify-between"
          >
            {/* Start: Eyebrow and Title */}
            <motion.div variants={itemVariants} className="flex flex-col gap-2 lg:gap-1 flex-1">
              <Eyebrow text={eyebrow} />
              <HighlightedTitle
                titleBeforeHighlight={titleBeforeHighlight}
                highlightedTitle={highlightedTitle}
                titleAfterHighlight={titleAfterHighlight}
              />
            </motion.div>

            {/* End: Subtitle */}
            {subtitle && (
              <motion.div variants={itemVariants} className="flex-1 lg:max-w-xl">
                <p className="font-poppins text-sm leading-[130%] text-gray-500 lg:text-base lg:leading-7.25">
                  {subtitle}
                </p>
              </motion.div>
            )}
          </motion.div>
        </SectionReveal>
      </div>
    </section>
  );
};
