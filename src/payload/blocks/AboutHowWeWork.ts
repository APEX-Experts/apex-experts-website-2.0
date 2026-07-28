import type { Block } from "payload";
import { highlightedTitleAndEyebrowFields } from "../fields/highlightedTitleAndEyebrow";

export const AboutHowWeWork: Block = {
  slug: "about-how-we-work",
  interfaceName: "AboutHowWeWorkBlock",
  fields: [
    ...highlightedTitleAndEyebrowFields,
    {
      name: "textureWavesImage",
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
      name: "steps",
      type: "array",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          localized: true,
        },
        {
          name: "paragraphs",
          type: "array",
          fields: [
            {
              name: "text",
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
      ],
      admin: {
        initCollapsed: true,
      },
    },
    {
      name: "principles",
      type: "array",
      fields: [
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
          name: "icon",
          type: "upload",
          relationTo: "media",
          required: false,
        },
      ],
      admin: {
        initCollapsed: true,
      },
    },
  ],
};
