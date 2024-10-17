import React from 'react'

import classes from '../styles/Project.module.css'
import ProjectContainer from '../components/ProjectContainer'
const { projectCon, addProjectCon } = classes

const AddProjectPage = () => {
  return (
    <div className={projectCon}>
      <ProjectContainer
        containerClass={addProjectCon}
        containerButtons="add"
      />
    </div>
  )
}

export default AddProjectPage
