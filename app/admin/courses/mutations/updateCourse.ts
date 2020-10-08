import { SessionContext } from "blitz"
import db, { CourseUpdateArgs } from "db"

type UpdateCourseInput = {
  where: CourseUpdateArgs["where"]
  data: CourseUpdateArgs["data"]
}

export default async function updateCourse(
  { where, data }: UpdateCourseInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize("admin")

  const course = await db.course.update({ where, data })

  return course
}
