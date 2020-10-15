import { Link, usePaginatedQuery, useRouter } from "blitz"
import getCourses from "app/admin/courses/queries/getCourses"

const ITEMS_PER_PAGE = 100

export const ShopCoursesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ courses, hasMore }] = usePaginatedQuery(getCourses, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  // const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  // const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div className="flex-1 max-w-4xl mx-auto p-10">
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
        {courses.map((course) => (
          <li className="bg-white rounded-lg shadow-xl h-24 p-6" key={course.id}>
            <Link href="/user/shop/[courseSlug]" as={`/user/shop/${course.slug}`}>
              <a className="block w-full h-full">{course.title}</a>
            </Link>
          </li>
        ))}
      </ul>

      {/* <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button> */}
    </div>
  )
}
