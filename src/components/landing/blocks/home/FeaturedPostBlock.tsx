import { BlogArticlesSection } from "@/components/blog/BlogArticlesSection";
import { BackgroundOverlay } from "@/components/ui/background-overlay";
import { Button } from "@/components/ui/button";
import { Eyebrow, HighlightedTitle } from "@/components/ui/highlighted-title";
import { SectionReveal } from "@/components/ui/section-reveal";
import { TextureWaves } from "@/components/ui/texture-waves";
import { getPayload } from "@/lib/cms/getPayload";
import { formatDate, getLocaleServer } from "@/lib/locale";
import { getMediaAlt, getMediaUrl } from "@/lib/utils";
import type { FeaturedPostBlock as FeaturedPostBlockType, Post, User } from "@/payload-types";
import { getPayloadPopulateFn } from "@payloadcms/richtext-lexical";
import { convertLexicalToHTMLAsync } from "@payloadcms/richtext-lexical/html-async";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/routing";

/**
 * FeaturedPostBlock Component - Displays a featured post card followed by the paginated blog articles section.
 */
export const FeaturedPostBlock = async ({
  eyebrow,
  titleBeforeHighlight,
  highlightedTitle,
  titleAfterHighlight,
  subtitle,
  selectedPost,
  readMoreText = "Explore Article",
  backgroundImage,
  textureWavesImage,
}: FeaturedPostBlockType) => {
  const locale = await getLocaleServer();
  let featuredPost: Post | null = null;

  if (selectedPost && typeof selectedPost === "object") {
    featuredPost = selectedPost as Post;
  } else {
    try {
      const payload = await getPayload();
      const result = await payload.find({
        collection: "posts",
        limit: 1,
        sort: "-publishedDate",
        locale,
      });
      if (result.docs.length > 0) {
        featuredPost = result.docs[0];
      }
    } catch (err) {
      console.error("Failed to fetch latest post for FeaturedPostBlock:", err);
    }
  }

  const payload = await getPayload();
  const bgUrl = getMediaUrl(backgroundImage);
  const bgAlt = getMediaAlt(backgroundImage, "Background");

  const postTitle = featuredPost?.title ?? "";
  const postSlug = featuredPost?.slug ?? "";
  const postHeroImage = featuredPost?.featuredImage;
  const imageUrl = getMediaUrl(postHeroImage);
  const imageAlt = getMediaAlt(postHeroImage, postTitle);

  const author = featuredPost?.author as User | undefined;
  const defaultAuthor = locale === "ar" ? "أبيكس إكسبرتس" : "Apex Experts";
  const authorName = author?.name || defaultAuthor;
  const publishedDate = featuredPost?.publishedDate;
  const postTags = featuredPost?.tags;
  const postExcerpt = (featuredPost as Post & { excerpt?: string | null })?.excerpt;
  const excerptHtmlString = postExcerpt
    ? postExcerpt
    : featuredPost?.content
      ? await convertLexicalToHTMLAsync({
          data: featuredPost.content,
          populate: await getPayloadPopulateFn({
            currentDepth: 0,
            depth: 1,
            payload,
          }),
        })
      : "";
  const formattedDate = formatDate(publishedDate, locale);
  const buttonLabel =
    readMoreText && readMoreText !== "Explore Article"
      ? readMoreText
      : locale === "ar"
        ? "استكشف المقال"
        : readMoreText || "Explore Article";

  return (
    <section className="relative overflow-hidden bg-background py-10 lg:py-18" id="featured-post">
      <BackgroundOverlay src={bgUrl} alt={bgAlt} opacityClass="opacity-5" />
      <TextureWaves image={textureWavesImage} position="top" />

      <div className="relative z-10 mx-auto flex flex-col gap-8 lg:gap-14">
        {/* Heading Section */}
        <SectionReveal direction="up" className="w-full max-w-4xl px-4 lg:px-14">
          <div className="flex flex-col items-start gap-4">
            <div className="flex flex-col gap-2 lg:gap-1">
              <Eyebrow text={eyebrow} />
              <HighlightedTitle
                titleBeforeHighlight={titleBeforeHighlight}
                highlightedTitle={highlightedTitle}
                titleAfterHighlight={titleAfterHighlight}
                className="lg:max-w-sm"
              />
            </div>
            {subtitle && (
              <p className="font-poppins text-sm leading-[130%] text-gray-500 lg:text-base lg:leading-7.25 max-w-4xl">
                {subtitle}
              </p>
            )}
          </div>
        </SectionReveal>

        {/* Featured Post Card */}
        {featuredPost && (
          <SectionReveal direction="up" delay={0.1} className="w-full lg:px-14">
            <Link
              href={`/blog/${postSlug}`}
              className="group relative overflow-hidden block lg:rounded-[1.5rem] bg-white border border-outline/30 shadow-sm hover:shadow-xl transition-all duration-500 ease-out"
            >
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-stretch px-4 pb-8 lg:p-8">
                {imageUrl && (
                  <div className="relative w-full lg:w-162.5 aspect-16/10 lg:aspect-auto lg:rounded-[1rem] overflow-hidden min-h-64 bg-gray-100">
                    <Image
                      src={imageUrl}
                      alt={imageAlt}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                )}

                <div className="flex flex-col justify-between gap-6 flex-1 py-2">
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col lg:flex-row lg:flex-wrap justify-between gap-3 transition-transform duration-500 ease-out group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                      <div className="flex flex-row flex-wrap gap-3.5 lg:gap-4.5">
                        {postTags?.map((tag, index) => (
                          <div
                            key={index}
                            className="rounded-full border border-outline/30 py-1.75 px-4 text-center text-primary-900 font-montserrat font-medium text-sm transition-colors duration-300 group-hover:border-primary-900/40 group-hover:bg-primary-900/5"
                          >
                            {tag}
                          </div>
                        ))}
                      </div>
                      <div className="px-3 pt-2 font-poppins text-sm leading-[130%] tracking-[1px] text-gray-300">
                        <span>{authorName}</span>
                        {formattedDate && <span> | {formattedDate}</span>}
                      </div>
                    </div>
                    <h3 className="font-montserrat font-bold text-xl lg:text-3xl text-foreground uppercase leading-snug group-hover:text-primary-500 transition-colors duration-300">
                      {postTitle}
                    </h3>
                    <p
                      className="font-poppins text-sm text-foreground/70 lg:text-lg leading-[160%]"
                      dangerouslySetInnerHTML={{
                        __html: excerptHtmlString,
                      }}
                    ></p>
                  </div>

                  <div className="pt-2">
                    <Button
                      asChild
                      variant="ctaOutline"
                      className="mx-3 mt-6 lg:w-fit pointer-events-none"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-montserrat text-foreground font-medium text-sm lg:text-base">
                          {buttonLabel}
                        </span>
                        <div className="text-foreground border border-foreground rounded-full p-1 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                          <ArrowRight className="w-4 h-4 -rotate-30 rtl:-rotate-150 transition-transform duration-300 group-hover:rotate-0 rtl:group-hover:rotate-180" />
                        </div>
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          </SectionReveal>
        )}

        {/* All Articles Section with Search & Pagination */}
        <div className="w-full px-4 lg:px-14">
          <BlogArticlesSection />
        </div>
      </div>
    </section>
  );
};
