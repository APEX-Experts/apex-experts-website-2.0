import type { Block } from "payload";
import { highlightedTitleAndEyebrowFields } from "../fields/highlightedTitleAndEyebrow";

export const SubserviceFeaturesSteps: Block = {
  slug: "subservice-features-steps",
  interfaceName: "SubserviceFeaturesStepsBlock",
  fields: [
    ...highlightedTitleAndEyebrowFields,
    {
      name: "mainIconSvg",
      type: "textarea",
      required: false,
    },
    {
      name: "items",
      type: "array",
      fields: [
        ...highlightedTitleAndEyebrowFields,
        {
          name: "subitems",
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
            {
              name: "backgroundImage",
              type: "upload",
              relationTo: "media",
              required: false,
            },
          ],
        },
      ],
      admin: {
        initCollapsed: true,
      },
    },
    {
      name: "steps",
      type: "array",
      fields: [
        {
          name: "iconSvg",
          type: "textarea",
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
      ],
      admin: {
        initCollapsed: true,
      },
    },
  ],
};
