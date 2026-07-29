"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { MegaMenu } from "./mega-menu";
import { NavItemData } from "./navbar-types";

export interface DesktopNavProps {
  navItems: NavItemData[];
  activeHoverLabel: string | null;
  activeSubMenuItem: number;
  activeSubSubMenuItem: number;
  currentLocale: "EN" | "AR";
  handleMouseEnter: (label: string) => void;
  handleMouseLeave: () => void;
  handleMouseEnterSubmenuItem: (index: number, isSubmenuSubitem?: boolean) => void;
}

export function DesktopNav({
  navItems,
  activeHoverLabel,
  activeSubMenuItem,
  activeSubSubMenuItem,
  currentLocale,
  handleMouseEnter,
  handleMouseLeave,
  handleMouseEnterSubmenuItem,
}: DesktopNavProps) {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium">
      {navItems.map((item) => {
        const hasMegaMenu = !!item.megaMenu?.items && item.megaMenu.items.length > 0;
        const isActive =
          pathname === item.link || (item.link !== "/" && pathname.startsWith(item.link));
        const isHovered = activeHoverLabel === item.label;

        return (
          <div
            key={item.label}
            className="py-6"
            onMouseEnter={() => handleMouseEnter(item.label)}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href={item.link || "#"}
              className={cn(
                "group inline-flex items-center gap-1.5 uppercase text-xs leading-[100%] tracking-normal",
                isActive
                  ? "font-bold text-foreground"
                  : "font-medium text-foreground/70 hover:text-foreground",
              )}
            >
              <span className="relative py-2">
                {item.label}
                <span
                  className={cn(
                    "absolute bottom-0 inset-s-1/2 -translate-x-1/2 h-0.5 bg-primary-500 rounded-full w-[120%]",
                    isActive ? "block" : "hidden group-hover:block",
                  )}
                />
              </span>

              {hasMegaMenu && (
                <ChevronDown
                  className={`h-3 w-3 text-primary-500 transition-transform duration-200 ${
                    isHovered ? "rotate-180" : ""
                  }`}
                />
              )}
            </Link>

            {/* Mega Menu Dropdown */}
            {hasMegaMenu && isHovered && item.megaMenu && (
              <MegaMenu
                megaMenu={item.megaMenu}
                label={item.label}
                currentLocale={currentLocale}
                activeSubMenuItem={activeSubMenuItem}
                activeSubSubMenuItem={activeSubSubMenuItem}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseEnterSubmenuItem={handleMouseEnterSubmenuItem}
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}
