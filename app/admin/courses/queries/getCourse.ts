import { NotFoundError, SessionContext } from "blitz"
import db, { FindOneCourseArgs } from "db"

type GetCourseInput = {
  where: FindOneCourseArgs["where"]
  // Only available if a model relationship exists
  // include?: FindOneCourseArgs['include']
}

export default async function getCourse(
  { where /* include */ }: GetCourseInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const course = await db.course.findOne({ where })

  if (!course) throw new NotFoundError()

  return course
}
