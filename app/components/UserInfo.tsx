import { useCurrentUser } from "app/hooks/useCurrentUser"
import { AccountDropDown } from "app/auth/components/AccountDropDown"
import logout from "app/auth/mutations/logout"
import { Link } from "blitz"

export const UserInfo = () => {
  const currentUser = useCurrentUser()

  if (currentUser) {
    return <AccountDropDown onLogout={logout} user={currentUser} />
  } else {
    return (
      <>
        <Link href="/signup">
          <a className="bg-purple-500 hover:bg-purple-700 text-white py-2 px-4 rounded">Sign Up</a>
        </Link>
        <Link href="/login">
          <a className="bg-purple-500 hover:bg-purple-700 text-white py-2 px-4 ml-4 rounded">
            Login
          </a>
        </Link>
      </>
    )
  }
}
