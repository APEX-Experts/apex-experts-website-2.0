import type { Block } from "payload";
import { highlightedTitleAndEyebrowFields } from "../fields/highlightedTitleAndEyebrow";

export const RelatedPosts: Block = {
  slug: "related-posts",
  interfaceName: "RelatedPostsBlock",
  fields: [
    ...highlightedTitleAndEyebrowFields,
    {
      name: "selectedPosts",
      type: "relationship",
      relationTo: "posts",
      hasMany: true,
      required: false,
      admin: {
        description: "Select specific posts to display. If left empty, the latest published posts will be displayed.",
      },
    },
    {
      name: "readMoreText",
      type: "text",
      required: false,
      localized: true,
      defaultValue: "Read Article",
    },
  ],
};
