import React from 'react'
import { Outlet } from 'react-router-dom'

import classes from '../styles/Profile.module.css'
const { profile } = classes

const ProfileLayout = () => {
    return (
        <div className={profile}>
           <Outlet />
        </div>
    )
}

export default ProfileLayout
