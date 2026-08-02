import type { Block } from "payload";
import { highlightedTitleAndEyebrowFields } from "../fields/highlightedTitleAndEyebrow";

export const ContactWhatWeDeliver: Block = {
  slug: "contact-what-we-deliver",
  interfaceName: "ContactWhatWeDeliverBlock",
  fields: [
    ...highlightedTitleAndEyebrowFields,
    {
      name: "items",
      type: "array",
      fields: [
        {
          name: "item",
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
