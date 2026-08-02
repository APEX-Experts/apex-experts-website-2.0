"use client";

import { Eyebrow, HighlightedTitle } from "@/components/ui/highlighted-title";
import { SectionReveal } from "@/components/ui/section-reveal";
import type { SubserviceDeliverablesBlock as SubserviceDeliverablesBlockType } from "@/payload-types";
import { Check } from "lucide-react";
import React from "react";

/**
 * SubserviceDeliverablesBlock Component - Displays deliverables with marker SVG.
 */
export const SubserviceDeliverablesBlock: React.FC<SubserviceDeliverablesBlockType> = ({
  eyebrow,
  titleBeforeHighlight,
  highlightedTitle,
  titleAfterHighlight,
  subtitle,
  deliverables,
  markerSvg,
}) => {
  return (
    <section className="relative overflow-hidden bg-background py-10 lg:py-18" id="subservice-deliverables">
      <div className="relative z-10 mx-auto flex flex-col gap-8 lg:gap-14 px-4 lg:px-14">
        {/* Heading Section */}
        <SectionReveal direction="up" className="w-full max-w-4xl">
          <div className="flex flex-col items-start gap-4">
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

        {/* Deliverables Grid */}
        {deliverables && deliverables.length > 0 && (
          <SectionReveal direction="up" delay={0.1} className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {deliverables.map((item, index) => (
                <div
                  key={item.id || index}
                  className="flex flex-row items-center gap-3 p-4 rounded-xl bg-white border border-outline/30 shadow-xs"
                >
                  {markerSvg ? (
                    <div
                      className="w-6 h-6 text-primary-500 flex items-center justify-center shrink-0"
                      dangerouslySetInnerHTML={{ __html: markerSvg }}
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-primary-500/10 text-primary-500 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                  <span className="font-poppins text-sm lg:text-base text-foreground font-medium">
                    {item.deliverable}
                  </span>
                </div>
              ))}
            </div>
          </SectionReveal>
        )}
      </div>
    </section>
  );
};
