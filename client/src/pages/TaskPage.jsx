import React, { useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'

import TasksContainer from '../components/TasksContainer'
import Loading from '../components/Loading'

import useTasks from '../hooks/useTasks'
let useLoaderDataFlag = true

const TaskPage = () => {
    const { tasks, isTaskLoading, updateTask } = useTasks(null)
    const result = useLoaderData()

    useEffect(() => {
        useLoaderDataFlag = false
    }, [])

    return (
        <>
            {isTaskLoading ? <Loading /> :
                <TasksContainer 
                    TASKS={useLoaderDataFlag ? result.data : tasks}
                    onUpdate={updateTask}
                />
            }
        </>
    )
}

export default TaskPage
