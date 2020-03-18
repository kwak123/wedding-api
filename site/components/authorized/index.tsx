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
    data-testid={AUTH_FORM_ID}
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
        <React.Fragment data-testid={AUTH_CHILDREN_ID}>
          {children}
        </React.Fragment>
      ) : (
        <AuthForm onSubmit={handleSubmit} />
      )}
    </>
  )
}

export default Authorized
