"use client";

import { BackgroundOverlay } from "@/components/ui/background-overlay";
import { BreadcrumbNav, type BreadcrumbItem } from "@/components/ui/breadcrumb-nav";
import { SectionReveal } from "@/components/ui/section-reveal";
import { cn, getMediaAlt, getMediaUrl } from "@/lib/utils";
import type { AboutHeroBlock, Media } from "@/payload-types";
import { usePathname } from "next/navigation";
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
        className={cn("object-cover", isServicePage ? "object-center scale-150" : "object-top")}
        priority
      />

      <div className="relative z-10 mx-auto px-4 lg:px-14 flex flex-col items-center text-center">
        <SectionReveal direction="up" className="w-full flex flex-col items-center">
          {breadcrumb && <BreadcrumbNav items={breadcrumb} />}

          <h1 className="font-montserrat font-semibold text-xl lg:text-[4.375rem] leading-[130%] lg:leading-17.25 tracking-[-7%] text-center uppercase mb-2 lg:mb-6">
            {title}
          </h1>

          {subtitle && (
            <p className="font-poppins lg:text-[1.1875rem] leading-[160%] text-sm lg:text-base text-center text-white/70 max-w-7xl">
              {subtitle}
            </p>
          )}

          <div className="grid grid-cols-2 gap-2 lg:flex lg:flex-wrap lg:gap-3 justify-center pt-6 lg:pt-8 max-w-3xl">
            {tags?.map((tag, index) => (
              <div
                key={index}
                className="max-lg:last:odd:col-span-2 rounded-full border border-outline/30 py-2.5 px-4 flex items-center justify-center text-center lg:min-w-42.5"
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
