import React from 'react'

import classes from '../stlyes/SignUpLogIn.module.css'
import SignUp from '../components/SignUp'
import LogIn from '../components/LogIn'

const { container } = classes

const SignUpLogIn = () => {
  return (
    <div className={container}>
      {/* <SignUp /> */}
      <LogIn />
    </div>
  )
}

export default SignUpLogIn
