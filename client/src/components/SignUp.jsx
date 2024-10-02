import React, { useContext, useState } from 'react'

import Loading from './Loading'

import { ErrorAndFetchingContext } from '../contexts/ErrorAndFetchingProvider'
import { sigupLoginUser } from '../api/userApi.js'
import { isValidPassword } from '../utils/fuctions.js'

import classes from '../stlyes/SignUpLogIn.module.css'
const { signUp, inputs, formBtns, inoutContainer } = classes


const SignUp = () => {
    const [isInputValid, setIsInputValid] = useState(<></>)

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

        setError(null)
        setIsInputValid(<></>)
        setIsFetching(false)
    }

    return (
        <div className={signUp} >
            {isFetching && <Loading />}
            {!isFetching && (
                <>
                    <h1>Sign Up</h1>
                    <form onSubmit={handleSubmit}>
                        <div className={inputs}>
                            <div className={inoutContainer} >
                                <input type='text' placeholder='Enter name' name='name' required />
                                <label>Name</label>
                            </div>
                            <div className={inoutContainer}>
                                <input type='email' placeholder='Enter email' name='email' required />
                                <label>Email</label>
                            </div>
                            <div className={inoutContainer}>
                                <input type='password' placeholder='Password' name='password' required />
                                <label>Password</label>
                            </div>
                            <div className={inoutContainer}>
                                <input type='password' placeholder='Confirm password' name='confirm-password' required />
                                <label>Confirm password</label>
                            </div>
                        </div>
                        <div className={formBtns} >
                            <button type='submit' style={{ backgroundColor: '#353535' }}>Submit</button>
                            <button type='reset'>Reset</button>
                        </div>
                    </form>
                    {isInputValid}
                    {error && <p>{error}</p>}
                </>
            )}
        </div>
    )
}

export default SignUp
