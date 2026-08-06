import { BlogCard } from "@/components/blog/BlogCard";
import { Eyebrow, HighlightedTitle } from "@/components/ui/highlighted-title";
import { SectionReveal } from "@/components/ui/section-reveal";
import { getPayload } from "@/lib/cms/getPayload";
import type { HomeBlogsBlock as HomeBlogsBlockType, Post } from "@/payload-types";
import { Link } from "@/i18n/routing";
import { getLocale } from "next-intl/server";

export const HomeBlogsSection = async ({
  eyebrow,
  titleBeforeHighlight,
  highlightedTitle,
  titleAfterHighlight,
  subtitle,
  viewAllHref,
  viewAllText,
  viewArticleText = "Explore Article",
  givenPosts,
}: HomeBlogsBlockType & { givenPosts?: Post[] }) => {
  const locale = await getLocale();
  let posts: Post[] = [];

  if (givenPosts) {
    posts = givenPosts;
  } else {
    try {
      const payload = await getPayload();
      const result = await payload.find({
        collection: "posts",
        limit: 6,
        sort: "-publishedDate",
        locale: locale as "en" | "ar",
      });
      posts = result.docs;
    } catch (err) {
      console.error("Failed to fetch posts for HomeBlogsSection:", err);
    }
  }

  const effectiveViewArticleText =
    viewArticleText === "Explore Article" && locale === "ar" ? "اقرأ المقال" : viewArticleText;

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
          {posts.map((post, index) => (
            <BlogCard
              key={post.id}
              post={post}
              viewArticleText={effectiveViewArticleText}
              delay={index * 0.1}
            />
          ))}
        </div>
        {/* View All Blogs Bar (matching View All Services style) */}
        {viewAllHref && viewAllText && (
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
        )}
      </div>
    </section>
  );
};
