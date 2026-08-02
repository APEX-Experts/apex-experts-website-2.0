import type { Block } from "payload";
import { highlightedTitleAndEyebrowFields } from "../fields/highlightedTitleAndEyebrow";

export const SubserviceUseCases: Block = {
  slug: "subservice-use-cases",
  interfaceName: "SubserviceUseCasesBlock",
  fields: [
    ...highlightedTitleAndEyebrowFields,
    {
      name: "backgroundImage",
      type: "upload",
      relationTo: "media",
      required: false,
    },
    {
      name: "foregroundImage",
      type: "upload",
      relationTo: "media",
      required: false,
    },
    {
      name: "capabilities",
      type: "array",
      fields: [
        {
          name: "eyebrow",
          type: "text",
          required: false,
          localized: true,
        },
        {
          name: "supertitle",
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
          required: true,
          localized: true,
        },
        {
          name: "useCasesLabel",
          type: "text",
          required: false,
          localized: true,
        },
        {
          name: "useCases",
          type: "array",
          dbName: "pg_svc_uc_cap_uc",
          fields: [
            {
              name: "useCase",
              type: "text",
              required: true,
              localized: true,
            },
          ],
        },
        {
          name: "sideNoteIconSvg",
          type: "textarea",
          required: false,
        },
        {
          name: "sideNoteTitle",
          type: "text",
          required: false,
          localized: true,
        },
        {
          name: "sideNoteDescription",
          type: "textarea",
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
