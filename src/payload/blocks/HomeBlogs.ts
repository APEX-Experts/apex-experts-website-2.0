import type { Block } from "payload";

export const HomeBlogs: Block = {
  slug: "home-blogs",
  interfaceName: "HomeBlogsBlock",
  fields: [
    {
      name: "eyebrow",
      type: "text",
      required: false,
      localized: true,
    },
    {
      name: "titleBeforeHighlight",
      type: "text",
      required: false,
      localized: true,
    },
    {
      name: "highlightedTitle",
      type: "text",
      required: false,
      localized: true,
    },
    {
      name: "titleAfterHighlight",
      type: "text",
      required: false,
      localized: true,
    },
    {
      name: "subtitle",
      type: "textarea",
      required: false,
      localized: true,
    },
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
