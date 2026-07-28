"use client";

import { BackgroundOverlay } from "@/components/ui/background-overlay";
import { Eyebrow, HighlightedTitle } from "@/components/ui/highlighted-title";
import { SectionReveal } from "@/components/ui/section-reveal";
import { cn, getMediaAlt, getMediaUrl } from "@/lib/utils";
import type { AboutTeamMembersBlock as AboutTeamMembersBlockType } from "@/payload-types";
import Image from "next/image";
import React from "react";

/**
 * AboutTeamMembersBlock Component - Displays team members section.
 */
export const AboutTeamMembersBlock: React.FC<AboutTeamMembersBlockType> = ({
  eyebrow,
  titleBeforeHighlight,
  highlightedTitle,
  titleAfterHighlight,
  subtitle,
  textureWavesImage,
  backgroundImage,
  members,
}) => {
  const bgImageUrl = getMediaUrl(backgroundImage);
  const bgImageAlt = getMediaAlt(backgroundImage, "Background");
  const textureWavesUrl = getMediaUrl(textureWavesImage);
  const textureWavesAlt = getMediaAlt(textureWavesImage, "Waves texture");
  const memberPhotoUrls = members?.map((m) => getMediaUrl(m.photo));
  const memberPhotoAlts = members?.map((m) => getMediaAlt(m.photo, m.name));

  return (
    <section className="relative overflow-hidden bg-background pt-10 lg:pt-18" id="team-members">
      <BackgroundOverlay src={bgImageUrl} alt={bgImageAlt} opacityClass="opacity-5" />

      {textureWavesUrl && (
        <div className="absolute top-0 inset-e-0 w-51.5 h-37.5 lg:w-145.5 lg:h-105.75 pointer-events-none">
          <Image
            src={textureWavesUrl}
            alt={textureWavesAlt}
            fill
            className="object-cover object-center"
          />
        </div>
      )}

      <div className="relative z-10 mx-auto flex flex-col gap-8 lg:gap-18">
        {/* Heading Section */}
        <SectionReveal direction="up" className="w-full max-w-4xl px-4 lg:px-14">
          <div className="flex flex-col items-start gap-4">
            <div className="flex flex-col gap-2 lg:gap-1">
              <Eyebrow text={eyebrow} />
              <HighlightedTitle
                titleBeforeHighlight={titleBeforeHighlight}
                highlightedTitle={highlightedTitle}
                titleAfterHighlight={titleAfterHighlight}
                className="lg:max-w-4xl"
              />
            </div>
            {subtitle && (
              <p className="font-poppins text-sm leading-[130%] text-gray-500 lg:text-base lg:leading-7.25 max-w-4xl">
                {subtitle}
              </p>
            )}
          </div>
        </SectionReveal>

        {/* Team Members Grid */}
        {members && members.length > 0 && (
          <SectionReveal direction="up" delay={0.1} className="w-full">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {members.map(({ name, role, id }, index) => (
                <div
                  key={id ?? index}
                  className={cn(
                    "pt-6 lg:pt-14 pb-4 lg:pb-10.5 px-4 lg:px-10 text-center grayscale h-76 lg:h-183",
                    index % 2 === 0 ? "member-gradient-1" : "member-gradient-0",
                  )}
                >
                  <div className="h-full flex flex-col justify-between z-10 relative">
                    <span
                      className={cn(
                        "font-montserrat font-bold text-xl lg:text-[2.5rem] leading-[130%] tracking-[-2%] uppercase text-center",
                        index % 2 === 0 ? "text-white" : "text-foreground",
                      )}
                    >
                      {role}
                    </span>
                    <span className="font-montserrat font-bold text-base leading-[130%] uppercase text-white lg:text-2xl lg:leading-[88%] tracking-[-2%]">
                      {name}
                    </span>
                  </div>
                  <div
                    className="absolute inset-x-0 bottom-0 h-32 lg:h-56 z-1 pointer-events-none
             bg-linear-to-t from-black/90 via-black/45 to-transparent"
                  />
                  {/* photo */}
                  <div className="absolute left-0 bottom-0 pointer-events-none w-full h-51.5 lg:h-103 z-0 ">
                    <Image
                      src={memberPhotoUrls?.[index] ?? ""}
                      alt={memberPhotoAlts?.[index] ?? ""}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              ))}
            </div>
          </SectionReveal>
        )}
      </div>
    </section>
  );
};
