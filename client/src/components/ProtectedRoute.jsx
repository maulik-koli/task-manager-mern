import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import RootLayout from '../pages/RootLayout'
import { UserContext } from '../contexts/UserProvider'

const ProtectedRoute = ({ children }) => {
    const { user, userLoading } = useContext(UserContext)

    if (userLoading) {
        return <RootLayout userLoading/>;
    }

    if (!user) {
        return <Navigate to='/auth/login' replace />
    }

    return ( children )
}

export default ProtectedRoute
