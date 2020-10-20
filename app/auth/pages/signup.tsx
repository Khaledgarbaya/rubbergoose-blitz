import React from "react"
import { useRouter, BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"
import { Form, FORM_ERROR } from "app/components/Form"
import { LabeledTextField } from "app/components/LabeledTextField"
import signup from "app/auth/mutations/signup"
import { SignupInput, SignupInputType } from "app/auth/validations"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-12 w-auto" src="rubber-goose.svg" alt="Workflow" />
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
          Create an account
        </h2>
      </div>
      <Form<SignupInputType>
        submitText="Create Account"
        schema={SignupInput}
        onSubmit={async (values) => {
          try {
            await signup({ email: values.email, password: values.password, name: values.name })
            router.push("/")
          } catch (error) {
            if (error.code === "P2002" && error.meta?.target?.includes("email")) {
              // This error comes from Prisma
              return { email: "This email is already being used" }
            } else {
              return { [FORM_ERROR]: error.toString() }
            }
          }
        }}
      >
        <LabeledTextField name="name" label="name" placeholder="Your Name" />
        <LabeledTextField name="email" label="Email" placeholder="Email" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
      </Form>
    </div>
  )
}

SignupPage.getLayout = (page) => <Layout title="Sign Up">{page}</Layout>

export default SignupPage
