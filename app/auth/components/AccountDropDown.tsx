import React, { useState } from "react"
import { Link } from "blitz"
import Gravatar from "react-gravatar"
import { Transition } from "@headlessui/react"

type AccountDropDownProps = {
  onLogout: () => void
  user: { name: string | null; email: string; id: number; role: string }
}
export const AccountDropDown = (props: AccountDropDownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { email, name } = props.user
  return (
    <div className="ml-3 relative">
      <div>
        <button
          onClick={() => {
            setIsOpen(!isOpen)
          }}
          className="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:shadow-outline"
          id="user-menu"
          aria-label="User menu"
          aria-haspopup="true"
        >
          <Gravatar
            email={email}
            size={256}
            rating="pg"
            default="monsterid"
            className="h-8 w-8 rounded-full"
          />
        </button>
      </div>
      <Transition
        show={isOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        {(ref) => (
          <div
            ref={ref}
            className={`absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl`}
          >
            <span className="block px-4 py-2 text-gray-800 hover:bg-purple-500 hover:text-white">
              {name}
            </span>
            <Link href="/user/dashboard">
              <a
                href="/user/dashboard"
                className="block px-4 py-2 text-gray-800 hover:bg-purple-500 hover:text-white"
              >
                Dashboard
              </a>
            </Link>
            <button
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-purple-500 hover:text-white"
              onClick={async () => {
                await props.onLogout()
              }}
            >
              Logout
            </button>
          </div>
        )}
      </Transition>
    </div>
  )
}
