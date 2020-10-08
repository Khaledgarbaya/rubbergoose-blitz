import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Head, Link, usePaginatedQuery, useRouter, useParam, BlitzPage } from "blitz"
import getLessons from "app/admin/lessons/queries/getLessons"

const ITEMS_PER_PAGE = 100

export const LessonsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const courseId = useParam("courseId", "number")
  const [{ lessons, hasMore }] = usePaginatedQuery(getLessons, {
    where: { course: { id: courseId } },
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {lessons.map((lesson) => (
          <li key={lesson.id}>
            <Link
              href="/courses/[courseId]/lessons/[lessonId]"
              as={`/courses/${courseId}/lessons/${lesson.id}`}
            >
              <a>{lesson.title}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const LessonsPage: BlitzPage = () => {
  const courseId = useParam("courseId", "number")

  return (
    <div>
      <Head>
        <title>Lessons</title>
      </Head>

      <main>
        <h1>Lessons</h1>

        <p>
          <Link href="/courses/courseId/lessons/new" as={`/courses/${courseId}/lessons/new`}>
            <a>Create Lesson</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <LessonsList />
        </Suspense>
      </main>
    </div>
  )
}

LessonsPage.getLayout = (page) => <Layout title={"Lessons"}>{page}</Layout>

export default LessonsPage
