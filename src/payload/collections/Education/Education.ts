import type { CollectionConfig } from 'payload/types'

import { adminsOrLoggedIn } from '../../access/adminsOrLoggedIn'

const Education: CollectionConfig = {
  slug: 'education_level',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
    create: adminsOrLoggedIn,
    update: adminsOrLoggedIn,
    delete: adminsOrLoggedIn,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
  ],
}

export default Education
