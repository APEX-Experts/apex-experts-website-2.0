import { AuthorBox } from "@/components/blog/AuthorBox";
import { getRichTextHtmlAndHeadings, RichText } from "@/components/blog/RichText";
import { ShareBox } from "@/components/blog/ShareBox";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { AboutHeroBlock } from "@/components/landing/blocks/about/AboutHeroBlock";
import { CommonCtaBlock } from "@/components/landing/blocks/common/CommonCtaBlock";
import { RelatedPostsBlock } from "@/components/landing/blocks/home/RelatedPostsBlock";
import { BackgroundOverlay } from "@/components/ui/background-overlay";
import { getPayload } from "@/lib/cms/getPayload";
import { getMediaAlt, getMediaUrl } from "@/lib/utils";
import type {
  AboutHeroBlock as AboutHeroBlockType,
  CommonCtaBlock as CommonCtaBlockType,
  Media,
  Post,
  RelatedPostsBlock as RelatedPostsBlockType,
  User,
} from "@/payload-types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

/**
 * Enable Incremental Static Regeneration. Single blog pages are generated at build time
 * and revalidated on-demand via Payload CMS hooks or at most every 60 seconds as fallback.
 */
export const revalidate = 60;

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

/**
 * Generates static params for all published posts in the 'posts' collection.
 * Enables SSG for known blog article routes across locales.
 */
export async function generateStaticParams() {
  try {
    const payload = await getPayload();
    const posts = await payload.find({
      collection: "posts",
      limit: 100,
      select: {
        slug: true,
      },
    });

    const locales = ["en", "ar"];
    return locales.flatMap((locale) =>
      posts.docs.map((post) => ({
        locale,
        slug: post.slug,
      })),
    );
  } catch (error) {
    console.error("Error in generateStaticParams for blog posts:", error);
    return [];
  }
}

/**
 * Generates dynamic SEO & OpenGraph metadata for the single blog article.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug, locale: rawLocale } = resolvedParams;
  const locale = (rawLocale === "ar" ? "ar" : "en") as "en" | "ar";

  try {
    const payload = await getPayload();
    const result = await payload.find({
      collection: "posts",
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
      depth: 2,
      locale,
    });

    const post = result.docs[0];

    if (!post) {
      return {};
    }

    const featuredMedia =
      typeof post.featuredImage === "object" ? (post.featuredImage as Media) : null;
    const imageUrl = getMediaUrl(featuredMedia);
    const authorDoc = typeof post.author === "object" ? (post.author as User) : null;
    const authorName = authorDoc?.name || authorDoc?.email || "Apex Experts";

    const title = `${post.title} | APEX Experts Blog`;
    const description =
      post.excerpt || `Read ${post.title} on APEX Experts Blog. Insights and articles.`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "article",
        publishedTime: post.publishedDate || undefined,
        authors: [authorName],
        images: imageUrl ? [{ url: imageUrl }] : undefined,
      },
      twitter: {
        card: imageUrl ? "summary_large_image" : "summary",
        title,
        description,
        images: imageUrl ? [imageUrl] : undefined,
      },
    };
  } catch {
    return {};
  }
}

/**
 * Single Blog Article Page Component
 * Renders the article header, metadata, cover image, Lexical body content, author card, share links, TOC index, and related posts.
 */
