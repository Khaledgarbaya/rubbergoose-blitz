import { buffer } from "micro"
import Cors from "micro-cors"

import { NextApiRequest, NextApiResponse } from "next"
//import db from "db"
// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys
import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_SKEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2020-08-27",
})

// Find your endpoint's secret in your Dashboard's webhook settings
const webhookSecret = process.env.WEBHOOK_SECRET!

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
  // const user = await db.user.findOne({where:{email: session.customer.email}})
  // if(!user) return
  // const courseMembership = await db.courseMembership.create({data:{
  //   user:user,
  //   course: course
  // }})
  console.log("Fulfilling order", JSON.stringify(session))
}
const createOrder = (session) => {
  // TODO: fill me in
  console.log("Creating order", session)
}

const emailCustomerAboutFailedPayment = (session) => {
  // TODO: fill me in
  console.log("Emailing customer", session)
}
const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const buf = await buffer(req)

    const sig = req.headers["stripe-signature"]!

    console.log(`❌ ----------------------------------`)
    console.log(`❌ req buffer: ${buf.toString()}`)
    console.log(`❌ req sig: ${sig}`)
    console.log(`❌ ----------------------------------`)

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
    // Cast event data to Stripe object.
    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log(`💰 PaymentIntent status: ${paymentIntent.status}`)
    } else if (event.type === "payment_intent.payment_failed") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log(`❌ Payment failed: ${paymentIntent.last_payment_error?.message}`)
    } else if (event.type === "charge.succeeded") {
      const charge = event.data.object as Stripe.Charge
      console.log(`💵 Charge id: ${charge.id}`)
    } else {
      console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`)
    }
    // Return a response to acknowledge receipt of the event.
    res.json({ received: true })
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}

export default cors(webhookHandler as any)
