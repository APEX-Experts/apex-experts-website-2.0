"use client";

import { BackgroundOverlay } from "@/components/ui/background-overlay";
import { BreadcrumbNav, type BreadcrumbItem } from "@/components/ui/breadcrumb-nav";
import { SectionReveal } from "@/components/ui/section-reveal";
import { cn, getMediaAlt, getMediaUrl } from "@/lib/utils";
import type { AboutHeroBlock, Media } from "@/payload-types";
import { usePathname } from "@/i18n/routing";
import React from "react";

export type HeroSectionProps = {
  id?: string;
  breadcrumb?: BreadcrumbItem[] | null;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  backgroundImage?: number | Media | null;
  defaultAlt?: string;
  className?: string;
  overlayClass?: string;
  children?: React.ReactNode;
  tags?: AboutHeroBlock["tags"];
  justifyFromStart?: boolean;
  bgImageClassName?: string;
};

/**
 * HeroSection Component - Reusable hero block with background image, breadcrumbs, title, and subtitle.
 */
export const HeroSection: React.FC<HeroSectionProps> = ({
  id,
  breadcrumb,
  title,
  subtitle,
  backgroundImage,
  defaultAlt = "Hero Background",
  className = "",
  overlayClass = "bg-black/85",
  tags,
  children,
  justifyFromStart = false,
  bgImageClassName,
}) => {
  const bgImageUrl = getMediaUrl(backgroundImage);
  const bgImageAlt = getMediaAlt(backgroundImage, defaultAlt);
  const pathname = usePathname();
  const isServicePage = pathname.includes("service") || pathname.includes("blog");

  return (
    <section
      className={`relative overflow-hidden text-white pt-32 pb-20 lg:pt-40 lg:pb-28 rounded-none lg:rounded-b-[3.5rem] ${className}`}
      id={id}
    >
      <BackgroundOverlay
        src={bgImageUrl}
        alt={bgImageAlt}
        overlayClass={overlayClass}
        className={cn(
          "object-cover",
          isServicePage && !justifyFromStart
            ? "object-center scale-150"
            : justifyFromStart
              ? "object-center"
              : "object-top",
          bgImageClassName,
        )}
        priority
      />

      <div
        className={cn(
          "relative z-10 mx-auto px-4 lg:px-14 flex flex-col",
          justifyFromStart ? "items-start text-start" : "items-center text-center",
        )}
      >
        <SectionReveal
          direction="up"
          className={cn("w-full flex flex-col", justifyFromStart ? "items-start" : "items-center")}
        >
          {breadcrumb && <BreadcrumbNav items={breadcrumb} />}

          <h1
            className={cn(
              "font-montserrat font-semibold text-xl lg:text-5xl leading-[130%] lg:leading-17.25 tracking-[-7%] uppercase mb-2 lg:mb-6",
              justifyFromStart ? "text-start max-w-180" : "text-center",
            )}
          >
            {title}
          </h1>

          {subtitle && (
            <p
              className={cn(
                "font-poppins lg:text-[1.1875rem] leading-[160%] text-sm lg:text-base text-white/70 max-w-7xl",
                justifyFromStart ? "text-start max-w-250" : "text-center",
              )}
            >
              {subtitle}
            </p>
          )}

          <div
            className={cn(
              "grid grid-cols-2 gap-2 lg:flex lg:flex-wrap lg:gap-3 pt-6 lg:pt-8 max-w-3xl",
              justifyFromStart ? "justify-start" : "justify-center",
            )}
          >
            {tags?.map((tag, index) => (
              <div
                key={index}
                className={cn(
                  "max-lg:last:odd:col-span-2 rounded-full border border-outline/30 py-2.5 px-4 flex items-center justify-center lg:min-w-42.5",
                  justifyFromStart ? "text-start" : "text-center",
                )}
              >
                <span className="font-montserrat font-medium text-xs text-white lg:text-base">
                  {tag.tag}
                </span>
              </div>
            ))}
          </div>

          {children}
        </SectionReveal>
      </div>
    </section>
  );
};
