"use client";

import { BackgroundOverlay } from "@/components/ui/background-overlay";
import { Button } from "@/components/ui/button";
import { Eyebrow, HighlightedTitle } from "@/components/ui/highlighted-title";
import { SectionReveal } from "@/components/ui/section-reveal";
import { getMediaAlt, getMediaUrl } from "@/lib/utils";
import type { ProjectCtaBlock as ProjectCtaBlockType } from "@/payload-types";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Link } from "@/i18n/routing";
import React from "react";

/**
 * ProjectCtaBlock Component - Renders Project CTA section.
 */
export const ProjectCtaBlock: React.FC<ProjectCtaBlockType> = ({
  eyebrow,
  titleBeforeHighlight,
  highlightedTitle,
  titleAfterHighlight,
  subtitle,
  ctaGroup,
  backgroundImage,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const bgUrl = getMediaUrl(backgroundImage);
  const bgAlt = getMediaAlt(backgroundImage, "CTA Background");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="relative overflow-hidden bg-background py-10 lg:py-18" id="project-cta">
      <BackgroundOverlay src={bgUrl} alt={bgAlt} overlayClass="bg-black/80" />

      <div className="relative z-10 mx-auto px-4 lg:px-14 flex flex-col items-center text-center gap-8">
        <SectionReveal
          direction="up"
          className="w-full flex flex-col items-center lg:flex-row lg:justify-between "
        >
          <div className="flex flex-col items-center gap-4 max-w-3xl">
            <div className="flex flex-col gap-2 items-center">
              <Eyebrow text={eyebrow} />
              <HighlightedTitle
                titleBeforeHighlight={titleBeforeHighlight}
                highlightedTitle={highlightedTitle}
                titleAfterHighlight={titleAfterHighlight}
                className="text-center lg:text-start text-white font-bold lg:text-3xl"
              />
            </div>
            {subtitle && (
              <p className="font-poppins text-sm text-gray-60 leading-relaxed text-center lg:text-start">
                {subtitle}
              </p>
            )}
          </div>

          {ctaGroup && ctaGroup.length > 0 && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={containerVariants}
              className="flex flex-col sm:flex-row gap-3 sm:gap-5 w-full max-lg:justify-center items-center justify-center pt-6 lg:pt-8"
            >
              {ctaGroup.map((cta, index) => (
                <motion.div
                  key={cta.id || index}
                  variants={buttonVariants}
                  whileHover={{
                    scale: shouldReduceMotion ? 1 : 1.04,
                    y: shouldReduceMotion ? 0 : -2,
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto"
                >
                  <Button asChild variant={cta.type === "primary" ? "ctaPrimary" : "ctaSecondary"}>
                    <Link href={cta.href} className="group">
                      {cta.type === "primary" ? (
                        <>
                          <span className="font-medium text-white">{cta.text}</span>
                          <div className="w-6 h-6 lg:w-7.5 lg:h-7.5 bg-white rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                            <ArrowRight
                              className="w-4 h-4 lg:w-5.5 lg:h-5.5 text-primary-500 -rotate-30 rtl:-rotate-150 transition-transform duration-300 group-hover:rotate-0 rtl:group-hover:rotate-0"
                              width="22"
                              height="22"
                            />
                          </div>
                        </>
                      ) : (
                        <span>{cta.text}</span>
                      )}
                    </Link>
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </SectionReveal>
      </div>
    </section>
  );
};
