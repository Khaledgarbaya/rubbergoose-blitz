import { Link, usePaginatedQuery, useRouter } from "blitz"
import getCourseForUser from "app/user/queries/getCoursesForUser"

const ITEMS_PER_PAGE = 100

export const CoursesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ courseMemberships, hasMore }] = usePaginatedQuery(getCourseForUser, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {courseMemberships.map((courseMembership) => (
          <li key={courseMembership.courseId}>
            <Link
              href="/user/courses/[courseSlug]"
              as={`/user/courses/${courseMembership.course?.slug}`}
            >
              <a>{courseMembership.course?.title}</a>
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
