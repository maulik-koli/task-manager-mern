import React, { useEffect, useContext, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import InputContainer from '../components/InputContainer'
import Loading from '../components/Loading'
import AlertMessage from '../components/AlertMessage'

import { DataContext } from '../contexts/DataProvider'

import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import classes from '../styles/Project.module.css'
const { projectCon, addProjectCon, topBtnsCon, redBtns, addProjectConA, inputCon, addProjectConB, textareaCon, projectTaskInputs, list, deletePro } = classes


const ReadProjectPage = () => {
  const params = useParams()
  const { 
    isDataLoading,
    setIsDataLoading,
    setDataResponse,
    singleResponseData,
    setSingleResponseData,
    patchUpdateData,
    dateResponse,
    fetchResponseData,
    deleteTheData
  } = useContext(DataContext)
  const projectTaskRef = useRef(null)
  
  const navigate = useNavigate()
  const handleBackButton = () => {
    navigate("..")
  }

  useEffect(() => {
    const readSingleProject = async () => {
      const url = `projects/${params.projectId}`
      await fetchResponseData(url)
      setIsDataLoading(false)
    }
    readSingleProject()
    console.log("read", singleResponseData)
  }, [])

  const handleAddProjectTask = () => {
    if(projectTaskRef.current.value.toString() === '') return
    const title = projectTaskRef.current.value.toString()
    if (singleResponseData.subtasks.some(task => task.subtask === title)) {
        setDataResponse('You cannot add tasks with the same name!');
        return
    }

    const newTasks = [{ subtask: title }, ...singleResponseData.subtasks]
    setSingleResponseData({
        ...singleResponseData,
        subtasks: newTasks
    });
  };

  const handleRemoveProjectTask = (task) => {
    const newTasks = singleResponseData.subtasks.filter((proTask) => proTask !== task)
    setSingleResponseData({
        ...singleResponseData,
        subtasks: newTasks
    })
  }

  const handleSave = async (data) => {
    setIsDataLoading(true)
    await patchUpdateData(`projects/${params.projectId}`, data)
  }

  const handleDeleteProject = async () => {
    const url = `projects/${params.projectId}`
    await deleteTheData(url)
    const timeoutId = setTimeout(() => {
      navigate('..', { replace: true });
    }, 500);

    return () => clearTimeout(timeoutId);
  } 

  return (
    <div className={projectCon}>
      <>
      {dateResponse && <AlertMessage msg={dateResponse} />}
      {(!singleResponseData || isDataLoading ) ? <Loading /> :
      <div className={addProjectCon}>
        <div className={topBtnsCon}>
          <h1>Create Project</h1>
          <div>
          <button type='button' id={deletePro} onClick={handleDeleteProject} >Delete</button>
          <button type='button' onClick={() => handleSave(singleResponseData)} >Save</button>
          <button id={redBtns} onClick={handleBackButton}>Back</button>
          </div>
        </div>
        <div className={addProjectConA}>
            <InputContainer
              lable='Title'
              className={inputCon}
              value={singleResponseData.title}
              onChange={(e) => setSingleResponseData({...singleResponseData, title: e.target.value.toString() })}
              required
            />
            <div className={textareaCon}>
              <label>Discription</label>
              <textarea
                value={singleResponseData.description}
                onChange={(e) => setSingleResponseData({...singleResponseData, description:  e.target.value.toString() })}
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
              {singleResponseData.subtasks.map((proTask, index) => (
                  <div className={list} key={proTask.subtask + index}>
                    <li>{proTask.subtask}</li>
                    <RemoveCircleIcon onClick={() => handleRemoveProjectTask(proTask.subtask)} />
                  </div>
              ))}
          </ul>
        </div>
      </div>}
      </> 
    </div>
  )
}

export default ReadProjectPage
