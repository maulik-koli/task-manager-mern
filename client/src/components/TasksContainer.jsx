import React, { useState } from 'react'

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import classes from '../styles/Task.module.css'
const { allTaskCon, theTask, taskBtns, taskCheckBox, commonTextStyle, taskErrorCon } = classes

const TasksContainer = ({ TASKS, onUpdate, onEdit, onDelete }) => {
    const [editId, setEditId] = useState(null)
    const [taskDescription, setTaskDescription] = useState('')

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
        setEditId(null)
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
                {TASKS.length === 0 && <div className={taskErrorCon}><p>You have no tasks available yet.</p></div>}
                {TASKS.length > 0 && 
                TASKS.map((task) => (
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
