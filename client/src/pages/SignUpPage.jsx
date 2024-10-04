import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import Loading from '../components/Loading.jsx'
import InputContainer from '../components/InputContainer.jsx'

import { ErrorAndFetchingContext } from '../contexts/ErrorAndFetchingProvider'
import { sigupLoginUser } from '../api/userApi.js'
import { isValidPassword } from '../utils/fuctions.js'

const { container, signUp, inputCon, subBtns } = classes
import classes from '../stlyes/SignUpLogIn.module.css'


const SignUpPage = () => {
    const [isInputValid, setIsInputValid] = useState(<h4>Already has acoount <Link to="/login" relative='path'>Log In</Link></h4>)

    const { error, isFetching, setError, setIsFetching } = useContext(ErrorAndFetchingContext)

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsFetching(true)

        const fd = new FormData(event.target)
        const data = Object.fromEntries(fd.entries())
        const isValid = isValidPassword(data.password)

        if(data.password !== data['confirm-password']){
            setIsInputValid(<p>Password and Confirm password must be same</p>)
            setIsFetching(false)
            return
        }

        if(!isValid){
            setIsInputValid(<p>
                Passwrod must have minimum 8 length.<br/>Passwrod must have atleast one number.<br/>Passwrod must have arleast one special character.
            </p>)
            setIsFetching(false)
            return
        }

        delete data["confirm-password"]
        const url = "http://localhost:3000/users"
        const result = await sigupLoginUser(url, data)

        if(result.error) {
            setError(result.error)
            setIsFetching(false)
            return
        }

        console.log(result)
        setError(null)
        setIsInputValid(<></>)
        setIsFetching(false)
    }

    return (
        <div className={container} >
            {isFetching && <Loading />}
            {!isFetching && (
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
            )}
        </div>
    )
}

export default SignUpPage
