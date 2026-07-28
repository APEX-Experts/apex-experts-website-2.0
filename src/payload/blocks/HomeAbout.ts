import type { Block } from 'payload'
import { highlightedTitleAndEyebrowFields } from '../fields/highlightedTitleAndEyebrow'

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
    ...highlightedTitleAndEyebrowFields,
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
