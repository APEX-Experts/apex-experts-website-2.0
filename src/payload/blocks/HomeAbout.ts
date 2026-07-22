import type { Block } from 'payload'

export const HomeAbout: Block = {
  slug: 'home-about',
  interfaceName: 'HomeAboutBlock',
  fields: [
    {
      name: 'clipImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'eyebrow',
      type: 'text',
      required: false,
      localized: true,
    },
    {
      name: 'titleBeforeHighlight',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'highlightedTitle',
      type: 'text',
      required: false,
      localized: true,
    },
    {
      name: 'titleAfterHighlight',
      type: 'text',
      required: false,
      localized: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
      required: false,
      localized: true,
    },
    {
      name: 'list',
      type: 'array',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          required: false,
          localized: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          localized: true,
        },
      ],
      admin: {
        initCollapsed: true,
      },
    },
     {
      name: 'backgroundTexture',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
     {
      name: 'leftBackgroundTexture',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
  ],
}
