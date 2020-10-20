import React, { ReactNode, PropsWithoutRef } from "react"
import { Form as FinalForm, FormProps as FinalFormProps } from "react-final-form"
import * as z from "zod"
export { FORM_ERROR } from "final-form"

type FormProps<FormValues> = {
  /** All your form fields */
  children: ReactNode
  /** Text to display in the submit button */
  submitText: string
  onSubmit: FinalFormProps<FormValues>["onSubmit"]
  initialValues?: FinalFormProps<FormValues>["initialValues"]
  schema?: z.ZodType<any, any>
} & Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit">

export function Form<FormValues extends Record<string, unknown>>({
  children,
  submitText,
  schema,
  initialValues,
  onSubmit,
  ...props
}: FormProps<FormValues>) {
  return (
    <FinalForm<FormValues>
      initialValues={initialValues}
      validate={(values) => {
        if (!schema) return
        try {
          schema.parse(values)
        } catch (error) {
          return error.formErrors.fieldErrors
        }
      }}
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, submitError }) => (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit} {...props}>
              {/* Form fields supplied as children are rendered here */}
              {children}

              {submitError && (
                <div role="alert" style={{ color: "red" }}>
                  {submitError}
                </div>
              )}

              <div className="mt-6">
                <span className="block w-full rounded-md shadow-sm">
                  <button
                    className="text-white w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-500 hover:bg-purple-400 focus:outline-none focus:border-purple-700 focus:shadow-outline-purple active:bg-purple-700 transition duration-150 ease-in-out"
                    type="submit"
                    disabled={submitting}
                  >
                    {submitText}
                  </button>
                </span>
              </div>
            </form>
            <p className="mt-5 text-center text-gray-500 text-xs">
              &copy;2020 Rubber Goose. All rights reserved.
            </p>
          </div>
        </div>
      )}
    />
  )
}

export default Form
