import { useQuery } from "blitz"
import getUser from "app/user/queries/getUser"

export const UserGreeting = () => {
  const [user] = useQuery(getUser, null)
  return <div>Welcome {user?.name}</div>
}
