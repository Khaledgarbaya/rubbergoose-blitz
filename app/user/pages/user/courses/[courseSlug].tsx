import { BlitzPage, useParam, useQuery } from "blitz"
import Layout from "app/layouts/Layout"
import { UserNav } from "app/user/components/UserNav"
import { VideoPlayer } from "app/user/components/VideoPlayer"
import { Playlist } from "app/user/components/Playlist"
import { Suspense } from "react"
import getCourseForUser from "app/user/queries/getCourseForUser"

const CourseDetail = () => {
  const courseSlug = useParam("courseSlug", "string")
  const [course] = useQuery(getCourseForUser, { where: { slug: courseSlug } })

  return (
    <div>
      <h1>Course {course.title}</h1>
      <div className="flex">
        <div className="w-full sm:w-3/4">
          <VideoPlayer />
        </div>
        <div className="w-full sm:w-1/2 h-full bg-gray-100 overflow-hidden sm:rounded-lg">
          <Playlist course={course} />
        </div>
      </div>
    </div>
  )
}
const Course: BlitzPage = () => {
  return (
    <div className="flex container mx-auto h-screen">
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
