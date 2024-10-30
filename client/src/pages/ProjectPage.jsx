import React from 'react'
import { Link, useLoaderData, useNavigate  } from 'react-router-dom'

import AddBoxIcon from '@mui/icons-material/AddBox';
import classes from '../styles/Project.module.css'
const { projectHeader, projectGrid, projectItem, projectErrorCon } = classes

const ProjectPage = () => {
  const result = useLoaderData()
  const navigate = useNavigate()
  
  if(result.error) {
    if(result.status === 404){
      return <div className={projectErrorCon}><p>{result.error}</p><Link to='/project/add-project'>Add Project</Link></div>
    }
    else{
      return <div className={projectErrorCon}><p>{result.error}</p></div>
    }
  }
  
  const handleNavigation = (id) => {
    navigate(`/project/${id}/read-project`)
  }
  
  const { data: PROJECTS } = result

  return (
    <>
     <div className={projectHeader}><Link to='/project/add-project'><AddBoxIcon />Add project</Link></div>
      <div className={projectGrid}>
        {PROJECTS.length === 0 && 
          <div className={projectErrorCon}><p>{result.error}</p><Link to='/project/add-project'>Add Project</Link></div>
        }
        {PROJECTS.length > 0 && 
        PROJECTS.map(project => (
          <div key={project._id} className={projectItem} onClick={() => handleNavigation(project._id)}>
            <h3>{project.title}</h3>
          </div>
        ))}
      </div>
    </>
  )
}

export default ProjectPage
