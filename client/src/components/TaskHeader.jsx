import React, { useContext, useRef } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

import { DataContext } from '../contexts/DataProvider';
import { sortCategoriesArray } from '../utils/fuctions';

import AddBoxIcon from '@mui/icons-material/AddBox';
import classes from '../styles/Task.module.css'
const { taskHeader, selectCate, taksNav, addTask, iconButton, taskLink, active, addCate } = classes

const TaskHeader = ({ headerCondition }) => {
    const { categories, setCategories, setDataResponse, postCreatedData } = useContext(DataContext)

    const addTaskRef = useRef()
    const addCateRef = useRef()

    const navigate = useNavigate()
    const location = useLocation()

    const handleAddTask = async () => {
        const data = {}
        if(addTaskRef.current.value === '') {
            setDataResponse("You can not add task without description.")
            return
        }
        data.description = addTaskRef.current.value
        
        if(addCateRef.current.value === '') {
            data.category = 'None'
            setCategories(sortCategoriesArray(categories, 'None'))
        }
        else {
            data.category = addCateRef.current.value
            setCategories(sortCategoriesArray(categories, addCateRef.current.value))
        }

        const task = await postCreatedData('tasks',data)
        setCategories(sortCategoriesArray(categories, task.task.category))
        if(addTaskRef.current.value) addTaskRef.current.value = ''
        if(addCateRef.current.value) addCateRef.current.value = ''
        navigate(location.pathname)
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
                    ref={addTaskRef}
                />
                <input
                    type='text'
                    placeholder='Enter category here. (default: None)'
                    ref={addCateRef}
                    className={addCate}
                />
            </div>
        </>
    )
}

export default TaskHeader
