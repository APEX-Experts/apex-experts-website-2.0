import type { Block } from "payload";
import { highlightedTitleAndEyebrowFields } from "../fields/highlightedTitleAndEyebrow";

export const Directory: Block = {
  slug: "directory",
  interfaceName: "DirectoryBlock",
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
      name: "list",
      type: "array",
      fields: [
        {
          name: "icon",
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
