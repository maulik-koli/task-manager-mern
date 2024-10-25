import React, { useState, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import InputContainer from '../components/InputContainer';
import AlertMessage from '../components/AlertMessage';

import { DataContext } from '../contexts/DataProvider';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import classes from '../styles/Project.module.css'
const { projectCon, addProjectCon, topBtnsCon, redBtns, addProjectConA, inputCon, addProjectConB, textareaCon, projectTaskInputs, list } = classes

const INITIAL_PROJECT = { 
  title: "",
  description: "",
  subtasks: []
}

const AddProjectPage = () => {
  const { postCreatedData, dateResponse, setDataResponse } = useContext(DataContext)
  const [projectData, setProjectData] = useState(INITIAL_PROJECT)
  const projectTaskRef = useRef(null)

  const navigate = useNavigate()

  const handleAddProjectTask = () => {
    const title = projectTaskRef.current.value.toString()
    if (projectData.subtasks.some(task => task.title === title)) {
        setDataResponse('You cannot add tasks with the same name!');
        return
    }

    const newTasks = [{ title }, ...projectData.subtasks];
    setProjectData({
        ...projectData,
        subtasks: newTasks
    });
  };

  const handleRemoveProjectTask = (task) => {
    const newTasks = projectData.subtasks.filter((proTask) => proTask !== task)
    setProjectData({
        ...projectData,
        subtasks: newTasks
    })
  }

  const handleBackButton = () => {
    navigate("..")
  }

  const handleSubmit = async () => {
    if (!projectData.title || projectData.title.trim() === '') {
        setDataResponse('You must add a title for the project!')
        return
    }

    const createdProjectData = await postCreatedData('projects', {
        title: projectData.title.toString(),
        description: projectData.description.toString(),
        subtasks: projectData.subtasks.map(task => ({ title: task.title }))
    })
    setProjectData(createdProjectData)
    setDataResponse("123")
  }

  return (
    <div className={projectCon}>
      <>
      {dateResponse && <AlertMessage msg={dateResponse} />}
      <div className={addProjectCon}>
        <div className={topBtnsCon}>
          <h1>Create Project</h1>
          <div>
            <button type='submit' onClick={handleSubmit} >Add</button>
            <button id={redBtns} onClick={handleBackButton}>Cancle</button>
          </div>
        </div>
        <div className={addProjectConA}>
            <InputContainer
              lable='Title'
              className={inputCon}
              value={projectData.title}
              onChange={(e) => setProjectData({...projectData, title: e.target.value.toString() })}
              required
            />
            <div className={textareaCon}>
              <label>Discription</label>
              <textarea
                value={projectData.description}
                onChange={(e) => setProjectData({...projectData, description:  e.target.value.toString() })}
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
              {projectData.subtasks.map((proTask, index) => (
                  <div className={list} key={proTask.title + index}>
                    <li>{proTask.title}</li>
                    <RemoveCircleIcon onClick={() => handleRemoveProjectTask(proTask.title)} />
                  </div>
              ))}
          </ul>
        </div>
      </div>
      </> 
    </div>
  )
}

export default AddProjectPage
