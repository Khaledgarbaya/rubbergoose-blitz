import { SessionContext } from "blitz"
import db, { LessonDeleteArgs } from "db"

type DeleteLessonInput = {
  where: LessonDeleteArgs["where"]
}

export default async function deleteLesson(
  { where }: DeleteLessonInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize("admin")

  const lesson = await db.lesson.delete({ where })

  return lesson
}
