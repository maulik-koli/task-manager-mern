import React from 'react'
import { Link, useLoaderData, useNavigate  } from 'react-router-dom'

import AddBoxIcon from '@mui/icons-material/AddBox';
import classes from '../styles/Project.module.css'
const { projectHeader, projectGrid, projectItem } = classes

const ProjectPage = () => {
  const { data: PROJECTS, error } = useLoaderData()

  const navigate = useNavigate()

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleNavigation = (id) => {
    navigate(`/project/${id}/read-project`)
  }
  
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
