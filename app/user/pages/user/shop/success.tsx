import { BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"
import { UserNav } from "app/user/componenets/UserNav"

const Success: BlitzPage = () => {
  return (
    <div className="flex container mx-auto bg-gray-200 min-h-screen">
      <UserNav />
      <div className="w-full bg-white rounded-lg mx-auto my-8 px-10 py-8">
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
