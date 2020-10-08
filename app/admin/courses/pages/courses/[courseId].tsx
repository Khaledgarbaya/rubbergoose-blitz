import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage } from "blitz"
import getCourse from "app/admin/courses/queries/getCourse"
import deleteCourse from "app/admin/courses/mutations/deleteCourse"

export const Course = () => {
  const router = useRouter()
  const courseId = useParam("courseId", "number")
  const [course] = useQuery(getCourse, { where: { id: courseId } })

  return (
    <div>
      <h1>Course {course.title}</h1>
      <pre>{JSON.stringify(course, null, 2)}</pre>

      <Link href="/courses/[courseId]/edit" as={`/courses/${course.id}/edit`}>
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteCourse({ where: { id: course.id } })
            router.push("/courses")
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}

const ShowCoursePage: BlitzPage = () => {
  return (
    <div>
      <Head>
        <title>Course</title>
      </Head>

      <main>
        <p>
          <Link href="/courses">
            <a>Courses</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <Course />
        </Suspense>
      </main>
    </div>
  )
}

ShowCoursePage.getLayout = (page) => <Layout title={"Course"}>{page}</Layout>

export default ShowCoursePage
