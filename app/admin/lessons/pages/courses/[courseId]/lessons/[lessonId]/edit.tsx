import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage } from "blitz"
import getLesson from "app/admin/lessons/queries/getLesson"
import updateLesson from "app/admin/lessons/mutations/updateLesson"
import LessonForm from "app/admin/lessons/components/LessonForm"

export const EditLesson = () => {
  const router = useRouter()
  const lessonId = useParam("lessonId", "number")
  const courseId = useParam("courseId", "number")
  const [lesson, { mutate }] = useQuery(getLesson, { where: { id: lessonId } })

  return (
    <div>
      <h1>Edit Lesson {lesson.title}</h1>
      <pre>{JSON.stringify(lesson)}</pre>

      <LessonForm
        initialValues={lesson}
        onSubmit={async () => {
          try {
            const updated = await updateLesson({
              where: { id: lesson.id },
              data: { title: "MyNewName" },
            })
            mutate(updated)
            alert("Success!" + JSON.stringify(updated))
            router.push(
              "/courses/[courseId]/lessons/[lessonId]",
              `/courses/${courseId}/lessons/${updated.id}`
            )
          } catch (error) {
            console.log(error)
            alert("Error creating lesson " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditLessonPage: BlitzPage = () => {
  const courseId = useParam("courseId", "number")

  return (
    <div>
      <Head>
        <title>Edit Lesson</title>
      </Head>

      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <EditLesson />
        </Suspense>

        <p>
          <Link as="/courses/courseId/lessons" href={`/courses/${courseId}/lessons`}>
            <a>Lessons</a>
          </Link>
        </p>
      </main>
    </div>
  )
}

EditLessonPage.getLayout = (page) => <Layout title={"Edit Lesson"}>{page}</Layout>

export default EditLessonPage
