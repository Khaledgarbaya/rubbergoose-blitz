import { Link } from "blitz"

export const Playlist = ({ course }) => {
  const { lessons } = course
  return (
    <div>
      <ul>
        {lessons.map((lesson) => (
          <li key={`${lesson.id}`}>
            <Link
              href="/user/courses/[courseSlug]/lessons/[lessonSlug]"
              as={`/user/courses/${course.slug}/lessons/${lesson.slug}`}
            >
              <a className="px-4 py-4 sm:px-6 block hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition duration-200 ease-in-out">
                {lesson.title}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
