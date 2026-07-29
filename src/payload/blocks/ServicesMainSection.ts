import type { Block } from "payload";
import { highlightedTitleAndEyebrowFields } from "../fields/highlightedTitleAndEyebrow";

export const ServicesMainSection: Block = {
  slug: "services-main-section",
  interfaceName: "ServicesMainSectionBlock",
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
      name: "services",
      type: "array",
      fields: [
        {
          name: "cardBackgroundImage",
          type: "upload",
          relationTo: "media",
          required: false,
        },
        {
          name: "eyebrow",
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
          name: "description",
          type: "textarea",
          required: true,
          localized: true,
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
        {
          name: "subservices",
          type: "array",
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
              localized: true,
            },
            {
              name: "subtitle",
              type: "text",
              required: false,
              localized: true,
            },
            {
              name: "href",
              type: "text",
              required: false,
            },
          ],
          admin: {
            initCollapsed: true,
          },
        },
      ],
      admin: {
        initCollapsed: true,
      },
    },
  ],
};
