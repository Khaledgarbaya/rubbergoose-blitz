import React from "react"
import Layout from "app/layouts/Layout"
import { Head, Link, useRouter, BlitzPage } from "blitz"
import createCourse from "app/admin/courses/mutations/createCourse"
import CourseForm from "app/admin/courses/components/CourseForm"

const NewCoursePage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <Head>
        <title>New Course</title>
      </Head>

      <main>
        <h1>Create New Course</h1>

        <CourseForm
          initialValues={{}}
          onSubmit={async () => {
            try {
              const course = await createCourse({ data: { title: "MyTitle", slug: "new-slug" } })
              alert("Success!" + JSON.stringify(course))
              router.push("/courses/[courseId]", `/courses/${course.id}`)
            } catch (error) {
              alert("Error creating course " + JSON.stringify(error, null, 2))
            }
          }}
        />

        <p>
          <Link href="/courses">
            <a>Courses</a>
          </Link>
        </p>
      </main>
    </div>
  )
}

NewCoursePage.getLayout = (page) => <Layout title={"Create New Course"}>{page}</Layout>

export default NewCoursePage
