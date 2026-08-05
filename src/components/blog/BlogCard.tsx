import { Button } from "@/components/ui/button";
import { SectionReveal } from "@/components/ui/section-reveal";
import { getMediaAlt, getMediaUrl } from "@/lib/utils";
import type { Media, Post, User } from "@/payload-types";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export type BlogCardProps = {
  post: Post;
  viewArticleText?: string | null;
  delay?: number;
};

/**
 * BlogCard Component - Reusable article card for blog listings.
 */
export const BlogCard: React.FC<BlogCardProps> = ({ post, viewArticleText, delay = 0 }) => {
  const isArabic = typeof window !== "undefined" && document.cookie.includes("NEXT_LOCALE=ar");
  const buttonText = viewArticleText || (isArabic ? "استكشف المقال" : "Explore Article");
  const featuredMedia =
    typeof post.featuredImage === "object" ? (post.featuredImage as Media) : null;
  const imageUrl = getMediaUrl(featuredMedia);
  const imageAlt = getMediaAlt(featuredMedia, post.title);

  const authorDoc = typeof post.author === "object" ? (post.author as User) : null;
  const defaultAuthor = isArabic ? "أبيكس إكسبرتس" : "Apex Experts";
  const authorName = authorDoc?.name || authorDoc?.email || defaultAuthor;

  const formattedDate = post.publishedDate
    ? new Date(post.publishedDate).toLocaleDateString("en-UK", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const href = `/blog/${post.slug}`;

  const excerpt = (post as Post & { excerpt?: string | null }).excerpt;

  return (
    <SectionReveal direction="up" delay={delay}>
      <Link
        href={href}
        className="group flex flex-col rounded-[0.75rem] border border-outline/30 bg-white pb-4 shadow-sm hover:shadow-md transition-all duration-300 h-full"
      >
        {/* Article Image */}
        <div className="relative w-full h-52 rounded-t-[0.75rem] overflow-hidden mb-5 bg-gray-100">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>

        <div className="pb-6 mb-1.5 flex flex-col gap-2 border-b border-outline/30 px-3 flex-1">
          {/* Tags */}
          <span className="text-xs font-poppins text-primary-900 leading-[130%] tracking-[0.3px]">
            {post.tags?.join(" / ")}
          </span>
          {/* Article Title */}
          <h3 className="font-poppins font-semibold text-sm lg:text-base leading-[130%] lg:leading-4.75 text-foreground">
            {post.title}
          </h3>
          {/* Article Excerpt */}
          {excerpt && (
            <p className="font-poppins text-xs lg:text-sm text-foreground/70 line-clamp-3 leading-[150%] mt-1">
              {excerpt}
            </p>
          )}
        </div>

        {/* Author & Date */}
        <div className="px-3 pt-2 font-poppins text-sm leading-[130%] tracking-[1px] text-gray-300">
          <span>{authorName}</span>
          {formattedDate && <span> | {formattedDate}</span>}
        </div>

        {/* CTA Button */}
        <div className="mx-3 mt-auto pt-4">
          <Button
            variant="ctaOutline"
            className="w-full px-4 py-2 flex items-center justify-center pointer-events-none"
          >
            <span className="font-montserrat text-foreground font-medium text-sm lg:text-base">
              {buttonText}
            </span>
            <div className="text-foreground border border-foreground rounded-full p-1 shrink-0 group-hover:translate-x-1 transition-transform duration-300">
              <ArrowRight className="w-4 h-4 -rotate-30 group-hover:rotate-0 transition-transform duration-300" />
            </div>
          </Button>
        </div>
      </Link>
    </SectionReveal>
  );
};
