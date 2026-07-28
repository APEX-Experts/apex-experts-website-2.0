"use client";

import { cn, getMediaAlt, getMediaUrl, zeroPadNumber } from "@/lib/utils";
import type { FAQBlock as FAQBlockType } from "@/payload-types";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Karantina } from "next/font/google";
import { SectionReveal } from "@/components/ui/section-reveal";
import { motion, AnimatePresence } from "motion/react";

const karantina = Karantina({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-karantina",
});

export const HomeFAQ: React.FC<FAQBlockType> = ({
  eyebrow,
  titleBeforeHighlight,
  highlightedTitle,
  titleAfterHighlight,
  subtitle,
  ctaImage,
  ctaEyebrow,
  ctaTitle,
  ctaSubtitle,
  questions,
  backgroundImage,
  ctaButtonText,
  textureWavesImage,
}) => {
  const ctaImageUrl = getMediaUrl(ctaImage);
  const ctaImageAlt = getMediaAlt(ctaImage, "CTA Image");
  const backgroundImageUrl = getMediaUrl(backgroundImage);
  const backgroundImageAlt = getMediaAlt(backgroundImage, "Background Image");
  const textureWavesImageUrl = getMediaUrl(textureWavesImage);
  const textureWavesImageAlt = getMediaAlt(textureWavesImage, "Texture Waves Image");

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative overflow-hidden min-h-screen py-10 lg:py-18" id="faq">
      <div className="w-full relative flex flex-col gap-8 lg:gap-18">
        {/* Header Content */}
        <SectionReveal direction="up" className="w-full">
          <div className="flex flex-col items-start gap-4 px-4 lg:px-14">
            <div className="flex flex-col gap-2 lg:gap-1">
              {eyebrow && (
                <span className="font-poppins text-sm leading-[130%] uppercase text-primary-500 lg:text-base">
                  {eyebrow}
                </span>
              )}
              <h2 className="font-semibold text-xl leading-[130%] tracking-[-7%] uppercase text-foreground md:text-3xl lg:text-5xl lg:max-w-195">
                <span>{titleBeforeHighlight}</span>
                {highlightedTitle && <span className="text-primary-500"> {highlightedTitle}</span>}
                {titleAfterHighlight && <span> {titleAfterHighlight}</span>}
              </h2>
            </div>
            {subtitle && (
              <p className="font-poppins text-sm leading-[130%] text-gray-500 lg:text-base lg:leading-7.25 lg:max-w-230">
                {subtitle}
              </p>
            )}
          </div>
        </SectionReveal>

        {/* Main Section Layout: Questions & CTA */}
        <SectionReveal direction="up" delay={0.2} className="lg:px-14">
          <div className="bg-white relative z-20 px-4 py-10 lg:px-10 lg:py-14 flex flex-col lg:flex-row gap-8 items-center lg:items-start lg:rounded-[1.5rem]">
            {/* Cta */}
            <div className="flex flex-col gap-8 w-full lg:max-w-120">
              {/* Cta Image */}
              <div className="relative rounded-[1rem] bg-noise w-full h-65.25 overflow-hidden">
                <Image src={ctaImageUrl ?? ""} alt={ctaImageAlt} fill className="object-cover" />
              </div>
              {/* Text */}
              <div className="flex flex-col">
                {ctaEyebrow && (
                  <span className="font-poppins text-sm leading-[130%] uppercase text-primary-500 lg:text-xs">
                    {ctaEyebrow}
                  </span>
                )}
                {ctaTitle && (
                  <h4 className="font-poppins text-2xl leading-[130%] tracking-[-7%] uppercase text-foreground mt-1 font-semibold">
                    {ctaTitle}
                  </h4>
                )}
                {ctaSubtitle && (
                  <p className="font-poppins text-sm lg:text-xs leading-[130%] text-gray-500 mt-3.5">
                    {ctaSubtitle}
                  </p>
                )}
                {ctaButtonText && (
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full lg:w-fit">
                    <Link
                      href={"/contact"}
                      className="mt-4 bg-primary-500 text-white py-2 px-4 rounded-full flex flex-row items-center gap-4 w-full lg:w-fit max-lg:justify-center"
                    >
                      <span className="text-base tracking-normal font-poppins">{ctaButtonText}</span>
                      <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center">
                        <ArrowUpRight className="w-5 h-5 text-white" />
                      </div>
                    </Link>
                  </motion.div>
                )}
              </div>
            </div>
            {/* Questions */}
            <div className="flex flex-col gap-4 w-full">
              {questions?.map(({ answer, question, id }, index) => (
                <div
                  key={id ?? index}
                  className={cn(
                    "w-full border-b border-outline/30 last:border-none py-4 cursor-pointer",
                  )}
                  onClick={() => toggleQuestion(index)}
                >
                  <div
                    className={cn(
                      "flex flex-row gap-3 lg:gap-5",
                      index === openIndex ? "items-start lg:items-center" : "items-center",
                    )}
                  >
                    <span
                      className={cn(
                        `${karantina.className} font-bold text-[2.5rem] leading-[130%] tracking-[7%]`,
                        index === openIndex
                          ? "text-primary-500"
                          : "text-transparent [-webkit-text-stroke:1px_var(--color-gray-300)]",
                      )}
                    >
                      {zeroPadNumber(index + 1, 2)}
                    </span>
                    <div className="flex flex-row justify-between gap-2 w-full items-start">
                      <span
                        className={cn(
                          "font-display leading-[130%] text-start transition-colors duration-200",
                          index === openIndex
                            ? "text-primary-500 text-xl lg:text-[1.5rem] font-bold"
                            : "text-foreground text-lg font-semibold",
                        )}
                      >
                        {question}
                      </span>
                      <div className="w-5 h-5 flex items-center justify-center mt-1">
                        {index === openIndex ? (
                          <Minus className={cn("w-5 h-5 text-primary-500")} />
                        ) : (
                          <Plus className={cn("w-5 h-5")} />
                        )}
                      </div>
                    </div>
                  </div>
                  <AnimatePresence initial={false}>
                    {index === openIndex && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="font-poppins text-sm lg:text-base leading-[130%] lg:leading-6.25 text-gray-500 mt-6 text-start">
                          {answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>
      {/* Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none opacity-5 z-0">
        <Image
          src={backgroundImageUrl || ""}
          alt={backgroundImageAlt}
          fill
          className="object-cover"
        />
      </div>

      {/* Texture Waves */}
      <div className="absolute max-lg:hidden top-0 inset-e-0 w-145.5 h-105.75 pointer-events-none z-0">
        <Image
          src={textureWavesImageUrl || ""}
          alt={textureWavesImageAlt}
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
};

