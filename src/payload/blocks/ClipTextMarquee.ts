import type { Block } from 'payload'

export const ClipTextMarquee: Block = {
  slug: 'clip-text-marquee',
  interfaceName: 'ClipTextMarqueeBlock',
  fields: [
    {
      name: 'clipImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'textBeforeHighlight',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'highlightedText',
      type: 'text',
      required: false,
      localized: true,
    },
    {
      name: 'textAfterHighlight',
      type: 'text',
      required: false,
      localized: true,
    },
    {
      name: 'marqueeIcons',
      type: 'array',
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
          required: false,
          localized: true,
        },
      ],
      admin: {
        initCollapsed: true,
      },
    },
  ],
}
