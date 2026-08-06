"use client";

import { Eyebrow, HighlightedTitle } from "@/components/ui/highlighted-title";
import { SectionReveal } from "@/components/ui/section-reveal";
import { getMediaAlt, getMediaUrl } from "@/lib/utils";
import type { AboutOurDifferenceBlock as AboutOurDifferenceBlockType } from "@/payload-types";
import { motion } from "motion/react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import React from "react";

/**
 * AboutOurDifferenceBlock Component - Displays the "Our Difference" section for the About page
 * with header and secondary title/eyebrow sections.
 */
export const AboutOurDifferenceBlock: React.FC<AboutOurDifferenceBlockType> = ({
  headerEyebrow,
  headerTitleBeforeHighlight,
  headerHighlightedTitle,
  headerTitleAfterHighlight,
  headerSubtitle,
  secondaryEyebrow,
  secondaryTitleBeforeHighlight,
  secondaryHighlightedTitle,
  secondaryTitleAfterHighlight,
  secondarySubtitle,
  items,
  backgroundImage,
  foregroundImage,
  learnMoreText,
  learnMoreHref,
}) => {
  const bgImageUrl = getMediaUrl(backgroundImage);
  const bgImageAlt = getMediaAlt(backgroundImage, "Background texture");
  const fgImageUrl = getMediaUrl(foregroundImage);
  const fgImageAlt = getMediaAlt(foregroundImage, "Difference illustration");
  const isRtl = typeof document !== "undefined" && document.dir === "rtl";

  return (
    <section
      className="relative overflow-hidden bg-white pt-10 max-lg:pb-4 lg:pt-18 "
      id="our-difference"
    >
      {bgImageUrl && (
        <div className="absolute inset-0 w-full h-full pointer-events-none opacity-3">
          <Image src={bgImageUrl} alt={bgImageAlt} fill className="object-cover object-center" />
        </div>
      )}

      <div className="relative z-10 mx-auto px-4 lg:px-14 flex flex-col gap-8 lg:gap-18">
        {/* Main Header Title & Eyebrow */}
        <SectionReveal direction="up" className="w-full">
          <div className="flex flex-col items-start gap-4 pb-8 border-b border-primary-100/50">
            <div className="flex flex-col gap-2 lg:gap-1">
              <Eyebrow text={headerEyebrow} />
              <HighlightedTitle
                titleBeforeHighlight={headerTitleBeforeHighlight}
                highlightedTitle={headerHighlightedTitle}
                titleAfterHighlight={headerTitleAfterHighlight}
                className="lg:max-w-3xl"
              />
            </div>
            {headerSubtitle && (
              <p className="font-poppins text-sm leading-[130%] text-gray-500 lg:text-base lg:leading-7.25">
                {headerSubtitle}
              </p>
            )}
          </div>
        </SectionReveal>

        {/* Content Section: Secondary Header + Items List + Foreground Image */}
        <div className="flex flex-col gap-8 lg:gap-18 items-center">
          {/* Items Column */}
          <SectionReveal direction="up" className="flex-1 w-full flex flex-col gap-8 lg:gap-18">
            {/* Secondary Title & Eyebrow */}
            {(secondaryTitleBeforeHighlight || secondaryHighlightedTitle || secondaryEyebrow) && (
              <div className="flex flex-col gap-2 pb-8 max-lg:border-b border-primary-100/50">
                <Eyebrow text={secondaryEyebrow} />
                <HighlightedTitle
                  titleBeforeHighlight={secondaryTitleBeforeHighlight}
                  highlightedTitle={secondaryHighlightedTitle}
                  titleAfterHighlight={secondaryTitleAfterHighlight}
                  as="h3"
                  className="lg:max-w-215"
                />
                {secondarySubtitle && (
                  <p className="font-poppins text-base text-foreground/70 leading-relaxed lg:leading-6 mt-1 lg:max-w-215">
                    {secondarySubtitle}
                  </p>
                )}
              </div>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_420px_minmax(0,1fr)] xl:grid-cols-[minmax(0,1fr)_445px_minmax(0,1fr)] items-center lg:items-start max-lg:justify-center gap-8">
              <div className="h-full flex flex-col justify-between gap-8 order-2 lg:order-1">
                {items?.slice(0, 2).map(({ description, title, id }, index) => (
                  <motion.div
                    key={id ?? index}
                    whileHover={{ x: isRtl ? 4 : -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CardTextBlock title={title} description={description} />
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-70 h-120 lg:w-105 lg:h-180 relative order-1 lg:order-2 shrink-0 justify-self-center"
              >
                <Image
                  src={fgImageUrl ?? ""}
                  alt={fgImageAlt}
                  fill
                  className="object-cover object-center"
                />
              </motion.div>
              <div className="h-full flex flex-col justify-between gap-8 order-3">
                {items?.slice(2, 4).map(({ description, title, id }, index) => (
                  <motion.div
                    key={id ?? index}
                    whileHover={{ x: isRtl ? -4 : 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CardTextBlock title={title} description={description} />
                  </motion.div>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
        <SectionReveal
          direction="up"
          delay={0.1}
          className="w-full flex flex-row items-center gap-6 mt-8"
        >
          {/* Left Line */}
          <div className="flex-1 h-16 lg:h-32 relative">
            <div className="absolute top-0 bottom-1/2 left-0 right-0 lg:border-s border-b border-primary-100 lg:rounded-es-[1rem]"></div>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Link
              href={learnMoreHref || "/about-us"}
              className="font-montserrat text-primary-500 text-xs md:text-base lg:text-lg hover:underline font-medium mx-4 lg:mx-16 inline-block"
            >
              {learnMoreText}
            </Link>
          </motion.div>

          {/* Right Line */}
          <div className="flex-1 h-16 lg:h-32 relative">
            <div className="absolute top-0 bottom-1/2 left-0 right-0 lg:border-e border-b border-primary-100 lg:rounded-ee-[1rem]"></div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
};

const CardTextBlock = ({ title, description }: { title: string; description: string }) => {
  return (
    <div className="flex flex-col gap-2 lg:gap-4">
      <h4 className="font-montserrat font-semibold text-2xl lg:text-[2rem] leading-[130%] tracking-[-7%] uppercase">
        {title}
      </h4>
      <div className="font-poppins text-sm lg:text-base lg:leading-[160%] text-foreground/70 flex flex-col gap-1 lg:gap-4">
        {description?.split(".").map((par, index) => par.length > 0 && <p key={index}>{par}.</p>)}
      </div>
    </div>
  );
};
