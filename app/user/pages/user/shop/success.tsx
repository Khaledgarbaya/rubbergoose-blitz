import { BlitzPage, useRouterQuery, useQuery } from "blitz"
import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { UserNav } from "app/user/components/UserNav"
import getOrderDetail from "app/user/mutations/getOrderDetail"

const OrderDetail = () => {
  const { session_id } = useRouterQuery()
  const [{ session, customer }] = useQuery(getOrderDetail, {
    checkoutSessionId: session_id as string,
  })
  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <pre>{JSON.stringify(customer, null, 2)}</pre>
    </div>
  )
}
const Success: BlitzPage = () => {
  return (
    <div className="flex container mx-auto bg-gray-200 min-h-screen">
      <UserNav />
      <div className="w-full bg-white rounded-lg mx-auto my-8 px-10 py-8">
        <Suspense fallback={<span>Loading...</span>}>
          <OrderDetail />
        </Suspense>
        <section>
          <p>
            We appreciate your business! If you have any questions, please email
            <a href="mailto:orders@example.com">orders@example.com</a>.
          </p>
        </section>
      </div>
    </div>
  )
}

Success.getLayout = (page) => <Layout title="Shop">{page}</Layout>

export default Success
