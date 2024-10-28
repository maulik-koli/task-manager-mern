import React, { useEffect, useContext } from 'react'
import { useLoaderData } from 'react-router-dom'

import TasksContainer from '../components/TasksContainer'
import Loading from '../components/Loading'
import useTasks from '../hooks/useTasks'

import classes from '../styles/Task.module.css'
const { taskErrorCon } = classes
let useLoaderDataFlag = true

const TaskCompletedPage = () => {
    const { tasks, isTaskLoading, updateTask, editTask, deleteTask } = useTasks(true)
    const result = useLoaderData()

    if(result.status === 404) return <p className={taskErrorCon}>There is no Tasks avaiable.</p>
    if(result.error) return <p className={taskErrorCon}>Something went wrong, try again later</p>

    useEffect(() => {
        useLoaderDataFlag = false
    }, [])

    return (
        <>
            {isTaskLoading ? <Loading /> :
                <TasksContainer 
                    TASKS={useLoaderDataFlag ? result.data : tasks}
                    onUpdate={updateTask}
                    onEdit={editTask}
                    onDelete={deleteTask}
                />
            }
        </>
    )
}

export default TaskCompletedPage
