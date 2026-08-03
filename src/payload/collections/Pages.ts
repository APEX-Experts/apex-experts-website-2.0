import { CollectionConfig } from "payload";
import { Hero } from "../blocks/Hero";
import { AboutHero } from "../blocks/AboutHero";
import { ClipTextMarquee } from "../blocks/ClipTextMarquee";
import { HomeAbout } from "../blocks/HomeAbout";
import { Capabilities } from "../blocks/Capabilities";
import { Projects } from "../blocks/Projects";
import { Technologies } from "../blocks/Technologies";
import { FAQ } from "../blocks/FAQ";
import { HomeBlogs } from "../blocks/HomeBlogs";
import { ContactForm } from "../blocks/ContactForm";
import { SubscribeToNewsletter } from "../blocks/SubscribeToNewsletter";
import { revalidatePageHook } from "../globals/revalidateHook";
import { MarqueeIcons } from "../blocks/MarqueeIcons";
import { AboutWhoWeAre } from "../blocks/AboutWhoWeAre";
import { HighlightedTitleAndEyebrow } from "../blocks/HighlightedTitleAndEyebrow";
import { AboutOurDifference } from "../blocks/AboutOurDifference";
import { AboutHowWeWork } from "../blocks/AboutHowWeWork";
import { Industries } from "../blocks/Industries";
import { AboutWays } from "../blocks/AboutWays";
import { AboutTeamMembers } from "../blocks/AboutTeamMembers";
import { ServicesMainSection } from "../blocks/ServicesMainSection";
import { CommonCta } from "../blocks/CommonCta";
import { Directory } from "../blocks/Directory";
import { Subservices } from "../blocks/Subservices";
import { WhenYouNeedIt } from "../blocks/WhenYouNeedIt";
import { ReadinessCheck } from "../blocks/ReadinessCheck";
import { ContactWhatWeDeliver } from "../blocks/ContactWhatWeDeliver";
import { ProjectPrinciples } from "../blocks/ProjectPrinciples";
import { ProjectValue } from "../blocks/ProjectValue";
import { ProjectCta } from "../blocks/ProjectCta";
import { ProjectBuiltFor } from "../blocks/ProjectBuiltFor";
import { ProjectTextBlock } from "../blocks/ProjectTextBlock";
import { ProjectWhatComesNext } from "../blocks/ProjectWhatComesNext";
import { SubservicePipeline } from "../blocks/SubservicePipeline";
import { SubserviceFeaturesSteps } from "../blocks/SubserviceFeaturesAndSteps";
import { SubserviceUseCases } from "../blocks/SubserviceUseCases";
import { SubserviceTextAndTags } from "../blocks/SubserviceTextAndTags";
import { SubserviceDeliverables } from "../blocks/SubserviceDeliverables";
import { FeaturedPost } from "../blocks/FeaturedPost";
import { RelatedPosts } from "../blocks/RelatedPosts";

/**
 * Payload CMS Collection configuration for dynamic Pages.
 * Allows creating pages with custom layouts using blocks like Hero, Features, and CTA.
 */
export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "updatedAt"],
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidatePageHook],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        position: "sidebar",
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            const formatSlug = (val: string) => {
              return val
                .toLowerCase()
                .replace(/ /g, "-") // Replace spaces with dashes
                .replace(/[^\w-\/]+/g, "") // ALLOW forward slashes, remove other special chars
                .replace(/\/+/g, "/") // Prevent multiple slashes (e.g. 'services//web' -> 'services/web')
                .replace(/^\/|\/$/g, ""); // Remove leading and trailing slashes (e.g. '/about/' -> 'about')
            };

            if (value) return formatSlug(value);
            if (data?.title) return formatSlug(data.title);

            return value;
          },
        ],
      },
    },
    {
      name: "layout",
      type: "blocks",
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
      required: true,
    },
  ],
};
