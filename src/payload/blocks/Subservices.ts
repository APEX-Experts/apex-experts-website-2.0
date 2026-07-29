import type { Block } from "payload";
import { highlightedTitleAndEyebrowFields } from "../fields/highlightedTitleAndEyebrow";

export const Subservices: Block = {
  slug: "subservices",
  interfaceName: "SubservicesBlock",
  fields: [
    ...highlightedTitleAndEyebrowFields,
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
    {
      name: "countGroup",
      type: "group",
      fields: [
        {
          name: "countTitle",
          type: "text",
          required: false,
          localized: true,
        },
        {
          name: "countDescription",
          type: "textarea",
          required: false,
          localized: true,
        },
        {
          name: "countBackgroundImage",
          type: "upload",
          relationTo: "media",
          required: false,
        },
      ],
    },
    {
      name: "subservices",
      type: "array",
      fields: [
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
        {
          name: "ctaText",
          type: "text",
          required: false,
          localized: true,
        },
        {
          name: "ctaHref",
          type: "text",
          required: false,
        },
      ],
      admin: {
        initCollapsed: true,
      },
    },
  ],
};
