import React from 'react'

import classes from '../stlyes/SignUpLogIn.module.css'
import SignUp from '../components/SignUp'

const { container } = classes

const SignUpLogIn = () => {
  return (
    <div className={container}>
      <SignUp />
    </div>
  )
}

export default SignUpLogIn
