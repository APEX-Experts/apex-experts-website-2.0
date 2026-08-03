"use client";

import { BackgroundOverlay } from "@/components/ui/background-overlay";
import { Eyebrow, HighlightedTitle } from "@/components/ui/highlighted-title";
import { SectionReveal } from "@/components/ui/section-reveal";
import { TextureWaves } from "@/components/ui/texture-waves";
import { cn, getMediaAlt, getMediaUrl, zeroPadNumber } from "@/lib/utils";
import type { SubservicePipelineBlock as SubservicePipelineBlockType } from "@/payload-types";
import { motion } from "motion/react";
import Image from "next/image";
import React from "react";

// Variants for step items staggering inside container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

// Line & arrow drawing animation variants
const verticalLineVariants = {
  hidden: { scaleY: 0, originY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 0.6, ease: "easeOut" as const, delay: 0.3 },
  },
};

const horizontalLineVariants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.6, ease: "easeOut" as const, delay: 0.5 },
  },
};

const arrowVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" as const, delay: 0.7 },
  },
};

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
  const pipelineImageUrls = pipeline?.map(({ images }) =>
    images?.map(({ image }) => getMediaUrl(image)),
  );
  const pipelineImageAlts = pipeline?.map(({ images }) =>
    images?.map(({ image }) => getMediaAlt(image, "Pipeline Image")),
  );

  return (
    <section
      className="relative overflow-hidden bg-background py-10 lg:py-18"
      id="subservice-pipeline"
    >
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
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col lg:flex-row gap-6.25 w-full lg:justify-between lg:min-h-86"
          >
            {pipeline.map(({ description, title, id }, itemIndex) => (
              <motion.div
                key={id || itemIndex}
                variants={itemVariants}
                whileHover="hover"
                initial="initial"
                className="group flex flex-col gap-1.5 lg:odd:self-start lg:even:self-end lg:pe-15.25 pb-24 lg:odd:pb-15.5 lg:even:pb-24 relative transition-transform duration-300 ease-out hover:-translate-y-1.5"
              >
                <span className="font-montserrat font-extralight text-5xl leading-[160%] tracking-[-5%] lg:text-[4.1875rem] lg:leading-18.75 text-foreground transition-colors duration-300 group-hover:text-secondary-500">
                  {zeroPadNumber(itemIndex + 1, 2)}
                </span>
                <h4 className="font-display font-bold text-xl leading-[160%] tracking-[-3%] text-foreground lg:text-2xl transition-colors duration-300 group-hover:text-secondary-400">
                  {title}
                </h4>
                <p className="font-poppins text-sm leading-[160%] tracking-[-3%] text-foreground/70 max-w-54 transition-colors duration-300 group-hover:text-foreground">
                  {description}
                </p>
                <div className="absolute inset-e-0 bottom-0 w-full h-23 z-1">
                  {/* Images */}
                  <div
                    className={cn(
                      "absolute inset-s-0 bottom-1/2 translate-y-1/2 lg:translate-y-0 flex flex-row z-2",
                      itemIndex % 2 === 0 ? "lg:bottom-0" : "lg:top-2.5",
                    )}
                  >
                    {pipelineImageUrls?.[itemIndex]?.map((image, index) => (
                      <motion.div
                        key={index}
                        variants={{
                          initial: { scale: 1, zIndex: index },
                          hover: {
                            scale: 1.15,
                            zIndex: 10,
                            transition: { delay: index * 0.05, duration: 0.2 },
                          },
                        }}
                        className={cn(
                          "rounded-full w-10 h-10 border-2 border-secondary-900 relative overflow-hidden transition-all duration-300 group-hover:border-secondary-500 group-hover:shadow-md group-hover:shadow-secondary-500/20",
                          index !== 0 && "-ml-3",
                          itemIndex % 2 === 0 ? "rounded-full" : "rounded-[0.375rem]",
                        )}
                      >
                        {image && (
                          <Image
                            src={image}
                            alt={pipelineImageAlts?.[0]?.[index] ?? "Image"}
                            fill
                            className="object-cover object-center transition-transform duration-300 group-hover:scale-110"
                          />
                        )}
                      </motion.div>
                    ))}
                  </div>
                  {/* Vertical Line */}
                  <motion.div
                    variants={verticalLineVariants}
                    className="w-px h-full absolute top-0 inset-e-6 bg-primary-900 transition-colors duration-300 group-hover:bg-secondary-500 group-hover:shadow-[0_0_8px_rgba(234,179,8,0.5)]"
                  />
                  {/* Horizontal Line */}
                  <motion.div
                    variants={horizontalLineVariants}
                    className={cn(
                      "w-full h-px absolute bottom-1/2 translate-y-1/2 lg:translate-y-0 bg-primary-900 transition-colors duration-300 group-hover:bg-secondary-500 group-hover:shadow-[0_0_8px_rgba(234,179,8,0.5)]",
                      itemIndex % 2 === 0 ? "lg:bottom-4.5" : "lg:top-7",
                    )}
                  />
                  {/* Horizontal Line Arrows */}
                  <motion.span
                    variants={arrowVariants}
                    className={cn(
                      "text-primary-900 absolute bottom-1/2 max-lg:translate-y-1/2 lg:translate-y-0 inset-e-5.5 text-2xl transition-all duration-300 group-hover:text-secondary-400",
                      itemIndex % 2 === 0 ? "lg:bottom-0.5" : "lg:top-3",
                    )}
                  >
                    {">"}
                  </motion.span>
                  <motion.span
                    variants={arrowVariants}
                    className={cn(
                      "text-primary-900 absolute bottom-1/2 max-lg:translate-y-1/2 lg:translate-y-0 inset-e-3.5 text-2xl transition-all duration-300 group-hover:text-secondary-400",
                      itemIndex % 2 === 0 ? "lg:bottom-0.5" : "lg:top-3",
                    )}
                  >
                    {"<"}
                  </motion.span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};
