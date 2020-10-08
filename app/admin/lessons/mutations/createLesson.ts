import { SessionContext } from "blitz"
import db, { LessonCreateArgs } from "db"

type CreateLessonInput = {
  data: Omit<LessonCreateArgs["data"], "course">
  courseId: number
}
export default async function createLesson(
  { data, courseId }: CreateLessonInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize("admin")

  const lesson = await db.lesson.create({
    data: { ...data, course: { connect: { id: courseId } } },
  })

  return lesson
}
