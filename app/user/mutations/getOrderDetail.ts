const stripe = require("stripe")("sk_test_82ovHoFijDtMnCdxVZ9ZYWnI00v235rr92")

type StripeCheckoutSessionIdInput = {
  checkoutSessionId?: string
}
export default async function getOrderDetail({ checkoutSessionId }: StripeCheckoutSessionIdInput) {
  console.log(checkoutSessionId)
  const session = await stripe.checkout.sessions.retrieve(checkoutSessionId)
  const customer = await stripe.customers.retrieve(session.customer)
  return { session, customer }
}
