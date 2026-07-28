"use client";

import { getMediaAlt, getMediaUrl } from "@/lib/utils";
import type { HomeAboutBlock as HomeAboutBlockType } from "@/payload-types";
import Image from "next/image";
import React from "react";
import { SectionReveal } from "@/components/ui/section-reveal";

export const HomeAboutBlock: React.FC<HomeAboutBlockType> = ({
  clipImage,
  titleBeforeHighlight,
  highlightedTitle,
  titleAfterHighlight,
  subtitle,
  eyebrow,
  list,
  backgroundTexture,
  leftBackgroundTexture,
}) => {
  const clipImageUrl = getMediaUrl(clipImage);
  const backgroundTextureUrl = getMediaUrl(backgroundTexture);
  const leftBackgroundTextureUrl = getMediaUrl(leftBackgroundTexture);
  const clipImageAlt = getMediaAlt(clipImage, "Robot");
  const backgroundTextureAlt = getMediaAlt(backgroundTexture, "Texture");
  const leftBackgroundTextureAlt = getMediaAlt(leftBackgroundTexture, "Texture");

  return (
    <section
      className="relative overflow-hidden min-h-screen bg-gray-50 flex flex-col items-center px-4 py-6 lg:p-14 gap-6 lg:gap-16 lg:pb-28"
      id="about"
    >
      {/* Textures */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center opacity-5 pointer-events-none">
        {backgroundTextureUrl && (
          <Image
            src={backgroundTextureUrl}
            alt={backgroundTextureAlt}
            fill
            className="object-cover"
          />
        )}
      </div>
      <div className="absolute -bottom-64 lg:bottom-0 inset-s-1/2 max-lg:-translate-x-1/2 lg:inset-s-0 w-40.25 h-169 opacity-5 flex items-center justify-center max-lg:rotate-270 pointer-events-none">
        {leftBackgroundTextureUrl && (
          <Image
            src={leftBackgroundTextureUrl}
            alt={leftBackgroundTextureAlt}
            fill
            className="object-cover invert"
          />
        )}
      </div>
      {/* Content */}
      <div className="flex flex-col-reverse lg:flex-row gap-4 lg:gap-2 lg:justify-start max-lg:items-center w-full">
        {/* Text */}
        <SectionReveal direction="right" className="flex flex-col gap-4 lg:gap-5 items-start max-w-197">
          {/* Heading */}
          <div className="flex flex-col gap-2 lg:gap-1">
            {/* Eyebrow */}
            {eyebrow && (
              <span className="text-sm lg:text-base font-poppins uppercase text-primary-500">
                {eyebrow}
              </span>
            )}
            {/* Title */}
            <h2 className="font-display font-semibold text-xl md:text-3xl lg:text-5xl lg:leading-[130%] lg:tracking-[-7%] uppercase text-foreground">
              {titleBeforeHighlight}
              {highlightedTitle && <span className="text-primary-500"> {highlightedTitle}</span>}
              {titleAfterHighlight && <span> {titleAfterHighlight}</span>}
            </h2>
          </div>
          {/* Subtitle */}
          <div className="text-sm leading-[100%] text-gray-500 lg:text-base lg:leading-7.25">
            {subtitle?.split(".").map((p, i) => (
              <p key={i} className={`${"mb-4 lg:mb-5 last:mb-0"}`}>
                {p}.
              </p>
            ))}
          </div>
        </SectionReveal>
        {/* Clipped Image */}
        <SectionReveal direction="left" delay={0.2} className="max-h-70 md:max-h-90 lg:max-h-100 xl:max-h-none pointer-events-none">
          <Image
            src={clipImageUrl ?? ""}
            alt={clipImageAlt}
            width={1220}
            height={1047}
            className="w-full h-full object-cover"
          />
        </SectionReveal>
      </div>
      {/* List */}
      <div className="lg:max-w-7xl lg:mx-auto gap-4 lg:gap-8 flex flex-col w-full">
        {list?.map(({ description, title, eyebrow: listEyebrow, id }, index) => (
          <SectionReveal
            key={id ?? index}
            direction="up"
            delay={0.1 * index}
            className="w-full"
          >
            <div className="flex flex-col lg:flex-row gap-2 lg:gap-8 lg:justify-between w-full border-b-[1.25px] border-outline/30 pb-4 lg:pb-8">
              <div className="flex flex-col lg:min-w-74">
                <span className="text-sm lg:text-[15px] uppercase text-primary-500 font-poppins">
                  {listEyebrow}
                </span>
                <h3 className="font-poppins font-medium text-xl leading-8 tracking-[-7%] uppercase text-foreground">
                  {title}
                </h3>
              </div>
              <p className="lg:font-medium text-sm lg:text-base lg:leading-8 lg:tracking-[7%] uppercase text-gray-500">
                {description}
              </p>
            </div>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
};

