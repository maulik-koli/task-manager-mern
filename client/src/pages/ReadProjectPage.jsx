import React, { useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import InputContainer from '../components/InputContainer'
import Loading from '../components/Loading'
import AlertMessage from '../components/AlertMessage'

import usePorject from '../hooks/useProject'

import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import classes from '../styles/Project.module.css'
const { projectCon, addProjectCon, topBtnsCon, redBtns, addProjectConA, inputCon, addProjectConB, textareaCon, projectTaskInputs, list, deletePro, projectErrorCon } = classes


const ReadProjectPage = () => {
  const params = useParams()
  const {projectHook, setProjectHook, isProjectLoading, projectError, setProjectError,  handleProjectError, updateProjectData, deleteProjectData } 
  = usePorject(params.projectId)

  const handleDeleteProject = async () => {
    await deleteProjectData(`projects/${params.projectId}`)
    const timeoutId = setTimeout(() => {
      navigate('..', { replace: true })
    }, 500)

    return () => clearTimeout(timeoutId)
  }

  const handleSave = async (data) => {
    const updateData = {
      description: data.description,
      subtasks: data.subtasks,
      title: data.title
    }
    await updateProjectData(`projects/${params.projectId}`, updateData)
  }

  const navigate = useNavigate()
  const handleBackButton = () => {
    navigate("..")
  }

  const projectTaskRef = useRef(null)
  const handleAddProjectTask = () => {
    if(projectTaskRef.current.value.toString() === '') return
    const title = projectTaskRef.current.value.toString()

    if (projectHook.subtasks.some(task => task.subtask === title)) {
      setProjectError('You cannot add tasks with the same name!')
      handleProjectError()
      return
    }

    const newTasks = [{ subtask: title }, ...projectHook.subtasks]
    setProjectHook({
      ...projectHook,
      subtasks: newTasks
    })
  }

  const handleRemoveProjectTask = (task) => {
    const newTasks = projectHook.subtasks.filter((proTask) => proTask !== task)
    setProjectHook({
      ...projectHook,
      subtasks: newTasks
    })
  }

  return (
    <div className={projectCon}>
      {isProjectLoading && <Loading />}
      {projectError && <AlertMessage msg={projectError} />}
      {(!isProjectLoading && (projectError && !projectHook) ) &&
        <div className={projectErrorCon}><p>{projectError}</p><p>Please try againg later.</p></div>
      }
      {(!isProjectLoading && (!projectError && projectHook) ) && (
        <div className={addProjectCon}>
          <div className={topBtnsCon}>
            <h1>Project</h1>
            <div>
            <button type='button' id={deletePro} onClick={handleDeleteProject} >Delete</button>
            <button type='button' onClick={() => handleSave(projectHook)} >Save</button>
            <button id={redBtns} onClick={handleBackButton}>Back</button>
            </div>
          </div>
          <div className={addProjectConA}>
            <InputContainer
              lable='Title'
              className={inputCon}
              value={projectHook.title}
              onChange={(e) => setProjectHook({...projectHook, title: e.target.value.toString() })}
              required
            />
            <div className={textareaCon}>
              <label>Discription</label>
              <textarea
                value={projectHook.description}
                onChange={(e) => setProjectHook({...projectHook, description:  e.target.value.toString() })}
                placeholder='Project discription (Optinals)'
              >
              </textarea>
            </div>
          </div>
          <div className={addProjectConB}>
            <div className={projectTaskInputs}>
              <input type='text' placeholder="Project's Task (Optinals)" ref={projectTaskRef}/>
              <button><AddCircleIcon onClick={handleAddProjectTask} /></button>
              <label>Project's Task</label>
            </div>
            <ul>
                {projectHook.subtasks.length === 0 && <></>}
                {projectHook.subtasks.length > 0 &&
                projectHook.subtasks.map((proTask, index) => (
                    <div className={list} key={proTask.subtask + index}>
                      <li>{proTask.subtask}</li>
                      <RemoveCircleIcon onClick={() => handleRemoveProjectTask(proTask.subtask)} />
                    </div>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReadProjectPage
