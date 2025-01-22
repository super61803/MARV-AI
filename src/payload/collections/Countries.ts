import type { CollectionConfig } from 'payload/types'

const Countries: CollectionConfig = {
  slug: 'countries',
  admin: {
    useAsTitle: 'NAME_EN',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'NAME_EN',
      type: 'text',
    },
    {
      name: 'NAME_AR',
      type: 'text',
    },
    {
      name: 'ALPHA2_CODE',
      type: 'text',
    },
    {
      name: 'ALPHA3_CODE',
      type: 'text',
    },
    {
      name: 'PHONE_CODE',
      type: 'text',
    },
  ],
}

export default Countries
