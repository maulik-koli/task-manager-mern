import React from 'react'
import { Outlet } from 'react-router-dom'

import classes from '../stlyes/Profile.module.css'
const { profile } = classes

const ProfilePage = () => {
    return (
        <div className={profile}>
           <Outlet />
        </div>
    )
}

export default ProfilePage
