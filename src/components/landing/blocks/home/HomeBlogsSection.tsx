import { Eyebrow, HighlightedTitle } from "@/components/ui/highlighted-title";
import { SectionReveal } from "@/components/ui/section-reveal";
import { getPayload } from "@/lib/cms/getPayload";
import { getMediaAlt, getMediaUrl } from "@/lib/utils";
import type { HomeBlogsBlock as HomeBlogsBlockType, Media, Post, User } from "@/payload-types";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const HomeBlogsSection = async ({
  eyebrow,
  titleBeforeHighlight,
  highlightedTitle,
  titleAfterHighlight,
  subtitle,
  viewAllHref = "/blog",
  viewAllText = "View All Blogs",
  viewArticleText = "Read Article",
}: HomeBlogsBlockType) => {
  let posts: Post[] = [];

  try {
    const payload = await getPayload();
    const result = await payload.find({
      collection: "posts",
      limit: 6,
      sort: "-publishedDate",
    });
    posts = result.docs;
  } catch (err) {
    console.error("Failed to fetch posts for HomeBlogsSection:", err);
  }

  return (
    <section
      className="relative overflow-hidden min-h-screen bg-white py-10 lg:py-18 px-4 lg:px-14 "
      id="blogs"
    >
      <div className="w-full relative flex flex-col gap-8">
        {/* Header Content */}
        <SectionReveal direction="up" className="w-full">
          <div className="flex flex-col items-start gap-4">
            <div className="flex flex-col gap-2 lg:gap-1">
              <Eyebrow text={eyebrow} />
              <HighlightedTitle
                titleBeforeHighlight={titleBeforeHighlight}
                highlightedTitle={highlightedTitle}
                titleAfterHighlight={titleAfterHighlight}
                className="lg:max-w-xl font-display"
              />
            </div>
            {subtitle && (
              <p className="font-poppins text-sm leading-[130%] text-gray-500 lg:text-base lg:leading-7.25 lg:max-w-4xl">
                {subtitle}
              </p>
            )}
          </div>
        </SectionReveal>

        {/* 6 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-13.5 justify-between bg-white rounded-[1.5rem] border border-outline/30 blog-container-shadow px-4 lg:px-10 py-8 lg:py-14">
          {posts.map((post, index) => {
            const featuredMedia =
              typeof post.featuredImage === "object" ? (post.featuredImage as Media) : null;
            const imageUrl = getMediaUrl(featuredMedia);
            const imageAlt = getMediaAlt(featuredMedia, post.title);

            const authorDoc = typeof post.author === "object" ? (post.author as User) : null;
            const authorName = authorDoc?.name || authorDoc?.email || "Apex Experts";

            const formattedDate = post.publishedDate
              ? new Date(post.publishedDate).toLocaleDateString("en-UK", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "";

            const href = `/blog/${post.slug}`;

            return (
              <SectionReveal key={post.id} direction="up" delay={index * 0.1}>
                <div className="group flex flex-col rounded-[0.75rem] border border-outline/30 bg-white pb-4 shadow-sm hover:shadow-md transition-all duration-300 h-full">
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

                  <div className="pb-6 mb-1.5 flex flex-col gap-1 border-b border-outline/30 px-3 flex-1">
                    {/* Tags */}
                    <span className="text-xs font-poppins text-primary-900 leading-[130%] tracking-[0.3px]">
                      {post.tags?.join(" / ")}
                    </span>
                    {/* Article Title */}
                    <h3 className="font-poppins font-semibold text-sm lg:text-base leading-[130%] lg:leading-4.75 text-foreground">
                      {post.title}
                    </h3>
                  </div>

                  {/* Author & Date */}
                  <div className="px-3 pt-2 font-poppins text-sm leading-[130%] tracking-[1px] text-gray-300">
                    <span>{authorName}</span>
                    {formattedDate && <span> | {formattedDate}</span>}
                  </div>

                  {/* CTA Link */}
                  <Link
                    href={href}
                    className="rounded-full mx-3 mt-6 border border-outline/30 hover:border-foreground transition-colors duration-300 py-2 px-8 flex items-center justify-center gap-2"
                  >
                    <span className="font-montserrat text-foreground font-medium text-sm lg:text-base">
                      {viewArticleText}
                    </span>
                    <div className="text-foreground border border-foreground rounded-full p-1">
                      <ArrowRight className="w-4 h-4 -rotate-30" />
                    </div>
                  </Link>
                </div>
              </SectionReveal>
            );
          })}
        </div>
        {/* View All Blogs Bar (matching View All Services style) */}
        <SectionReveal direction="up" delay={0.2} className="w-full">
          <div className="w-full px-4 lg:px-14 flex flex-row items-center gap-6">
            <div className="flex-1 h-px bg-error-500/24"></div>
            <Link
              href={viewAllHref || "/blog"}
              className="font-montserrat text-primary-500 text-xs md:text-base lg:text-lg hover:underline"
            >
              {viewAllText}
            </Link>
            <div className="flex-1 h-px bg-error-500/24"></div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
};
