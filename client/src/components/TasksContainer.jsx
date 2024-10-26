import React from 'react'

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import classes from '../styles/Task.module.css'
const { allTaskCon, theTask, taskBtns, taskCheckBox } = classes

const TasksContainer = ({ TASKS }) => {
    console.log(TASKS)
    return (
        <div className={allTaskCon}>
            <ul>
                {TASKS.map((task) => (
                   <li key={task._id}>
                    <div className={theTask}>
                        <div className={taskCheckBox}>
                            <input type='checkbox' />
                        </div>
                        <p>{task.description}</p>
                        <div className={taskBtns}>
                            <button><EditIcon /></button>
                            <button><DeleteIcon/></button>
                        </div>
                    </div>
                    </li> 
                ))}
            </ul>
        </div>
    )
}

export default TasksContainer