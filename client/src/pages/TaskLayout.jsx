import React, { useContext, useEffect, useRef, useState } from 'react'
import { NavLink, Outlet, useLoaderData, useLocation, useNavigate } from 'react-router-dom'

import Loading from '../components/Loading'
import AlertMessage from '../components/AlertMessage'

import { DataContext } from '../contexts/DataProvider'
import { sortCategoriesArray } from '../utils/fuctions'
import useTasks from '../hooks/useTasks'

import AddBoxIcon from '@mui/icons-material/AddBox';
import classes from '../styles/Task.module.css'
const { task, taskHeader, selectCate, taksNav, addTask, iconButton, taskLink, active } = classes


const TaskLayout = () => {
    const result = useLoaderData()
    const { categories, setCategories, dateResponse, setDataResponse } = useContext(DataContext)
    const { createTask } = useTasks()
    const addTaskRef = useRef()

    const navigate = useNavigate()
    const location = useLocation()
    
    useEffect(() => {
        setCategories(sortCategoriesArray(result.data, 'None'))
    }, [])
    
    useEffect(() => {
        if(result.data){
            setCategories(sortCategoriesArray(result.data, 'None'))
        }
    }, [result])

    const handleCategoryChange = (e) => {
        setCategories(sortCategoriesArray(categories, e.target.value))
    }

    const handleAddTask = () => {
        const data = {}
        if(addTaskRef.current.value === '') {
            setDataResponse("You can not add task without description.")
            return
        }
        data.description = addTaskRef.current.value
        data.category = categories[0]
        createTask(data)
        navigate(location.pathname)
    }

    return (
        <div className={task}>
            <div className={taskHeader}>
                <div className={selectCate}>
                    <label>Select a Category:</label>
                    <select id='categories' value={categories[0]} onChange={handleCategoryChange}>
                        <option value="">--Please choose an option--</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
                <div className={taksNav}>
                <NavLink 
                    to='/task'
                    className={({ isActive }) => `${taskLink} ${isActive ? active : ''}`}
                    end
                >
                    Padding
                </NavLink>
                <NavLink 
                   to='/task/completed-tasks'  
                    className={({ isActive }) => `${taskLink} ${isActive ? active : ''}`}
                >
                    Completed
                </NavLink>
                <NavLink 
                    to='/task/all-tasks'  
                    className={({ isActive }) => `${taskLink} ${isActive ? active : ''}`}
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
                    placeholder='Add the task description here.'
                    ref={addTaskRef}
                />
            </div>
            {categories.length === 0 ? <Loading /> : 
                <Outlet />            
            }
            {dateResponse && <AlertMessage msg={dateResponse} />}
        </div>
    )
}

export default TaskLayout
