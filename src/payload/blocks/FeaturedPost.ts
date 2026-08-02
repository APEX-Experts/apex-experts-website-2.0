import type { Block } from "payload";
import { highlightedTitleAndEyebrowFields } from "../fields/highlightedTitleAndEyebrow";

export const FeaturedPost: Block = {
  slug: "featured-post",
  interfaceName: "FeaturedPostBlock",
  fields: [
    ...highlightedTitleAndEyebrowFields,
    {
      name: "selectedPost",
      type: "relationship",
      relationTo: "posts",
      required: false,
      admin: {
        description: "Select a specific post to feature. If left empty, the latest published post will be used.",
      },
    },
    {
      name: "readMoreText",
      type: "text",
      required: false,
      localized: true,
      defaultValue: "Read Article",
    },
    {
      name: "backgroundImage",
      type: "upload",
      relationTo: "media",
      required: false,
    },
    {
      name: "textureWavesImage",
      type: "upload",
      relationTo: "media",
      required: false,
    },
  ],
};
