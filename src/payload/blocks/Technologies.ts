import type { Block } from "payload";
import { lucideIconOptions } from "./icons";
import { highlightedTitleAndEyebrowFields } from "../fields/highlightedTitleAndEyebrow";

export const Technologies: Block = {
  slug: "technologies",
  interfaceName: "TechnologiesBlock",
  fields: [
    ...highlightedTitleAndEyebrowFields,
    {
      name: "wavesTexture",
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
      name: "servicesBackgroundImage",
      type: "upload",
      relationTo: "media",
      required: false,
    },
    {
      name: "services",
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
          name: "subtitle",
          type: "textarea",
          required: false,
          localized: true,
        },
        {
          name: "technologiesBackgroundImage",
          type: "upload",
          relationTo: "media",
          required: false,
        },
        {
          name: "technologies",
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
              name: "icon",
              type: "select",
              required: true,
              options: lucideIconOptions,
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
