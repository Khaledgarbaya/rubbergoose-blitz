import { BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"
import { Suspense } from "react"
import { CoursesList } from "app/user/componenets/CourseList"
import { UserGreeting } from "app/user/componenets/UserGreeting"
import { UserNav } from "app/user/componenets/UserNav"

const Dashboard: BlitzPage = () => {
  return (
    <div className="container mx-auto justify-center items-center">
      <UserNav />
      <div className="container mx-auto shadow rounded-lg p-8 bg-white">
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
