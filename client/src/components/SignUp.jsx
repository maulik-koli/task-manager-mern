import React, { useState } from 'react'

import classes from '../stlyes/SignUpLogIn.module.css'

const { signUp, inputs, formBtns, inoutContainer } = classes

const SignUp = () => {
    const [isMatch, setIsMatch] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault()

        const fd = new FormData(event.target)
        const data = Object.fromEntries(fd.entries())

        if(data.password !== data['confirm-password']){
            setIsMatch(true)
            return
        }

        delete data["confirm-password"]
        console.log(data)
        setIsMatch(fals
    }

    return (
        <div className={signUp} >
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div className={inputs}>
                    <div className={inoutContainer} >
                        <input type='text' placeholder='Enter name' name='name'  required/>
                        <label>Name</label>
                    </div>
                    <div className={inoutContainer}>
                        <input type='email' placeholder='Enter email' name='email' required/>
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
            <p>this is error message</p>
        </div>
    )
}

export default SignUp
