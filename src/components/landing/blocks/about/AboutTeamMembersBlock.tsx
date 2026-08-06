"use client";

import { BackgroundOverlay } from "@/components/ui/background-overlay";
import { Eyebrow, HighlightedTitle } from "@/components/ui/highlighted-title";
import { SectionReveal } from "@/components/ui/section-reveal";
import { TextureWaves } from "@/components/ui/texture-waves";
import { cn, getMediaAlt, getMediaUrl } from "@/lib/utils";
import type { AboutTeamMembersBlock as AboutTeamMembersBlockType } from "@/payload-types";
import { motion } from "motion/react";
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
  const memberPhotoUrls = members?.map((m) => getMediaUrl(m.photo));
  const memberPhotoAlts = members?.map((m) => getMediaAlt(m.photo, m.name));

  return (
    <section className="relative overflow-hidden bg-background pt-10 lg:pt-18" id="team-members">
      <BackgroundOverlay src={bgImageUrl} alt={bgImageAlt} opacityClass="opacity-5" />
      <TextureWaves image={textureWavesImage} position="top" />

      <div className="relative z-10 mx-auto flex flex-col gap-8 lg:gap-18">
        {/* Heading Section */}
        <SectionReveal direction="up" className="w-full px-4 lg:px-14">
          <div className="flex flex-col items-start gap-4">
            <div className="flex flex-col gap-2 lg:gap-1">
              <Eyebrow text={eyebrow} />
              <HighlightedTitle
                titleBeforeHighlight={titleBeforeHighlight}
                highlightedTitle={highlightedTitle}
                titleAfterHighlight={titleAfterHighlight}
                className="lg:max-w-237.5"
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
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
            className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            {members.map(({ name, role, id }, index) => (
              <motion.div
                key={id ?? index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                className={cn(
                  "relative overflow-hidden pt-6 lg:pt-14 pb-4 lg:pb-10.5 px-4 lg:px-10 text-center grayscale transition-all duration-500 h-76 lg:h-183 group hover:shadow-2xl hover:brightness-110",
                  index % 2 === 0 ? "member-gradient-1" : "member-gradient-0",
                )}
              >
                <div className="h-full flex flex-col justify-between z-10 relative">
                  <span
                    className={cn(
                      "font-montserrat font-bold text-xl lg:text-[2.5rem] leading-[130%] tracking-[-2%] uppercase text-center transition-transform duration-300 group-hover:-translate-y-1",
                      index % 2 === 0 ? "text-white" : "text-foreground",
                    )}
                  >
                    {role}
                  </span>
                  <span className="font-montserrat font-bold text-base leading-[130%] uppercase text-white lg:text-2xl lg:leading-[88%] tracking-[-2%] transition-transform duration-300 group-hover:translate-y-[-2px]">
                    {name}
                  </span>
                </div>
                <div
                  className="absolute inset-x-0 bottom-0 h-32 lg:h-56 z-1 pointer-events-none
             bg-linear-to-t from-black/90 via-black/45 to-transparent transition-opacity duration-300 group-hover:opacity-90"
                />
                {/* photo */}
                <div className="absolute inset-s-0 bottom-0 pointer-events-none w-full h-51.5 lg:h-103 z-0 overflow-hidden">
                  <Image
                    src={memberPhotoUrls?.[index] ?? ""}
                    alt={memberPhotoAlts?.[index] ?? ""}
                    fill
                    className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};
