import type { Block } from "payload";

export const AboutWhoWeAre: Block = {
  slug: "about-who-we-are",
  interfaceName: "AboutWhoWeAreBlock",
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
      required: true,
      localized: true,
    },
    {
      name: "highlightedTitle",
      type: "text",
      required: true,
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
      name: "stats",
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
      name: "cards",
      type: "array",
      fields: [
        {
          name: "eyebrow",
          type: "text",
          required: false,
          localized: true,
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
          required: false,
          localized: true,
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: false,
        },
      ],
      admin: {
        initCollapsed: true,
      },
    },
    {
      name: "marqueeIcons",
      type: "array",
      fields: [
        {
          name: "icon",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "alt",
          type: "text",
          required: false,
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
  ],
};
