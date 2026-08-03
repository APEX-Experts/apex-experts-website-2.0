import { postgresAdapter } from "@payloadcms/db-postgres";
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  UnorderedListFeature
} from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";
import { AboutHero } from "./payload/blocks/AboutHero.ts";
import { AboutHowWeWork } from "./payload/blocks/AboutHowWeWork.ts";
import { AboutOurDifference } from "./payload/blocks/AboutOurDifference.ts";
import { AboutTeamMembers } from "./payload/blocks/AboutTeamMembers.ts";
import { AboutWays } from "./payload/blocks/AboutWays.ts";
import { AboutWhoWeAre } from "./payload/blocks/AboutWhoWeAre.ts";
import { Capabilities } from "./payload/blocks/Capabilities.ts";
import { ClipTextMarquee } from "./payload/blocks/ClipTextMarquee.ts";
import { CommonCta } from "./payload/blocks/CommonCta.ts";
import { ContactForm } from "./payload/blocks/ContactForm.ts";
import { ContactWhatWeDeliver } from "./payload/blocks/ContactWhatWeDeliver.ts";
import { Directory } from "./payload/blocks/Directory.ts";
import { FAQ } from "./payload/blocks/FAQ.ts";
import { FeaturedPost } from "./payload/blocks/FeaturedPost.ts";
import { Hero } from "./payload/blocks/Hero.ts";
import { HighlightedTitleAndEyebrow } from "./payload/blocks/HighlightedTitleAndEyebrow.ts";
import { HomeAbout } from "./payload/blocks/HomeAbout.ts";
import { HomeBlogs } from "./payload/blocks/HomeBlogs.ts";
import { Industries } from "./payload/blocks/Industries.ts";
import { MarqueeIcons } from "./payload/blocks/MarqueeIcons.ts";
import { ProjectBuiltFor } from "./payload/blocks/ProjectBuiltFor.ts";
import { ProjectCta } from "./payload/blocks/ProjectCta.ts";
import { ProjectPrinciples } from "./payload/blocks/ProjectPrinciples.ts";
import { Projects } from "./payload/blocks/Projects.ts";
import { ProjectTextBlock } from "./payload/blocks/ProjectTextBlock.ts";
import { ProjectValue } from "./payload/blocks/ProjectValue.ts";
import { ProjectWhatComesNext } from "./payload/blocks/ProjectWhatComesNext.ts";
import { ReadinessCheck } from "./payload/blocks/ReadinessCheck.ts";
import { RelatedPosts } from "./payload/blocks/RelatedPosts.ts";
import { ServicesMainSection } from "./payload/blocks/ServicesMainSection.ts";
import { SubscribeToNewsletter } from "./payload/blocks/SubscribeToNewsletter.ts";
import { SubserviceDeliverables } from "./payload/blocks/SubserviceDeliverables.ts";
import { SubserviceFeaturesSteps } from "./payload/blocks/SubserviceFeaturesAndSteps.ts";
import { SubservicePipeline } from "./payload/blocks/SubservicePipeline.ts";
import { Subservices } from "./payload/blocks/Subservices.ts";
import { SubserviceTextAndTags } from "./payload/blocks/SubserviceTextAndTags.ts";
import { SubserviceUseCases } from "./payload/blocks/SubserviceUseCases.ts";
import { Technologies } from "./payload/blocks/Technologies.ts";
import { WhenYouNeedIt } from "./payload/blocks/WhenYouNeedIt.ts";
import { Media } from "./payload/collections/Media.ts";
import { Pages } from "./payload/collections/Pages.ts";
import { Posts } from "./payload/collections/Posts.ts";
import { Users } from "./payload/collections/Users.ts";
import { Footer } from "./payload/globals/Footer.ts";
import { Header } from "./payload/globals/Header.ts";
import { SiteSettings } from "./payload/globals/SiteSettings.ts";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/**
 * Main Payload CMS configuration file.
 * Defines collections, globals, database adapter, editor, and plugins.
 * Sets up S3 storage if enabled via environment variables.
 */
export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users, Media, Pages, Posts],
  globals: [SiteSettings, Header, Footer],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      HeadingFeature({
        enabledHeadingSizes: ["h1", "h2", "h3", "h4"],
      }),
      UnorderedListFeature(),
      OrderedListFeature(),
      LinkFeature(),
      FixedToolbarFeature(),
      InlineToolbarFeature(),
    ],
  }),
  localization: {
    locales: [
      {
        code: "en",
        label: "English",
      },
      {
        code: "ar",
        label: "Arabic",
        rtl: true,
      },
    ],
    defaultLocale: "en",
    fallback: true,
  },
  secret: process.env.PAYLOAD_SECRET || "fallback-dev-secret-do-not-use-in-prod",
  typescript: {
    // 4. Use the relative dirname instead of process.cwd()
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  sharp,
  plugins: [
    ...(process.env.USE_CLOUD_STORAGE === "true"
      ? [
          s3Storage({
            collections: {
              // Map the plugin to your specific media collection slug
              media: true,
            },
            bucket: process.env.S3_BUCKET as string,
            config: {
              credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
              },
              region: process.env.S3_REGION,
              endpoint: process.env.S3_ENDPOINT,
            },
          }),
        ]
      : []),
  ],
  blocks: [
    Hero,
    AboutHero,
    ClipTextMarquee,
    HomeAbout,
    Capabilities,
    Projects,
    Technologies,
    FAQ,
    HomeBlogs,
    ContactForm,
    SubscribeToNewsletter,
    MarqueeIcons,
    AboutWhoWeAre,
    HighlightedTitleAndEyebrow,
    AboutOurDifference,
    AboutHowWeWork,
    Industries,
    AboutWays,
    AboutTeamMembers,
    ServicesMainSection,
    CommonCta,
    Directory,
    Subservices,
    WhenYouNeedIt,
    ReadinessCheck,
    ContactWhatWeDeliver,
    ProjectPrinciples,
    ProjectValue,
    ProjectCta,
    ProjectBuiltFor,
    ProjectTextBlock,
    ProjectWhatComesNext,
    SubservicePipeline,
    SubserviceFeaturesSteps,
    SubserviceUseCases,
    SubserviceTextAndTags,
    SubserviceDeliverables,
    FeaturedPost,
    RelatedPosts,
  ],
});
