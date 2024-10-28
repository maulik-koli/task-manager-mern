import React, { useContext, useEffect} from 'react'
import { Outlet, useLoaderData } from 'react-router-dom'

import TaskHeader from '../components/TaskHeader'
import Loading from '../components/Loading'

import { DataContext } from '../contexts/DataProvider'
import { sortCategoriesArray } from '../utils/fuctions'

import classes from '../styles/Task.module.css'
const { task, taskErrorCon } = classes


const TaskLayout = () => {
    const result = useLoaderData()
    const { setCategories, dateResponse, isDataLoading} = useContext(DataContext)
    console.log(result, "onegai...")
    
    if(result.error === 'No categories found.'){
        return (
            <div className={task}>
                <>
                    <TaskHeader />
                    <div className={taskErrorCon}>
                        <p>There is no tasks.</p>
                    </div>
                </>
            </div>
        )
    }

    useEffect(() => {
        if(result.data) setCategories(sortCategoriesArray(result.data, 'None'))
    }, [])

    useEffect(() => {
        setCategories(sortCategoriesArray(result.data, 'None'))
    }, [result.data])

    return (
        <div className={task}>
            <TaskHeader />
            {isDataLoading && <Loading /> }
            {(dateResponse && (result.error !== 'No categories found.')) ? (
                <>
                    <div className={taskErrorCon}>
                        <p>{dateResponse}</p>
                        <p>Please try again leter.</p>
                    </div>
                </>
            ) : <Outlet /> }
        </div>
    )
}

export default TaskLayout
