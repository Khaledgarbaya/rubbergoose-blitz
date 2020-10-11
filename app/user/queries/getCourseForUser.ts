import { NotFoundError, SessionContext } from "blitz"
import db, { FindOneCourseArgs } from "db"

type GetCourseInput = {
  where: FindOneCourseArgs["where"]
}

export default async function getCourseForUser(
  { where }: GetCourseInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const course = await db.course.findOne({
    where,
    include: { CourseMembership: { where: { userId: ctx.session!.userId } } },
  })

  if (!course || course.CourseMembership.length === 0) throw new NotFoundError()

  return course
}
