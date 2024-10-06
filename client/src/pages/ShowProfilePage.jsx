import React from 'react'
import { Link } from 'react-router-dom'

import classes from '../stlyes/Profile.module.css'
const { profCon, profImg, profDet, date, profModif, profConA, profConB } = classes


const ShowProfilePage = () => {
  return (
    <div className={profCon}>
        <div className={profConA}>
          <div className={profImg}>Might be image</div>
          <div className={profDet}>
              <h1>UserName</h1>
              <p>email123@example.com</p>
              <p id={date}>29 Sep 2023</p>
          </div>
        </div>
        <div className={profConB}>
          <div className={profModif}>
            <Link to='edit-profile'>Edit Profile</Link>
            <p>You have last edited your profile at 30 Sep 2023.</p>
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
