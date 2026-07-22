"use client";

import { LucideIcon } from "@/components/ui/lucide-icon";
import { cn } from "@/lib/utils";
import { ArrowRight, ArrowRightCircle, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MegaMenuData } from "./navbar-types";
import { Logo } from "./logo";

export interface MegaMenuProps {
  megaMenu: MegaMenuData;
  label: string;
  currentLocale: "EN" | "AR";
  activeSubMenuItem: number;
  activeSubSubMenuItem: number;
  onMouseEnter: (label: string) => void;
  onMouseLeave: () => void;
  onMouseEnterSubmenuItem: (index: number, isSubmenuSubitem?: boolean) => void;
}

export function MegaMenu({
  megaMenu,
  label,
  currentLocale,
  activeSubMenuItem,
  activeSubSubMenuItem,
  onMouseEnter,
  onMouseLeave,
  onMouseEnterSubmenuItem,
}: MegaMenuProps) {
  const activeSubItem = megaMenu.items?.[activeSubMenuItem];
  const activeSubSubItem = activeSubItem?.subitems?.[activeSubSubMenuItem];
  const hasCenterMenu = !!activeSubItem?.subitems?.length;

  return (
    <div
      className="bg-white absolute top-full start-1/2 -translate-x-1/2 w-screen max-w-7xl rounded-[1.5rem] z-50 animate-in fade-in slide-in-from-top-2 duration-200 h-130 border"
      onMouseEnter={() => onMouseEnter(label)}
      onMouseLeave={onMouseLeave}
    >
      <div className="w-full flex flex-col gap-6 p-6 h-full">
        {/* Title */}
        <div className="flex flex-row items-center">
          <ChevronRight
            className={cn("h-4 w-4 text-primary-500", currentLocale === "AR" ? "rotate-180" : "")}
          />
          <div className="font-semibold text-lg md:text-xl leading-[150%] tracking-[0.5px] uppercase text-foreground">
            {megaMenu.title}
          </div>
        </div>

        {/* Menus */}
        <div className="w-full grid grid-cols-1 md:grid-cols-[300px_minmax(0,1fr)_420px] flex-1">
          {/* Left Menu */}
          <div className="flex flex-col gap-1.5 bg-nile-100 rounded-[1rem] p-4">
            {megaMenu.items?.map((subitem, index) => (
              <Link
                href={subitem.href ?? "#"}
                className={cn(
                  "w-full rounded-[1rem] flex flex-row items-center justify-between px-2 py-4",
                  index === activeSubMenuItem ? "bg-nile-200 border border-nile-300" : "",
                )}
                key={index}
                onMouseEnter={() => onMouseEnterSubmenuItem(index)}
              >
                <div className="flex flex-row items-center gap-2">
                  <div
                    className={cn(
                      "bg-white rounded-lg border border-nile-300 flex items-center justify-center",
                      subitem?.iconSvg ? "w-16 h-10" : "w-8 h-8",
                    )}
                  >
                    {subitem?.iconSvg ? (
                      <Logo
                        logoSvg={subitem.iconSvg}
                        width={48}
                        height={48}
                        className="w-12 h-12 text-foreground"
                      />
                    ) : (
                      <LucideIcon
                        name={subitem?.subitems?.[0]?.icon || "Database"}
                        className="w-5 h-5 text-foreground"
                      />
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-sm leading-[150%] tracking-normal text-gray-900",
                      index === activeSubMenuItem ? "font-medium" : "font-normal",
                    )}
                  >
                    {subitem.title}
                  </span>
                </div>
                <ChevronRight
                  className={cn(
                    "w-4 h-4 text-foreground",
                    currentLocale === "AR" ? "rotate-180" : "",
                  )}
                />
              </Link>
            ))}
          </div>

          {/* Center Menu */}
          {hasCenterMenu && (
            <div className="flex flex-col gap-4 p-4 w-full">
              <span className="font-light text-xs leading-[150%] tracking-[0.5px] uppercase text-gray-400">
                {activeSubItem?.subtitle}
              </span>
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                {activeSubItem?.subitems?.map((subitem, index) => (
                  <Link
                    href={subitem.href}
                    key={index}
                    className={cn(
                      "text-sm leading-[150%] tracking-[4%] uppercase text-foreground border-b",
                      index === activeSubSubMenuItem
                        ? "font-semibold border-nile-300"
                        : "font-light border-transparent",
                    )}
                    onMouseEnter={() => onMouseEnterSubmenuItem(index, true)}
                  >
                    <span>{subitem.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Right Menu */}
          {hasCenterMenu && (
            <div className="flex items-center w-full p-4">
              <div className="w-full h-full rounded-[1.5rem] bg-noise relative">
                <div className="absolute inset-0 w-full h-full rounded-[1.5rem] overflow-hidden">
                  <Image
                    src="/placeholder_image.jpg"
                    alt="Our Office"
                    width={396}
                    height={322}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 placeholder-gradient w-[60%] rounded-l-[1.5rem] px-4 pb-4 pt-5 flex flex-col items-start gap-3">
                  <div className="w-12 h-12 flex items-center justify-center">
                    <LucideIcon
                      name={activeSubSubItem?.icon || "Database"}
                      className="w-10.5 h-10.5 text-white"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="font-bold text-2xl leading-[130%] tracking-[4%] uppercase text-white">
                      {activeSubSubItem?.title}
                    </span>
                    <p className="text-xs leading-4.25 text-white">
                      {activeSubSubItem?.description}
                    </p>
                  </div>
                  {activeSubSubItem?.href && (
                    <Link
                      href={activeSubSubItem.href}
                      className="w-full text-white flex flex-row gap-4 items-center"
                    >
                      <span className="font-bold leading-6 text-white">Learn More</span>
                      <ArrowRight
                        className={cn("w-4 h-4", currentLocale === "AR" ? "rotate-180" : "")}
                      />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
          {/* Right Menu in projects */}
          {!hasCenterMenu && (
            <div className="col-span-2 relative ms-8 bg-noise rounded-[1.5rem] overflow-hidden border border-outline/30 p-6">
              {/* Background image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/project_placeholder.png"
                  alt="placeholder"
                  width={761}
                  height={311}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Black overlay */}
              <div className="absolute inset-0 z-10 bg-black/30 pointer-events-none" />

              {/* Content */}
              <div className="relative z-20 rounded-[1.5rem] border border-outline p-6 flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row justify-between items-center">
                    <span className="text-white font-semibold text-6xl leading-[150%] tracking-normal uppercase">
                      {activeSubItem?.title}
                    </span>

                    <Link
                      className="flex flex-row gap-2 p-2 items-center"
                      href={activeSubItem?.href ?? "#"}
                    >
                      <span className="font-medium text-white text-lg">
                        Explore {activeSubItem?.title}
                      </span>

                      <ArrowRightCircle
                        className={cn(
                          "w-8 h-8 text-white",
                          currentLocale === "AR" ? "rotate-135" : "-rotate-45",
                        )}
                      />
                    </Link>
                  </div>
                  <p className="text-white leading-6">{activeSubItem?.subtitle}</p>
                </div>
                <div className="flex flex-row gap-2.5 items-center flex-wrap">
                  {activeSubItem?.sublist?.map((item, index) => (
                    <Link
                      key={index}
                      href={activeSubItem?.href ?? "#"}
                      className="text-white flex flex-row gap-2 items-center rounded-full border border-outline px-4 py-2.5 hover:border-white"
                    >
                      <span className="text-sm leading-[150%]">{item.title}</span>
                      <ChevronRight
                        className={cn("w-4 h-4", currentLocale === "AR" ? "rotate-180" : "")}
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
