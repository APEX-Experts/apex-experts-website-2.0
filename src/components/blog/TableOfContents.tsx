"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

import { useLocale } from "next-intl";

export interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: HeadingItem[];
  className?: string;
}

/**
 * TableOfContents Component ("In this article")
 * Renders list of article headings as normal text over page background with smooth scroll navigation and scroll-spy active state tracking.
 */
export const TableOfContents: React.FC<TableOfContentsProps> = ({ headings, className = "" }) => {
  const [activeId, setActiveId] = useState<string>("");
  const isNavigatingRef = useRef(false);
  const navigationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!headings || headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Ignore intermediate headings while smooth-scrolling
        // to a heading selected from the TOC.
        if (isNavigatingRef.current) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0% -60% 0%",
        threshold: 0.2,
      },
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);

      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();

      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, [headings]);

  const locale = useLocale();
  const isArabic = locale === "ar";
  if (!headings || headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className={cn("space-y-4", className)}>
      <h3 className="font-montserrat font-semibold text-base text-foreground mb-4 pb-2 border-b border-outline/20 max-h-[calc(100vh-33rem)]">
        {isArabic ? "محتويات المقال" : "In this article"}
      </h3>
      <ul className="space-y-2.5 h-55 overflow-y-auto pe-2 [scrollbar-width:thin]">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          return (
            <li
              key={heading.id}
              className={cn(
                "transition-all duration-200",
                heading.level === 3 ? "ms-3" : heading.level === 4 ? "ms-6" : "",
              )}
            >
              <a
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault();

                  const el = document.getElementById(heading.id);

                  if (!el) return;

                  // Lock the active item to the clicked heading while scrolling.
                  isNavigatingRef.current = true;
                  setActiveId(heading.id);

                  const yOffset = -100;
                  const y = el.getBoundingClientRect().top + window.scrollY + yOffset;

                  window.scrollTo({
                    top: y,
                    behavior: "smooth",
                  });

                  window.history.pushState(null, "", `#${heading.id}`);

                  // Clear an existing timeout if another TOC link is clicked
                  // before the previous smooth scroll finishes.
                  if (navigationTimeoutRef.current) {
                    clearTimeout(navigationTimeoutRef.current);
                  }

                  navigationTimeoutRef.current = setTimeout(() => {
                    isNavigatingRef.current = false;
                  }, 800);
                }}
                className={cn(
                  "block text-sm font-poppins transition-colors leading-snug",
                  isActive
                    ? "text-foreground font-semibold border-s-2 border-foreground ps-2.5 -ms-2.5"
                    : "text-foreground/70 hover:text-foreground hover:translate-x-0.5 rtl:hover:-translate-x-0.5",
                )}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
