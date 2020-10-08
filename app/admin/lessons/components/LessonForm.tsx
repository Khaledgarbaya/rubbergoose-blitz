import React from "react"

type LessonFormProps = {
  initialValues: any
  onSubmit: React.FormEventHandler<HTMLFormElement>
}

const LessonForm = ({ initialValues, onSubmit }: LessonFormProps) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit(event)
      }}
    >
      <div>Put your form fields here. But for now, just click submit</div>
      <div>{JSON.stringify(initialValues)}</div>
      <button>Submit</button>
    </form>
  )
}

export default LessonForm
