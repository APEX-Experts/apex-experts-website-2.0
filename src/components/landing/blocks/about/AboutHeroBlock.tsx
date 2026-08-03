"use client";

import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/ui/hero-section";
import type { AboutHeroBlock as AboutHeroBlockType } from "@/payload-types";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
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
  ctaGroup,
  tags,
  justifyFromStart,
}) => {
  return (
    <HeroSection
      id="about-hero"
      breadcrumb={breadcrumb}
      title={title}
      subtitle={subtitle}
      backgroundImage={backgroundImage}
      defaultAlt="About Hero Background"
      overlayClass={justifyFromStart ? "hero-gradient-overlay" : "bg-black/80"}
      tags={tags}
      justifyFromStart={justifyFromStart ?? false}
      bgImageClassName={justifyFromStart ? "" : undefined}
    >
      {ctaGroup && ctaGroup.length > 0 && (
        <div
          className={`flex flex-col sm:flex-row gap-3 sm:gap-5 w-full pt-6 lg:pt-8 ${justifyFromStart ? "justify-start items-start" : "items-center justify-center max-lg:justify-center"}`}
        >
          {ctaGroup.map((cta, index) => (
            <motion.div
              key={cta.id || index}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto"
            >
              <Button asChild variant={cta.type === "primary" ? "ctaPrimary" : "ctaSecondary"}>
                <Link href={cta.href}>
                  {cta.type === "primary" ? (
                    <>
                      <span className="font-medium text-white text-base">{cta.text}</span>
                      <div className="w-6 h-6 lg:w-7.5 lg:h-7.5 bg-white rounded-full flex items-center justify-center">
                        <ArrowRight
                          className="w-4 h-4 lg:w-5.5 lg:h-5.5 text-primary-500 -rotate-30"
                          width="22"
                          height="22"
                        />
                      </div>
                    </>
                  ) : (
                    <span className="text-base font-medium">{cta.text}</span>
                  )}
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>
      )}
    </HeroSection>
  );
};
