"use client";

import type { HeroBlock as HeroBlockType, Media } from "@/payload-types";
import Image from "next/image";
import React from "react";

/**
 * Resolves Payload Media object or string/number ID into a usable URL string.
 */
function getMediaUrl(image: number | Media | null | undefined): string | null {
  if (!image) return null;
  if (typeof image === "object" && "url" in image && typeof image.url === "string") {
    return image.url;
  }
  return null;
}

/**
 * Resolves alt text from Payload Media or fallback string.
 */
function getMediaAlt(image: number | Media | null | undefined, fallback: string): string {
  if (
    typeof image === "object" &&
    image !== null &&
    "alt" in image &&
    typeof image.alt === "string"
  ) {
    return image.alt || fallback;
  }
  return fallback;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

/**
 * HeroBlock Component - Displays high-impact landing hero section with main image,
 * title highlights, action CTAs, statistical key metrics, and optional image gallery.
 */
export const HeroBlock: React.FC<HeroBlockType> = ({
  image,
  imageAlt,
  titleBeforeHighlight,
  highlightedTitle,
  titleAfterHighlight,
  subtitle,
  ctaPrimaryText,
  ctaPrimaryHref,
  ctaSecondaryText,
  ctaSecondaryHref,
  stats,
  gallery,
}) => {
  const heroImageUrl = getMediaUrl(image) || "/hero.jpg";
  const heroImageAltText = getMediaAlt(image, imageAlt || "Hero display image");

  return (
    <section className="relative overflow-hidden bg-bg text-white min-h-screen">
      <div className="absolute inset-0 w-full h-full">
        <Image src={heroImageUrl} alt={heroImageAltText} fill className="object-cover" />
      </div>
    </section>
  );
};
