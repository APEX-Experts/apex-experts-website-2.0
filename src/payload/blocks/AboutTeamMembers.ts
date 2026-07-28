import type { Block } from "payload";
import { highlightedTitleAndEyebrowFields } from "../fields/highlightedTitleAndEyebrow";

export const AboutTeamMembers: Block = {
  slug: "about-team-members",
  interfaceName: "AboutTeamMembersBlock",
  fields: [
    ...highlightedTitleAndEyebrowFields,
    {
      name: "textureWavesImage",
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
      name: "members",
      type: "array",
      fields: [
        {
          name: "photo",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "name",
          type: "text",
          required: true,
          localized: true,
        },
        {
          name: "role",
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
