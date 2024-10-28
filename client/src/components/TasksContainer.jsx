import React, { useState } from 'react'

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import classes from '../styles/Task.module.css'
const { allTaskCon, theTask, taskBtns, taskCheckBox, commonTextStyle, taskErrorCon } = classes

const TasksContainer = ({ TASKS, onUpdate, onEdit, onDelete }) => {
    console.log('%c TaskContainer!', 'color: white; background-color: blue; font-weight: bold; border-radius: 5px;', TASKS)
    const [editId, setEditId] = useState(null)
    const [taskDescription, setTaskDescription] = useState('')

    // if(result.status === 404) return <p className={taskErrorCon}>There is no Tasks avaiable.</p>
    // if(result.error) return <p className={taskErrorCon}>Something went wrong, try again later</p>

    if(TASKS.length === 0) {
        return <div className={taskErrorCon}><p>There is no Tasks avaiable.</p></div>
    }

    const handleEditButton = (id, description) => {
        if (editId === id) {
            setEditId(null)
            setTaskDescription('')
        }
        else {
            setEditId(id)
            setTaskDescription(description)
        }
    }

    const handleSaveButton = (id) => {
        onEdit(id, taskDescription)
    }

    const handdleDeleteButton = (id) => {
        onDelete(id)
    }

    const handleChnage = (e) => {
        setTaskDescription(e.target.value)
    }

    return (
        <div className={allTaskCon}>
            <ul>
                {TASKS.map((task) => (
                   <li key={task._id} className={theTask}>
                        <div className={taskCheckBox}>
                            <input
                                type='checkbox' 
                                checked={task.completed}
                                onChange={() => onUpdate(task._id, task.completed)} 
                                disabled={editId !== null}
                            />
                        </div>
                        {editId === task._id ? (
                            <input 
                                type='text' 
                                value={taskDescription}
                                className={`${commonTextStyle}`}
                                onChange={handleChnage}
                            />
                        ) : (
                            <p className={commonTextStyle}>{task.description}</p>
                        )}
                        <div className={taskBtns}>
                            {editId !== task._id ? (
                                <>
                                    <button onClick={() => handleEditButton(task._id, task.description)}><EditIcon /></button>
                                    <button 
                                        disabled={editId !== null}
                                        onClick={() => handdleDeleteButton(task._id)}
                                    ><DeleteIcon /></button>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => handleSaveButton(task._id)}><SaveIcon /></button>
                                    <button onClick={() => handleEditButton(task._id, task.description)}><ClearIcon /></button>
                                </>
                            )}
                        </div>
                    </li> 
                ))}
            </ul>
        </div>
    )
}

export default TasksContainer
