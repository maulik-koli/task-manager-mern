import React, { useContext, useState } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

import AlertMessage from './AlertMessage';
import { DataContext } from '../contexts/DataProvider';
import { sortCategoriesArray } from '../utils/fuctions';

import AddBoxIcon from '@mui/icons-material/AddBox';
import classes from '../styles/Task.module.css'
const { taskHeader, selectCate, taksNav, addTask, iconButton, taskLink, active, addCate } = classes

const TaskHeader = ({ headerCondition, setLayoutError }) => {
    const { categories, setCategories, dateResponse, setDataResponse, createTask } = useContext(DataContext)
    const [addTaskState, setAddTaskState] = useState({ description: '', category: ''})

    const navigate = useNavigate()
    const location = useLocation()

    const handleAddTask = async () => {
        if(addTaskState.description === '') {
            setDataResponse("You can not add task without description.")
            return
        }
        
        const newCategories = addTaskState.category === ''
        ? sortCategoriesArray(categories, 'None')
        : sortCategoriesArray(categories, addTaskState.category)

        const task = await createTask('tasks',addTaskState)
        if(task){
            setCategories(newCategories)
            setAddTaskState({ description: '', category: ''})
            setLayoutError(null)
        }
        else setLayoutError("Somethign went wrong.")
        setTimeout(() => {
            navigate(location.pathname);
        }, 0)
        
    }

    const handleCategoryChange = (e) => {
        if(e.target.value === '') return
        setCategories(sortCategoriesArray(categories, e.target.value))
    }

    const handleLinks = (e) => {
        if(headerCondition !== '' && categories.length === 0){
            e.prepreventDefault()
        }
    }

    return (
        <>
            <div className={taskHeader}>
                {dateResponse && <AlertMessage msg={dateResponse} />}
                <div className={selectCate}>
                    <label>Select a Category:</label>
                    {(headerCondition !== '' && categories.length === 0) ? (
                        <select id='categories' value="" onChange={handleCategoryChange}>
                            <option value="">--No Categories available--</option>
                        </select>
                    ) : (
                        <select id='categories' value={categories[0]} onChange={handleCategoryChange}>
                            <option value="">--Please choose an option--</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    )}
                </div>
                <div className={taksNav}>
                <NavLink 
                    to='/task'
                    className={({ isActive }) => `${taskLink} ${isActive ? active : ''}`}
                    onClick={handleLinks}
                    end
                >
                    Padding
                </NavLink>
                <NavLink 
                    to='/task/completed-tasks'  
                    className={({ isActive }) => `${taskLink} ${isActive ? active : ''}`}
                    onClick={handleLinks}
                >
                    Completed
                </NavLink>
                <NavLink 
                    to='/task/all-tasks'  
                    className={({ isActive }) => `${taskLink} ${isActive ? active : ''}`}
                    onClick={handleLinks}
                >
                    All
                </NavLink>
                </div>
            </div>
            <div className={addTask}>
                <button
                    className={iconButton}
                    onClick={handleAddTask}
                    ><AddBoxIcon  fontSize="inherit" /></button>
                <input
                    type='text'
                    placeholder='Enter task here.'
                    value={addTaskState.description}
                    onChange={(e) => setAddTaskState({...addTaskState, description: e.target.value.toString()}) }
                />
                <input
                    type='text'
                    placeholder='Enter category here. (default: None)'
                    className={addCate}
                    value={addTaskState.category}
                    onChange={(e) => setAddTaskState({...addTaskState, category: e.target.value.toString()}) }
                />
            </div>
        </>
    )
}

export default TaskHeader
