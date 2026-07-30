import type { Block } from "payload";

export const AboutHero: Block = {
  slug: "about-hero",
  interfaceName: "AboutHeroBlock",
  fields: [
    {
      name: "breadcrumb",
      type: "array",
      required: false,
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
          required: false,
        },
      ],
      admin: {
        initCollapsed: true,
      },
    },
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "subtitle",
      type: "textarea",
      required: false,
      localized: true,
    },
    {
      name: "backgroundImage",
      type: "upload",
      relationTo: "media",
      required: false,
    },
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
  ],
};
