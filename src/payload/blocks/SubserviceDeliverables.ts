import type { Block } from "payload";
import { highlightedTitleAndEyebrowFields } from "../fields/highlightedTitleAndEyebrow";

export const SubserviceDeliverables: Block = {
  slug: "subservice-deliverables",
  interfaceName: "SubserviceDeliverablesBlock",
  fields: [
    ...highlightedTitleAndEyebrowFields,
    {
      name: "deliverables",
      type: "array",
      fields: [
        {
          name: "deliverable",
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
      name: "markerSvg",
      type: "textarea",
      required: false,
    },
    {
      name: "backgroundImage",
      type: "upload",
      relationTo: "media",
      required: false,
    },
  ],
};
