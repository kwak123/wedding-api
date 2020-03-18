import * as React from "react"
import { Formik, Field, ErrorMessage, FormikProps, Form } from "formik"

interface AuthFormProps {
  onSubmit: (val: string) => void
}

export const AUTH_FORM_ID = "auth-form"
export const AUTH_CHILDREN_ID = "auth-children"

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit }) => (
  <Formik
    initialValues={{ password: "" }}
    onSubmit={values => {
      onSubmit(values.password)
    }}
  >
    {(props: FormikProps<any>) => (
      <Form>
        <ErrorMessage name="error" />
        <Field name="password" as="input" type="text" />
      </Form>
    )}
  </Formik>
)

const Authorized: React.FC = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = React.useState(false)
  const handleSubmit = (val: string) => {
    if (val === process.env.UI_PASSWORD) {
      setIsAuthorized(true)
    }
  }
  return (
    <>
      {isAuthorized ? (
        <div data-testid={AUTH_CHILDREN_ID}>{children}</div>
      ) : (
        <div data-testid={AUTH_FORM_ID}>
          <AuthForm onSubmit={handleSubmit} />
        </div>
      )}
    </>
  )
}

export default Authorized
