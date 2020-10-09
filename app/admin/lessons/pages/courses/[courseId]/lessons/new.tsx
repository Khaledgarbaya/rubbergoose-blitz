import React from "react"
import Layout from "app/layouts/Layout"
import { Head, Link, useRouter, useParam, BlitzPage } from "blitz"
import createLesson from "app/admin/lessons/mutations/createLesson"
import LessonForm from "app/admin/lessons/components/LessonForm"
import { slugify } from "utils/slugify"
const NewLessonPage: BlitzPage = () => {
  const router = useRouter()
  const courseId = useParam("courseId", "number")

  return (
    <div>
      <Head>
        <title>New Lesson</title>
      </Head>

      <main>
        <h1>Create New Lesson</h1>

        <LessonForm
          initialValues={{}}
          onSubmit={async () => {
            try {
              const lesson = await createLesson({
                data: { title: "MyLesson", slug: `${slugify("MyLesson")}-${Date.now()}` },
                courseId,
              })
              alert("Success!" + JSON.stringify(lesson))
              router.push(
                "/courses/[courseId]/lessons/[lessonId]",
                `/courses/${courseId}/lessons/${lesson.id}`
              )
            } catch (error) {
              alert("Error creating lesson " + JSON.stringify(error, null, 2))
            }
          }}
        />

        <p>
          <Link as="/courses/courseId/lessons" href={`/courses/${courseId}/lessons`}>
            <a>Lessons</a>
          </Link>
        </p>
      </main>
    </div>
  )
}

NewLessonPage.getLayout = (page) => <Layout title={"Create New Lesson"}>{page}</Layout>

export default NewLessonPage
