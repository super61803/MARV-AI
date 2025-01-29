import type { CollectionConfig } from 'payload/types'

import { admins } from '../..//access/admins'

const Allergie: CollectionConfig = {
  slug: 'allergies',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: admins,
    create: admins,
    update: admins,
    delete: admins,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
  ],
}

export default Allergie
