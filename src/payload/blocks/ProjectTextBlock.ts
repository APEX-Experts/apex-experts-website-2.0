import type { Block } from "payload";
import { highlightedTitleAndEyebrowFields } from "../fields/highlightedTitleAndEyebrow";

export const ProjectTextBlock: Block = {
  slug: "project-text-block",
  interfaceName: "ProjectTextBlockBlock",
  fields: [
    ...highlightedTitleAndEyebrowFields,
    {
      name: "backgroundImage",
      type: "upload",
      relationTo: "media",
      required: false,
    },
    {
      name: "wavesTextureImage",
      type: "upload",
      relationTo: "media",
      required: false,
    },
  ],
};
