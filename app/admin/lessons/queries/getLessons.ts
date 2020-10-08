import { SessionContext } from "blitz"
import db, { FindManyLessonArgs } from "db"

type GetLessonsInput = {
  where?: FindManyLessonArgs["where"]
  orderBy?: FindManyLessonArgs["orderBy"]
  skip?: FindManyLessonArgs["skip"]
  take?: FindManyLessonArgs["take"]
  // Only available if a model relationship exists
  // include?: FindManyLessonArgs['include']
}

export default async function getLessons(
  { where, orderBy, skip = 0, take }: GetLessonsInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize("admin")

  const lessons = await db.lesson.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.lesson.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    lessons,
    nextPage,
    hasMore,
  }
}
