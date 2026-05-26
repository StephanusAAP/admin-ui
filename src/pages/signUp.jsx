import React from 'react'
import AuthLayout from "../components/Layouts/AuthLayout"
import FormSignUp from "../components/Fragments/FormSignIn"

function SignIn() {
  return (
    <AuthLayout>
        <FormSignUp />
    </AuthLayout>
  )
}

export default SignIn