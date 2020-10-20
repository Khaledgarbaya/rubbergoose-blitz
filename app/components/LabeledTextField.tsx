import React, { PropsWithoutRef } from "react"
import { useField } from "react-final-form"

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const LabeledTextField = React.forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ name, label, outerProps, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name)

    return (
      <div className="mt-6">
        <label htmlFor={name} className="block text-sm font-medium leading-5 text-gray-700">
          {label}
        </label>
        <div className="rounded-md shadow-sm">
          <input
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            {...input}
            name={name}
            id={name}
            disabled={submitting}
            {...props}
            ref={ref}
          />
        </div>

        {touched && (error || submitError) && (
          <div role="alert" className="text-red-500">
            {error || submitError}
          </div>
        )}
      </div>
    )
  }
)

export default LabeledTextField
