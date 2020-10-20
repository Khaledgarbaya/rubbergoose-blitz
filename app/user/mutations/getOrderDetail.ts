import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_SKEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2020-08-27",
})

type StripeCheckoutSessionIdInput = {
  checkoutSessionId: string
}
export default async function getOrderDetail({ checkoutSessionId }: StripeCheckoutSessionIdInput) {
  const session = await stripe.checkout.sessions.retrieve(checkoutSessionId, {
    expand: ["payment_intent", "line_items"],
  })
  const customer = await stripe.customers.retrieve(session.customer as string)
  return { session, customer }
}
