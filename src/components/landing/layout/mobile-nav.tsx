"use client";

import { Button } from "@/components/ui/button";
import { LucideIcon } from "@/components/ui/lucide-icon";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ArrowRight, ChevronDown, Menu, Sparkles } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useState } from "react";
import { LocaleSelector } from "./locale-selector";
import { Logo, LogoSvg } from "./logo";
import { Header } from "@/payload-types";
import { useLocale } from "next-intl";

export interface MobileNavProps {
  navItems: Header["navItems"];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onLocaleChange: (locale: "EN" | "AR") => void;
}

export function MobileNav({ navItems, isOpen, setIsOpen, onLocaleChange }: MobileNavProps) {
  const [expandedNav, setExpandedNav] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleNav = (label: string) => {
    setExpandedNav((prev) => (prev === label ? null : label));
    setExpandedCategory(null);
  };

  const toggleCategory = (catKey: string) => {
    setExpandedCategory((prev) => (prev === catKey ? null : catKey));
  };

  const isRtl = useLocale() === "ar";

  return (
    <div className="flex lg:hidden items-center gap-2">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground hover:bg-primary-100/30 rounded-xl"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-full max-w-85 sm:max-w-95 p-0 bg-background text-foreground border-s border-border flex flex-col h-full overflow-hidden shadow-2xl"
        >
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <SheetDescription className="sr-only">Site navigation and services menu</SheetDescription>

          {/* Drawer Header */}
          <div className="flex items-center justify-between ps-5 pe-10 py-4 border-b border-border/60 bg-muted/30">
            <Link href="/">
              <LogoSvg className="text-foreground" width={150} />
            </Link>
            <LocaleSelector onLocaleChange={onLocaleChange} iconOnly />
          </div>

          {/* Nav Items List */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {navItems?.map((item) => {
              const hasMegaMenu = !!item.megaMenu?.items && item.megaMenu.items.length > 0;
              const isExpanded = expandedNav === item.label;

              return (
                <div
                  key={item.label}
                  className="rounded-2xl border border-border/40 bg-card/60 overflow-hidden transition-all duration-200 shadow-sm"
                >
                  {/* Main Nav Header */}
                  <div className="flex items-center justify-between px-4 py-3">
                    <Link
                      href={item.link || "#"}
                      onClick={() => setIsOpen(false)}
                      className="text-sm font-bold tracking-wide uppercase text-foreground hover:text-primary transition-colors flex-1"
                    >
                      {item.label}
                    </Link>

                    {hasMegaMenu && (
                      <button
                        onClick={() => toggleNav(item.label)}
                        className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all"
                        aria-label={`Toggle ${item.label} submenu`}
                      >
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform duration-200",
                            isExpanded ? "rotate-180 text-primary" : "",
                          )}
                        />
                      </button>
                    )}
                  </div>

                  {/* Mega Menu Content */}
                  {hasMegaMenu && isExpanded && item.megaMenu?.items && (
                    <div className="border-t border-border/40 bg-muted/20 p-3 space-y-3 animate-in fade-in slide-in-from-top-1 duration-200">
                      {item.megaMenu.items.map((cat, cIdx) => {
                        const catKey = `${item.label}-${cIdx}`;
                        const isCatExpanded = expandedCategory === catKey;
                        const hasSubitems = cat.subitems && cat.subitems.length > 0;
                        const hasSublist = cat.sublist && cat.sublist.length > 0;

                        return (
                          <div
                            key={cIdx}
                            className="rounded-xl border border-border/50 bg-background/90 p-3 space-y-2.5 shadow-xs"
                          >
                            {/* Category Title Header */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20">
                                  {cat.iconSvg ? (
                                    <Logo
                                      logoSvg={cat.iconSvg}
                                      width={20}
                                      height={20}
                                      className="w-5 h-5 text-primary"
                                    />
                                  ) : (
                                    <LucideIcon
                                      name={cat.subitems?.[0]?.icon || "Layers"}
                                      className="w-4 h-4 text-primary"
                                    />
                                  )}
                                </div>
                                <div>
                                  <Link
                                    href={cat.href || "#"}
                                    onClick={() => setIsOpen(false)}
                                    className="text-xs font-bold text-foreground hover:text-primary transition-colors block leading-tight"
                                  >
                                    {cat.title}
                                  </Link>
                                  {cat.subtitle && (
                                    <p className="text-[11px] text-muted-foreground line-clamp-1">
                                      {cat.subtitle}
                                    </p>
                                  )}
                                </div>
                              </div>

                              {hasSubitems && (
                                <button
                                  onClick={() => toggleCategory(catKey)}
                                  className="p-1 rounded bg-muted/60 text-muted-foreground hover:text-foreground text-[11px] font-medium flex items-center gap-1"
                                >
                                  <span>{isCatExpanded ? "Hide" : "View"}</span>
                                  <ChevronDown
                                    className={cn(
                                      "h-3 w-3 transition-transform duration-200",
                                      isCatExpanded ? "rotate-180" : "",
                                    )}
                                  />
                                </button>
                              )}
                            </div>

                            {/* Projects Tag Badges (sublist) */}
                            {hasSublist && (
                              <div className="flex flex-wrap gap-1.5 pt-1">
                                {cat.sublist?.map((sub, sIdx) => (
                                  <span
                                    key={sIdx}
                                    className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-secondary text-white border border-border/40 flex items-center gap-1"
                                  >
                                    <Sparkles className="w-2.5 h-2.5 text-primary" />
                                    {sub.title}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* Service Subitems */}
                            {hasSubitems && isCatExpanded && (
                              <div className="pt-2 border-t border-border/40 space-y-2 animate-in fade-in duration-150">
                                {cat.subitems?.map((sub, sIdx) => (
                                  <Link
                                    key={sIdx}
                                    href={sub.href || "#"}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-muted/60 transition-colors group"
                                  >
                                    <div className="p-1.5 rounded-md bg-muted text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0 mt-0.5">
                                      <LucideIcon name={sub.icon} className="h-3.5 w-3.5" />
                                    </div>
                                    <div className="space-y-0.5">
                                      <div className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                                        {sub.title}
                                      </div>
                                      {sub.description && (
                                        <p className="text-[11px] text-muted-foreground line-clamp-2 leading-snug">
                                          {sub.description}
                                        </p>
                                      )}
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            )}

                            {/* Direct Explore Link for Category */}
                            {cat.href && (
                              <Link
                                href={cat.href}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center justify-between text-[11px] font-semibold text-primary pt-1 hover:underline"
                              >
                                <span>
                                  {isRtl ? `استكشف ${cat.title}` : `Explore ${cat.title}`}
                                </span>
                                <ArrowRight
                                  className={cn("w-3.5 h-3.5", isRtl ? "rotate-180" : "")}
                                />
                              </Link>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Drawer Footer CTA */}
          <div className="p-4 border-t border-border/60 bg-muted/30 flex flex-col gap-2">
            <Button
              asChild
              className="w-full justify-center gap-2 font-bold rounded-xl shadow-md bg-primary-500"
              size="default"
            >
              <Link href="/contact-us" onClick={() => setIsOpen(false)}>
                <span>{isRtl ? "تواصل معنا" : "Get in Touch"}</span>
                <ArrowRight className={cn("w-4 h-4", isRtl ? "rotate-180" : "")} />
              </Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
