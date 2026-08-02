"use client";

import { Eyebrow, HighlightedTitle } from "@/components/ui/highlighted-title";
import { SectionReveal } from "@/components/ui/section-reveal";
import { TextureWaves } from "@/components/ui/texture-waves";
import type { ProjectValueBlock as ProjectValueBlockType } from "@/payload-types";
import { motion, useReducedMotion } from "motion/react";
import React from "react";

/**
 * ProjectValueBlock Component - Displays Project Value items with icons.
 */
export const ProjectValueBlock: React.FC<ProjectValueBlockType> = ({
  eyebrow,
  titleBeforeHighlight,
  highlightedTitle,
  titleAfterHighlight,
  subtitle,
  textureWavesImage,
  items,
}) => {
  const shouldReduceMotion = useReducedMotion();

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
    <section className="relative overflow-hidden bg-background py-10 lg:py-18" id="project-value">
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
        {/* Value Items Grid */}
        {items && items.length > 0 && (
          <SectionReveal direction="up" delay={0.1} className="w-full">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {items.map((item, index) => (
                <motion.div
                  key={item.id || index}
                  variants={itemVariants}
                  whileHover={{
                    y: shouldReduceMotion ? 0 : -6,
                  }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col p-6 rounded-2xl bg-white border border-outline/30 shadow-sm hover:shadow-md hover:border-outline/60 gap-4 group cursor-default transition-shadow duration-300"
                >
                  {item.iconSvg && (
                    <div
                      className="w-10 h-10 text-primary-500 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                      dangerouslySetInnerHTML={{ __html: item.iconSvg }}
                    />
                  )}
                  <h3 className="font-montserrat font-semibold text-lg lg:text-xl text-foreground uppercase transition-colors duration-300 group-hover:text-primary-600">
                    {item.title}
                  </h3>
                  <p className="font-poppins text-sm leading-relaxed text-foreground/70 transition-colors duration-300 group-hover:text-foreground/90">
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
