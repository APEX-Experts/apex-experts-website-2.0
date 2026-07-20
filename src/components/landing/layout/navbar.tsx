"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LucideIcon } from "@/components/ui/lucide-icon";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronDown, Globe, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { Logo, LogoProps } from "./logo";

export interface MegaSubItem {
  title: string;
  icon: string;
  description: string;
  href: string;
}

export interface MegaItem {
  title: string;
  subtitle: string;
  subitems?: MegaSubItem[] | null;
}

export interface MegaMenuData {
  title?: string | null;
  items?: MegaItem[] | null;
}

export interface NavItemData {
  label: string;
  link: string;
  megaMenu?: MegaMenuData | null;
}

export interface NavbarProps extends Omit<LogoProps, "brandName"> {
  brandName?: string | null;
  navItems: NavItemData[];
}

export function Navbar({
  brandName = "APEX EXPERTS",
  logoImage,
  logoSvg,
  logoOnly,
  navItems = [],
}: NavbarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeHoverLabel, setActiveHoverLabel] = React.useState<string | null>(null);
  const [currentLocale, setCurrentLocale] = React.useState<"EN" | "AR">("EN");
  const leaveTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (label: string) => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    setActiveHoverLabel(label);
  };

  const handleMouseLeave = () => {
    leaveTimeoutRef.current = setTimeout(() => {
      setActiveHoverLabel(null);
    }, 150);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8 relative">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center">
          <Logo
            brandName={brandName || "APEX EXPERTS"}
            logoImage={logoImage}
            logoSvg={logoSvg}
            logoOnly={logoOnly}
            className="text-primary-500"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {navItems.map((item) => {
            const hasMegaMenu = !!item.megaMenu?.items && item.megaMenu.items.length > 0;
            const isActive =
              pathname === item.link || (item.link !== "/" && pathname.startsWith(item.link));
            const isHovered = activeHoverLabel === item.label;

            return (
              <div
                key={item.label}
                className="relative py-6"
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={item.link || "#"}
                  className="group inline-flex items-center gap-1.5 uppercase font-bold text-xs lg:text-sm tracking-wide text-primary-500 transition-colors hover:text-primary-700"
                >
                  <span className="relative py-1">
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-full" />
                    )}
                  </span>

                  {hasMegaMenu && (
                    <ChevronDown
                      className={`h-4 w-4 text-primary-500 transition-transform duration-200 ${
                        isHovered ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </Link>

                {/* Mega Menu Dropdown */}
                {hasMegaMenu && isHovered && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 w-screen max-w-5xl px-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-2xl p-6 md:p-8">
                      {item.megaMenu?.title && (
                        <h3 className="text-lg font-bold text-primary-500 mb-6 pb-2 border-b border-gray-100">
                          {item.megaMenu.title}
                        </h3>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {item.megaMenu?.items?.map((col, idx) => (
                          <div key={idx} className="space-y-4">
                            <div>
                              <h4 className="text-base font-bold text-primary-500">{col.title}</h4>
                              {col.subtitle && (
                                <p className="text-xs text-gray-500 mt-1">{col.subtitle}</p>
                              )}
                            </div>

                            {col.subitems && col.subitems.length > 0 && (
                              <div className="space-y-2">
                                {col.subitems.map((sub, sIdx) => (
                                  <Link
                                    key={sIdx}
                                    href={sub.href || "#"}
                                    className="group/sub flex items-start gap-3 p-3 rounded-xl hover:bg-secondary-100/50 transition-colors border border-transparent hover:border-secondary-300/30"
                                  >
                                    <div className="p-2 rounded-lg bg-primary-100/40 text-primary-500 shrink-0 group-hover/sub:bg-primary-500 group-hover/sub:text-white transition-colors">
                                      <LucideIcon name={sub.icon} className="h-5 w-5" />
                                    </div>
                                    <div>
                                      <div className="text-sm font-semibold text-gray-900 group-hover/sub:text-primary-500 transition-colors">
                                        {sub.title}
                                      </div>
                                      {sub.description && (
                                        <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">
                                          {sub.description}
                                        </p>
                                      )}
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Far Right: Locale Selector Button */}
        <div className="hidden md:flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-primary-500 hover:text-primary-700 hover:bg-primary-100/30 focus-visible:ring-primary-500"
              >
                <Globe className="h-5 w-5 text-primary-500" />
                <span className="text-xs font-bold uppercase text-primary-500">
                  {currentLocale}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-36 bg-white rounded-xl border border-gray-100 shadow-lg p-1"
            >
              <DropdownMenuItem
                onClick={() => setCurrentLocale("EN")}
                className={`cursor-pointer rounded-lg px-3 py-2 text-sm font-medium ${
                  currentLocale === "EN"
                    ? "bg-primary-100/50 text-primary-500 font-bold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                English (EN)
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setCurrentLocale("AR")}
                className={`cursor-pointer rounded-lg px-3 py-2 text-sm font-medium ${
                  currentLocale === "AR"
                    ? "bg-primary-100/50 text-primary-500 font-bold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                العربية (AR)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center space-x-2">
          {/* Mobile Locale Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-500 hover:bg-primary-100/30"
              >
                <Globe className="h-5 w-5 text-primary-500" />
                <span className="sr-only">Change Language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-36 bg-white rounded-xl border border-gray-100 shadow-lg p-1"
            >
              <DropdownMenuItem
                onClick={() => setCurrentLocale("EN")}
                className={`cursor-pointer rounded-lg px-3 py-2 text-sm font-medium ${
                  currentLocale === "EN"
                    ? "bg-primary-100/50 text-primary-500 font-bold"
                    : "text-gray-700"
                }`}
              >
                English (EN)
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setCurrentLocale("AR")}
                className={`cursor-pointer rounded-lg px-3 py-2 text-sm font-medium ${
                  currentLocale === "AR"
                    ? "bg-primary-100/50 text-primary-500 font-bold"
                    : "text-gray-700"
                }`}
              >
                العربية (AR)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-500 hover:bg-primary-100/30"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-80 max-w-[85vw] p-6 bg-white text-gray-900 border-l border-gray-100 overflow-y-auto"
            >
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <SheetDescription className="sr-only">Site navigation and links</SheetDescription>
              <div className="mb-6">
                <Logo
                  brandName={brandName || "APEX EXPERTS"}
                  logoImage={logoImage}
                  logoSvg={logoSvg}
                  logoOnly={logoOnly}
                  className="text-primary-500"
                />
              </div>

              <nav className="flex flex-col space-y-4 mt-6">
                {navItems.map((item) => {
                  const hasMegaMenu = !!item.megaMenu?.items && item.megaMenu.items.length > 0;
                  return (
                    <div key={item.label} className="space-y-2">
                      <Link
                        href={item.link || "#"}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-between text-base font-bold text-primary-500 hover:text-primary-700 uppercase"
                      >
                        {item.label}
                      </Link>

                      {hasMegaMenu && item.megaMenu?.items && (
                        <div className="pl-4 space-y-3 border-l-2 border-primary-100 mt-2">
                          {item.megaMenu.items.map((col, cIdx) => (
                            <div key={cIdx} className="space-y-1">
                              <div className="text-xs font-bold text-gray-800">{col.title}</div>
                              {col.subitems?.map((sub, sIdx) => (
                                <Link
                                  key={sIdx}
                                  href={sub.href || "#"}
                                  onClick={() => setIsOpen(false)}
                                  className="flex items-center gap-2 text-xs text-gray-600 hover:text-primary-500 py-1"
                                >
                                  <LucideIcon
                                    name={sub.icon}
                                    className="h-3.5 w-3.5 text-primary-500 shrink-0"
                                  />
                                  <span>{sub.title}</span>
                                </Link>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
