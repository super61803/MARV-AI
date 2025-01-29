import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'

const Keywords: CollectionConfig = {
  slug: 'keywords',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
    create: admins,
    update: admins,
    delete: admins,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
  ],
}

export default Keywords
