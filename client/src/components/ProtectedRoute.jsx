import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { UserContext } from '../contexts/UserProvider'
import Loading from './Loading'

const ProtectedRoute = ({ children }) => {
    const { user, userError, userLoading } = useContext(UserContext)

    if(userLoading) {
        return <Loading />
    }

    if(!user || userError){
        return <Navigate to='/auth/login' replace />
    }

    return ( children )
}

export default ProtectedRoute
