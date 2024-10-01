import React, { useState } from 'react'

import { createUser } from '../api/userApi.js'
import { isValidPassword } from '../utils/fuctions.js'

import classes from '../stlyes/SignUpLogIn.module.css'
const { signUp, inputs, formBtns, inoutContainer } = classes


const SignUp = () => {
    const [isInputValid, setIsInputValid] = useState(<></>)

    const handleSubmit = (event) => {
        event.preventDefault()

        const fd = new FormData(event.target)
        const data = Object.fromEntries(fd.entries())

        if(data.password !== data['confirm-password']){
            setIsInputValid(<p>Password and Confirm password must be same</p>)
            return
        }

        const isValid = isValidPassword(data.password)

        if(!isValid){
            setIsInputValid(<p>
                Passwrod must have minimum 8 length.<br/>Passwrod must have atleast one number.<br/>Passwrod must have arleast one special character.
            </p>)
            return
        }

        delete data["confirm-password"]
        setIsInputValid(<></>)
        const url = "http://localhost:3000/users"
        createUser(url, data)
    }

    return (
        <div className={signUp} >
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div className={inputs}>
                    <div className={inoutContainer} >
                        <input type='text' placeholder='Enter name' name='name'  />
                        <label>Name</label>
                    </div>
                    <div className={inoutContainer}>
                        <input type='email' placeholder='Enter email' name='email' />
                        <label>Email</label>
                    </div>
                    <div className={inoutContainer}>
                        <input type='password' placeholder='Password' name='password' required/>
                        <label>Password</label>
                    </div>
                    <div className={inoutContainer}>
                        <input type='password' placeholder='Confirm password' name='confirm-password' required/>
                        <label>Confirm password</label>
                    </div>
                </div>
                <div className={formBtns} >
                    <button type='submit' style={{ backgroundColor: '#353535' }}>Submit</button>
                    <button type='reset'>Reset</button>
                </div>
            </form>
            {isInputValid}
        </div>
    )
}

export default SignUp
