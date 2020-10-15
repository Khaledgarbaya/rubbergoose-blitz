// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require("stripe")(process.env.STRIPE_SKEY)

// Find your endpoint's secret in your Dashboard's webhook settings
const endpointSecret = process.env.WEBHOOK_SECRET

const fulfillOrder = (session) => {
  // TODO: fill me in
  console.log("Fulfilling order", session)
}
const createOrder = (session) => {
  // TODO: fill me in
  console.log("Creating order", session)
}

const emailCustomerAboutFailedPayment = (session) => {
  // TODO: fill me in
  console.log("Emailing customer", session)
}
const webhook = (request, response) => {
  const payload = request.body
  const sig = request.headers["stripe-signature"]

  let event

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)
  } catch (err) {
    return response.status(400).send(`Webhook Error: ${err.message}`)
  }
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object
      // Save an order in your database, marked as 'awaiting payment'
      createOrder(session)

      // Check if the order is paid (e.g., from a card payment)
      //
      // A delayed notification payment will have an `unpaid` status, as
      // you're still waiting for funds to be transferred from the customer's
      // account.
      if (session.payment_status === "paid") {
        fulfillOrder(session)
      }

      break
    }

    case "checkout.session.async_payment_succeeded": {
      const session = event.data.object

      // Fulfill the purchase...
      fulfillOrder(session)

      break
    }

    case "checkout.session.async_payment_failed": {
      const session = event.data.object

      // Send an email to the customer asking them to retry their order
      emailCustomerAboutFailedPayment(session)

      break
    }
  }

  response.statusCode = 200
  response.end()
}

export default webhook
