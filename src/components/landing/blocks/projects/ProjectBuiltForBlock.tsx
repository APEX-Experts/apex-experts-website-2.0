"use client";

import { BackgroundOverlay } from "@/components/ui/background-overlay";
import { SectionReveal } from "@/components/ui/section-reveal";
import { getMediaAlt, getMediaUrl } from "@/lib/utils";
import type { ProjectBuiltForBlock as ProjectBuiltForBlockType } from "@/payload-types";
import { motion, useReducedMotion } from "motion/react";
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
  cardBackgroundImage,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const bgUrl = getMediaUrl(backgroundImage);
  const bgAlt = getMediaAlt(backgroundImage, "Background");
  const cardBgUrl = getMediaUrl(cardBackgroundImage);
  const cardBgAlt = getMediaAlt(cardBackgroundImage, "Card Background");
  const fgUrls = foregroundImages?.map(({ image }) => getMediaUrl(image));
  const fgAlts = foregroundImages?.map(({ image }) => getMediaAlt(image, "Image"));

  const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="relative overflow-hidden bg-background lg:py-18" id="project-built-for">
      <BackgroundOverlay src={bgUrl} alt={bgAlt} opacityClass="opacity-3" />

      <div className="relative z-10 lg:px-14">
        <SectionReveal direction="up" className="w-full">
          <div className="relative w-full lg:rounded-[1.5rem] lg:bg-white lg:border lg:border-outline/30 principle-shadow">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-x-14.5 lg:gap-y-7.25 lg:p-18 w-full max-lg:pb-8">
              {/* Mobile Image */}
              <div className="lg:hidden relative w-full h-55 overflow-hidden">
                <ForegroundColorOverlay />
                <Image
                  src={fgUrls?.[0] ?? ""}
                  alt={fgAlts?.[0] ?? ""}
                  fill
                  className="object-cover object-center"
                />
              </div>
              {/* Desktop First Card */}
              <DesktopImageCard src={fgUrls?.[0]} alt={fgAlts?.[0]} />
              {/* Bullet Points */}
              <div className="max-lg:px-4 flex flex-col gap-6 lg:gap-8 lg:row-span-2">
                <h3 className="font-montserrat font-semibold text-xl leading-[160%] tracking-[-7%] uppercase text-foreground lg:font-bold lg:text-5xl lg:leading-[120%] lg:tracking-normal">
                  {title}
                </h3>
                <motion.ul
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={listContainerVariants}
                  className="flex flex-col gap-8"
                >
                  {bulletPoints?.map(({ text, id }, index) => (
                    <motion.li
                      key={id ?? index}
                      variants={listItemVariants}
                      whileHover={{ x: shouldReduceMotion ? 0 : 6 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-row gap-4 items-start lg:last:pb-2.5 shrink-0 group cursor-default"
                    >
                      <CheckCircleFill
                        className="w-5 h-5 lg:w-6 lg:h-6 shrink-0 text-secondary-300 transition-transform duration-300 group-hover:scale-110"
                        width={24}
                        height={24}
                      />
                      <span className="font-poppins text-sm lg:text-base leading-[160%] text-foreground/70 transition-colors duration-300 group-hover:text-foreground">
                        {text}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
              {/* Desktop Rest */}
              {fgUrls?.map((src, index) => {
                if (index === 0) return null;
                return <DesktopImageCard src={src} alt={fgAlts?.[index] ?? ""} key={index} />;
              })}
            </div>
            <BackgroundOverlay alt={cardBgAlt} src={cardBgUrl} opacityClass="opacity-2" />
          </div>
        </SectionReveal>
      </div>
    </section>
  );
};

const ForegroundColorOverlay = () => {
  return <div className="absolute inset-0 pointer-events-none bg-foreground/40 z-10 transition-opacity duration-300 group-hover:bg-foreground/20"></div>;
};

const DesktopImageCard = ({ src, alt }: { src?: string | null; alt?: string | null }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="max-lg:hidden relative w-full h-55 rounded-[1rem] overflow-hidden group cursor-pointer shadow-sm hover:shadow-md"
    >
      <ForegroundColorOverlay />
      <Image
        src={src ?? ""}
        alt={alt ?? ""}
        fill
        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
      />
    </motion.div>
  );
};

const CheckCircleFill = ({
  width,
  height,
  className,
}: {
  width: number;
  height: number;
  className?: string;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_755_14850)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M24 12C24 15.1826 22.7357 18.2348 20.4853 20.4853C18.2348 22.7357 15.1826 24 12 24C8.8174 24 5.76516 22.7357 3.51472 20.4853C1.26428 18.2348 0 15.1826 0 12C0 8.8174 1.26428 5.76516 3.51472 3.51472C5.76516 1.26428 8.8174 0 12 0C15.1826 0 18.2348 1.26428 20.4853 3.51472C22.7357 5.76516 24 8.8174 24 12ZM18.045 7.455C17.9379 7.34823 17.8103 7.26416 17.6699 7.20782C17.5295 7.15149 17.3792 7.12404 17.228 7.12712C17.0768 7.1302 16.9277 7.16375 16.7897 7.22575C16.6518 7.28776 16.5277 7.37695 16.425 7.488L11.2155 14.1255L8.076 10.9845C7.86274 10.7858 7.58067 10.6776 7.28922 10.6827C6.99776 10.6879 6.71969 10.8059 6.51357 11.0121C6.30745 11.2182 6.18938 11.4963 6.18424 11.7877C6.1791 12.0792 6.28728 12.3612 6.486 12.5745L10.455 16.545C10.5619 16.6517 10.6892 16.7358 10.8294 16.7923C10.9695 16.8487 11.1196 16.8764 11.2706 16.8736C11.4217 16.8708 11.5706 16.8376 11.7085 16.776C11.8465 16.7144 11.9706 16.6256 12.0735 16.515L18.0615 9.03C18.2656 8.81775 18.3784 8.53391 18.3756 8.23944C18.3728 7.94496 18.2546 7.66332 18.0465 7.455H18.045Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_755_14850">
          <rect width={width} height={height} fill="currentColor" />
        </clipPath>
      </defs>
    </svg>
  );
};
