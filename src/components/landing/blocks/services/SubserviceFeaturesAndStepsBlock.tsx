"use client";

import { BackgroundOverlay } from "@/components/ui/background-overlay";
import { Eyebrow, HighlightedTitle } from "@/components/ui/highlighted-title";
import { SectionReveal } from "@/components/ui/section-reveal";
import { cn, getMediaAlt, getMediaUrl, zeroPadNumber } from "@/lib/utils";
import type { SubserviceFeaturesStepsBlock as SubserviceFeaturesAndStepsBlockType } from "@/payload-types";
import React from "react";
import { Logo } from "../../layout/logo";

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
      <div className="relative z-10 mx-auto flex flex-col gap-10 lg:gap-16">
        {/* Main Heading Section */}
        <SectionReveal direction="up" className="w-full px-4 lg:px-14">
          <div className="flex flex-col lg:flex-row-reverse lg:justify-between items-center lg:items-start gap-6">
            {mainIconSvg && (
              <div className="w-40 h-40 text-primary-500 flex items-center justify-center shrink-0">
                <Logo logoSvg={mainIconSvg} height={160} width={160} />
              </div>
            )}
            <div className="flex flex-col gap-4">
              <Eyebrow text={eyebrow} />
              <HighlightedTitle
                titleBeforeHighlight={titleBeforeHighlight}
                highlightedTitle={highlightedTitle}
                titleAfterHighlight={titleAfterHighlight}
                className="lg:max-w-3xl"
              />
              {subtitle && (
                <p className="font-poppins text-sm leading-[130%] text-gray-500 lg:text-base lg:leading-7.25 max-w-210">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </SectionReveal>

        {/* Feature Groups / Items */}
        {items && items.length > 0 && (
          <div className="flex flex-col gap-6">
            {items.map((group, index) => (
              <SectionReveal
                key={group.id || index}
                direction="up"
                delay={0.1 * index}
                className="w-full"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:px-14">
                  <div
                    className={cn(
                      "flex flex-col gap-1 px-4",
                      index % 2 === 0 ? "lg:order-0 max-lg:pb-6" : "lg:order-1 max-lg:pt-4",
                    )}
                  >
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

                  {group.subitems &&
                    group.subitems.length > 0 &&
                    group.subitems.map((sub, subIdx) => {
                      const bgUrl = getMediaUrl(sub.backgroundImage);
                      const bgAlt = getMediaAlt(sub.backgroundImage, sub.title);

                      return (
                        <div
                          key={sub.id || subIdx}
                          className={cn(
                            "relative overflow-hidden lg:rounded-[0.75rem] py-6 px-4 flex flex-col gap-2 max-lg:w-full lg:py-9.25 lg:px-6",
                          )}
                          style={{
                            order:
                              index % 2 === 0 ? subIdx + 1 : subIdx === 0 ? subIdx : subIdx + 1,
                          }}
                        >
                          <BackgroundOverlay
                            src={bgUrl}
                            alt={bgAlt}
                            opacityClass="opacity-100"
                            overlayClass="bg-black/60"
                            className="object-cover object-bottom"
                          />
                          <div
                            className={cn(
                              "absolute inset-0 w-full h-full pointer-events-none",
                              index % 2 === 0 ? "feature-step-gradient opacity-80" : "bg-black/0",
                            )}
                          />
                          <h4 className="font-montserrat font-semibold text-xl text-white leading-[160%] tracking-[-6%] lg:text-[1.625rem] lg:leading-6.5 relative z-10 max-w-75">
                            {sub.title}
                          </h4>
                          <div className="flex flex-row w-full justify-between items-end gap-4">
                            <p className="font-poppins text-sm leading-[160%] text-white/80 lg:text-lg relative z-10 max-w-140">
                              {sub.description}
                            </p>
                            <div className="w-12 h-12 rounded-full bg-primary-100/50 flex items-center justify-center relative z-10 shrink-0">
                              <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center">
                                <span className="font-montserrat font-black italic text-[0.9375rem]  text-white me-1 mb-0.5">
                                  {zeroPadNumber(subIdx + 1, 2)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </SectionReveal>
            ))}
          </div>
        )}

        {/* Steps Grid */}
        {steps && steps.length > 0 && (
          <SectionReveal direction="up" delay={0.2} className="w-full px-4 lg:px-14">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8.5 lg:gap-14 lg:justify-between">
              {steps.map((s, index) => (
                <div key={s.id || index} className="flex flex-row gap-4">
                  {s.iconSvg && (
                    <div className="w-8 h-8 lg:w-12 lg:h-12 text-primary-500 flex items-center justify-center shrink-0 mb-1">
                      <Logo
                        logoSvg={s.iconSvg}
                        width={48}
                        height={48}
                        className="w-8 h-8 lg:w-12 lg:h-12"
                      />
                    </div>
                  )}
                  <div className="flex flex-col pb-7.5 border-b border-outline/30">
                    {s.eyebrow && (
                      <span className="font-poppins text-sm lg:text-[0.9375rem] leading-[160%] text-primary-500 uppercase">
                        {s.eyebrow}
                      </span>
                    )}
                    <h4 className="font-poppins font-medium text-lg lg:text-xl text-foreground uppercase leading-8 lg:leading-[160%] tracking-[-7%]">
                      {s.title}
                    </h4>
                    <p className="font-poppins text-sm leading-5 text-foreground/70 mt-2">
                      {s.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </SectionReveal>
        )}
      </div>
    </section>
  );
};
