import db, { UserWhereUniqueInput } from "db"
import { SessionContext } from "blitz"
export default async function getUser(_ = null, ctx: { session?: SessionContext } = {}) {
  ctx.session!.authorize()
  const user = await db.user.findOne({ where: { id: ctx.session!.userId } })
  return user
}
