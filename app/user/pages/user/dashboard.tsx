import { BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"
import { Suspense } from "react"
import { CoursesList } from "app/user/componenets/CourseList"
import { UserGreeting } from "app/user/componenets/UserGreeting"
import { UserNav } from "app/user/componenets/UserNav"

const Dashboard: BlitzPage = () => {
  return (
    <div className="flex container mx-auto bg-gray-200 min-h-screen">
      <UserNav />
      <div className="w-full bg-white rounded-lg mx-auto my-8 px-10 py-8">
        <Suspense fallback={<div>Loading...</div>}>
          <UserGreeting />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <CoursesList />
        </Suspense>
      </div>
    </div>
  )
}

Dashboard.getLayout = (page) => <Layout title="Dashboard">{page}</Layout>

export default Dashboard
