import { SessionContext } from "blitz"
import db, { CourseCreateArgs } from "db"

type CreateCourseInput = {
  data: CourseCreateArgs["data"]
}
export default async function createCourse(
  { data }: CreateCourseInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize("admin")

  const course = await db.course.create({ data })

  return course
}
