import { slateEditor } from '@payloadcms/richtext-slate'
import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'
import { anyone } from '../../access/anyone'
import adminsAndUser from './access/adminsAndUser'
import { checkRole } from './checkRole'
import { customerProxy } from './endpoints/customer'
import { createStripeCustomer } from './hooks/createStripeCustomer'
import { ensureFirstUserIsAdmin } from './hooks/ensureFirstUserIsAdmin'
import { loginAfterCreate } from './hooks/loginAfterCreate'
import { resolveDuplicatePurchases } from './hooks/resolveDuplicatePurchases'
import { CustomerSelect } from './ui/CustomerSelect'

const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email'],
  },
  access: {
    read: adminsAndUser,
    create: anyone,
    update: adminsAndUser,
    delete: admins,
    admin: ({ req: { user } }) => checkRole(['admin'], user),
  },
  hooks: {
    beforeChange: [createStripeCustomer],
    afterChange: [loginAfterCreate],
  },
  auth: true,
  endpoints: [
    {
      path: '/:teamID/customer',
      method: 'get',
      handler: customerProxy,
    },
    {
      path: '/:teamID/customer',
      method: 'patch',
      handler: customerProxy,
    },
  ],
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Personal Information',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: false,
              hidden: true,
            },
            {
              name: 'firstName',
              type: 'text',
              required: true,
            },
            {
              name: 'lastName',
              type: 'text',
              required: true,
            },
            // {
            //   name: 'email',
            //   type: 'email',
            //   unique: true,
            //   required: true,
            // },
            {
              name: 'roles',
              type: 'select',
              hasMany: true,
              defaultValue: ['marveler'],
              options: [
                {
                  label: 'admin',
                  value: 'admin',
                },
                {
                  label: 'Marveler',
                  value: 'marveler',
                },
                {
                  label: 'Counselor',
                  value: 'counselor',
                },
                {
                  label: 'Manager',
                  value: 'manager',
                },
                {
                  label: 'Support',
                  value: 'support',
                },
              ],
              hooks: {
                beforeChange: [ensureFirstUserIsAdmin],
              },
              access: {
                read: admins,
                create: admins,
                update: admins,
              },
            },
            {
              name: 'date_of_birth',
              type: 'date',
              required: true,
            },
            {
              name: 'phoneNumber',
              type: 'text',
              required: true,
            },
            {
              name: 'profile_img',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'gender',
              type: 'radio',
              options: [
                {
                  label: 'Male',
                  value: 'male',
                },
                {
                  label: 'Female',
                  value: 'female',
                },
                {
                  label: 'Other',
                  value: 'other',
                },
              ],
              required: true,
            },
            {
              name: 'nationality',
              type: 'relationship',
              relationTo: 'countries',
              hasMany: false,
              required: false,
            },
            {
              name: 'pronouns',
              type: 'select',
              defaultValue: ['he/him'],
              options: [
                {
                  label: 'She/Her',
                  value: 'she/her',
                },
                {
                  label: 'He/Him',
                  value: 'he/him',
                },
                {
                  label: 'They/Them',
                  value: 'they/them',
                },
                {
                  label: 'Other',
                  value: 'other',
                },
              ],
            },
            {
              name: 'notes',
              type: 'richText',
              editor: slateEditor({
                admin: {
                  elements: [
                    'h1',
                    'h2',
                    'h3',
                    'h4',
                    'h5',
                    'h6',
                    'blockquote',
                    'link',
                    'indent',
                    'textAlign',
                    'ol',
                    'ul',
                  ],
                },
              }),
            },
          ],
        },
        {
          label: 'Contact Information',
          fields: [
            {
              name: 'city',
              type: 'text',
              required: false,
            },
            {
              name: 'years_in_city',
              type: 'number',
              required: false,
            },
            {
              name: 'facebook',
              type: 'text',
              required: false,
            },
            {
              name: 'twitter',
              type: 'text',
              required: false,
            },
            {
              name: 'instagram',
              type: 'text',
              required: false,
            },
            {
              name: 'linkedIn',
              type: 'text',
              required: false,
            },
          ],
        },
        {
          label: 'Background information',
          fields: [
            {
              name: 'certifications',
              type: 'relationship',
              relationTo: 'certifications',
              required: false,
            },
            {
              name: 'education',
              type: 'relationship',
              relationTo: 'education_level',
              required: false,
            },
            {
              name: 'career_history',
              type: 'textarea',
              required: false,
            },
            {
              name: 'has_special_needs',
              type: 'checkbox',
              required: false,
            },
            {
              name: 'is_smoker',
              type: 'checkbox',
              required: false,
            },
            {
              name: 'allergies',
              type: 'relationship',
              relationTo: 'allergies',
              hasMany: true,
              required: false,
            },
            {
              name: 'has_vehicle',
              type: 'checkbox',
              required: false,
            },
            {
              name: 'vehicle_type',
              type: 'text',
              required: false,
            },
          ],
        },
        {
          label: 'Experience Personalization',
          fields: [
            {
              name: 'bio',
              type: 'richText',
              editor: slateEditor({
                admin: {
                  elements: [
                    'h1',
                    'h2',
                    'h3',
                    'h4',
                    'h5',
                    'h6',
                    'blockquote',
                    'link',
                    'indent',
                    'textAlign',
                    'ol',
                    'ul',
                  ],
                },
              }),
              required: false,
            },
            {
              name: 'native_language',
              type: 'relationship',
              relationTo: 'languages',
              hasMany: false,
              required: false,
            },
            {
              name: 'spoken_languages',
              type: 'relationship',
              relationTo: 'languages',
              hasMany: true,
              required: false,
            },
            {
              name: 'keywords',
              type: 'relationship',
              relationTo: 'keywords',
              hasMany: true,
              required: false,
            },
          ],
        },
        {
          label: 'payment information',
          fields: [
            {
              name: 'stripeCustomerID',
              label: 'Stripe Customer',
              type: 'text',
              access: {
                read: ({ req: { user } }) => checkRole(['admin'], user),
              },
              admin: {
                position: 'sidebar',
                components: {
                  Field: CustomerSelect,
                },
              },
            },
            {
              label: 'Cart',
              name: 'cart',
              type: 'group',
              fields: [
                {
                  name: 'items',
                  label: 'Items',
                  type: 'array',
                  interfaceName: 'CartItems',
                  fields: [
                    {
                      name: 'product',
                      type: 'relationship',
                      relationTo: 'products',
                    },
                    {
                      name: 'quantity',
                      type: 'number',
                      min: 0,
                      admin: {
                        step: 1,
                      },
                    },
                  ],
                },
                {
                  name: 'createdOn',
                  label: 'Created On',
                  type: 'date',
                  admin: {
                    readOnly: true,
                  },
                },
                {
                  name: 'lastModified',
                  label: 'Last Modified',
                  type: 'date',
                  admin: {
                    readOnly: true,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'purchases',
      label: 'Purchases',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      hooks: {
        beforeChange: [resolveDuplicatePurchases],
      },
    },
    {
      name: 'skipSync',
      label: 'Skip Sync',
      type: 'checkbox',
      admin: {
        position: 'sidebar',
        readOnly: true,
        hidden: true,
      },
    },
    {
      name: 'subscribe_to_news',
      type: 'checkbox',
      required: false,
    },
  ],
  timestamps: true,
}

export default Users
