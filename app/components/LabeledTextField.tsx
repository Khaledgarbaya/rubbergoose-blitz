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
      <div className="mb-4" {...outerProps}>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
          <input
            className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            {...input}
            disabled={submitting}
            {...props}
            ref={ref}
          />
        </label>

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
