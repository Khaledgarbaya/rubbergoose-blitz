import { SessionContext } from "blitz"
import db, { LessonUpdateArgs } from "db"

type UpdateLessonInput = {
  where: LessonUpdateArgs["where"]
  data: Omit<LessonUpdateArgs["data"], "course">
  courseId?: number
}

export default async function updateLesson(
  { where, data }: UpdateLessonInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize("admin")

  // Don't allow updating
  delete (data as any).course

  const lesson = await db.lesson.update({ where, data })

  return lesson
}
