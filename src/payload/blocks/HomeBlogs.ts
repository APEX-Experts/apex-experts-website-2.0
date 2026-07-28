import type { Block } from "payload";
import { highlightedTitleAndEyebrowFields } from "../fields/highlightedTitleAndEyebrow";

export const HomeBlogs: Block = {
  slug: "home-blogs",
  interfaceName: "HomeBlogsBlock",
  fields: [
    ...highlightedTitleAndEyebrowFields,
    {
      name: "viewAllHref",
      type: "text",
      required: false,
      defaultValue: "/blog",
    },
    {
      name: "viewAllText",
      type: "text",
      required: false,
      localized: true,
      defaultValue: "View All Blogs",
    },
    {
      name: "viewArticleText",
      type: "text",
      required: false,
      localized: true,
      defaultValue: "Read Article",
    },
  ],
};
