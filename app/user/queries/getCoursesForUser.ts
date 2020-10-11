import { SessionContext } from "blitz"
import db, { FindManyCourseMembershipArgs } from "db"

type GetCourseMembershipsInput = {
  orderBy?: FindManyCourseMembershipArgs["orderBy"]
  skip?: FindManyCourseMembershipArgs["skip"]
  take?: FindManyCourseMembershipArgs["take"]
  // Only available if a model relationship exists
  // include?: FindManyCourseArgs['include']
}

export default async function getCoursesForUser(
  { orderBy, skip = 0, take }: GetCourseMembershipsInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()
  const courseMemberships = await db.courseMembership.findMany({
    where: { userId: ctx.session!.userId },
    orderBy,
    take,
    skip,
    include: { course: true },
  })

  const count = await db.courseMembership.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    courseMemberships,
    nextPage,
    hasMore,
  }
}
