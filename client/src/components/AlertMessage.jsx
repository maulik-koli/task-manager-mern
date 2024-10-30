import React, { useContext, useEffect } from 'react'

import { UserContext } from '../contexts/UserProvider.jsx';
import { DataContext } from '../contexts/DataProvider.jsx';
import { useNavigate } from 'react-router-dom'

const AlertMessage = ({ path, msg, timeOut }) => {
    const { setUserResponse } = useContext(UserContext)
    const { setDataResponse } = useContext(DataContext)
    const navigate = useNavigate()

    useEffect(() => {
        const timer = setTimeout(() => {
            setUserResponse(null)
            setDataResponse(null)
        }, timeOut || 1000)

        return () => clearTimeout(timer)
    }, [])

    const handleClockButton = () => {
        if(path){
            navigate(path)
        }
        setUserResponse(null)
        setDataResponse(null)
    }

    return (
    <div className="alertMessage">
        <p>{msg}</p>
        <button className="closeButton" onClick={handleClockButton}>Close</button>
    </div>
    )
}

export default AlertMessage
