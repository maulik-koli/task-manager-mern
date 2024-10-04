import React from 'react'

import classes from '../stlyes/Profile.module.css'
const { profCon, profImg, profDet } = classes

const ShowProfilePage = () => {
  return (
    <div className={profCon}>
        <div className={profImg}>Might be image</div>
        <div className={profDet}>
            <h1>UserName</h1>
            <p>email123@example.com</p>
        </div>
    </div>
  )
}

export default ShowProfilePage
