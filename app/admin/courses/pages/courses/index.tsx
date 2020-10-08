import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getCourses from "app/admin/courses/queries/getCourses"

const ITEMS_PER_PAGE = 100

export const CoursesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ courses, hasMore }] = usePaginatedQuery(getCourses, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <Link href="/courses/[courseId]" as={`/courses/${course.id}`}>
              <a>{course.title}</a>
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

const CoursesPage: BlitzPage = () => {
  return (
    <div>
      <Head>
        <title>Courses</title>
      </Head>

      <main>
        <h1>Courses</h1>

        <p>
          <Link href="/courses/new">
            <a>Create Course</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <CoursesList />
        </Suspense>
      </main>
    </div>
  )
}

CoursesPage.getLayout = (page) => <Layout title={"Courses"}>{page}</Layout>

export default CoursesPage
