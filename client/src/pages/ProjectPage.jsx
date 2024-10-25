import React from 'react'
import { Link, useLoaderData, useNavigate  } from 'react-router-dom'

import AddBoxIcon from '@mui/icons-material/AddBox';
import classes from '../styles/Project.module.css'
const { projectHeader, projectGrid, projectItem, projectErrorCon } = classes

const ProjectPage = () => {
  const result = useLoaderData()
  const { data: PROJECTS, error } = result
  console.log(result)
  const navigate = useNavigate()

  if (error) {
    return <div className={projectErrorCon}><p>{error}</p><Link to='/project/add-project'>Add Project</Link></div>;
  }

  const handleNavigation = (id) => {
    navigate(`/project/${id}/read-project`)
  }

  console.log("in project page", PROJECTS)
  console.log("in project page1", error)

  return (
    <>
     <div className={projectHeader}><Link to='/project/add-project'><AddBoxIcon />Add project</Link></div>
      <div className={projectGrid}>
        {PROJECTS.map(project => (
          <div key={project._id} className={projectItem} onClick={() => handleNavigation(project._id)}>
            <h3>{project.title}</h3>
          </div>
        ))}
      </div>
    </>
  )
}

export default ProjectPage
