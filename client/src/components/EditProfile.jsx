import React, { useContext } from 'react'

import { UserContext } from '../contexts/UserProvider'

import classes from '../stlyes/Profile.module.css'
const { me, inputsCon, inputs } = classes

const EditProfile = () => {
    const { user } = useContext(UserContext)

    return (
        <div className={me}>
        <div className={inputs}>
            <div className={inputsCon} >
                <input type='text' placeholder='Enter name' name='name' value={user.name} />
                <label>Name</label>
            </div>
            <div className={inputsCon}>
                <input type='email' placeholder='Enter email' name='email' value={user.email} />
                <label>Email</label>
            </div>
            <div className={inputsCon}>
                <input type='password' placeholder='Password' name='password' />
                <label>Password</label>
            </div>
        </div>
        </div>
    )
}

export default EditProfile
