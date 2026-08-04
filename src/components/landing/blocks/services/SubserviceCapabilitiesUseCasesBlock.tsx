"use client";

import { BackgroundOverlay } from "@/components/ui/background-overlay";
import { Eyebrow, HighlightedTitle } from "@/components/ui/highlighted-title";
import { SectionReveal } from "@/components/ui/section-reveal";
import { cn, getMediaAlt, getMediaUrl } from "@/lib/utils";
import type { SubserviceUseCasesBlock as SubserviceCapabilitiesUseCasesBlockType } from "@/payload-types";
import { AnimatePresence, motion } from "motion/react";
import { MinusIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { ListItemMarkSvg, Logo } from "../../layout/logo";

const listContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const useCasesContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const useCaseItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

/**
 * SubserviceCapabilitiesUseCasesBlock Component - Displays Capabilities with Use Cases and side notes.
 */
export const SubserviceCapabilitiesUseCasesBlock: React.FC<
  SubserviceCapabilitiesUseCasesBlockType
> = ({
  eyebrow,
  titleBeforeHighlight,
  highlightedTitle,
  titleAfterHighlight,
  subtitle,
  backgroundImage,
  foregroundImage,
  capabilities,
}) => {
  const bgUrl = getMediaUrl(backgroundImage);
  const bgAlt = getMediaAlt(backgroundImage, "Background");
  const fgUrl = getMediaUrl(foregroundImage);
  const fgAlt = getMediaAlt(foregroundImage, "Foreground");
  const [activeItemIdx, setActiveItemIdx] = useState<number | null>(null);

  const toggleItem = (idx: number) => {
    setActiveItemIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      className="relative overflow-hidden bg-background py-10 lg:py-18"
      id="subservice-capabilities-usecases"
    >
      <BackgroundOverlay src={bgUrl} alt={bgAlt} opacityClass="opacity-5" />

      <div className="relative z-10 mx-auto flex flex-col gap-10 lg:gap-16">
        {/* Heading Section */}
        <SectionReveal
          direction="up"
          className="w-full flex flex-col-reverse lg:flex-row justify-between px-4 lg:px-14 gap-6"
        >
          <div className="flex flex-col items-start gap-4">
            <div className="flex flex-col gap-2 lg:gap-1">
              <Eyebrow text={eyebrow} />
              <HighlightedTitle
                titleBeforeHighlight={titleBeforeHighlight}
                highlightedTitle={highlightedTitle}
                titleAfterHighlight={titleAfterHighlight}
                className="lg:max-w-3xl lg:text-5xl!"
              />
            </div>
            {subtitle && (
              <p className="font-poppins text-sm leading-[130%] text-gray-500 lg:text-base lg:leading-7.25 max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>
          {fgUrl && (
            <div className="relative overflow-hidden w-85.75 h-70 lg:w-153 lg:h-127 shrink-0">
              <Image src={fgUrl} alt={fgAlt} fill className="object-cover" />
            </div>
          )}
        </SectionReveal>

        {/* Capabilities Grid */}
        {capabilities && capabilities.length > 0 && (
          <SectionReveal direction="up" delay={0.1} className="w-full lg:px-14">
            <motion.div
              variants={listContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="max-lg:py-4 max-lg:px-4 flex flex-col gap-6 bg-transparent rounded-none max-lg:border-t max-lg:border-outline/30 lg:rounded-[1.5rem] lg:p-10 lg:bg-white lg:gap-8.5"
            >
              {capabilities.map(
                (
                  {
                    description,
                    title,
                    eyebrow,
                    id,
                    sideNoteDescription,
                    sideNoteIconSvg,
                    sideNoteTitle,
                    supertitle,
                    useCases,
                    useCasesLabel,
                  },
                  index,
                ) => (
                  <motion.div
                    key={id ?? index}
                    variants={listItemVariants}
                    className="flex flex-col max-lg:gap-6 group"
                  >
                    <button
                      onClick={() => toggleItem(index)}
                      className="w-full flex flex-col text-start transition-all duration-300 rounded-xl lg:p-3 -m-3 lg:hover:bg-primary-50/50"
                    >
                      <div
                        className={cn(
                          "flex flex-row gap-4 items-center text-start pb-6 w-full transition-colors duration-300",
                          activeItemIdx === index ? "" : "border-b border-outline/30",
                        )}
                      >
                        <div className="flex flex-col gap-2 lg:flex-row justify-between lg:flex-1 lg:gap-20">
                          <div className="flex flex-col lg:flex-row lg:gap-14">
                            {eyebrow && (
                              <span className="font-poppins text-[0.8125rem] leading-[160%] tracking-[-7%] uppercase text-gray-300 lg:text-[0.9375rem] lg:leading-8 lg:text-primary-500 transition-colors group-hover:text-primary-600">
                                {eyebrow}
                              </span>
                            )}
                            <div className="flex flex-col">
                              {supertitle && (
                                <span className="font-poppins text-[0.8125rem] leading-[160%] tracking-[-7%] uppercase text-primary-500 lg:text-[0.9375rem]">
                                  {supertitle}
                                </span>
                              )}
                              {title && (
                                <h4 className="font-poppins font-semibold text-xl leading-[160%] tracking-[-7%] uppercase transition-colors duration-300 group-hover:text-primary-600">
                                  {title}
                                </h4>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center">
                            {description && (
                              <p className="font-poppins text-sm leading-[160%] text-gray-500 lg:font-medium lg:text-base lg:leading-7.75 transition-colors group-hover:text-foreground">
                                {description}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="w-6 h-6 text-primary-500 relative lg:ms-9 shrink-0 transition-transform duration-300 group-hover:scale-110">
                          {activeItemIdx === index ? (
                            <MinusIcon className="w-full h-full transition-transform duration-300 rotate-180" />
                          ) : (
                            <PlusIcon className="w-full h-full transition-transform duration-300 group-hover:rotate-90" />
                          )}
                        </div>
                      </div>
                    </button>

                    <AnimatePresence>
                      {activeItemIdx === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="max-lg:rounded-[0.75rem] border border-outline/30 bg-white py-6 px-4 flex flex-col gap-4 lg:rounded-b-[1.5rem] lg:pt-6 lg:pb-10 lg:ps-42.75 lg:pe-25 lg:flex-row lg:gap-10 text-start shadow-sm my-2">
                            <div className="flex flex-col gap-4 flex-1 lg:min-w-100">
                              <div className="pb-2 border-b border-primary-100">
                                <span className="font-poppins text-base leading-[160%] tracking-[-7%] uppercase text-primary-500 lg:text-[0.9375rem]">
                                  {useCasesLabel}
                                </span>
                              </div>
                              <motion.ul
                                variants={useCasesContainerVariants}
                                initial="hidden"
                                animate="visible"
                                className="flex flex-col gap-2 text-start"
                              >
                                {useCases?.map(({ useCase, id }, ucIdx) => (
                                  <motion.li
                                    key={id ?? ucIdx}
                                    variants={useCaseItemVariants}
                                    className="flex flex-row gap-2 items-center group/item hover:translate-x-1 transition-transform duration-200"
                                  >
                                    <ListItemMarkSvg
                                      height={16}
                                      width={16}
                                      className="w-4 h-4 text-primary-500 opacity-32 group-hover/item:opacity-100 transition-opacity"
                                    />
                                    <span className="font-poppins text-[0.8125rem] leading-[160%] text-gray-500 lg:font-medium lg:text-base lg:leading-7.75 group-hover/item:text-foreground transition-colors">
                                      {useCase}
                                    </span>
                                  </motion.li>
                                ))}
                              </motion.ul>
                            </div>
                            <div className="max-lg:border-t border-outline/30 pt-4 flex flex-row gap-4 lg:border-s lg:ps-4">
                              {sideNoteIconSvg && (
                                <div className="w-8 h-8 lg:w-12 lg:h-12 relative flex items-center justify-center text-footer-gray shrink-0">
                                  <Logo
                                    logoSvg={sideNoteIconSvg}
                                    width={48}
                                    height={48}
                                    className="text-footer-gray"
                                  />
                                </div>
                              )}
                              <div className="flex flex-col gap-2 text-start">
                                <span className="font-poppins font-medium text-xl leading-8 tracking-[-7%] uppercase">
                                  {sideNoteTitle}
                                </span>
                                <p className="font-poppins text-sm leading-[160%] text-foreground/70 lg:leading-5">
                                  {sideNoteDescription}
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ),
              )}
            </motion.div>
          </SectionReveal>
        )}
      </div>
    </section>
  );
};
