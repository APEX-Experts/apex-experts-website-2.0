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
            if (value)
              return value
                .toLowerCase()
                .replace(/ /g, "-")
                .replace(/[^\w-]+/g, "");
            if (data?.title)
              return data.title
                .toLowerCase()
                .replace(/ /g, "-")
                .replace(/[^\w-]+/g, "");
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
      ],
      required: true,
    },
  ],
};
