import React from 'react'
import { Link } from 'react-router-dom'

import AddBoxIcon from '@mui/icons-material/AddBox';
import classes from '../styles/Project.module.css'
const { projectHeader } = classes

const PROJECTS = []

const ProjectPage = () => {

  return (
    <>
     <div className={projectHeader}><Link to='/project/add-project'><AddBoxIcon />Add project</Link></div>
    </>
  )
}

export default ProjectPage
