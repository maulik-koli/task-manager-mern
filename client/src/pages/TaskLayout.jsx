import React, { useContext, useEffect, useState} from 'react'
import { Outlet, useLoaderData } from 'react-router-dom'

import TaskHeader from '../components/TaskHeader'
import Loading from '../components/Loading'

import { DataContext } from '../contexts/DataProvider'
import { sortCategoriesArray } from '../utils/fuctions'

import classes from '../styles/Task.module.css'
const { task, taskErrorCon } = classes


const TaskLayout = () => {
    const result = useLoaderData()
    const { setCategories, isDataLoading, setIsDataLoading, categories} = useContext(DataContext)
    const [layoutError, setLayoutError] = useState(null)
    
    useEffect(() => {
        setIsDataLoading(true)
        if(result.error){
            if(result.status === 404) setLayoutError(result.error)
            else{
                setLayoutError(`Something went wrong. Please try again later.`)
            }
        }
        else{
            if(!categories || categories.length === 0) setCategories(sortCategoriesArray(result.data, ''))
            else setCategories(sortCategoriesArray(result.data, categories[0]))
            
            setLayoutError(null)
        }
        setIsDataLoading(false)
    }, [result])


    return (
        <div className={task}>
            {isDataLoading && <Loading />}
            {!isDataLoading && (
                <>
                    <TaskHeader headerCondition={layoutError ? layoutError : ''} setLayoutError={setLayoutError} />
                    {!layoutError && <Outlet />} 
                    {layoutError && (
                        <div className={taskErrorCon}>
                            <p>{setLayoutError}</p>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default TaskLayout
