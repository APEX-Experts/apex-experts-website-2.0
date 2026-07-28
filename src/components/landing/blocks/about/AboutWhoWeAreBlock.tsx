"use client";

import { BackgroundOverlay } from "@/components/ui/background-overlay";
import { FeatureCard } from "@/components/ui/feature-card";
import { Eyebrow, HighlightedTitle } from "@/components/ui/highlighted-title";
import { StatPairBlock } from "@/components/ui/stat-pair-block";
import { getMediaAlt, getMediaUrl } from "@/lib/utils";
import type { AboutWhoWeAreBlock as AboutWhoWeAreBlockType } from "@/payload-types";
import React from "react";
import MarqueeSection from "../../layout/marquee";

/**
 * AboutWhoWeAreBlock Component - Displays the "Who We Are" section for the About page
 * with title highlight, stats, feature cards, icon marquee, and optional background image.
 */
export const AboutWhoWeAreBlock: React.FC<AboutWhoWeAreBlockType> = ({
  eyebrow,
  titleBeforeHighlight,
  highlightedTitle,
  titleAfterHighlight,
  subtitle,
  stats,
  cards,
  marqueeIcons,
  backgroundImage,
}) => {
  const bgImageUrl = getMediaUrl(backgroundImage);
  const bgImageAlt = getMediaAlt(backgroundImage, "Who We Are Background");

  const marqueeIconUrls = marqueeIcons?.map((icon) => getMediaUrl(icon.icon));
  const marqueeIconAlts = marqueeIcons?.map((icon) => getMediaAlt(icon.icon, "Icon"));

  const cardImageUrls = cards?.map((card) => getMediaUrl(card.image));
  const cardImageAlts = cards?.map((card) => getMediaAlt(card.image, "Image"));

  return (
    <section className="relative overflow-hidden bg-white px-4 py-8 lg:p-14" id="who-we-are">
      <BackgroundOverlay
        src={bgImageUrl}
        alt={bgImageAlt}
        opacityClass="opacity-3"
      />

      <div className="flex flex-col gap-10 lg:gap-14">
        <MarqueeSection
          marqueeIconAlts={marqueeIconAlts ?? []}
          marqueeIconUrls={(marqueeIconUrls ?? []) as string[]}
        />
        <div className="flex flex-col gap-8 lg:gap-18">
          <div className="flex flex-col lg:flex-row justify-between gap-8">
            <div className="flex flex-col gap-4 lg:gap-10">
              <div className="flex flex-col gap-2 lg:gap-1">
                <Eyebrow text={eyebrow} />
                <HighlightedTitle
                  titleBeforeHighlight={titleBeforeHighlight}
                  highlightedTitle={highlightedTitle}
                  titleAfterHighlight={titleAfterHighlight}
                  className="lg:max-w-3xl"
                />
              </div>
              <div className="flex flex-col gap-4 lg:gap-8">
                {subtitle &&
                  subtitle.split(".").map((par, index) => (
                    <p
                      key={index}
                      className="font-poppins text-sm leading-[130%] text-foreground/70 lg:text-base lg:leading-6.25 lg:max-w-4xl"
                    >
                      {par}.
                    </p>
                  ))}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="flex flex-col gap-6 lg:max-w-lg">
              {stats?.map((_, index) => {
                if (index % 2 !== 0) return null;

                const left = stats[index];
                const right = stats[index + 1];

                return (
                  <StatPairBlock key={left.id ?? index} left={left} right={right} />
                );
              })}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between gap-8 w-full">
            {cards?.map(({ title, description, eyebrow, id }, index) => (
              <FeatureCard
                key={id ?? index}
                title={title}
                description={description}
                eyebrow={eyebrow}
                iconUrl={cardImageUrls?.[index]}
                iconAlt={cardImageAlts?.[index]}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
