import type { Block } from "payload";

export const ProjectBuiltFor: Block = {
  slug: "project-built-for",
  interfaceName: "ProjectBuiltForBlock",
  fields: [
    {
      name: "backgroundImage",
      type: "upload",
      relationTo: "media",
      required: false,
    },
    {
      name: "cardBackgroundImage",
      type: "upload",
      relationTo: "media",
      required: false,
    },
    {
      name: "foregroundImages",
      type: "array",
      maxRows: 4,
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
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
      name: "bulletPoints",
      type: "array",
      fields: [
        {
          name: "text",
          type: "text",
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
