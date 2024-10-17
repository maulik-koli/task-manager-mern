import React, { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import InputContainer from './InputContainer'
import AlertMessage from './AlertMessage';

import { ErrorAndFetchingContext } from '../contexts/ErrorAndFetchingProvider';
import { DataContext } from '../contexts/DataProvider'

import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import classes from '../styles/Project.module.css'
const { topBtnsCon, redBtns, addProjectConA, inputCon, addProjectConB, textareaCon, projectTaskInputs, list } = classes

const ProjectContainer = ({ containerClass, containerButtons , fetchProjectData, handleSave}) => {
    const { responseMessage, setResponseMessage } = useContext(ErrorAndFetchingContext)
    const { postCreatedData } = useContext(DataContext)
    const [projectData, setProjectData] = useState(fetchProjectData)
    const projectTaskRef = useRef(null)

    const navigate = useNavigate()

    const handleAddProjectTask = () => {
        const title = projectTaskRef.current.value.toString()
        if (projectData.subtasks.some(task => task.title === title)) {
            setResponseMessage('You cannot add tasks with the same name!');
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
            setResponseMessage('You must add a title for the project!')
            return
        }
    
        await postCreatedData('projects', {
            title: projectData.title.toString(),
            description: projectData.description.toString(),
            subtasks: projectData.subtasks.map(task => ({ title: task.title }))
        })
    }


    let topBtns = containerButtons === 'add' ? 
        (
            <>
                <button type='submit' onClick={handleSubmit} >Add</button>
                <button id={redBtns} onClick={handleBackButton}>Cancle</button>
            </>
        ) : 
        (
            <>
                <button type='submit' onClick={() => handleSave(projectData)} >Save</button>
                <button id={redBtns} onClick={handleBackButton}>Back</button>
            </>
        )

    return (
        <>  
            {responseMessage && <AlertMessage />}
            <div className={containerClass}>
                <div className={topBtnsCon}>
                    <h1>Create Project</h1>
                    <div>
                        {topBtns}
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
    )
}

export default ProjectContainer
