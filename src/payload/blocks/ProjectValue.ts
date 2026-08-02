import type { Block } from "payload";
import { highlightedTitleAndEyebrowFields } from "../fields/highlightedTitleAndEyebrow";

export const ProjectValue: Block = {
  slug: "project-value",
  interfaceName: "ProjectValueBlock",
  fields: [
    ...highlightedTitleAndEyebrowFields,
    {
      name: "textureWavesImage",
      type: "upload",
      relationTo: "media",
      required: false,
    },
    {
      name: "items",
      type: "array",
      fields: [
        {
          name: "iconSvg",
          type: "textarea",
          required: false,
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
