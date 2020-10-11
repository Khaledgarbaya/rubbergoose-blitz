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
    <div className="flex container mx-auto">
      <UserNav />
      <div className="w-full bg-white rounded-lg mx-auto my-8 px-10 py-8">
        <Suspense fallback={<div>Loading...</div>}>
          <CourseDetail />
        </Suspense>
      </div>
    </div>
  )
}

Course.getLayout = (page) => <Layout title="Course">{page}</Layout>

export default Course
