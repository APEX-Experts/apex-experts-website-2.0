"use client";

import Link from "next/link";
import * as React from "react";
import { DesktopNav } from "./desktop-nav";
import { LocaleSelector } from "./locale-selector";
import { LogoProps, LogoSvg } from "./logo";
import { MobileNav } from "./mobile-nav";
import { NavItemData } from "./navbar-types";

export type { MegaItem, MegaMenuData, MegaSubItem, NavItemData } from "./navbar-types";

export interface NavbarProps extends Omit<LogoProps, "brandName"> {
  brandName?: string | null;
  navItems: NavItemData[];
}

export function Navbar({ navItems = [] }: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeHoverLabel, setActiveHoverLabel] = React.useState<string | null>(null);
  const [activeSubMenuItem, setActiveSubMenuItem] = React.useState<number>(0);
  const [currentLocale, setCurrentLocale] = React.useState<"EN" | "AR">("EN");
  const leaveTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const leaveSubmenuItemTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const [activeSubSubMenuItem, setActiveSubSubMenuItem] = React.useState<number>(0);

  const handleMouseEnter = (label: string) => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    setActiveHoverLabel(label);
  };

  const handleMouseEnterSubmenuItem = (index: number, isSubmenuSubitem?: boolean) => {
    if (leaveSubmenuItemTimeoutRef.current) {
      clearTimeout(leaveSubmenuItemTimeoutRef.current);
      leaveSubmenuItemTimeoutRef.current = null;
    }
    if (isSubmenuSubitem) {
      setActiveSubSubMenuItem(index);
    } else {
      setActiveSubMenuItem(index);
      setActiveSubSubMenuItem(0);
    }
  };

  const handleMouseLeave = () => {
    leaveTimeoutRef.current = setTimeout(() => {
      setActiveHoverLabel(null);
      setActiveSubMenuItem(0);
      setActiveSubSubMenuItem(0);
    }, 150);
  };

  return (
    <header className="sticky top-3.5 inset-x-0 mx-auto z-50 w-[calc(100vw-32px)] lg:w-[calc(100vw-112px)] h-16 rounded-[1rem] bg-background backdrop-blur-md shadow-sm flex items-center -mb-16">
      <div className="w-full mx-auto flex items-center justify-between px-4 lg:px-6 py-2.5 lg:py-3.5 relative">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center">
          <LogoSvg className="text-foreground" width={200} />
        </Link>

        {/* Desktop Navigation & Locale */}
        <div className="hidden lg:flex items-center space-x-8">
          <DesktopNav
            navItems={navItems}
            activeHoverLabel={activeHoverLabel}
            activeSubMenuItem={activeSubMenuItem}
            activeSubSubMenuItem={activeSubSubMenuItem}
            currentLocale={currentLocale}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            handleMouseEnterSubmenuItem={handleMouseEnterSubmenuItem}
          />
          <LocaleSelector currentLocale={currentLocale} onLocaleChange={setCurrentLocale} />
        </div>

        {/* Mobile Navigation */}
        <MobileNav
          navItems={navItems}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          currentLocale={currentLocale}
          onLocaleChange={setCurrentLocale}
        />
      </div>
    </header>
  );
}
