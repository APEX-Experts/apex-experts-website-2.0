"use client";

import { Eyebrow, HighlightedTitle } from "@/components/ui/highlighted-title";
import { SectionReveal } from "@/components/ui/section-reveal";
import { zeroPadNumber } from "@/lib/utils";
import type { ContactWhatWeDeliverBlock as ContactWhatWeDeliverBlockType } from "@/payload-types";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import React, { useRef, useState } from "react";

/**
 * ContactWhatWeDeliverBlock Component - Renders "What We Deliver" section.
 */
export const ContactWhatWeDeliverBlock: React.FC<ContactWhatWeDeliverBlockType> = ({
  eyebrow,
  titleBeforeHighlight,
  highlightedTitle,
  titleAfterHighlight,
  subtitle,
  items,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 65%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 250,
    damping: 28,
    restDelta: 0.001,
  });

  const circleTop = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (!items || items.length === 0) return;
    const clamped = Math.min(1, Math.max(0, latest));
    const index = Math.min(items.length - 1, Math.floor(clamped * items.length));
    setActiveIndex(index);
  });

  return (
    <section
      className="relative overflow-hidden bg-background py-10 lg:py-18"
      id="contact-what-we-deliver"
    >
      <div className="relative z-10 mx-auto flex flex-col lg:flex-row gap-6 lg:gap-14 px-4 lg:px-14">
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

        {/* Deliverables List */}
        {items && items.length > 0 && (
          <SectionReveal direction="up" delay={0.1} className="w-full flex">
            <div ref={containerRef} className="relative flex flex-row gap-4 lg:gap-10 flex-1">
              {/* Vertical Scroll Timeline */}
              <div className="relative shrink-0 w-[40px] lg:w-[56px]">
                {/* Vertical Line */}
                <div className="absolute top-5 lg:top-0 bottom-5 lg:bottom-0 left-1/2 -translate-x-1/2 w-[3px] bg-primary-100/50 rounded-full" />

                {/* Outer halo track wrapper for floating circle */}
                <div className="absolute top-5 lg:top-0 bottom-5 lg:bottom-0 left-1/2 -translate-x-1/2 w-0">
                  <motion.div
                    style={{ top: circleTop }}
                    className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-primary-100/50 border border-primary-100/50 shadow-sm transition-transform duration-300 hover:scale-105 w-[40px] h-[40px] lg:w-[56px] lg:h-[56px] shrink-0"
                  >
                    {/* Inner Solid Red Circle */}
                    <div className="w-[28px] h-[28px] lg:w-[38px] lg:h-[38px] rounded-full bg-primary-500 flex items-center justify-center text-white shadow-md shrink-0">
                      <span className="font-display font-black italic text-xs lg:text-lg text-white leading-none tracking-tight select-none flex items-center justify-center me-1">
                        {zeroPadNumber(activeIndex + 1, 2)}
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Items List */}
              <div className="flex flex-col gap-10 flex-1">
                {items.map(({ item, id }, index) => (
                  <div
                    key={id ?? index}
                    className="rounded-[0.5rem] border border-primary-100 p-4 flex items-center justify-center text-center text-foreground text-sm leading-[160%] font-poppins bg-white lg:py-8 lg:px-4 lg:justify-start lg:text-start lg:rounded-[1rem] lg:text-base lg:leading-5.5 shadow-sm hover:shadow-lg transition-shadow duration-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>
        )}
      </div>
    </section>
  );
};
