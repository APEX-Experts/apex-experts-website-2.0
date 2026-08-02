"use client";

import { BackgroundOverlay } from "@/components/ui/background-overlay";
import { Eyebrow, HighlightedTitle } from "@/components/ui/highlighted-title";
import { SectionReveal } from "@/components/ui/section-reveal";
import { getMediaAlt, getMediaUrl } from "@/lib/utils";
import type { ProjectPrinciplesBlock as ProjectPrinciplesBlockType } from "@/payload-types";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import React from "react";
import { Logo } from "../../layout/logo";

/**
 * ProjectPrinciplesBlock Component - Renders Project Principles section.
 */
export const ProjectPrinciplesBlock: React.FC<ProjectPrinciplesBlockType> = ({
  eyebrow,
  titleBeforeHighlight,
  highlightedTitle,
  titleAfterHighlight,
  subtitle,
  backgroundImage,
  cardForegroundImage,
  principles,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const bgUrl = getMediaUrl(backgroundImage);
  const bgAlt = getMediaAlt(backgroundImage, "Background");
  const fgUrl = getMediaUrl(cardForegroundImage);
  const fgAlt = getMediaAlt(cardForegroundImage, "Foreground");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
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
      id="project-principles"
    >
      <BackgroundOverlay src={bgUrl} alt={bgAlt} opacityClass="opacity-5" />

      <div className="relative z-10 mx-auto flex flex-col gap-8 lg:gap-14">
        {/* Heading Section */}
        <SectionReveal direction="up" className="w-full max-w-4xl px-4 lg:px-14">
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

        <SectionReveal
          direction="up"
          delay={0.05}
          className="w-full flex-1 flex justify-center lg:px-14"
        >
          <div className="w-full flex flex-col gap-6 lg:gap-10 lg:rounded-[1.5rem] lg:border lg:border-outline/30 principle-shadow lg:pb-10 bg-white overflow-hidden">
            {/* Foreground Image */}
            <motion.div
              whileHover={{ scale: shouldReduceMotion ? 1 : 1.01 }}
              transition={{ duration: 0.4 }}
              className="relative w-full h-55 lg:h-112 overflow-hidden group"
            >
              <Image
                src={fgUrl ?? ""}
                alt={fgAlt ?? ""}
                fill
                className="object-cover object-center w-full transition-transform duration-500 group-hover:scale-105"
              />
            </motion.div>
            {/* List */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={containerVariants}
              className="grid grid-cols-1 lg:grid-cols-2 gap-9 lg:gap-14 lg:justify-between px-4 lg:px-12"
            >
              {principles?.map(({ description, title, eyebrow, iconSvg, id }, index) => (
                <motion.div
                  key={id ?? index}
                  variants={itemVariants}
                  whileHover={{ y: shouldReduceMotion ? 0 : -3 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-row gap-4 items-start group"
                >
                  <div className="shrink-0 transition-transform duration-300 group-hover:scale-110">
                    <Logo
                      logoSvg={iconSvg}
                      alt={title}
                      height={40}
                      width={40}
                      className="w-8 h-8 lg:w-10 lg:h-10"
                    />
                  </div>
                  <div className="flex flex-col gap-2 pb-7.5 border-b border-outline/30 w-full">
                    <div className="flex flex-col">
                      {eyebrow && (
                        <span className="font-poppins text-sm uppercase text-primary-500 lg:text-[0.9375rem]">
                          {eyebrow}
                        </span>
                      )}
                      <h4 className="font-poppins font-medium text-xl leading-8 tracking-[-7%] uppercase transition-colors duration-300 group-hover:text-primary-600">
                        {title}
                      </h4>
                    </div>
                    <p className="font-poppins text-sm leading-5 text-foreground/70 transition-colors duration-300 group-hover:text-foreground/90">
                      {description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
};
