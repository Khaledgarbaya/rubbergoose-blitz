import { SessionContext } from "blitz"
import db, { FindManyCourseArgs } from "db"

type GetCoursesInput = {
  where?: FindManyCourseArgs["where"]
  orderBy?: FindManyCourseArgs["orderBy"]
  skip?: FindManyCourseArgs["skip"]
  take?: FindManyCourseArgs["take"]
  // Only available if a model relationship exists
  // include?: FindManyCourseArgs['include']
}

export default async function getCourses(
  { where, orderBy, skip = 0, take }: GetCoursesInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const courses = await db.course.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.course.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    courses,
    nextPage,
    hasMore,
  }
}
