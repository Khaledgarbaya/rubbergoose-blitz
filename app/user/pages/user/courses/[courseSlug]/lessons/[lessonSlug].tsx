import { BlitzPage, useParam } from "blitz"
import Layout from "app/layouts/Layout"
import { UserNav } from "app/user/components/UserNav"
import { Suspense } from "react"
import { CourseDetail } from "app/user/components/CourseDetail"

const LessonSlug: BlitzPage = () => {
  const courseSlug = useParam("courseSlug", "string")
  const lessonSlug = useParam("lessonSlug", "string")

  return (
    <div className="flex container mx-auto h-full">
      <UserNav />
      <div className="w-full bg-white rounded-lg mx-auto my-8 px-10 py-8">
        <Suspense fallback={<div>Loading...</div>}>
          <CourseDetail courseSlug={courseSlug} lessonSlug={lessonSlug} />
        </Suspense>
      </div>
    </div>
  )
}

LessonSlug.getLayout = (page) => <Layout title="LessonSlug">{page}</Layout>

export default LessonSlug
