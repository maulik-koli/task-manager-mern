import React from 'react'
import { Outlet } from 'react-router-dom'

import classes from '../styles/Project.module.css'
const { project } = classes

const ProjectLayout = () => {

  return (
    <div className={project}>
      <Outlet />
    </div>
  )
}

export default ProjectLayout
