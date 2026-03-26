import type { PayloadHandler } from 'payload/config'
import type { PayloadRequest } from 'payload/types'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-08-01',
})

const logs = process.env.LOGS_STRIPE_PROXY === '1'

/** Keys passed through to `stripe.customers.update` (profile and billing prefs only). */
const ALLOWED_CUSTOMER_UPDATE_KEYS = [
  'name',
  'email',
  'phone',
  'description',
  'address',
  'shipping',
  'metadata',
  'invoice_settings',
  'preferred_locales',
  'tax_exempt',
] as const

function pickAllowedCustomerUpdateParams(
  body: Record<string, unknown>,
): Partial<Stripe.CustomerUpdateParams> {
  const out: Partial<Stripe.CustomerUpdateParams> = {}
  for (const key of ALLOWED_CUSTOMER_UPDATE_KEYS) {
    if (Object.prototype.hasOwnProperty.call(body, key) && body[key] !== undefined) {
      ;(out as Record<string, unknown>)[key] = body[key]
    }
  }
  return out
}

// use this handler to interact with a Stripe customer associated with any given user
// does so in secure way that does not leak or expose any cross-customer data
// pass the proper method and body to this endpoint to interact with the Stripe API
// available methods:
// GET /api/users/:teamID/customer
// PATCH /api/users/:teamID/customer
// body: subset of Stripe.CustomerUpdateParams (see ALLOWED_CUSTOMER_UPDATE_KEYS)
export const customerProxy: PayloadHandler = async (req: PayloadRequest, res) => {
  const userIdParam = req.params.teamID

  if (!req.user) {
    if (logs) req.payload.logger.error({ err: `You are not authorized to access this customer` })
    res.status(401).json({ error: 'You are not authorized to access this customer' })
    return
  }

  if (userIdParam !== undefined && String(req.user.id) !== String(userIdParam)) {
    res.status(403).json({ error: 'You are not authorized to access this customer' })
    return
  }

  if (!req.user?.stripeCustomerID) {
    const message = `No stripeCustomerID found for user ${String(req.user.id)}`
    if (logs) req.payload.logger.error({ err: message })
    res.status(401).json({ error: message })
    return
  }

  try {
    let response:
      | Stripe.Customer
      | Stripe.DeletedCustomer
      | Array<Stripe.Customer | Stripe.DeletedCustomer>
      | Stripe.ApiList<Stripe.Customer | Stripe.DeletedCustomer>
      | undefined

    let customer: Stripe.Customer | Stripe.DeletedCustomer | null = null

    if (req.user.stripeCustomerID) {
      // look up the customer to ensure that it belongs to the user
      // this will ensure that this user is allows perform operations on it
      customer = await stripe.customers.retrieve(req.user.stripeCustomerID, {
        expand: ['invoice_settings.default_payment_method'],
      })

      if (customer.deleted) {
        res.status(404).json({ error: `Customer ${req.user.stripeCustomerID} not found` })
        return
      }

      // ensure the customer belongs to the user
      if (customer.id !== req.user.stripeCustomerID) {
        res.status(401).json({ error: `You are not authorized to access this customer` })
        return
      }
    }

    if (req.method === 'GET') {
      if (req.user.stripeCustomerID) {
        response = customer
      }
    }

    if (req.method === 'PATCH') {
      if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
        res.status(400).json({ error: 'Request body must be a JSON object' })
        return
      }
      const updateParams = pickAllowedCustomerUpdateParams(req.body as Record<string, unknown>)
      if (Object.keys(updateParams).length === 0) {
        res
          .status(400)
          .json({ error: 'No allowed fields to update', allowedKeys: [...ALLOWED_CUSTOMER_UPDATE_KEYS] })
        return
      }
      response = await stripe.customers.update(req.user.stripeCustomerID, updateParams)
    }

    res.status(200).json(response)
  } catch (error: unknown) {
    if (logs) req.payload.logger.error({ err: `Error using Stripe API: ${error}` })
    res.status(500).json({ error: `Error using Stripe API: ${error}` })
  }
}
