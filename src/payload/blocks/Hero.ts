// src/blocks/Hero.ts

import type { Block } from 'payload'

export const Hero: Block = {
  slug: 'hero',

  interfaceName: 'HeroBlock',

  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'imageAlt',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Alternative text for the hero image',
      },
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
      required: true,
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
      required: true,
      localized: true,
    },

    {
      name: 'ctaPrimaryText',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'ctaPrimaryHref',
      type: 'text',
      required: true,
    },
    {
      name: 'ctaSecondaryText',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'ctaSecondaryHref',
       type: 'text',
      required: true,
    },
    {
      name: 'stats',
      type: 'array',
      maxRows: 3,
      fields: [
        {
          name: 'number',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
      admin: {
        initCollapsed: true,
      },
    },

    {
      name: 'gallery',
      type: 'array',
      maxRows: 8,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
      admin: {
        initCollapsed: true,
      },
    },
  ],
}