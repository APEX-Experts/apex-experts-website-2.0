import type { Block } from "payload";

export const SubscribeToNewsletter: Block = {
  slug: "subscribe-to-newsletter",
  interfaceName: "SubscribeToNewsletterBlock",
  fields: [
    {
      name: "title",
      type: "text",
      required: false,
      localized: true,
    },
    {
      name: "description",
      type: "textarea",
      required: false,
      localized: true,
    },
    {
      name: "emailInputPlaceholder",
      type: "text",
      required: false,
      localized: true,
    },
    {
      name: "submitButtonText",
      type: "text",
      required: false,
      localized: true,
    },
    {
      name: "backgroundImage",
      type: "upload",
      relationTo: "media",
      required: false,
    },
  ],
};
