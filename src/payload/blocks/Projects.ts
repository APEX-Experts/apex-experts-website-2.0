import type { Block } from "payload";
import { highlightedTitleAndEyebrowFields } from "../fields/highlightedTitleAndEyebrow";

export const Projects: Block = {
  slug: "projects",
  interfaceName: "ProjectsBlock",
  fields: [
    ...highlightedTitleAndEyebrowFields,
    {
      name: "backgroundImage",
      type: "upload",
      relationTo: "media",
      required: false,
    },
    {
      name: "texture",
      type: "upload",
      relationTo: "media",
      required: false,
    },
    {
      name: "projects",
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
          required: false,
          localized: true,
        },
        {
          name: "keywords",
          type: "array",
          fields: [
            {
              name: "keyword",
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
          name: "href",
          type: "text",
          required: false,
        },
        {
          name: "ctaText",
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
          name: "backgroundImageBlur",
          type: "upload",
          relationTo: "media",
          required: false,
        },
        {
          name: "logo",
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
