import { VideoPlayer } from "app/user/components/VideoPlayer"
import { Playlist } from "app/user/components/Playlist"
import { useQuery } from "blitz"
import getCourseForUser from "app/user/queries/getCourseForUser"

export const CourseDetail = ({ courseSlug, lessonSlug }) => {
  const [course] = useQuery(getCourseForUser, { where: { slug: courseSlug } })
  let currentLesson = course.lessons.find((lesson) => lesson.slug === lessonSlug)
  currentLesson = currentLesson || course.lessons[0]
  return (
    <div className="h-full">
      <h1 className="text-4xl sm:text-6xl">{course.title}</h1>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-3/4 p-5">
          <VideoPlayer source={currentLesson?.videoUrl || ""} />
        </div>
        <div className="w-full h-full xl:w-1/4 bg-gray-100 overflow-hidden sm:rounded-lg p-5">
          <Playlist course={course} currentLesson={lessonSlug} />
        </div>
      </div>
    </div>
  )
}
