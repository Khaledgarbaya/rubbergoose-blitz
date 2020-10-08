import { SessionContext } from "blitz"
import db, { CourseDeleteArgs } from "db"

type DeleteCourseInput = {
  where: CourseDeleteArgs["where"]
}

export default async function deleteCourse(
  { where }: DeleteCourseInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize("admin")

  const course = await db.course.delete({ where })

  return course
}
