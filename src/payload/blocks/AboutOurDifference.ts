import type { Block } from "payload";
import { getHighlightedTitleAndEyebrowFields } from "../fields/highlightedTitleAndEyebrow";

export const AboutOurDifference: Block = {
  slug: "about-our-difference",
  interfaceName: "AboutOurDifferenceBlock",
  fields: [
    ...getHighlightedTitleAndEyebrowFields("header"),
    ...getHighlightedTitleAndEyebrowFields("secondary"),
    {
      name: "items",
      type: "array",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          localized: true,
        },
        {
          name: "description",
          type: "textarea",
          required: true,
          localized: true,
        },
      ],
      admin: {
        initCollapsed: true,
      },
    },
    {
      name: "backgroundImage",
      type: "upload",
      relationTo: "media",
      required: false,
    },
    {
      name: "foregroundImage",
      type: "upload",
      relationTo: "media",
      required: false,
    },
    {
      name: "learnMoreText",
      type: "text",
      required: false,
      localized: true,
    },
    {
      name: "learnMoreHref",
      type: "text",
      required: false,
    },
  ],
};
