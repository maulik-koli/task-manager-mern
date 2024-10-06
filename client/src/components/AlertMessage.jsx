import React, { useContext } from 'react'

import { ErrorAndFetchingContext } from '../contexts/ErrorAndFetchingProvider'

const AlertMessage = () => {
    const { errorMessage, setErrorMessage } = useContext(ErrorAndFetchingContext)

    if(!errorMessage) {
        return null
    }

    return (
    <div className="alertMessage">
        <p>{errorMessage}</p>
        <button className="closeButton" onClick={() => setErrorMessage(null)}>Close</button>
    </div>
    )
}

export default AlertMessage
