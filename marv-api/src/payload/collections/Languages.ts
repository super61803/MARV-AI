import type { CollectionConfig } from 'payload/types'

const Languages: CollectionConfig = {
  slug: 'languages',
  admin: {
    useAsTitle: 'value',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'code',
      type: 'text',
    },
    {
      name: 'value',
      type: 'text',
    },
  ],
}

export default Languages
