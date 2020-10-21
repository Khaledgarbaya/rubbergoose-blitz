import { buffer } from "micro"
import Cors from "micro-cors"
import db from "db"
// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys
import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_SKEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2020-08-27",
})

// Find your endpoint's secret in your Dashboard's webhook settings
const webhookSecret: string = process.env.WEBHOOK_SECRET!

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
}
const cors = Cors({
  allowMethods: ["POST", "HEAD"],
})
const fulfillOrder = async (session) => {
  // TODO: fill me in
  const detailedSession: Stripe.Checkout.Session = await stripe.checkout.sessions.retrieve(
    session.id,
    {
      expand: ["payment_intent", "line_items"],
    }
  )
  console.log(`detailedSession: ${JSON.stringify(detailedSession, null, 2)}`)
  const course = await db.course.findOne({
    where: { stripe_price_id: detailedSession.line_items.data[0].price.id },
  })

  const user = await db.user.findFirst({ where: { stripe_customer_id: detailedSession.customer } })
  if (!user) return
  await db.courseMembership.create({
    data: {
      user: { connect: { id: user.id } },
      course: { connect: { id: course.id } },
    },
  })
  console.log(`✅ ----------------------------------`)
  console.log("Fulfilling order", JSON.stringify(session))
  console.log(`✅ ----------------------------------`)
}
const createOrder = (session) => {
  // TODO: fill me in
  console.log(`✅ ----------------------------------`)
  console.log("Creating order", session)
  console.log(`✅  ----------------------------------`)
}

const emailCustomerAboutFailedPayment = (session) => {
  // TODO: fill me in
  console.log(`✅ ----------------------------------`)
  console.log("Emailing customer", session)
  console.log(`✅ ----------------------------------`)
}
const webhookHandler = async (req, res) => {
  if (req.method === "POST") {
    const buf = await buffer(req)
    const sig = req.headers["stripe-signature"]!
    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret)
    } catch (err) {
      // On error, log and return the error message.
      console.log(`❌ Error message: ${err.message}`)
      res.status(400).send(`Webhook Error: ${err.message}`)
      return
    }

    // Successfully constructed event.
    console.log("✅ Success:", event.id)
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session
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
    // Return a response to acknowledge receipt of the event.
    res.json({ received: true })
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}

export default cors(webhookHandler as any)
