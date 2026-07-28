"use client";

import { Eyebrow, HighlightedTitle } from "@/components/ui/highlighted-title";
import { cn, getMediaAlt, getMediaUrl } from "@/lib/utils";
import type { AboutWhoWeAreBlock as AboutWhoWeAreBlockType } from "@/payload-types";
import Image from "next/image";
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
      {bgImageUrl && (
        <>
          <div className="absolute inset-0 w-full h-full pointer-events-none opacity-3">
            <Image
              src={bgImageUrl}
              alt={bgImageAlt || "Background"}
              fill
              className="object-cover object-center"
            />
          </div>
        </>
      )}
      <div className="flex flex-col gap-8 lg:gap-14">
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
            <div className="flex flex-col gap-6 lg:max-w-lg">
              {stats?.map((_, index) => {
                if (index % 2 !== 0) return null;

                const left = stats[index];
                const right = stats[index + 1];

                return (
                  <div key={left.id ?? index} className="flex items-stretch gap-6">
                    <div className="flex-1 flex flex-col gap-1 lg:gap-3 justify-center">
                      <span
                        className={cn(
                          "font-montserrat font-semibold leading-[130%] lg:leading-41 tracking-[-7%] uppercase",
                          left.title.length > 3
                            ? "text-2xl lg:text-[2rem]"
                            : "text-7xl lg:text-[6.5rem]",
                        )}
                      >
                        {left.title}
                      </span>
                      <p className="font-poppins lg:text-lg lg:leading-6 lowercase text-foreground/70">
                        {left.description}
                      </p>
                    </div>

                    <div className="w-0.75 shrink-0 bg-primary-100/20 me-1 lg:me-4" />

                    <div className="flex-1 flex flex-col gap-1 lg:gap-3 justify-center">
                      <span
                        className={cn(
                          "font-montserrat font-semibold leading-[130%] lg:leading-41 tracking-[-7%] uppercase",
                          right.title.length > 3
                            ? "text-2xl lg:text-[2rem]"
                            : "text-7xl lg:text-[6.5rem]",
                        )}
                      >
                        {right.title}
                      </span>
                      <p className="font-poppins lg:text-lg lg:leading-6 lowercase text-foreground/70">
                        {right.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between gap-8 w-full">
            {cards?.map(({ title, description, eyebrow, id }, index) => (
              <div key={id ?? index} className="flex flex-col lg:flex-row gap-6">
                <div className="w-8 h-10 lg:w-12 lg:h-15 relative">
                  <Image
                    src={cardImageUrls?.[index] ?? ""}
                    alt={cardImageAlts?.[index] ?? ""}
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col">
                    <span className="font-poppins text-xs lg:text-[0.9375rem] leading-[130%] uppercase text-primary-500">
                      {eyebrow}
                    </span>
                    <h4 className="font-poppins font-medium text-xl leading-8 tracking-[-7%] uppercase">
                      {title}
                    </h4>
                  </div>
                  <p className="font-poppins text-sm leading-5 text-foreground/70 lg:max-w-xs">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
