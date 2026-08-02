"use client";

import { BackgroundOverlay } from "@/components/ui/background-overlay";
import { Eyebrow, HighlightedTitle } from "@/components/ui/highlighted-title";
import { SectionReveal } from "@/components/ui/section-reveal";
import { getMediaAlt, getMediaUrl, zeroPadNumber } from "@/lib/utils";
import type { ContactWhatWeDeliverBlock as ContactWhatWeDeliverBlockType } from "@/payload-types";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
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
  backgroundImage,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

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

  const bgUrl = getMediaUrl(backgroundImage);
  const bgAlt = getMediaAlt(backgroundImage, "Background Texture");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="relative bg-background py-10 lg:py-18" id="contact-what-we-deliver">
      <div className="absolute inset-0 overflow-hidden">
        <BackgroundOverlay alt={bgAlt} src={bgUrl} opacityClass="opacity-2" />
      </div>
      <div className="relative z-10 mx-auto flex flex-col lg:flex-row gap-6 lg:gap-14 px-4 lg:px-14">
        {/* Heading Section */}
        <div className="w-full max-w-4xl lg:sticky lg:top-24 lg:self-start">
          <SectionReveal direction="up" className="w-full max-w-4xl">
            <div className="flex flex-col items-start gap-4">
              <div className="flex flex-col gap-2 lg:gap-1">
                <Eyebrow text={eyebrow} icon={<MarkIcon width={16} height={16} className="text-primary-500/40 w-4 h-4" />} />
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
        </div>

        {/* Deliverables List */}
        {items && items.length > 0 && (
          <SectionReveal direction="up" delay={0.1} className="w-full flex">
            <div ref={containerRef} className="relative flex flex-row gap-4 lg:gap-10 flex-1">
              {/* Vertical Scroll Timeline */}
              <div className="relative shrink-0 w-10 lg:w-14">
                {/* Vertical Line */}
                <div className="absolute top-5 lg:top-0 bottom-5 lg:bottom-0 left-1/2 -translate-x-1/2 w-0.75 bg-primary-100/50 rounded-full" />

                {/* Outer halo track wrapper for floating circle */}
                <div className="absolute top-5 lg:top-0 bottom-5 lg:bottom-0 left-1/2 -translate-x-1/2 w-0">
                  <motion.div
                    style={{ top: circleTop }}
                    className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-primary-100/50 border border-primary-100/50 shadow-sm transition-transform duration-300 hover:scale-105 w-10 h-10 lg:w-14 lg:h-14 shrink-0"
                  >
                    {/* Inner Solid Red Circle */}
                    <div className="w-7 h-7 lg:w-9.5 lg:h-9.5 rounded-full bg-primary-500 flex items-center justify-center text-white shadow-md shrink-0">
                      <span className="font-display font-black italic text-xs lg:text-lg text-white leading-none tracking-tight select-none flex items-center justify-center me-1">
                        {zeroPadNumber(activeIndex + 1, 2)}
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Items List */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={containerVariants}
                className="flex flex-col gap-10 flex-1"
              >
                {items.map(({ item, id }, index) => (
                  <motion.div
                    key={id ?? index}
                    variants={itemVariants}
                    whileHover={{ x: shouldReduceMotion ? 0 : 6 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-[0.5rem] border border-primary-100 p-4 flex items-center justify-center text-center text-foreground text-sm leading-[160%] font-poppins bg-white lg:py-8 lg:px-4 lg:justify-start lg:text-start lg:rounded-[1rem] lg:text-base lg:leading-5.5 shadow-sm hover:shadow-lg hover:border-primary-300 transition-all duration-300 cursor-default"
                  >
                    {item}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </SectionReveal>
        )}
      </div>
    </section>
  );
};

const MarkIcon = ({
  width,
  height,
  className,
}: {
  width: number;
  height: number;
  className?: string;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        opacity="0.8"
        d="M1.55652 3.08345C1.70129 3.16045 1.88759 3.25161 2.02336 3.33252C2.88457 3.84576 3.82299 4.57725 4.45792 5.35657C5.05019 6.09786 5.49783 6.94388 5.77762 7.85053C5.89121 8.22302 6.06654 8.98971 6.0891 9.38013C5.54886 9.67653 5.02731 10.0293 4.54987 10.4205C4.26861 10.651 3.98653 10.9565 3.71749 11.1927C3.99844 10.027 3.83066 8.71907 3.19923 7.69358C2.58626 6.69783 1.61132 5.97301 0.591188 5.43366C0.56237 5.41841 0.45674 5.3637 0.429809 5.36021C0.373846 5.35818 0.322898 5.34032 0.296385 5.28959C0.313834 5.21361 1.47928 3.16073 1.55652 3.08345Z"
        fill="currentColor"
      />
      <path
        opacity="0.8"
        d="M10.7152 0.57271L12.7652 1.75708C11.7233 3.59236 9.97092 5.1026 7.9735 5.79575C7.37479 6.00353 6.76198 6.12556 6.13749 6.21944L6.07967 6.10761C5.95155 5.88362 5.8559 5.69509 5.71394 5.46714C5.36655 4.91175 4.94362 4.40738 4.45729 3.96852C6.06591 4.28915 7.72422 3.69976 8.93704 2.65177C9.59029 2.08729 10.2595 1.30694 10.7152 0.57271Z"
        fill="currentColor"
      />
      <path
        opacity="0.8"
        d="M11.8809 4.48312C11.8946 4.53667 11.7897 4.9124 11.7774 5.00021C11.4422 7.4069 12.917 9.27659 15.0043 10.2954C14.5801 11.0301 14.1569 11.7781 13.7247 12.5071C13.3771 12.3294 13.0385 12.1011 12.7198 11.8772C11.1709 10.7575 10.0301 9.11507 9.61577 7.24139C9.54152 6.90564 9.47112 6.54755 9.44365 6.20563C9.70099 6.06389 9.95523 5.93928 10.2095 5.78255C10.8005 5.41829 11.3895 4.97494 11.8809 4.48312Z"
        fill="currentColor"
      />
      <path
        opacity="0.8"
        d="M9.3318 9.2925C9.36439 9.32375 9.52247 9.64768 9.56064 9.71822C9.63515 9.85571 9.71254 9.99172 9.79286 10.1259C10.09 10.6147 10.4892 11.1625 10.8883 11.5717C10.7314 11.546 10.5754 11.5143 10.4174 11.4983C9.32962 11.3883 8.30371 11.6675 7.36573 12.2043C6.27989 12.8258 5.50852 13.6355 4.85283 14.6918L4.63917 15.0542C4.04829 14.7383 3.44649 14.3778 2.86209 14.0435C3.02901 13.7253 3.36943 13.1864 3.58877 12.8921C5.06525 10.9108 6.86909 9.65171 9.3318 9.2925Z"
        fill="currentColor"
      />
    </svg>
  );
};
