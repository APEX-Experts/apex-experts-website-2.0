import React from "react";
import type { ProjectsBlock as ProjectsBlockType } from "@/payload-types";
import Image from "next/image";
import { getMediaAlt, getMediaUrl } from "@/lib/utils";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import Link from "next/link";

type Project = NonNullable<ProjectsBlockType["projects"]>[number];

type Props = {
  project: Project;
};

const ProjectCard: React.FC<Props> = ({ project }) => {
  const {
    title,
    backgroundImage,
    backgroundImageBlur,
    ctaText,
    description,
    eyebrow,
    href,
    keywords,
    logo,
  } = project;
  const textureImageUrl = getMediaUrl(backgroundImage);
  const textureImageAlt = getMediaAlt(backgroundImage, "Texture");
  const logoImageUrl = getMediaUrl(logo);
  const logoImageAlt = getMediaAlt(logo, "Logo");
  const blurImageUrl = getMediaUrl(backgroundImageBlur);
  const blurImageAlt = getMediaAlt(backgroundImageBlur, "Blur");
  return (
    <div className="w-full project-card bg-noise relative rounded-[1.5rem] lg:rounded-[5rem] overflow-hidden">
      <div className="px-4 py-6 lg:p-14 flex flex-col justify-center items-center">
        <div className="rounded-[1.5rem] lg:rounded-[5rem] border border-outline/30 bg-black/30 flex flex-col lg:flex-row lg:items-center w-full h-full">
          {/* Logo */}
          <div className="bg-black/10 lg:bg-black/60 border-e border-outline/10 max-lg:rounded-t-2xl lg:rounded-s-[5rem] z-20 max-lg:w-full max-lg:h-47.5 lg:w-91.25 lg:self-stretch flex items-center justify-center py-8 px-4">
            <Image src={logoImageUrl ?? ""} alt={logoImageAlt} width={300} height={300} />
          </div>
          {/* Text */}
          <div className="relative z-10 flex flex-col max-lg:border-t lg:border-e border-outline/30 bg-black/10 lg:bg-black/60 px-6 pt-6 pb-4 lg:px-10 lg:py-14 max-lg:rounded-b-2xl lg:rounded-e-[5rem] lg:w-full">
            {/* Eyebrow */}
            {eyebrow && (
              <span className="font-poppins text-sm leading-[130%] uppercase text-white lg:text-base">
                {eyebrow}
              </span>
            )}
            <div className="flex flex-row justify-between w-full">
              {title && (
                <h4 className="font-montserrat font-semibold text-[1.75rem] leading-[130%] uppercase text-white lg:text-6xl">
                  {title}
                </h4>
              )}
              {href && (
                <Link
                  href={href}
                  className="max-lg:hidden p-2 flex flex-row gap-2 items-center rounded-full group"
                >
                  <span className="font-montserrat font-medium leading-[130%] text-white group-hover:underline">
                    {ctaText}
                  </span>
                  <span className="w-7.5 h-7.5 rounded-full border border-white flex justify-center items-center">
                    <ArrowUpRight className="w-5.5 h-5.5 text-white" />
                  </span>
                </Link>
              )}
            </div>
            {description && (
              <p className="mt-2 font-poppins text-sm leading-[130%] text-white/80 lg:text-base lg:max-w-3xl">
                {description}
              </p>
            )}
            {keywords && keywords.length > 0 && (
              <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:gap-2 mt-4">
                {keywords.map((keyword, index) => (
                  <div
                    key={keyword.id ?? index}
                    className="max-lg:w-full rounded-full border border-outline/30 hover:border-white flex flex-row justify-between px-4 py-2.5 lg:gap-2 items-center"
                  >
                    <span className="font-montserrat font-medium text-sm leading-[130%] text-white">
                      {keyword.keyword}
                    </span>
                    <ChevronRight className="w-4 h-4 text-white" />
                  </div>
                ))}
              </div>
            )}
            {href && (
              <Link
                href={href}
                className="flex lg:hidden mt-6 justify-center gap-2 flex-row items-center w-full p-2"
              >
                <span className="font-montserrat font-medium leading-[130%] text-white">
                  {ctaText}
                </span>
                <span className="rounded-full w-7.5 h-7.5 border border-white flex items-center justify-center">
                  <ArrowUpRight className="w-5.5 h-5.5 text-white" />
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
      {/* Background Texture */}
      {backgroundImage && (
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={textureImageUrl ?? ""}
            alt={textureImageAlt}
            fill
            className="object-cover object-center"
          />
        </div>
      )}
      {backgroundImageBlur && (
        <div className="absolute inset-0 w-full h-full ">
          <Image
            src={blurImageUrl ?? ""}
            alt={blurImageAlt}
            fill
            className="object-cover object-center blur-sm"
          />
        </div>
      )}
      <div className="absolute inset-0 w-full h-full bg-black/30"></div>
    </div>
  );
};

export default ProjectCard;
