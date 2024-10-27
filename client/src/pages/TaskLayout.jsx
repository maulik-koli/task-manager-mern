import React, { useContext, useEffect, useState } from 'react'
import { NavLink, Outlet, useLoaderData } from 'react-router-dom'

import Loading from '../components/Loading'

import { DataContext } from '../contexts/DataProvider'
import { sortCategoriesArray } from '../utils/fuctions'

import AddBoxIcon from '@mui/icons-material/AddBox';
import classes from '../styles/Task.module.css'
const { task, taskHeader, selectCate, taksNav, addTask, iconButton, taskLink, active } = classes


const TaskLayout = () => {
    const result = useLoaderData()
    const { categories, setCategories } = useContext(DataContext)
    
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
                <button className={iconButton}><AddBoxIcon  fontSize="inherit" /></button>
                <input type='text' placeholder='Add the task description here.' />
            </div>
            {categories.length === 0 ? <Loading /> : 
                <Outlet />            
            }
        </div>
    )
}

export default TaskLayout
