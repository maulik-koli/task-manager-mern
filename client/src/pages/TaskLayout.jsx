import React, { useEffect, useState } from 'react'
import { NavLink, Outlet, useLoaderData } from 'react-router-dom'

import { sortCategoriesArray } from '../utils/fuctions'

import classes from '../styles/Task.module.css'
const { task, taskHeader, selectCate, taksNav } = classes


const TaskLayout = () => {
    const result = useLoaderData()
    const [categories, setCategories] = useState(sortCategoriesArray(result.data, 'None'))
    
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
                    <NavLink to='/' className={({ isActive }) => `${isActive ? 'active' : ''}`}>Padding</NavLink>
                    <NavLink>Completed</NavLink>
                    <NavLink>All</NavLink>
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default TaskLayout
