import { BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"
import { UserNav } from "app/user/components/UserNav"

const Settings: BlitzPage = () => {
  return (
    <div className="flex container mx-auto">
      <UserNav />
      <div className="w-full bg-white rounded-lg mx-auto my-8 px-10 py-8">Settings</div>
    </div>
  )
}

Settings.getLayout = (page) => <Layout title="Settings">{page}</Layout>

export default Settings
