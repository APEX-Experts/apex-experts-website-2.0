import { LucideIcon } from "@/components/ui/lucide-icon";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn, getMediaAlt, getMediaUrl, zeroPadNumber } from "@/lib/utils";
import { CapabilitiesBlock } from "@/payload-types";
import { ArrowRight, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

type Props = {
  capabilities: CapabilitiesBlock["capabilities"];
};

const Capabilities = ({ capabilities }: Props) => {
  const capabilitiesBackgroundUrls = capabilities?.map((cap) => getMediaUrl(cap.backgroundImage));
  const capabilitiesBackgroundAlts = capabilities?.map((cap) =>
    getMediaAlt(cap.backgroundImage, cap.title),
  );
  const [activeCapIndex, setActiveCapIndex] = useState(0);

  const handleChangeActiveCap = (index: number) => {
    setActiveCapIndex(index);
  };

  const activeCap = capabilities?.[activeCapIndex];

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      {/* Tab Selector */}
      <div className="grid grid-cols-4 items-start gap-4 lg:gap-1.5 w-full px-4 lg:px-14">
        {capabilities?.map((cap, i) => (
          <motion.div
            key={cap.id ?? i}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "flex flex-col lg:flex-row items-center max-lg:justify-center gap-2 border-b cursor-pointer flex-1 pb-2 lg:pb-6 transition-colors duration-200",
              i === activeCapIndex
                ? "text-primary-500 border-primary-500 font-semibold"
                : "text-foreground/70 hover:text-foreground border-transparent",
            )}
            onClick={() => handleChangeActiveCap(i)}
          >
            <LucideIcon name={cap.icon} className="w-6 h-6 lg:w-10 lg:h-10" />
            <span className="font-display font-medium text-xs leading-[130%] text-center md:text-base lg:text-lg lg:text-start">
              {cap.title}
            </span>
          </motion.div>
        ))}
      </div>
      {/* Capability Mobile */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`mobile-${activeCapIndex}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden flex flex-col gap-8 w-full"
        >
          {/* Text */}
          <div className="flex flex-col gap-4 text-center items-center px-4">
            <div className="flex flex-col gap-3 items-center text-center">
              <LucideIcon
                name={activeCap?.icon ?? "Database"}
                className="w-10 h-10 text-primary-500"
              />
              <h2 className="font-display font-medium text-lg leading-[130%] tracking-normal text-primary-500 max-w-41.25">
                {activeCap?.title}
              </h2>
            </div>
            <p className="font-poppins text-sm leading-[130%] text-center text-gray-500">
              {activeCap?.description}
            </p>
          </div>
          {/* Grid */}
          <div className="relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
              <Image
                src={capabilitiesBackgroundUrls?.[activeCapIndex] ?? ""}
                alt={capabilitiesBackgroundAlts?.[activeCapIndex] ?? ""}
                fill
                className="object-cover object-center scale-150"
              />
            </div>
            {/* Overlay */}
            <div className="absolute inset-0 capability-gradient w-full h-full"></div>
            <div className="relative grid grid-cols-2 gap-3.75 px-2 py-4 min-h-50">
              <TooltipProvider>
                {activeCap?.services?.map(({ icon, title, href, id }, index) => (
                  <Tooltip key={id ?? index}>
                    <TooltipTrigger asChild>
                      <Link
                        className={cn(
                          "min-w-15.5 rounded-full border flex flex-row items-center justify-between pe-1.5 ps-2 py-2 border-white/20 text-white",
                          "hover:bg-primary-500 hover:border-transparent transition-all duration-200",
                        )}
                        href={href ?? "#"}
                      >
                        <div className="flex flex-row gap-0.75 items-center min-w-0">
                          <LucideIcon name={icon ?? "Database"} className="w-4 h-4 shrink-0" />

                          <span className="font-display font-medium text-xs leading-[130%] truncate min-w-0">
                            {title}
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 shrink-0" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent className="bg-primary-500">
                      <p>{title}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Capability Desktop */}
      <div className="w-full px-4 lg:px-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={`desktop-${activeCapIndex}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="max-lg:hidden w-full py-8 px-12 rounded-[2rem] min-h-123 relative overflow-hidden"
          >
            {/* Background image */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              <Image
                src={capabilitiesBackgroundUrls?.[activeCapIndex] ?? ""}
                alt={capabilitiesBackgroundAlts?.[activeCapIndex] ?? ""}
                fill
                className="object-cover object-center scale-150"
              />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 z-0 capability-gradient" />
            {/* Content */}
            <div className="flex flex-col gap-8 max-w-6xl items-start relative z-10">
              {/* Text */}
              <div className="flex flex-col gap-5">
                <h3 className="font-display font-semibold text-5xl leading-[130%] tracking-normal text-white max-w-md">
                  {activeCap?.title.split("&").map((part, index, arr) => (
                    <React.Fragment key={part}>
                      {index > 0 && <br />}
                      {part.trim()}
                      {index === arr.length - 1 ? "" : " &"}
                    </React.Fragment>
                  ))}
                </h3>
                <p className="text-lg leading-[130%] text-white/80 max-w-3xl">
                  {activeCap?.description}
                </p>
              </div>
              {/* Services */}
              <div className="flex flex-row gap-4 flex-wrap max-w-240">
                {activeCap?.services?.map(({ icon, title, href, id }, index) => (
                  <motion.div
                    key={id ?? index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <Link
                      className={cn(
                        "rounded-full border flex flex-row items-center justify-between px-4 py-3 border-white/20 text-white",
                        "hover:bg-primary-500 hover:border-transparent transition-all duration-200",
                      )}
                      href={href ?? "#"}
                    >
                      <div className="flex flex-row gap-2 items-center min-w-0">
                        <LucideIcon name={icon ?? "Database"} className="w-6 h-6 shrink-0" />

                        <span className="font-display font-medium text-sm leading-[130%] truncate min-w-0">
                          {title}
                        </span>
                      </div>
                      <ChevronRight className="w-6 h-4 shrink-0" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
            {/* Count */}
            <div className="z-10 absolute inset-e-6 top-8.5 w-131.25 rounded-[1.5rem] border border-white/40 bg-black/60 py-5.5 px-4 flex flex-row gap-4">
              {activeCap?.services?.length && (
                <span className="font-extralight italic text-6xl text-white font-display">
                  {zeroPadNumber(activeCap?.services?.length)}
                </span>
              )}
              <div className="flex flex-col gap-2 font-display">
                <h4 className="font-semibold text-xl leading-[130%] uppercase text-white">
                  {activeCap?.countTitle}
                </h4>
                <p className="text-gray-300 leading-[130%]">{activeCap?.countDescription}</p>
              </div>
            </div>

            <div className="absolute bottom-0 right-0 z-20 flex bg-white pt-5 pl-5 rounded-tl-[2rem]">
              {/* Top Inverted Corner */}
              <div className="absolute bottom-full right-0 w-8 h-8 bg-transparent rounded-br-[2rem] shadow-[10px_10px_0_10px_white] pointer-events-none" />

              {/* Left Inverted Corner */}
              <div className="absolute bottom-0 right-full w-8 h-8 bg-transparent rounded-br-[2rem] shadow-[10px_10px_0_10px_white] pointer-events-none" />

              {/* Action Button */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href={activeCap?.href ?? "#"}
                  className="flex flex-row items-center gap-2 bg-primary-500 text-white rounded-full px-4 py-3 hover:bg-primary-700 transition-colors duration-300"
                >
                  <span className="font-display font-medium text-lg leading-none">
                    View Service
                  </span>
                  <div className="bg-white text-primary-500 rounded-full p-1.5 flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 shrink-0 -rotate-30" />
                  </div>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Capabilities;
