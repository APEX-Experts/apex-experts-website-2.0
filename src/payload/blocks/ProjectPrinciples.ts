import type { Block } from "payload";
import { highlightedTitleAndEyebrowFields } from "../fields/highlightedTitleAndEyebrow";

export const ProjectPrinciples: Block = {
  slug: "project-principles",
  interfaceName: "ProjectPrinciplesBlock",
  fields: [
    ...highlightedTitleAndEyebrowFields,
    {
      name: "backgroundImage",
      type: "upload",
      relationTo: "media",
      required: false,
    },
    {
      name: "cardForegroundImage",
      type: "upload",
      relationTo: "media",
      required: false,
    },
    {
      name: "principles",
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
