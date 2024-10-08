import React from 'react'

import classes from '../styles/Home.module.css'

const { homeText } = classes

const HomeText = () => {
  return (
    <div className={homeText}>
      <h1>This is Home Page</h1>
      <p>Mern-stack Task Manager project</p>
    </div>
  )
}

export default HomeText
