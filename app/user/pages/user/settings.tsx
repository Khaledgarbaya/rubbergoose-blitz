import { BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"
import { UserNav } from "app/user/componenets/UserNav"

const Settings: BlitzPage = () => {
  return (
    <div className="container mx-auto justify-center items-center">
      <UserNav />
      <div className="container mx-auto shadow rounded-lg p-8 bg-white">Settings</div>
    </div>
  )
}

Settings.getLayout = (page) => <Layout title="Settings">{page}</Layout>

export default Settings
