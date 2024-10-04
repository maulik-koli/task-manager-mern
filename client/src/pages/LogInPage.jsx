import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import Loading from '../components/Loading.jsx'
import InputContainer from '../components/InputContainer.jsx'

import { ErrorAndFetchingContext } from '../contexts/ErrorAndFetchingProvider'
import { sigupLoginUser } from '../api/userApi.js'
import { isValidPassword } from '../utils/fuctions.js'

const { container, logIn, inputCon, subBtns } = classes
import classes from '../stlyes/SignUpLogIn.module.css'


const LogIn = () => {
    const [isInputValid, setIsInputValid] = useState(<h4>Don't have acoount <Link to="/signup" relative='path'>Sign Up</Link></h4>)

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

        console.log(result)
        setError(null)
        setIsInputValid(<></>)
        setIsFetching(false)
    }

    return (
        <div className={container} >
        {isFetching && <Loading />}
        {!isFetching && (
            <div className={logIn}>
                <h1>Log In</h1>
                <form onSubmit={handleSubmit}>
                    <InputContainer className={inputCon} lable="Email" type="email" name="email" required />
                    <InputContainer className={inputCon} lable="Password" type="password" name="password" required />
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

export default LogIn