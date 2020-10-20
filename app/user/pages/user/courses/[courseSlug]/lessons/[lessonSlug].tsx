import { BlitzPage, useParam, useQuery } from "blitz"
import Layout from "app/layouts/Layout"
import { UserNav } from "app/user/components/UserNav"
import { VideoPlayer } from "app/user/components/VideoPlayer"
import { Playlist } from "app/user/components/Playlist"
import { Suspense } from "react"
import getCourseForUser from "app/user/queries/getCourseForUser"

const CourseDetail = () => {
  const courseSlug = useParam("courseSlug", "string")
  const lessonSlug = useParam("lessonSlug", "string")
  const [course] = useQuery(getCourseForUser, { where: { slug: courseSlug } })
  const currentLesson = course.lessons.find((lesson) => lesson.slug === lessonSlug)

  return (
    <div className="h-full">
      <h1 className="text-4xl sm:text-6xl">{course.title}</h1>
      <div className="flex flex-wrap h-full">
        <div className="w-full xl:w-3/4 p-5">
          <VideoPlayer source={currentLesson.videoUrl} />
        </div>
        <div className="w-full h-full xl:w-1/4 bg-gray-100 overflow-hidden sm:rounded-lg p-5">
          <Playlist course={course} currentLesson={lessonSlug} />
        </div>
      </div>
    </div>
  )
}
const Course: BlitzPage = () => {
  return (
    <div className="flex container mx-auto h-full">
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
