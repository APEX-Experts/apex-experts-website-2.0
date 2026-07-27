"use client";

import { LucideIcon } from "@/components/ui/lucide-icon";
import { cn, getMediaAlt, getMediaUrl } from "@/lib/utils";
import type { TechnologiesBlock as TechnologiesBlockType } from "@/payload-types";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

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
  const wavesTextureUrl = getMediaUrl(wavesTexture);
  const wavesTextureAlt = getMediaAlt(wavesTexture, "Waves Texture");
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
        <div className="px-4 lg:px-14">
          {/* Eyebrow */}
          {eyebrow && (
            <span className="font-poppins text-sm leading-[130%] uppercase text-primary-500 lg:text-base">
              {eyebrow}
            </span>
          )}
          {/* Heading */}
          <h2 className="font-semibold text-xl leading-[130%] tracking-[-7%] text-foreground md:text-3xl lg:text-5xl mt-2 lg:mt-1 uppercase lg:max-w-3xl">
            <span>{titleBeforeHighlight}</span>
            <span className="text-primary-500"> {highlightedTitle}</span>
            {titleAfterHighlight && <span> {titleAfterHighlight}</span>}
          </h2>
          {/* Subtitle */}
          {subtitle && (
            <p className="mt-4 font-poppins text-sm leading-[130%] text-gray-500 lg:text-base lg:leading-7.25 lg:max-w-4xl">
              {subtitle}
            </p>
          )}
        </div>
        {/* Services */}
        <div className="lg:px-14">
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
                      "w-full border-b border-outline/30 pb-3 lg:pb-6 cursor-pointer",
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
                {activeService?.technologies?.map(({ icon, title, id, subtitle }, index) => (
                  <div
                    key={id ?? index}
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
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
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
      <div className="absolute top-0 inset-e-0 w-51.5 h-37.5 lg:w-145.5 lg:h-105.75">
        <Image
          src={wavesTextureUrl ?? ""}
          alt={wavesTextureAlt}
          fill
          className="object-cover w-full h-full"
        />
      </div>
    </section>
  );
};
