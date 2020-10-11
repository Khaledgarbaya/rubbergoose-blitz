import { Link } from "blitz"

export const UserNav = () => (
  <div className="pt-8">
    <nav id="nav" className="w-56 relative">
      <ul className="relative">
        <li>
          <Link href="/user/settings">
            <a className="py-3 pl-1 w-full flex items-center focus:outline-none focus-visible:underline">
              <svg
                className="h-6 w-6 transition-all ease-out transition-medium text-gray-500"
                viewBox="0 0 640 512"
                fill="currentColor"
              >
                <g className="fa-group">
                  <path
                    fill="currentColor"
                    d="M336 463.59V368a16 16 0 0 0-16-16h-64a16 16 0 0 0-16 16v95.71a16 16 0 0 1-15.92 16L112 480a16 16 0 0 1-16-16V300.06l184.39-151.85a12.19 12.19 0 0 1 15.3 0L480 300v164a16 16 0 0 1-16 16l-112-.31a16 16 0 0 1-16-16.1z"
                    className="fa-secondary"
                  ></path>
                  <path
                    fill="currentColor"
                    d="M573.32 268.35l-25.5 31a12 12 0 0 1-16.9 1.65L295.69 107.21a12.19 12.19 0 0 0-15.3 0L45.17 301a12 12 0 0 1-16.89-1.65l-25.5-31a12 12 0 0 1 1.61-16.89L257.49 43a48 48 0 0 1 61 0L408 116.61V44a12 12 0 0 1 12-12h56a12 12 0 0 1 12 12v138.51l83.6 68.91a12 12 0 0 1 1.72 16.93z"
                    className="fa-primary"
                  ></path>
                </g>
              </svg>
              <span className="ml-3 text-sm font-medium transition-all ease-out transition-medium text-gray-700">
                Home
              </span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/user/dashboard">
            <a className="py-3 pl-1 w-full flex items-center focus:outline-none focus-visible:underline">
              <svg
                className="h-6 w-6 transition-all ease-out transition-medium text-gray-500"
                viewBox="0 0 640 512"
                fill="currentColor"
              >
                <g className="fa-group">
                  <path
                    fill="currentColor"
                    d="M323.07 175.7L118.8 215.6a48.1 48.1 0 0 0-38.74 44.73 32 32 0 0 1 2.21 53.94l25.4 114.26A16 16 0 0 1 92 448H35.94a16 16 0 0 1-15.61-19.47l25.39-114.27a32 32 0 0 1 2.33-54 80.16 80.16 0 0 1 64.62-76.07l204.26-39.89a16 16 0 1 1 6.14 31.4z"
                    className="fa-secondary"
                  ></path>
                  <path
                    fill="currentColor"
                    d="M622.33 198.8l-279 85.7a80 80 0 0 1-46.79 0L99.67 224a47.84 47.84 0 0 1 19.13-8.39l204.27-39.9a16 16 0 1 0-6.14-31.4l-204.26 39.88a79.87 79.87 0 0 0-47.57 29.18l-47.44-14.58c-23.54-7.23-23.54-38.36 0-45.59L296.6 67.5a79.92 79.92 0 0 1 46.8 0l278.93 85.7c23.55 7.24 23.55 38.36 0 45.6zM352.79 315.09a111.94 111.94 0 0 1-65.59 0l-145-44.55L128 384c0 35.35 86 64 192 64s192-28.65 192-64l-14.19-113.47z"
                    className="fa-primary"
                  ></path>
                </g>
              </svg>
              <span className="ml-3 text-sm font-medium transition-all ease-out transition-medium text-gray-700">
                Courses
              </span>
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  </div>
)
