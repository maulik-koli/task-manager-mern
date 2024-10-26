import React, { useContext } from 'react'
import { useLoaderData } from 'react-router-dom'

import { TaskContext } from '../contexts/TaskProvider'
import TasksContainer from '../components/TasksContainer'

const TaskPendingPage = () => {
    const result = useLoaderData()

    return (
        <>
            <TasksContainer TASKS={result.data}/>
        </>
    )
}

export default TaskPendingPage
