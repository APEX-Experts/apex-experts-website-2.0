import type { Block } from "payload";
import { highlightedTitleAndEyebrowFields } from "../fields/highlightedTitleAndEyebrow";

export const WhenYouNeedIt: Block = {
  slug: "when-you-need-it",
  interfaceName: "WhenYouNeedItBlock",
  fields: [
    ...highlightedTitleAndEyebrowFields,
    {
      name: "textureWavesImage",
      type: "upload",
      relationTo: "media",
      required: false,
    },
    {
      name: "backgroundImage",
      type: "upload",
      relationTo: "media",
      required: false,
    },
    {
      name: "items",
      type: "array",
      fields: [
        {
          name: "eyebrow",
          type: "text",
          required: false,
          localized: true,
        },
        {
          name: "supertitle",
          type: "text",
          required: false,
          localized: true,
        },
        {
          name: "title",
          type: "text",
          required: true,
          localized: true,
        },
        {
          name: "subtitle",
          type: "textarea",
          required: false,
          localized: true,
        },
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
        },
      ],
      admin: {
        initCollapsed: true,
      },
    },
  ],
};
