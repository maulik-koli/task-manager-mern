import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import InputContainer from '../components/InputContainer.jsx'
import AlertMessage from '../components/AlertMessage.jsx';

import { UserContext } from '../contexts/UserProvider.jsx';
import { ErrorAndFetchingContext } from '../contexts/ErrorAndFetchingProvider';
import { sigupLoginUser } from '../api/userApi.js'
import { isValidPassword } from '../utils/fuctions.js'

const { container, logIn, inputCon, subBtns } = classes
import classes from '../styles/SignUpLogIn.module.css'


const LogIn = () => {
    const { fetchUser } = useContext(UserContext)
    const { responseMessage, setResponseMessage } = useContext(ErrorAndFetchingContext)
    const [isInputValid, setIsInputValid] = useState(<h4>Don't have acoount <Link to="/auth/signup" relative='path'>Sign Up</Link></h4>)

    const handleSubmit = async (event) => {
        event.preventDefault()
        
        const fd = new FormData(event.target)
        const data = Object.fromEntries(fd.entries())
        const isValid = isValidPassword(data.password)

        if(!isValid){
            setIsInputValid(<p>Password is not correct</p>)
            return
        }

        const result = await sigupLoginUser("login", data)
        
        if(result.error) {
            setResponseMessage(result.error)
            return
        }

        console.log("in login", result) // remove this after
        await fetchUser()
        setResponseMessage('You have succefully log in.')
        event.target.reset();
        setIsInputValid(<></>)
    }

    return (
        <div className={container} >
            {responseMessage && <AlertMessage path='/' />}
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
    </div>
    )
}

export default LogIn
