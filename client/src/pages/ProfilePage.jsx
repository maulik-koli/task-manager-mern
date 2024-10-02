import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { UserContext } from '../contexts/UserProvider'
import { ErrorAndFetchingContext } from '../contexts/ErrorAndFetchingProvider'

import ProfileControler from '../components/ProfileControler'

import classes from '../stlyes/Profile.module.css'
import Loading from '../components/Loading'
const { profile, me, meText } = classes

const ProfilePage = () => {
    const { user } = useContext(UserContext)
    const { isFetching } = useContext(ErrorAndFetchingContext)

    const navigate = useNavigate()

    if (isFetching) {
        return <Loading />;
    }

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user]); 

    return (
        <div className={profile}>
            <div className={me}>
                <div className={meText}>
                    <h1>{user.name}</h1>
                </div>
                <div className={meText}>
                    <p><b>email : </b>{user.email}</p>
                </div>
                <div className={meText}>
                    <p><b>Account create at : </b>{user.createdAt}</p>
                </div>
            </div>
            <ProfileControler />
        </div>
    )
}

export default ProfilePage
