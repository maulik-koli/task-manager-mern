import React from 'react'

import TasksContainer from '../components/TasksContainer'
import Loading from '../components/Loading'
import useTasks from '../hooks/useTasks'

import classes from '../styles/Task.module.css'
const { taskErrorCon } = classes

const TaskPendingPage = () => {
    const { tasks, isTaskLoading, taskError, updateTask, editTask, deleteTask } = useTasks(false)

    return (
        <>
            {isTaskLoading && <Loading />}
            {!isTaskLoading &&
            <>
                {taskError ? (
                <div className={taskErrorCon}>
                    <p>{taskError}</p>
                </div>
                ) :
                <TasksContainer 
                    TASKS={tasks}
                    onUpdate={updateTask}
                    onEdit={editTask}
                    onDelete={deleteTask}
                />}
            </>}
        </>
    )
}

export default TaskPendingPage
