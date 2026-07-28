"use client";

import { Eyebrow, HighlightedTitle } from "@/components/ui/highlighted-title";
import { getMediaAlt, getMediaUrl } from "@/lib/utils";
import type { ProjectsBlock as ProjectsBlockType } from "@/payload-types";
import Image from "next/image";
import React from "react";
import ProjectCard from "../../layout/project-card";
import { SectionReveal } from "@/components/ui/section-reveal";

export const HomeProjects: React.FC<ProjectsBlockType> = ({
  eyebrow,
  titleBeforeHighlight,
  highlightedTitle,
  titleAfterHighlight,
  subtitle,
  backgroundImage,
  texture,
  projects,
}) => {
  const bgImageUrl = getMediaUrl(backgroundImage);
  const bgImageAlt = getMediaAlt(backgroundImage, "Background Image");
  const textureUrl = getMediaUrl(texture);
  const textureAlt = getMediaAlt(texture, "Texture");

  return (
    <section className="relative overflow-hidden min-h-screen pt-10 lg:py-18" id="projects">
      {backgroundImage && bgImageUrl && (
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <Image src={bgImageUrl} alt={bgImageAlt} fill className="object-cover" />
        </div>
      )}
      {texture && textureUrl && (
        <div className="max-lg:hidden w-145.5 h-105.75 absolute top-0 inset-e-0 pointer-events-none">
          <Image src={textureUrl} alt={textureAlt} fill className="object-cover" />
        </div>
      )}
      <div className="w-full relative flex flex-col gap-8 lg:gap-18">
        {/* Content */}
        <SectionReveal direction="up" className="w-full">
          <div className="flex flex-col items-start gap-4 px-4 lg:px-14">
            <div className="flex flex-col gap-2 lg:gap-1">
              <Eyebrow text={eyebrow} />
              <HighlightedTitle
                titleBeforeHighlight={titleBeforeHighlight}
                highlightedTitle={highlightedTitle}
                titleAfterHighlight={titleAfterHighlight}
                className="lg:max-w-2xl font-display"
              />
            </div>
            <p className="font-poppins text-sm leading-[130%] text-gray-500 lg:text-base lg:leading-7.25 lg:max-w-4xl">
              {subtitle}
            </p>
          </div>
        </SectionReveal>
        {/* Projects */}
        <div className="flex flex-col gap-8 px-4 lg:px-14">
          {projects?.map((project, index) => (
            <SectionReveal key={project.id ?? index} direction="up" delay={index * 0.15}>
              <ProjectCard project={project} />
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
