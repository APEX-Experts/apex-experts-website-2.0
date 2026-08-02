import type { Block } from "payload";
import { highlightedTitleAndEyebrowFields } from "../fields/highlightedTitleAndEyebrow";

export const SubservicePipeline: Block = {
  slug: "subservice-pipeline",
  interfaceName: "SubservicePipelineBlock",
  fields: [
    ...highlightedTitleAndEyebrowFields,
    {
      name: "pipeline",
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
          name: "images",
          type: "array",
          maxRows: 3,
          fields: [
            {
              name: "image",
              type: "upload",
              relationTo: "media",
              required: true,
            },
          ],
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
