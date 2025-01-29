import type { CollectionConfig } from 'payload/types'

import adminsAndUser from '../Users/access/adminsAndUser'

const Favorite: CollectionConfig = {
  slug: 'favorites',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: adminsAndUser,
    create: adminsAndUser,
    update: adminsAndUser,
    delete: adminsAndUser,
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
  ],
}

export default Favorite
