"use client";

import { BackgroundOverlay } from "@/components/ui/background-overlay";
import { Eyebrow, HighlightedTitle } from "@/components/ui/highlighted-title";
import { SectionReveal } from "@/components/ui/section-reveal";
import { cn, getMediaAlt, getMediaUrl } from "@/lib/utils";
import type { SubserviceUseCasesBlock as SubserviceCapabilitiesUseCasesBlockType } from "@/payload-types";
import { MinusIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { ListItemMarkSvg, Logo } from "../../layout/logo";

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
  const [activeItemIdx, setActiveItemIdx] = useState<number | null>(null);

  const toggleItem = (idx: number) => {
    setActiveItemIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      className="relative overflow-hidden bg-background py-10 lg:py-18"
      id="subservice-capabilities-usecases"
    >
      <BackgroundOverlay src={bgUrl} alt={bgAlt} opacityClass="opacity-5" />

      <div className="relative z-10 mx-auto flex flex-col gap-10 lg:gap-16">
        {/* Heading Section */}
        <SectionReveal
          direction="up"
          className="w-full flex flex-col-reverse lg:flex-row justify-between px-4 lg:px-14 gap-6"
        >
          <div className="flex flex-col items-start gap-4">
            <div className="flex flex-col gap-2 lg:gap-1">
              <Eyebrow text={eyebrow} />
              <HighlightedTitle
                titleBeforeHighlight={titleBeforeHighlight}
                highlightedTitle={highlightedTitle}
                titleAfterHighlight={titleAfterHighlight}
                className="lg:max-w-3xl lg:text-5xl!"
              />
            </div>
            {subtitle && (
              <p className="font-poppins text-sm leading-[130%] text-gray-500 lg:text-base lg:leading-7.25 max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>
          {fgUrl && (
            <div className="relative overflow-hidden w-85.75 h-70 lg:w-153 lg:h-127 shrink-0">
              <Image src={fgUrl} alt={fgAlt} fill className="object-cover" />
            </div>
          )}
        </SectionReveal>

        {/* Capabilities Grid */}
        {capabilities && capabilities.length > 0 && (
          <SectionReveal direction="up" delay={0.1} className="w-full lg:px-14">
            <div className="max-lg:py-4 max-lg:px-4 flex flex-col gap-6 bg-transparent rounded-none max-lg:border-t max-lg:border-outline/30 lg:rounded-[1.5rem] lg:p-10 lg:bg-white lg:gap-8.5">
              {capabilities.map(
                (
                  {
                    description,
                    title,
                    eyebrow,
                    id,
                    sideNoteDescription,
                    sideNoteIconSvg,
                    sideNoteTitle,
                    supertitle,
                    useCases,
                    useCasesLabel,
                  },
                  index,
                ) => (
                  <button
                    onClick={() => toggleItem(index)}
                    key={id ?? index}
                    className="flex flex-col max-lg:gap-6"
                  >
                    <div
                      className={cn(
                        "flex flex-row gap-4 items-center text-start pb-6",
                        activeItemIdx === index ? "" : "border-b border-outline/30",
                      )}
                    >
                      <div className="flex flex-col gap-2 lg:flex-row justify-between lg:flex-1 lg:gap-20">
                        <div className="flex flex-col lg:flex-row lg:gap-14">
                          {eyebrow && (
                            <span className="font-poppins text-[0.8125rem] leading-[160%] tracking-[-7%] uppercase text-gray-300 lg:text-[0.9375rem] lg:leading-8 lg:text-primary-500">
                              {eyebrow}
                            </span>
                          )}
                          <div className="flex flex-col">
                            {supertitle && (
                              <span className="font-poppins text-[0.8125rem] leading-[160%] tracking-[-7%] uppercase text-primary-500 lg:text-[0.9375rem]">
                                {supertitle}
                              </span>
                            )}
                            {title && (
                              <h4 className="font-poppins font-semibold text-xl leading-[160%] tracking-[-7%] uppercase">
                                {title}
                              </h4>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center">
                          {description && (
                            <p className="font-poppins text-sm leading-[160%] text-gray-500 lg:font-medium lg:text-base lg:leading-7.75">
                              {description}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="w-6 h-6 text-primary-500 relative lg:ms-9 shrink-0">
                        {activeItemIdx === index ? (
                          <MinusIcon className="w-full h-full" />
                        ) : (
                          <PlusIcon className="w-full h-full" />
                        )}
                      </div>
                    </div>
                    {activeItemIdx === index && (
                      <div className="max-lg:rounded-[0.75rem] border border-outline/30 bg-white py-6 px-4 flex flex-col gap-4 lg:rounded-b-[1.5rem] lg:pt-6 lg:pb-10 lg:ps-42.75 lg:pe-25 lg:flex-row lg:gap-10 text-start">
                        <div className="flex flex-col gap-4">
                          <div className="pb-2 border-b border-primary-100">
                            <span className="font-poppins text-base leading-[160%] tracking-[-7%] uppercase text-primary-500 lg:text-[0.9375rem]">
                              {useCasesLabel}
                            </span>
                          </div>
                          <ul className="flex flex-col gap-2 text-start">
                            {useCases?.map(({ useCase, id }, index) => (
                              <li key={id ?? index} className="flex flex-row gap-2 items-center">
                                <ListItemMarkSvg
                                  height={16}
                                  width={16}
                                  className="w-4 h-4 text-primary-500 opacity-32"
                                />
                                <span className="font-poppins text-[0.8125rem] leading-[160%] text-gray-500 lg:font-medium lg:text-base lg:leading-7.75">
                                  {useCase}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="max-lg:border-t border-outline/30 pt-4 flex flex-row gap-4 lg:border-s lg:ps-4">
                          {sideNoteIconSvg && (
                            <div className="w-8 h-8 lg:w-12 lg:h-12 relative flex items-center justify-center text-footer-gray">
                              <Logo
                                logoSvg={sideNoteIconSvg}
                                width={48}
                                height={48}
                                className="text-footer-gray"
                              />
                            </div>
                          )}
                          <div className="flex flex-col gap-2 text-start">
                            <span className="font-poppins font-medium text-xl leading-8 tracking-[-7%] uppercase">
                              {sideNoteTitle}
                            </span>
                            <p className="font-poppins text-sm leading-[160%} text-foreground/70 lg:leading-5">
                              {sideNoteDescription}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </button>
                ),
              )}
            </div>
          </SectionReveal>
        )}
      </div>
    </section>
  );
};
