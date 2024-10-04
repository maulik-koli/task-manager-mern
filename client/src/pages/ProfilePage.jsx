import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'

import { UserContext } from '../contexts/UserProvider'

import classes from '../stlyes/Profile.module.css'
const { profile } = classes

const ProfilePage = () => {
    const { user } = useContext(UserContext)

    return (
        <div className={profile}>
           <Outlet />
        </div>
    )
}

export default ProfilePage
