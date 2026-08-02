"use client";

import { BackgroundOverlay } from "@/components/ui/background-overlay";
import { Eyebrow, HighlightedTitle } from "@/components/ui/highlighted-title";
import { SectionReveal } from "@/components/ui/section-reveal";
import { getMediaAlt, getMediaUrl } from "@/lib/utils";
import type { SubserviceFeaturesStepsBlock as SubserviceFeaturesAndStepsBlockType } from "@/payload-types";
import React from "react";

/**
 * SubserviceFeaturesAndStepsBlock Component - Displays features and steps with icons.
 */
export const SubserviceFeaturesAndStepsBlock: React.FC<SubserviceFeaturesAndStepsBlockType> = ({
  eyebrow,
  titleBeforeHighlight,
  highlightedTitle,
  titleAfterHighlight,
  subtitle,
  mainIconSvg,
  items,
  steps,
}) => {
  return (
    <section
      className="relative overflow-hidden bg-background py-10 lg:py-18"
      id="subservice-features-steps"
    >
      <div className="relative z-10 mx-auto flex flex-col gap-10 lg:gap-16 px-4 lg:px-14">
        {/* Main Heading Section */}
        <SectionReveal direction="up" className="w-full max-w-4xl">
          <div className="flex flex-col items-start gap-4">
            {mainIconSvg && (
              <div
                className="w-12 h-12 text-primary-500 flex items-center justify-center shrink-0 mb-2"
                dangerouslySetInnerHTML={{ __html: mainIconSvg }}
              />
            )}
            <div className="flex flex-col gap-2 lg:gap-1">
              <Eyebrow text={eyebrow} />
              <HighlightedTitle
                titleBeforeHighlight={titleBeforeHighlight}
                highlightedTitle={highlightedTitle}
                titleAfterHighlight={titleAfterHighlight}
                className="lg:max-w-3xl"
              />
            </div>
            {subtitle && (
              <p className="font-poppins text-sm leading-[130%] text-gray-500 lg:text-base lg:leading-7.25 max-w-4xl">
                {subtitle}
              </p>
            )}
          </div>
        </SectionReveal>

        {/* Feature Groups / Items */}
        {items && items.length > 0 && (
          <div className="flex flex-col gap-10">
            {items.map((group, index) => (
              <SectionReveal
                key={group.id || index}
                direction="up"
                delay={0.1 * index}
                className="w-full"
              >
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-1">
                    <Eyebrow text={group.eyebrow} />
                    <HighlightedTitle
                      titleBeforeHighlight={group.titleBeforeHighlight}
                      highlightedTitle={group.highlightedTitle}
                      titleAfterHighlight={group.titleAfterHighlight}
                    />
                    {group.subtitle && (
                      <p className="font-poppins text-sm text-gray-500 mt-1">{group.subtitle}</p>
                    )}
                  </div>

                  {group.subitems && group.subitems.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {group.subitems.map((sub, subIdx) => {
                        const bgUrl = getMediaUrl(sub.backgroundImage);
                        const bgAlt = getMediaAlt(sub.backgroundImage, sub.title);

                        return (
                          <div
                            key={sub.id || subIdx}
                            className="relative overflow-hidden p-6 rounded-2xl bg-white border border-outline/30 shadow-sm flex flex-col gap-3"
                          >
                            <BackgroundOverlay src={bgUrl} alt={bgAlt} opacityClass="opacity-5" />
                            <h4 className="font-montserrat font-semibold text-lg text-foreground uppercase relative z-10">
                              {sub.title}
                            </h4>
                            <p className="font-poppins text-sm leading-relaxed text-foreground/70 relative z-10">
                              {sub.description}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </SectionReveal>
            ))}
          </div>
        )}

        {/* Steps Grid */}
        {steps && steps.length > 0 && (
          <SectionReveal direction="up" delay={0.2} className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((s, index) => (
                <div
                  key={s.id || index}
                  className="flex flex-col p-6 rounded-2xl bg-white border border-outline/30 shadow-sm gap-3"
                >
                  {s.iconSvg && (
                    <div
                      className="w-8 h-8 text-primary-500 flex items-center justify-center shrink-0 mb-1"
                      dangerouslySetInnerHTML={{ __html: s.iconSvg }}
                    />
                  )}
                  {s.eyebrow && (
                    <span className="font-poppins text-xs font-semibold text-primary-500 uppercase">
                      {s.eyebrow}
                    </span>
                  )}
                  <h4 className="font-montserrat font-semibold text-lg text-foreground uppercase">
                    {s.title}
                  </h4>
                  <p className="font-poppins text-sm leading-relaxed text-foreground/70">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>
          </SectionReveal>
        )}
      </div>
    </section>
  );
};
