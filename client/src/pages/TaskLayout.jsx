import React, { useContext, useEffect} from 'react'
import { Outlet, useLoaderData } from 'react-router-dom'

import TaskHeader from '../components/TaskHeader'
import Loading from '../components/Loading'

import { DataContext } from '../contexts/DataProvider'

import classes from '../styles/Task.module.css'
const { task, taskErrorCon } = classes


const TaskLayout = () => {
    const result = useLoaderData()
    const { setCategories, isDataLoading, setIsDataLoading, dateResponse, setDataResponse} = useContext(DataContext)
    
    useEffect(() => {
        setIsDataLoading(true)
        if(result.error){
            if(result.status === 404) setDataResponse(result.error)
            else{
                setDataResponse(`Something went wrong. Please try again later.`)
            }
        }
        else{
            setCategories(result.data)
            setDataResponse(null)
        }
        setIsDataLoading(false)
    }, [result])
    
    const debug = (daijobu) => {
        console.log('%c TaskLayout!', 'color: white; background-color: blue; font-weight: bold; border-radius: 5px;', daijobu)
    }
    debug([result])

    return (
        <div className={task}>
            {isDataLoading && <Loading />}
            {!isDataLoading && (
                <>
                    <TaskHeader headerCondition={dateResponse ? dateResponse : ''} />
                    {!dateResponse ? <Outlet /> : (
                        <div className={taskErrorCon}>
                            <p>{dateResponse}</p>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default TaskLayout
