import React from 'react'

import classes from '../stlyes/Profile.module.css'

const { control } = classes

const ProfileControler = () => {

    const handleEditProfile = () => {

    }

    return (
        <div className={control}>
        <button>Edit Profile</button>
        <button>Logout</button>
        <button>Logout All</button>
        <button>Delete Account</button>
        </div>
    )
}

export default ProfileControler
