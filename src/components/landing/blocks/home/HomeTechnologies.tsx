"use client";

import { Eyebrow, HighlightedTitle } from "@/components/ui/highlighted-title";
import { LucideIcon } from "@/components/ui/lucide-icon";
import { cn, getMediaAlt, getMediaUrl } from "@/lib/utils";
import type { TechnologiesBlock as TechnologiesBlockType } from "@/payload-types";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { SectionReveal } from "@/components/ui/section-reveal";
import { motion, AnimatePresence } from "motion/react";
import { TextureWaves } from "@/components/ui/texture-waves";

export const HomeTechnologies: React.FC<TechnologiesBlockType> = ({
  eyebrow,
  titleBeforeHighlight,
  highlightedTitle,
  titleAfterHighlight,
  subtitle,
  wavesTexture,
  services,
  backgroundImage,
  servicesBackgroundImage,
}) => {
  const backgroundImageUrl = getMediaUrl(backgroundImage);
  const backgroundImageAlt = getMediaAlt(backgroundImage, "Background");
  const servicesBackgroundImageUrl = getMediaUrl(servicesBackgroundImage);
  const servicesBackgroundImageAlt = getMediaAlt(servicesBackgroundImage, "Services Background");

  const [activeServiceIndex, setActiveServiceIndex] = useState(0);

  const serviceBackgroundsList = services?.map((service) =>
    getMediaUrl(service?.technologiesBackgroundImage),
  );
  const serviceBackgroundAlt = services?.map((service) =>
    getMediaAlt(service?.technologiesBackgroundImage, "Services Background"),
  );
  const activeService = services?.[activeServiceIndex];
  const activeServiceBackground = serviceBackgroundsList?.[activeServiceIndex];
  const activeServiceBackgroundAlt = serviceBackgroundAlt?.[activeServiceIndex];
  const handleChangeActiveServiceIndex = (index: number) => {
    setActiveServiceIndex(index);
  };

  return (
    <section
      className="relative overflow-hidden min-h-screen bg-white pt-10 pb-6 lg:py-18"
      id="technologies"
    >
      {/* Text */}
      <div className="flex flex-col gap-8 lg:gap-18">
        {/* Heading */}
        <SectionReveal direction="up" className="px-4 lg:px-14">
          <div className="flex flex-col gap-2 lg:gap-1">
            <Eyebrow text={eyebrow} />
            <HighlightedTitle
              titleBeforeHighlight={titleBeforeHighlight}
              highlightedTitle={highlightedTitle}
              titleAfterHighlight={titleAfterHighlight}
              className="lg:max-w-xl"
            />
          </div>{" "}
          {/* Subtitle */}
          {subtitle && (
            <p className="mt-4 font-poppins text-sm leading-[130%] text-gray-500 lg:text-base lg:leading-7.25 lg:max-w-4xl">
              {subtitle}
            </p>
          )}
        </SectionReveal>
        {/* Services */}
        <SectionReveal direction="up" delay={0.2} className="lg:px-14">
          <div className="flex flex-col lg:flex-row max-lg:gap-4 relative border border-outline/30 lg:rounded-[2.5rem] overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              <Image
                src={servicesBackgroundImageUrl ?? ""}
                alt={servicesBackgroundImageAlt}
                fill
                className="w-full h-full object-cover opacity-3"
              />
            </div>
            {/* Selector */}
            <div className="w-full lg:basis-1/2 px-4 pt-4 relative flex flex-col gap-6 lg:gap-10 lg:pt-10 lg:pb-6 lg:ps-14 lg:pe-10">
              {services?.map(
                ({ title, eyebrow: serviceEyebrow, id, subtitle: serviceSubtitle }, index) => (
                  <div
                    key={id ?? index}
                    className={cn(
                      "w-full border-b border-outline/30 pb-3 lg:pb-6 cursor-pointer transition-colors duration-200",
                      index !== activeServiceIndex && "border-dashed last:border-none",
                    )}
                    onClick={() => handleChangeActiveServiceIndex(index)}
                  >
                    <div className="flex flex-row items-center justify-between">
                      <div className="flex flex-col">
                        {serviceEyebrow && (
                          <span className="font-poppins text-xs lg:text-[0.8125rem] leading-[130%] lg:leading-7.75 uppercase text-primary-500">
                            {serviceEyebrow}
                          </span>
                        )}
                        <h3 className="font-semibold text-base lg:text-2xl leading-[130%] tracking-[-7%] text-foreground">
                          {title}
                        </h3>
                      </div>
                      {index === activeServiceIndex ? (
                        <Minus className="w-4 h-4 text-primary-500" />
                      ) : (
                        <Plus className="w-4 h-4 text-primary-500" />
                      )}
                    </div>
                    {index === activeServiceIndex && (
                      <p className="font-poppins text-sm leading-[130%] text-foreground/70 mt-2">
                        {serviceSubtitle}
                      </p>
                    )}
                  </div>
                ),
              )}
            </div>
            {/* Technologies */}
            <div className="w-full lg:basis-1/2 relative py-6 px-4 lg:p-10 technologies overflow-hidden">
              {/* Background */}
              <div className="absolute inset-0 w-full h-full blur-xl overflow-hidden">
                <Image
                  src={activeServiceBackground ?? ""}
                  alt={activeServiceBackgroundAlt ?? ""}
                  fill
                  className="w-full h-full object-cover scale-200"
                />
              </div>
              <div className="absolute inset-0 w-full h-full bg-black/30"></div>
              {/* Content */}
              <div className="rounded-[1.5rem] lg:rounded-[3rem] technologies-border bg-black/50 p-6 flex flex-col gap-8 relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeServiceIndex}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-8 w-full"
                  >
                    {activeService?.technologies?.map(({ icon, title, id, subtitle }, index) => (
                      <motion.div
                        key={id ?? index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="w-full pb-4 border-b border-white/30 last:border-none group hover:border-white transition-colors duration-300"
                      >
                        <div className="flex flex-row items-center gap-3.5">
                          {/* Icon */}
                          <div className="w-12 h-12 lg:w-18 lg:h-18 flex items-center justify-center">
                            <LucideIcon
                              name={icon ?? "Database"}
                              className="w-10 h-10 lg:w-12 lg:h-12 text-white/70 group-hover:text-white transition-colors duration-300"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="font-display font-semibold leading-[130%] text-base uppercase lg:text-[1.375rem] text-white group-hover:text-white transition-colors duration-300">
                              {title}
                            </span>
                            <span className="text-white/70 font-poppins text-xs leading-[130%] uppercase lg:text-base">
                              {subtitle}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
      {/* Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <Image
          src={backgroundImageUrl ?? ""}
          alt={backgroundImageAlt}
          fill
          priority
          className="w-full h-full object-cover opacity-2"
        />
      </div>
      <TextureWaves image={wavesTexture} position="top" />
    </section>
  );
};
