"use client";

import { BackgroundOverlay } from "@/components/ui/background-overlay";
import { Button } from "@/components/ui/button";
import { getMediaAlt, getMediaUrl } from "@/lib/utils";
import type { CommonCtaBlock as CommonCtaBlockType } from "@/payload-types";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Link } from "@/i18n/routing";
import React from "react";

/**
 * CommonCtaBlock Component - Displays a prominent CTA banner section.
 */
export const CommonCtaBlock: React.FC<CommonCtaBlockType> = ({
  title,
  description,
  primaryCtaText,
  primaryCtaHref,
  secondaryCtaText,
  secondaryCtaHref,
  backgroundImage,
}) => {
  const bgImageUrl = getMediaUrl(backgroundImage);
  const bgImageAlt = getMediaAlt(backgroundImage, "CTA Background");
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-background" id="common-cta">
      <BackgroundOverlay src={bgImageUrl} alt={bgImageAlt} overlayClass="bg-black/70" />
      <div className="bg-linear-to-b from-transparent to-black/70 absolute inset-0 w-full h-full"></div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: shouldReduceMotion ? 0 : 0.15,
              delayChildren: 0.1,
            },
          },
        }}
        className="px-4 py-10 lg:px-14 lg:py-18 flex flex-col items-center gap-8 relative"
      >
        <div className="flex flex-col items-center gap-3 lg:gap-4">
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            className="max-w-3xl font-display font-bold text-xl leading-[160%] text-center text-white uppercase lg:font-semibold lg:text-5xl lg:leading-15.25 lg:tracking-[-7%]"
          >
            {title}
          </motion.h2>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            className="max-w-4xl font-poppins text-sm leading-[160%] text-center text-white/70 lg:text-lg"
          >
            {description}
          </motion.p>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-2.5 lg:justify-center max-lg:w-full">
          <motion.div
            variants={{
              hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-5 w-full max-lg:justify-center *:max-lg:w-full"
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto"
            >
              <Button asChild variant="ctaPrimary">
                <Link href={primaryCtaHref ?? "#"}>
                  <span className="font-medium text-white">{primaryCtaText}</span>
                  <div className="w-6 h-6 lg:w-7.5 lg:h-7.5 bg-white rounded-full flex items-center justify-center">
                    <ArrowRight
                      className="w-4 h-4 lg:w-5.5 lg:h-5.5 text-primary-500 -rotate-30 rtl:-rotate-150"
                      width={"22"}
                      height={"22"}
                    />
                  </div>
                </Link>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto"
            >
              <Button asChild variant="ctaSecondary">
                <Link href={secondaryCtaHref ?? "#"}>{secondaryCtaText}</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
