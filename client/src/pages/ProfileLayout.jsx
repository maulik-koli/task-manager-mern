import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'

import { UserContext } from '../contexts/UserProvider'
import classes from '../styles/Profile.module.css'
import Loading from '../components/Loading'
const { profile } = classes

const ProfileLayout = () => {
    const { userLoading } = useContext(UserContext)
    return (
        <div className={profile}>
           {userLoading && <Loading />}
           {!userLoading && <Outlet />}
        </div>
    )
}

export default ProfileLayout
