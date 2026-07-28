import type { Block } from "payload";
import { lucideIconOptions } from "./icons";
import { highlightedTitleAndEyebrowFields } from "../fields/highlightedTitleAndEyebrow";

export const Capabilities: Block = {
  slug: "capabilities",
  interfaceName: "CapabilitiesBlock",
  fields: [
    ...highlightedTitleAndEyebrowFields,
    {
      name: "textureImage",
      type: "upload",
      relationTo: "media",
      required: false,
      
    },
    {
      name: "viewAllText",
      type: "text",
      required: true,
      defaultValue: "View All Services",
    },
    {
      name: "capabilities",
      type: "array",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          localized: true,
        },
        {
          name: "countTitle",
          type: "text",
          required: false,
          localized: true,
        },
        {
          name: "countDescription",
          type: "text",
          required: false,
          localized: true,
        },
        {
          name: "backgroundImage",
          type: "upload",
          relationTo: "media",
          required: false,
        },
        {
          name: "icon",
          type: "select",
          required: true,
          options: lucideIconOptions,
        },
        {
          name: "description",
          type: "textarea",
          required: false,
          localized: true,
        },
        {
          name: "href",
          type: "text",
          required: false,
        },
        {
          name: "services",
          type: "array",
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
              localized: true,
            },
            {
              name: "icon",
              type: "select",
              required: true,
              options: lucideIconOptions,
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
