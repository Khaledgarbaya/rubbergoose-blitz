import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage } from "blitz"
import getCourse from "app/admin/courses/queries/getCourse"
import updateCourse from "app/admin/courses/mutations/updateCourse"
import CourseForm from "app/admin/courses/components/CourseForm"

export const EditCourse = () => {
  const router = useRouter()
  const courseId = useParam("courseId", "number")
  const [course, { mutate }] = useQuery(getCourse, { where: { id: courseId } })

  return (
    <div>
      <h1>Edit Course {course.id}</h1>
      <pre>{JSON.stringify(course)}</pre>

      <CourseForm
        initialValues={course}
        onSubmit={async () => {
          try {
            const updated = await updateCourse({
              where: { id: course.id },
              data: { title: "MyNewTitle" },
            })
            mutate(updated)
            alert("Success!" + JSON.stringify(updated))
            router.push("/courses/[courseId]", `/courses/${updated.id}`)
          } catch (error) {
            console.log(error)
            alert("Error creating course " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditCoursePage: BlitzPage = () => {
  return (
    <div>
      <Head>
        <title>Edit Course</title>
      </Head>

      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <EditCourse />
        </Suspense>

        <p>
          <Link href="/courses">
            <a>Courses</a>
          </Link>
        </p>
      </main>
    </div>
  )
}

EditCoursePage.getLayout = (page) => <Layout title={"Edit Course"}>{page}</Layout>

export default EditCoursePage
