import type { Block } from "payload";
import { highlightedTitleAndEyebrowFields } from "../fields/highlightedTitleAndEyebrow";

export const SubserviceTextAndTags: Block = {
  slug: "subservice-text-and-tags",
  interfaceName: "SubserviceTextAndTagsBlock",
  fields: [
    ...highlightedTitleAndEyebrowFields,
    {
      name: "tags",
      type: "array",
      fields: [
        {
          name: "tag",
          type: "text",
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
  ],
};
