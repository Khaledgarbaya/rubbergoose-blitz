import { NotFoundError, SessionContext } from "blitz"
import db, { FindOneLessonArgs } from "db"

type GetLessonInput = {
  where: FindOneLessonArgs["where"]
  // Only available if a model relationship exists
  // include?: FindOneLessonArgs['include']
}

export default async function getLesson(
  { where /* include */ }: GetLessonInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize("admin")

  const lesson = await db.lesson.findOne({ where })

  if (!lesson) throw new NotFoundError()

  return lesson
}
