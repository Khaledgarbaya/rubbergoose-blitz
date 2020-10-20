import { BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"
import { Suspense } from "react"
import { ShopCoursesList } from "app/user/components/ShopCoursesList"
import { UserGreeting } from "app/user/components/UserGreeting"
import { UserNav } from "app/user/components/UserNav"

const ShopIndex: BlitzPage = () => {
  return (
    <div className="flex container mx-auto bg-gray-200 min-h-screen">
      <UserNav />
      <div className="w-full bg-white rounded-lg mx-auto my-8 px-10 py-8">
        <Suspense fallback={<div>Loading...</div>}>
          <UserGreeting />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <ShopCoursesList />
        </Suspense>
      </div>
    </div>
  )
}

ShopIndex.getLayout = (page) => <Layout title="Shop">{page}</Layout>

export default ShopIndex
