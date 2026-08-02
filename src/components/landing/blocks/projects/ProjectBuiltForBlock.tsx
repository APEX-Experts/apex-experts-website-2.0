"use client";

import { BackgroundOverlay } from "@/components/ui/background-overlay";
import { SectionReveal } from "@/components/ui/section-reveal";
import { getMediaAlt, getMediaUrl } from "@/lib/utils";
import type { ProjectBuiltForBlock as ProjectBuiltForBlockType } from "@/payload-types";
import { Check } from "lucide-react";
import Image from "next/image";
import React from "react";

/**
 * ProjectBuiltForBlock Component - Displays 4 foreground images and bullet points list.
 */
export const ProjectBuiltForBlock: React.FC<ProjectBuiltForBlockType> = ({
  backgroundImage,
  foregroundImages,
  title,
  bulletPoints,
}) => {
  const bgUrl = getMediaUrl(backgroundImage);
  const bgAlt = getMediaAlt(backgroundImage, "Background");

  return (
    <section className="relative overflow-hidden bg-background py-10 lg:py-18" id="project-built-for">
      <BackgroundOverlay src={bgUrl} alt={bgAlt} opacityClass="opacity-5" />

      <div className="relative z-10 mx-auto flex flex-col lg:flex-row gap-8 lg:gap-14 px-4 lg:px-14 items-center">
        {/* Left 4 Images Grid */}
        {foregroundImages && foregroundImages.length > 0 && (
          <SectionReveal direction="up" className="w-full lg:w-1/2">
            <div className="grid grid-cols-2 gap-4">
              {foregroundImages.slice(0, 4).map((item, index) => {
                const imgUrl = getMediaUrl(item.image);
                const imgAlt = getMediaAlt(item.image, `Built for ${index + 1}`);

                return imgUrl ? (
                  <div
                    key={item.id || index}
                    className="relative w-full aspect-4/3 rounded-2xl overflow-hidden shadow-sm"
                  >
                    <Image src={imgUrl} alt={imgAlt} fill className="object-cover" />
                  </div>
                ) : null;
              })}
            </div>
          </SectionReveal>
        )}

        {/* Right Info Section */}
        <SectionReveal direction="up" delay={0.1} className="w-full lg:w-1/2 flex flex-col gap-6">
          <h2 className="font-montserrat font-semibold text-2xl lg:text-4xl text-foreground uppercase">
            {title}
          </h2>

          {bulletPoints && bulletPoints.length > 0 && (
            <div className="flex flex-col gap-3">
              {bulletPoints.map((bp, index) => (
                <div key={bp.id || index} className="flex flex-row items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary-500/10 text-primary-500 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="font-poppins text-sm lg:text-base text-foreground/80 font-medium">
                    {bp.text}
                  </span>
                </div>
              ))}
            </div>
          )}
        </SectionReveal>
      </div>
    </section>
  );
};
