import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { UserContext } from '../contexts/UserProvider'

const ProtectedRoute = ({ children }) => {
    const { user, userLoading } = useContext(UserContext);

    // While loading user data, you can show a loader or placeholder
    if (userLoading) {
        return <div>Loading...</div>; // Or a spinner, etc.
    }

    // If user is not authenticated, redirect to login
    if (!user) {
        return <Navigate to='/auth/login' replace />;
    }

    return ( children )
}

export default ProtectedRoute
