"use client";

import { BlogCard } from "@/components/blog/BlogCard";
import { Eyebrow, HighlightedTitle } from "@/components/ui/highlighted-title";
import { SectionReveal } from "@/components/ui/section-reveal";
import type { Post, RelatedPostsBlock as RelatedPostsBlockType } from "@/payload-types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useRef } from "react";

export const RelatedPostsBlock: React.FC<RelatedPostsBlockType> = ({
  eyebrow,
  titleBeforeHighlight,
  highlightedTitle,
  titleAfterHighlight,
  subtitle,
  selectedPosts,
  readMoreText,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const posts: Post[] = React.useMemo(() => {
    return selectedPosts && selectedPosts.length > 0
      ? (selectedPosts.filter((p) => typeof p === "object" && p !== null) as Post[])
      : [];
  }, [selectedPosts]);

  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  const checkScroll = React.useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    // Buffer of 1px for precision rounding issues
    setCanScrollLeft(scrollLeft > 1);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  }, []);

  React.useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    checkScroll();
    container.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll, posts]);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollAmount = container.clientWidth * 0.75;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative overflow-hidden bg-background py-10 lg:py-18" id="related-posts">
      <div className="relative z-10 mx-auto flex flex-col gap-8 lg:gap-14 px-4 lg:px-14">
        {/* Header & Controls */}
        <SectionReveal direction="up" className="w-full">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="flex flex-col items-start gap-4 max-w-4xl">
              <div className="flex flex-col gap-2 lg:gap-1">
                <Eyebrow text={eyebrow} />
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

            {/* Navigation Arrows */}
            {posts.length > 1 && (
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => handleScroll("left")}
                  disabled={!canScrollLeft}
                  aria-label="Previous posts"
                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-primary-500 text-white flex items-center justify-center transition-all duration-200 shadow-xs hover:bg-primary-600 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-primary-500 cursor-pointer"
                >
                  <ArrowLeft className="w-5 h-5 lg:w-6 lg:h-6 rtl:rotate-180" />
                </button>
                <button
                  onClick={() => handleScroll("right")}
                  disabled={!canScrollRight}
                  aria-label="Next posts"
                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-primary-500 text-white flex items-center justify-center transition-all duration-200 shadow-xs hover:bg-primary-600 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-primary-500 cursor-pointer"
                >
                  <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6 rtl:rotate-180" />
                </button>
              </div>
            )}
          </div>
        </SectionReveal>

        {/* Posts Carousel */}
        {posts.length > 0 && (
          <div
            ref={scrollRef}
            className="w-full flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory py-2 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {posts.map((post, index) => (
              <div
                key={post.id || index}
                className="w-[85%] sm:w-[45%] lg:w-[32%] shrink-0 snap-start"
              >
                <BlogCard post={post} viewArticleText={readMoreText} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
