import { GlobalConfig } from "payload";
import { revalidateGlobalHook } from "@/payload/globals/revalidateHook";
import { lucideIconOptions } from "../blocks/icons";

/**
 * Payload CMS Global configuration for the site Header.
 * Defines branding, navigation links, mega menus, and the primary action button.
 */
export const Header: GlobalConfig = {
  slug: "header",
  label: "Header",

  admin: {
    group: "Global",
  },

  hooks: {
    afterChange: [revalidateGlobalHook("header")],
  },

  fields: [
    {
      name: "brandName",
      type: "text",
      required: true,
      defaultValue: "APEX Experts",
      localized: true,
    },

    {
      name: "logoSvg",
      type: "textarea",
      admin: {
        description:
          "Paste your SVG code here. Use currentColor for fill/stroke to support theme colors.",
      },
    },

    {
      name: "navItems",
      type: "array",

      fields: [
        {
          name: "label",
          type: "text",
          required: true,
          localized: true,
        },

        {
          name: "link",
          type: "text",
          required: true,
        },

        {
          name: "megaMenu",
          type: "group",

          admin: {
            description: "Optional mega menu content for this navigation item.",
          },

          fields: [
            {
              name: "title",
              type: "text",
              required: false,
              localized: true,
            },

            {
              name: "items",
              type: "array",

              fields: [
                {
                  name: "title",
                  type: "text",
                  required: true,
                  localized: true,
                },

                {
                  name: "subtitle",
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
                  name: "iconSvg",
                  type: "textarea",
                  required: false,
                },
                {
                  name: "sublist",
                  type: "array",
                  required: false,
                  admin: {
                    initCollapsed: true,
                  },
                  fields: [
                    {
                      name: "title",
                      type: "text",
                      required: true,
                      localized: true,
                    },
                  ],
                },

                {
                  name: "subitems",
                  type: "array",

                  fields: [
                    {
                      name: "title",
                      type: "text",
                      required: true,
                      localized: true,
                    },

                    {
                      name: "icon",
                      type: "select",
                      required: true,
                      options: lucideIconOptions,
                    },

                    {
                      name: "description",
                      type: "textarea",
                      required: true,
                      localized: true,
                    },

                    {
                      name: "href",
                      type: "text",
                      required: true,
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

              admin: {
                initCollapsed: true,
              },
            },
          ],
        },
      ],

      admin: {
        initCollapsed: true,
      },
    },
  ],
};
