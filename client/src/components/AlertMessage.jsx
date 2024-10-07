import React, { useContext } from 'react'

import { ErrorAndFetchingContext } from '../contexts/ErrorAndFetchingProvider'
import { useNavigate } from 'react-router-dom'

const AlertMessage = ({ path }) => {
    const { responseMessage, setResponseMessage } = useContext(ErrorAndFetchingContext)
    const navigate = useNavigate()

    if(!responseMessage) {
        return null
    }

    const handleClockButton = () => {
        if(path){
            navigate(path)
        }
        setResponseMessage(null)
    }

    return (
    <div className="alertMessage">
        <p>{responseMessage}</p>
        <button className="closeButton" onClick={handleClockButton}>Close</button>
    </div>
    )
}

export default AlertMessage
