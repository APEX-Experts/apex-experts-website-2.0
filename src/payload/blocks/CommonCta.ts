import type { Block } from "payload";

export const CommonCta: Block = {
  slug: "common-cta",
  interfaceName: "CommonCtaBlock",
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
      name: "primaryCtaText",
      type: "text",
      required: false,
      localized: true,
    },
    {
      name: "primaryCtaHref",
      type: "text",
      required: false,
    },
    {
      name: "secondaryCtaText",
      type: "text",
      required: false,
      localized: true,
    },
    {
      name: "secondaryCtaHref",
      type: "text",
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
