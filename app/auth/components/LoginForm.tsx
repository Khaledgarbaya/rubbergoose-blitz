import React from "react"
import { LabeledTextField } from "app/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/components/Form"
import login from "app/auth/mutations/login"
import { LoginInput, LoginInputType } from "app/auth/validations"

type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-12 w-auto" src="rubber-goose.svg" alt="Workflow" />
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
          Login to your account
        </h2>
      </div>

      <Form<LoginInputType>
        submitText="Log In"
        schema={LoginInput}
        initialValues={{ email: undefined, password: undefined }}
        onSubmit={async (values) => {
          try {
            await login({ email: values.email, password: values.password })
            props.onSuccess && props.onSuccess()
          } catch (error) {
            if (error.name === "AuthenticationError") {
              return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
            } else {
              return {
                [FORM_ERROR]:
                  "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
              }
            }
          }
        }}
      >
        <LabeledTextField name="email" label="Email" placeholder="Email" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember_me"
              type="checkbox"
              className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
            />
            <label htmlFor="remember_me" className="ml-2 block text-sm leading-5 text-gray-900">
              Remember me
            </label>
          </div>

          <div className="text-sm leading-5">
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
            >
              Forgot your password?
            </a>
          </div>
        </div>
      </Form>
    </div>
  )
}

export default LoginForm
