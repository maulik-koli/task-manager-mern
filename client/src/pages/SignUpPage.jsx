import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import InputContainer from '../components/InputContainer.jsx'
import AlertMessage from '../components/AlertMessage.jsx';

import { UserContext } from '../contexts/UserProvider.jsx';
import { sigupLoginUser } from '../api/userApi.js'
import { isValidPassword } from '../utils/fuctions.js'

const { container, signUp, inputCon, subBtns } = classes
import classes from '../styles/SignUpLogIn.module.css'


const SignUpPage = () => {
    const { fetchUser, userResponse, setUserResponse } = useContext(UserContext)
    const [isInputValid, setIsInputValid] = useState(<h4>Already has acoount? <Link to="/auth/login" relative='path'>Log In</Link></h4>)

    const navigate = useNavigate()

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
        const result = await sigupLoginUser("", data)

        if(result.error) {
            setUserResponse(result.error)
            return
        }

        console.log("in sign in", result)
        await fetchUser()
        setUserResponse('You have succefully sign up.')
        event.target.reset();
        setIsInputValid(<></>)

        const timeoutId = setTimeout(() => {
            navigate('/', { replace: true });
        }, 1000);

        return () => clearTimeout(timeoutId);
    }

    return (
        <div className={container} >
            {userResponse && <AlertMessage path='/' />}
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
