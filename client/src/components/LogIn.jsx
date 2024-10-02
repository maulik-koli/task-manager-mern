import React, { useContext, useState } from 'react'

import Loading from './Loading'

import { ErrorAndFetchingContext } from '../contexts/ErrorAndFetchingProvider'
import { sigupLoginUser } from '../api/userApi.js'
import { isValidPassword } from '../utils/fuctions.js'

import classes from '../stlyes/SignUpLogIn.module.css'
const { logIn, inoutContainer, inputs, formBtns } = classes

const LogIn = () => {
    const [isInputValid, setIsInputValid] = useState(<></>)

    const { error, isFetching, setError, setIsFetching } = useContext(ErrorAndFetchingContext)

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsFetching(true)
        
        const fd = new FormData(event.target)
        const data = Object.fromEntries(fd.entries())
        const isValid = isValidPassword(data.password)

        if(!isValid){
            setIsInputValid(<p>Password is not correct</p>)
            setIsFetching(false)
            return
        }

        const url = "http://localhost:3000/users/login"
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
        <div className={logIn}>
            {isFetching && <Loading />}
            {!isFetching && (
                <>
                    <h1>Log In</h1>
                    <form onSubmit={handleSubmit}>
                        <div className={inputs}>
                            <div className={inoutContainer}>
                                <input type='email' placeholder='Enter email' name='email' required />
                                <label>Email</label>
                            </div>
                            <div className={inoutContainer}>
                                <input type='password' placeholder='Password' name='password' required />
                                <label>Password</label>
                            </div>
                        </div>
                        <div className={formBtns} >
                            <button type='submit' style={{ backgroundColor: '#353535' }}>Log In</button>
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

export default LogIn
