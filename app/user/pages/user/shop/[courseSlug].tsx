import { BlitzPage, useParam, useQuery } from "blitz"
import Layout from "app/layouts/Layout"
import { UserNav } from "app/user/components/UserNav"
import { Suspense } from "react"
import getCourse from "app/admin/courses/queries/getCourse"
import formatMoney from "app/user/utils/formatMoney"
import getStripeSessionId from "app/user/mutations/getStripeSessionId"
import { loadStripe } from "@stripe/stripe-js"
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.STRIPE_PKEY as string)

const CourseDetail = () => {
  const courseSlug = useParam("courseSlug", "string")
  const [course] = useQuery(getCourse, { where: { slug: courseSlug } })
  const [{ sessionId }] = useQuery(getStripeSessionId, {
    courseId: course.id,
  })
  const handleClick = async (event) => {
    // Get Stripe.js instance
    const stripe = await stripePromise
    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe?.redirectToCheckout({
      sessionId,
    })

    if (result?.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  }
  return (
    <div>
      <div>
        <h1>Course {course.title}</h1>
        <pre>{JSON.stringify(course, null, 2)}</pre>
      </div>
      <button
        className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
        role="link"
        onClick={handleClick}
      >
        Checkout: {formatMoney(course.price)}
      </button>
    </div>
  )
}
const Course: BlitzPage = () => {
  return (
    <div className="flex container mx-auto">
      <UserNav />
      <div className="w-full bg-white rounded-lg mx-auto my-8 px-10 py-8">
        <Suspense fallback={<div>Loading...</div>}>
          <CourseDetail />
        </Suspense>
      </div>
    </div>
  )
}

Course.getLayout = (page) => <Layout title="Course">{page}</Layout>

export default Course
