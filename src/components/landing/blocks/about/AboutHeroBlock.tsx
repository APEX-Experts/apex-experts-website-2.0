"use client";

import { HeroSection } from "@/components/ui/hero-section";
import type { AboutHeroBlock as AboutHeroBlockType } from "@/payload-types";
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
  return (
    <HeroSection
      id="about-hero"
      breadcrumb={breadcrumb}
      title={title}
      subtitle={subtitle}
      backgroundImage={backgroundImage}
      defaultAlt="About Hero Background"
      overlayClass="bg-black/80"
    />
  );
};
