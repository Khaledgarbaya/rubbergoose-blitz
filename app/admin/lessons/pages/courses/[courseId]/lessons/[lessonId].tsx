import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage } from "blitz"
import getLesson from "app/admin/lessons/queries/getLesson"
import deleteLesson from "app/admin/lessons/mutations/deleteLesson"

export const Lesson = () => {
  const router = useRouter()
  const lessonId = useParam("lessonId", "number")
  const courseId = useParam("courseId", "number")
  const [lesson] = useQuery(getLesson, { where: { id: lessonId } })

  return (
    <div>
      <h1>Lesson {lesson.title}</h1>
      <pre>{JSON.stringify(lesson, null, 2)}</pre>

      <Link
        href="/courses/[courseId]/lessons/[lessonId]/edit"
        as={`/courses/${courseId}/lessons/${lesson.id}/edit`}
      >
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteLesson({ where: { id: lesson.id } })
            router.push("/courses/[courseId]/lessons", `/courses/${courseId}/lessons`)
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}

const ShowLessonPage: BlitzPage = () => {
  const courseId = useParam("courseId", "number")

  return (
    <div>
      <Head>
        <title>Lesson</title>
      </Head>

      <main>
        <p>
          <Link href="/courses/courseId/lessons" as={`/courses/${courseId}/lessons`}>
            <a>Lessons</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <Lesson />
        </Suspense>
      </main>
    </div>
  )
}

ShowLessonPage.getLayout = (page) => <Layout title={"Lesson"}>{page}</Layout>

export default ShowLessonPage
