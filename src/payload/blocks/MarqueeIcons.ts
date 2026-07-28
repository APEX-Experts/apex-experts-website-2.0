import type { Block } from "payload";

export const MarqueeIcons: Block = {
  slug: "marquee-icons",
  interfaceName: "MarqueeIconsBlock",
  fields: [
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
  ],
};
