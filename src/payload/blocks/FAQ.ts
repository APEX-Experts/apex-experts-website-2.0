import type { Block } from "payload";

export const FAQ: Block = {
  slug: "faq",
  interfaceName: "FAQBlock",
  fields: [
    {
      name: "eyebrow",
      type: "text",
      required: false,
      localized: true,
    },
    {
      name: "titleBeforeHighlight",
      type: "text",
      required: false,
      localized: true,
    },
    {
      name: "highlightedTitle",
      type: "text",
      required: false,
      localized: true,
    },
    {
      name: "titleAfterHighlight",
      type: "text",
      required: false,
      localized: true,
    },
    {
      name: "subtitle",
      type: "textarea",
      required: false,
      localized: true,
    },
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
