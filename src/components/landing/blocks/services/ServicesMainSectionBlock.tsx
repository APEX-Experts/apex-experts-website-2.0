"use client";

import { BackgroundOverlay } from "@/components/ui/background-overlay";
import { Eyebrow, HighlightedTitle } from "@/components/ui/highlighted-title";
import { SectionReveal } from "@/components/ui/section-reveal";
import { TextureWaves } from "@/components/ui/texture-waves";
import { cn, getMediaAlt, getMediaUrl } from "@/lib/utils";
import type { ServicesMainSectionBlock as ServicesMainSectionBlockType } from "@/payload-types";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import ServiceIcon from "../../layout/service-icon";

/**
 * ServicesMainSectionBlock Component - Displays main services section with cards and subservices.
 */
export const ServicesMainSectionBlock: React.FC<ServicesMainSectionBlockType> = ({
  eyebrow,
  titleBeforeHighlight,
  highlightedTitle,
  titleAfterHighlight,
  subtitle,
  textureWavesImage,
  services,
  backgroundImage,
}) => {
  const cardBgUrls = services?.map((service) => getMediaUrl(service.cardBackgroundImage));
  const cardBgAlts = services?.map((service) =>
    getMediaAlt(service.cardBackgroundImage, "Card background"),
  );
  const bgUrl = getMediaUrl(backgroundImage);
  const bgAlt = getMediaAlt(backgroundImage, "Background");

  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const activeService = services?.[activeServiceIndex];
  const shouldReduceMotion = useReducedMotion();

  const handleChangeActiveService = (index: number) => {
    setActiveServiceIndex(index);
  };

  const evenServices = services?.filter((_, index) => index % 2 === 0);
  const oddServices = services?.filter((_, index) => index % 2 === 1);

  // Reusable mask style to punch a 440px diameter transparent hole (220px radius) in the center
  const centerHoleMaskStyle = {
    maskImage: "radial-gradient(circle at center, rgba(0, 0, 0, 60%) 219px, black 220px)",
    WebkitMaskImage: "radial-gradient(circle at center, rgba(0, 0, 0, 70%) 219px, black 220px)",
  };

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
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      className="relative overflow-hidden bg-background py-10 lg:py-18 min-h-screen"
      id="services-main"
    >
      <TextureWaves image={textureWavesImage} position="both" />
      <BackgroundOverlay src={bgUrl} alt={bgAlt} opacityClass="opacity-2" />

      <div className="relative z-10 mx-auto flex flex-col gap-8 lg:gap-18">
        {/* Heading Section */}
        <SectionReveal direction="up" className="w-full px-4 lg:px-14">
          <div className="flex flex-col items-start gap-4">
            <div className="flex flex-col gap-2 lg:gap-1">
              <Eyebrow text={eyebrow} />
              <HighlightedTitle
                titleBeforeHighlight={titleBeforeHighlight}
                highlightedTitle={highlightedTitle}
                titleAfterHighlight={titleAfterHighlight}
                className="lg:max-w-6xl"
              />
            </div>
            {subtitle && (
              <p className="font-poppins text-sm leading-[130%] text-gray-500 lg:text-base lg:leading-7.25 max-w-4xl">
                {subtitle}
              </p>
            )}
          </div>
        </SectionReveal>
        {/* Services */}
        <div className="w-full lg:px-14">
          <SectionReveal direction="up" className="flex flex-col gap-8 lg:gap-10">
            {/* Mobile only tab selector */}
            <div className="lg:hidden flex flex-row justify-between px-4">
              {services?.map(({ title, id }, index) => (
                <button
                  key={id ?? index}
                  onClick={() => handleChangeActiveService(index)}
                  className={cn(
                    "flex flex-col gap-2 items-center pb-2 border-b cursor-pointer",
                    index === activeServiceIndex ? "border-primary-500" : "border-transparent",
                  )}
                >
                  <div
                    className={cn(
                      "w-6 h-6 flex items-center justify-center relative",
                      index === activeServiceIndex ? "text-primary-500" : "text-foreground",
                    )}
                  >
                    <ServiceIcon index={index} width={24} height={24} />
                  </div>
                  <span
                    className={cn(
                      "font-montserrat font-medium text-xs leading-[130%] text-center",
                      index === activeServiceIndex ? "text-primary-500" : "text-foreground/70",
                    )}
                  >
                    {title}
                  </span>
                </button>
              ))}
            </div>
            {/* Mobile Service Card */}
            <div className="lg:hidden w-full px-4 py-6 relative overflow-hidden">
              <div className="absolute inset-0 w-full h-full pointer-events-none">
                <Image
                  src={cardBgUrls?.[activeServiceIndex] ?? ""}
                  alt={cardBgAlts?.[activeServiceIndex] ?? ""}
                  fill
                  className="object-cover object-center scale-200"
                />
              </div>
              <div className="absolute inset-0 w-full h-full pointer-events-none bg-black/30"></div>
              <div className="relative rounded-[1.5rem] border border-outline/30 bg-black/30 backdrop-blur-xl px-4 pb-4 pt-6 flex flex-col gap-4 items-center">
                <div className="w-10 h-10 flex items-center justify-center text-white">
                  <ServiceIcon index={activeServiceIndex} width={40} height={40} />
                </div>
                <span className="font-montserrat font-semibold text-xl text-center leading-[130%] text-white uppercase max-w-64">
                  {activeService?.title}
                </span>
                <p className="font-poppins text-sm text-center text-gray-300 leading-[160%]">
                  {activeService?.description}
                </p>
                <Link
                  href={activeService?.ctaHref ?? "#"}
                  className="w-full hover:underline py-2 flex items-center justify-center gap-2"
                >
                  <span className="font-montserrat font-medium text-sm sm:text-base leading-[130%] text-white">
                    {activeService?.ctaText}
                  </span>
                  <div className="w-7.5 h-7.5 rounded-full border border-white flex items-center justify-center">
                    <ArrowRight className="text-white w-5.5 h-5.5 -rotate-30" />
                  </div>
                </Link>
              </div>
            </div>
            {/* Mobile Subservice List */}
            <motion.div
              key={`mobile-subservices-${activeServiceIndex}`}
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="lg:hidden w-full px-4 flex flex-col gap-10"
            >
              {activeService?.subservices?.map(({ title, href, id, subtitle }, index) => (
                <motion.div key={id ?? index} variants={itemVariants}>
                  <Link
                    href={href ?? "#"}
                    className="flex flex-row gap-2 justify-between pb-6 border-b border-outline/30"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="font-poppins font-medium text-xl leading-8 uppercase text-black">
                        {title}
                      </span>
                      <p className="font-poppins text-sm leading-5 text-foreground/70">{subtitle}</p>
                    </div>
                    <div className="w-7.5 h-7.5 flex items-center justify-center rounded-full border border-primary-500 mt-1">
                      <ArrowRight className="w-5.5 h-7.5 text-primary-500 -rotate-30" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Desktop Card */}
            <div className="max-lg:hidden">
              <div className="relative rounded-[2rem] border border-outline/30 overflow-hidden flex flex-col">
                {/* Top-side card */}
                <div className="relative p-10 min-h-150 flex bg-noise z-0">
                  {/* Image */}
                  <div className="absolute inset-0 w-full h-full pointer-events-none">
                    <Image
                      src={cardBgUrls?.[activeServiceIndex] ?? ""}
                      alt={cardBgAlts?.[activeServiceIndex] ?? ""}
                      fill
                      className="object-cover object-bottom scale-100"
                    />
                  </div>

                  {/* Outer Dark Overlay with Hole - Keeps the edges outside the card dark while leaving the center bright */}
                  <div
                    className="absolute inset-0 w-full h-full pointer-events-none bg-black/50"
                    style={centerHoleMaskStyle}
                  ></div>

                  {/* Card Inner Wrapper */}
                  <div className="relative flex-1 rounded-[1.5rem] border border-outline/30 p-10 flex z-10 justify-center">
                    {/* Inner Glass Layer with Hole - Applies the blur and glass color everywhere EXCEPT the center hole */}
                    <div
                      className="absolute inset-0 z-[-1] rounded-[1.5rem] bg-black/10 backdrop-blur-lg"
                      style={centerHoleMaskStyle}
                    />

                    <div className="px-10 flex flex-row justify-between gap-8 w-full items-stretch">
                      {/* Left Side with even indexed */}
                      <div className="py-6 flex flex-col h-full min-h-110 justify-between flex-1">
                        {evenServices?.map((service, index) => (
                          <DesktopServiceCard
                            activeServiceIndex={activeServiceIndex}
                            handleChangeServiceIndex={handleChangeActiveService}
                            index={services?.findIndex((s) => s.id === service.id) ?? 0}
                            service={service}
                            key={service.id ?? index}
                          />
                        ))}
                      </div>

                      {/* Center Circle (Fixed at 440px width so the 220px CSS mask perfectly traces it) */}
                      <div className="relative flex flex-col items-center justify-center gap-4 rounded-full backdrop-blur-sm w-110 shrink-0 aspect-square my-auto service-circle">
                        <CenterCircleEffects activeServiceIndex={activeServiceIndex} />
                        <motion.div
                          key={`center-circle-${activeServiceIndex}`}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="flex flex-col items-center justify-center gap-4"
                        >
                          <div className="w-16.5 h-16.5 flex items-center justify-center relative text-white">
                            <ServiceIcon index={activeServiceIndex} width={66} height={66} />
                          </div>
                          <span className="font-montserrat font-semibold text-2xl uppercase leading-6 text-center text-white max-w-75 z-10 drop-shadow-md">
                            {activeService?.title}
                          </span>
                          <p className="font-poppins max-w-87.5 text-sm leading-[160%] text-center text-gray-200 z-10 drop-shadow-md">
                            {activeService?.description}
                          </p>
                          <Link
                            href={activeService?.ctaHref ?? "#"}
                            className="w-full max-w-sm rounded-full p-2 flex items-center justify-center gap-2 hover:underline z-10"
                          >
                            <span className="font-montserrat font-medium leading-[160%] text-white drop-shadow-md">
                              {activeService?.ctaText}
                            </span>
                            <div className="w-7.5 h-7.5 flex items-center justify-center relative border border-white rounded-full bg-black/20 backdrop-blur-sm">
                              <ArrowRight className="w-5.5 h-5.5 text-white -rotate-30" />
                            </div>
                          </Link>
                        </motion.div>
                      </div>

                      {/* Right Side with odd indexed */}
                      <div className="py-6 flex flex-col h-full min-h-110 justify-between flex-1">
                        {oddServices?.map((service, index) => (
                          <DesktopServiceCard
                            activeServiceIndex={activeServiceIndex}
                            handleChangeServiceIndex={handleChangeActiveService}
                            index={services?.findIndex((s) => s.id === service.id) ?? 0}
                            service={service}
                            key={service.id ?? index}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subservices list */}
                <motion.div
                  key={`desktop-subservices-${activeServiceIndex}`}
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                  className="grid grid-cols-2 gap-10 py-10 px-8 flex-1"
                >
                  {activeService?.subservices?.map(({ title, href, id, subtitle }, index) => (
                    <motion.div key={id ?? index} variants={itemVariants}>
                      <Link
                        href={href ?? "#"}
                        className={cn(
                          "hover:p-4 flex flex-row gap-4 justify-between items-start bg-transparent hover:bg-linear-to-l hover:from-[#b9001a] hover:to-[#53000c] group hover:cursor-pointer transition-all duration-300 rounded-[0.5rem]",
                        )}
                      >
                        <div className="flex flex-col gap-1">
                          <span className="font-poppins font-medium text-xl leading-8 uppercase group-hover:text-white transition-all duration-300">
                            {title}
                          </span>
                          <p className="font-poppins text-sm leading-5 text-foreground/70 group-hover:text-white transition-all duration-300">
                            {subtitle}
                          </p>
                        </div>
                        <div className="w-7.5 h-7.5 border border-primary-500 group-hover:border-white rounded-full flex items-center justify-center transition-all duration-300">
                          <ArrowRight className="w-5.5 h-5.5 text-primary-500 group-hover:text-white transition-all duration-300 -rotate-30 group-hover:rotate-0" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
};

export const DesktopServiceCard = ({
  service,
  handleChangeServiceIndex,
  index,
  activeServiceIndex,
}: {
  service: NonNullable<ServicesMainSectionBlockType["services"]>[number];
  handleChangeServiceIndex: (index: number) => void;
  index: number;
  activeServiceIndex: number;
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      onClick={() => handleChangeServiceIndex(index)}
      className={cn(
        "relative flex flex-col items-center justify-center text-center gap-2 pb-7.5 border-b text-white cursor-pointer",
        index !== activeServiceIndex
          ? "border-transparent opacity-60 hover:opacity-100 transition-all duration-300"
          : "border-white *:font-semibold",
      )}
    >
      <div className="w-8 h-8 flex items-center justify-center relative">
        <ServiceIcon index={index} width={32} height={32} />
      </div>
      <span className="font-poppins text-sm leading-[130%] uppercase">{service.eyebrow}</span>
      <span className="font-montserrat text-2xl leading-[130%] uppercase max-w-68">
        {service.title}
      </span>
    </motion.button>
  );
};

export const CenterCircleEffects = ({ activeServiceIndex }: { activeServiceIndex: number }) => {
  return (
    <>
      <div
        className={cn(
          "absolute inset-0 rounded-full border-[6px] border-white transition-transform duration-500 pointer-events-none",
          "[clip-path:polygon(50%_50%,50%_0,100%_0,100%_50%)]",
          activeServiceIndex === 0 && "-rotate-90",
          activeServiceIndex === 1 && "rotate-0",
          activeServiceIndex === 2 && "rotate-180",
          activeServiceIndex === 3 && "rotate-90",
        )}
      />
      {/* 4 Circles at 4 corners */}
      <div
        className={cn(
          "pointer-events-none rounded-full w-8 h-8 border-2 border-primary-100 absolute -top-2 inset-s-1/2 -translate-x-1/2",
          activeServiceIndex === 0 || activeServiceIndex === 1 ? "bg-white border-6" : "",
        )}
      ></div>
      <div
        className={cn(
          "pointer-events-none rounded-full w-8 h-8 border-2 border-primary-100 absolute top-1/2 -translate-y-1/2 inset-e-full translate-x-1/2",
          activeServiceIndex === 0 || activeServiceIndex === 2 ? "bg-white border-6" : "",
        )}
      ></div>
      <div
        className={cn(
          "pointer-events-none rounded-full w-8 h-8 border-2 border-primary-100 absolute -bottom-2 inset-s-1/2 -translate-x-1/2 translate-y-1/6",
          activeServiceIndex === 2 || activeServiceIndex === 3 ? "bg-white border-6" : "",
        )}
      ></div>
      <div
        className={cn(
          "pointer-events-none rounded-full w-8 h-8 border-2 border-primary-100 absolute bottom-1/2 translate-y-1/2 inset-s-full -translate-x-1/2",
          activeServiceIndex === 1 || activeServiceIndex === 3 ? "bg-white border-6" : "",
        )}
      ></div>
    </>
  );
};
