import db from "db"
const stripe = require("stripe")("sk_test_82ovHoFijDtMnCdxVZ9ZYWnI00v235rr92")

type StripeSessionIdInput = {
  courseId: number
}
export default async function getStripeSessionId({ courseId }: StripeSessionIdInput) {
  const course = await db.course.findOne({ where: { id: courseId } })
  if (!course) return null

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: course.title,
          },
          unit_amount: course.price,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000/user/shop/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "http://localhost:3000/user/shop/cancel",
  })
  return { sessionId: session.id }
}
