import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'

const Rating: CollectionConfig = {
  slug: 'ratings',
  admin: {
    useAsTitle: 'userID',
  },
  access: {
    read: () => true,
    create: () => true,
    update: admins,
    delete: admins,
  },
  fields: [
    {
      name: 'userId',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'keywordId',
      type: 'relationship',
      relationTo: 'keywords',
      required: true,
    },
    {
      name: 'rating',
      type: 'number',
      min: 0,
      max: 10,
      required: true,
    },
  ],
}

export default Rating
