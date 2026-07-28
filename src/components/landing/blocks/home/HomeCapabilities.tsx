"use client";

import type { CapabilitiesBlock as HomeCapabilitiesBlockType } from "@/payload-types";
import React from "react";
import Capabilities from "../../layout/capabilities";
import { getMediaAlt, getMediaUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SectionReveal } from "@/components/ui/section-reveal";

export const HomeCapabilities: React.FC<HomeCapabilitiesBlockType> = ({
  titleBeforeHighlight,
  highlightedTitle,
  titleAfterHighlight,
  subtitle,
  eyebrow,
  capabilities,
  textureImage,
  viewAllText,
}) => {
  const textureImageUrl = getMediaUrl(textureImage);
  const textureImageAlt = getMediaAlt(textureImage, "Texture");
  return (
    <section
      className="relative overflow-hidden min-h-screen bg-white py-6 lg:pt-14 lg:pb-28"
      id="services"
    >
      {/* Texture */}
      <div className="max-lg:hidden w-147.25 h-103.5 absolute top-0 inset-e-0 pointer-events-none">
        <Image src={textureImageUrl ?? ""} alt={textureImageAlt} fill className="object-cover" />
      </div>
      <div className="flex flex-col items-start gap-8 lg:gap-18 w-full">
        <SectionReveal direction="up" className="w-full">
          <div className="flex flex-col gap-4 px-4 lg:px-14">
            <div className="flex flex-col gap-2 lg:gap-1">
              {eyebrow && (
                <span className="font-poppins text-sm lg:text-base leading-[130%] uppercase text-primary-500">
                  {eyebrow}
                </span>
              )}
              <h2 className="lg:max-w-3xl font-display text-xl md:text-3xl lg:text-5xl font-semibold leading-[130%] tracking-[-7%] uppercase text-foreground">
                {titleBeforeHighlight} <span className="text-primary-500">{highlightedTitle} </span>
                {titleAfterHighlight}
              </h2>
            </div>
            <p className="font-poppins text-sm leading-[130%] text-gray-500 lg:text-base lg:leading-7.25 lg:max-w-4xl">
              {subtitle}
            </p>
          </div>
        </SectionReveal>
        <SectionReveal direction="up" delay={0.2} className="w-full">
          <Capabilities capabilities={capabilities} />
        </SectionReveal>
        <SectionReveal direction="up" delay={0.3} className="w-full">
          <div className="w-full px-4 lg:px-14 flex flex-row items-center gap-6 lg:-my-10">
            <div className="flex-1 h-px bg-error-500/24"></div>
            <Link
              href="/services"
              className="font-montserrat text-primary-500 text-xs md:text-base lg:text-lg hover:underline"
            >
              {viewAllText}
            </Link>
            <div className="flex-1 h-px bg-error-500/24"></div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
};
