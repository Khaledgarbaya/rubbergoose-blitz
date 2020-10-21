import { SessionContext } from "blitz"
import db from "db"
const stripe = require("stripe")("sk_test_82ovHoFijDtMnCdxVZ9ZYWnI00v235rr92")

type StripeSessionIdInput = {
  courseId: number
}
export default async function getStripeSessionId(
  { courseId }: StripeSessionIdInput,
  ctx: { session?: SessionContext } = {}
) {
  if (!ctx.session?.userId) return null
  const course = await db.course.findOne({ where: { id: courseId } })
  if (!course) return null
  const user = await db.user.findOne({
    where: { id: ctx.session!.userId },
    select: { email: true, stripe_customer_id: true },
  })

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price: course.stripe_price_id,
        quantity: 1,
      },
    ],
    payment_intent_data: {
      metadata: {
        slug: course.slug,
        courseId: course.id,
      },
    },
    customer: user?.stripe_customer_id,
    mode: "payment",
    success_url: "http://localhost:3000/user/shop/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "http://localhost:3000/user/shop/cancel",
  })
  return { sessionId: session.id }
}
