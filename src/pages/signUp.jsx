import React from 'react'
import AuthLayout from "../components/Layouts/AuthLayout"
import FormSignUp from "../components/Fragments/FromSignUp"

function SignUp() {
  return (
    <AuthLayout title="Create an account" type="signup">
        <FormSignUp />
    </AuthLayout>
  )
}

export default SignUp