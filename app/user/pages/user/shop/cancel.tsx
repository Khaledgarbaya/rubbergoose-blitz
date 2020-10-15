import { BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"
import { UserNav } from "app/user/componenets/UserNav"

const Cancel: BlitzPage = () => {
  return (
    <div className="flex container mx-auto bg-gray-200 min-h-screen">
      <UserNav />
      <div className="w-full bg-white rounded-lg mx-auto my-8 px-10 py-8">
        <section>
          <p>Forgot to add something to your cart? Shop around then come back to pay!</p>
        </section>
      </div>
    </div>
  )
}

Cancel.getLayout = (page) => <Layout title="Shop">{page}</Layout>

export default Cancel
