"use client";

import { SectionReveal } from "@/components/ui/section-reveal";
import { getMediaAlt, getMediaUrl } from "@/lib/utils";
import type { AboutHeroBlock as AboutHeroBlockType } from "@/payload-types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

/**
 * AboutHeroBlock Component - Render block for the About Hero section.
 */
export const AboutHeroBlock: React.FC<AboutHeroBlockType> = ({
  breadcrumb,
  title,
  subtitle,
  backgroundImage,
}) => {
  const bgImageUrl = getMediaUrl(backgroundImage);
  const bgImageAlt = getMediaAlt(backgroundImage, "About Hero Background");

  return (
    <section
      className="relative overflow-hidden text-white pt-32 pb-20 lg:pt-40 lg:pb-28 rounded-b-3xl lg:rounded-b-[3.5rem]"
      id="about-hero"
    >
      {bgImageUrl && (
        <>
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <Image
              src={bgImageUrl}
              alt={bgImageAlt || "Background"}
              fill
              className="object-cover object-top"
              priority
            />
          </div>
          <div className="absolute inset-0 w-full h-full pointer-events-none bg-black/85" />
        </>
      )}

      <div className="container relative z-10 mx-auto px-4 lg:px-14 flex flex-col items-center text-center">
        <SectionReveal direction="up" className="w-full max-w-262.5 flex flex-col items-center">
          {breadcrumb && breadcrumb.length > 0 && (
            <nav aria-label="Breadcrumb" className="mb-1">
              <ol className="inline-flex items-center text-sm lg:text-base text-white/70 font-poppins uppercase">
                {breadcrumb.map((item, index) => {
                  const isLast = index === breadcrumb.length - 1;
                  return (
                    <li key={item.id || index} className="inline-flex items-center">
                      {index > 0 && <span className="mx-1 shrink-0">/</span>}
                      {item.href && !isLast ? (
                        <Link
                          href={item.href}
                          className="hover:text-white transition-colors duration-200"
                        >
                          {item.text}
                        </Link>
                      ) : (
                        <span className={isLast ? "text-white font-medium" : ""}>{item.text}</span>
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
          )}

          <h1 className="font-montserrat font-semibold text-3xl lg:text-[4.375rem] leading-[130%] lg:leading-17.25 lg:tracking-[-7%] text-center uppercase mb-4 lg:mb-6">
            {title}
          </h1>

          {subtitle && (
            <p className="font-poppins lg:text-[1.1875rem] leading-[130%] text-center text-white/70 max-w-4xl">
              {subtitle}
            </p>
          )}
        </SectionReveal>
      </div>
    </section>
  );
};
