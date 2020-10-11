import { BlitzPage, useParam, useQuery } from "blitz"
import Layout from "app/layouts/Layout"
import { UserNav } from "app/user/componenets/UserNav"
import { Suspense } from "react"
import getCourseForUser from "app/user/queries/getCourseForUser"

const CourseDetail = () => {
  const courseSlug = useParam("courseSlug", "string")
  const [course] = useQuery(getCourseForUser, { where: { slug: courseSlug } })

  return (
    <div>
      <h1>Course {course.title}</h1>
      <pre>{JSON.stringify(course, null, 2)}</pre>
    </div>
  )
}
const Course: BlitzPage = () => {
  return (
    <div className="container mx-auto justify-center items-center">
      <UserNav />
      <div className="container mx-auto shadow rounded-lg p-8 bg-white">
        <Suspense fallback={<div>Loading...</div>}>
          <CourseDetail />
        </Suspense>
      </div>
    </div>
  )
}

Course.getLayout = (page) => <Layout title="Course">{page}</Layout>

export default Course
