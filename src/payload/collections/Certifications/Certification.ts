import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'

const Certification: CollectionConfig = {
  slug: 'certifications',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
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

export default Certification
