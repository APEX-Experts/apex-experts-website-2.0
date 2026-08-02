import { BackgroundOverlay } from "@/components/ui/background-overlay";
import { Button } from "@/components/ui/button";
import { Eyebrow, HighlightedTitle } from "@/components/ui/highlighted-title";
import { SectionReveal } from "@/components/ui/section-reveal";
import { TextureWaves } from "@/components/ui/texture-waves";
import { getPayload } from "@/lib/cms/getPayload";
import { getMediaAlt, getMediaUrl } from "@/lib/utils";
import type {
  FeaturedPostBlock as FeaturedPostBlockType,
  Post,
  User
} from "@/payload-types";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/**
 * FeaturedPostBlock Component - Displays a featured post card.
 */
export const FeaturedPostBlock = async ({
  eyebrow,
  titleBeforeHighlight,
  highlightedTitle,
  titleAfterHighlight,
  subtitle,
  selectedPost,
  readMoreText = "Read Article",
  backgroundImage,
  textureWavesImage,
}: FeaturedPostBlockType) => {
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
      });
      if (result.docs.length > 0) {
        featuredPost = result.docs[0];
      }
    } catch (err) {
      console.error("Failed to fetch latest post for FeaturedPostBlock:", err);
    }
  }

  const bgUrl = getMediaUrl(backgroundImage);
  const bgAlt = getMediaAlt(backgroundImage, "Background");

  const postTitle = featuredPost?.title ?? "";
  const postSlug = featuredPost?.slug ?? "";
  const postHeroImage = featuredPost?.featuredImage;
  const imageUrl = getMediaUrl(postHeroImage);
  const imageAlt = getMediaAlt(postHeroImage, postTitle);

  const author = featuredPost?.author as User | undefined;
  const authorName = author?.name || "Apex Experts";
  const publishedDate = featuredPost?.publishedDate;
  const formattedDate = publishedDate
    ? new Date(publishedDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <section className="relative overflow-hidden bg-background py-10 lg:py-18" id="featured-post">
      <BackgroundOverlay src={bgUrl} alt={bgAlt} opacityClass="opacity-5" />
      <TextureWaves image={textureWavesImage} position="top" />

      <div className="relative z-10 mx-auto flex flex-col gap-8 lg:gap-14 px-4 lg:px-14">
        {/* Heading Section */}
        <SectionReveal direction="up" className="w-full max-w-4xl">
          <div className="flex flex-col items-start gap-4">
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
        </SectionReveal>

        {/* Featured Post Card */}
        {featuredPost && (
          <SectionReveal direction="up" delay={0.1} className="w-full">
            <div className="relative overflow-hidden rounded-2xl bg-white border border-outline/30 shadow-sm flex flex-col lg:flex-row gap-6 lg:gap-10 items-stretch p-6 lg:p-8">
              {imageUrl && (
                <div className="relative w-full lg:w-1/2 aspect-16/10 lg:aspect-auto rounded-xl overflow-hidden min-h-64">
                  <Image
                    src={imageUrl}
                    alt={imageAlt}
                    fill
                    className="object-cover object-center"
                  />
                </div>
              )}

              <div className="flex flex-col justify-between gap-6 flex-1 py-2">
                <div className="flex flex-col gap-3">
                  <div className="font-poppins text-xs font-semibold text-primary-500 uppercase tracking-wider">
                    {authorName} {formattedDate && `• ${formattedDate}`}
                  </div>
                  <h3 className="font-montserrat font-bold text-xl lg:text-3xl text-foreground uppercase leading-snug">
                    {postTitle}
                  </h3>
                </div>

                <div className="pt-2">
                  <Button asChild variant="ctaPrimary">
                    <Link href={`/blog/${postSlug}`}>
                      <span>{readMoreText}</span>
                      <div className="w-6 h-6 lg:w-7.5 lg:h-7.5 bg-white rounded-full flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 lg:w-5.5 lg:h-5.5 text-primary-500 -rotate-30" />
                      </div>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </SectionReveal>
        )}
      </div>
    </section>
  );
};
