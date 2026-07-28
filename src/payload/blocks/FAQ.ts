import type { Block } from "payload";
import { highlightedTitleAndEyebrowFields } from "../fields/highlightedTitleAndEyebrow";

export const FAQ: Block = {
  slug: "faq",
  interfaceName: "FAQBlock",
  fields: [
    ...highlightedTitleAndEyebrowFields,
    {
      name: "ctaImage",
      type: "upload",
      relationTo: "media",
      required: false,
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
    {
      name: "ctaEyebrow",
      type: "text",
      required: false,
      localized: true,
    },
    {
      name: "ctaTitle",
      type: "text",
      required: false,
      localized: true,
    },
    {
      name: "ctaSubtitle",
      type: "textarea",
      required: false,
      localized: true,
    },
    {
      name: "ctaButtonText",
      type: "text",
      required: false,
      localized: true,
    },
    {
      name: "questions",
      type: "array",
      fields: [
        {
          name: "question",
          type: "text",
          required: true,
          localized: true,
        },
        {
          name: "answer",
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
