import type { CollectionConfig } from 'payload/types'

import { adminsOrLoggedIn } from '../../access/adminsOrLoggedIn'

const Review: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'userID',
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
      name: 'counselorId',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'comment',
      type: 'text',
      required: true,
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 0,
      max: 5,
    },
  ],
}

export default Review
