import type { Block } from "payload";

export const ContactForm: Block = {
  slug: "contact-form",
  interfaceName: "ContactFormBlock",
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
      name: "formBackgroundImage",
      type: "upload",
      relationTo: "media",
      required: false,
    },
    {
      name: "formForegroundImage",
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
      name: "formFields",
      type: "array",
      required: true,
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "label",
          type: "text",
          required: true,
          localized: true,
        },
        {
          name: "type",
          type: "select",
          required: true,
          defaultValue: "text",
          options: [
            { label: "Text", value: "text" },
            { label: "Textarea", value: "textarea" },
            { label: "Email", value: "email" },
            { label: "Password", value: "password" },
            { label: "Phone", value: "phone" },
          ],
        },
        {
          name: "placeholder",
          type: "text",
          required: false,
          localized: true,
        },
        {
          name: "description",
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
      name: "formSubmitButtonText",
      type: "text",
      required: false,
      localized: true,
    },
  ],
};
