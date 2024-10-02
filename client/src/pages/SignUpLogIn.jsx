import React from 'react'

import classes from '../stlyes/SignUpLogIn.module.css'
import SignUp from '../components/SignUp'
import LogIn from '../components/LogIn'

const { container } = classes

const SignUpLogIn = () => {
  return (
    <>
        <h1>Somthing</h1>
        <div className={container}>
          {/* <SignUp /> */}
          <LogIn />
        </div>
    </>
  )
}

export default SignUpLogIn
