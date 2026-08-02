import type { Block } from "payload";
import { highlightedTitleAndEyebrowFields } from "../fields/highlightedTitleAndEyebrow";

export const ProjectCta: Block = {
  slug: "project-cta",
  interfaceName: "ProjectCtaBlock",
  fields: [
    ...highlightedTitleAndEyebrowFields,
    {
      name: "ctaGroup",
      type: "array",
      fields: [
        {
          name: "text",
          type: "text",
          required: true,
          localized: true,
        },
        {
          name: "href",
          type: "text",
          required: true,
        },
        {
          name: "type",
          type: "select",
          required: true,
          defaultValue: "primary",
          options: [
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
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
  ],
};