export default async function SingleArticlePage({ params }: Props) {
  const resolvedParams = await params;
  const { slug, locale: rawLocale } = resolvedParams;
  const locale = (rawLocale === "ar" ? "ar" : "en") as "en" | "ar";

  const payload = await getPayload();

  // Fetch current article with depth: 2 to populate author & author.image
  const postResult = await payload.find({
    collection: "posts",
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    depth: 2,
    locale,
  });

  const post = postResult.docs[0] as Post | undefined;

  if (!post) {
    return notFound();
  }

  // Author and image formatting
  const authorDoc = typeof post.author === "object" ? (post.author as User) : null;

  // Process rich text content and extract heading anchor links for Table of Contents index
  const { html: richTextHtml, headings } = await getRichTextHtmlAndHeadings(post.content);

  // Fetch related posts (excluding current post) using 2-step workaround for localized tag queries
  let relatedPosts: Post[] = [];
  if (post.tags && post.tags.length > 0) {
    try {
      const matchingPosts = await payload.find({
        collection: "posts",
        where: {
          and: [
            {
              slug: {
                not_equals: slug,
              },
            },
            {
              tags: {
                in: post.tags,
              },
            },
          ],
        },
        limit: 100,
        select: {},
        locale: "all",
      });

      const matchedIds = matchingPosts.docs.map((d) => d.id);

      if (matchedIds.length > 0) {
        const res = await payload.find({
          collection: "posts",
          where: {
            id: {
              in: matchedIds,
            },
          },
          limit: 3,
          sort: "-publishedDate",
          locale,
        });
        relatedPosts = res.docs as Post[];
      }
    } catch (err) {
      console.error("Error fetching tag-matched related posts:", err);
    }
  }

  if (relatedPosts.length === 0) {
    const fallbackRes = await payload.find({
      collection: "posts",
      where: {
        slug: {
          not_equals: slug,
        },
      },
      limit: 3,
      sort: "-publishedDate",
      locale,
    });
    relatedPosts = fallbackRes.docs as Post[];
  }

  const commonCtaResult = await payload.find({
    collection: "media",
    where: {
      filename: {
        equals: "blur1.webp",
      },
    },
  });
  const commonCtaImage = commonCtaResult.docs[0] as Media | undefined;

  const backgroundImageResult = await payload.find({
    collection: "media",
    where: {
      filename: {
        equals: "about-texture_compressed-3.avif",
      },
    },
  });
  const backgroundImage = backgroundImageResult.docs[0] as Media | undefined;

  const aboutHeroProps: AboutHeroBlockType = {
    breadcrumb: [
      { href: "/", text: "Home", id: "1" },
      { href: "/blog", text: "Blog", id: "2" },
      { text: "Article", id: "3" },
    ],
    title: post.title,
    subtitle: post.excerpt,
    backgroundImage: post.featuredImage,
    tags: post.tags?.map((tag, index) => ({
      tag: tag,
      id: `${index}`,
      href: tag.replace(" ", "-").toLowerCase(),
    })),
    blockType: "about-hero",
  };

  const relatedPostsProps: RelatedPostsBlockType = {
    blockType: "related-posts",
    titleBeforeHighlight: "Related Articles",
    readMoreText: "Explore Article",
    selectedPosts: relatedPosts,
  };

  const commonCtaProps: CommonCtaBlockType = {
    blockType: "common-cta",
    title: "Have a complex idea ? Reach out and Let’s engineer it .",
    description: `Tell us about the business problem, users, existing systems, required integrations, 
expected timeline, and desired outcome. We will help identify the right architecture, scope, and delivery path.`,
    primaryCtaHref: "/contact-us",
    primaryCtaText: "Book Consultation",
    secondaryCtaHref: "/contact-us",
    secondaryCtaText: "Contact Us",
    backgroundImage: commonCtaImage,
  };

  const bgUrl = getMediaUrl(backgroundImage);
  const bgAlt = getMediaAlt(backgroundImage, "Background");

  return (
    <main className="min-h-screen">
      <AboutHeroBlock {...aboutHeroProps} />

      {/* Article Content & Sidebar Section */}
      <section className="py-12 lg:py-16 relative">
        <BackgroundOverlay src={bgUrl} alt={bgAlt} opacityClass="opacity-3" />
        <div className="container mx-auto px-4 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column: Rich Text Content */}
            <article className="lg:col-span-9 space-y-8">
              <RichText html={richTextHtml} />

              {/* Mobile (< lg:) Sidebar Elements below article content without TOC */}
              <div className="lg:hidden space-y-6 pt-8 border-t border-outline/20">
                <AuthorBox author={authorDoc} />
                <ShareBox title={post.title} slug={post.slug} />
              </div>
            </article>

            {/* Right Column: Sticky Sidebar on Large Screens */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="lg:sticky lg:top-25 space-y-6 self-start">
                <AuthorBox author={authorDoc} />
                <ShareBox title={post.title} slug={post.slug} />
                <TableOfContents headings={headings} />
              </div>
            </aside>
          </div>
        </div>
      </section>

      <RelatedPostsBlock {...relatedPostsProps} />
      <CommonCtaBlock {...commonCtaProps} />
    </main>
  );
}
