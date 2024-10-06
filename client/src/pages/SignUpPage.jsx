import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import Loading from '../components/Loading.jsx'
import InputContainer from '../components/InputContainer.jsx'

import { sigupLoginUser } from '../api/userApi.js'
import { isValidPassword } from '../utils/fuctions.js'

const { container, signUp, inputCon, subBtns } = classes
import classes from '../stlyes/SignUpLogIn.module.css'


const SignUpPage = () => {
    const [isInputValid, setIsInputValid] = useState(<h4>Already has acoount <Link to="/login" relative='path'>Log In</Link></h4>)

    const handleSubmit = async (event) => {
        event.preventDefault()

        const fd = new FormData(event.target)
        const data = Object.fromEntries(fd.entries())
        const isValid = isValidPassword(data.password)

        if(data.password !== data['confirm-password']){
            setIsInputValid(<p>Password and Confirm password must be same</p>)
            return
        }

        if(!isValid){
            setIsInputValid(<p>
                Passwrod must have minimum 8 length.<br/>Passwrod must have atleast one number.<br/>Passwrod must have arleast one special character.
            </p>)
            return
        }

        delete data["confirm-password"]
        const BASE_URL = ""
        const result = await sigupLoginUser(BASE_URL, data)

        if(result.error) {
            console.log(result.error)
            return
        }

        console.log(result)
        setIsInputValid(<></>)
    }

    return (
        <div className={container} >
            <div className={signUp}>
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <InputContainer className={inputCon} lable="Name" type="text" name="name" required />
                    <InputContainer className={inputCon} lable="Email" type="email" name="email" required />
                    <InputContainer className={inputCon} lable="Password" type="password" name="password" required />
                    <InputContainer className={inputCon} lable="Confirm Password" type="password" name="confirm-password" required />
                    <div className={subBtns}>
                        <button type='submit'>Submit</button>
                        <button type='reset'>Reset</button>
                    </div>
                </form>
                {isInputValid}
            </div>
        </div>
    )
}

export default SignUpPage
