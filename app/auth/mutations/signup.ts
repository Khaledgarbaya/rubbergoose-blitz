import db from "db"
import { SessionContext } from "blitz"
import { hashPassword } from "app/auth/auth-utils"
import { SignupInput, SignupInputType } from "app/auth/validations"
import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_SKEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2020-08-27",
})

export default async function signup(
  input: SignupInputType,
  ctx: { session?: SessionContext } = {}
) {
  // This throws an error if input is invalid
  const { email, password, name } = SignupInput.parse(input)
  const cus = await stripe.customers.create({
    email: email,
    name: name,
  })
  const hashedPassword = await hashPassword(password)
  const user = await db.user.create({
    data: { email, hashedPassword, role: "user", name, stripe_customer_id: cus.id },
    select: { id: true, name: true, email: true, role: true, stripe_customer_id: true },
  })

  await ctx.session!.create({ userId: user.id, roles: [user.role] })

  return user
}
