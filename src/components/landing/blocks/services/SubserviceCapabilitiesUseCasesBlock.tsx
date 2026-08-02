"use client";

import { BackgroundOverlay } from "@/components/ui/background-overlay";
import { Eyebrow, HighlightedTitle } from "@/components/ui/highlighted-title";
import { SectionReveal } from "@/components/ui/section-reveal";
import { getMediaAlt, getMediaUrl } from "@/lib/utils";
import type { SubserviceUseCasesBlock as SubserviceCapabilitiesUseCasesBlockType } from "@/payload-types";
import { Check } from "lucide-react";
import Image from "next/image";
import React from "react";

/**
 * SubserviceCapabilitiesUseCasesBlock Component - Displays Capabilities with Use Cases and side notes.
 */
export const SubserviceCapabilitiesUseCasesBlock: React.FC<
  SubserviceCapabilitiesUseCasesBlockType
> = ({
  eyebrow,
  titleBeforeHighlight,
  highlightedTitle,
  titleAfterHighlight,
  subtitle,
  backgroundImage,
  foregroundImage,
  capabilities,
}) => {
  const bgUrl = getMediaUrl(backgroundImage);
  const bgAlt = getMediaAlt(backgroundImage, "Background");
  const fgUrl = getMediaUrl(foregroundImage);
  const fgAlt = getMediaAlt(foregroundImage, "Foreground");

  return (
    <section
      className="relative overflow-hidden bg-background py-10 lg:py-18"
      id="subservice-capabilities-usecases"
    >
      <BackgroundOverlay src={bgUrl} alt={bgAlt} opacityClass="opacity-5" />

      <div className="relative z-10 mx-auto flex flex-col gap-10 lg:gap-16 px-4 lg:px-14">
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

        {fgUrl && (
          <SectionReveal direction="up" delay={0.05} className="w-full flex justify-center">
            <div className="relative w-full max-w-4xl aspect-16/9 rounded-2xl overflow-hidden shadow-md">
              <Image src={fgUrl} alt={fgAlt} fill className="object-cover" />
            </div>
          </SectionReveal>
        )}

        {/* Capabilities Grid */}
        {capabilities && capabilities.length > 0 && (
          <SectionReveal direction="up" delay={0.1} className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {capabilities.map((cap, index) => (
                <div
                  key={cap.id || index}
                  className="flex flex-col p-6 lg:p-8 rounded-2xl bg-white border border-outline/30 shadow-sm gap-6 justify-between"
                >
                  <div className="flex flex-col gap-3">
                    {cap.eyebrow && (
                      <span className="font-poppins text-xs font-semibold text-primary-500 uppercase">
                        {cap.eyebrow}
                      </span>
                    )}
                    {cap.supertitle && (
                      <span className="font-poppins text-xs font-medium text-gray-400 uppercase">
                        {cap.supertitle}
                      </span>
                    )}
                    <h3 className="font-montserrat font-semibold text-xl lg:text-2xl text-foreground uppercase">
                      {cap.title}
                    </h3>
                    <p className="font-poppins text-sm leading-relaxed text-foreground/70">
                      {cap.description}
                    </p>

                    {/* Use Cases */}
                    {cap.useCases && cap.useCases.length > 0 && (
                      <div className="flex flex-col gap-2 pt-2">
                        {cap.useCasesLabel && (
                          <span className="font-poppins text-xs font-medium text-gray-500 uppercase">
                            {cap.useCasesLabel}
                          </span>
                        )}
                        <div className="flex flex-col gap-2">
                          {cap.useCases.map((uc, ucIdx) => (
                            <div key={uc.id || ucIdx} className="flex flex-row items-center gap-2">
                              <Check className="w-4 h-4 text-primary-500 shrink-0" />
                              <span className="font-poppins text-sm text-foreground/80 font-medium">
                                {uc.useCase}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Side Note Box */}
                  {(cap.sideNoteTitle || cap.sideNoteDescription) && (
                    <div className="p-4 rounded-xl bg-gray-50 border border-outline/20 flex flex-col gap-2">
                      {cap.sideNoteIconSvg && (
                        <div
                          className="w-6 h-6 text-primary-500 flex items-center justify-center shrink-0"
                          dangerouslySetInnerHTML={{ __html: cap.sideNoteIconSvg }}
                        />
                      )}
                      {cap.sideNoteTitle && (
                        <h4 className="font-montserrat font-semibold text-sm text-foreground uppercase">
                          {cap.sideNoteTitle}
                        </h4>
                      )}
                      {cap.sideNoteDescription && (
                        <p className="font-poppins text-xs text-foreground/70 leading-relaxed">
                          {cap.sideNoteDescription}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </SectionReveal>
        )}
      </div>
    </section>
  );
};
