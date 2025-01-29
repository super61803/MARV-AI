import { slateEditor } from '@payloadcms/richtext-slate'
import type { CollectionConfig } from 'payload/types'

import { adminsOrLoggedIn } from '../../access/adminsOrLoggedIn'

const Gallery: CollectionConfig = {
  slug: 'gallery',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: adminsOrLoggedIn,
    create: adminsOrLoggedIn,
    update: adminsOrLoggedIn,
    delete: adminsOrLoggedIn,
  },
  fields: [
    {
      name: 'marvelerId',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'couselorId',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'media',
      type: 'array',
      fields: [
        {
          name: 'mediaItem',
          type: 'relationship',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'richText',
          editor: slateEditor({
            admin: {
              elements: ['link'],
            },
          }),
        },
      ],
      required: true,
    },
  ],
}

export default Gallery
