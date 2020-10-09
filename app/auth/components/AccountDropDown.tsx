import React, { useState } from "react"
import { Link } from "blitz"
import Gravatar from "react-gravatar"
type AccountDropDownProps = {
  onLogout: () => void
  user: { name: string | null; email: string; id: number; role: string }
}
export const AccountDropDown = (props: AccountDropDownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { email, name } = props.user
  return (
    <div>
      <button
        onClick={() => {
          setIsOpen(!isOpen)
        }}
        className="relative z-10 block h-8 w-8 rounded-full overflow-hidden border-2 border-gray-600 focus:outline-none focus:border-white"
      >
        <Gravatar
          email={email}
          size={50}
          rating="pg"
          default="monsterid"
          className="h-full w-full object-cover"
        />
      </button>
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl`}
      >
        <span className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">
          {name}
        </span>
        <Link href="/user/dashboard">
          <a
            href="/user/dashboard"
            className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
          >
            Dashboard
          </a>
        </Link>
        <button
          className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
          onClick={async () => {
            await props.onLogout()
          }}
        >
          Logout
        </button>
      </div>
    </div>
  )
}
