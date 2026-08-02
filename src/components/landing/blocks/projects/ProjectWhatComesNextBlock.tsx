"use client";

import { BackgroundOverlay } from "@/components/ui/background-overlay";
import { Eyebrow, HighlightedTitle } from "@/components/ui/highlighted-title";
import { SectionReveal } from "@/components/ui/section-reveal";
import { TextureWaves } from "@/components/ui/texture-waves";
import { getMediaAlt, getMediaUrl } from "@/lib/utils";
import type { ProjectWhatComesNextBlock as ProjectWhatComesNextBlockType } from "@/payload-types";
import { motion, useReducedMotion } from "motion/react";
import React from "react";

/**
 * ProjectWhatComesNextBlock Component - Displays items grid for what comes next.
 */
export const ProjectWhatComesNextBlock: React.FC<ProjectWhatComesNextBlockType> = ({
  eyebrow,
  titleBeforeHighlight,
  highlightedTitle,
  titleAfterHighlight,
  subtitle,
  items,
  backgroundImage,
  textureWavesImage,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const bgUrl = getMediaUrl(backgroundImage);
  const bgAlt = getMediaAlt(backgroundImage, "Background");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      className="relative overflow-hidden bg-background py-10 lg:py-18"
      id="project-what-comes-next"
    >
      <BackgroundOverlay src={bgUrl} alt={bgAlt} opacityClass="opacity-8" />
      <TextureWaves image={textureWavesImage} position="top" />

      <div className="relative z-10 mx-auto flex flex-col gap-8 lg:gap-14 px-4 lg:px-14">
        {/* Heading Section */}
        <SectionReveal direction="up" className="w-full">
          <div className="flex flex-col items-start gap-4">
            <div className="flex flex-col gap-2 lg:gap-1">
              <Eyebrow text={eyebrow} />
              <HighlightedTitle
                titleBeforeHighlight={titleBeforeHighlight}
                highlightedTitle={highlightedTitle}
                titleAfterHighlight={titleAfterHighlight}
                className="lg:max-w-sm"
              />
            </div>
            {subtitle && (
              <p className="font-poppins text-sm leading-[130%] lg:text-base lg:leading-6 text-foreground/70">
                {subtitle}
              </p>
            )}
          </div>
        </SectionReveal>

        {/* Items Grid */}
        {items && items.length > 0 && (
          <SectionReveal direction="up" delay={0.1} className="w-full">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={containerVariants}
              className="grid grid-cols-1 gap-7.5 lg:gap-8"
            >
              {items.map((item, index) => (
                <motion.div
                  key={item.id || index}
                  variants={itemVariants}
                  whileHover={{ y: shouldReduceMotion ? 0 : -4 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col px-4 py-8 lg:py-10 rounded-[1rem] bg-white border border-outline/30 shadow-sm hover:shadow-md hover:border-outline/60 gap-2 group cursor-default transition-all duration-300"
                >
                  <h3 className="font-montserrat font-semibold text-xl lg:text-2xl uppercase text-foreground transition-colors duration-300 group-hover:text-primary-600">
                    {item.title}
                  </h3>
                  <p className="font-poppins text-sm lg:text-base leading-relaxed text-foreground/70 max-lg:pb-4 max-lg:border-b max-lg:border-primary-100/70 lg:max-w-3xl transition-colors duration-300 group-hover:text-foreground/90">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </SectionReveal>
        )}
      </div>
    </section>
  );
};
