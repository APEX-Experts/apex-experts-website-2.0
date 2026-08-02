import type { Block } from "payload";
import { highlightedTitleAndEyebrowFields } from "../fields/highlightedTitleAndEyebrow";

export const ProjectWhatComesNext: Block = {
  slug: "project-what-comes-next",
  interfaceName: "ProjectWhatComesNextBlock",
  fields: [
    ...highlightedTitleAndEyebrowFields,
    {
      name: "items",
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
      ],
      admin: {
        initCollapsed: true,
      },
    },
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
  ],
};
