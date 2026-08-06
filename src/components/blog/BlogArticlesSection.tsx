"use client";

import { BlogCard } from "@/components/blog/BlogCard";
import { SectionReveal } from "@/components/ui/section-reveal";
import { usePathname, useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import type { Post } from "@/payload-types";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface ApiResponse {
  docs: Post[];
  totalPages: number;
  page: number;
  totalDocs: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  allTags?: string[];
}

/**
 * BlogArticlesSection Component
 * Provides a debounced database search input, inline tag filter bar, responsive articles grid, loading states, and pagination.
 */
export const BlogArticlesSection: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const isArabic = locale === "ar";

  const gridRef = useRef<HTMLDivElement>(null);

  // URL search params state
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const activeTags = searchParams.getAll("tag");
  const urlSearchQuery = searchParams.get("q") || "";

  // Local state for search input and URL query sync
  const [searchInput, setSearchInput] = useState(urlSearchQuery);
  const [prevUrlQuery, setPrevUrlQuery] = useState(urlSearchQuery);
  const [data, setData] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Sync search input if URL search param changes from outside
  if (prevUrlQuery !== urlSearchQuery) {
    setPrevUrlQuery(urlSearchQuery);
    setSearchInput(urlSearchQuery);
  }

  // Debounced update of URL search param 'q'
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== urlSearchQuery) {
        const params = new URLSearchParams(searchParams.toString());
        if (searchInput.trim()) {
          params.set("q", searchInput.trim());
        } else {
          params.delete("q");
        }
        params.set("page", "1");

        const queryString = params.toString();
        router.push(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput, urlSearchQuery, searchParams, router, pathname]);

  // Fetch articles from /api/blog/posts whenever searchParams or locale changes
  useEffect(() => {
    let isMounted = true;

    const fetchPosts = async () => {
      if (isMounted) setIsLoading(true);
      try {
        const params = new URLSearchParams(searchParams.toString());
        params.set("locale", locale);
        const res = await fetch(`/api/blog/posts?${params.toString()}`);
        if (!res.ok) throw new Error("Failed to fetch posts");
        const json: ApiResponse = await res.json();
        if (isMounted) {
          setData(json);
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchPosts();

    return () => {
      isMounted = false;
    };
  }, [searchParams, locale]);

  // Toggle single tag filter
  const handleTagToggle = useCallback(
    (tagToToggle: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (!tagToToggle) {
        params.delete("tag");
      } else {
        const currentTags = params.getAll("tag");
        const existingIndex = currentTags.findIndex(
          (t) => t.toLowerCase() === tagToToggle.toLowerCase(),
        );
        params.delete("tag");
        if (existingIndex >= 0) {
          currentTags.splice(existingIndex, 1);
        } else {
          currentTags.push(tagToToggle);
        }
        currentTags.forEach((t) => params.append("tag", t));
      }
      params.set("page", "1");
      const queryString = params.toString();
      router.push(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
    },
    [searchParams, router, pathname],
  );

  // Navigate to specific page
  const handlePageChange = useCallback(
    (newPage: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", newPage.toString());
      router.push(`${pathname}?${params.toString()}`, { scroll: false });

      // Smooth scroll to top of article list
      if (gridRef.current) {
        gridRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [searchParams, router, pathname],
  );

  // Clear search input
  const handleClearSearch = useCallback(() => {
    setSearchInput("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    params.set("page", "1");
    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
  }, [searchParams, router, pathname]);

  // Dictionary for static UI text in BlogArticlesSection
  const t = {
    searchPlaceholder: isArabic
      ? "ابحث في المقالات عن طريق العنوان أو الوسم..."
      : "Search articles by title or tag...",
    activeFilters: isArabic ? "التصنيفات النشطة:" : "Active Filters:",
    tagsCount: (count: number) => (isArabic ? `${count} وسم` : `${count} tag(s)`),
    clearAll: isArabic ? "مسح الكل" : "Clear All",
    filterByTag: isArabic ? "التصفية حسب الوسم:" : "Filter by tag:",
    allTags: isArabic ? "الكل" : "All",
    allArticles: isArabic ? "جميع المقالات" : "All Articles",
    showingArticles: (showing: number, total: number) =>
      isArabic ? `عرض ${showing} من أصل ${total} مقال` : `Showing ${showing} of ${total} articles`,
    noArticlesFound: isArabic ? "لم يتم العثور على مقالات" : "No Articles Found",
    emptyDescription: isArabic
      ? "لم نتمكن من العثور على أي مقالات تطابق معايير البحث أو التصفية الحالية. جرب البحث عن كلمة أخرى أو مسح التصفية."
      : "We couldn't find any articles matching your active search or tag criteria. Try searching for something else or clear your filters.",
    clearAllFilters: isArabic ? "مسح جميع التصفية" : "Clear All Filters",
    prevPage: isArabic ? "الصفحة السابقة" : "Previous Page",
    nextPage: isArabic ? "الصفحة التالية" : "Next Page",
  };

  // Clear all filters (tags & search)
  const handleClearAllFilters = useCallback(() => {
    setSearchInput("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("tag");
    params.delete("q");
    params.set("page", "1");
    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
  }, [searchParams, router, pathname]);

  const hasActiveFilters = activeTags.length > 0 || Boolean(urlSearchQuery);

  return (
    <div ref={gridRef} className="w-full flex flex-col gap-8 pt-6" id="all-articles">
      {/* Search & Active Filters Bar */}
      <SectionReveal direction="up" className="w-full">
        <div className="flex flex-col gap-4 bg-white rounded-2xl border border-outline/30 p-4 lg:p-6 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Debounced Search Input */}
            <div className="relative flex-1">
              <Search className="absolute inset-s-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full ps-12 pe-10 py-3 rounded-xl border border-outline/30 bg-background/50 font-poppins text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute inset-e-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-gray-400 hover:text-foreground hover:bg-gray-100 transition-colors cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Active Filter Badge & Clear All */}
            {hasActiveFilters && (
              <div className="flex items-center gap-3">
                <span className="text-xs font-poppins text-gray-500 font-medium whitespace-nowrap">
                  {t.activeFilters} {activeTags.length > 0 && t.tagsCount(activeTags.length)}{" "}
                  {urlSearchQuery && `"${urlSearchQuery}"`}
                </span>
                <button
                  type="button"
                  onClick={handleClearAllFilters}
                  className="rounded-lg border border-destructive/40 bg-destructive/10 text-destructive hover:bg-destructive/20 px-3 py-2 text-xs font-montserrat font-semibold flex items-center gap-1 transition-all cursor-pointer whitespace-nowrap"
                >
                  <span>{t.clearAll}</span>
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Tag Filter Pills Bar under search input */}
          {data?.allTags && data.allTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-outline/20">
              <span className="text-xs font-poppins font-medium text-gray-400 me-1">
                {t.filterByTag}
              </span>
              <button
                type="button"
                onClick={() => handleTagToggle("")}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-xs font-montserrat transition-all cursor-pointer",
                  activeTags.length === 0
                    ? "bg-primary-500 text-white shadow-sm font-semibold"
                    : "border border-outline/30 text-foreground hover:bg-gray-100 hover:border-primary-300 font-medium",
                )}
              >
                {t.allTags}
              </button>
              {data.allTags.map((tag, idx) => {
                const isActive = activeTags.some((at) => at.toLowerCase() === tag.toLowerCase());
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleTagToggle(tag)}
                    className={cn(
                      "rounded-full px-3.5 py-1.5 text-xs font-montserrat transition-all cursor-pointer",
                      isActive
                        ? "bg-primary-500 text-white shadow-sm font-semibold ring-2 ring-primary-500/30"
                        : "border border-outline/30 text-foreground hover:bg-gray-100 hover:border-primary-300 font-medium",
                    )}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </SectionReveal>

      {/* Results Header / Count */}
      <div className="flex items-center justify-between px-1">
        <h3 className="font-montserrat font-bold text-lg lg:text-2xl text-foreground uppercase tracking-wide">
          {t.allArticles}
        </h3>
        {data && (
          <span className="font-poppins text-xs lg:text-sm text-gray-500 font-medium">
            {t.showingArticles(data.docs.length, data.totalDocs)}
          </span>
        )}
      </div>

      {/* Articles Grid / Loading Skeleton / Empty State */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-xl border border-outline/20 bg-white p-4 flex flex-col gap-4 h-96"
            >
              <div className="w-full h-48 bg-gray-200 rounded-lg" />
              <div className="w-1/3 h-4 bg-gray-200 rounded" />
              <div className="w-full h-6 bg-gray-200 rounded" />
              <div className="w-3/4 h-6 bg-gray-200 rounded" />
              <div className="mt-auto w-full h-10 bg-gray-200 rounded-lg" />
            </div>
          ))}
        </div>
      ) : data && data.docs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {data.docs.map((post, index) => (
            <BlogCard key={post.id} post={post} delay={index * 0.05} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <SectionReveal direction="up" className="w-full">
          <div className="flex flex-col items-center justify-center text-center p-12 lg:p-16 rounded-2xl bg-white border border-dashed border-outline/40 gap-4">
            <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
              <Search className="w-6 h-6" />
            </div>
            <h4 className="font-montserrat font-bold text-lg lg:text-xl text-foreground uppercase">
              {t.noArticlesFound}
            </h4>
            <p className="font-poppins text-sm text-gray-500 max-w-md">{t.emptyDescription}</p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleClearAllFilters}
                className="mt-2 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-montserrat font-medium text-sm px-6 py-2.5 transition-colors cursor-pointer"
              >
                {t.clearAllFilters}
              </button>
            )}
          </div>
        </SectionReveal>
      )}

      {/* Pagination Controls */}
      {data && data.totalPages > 1 && (
        <SectionReveal direction="up" className="w-full">
          <div className="flex items-center justify-center gap-2 pt-6">
            {/* Previous Page */}
            <button
              type="button"
              disabled={!data.hasPrevPage}
              onClick={() => handlePageChange(currentPage - 1)}
              className="p-2.5 rounded-lg border border-outline/30 text-foreground hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
              title={t.prevPage}
            >
              <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
            </button>

            {/* Page Numbers */}
            {Array.from({ length: data.totalPages }, (_, index) => {
              const pageNum = index + 1;
              const isActive = pageNum === currentPage;

              return (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => handlePageChange(pageNum)}
                  className={`min-w-10 h-10 px-3 rounded-lg font-montserrat font-semibold text-sm transition-all cursor-pointer ${
                    isActive
                      ? "bg-primary-500 text-white shadow-sm"
                      : "border border-outline/30 text-foreground hover:bg-gray-100"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            {/* Next Page */}
            <button
              type="button"
              disabled={!data.hasNextPage}
              onClick={() => handlePageChange(currentPage + 1)}
              className="p-2.5 rounded-lg border border-outline/30 text-foreground hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
              title={t.nextPage}
            >
              <ChevronRight className="w-5 h-5 rtl:rotate-180" />
            </button>
          </div>
        </SectionReveal>
      )}
    </div>
  );
};
