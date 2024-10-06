import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { useUser } from '../hooks/useUser'

import classes from '../stlyes/Profile.module.css'
const { profCon, profImg, profDet, date, profModif, profConA, profConB } = classes


const ShowProfilePage = () => {
  const { user } = useUser()

  console.log("in the show peofile page" , user)

  return (
    <div className={profCon}>
        <div className={profConA}>
          <div className={profImg}>Might be image</div>
          <div className={profDet}>
              <h1>{user.name}</h1>
              <p>{user.email}</p>
              <p id={date}><b>Account created at : </b>{user.createdAt}</p>
          </div>
        </div>
        <div className={profConB}>
          <div className={profModif}>
            <Link to='edit-profile'>Edit Profile</Link>
            <p>You have last edited your profile at {user.updatedAt}</p>
          </div>
          <div className={profModif}>
            <button>Log Out</button>
            <p>Log out from this decive.</p>
          </div>
          <div className={profModif}>
            <button>All Log Out</button>
            <p>Log out from all the decives.</p>
          </div>
          <div className={profModif}>
            <button>Delete Account</button>
            <p>Delete your account permenentally.</p>
          </div>
        </div>
    </div>
  )
}

export default ShowProfilePage
