import { createContext, useState } from "react"
import { fetchData, postData } from "../api/api"

export const DataContext = createContext()

export const DataProvider = ({ children }) => {
    const [data, setData] = useState(null)
    const [isDataLoading, setIsDataLoading] = useState(false)
    const [dateResponse, setDataResponse] = useState(null)
    const [categories, setCategories] = useState([])

    const createProject = async (pathUrl, data) => {
        setIsDataLoading(true)
        let createdProject = null
        try{
            const result = await postData(pathUrl, data)
            
            if (result.error) {
                throw new Error(result.error || "Unable to post data.")
            }

            setData(result.data.project)
            setDataResponse(result.data.message)
            createdProject = result.data.project
        }
        catch(e){
            setDataResponse(e.message)
        } 
        finally {
            setIsDataLoading(false)
            const timeoutId = setTimeout(() => {
                setDataResponse(null)
            }, 100)
            return createdProject
        }
    }
    
    const createTask = async (pathUrl, data) => {
        if(data.category === '') data.category = 'None'
        setIsDataLoading(true)
        let createdTask = null
        try{
            const task = await postData(pathUrl, data)
            
            if (task.error) {
                throw new Error(result.error || "Unable to post data.")
            }

            setData(task.data.task)
            setDataResponse(task.data.message)
            createdTask = task.data.task
        }
        catch(e){
            setDataResponse(e.message)
        } 
        finally {
            setIsDataLoading(false)
            const timeoutId = setTimeout(() => {
                setDataResponse(null)
            }, 100)
            return createdTask
        }
    }

    const updateCategry = async (cate) => {
        setIsDataLoading(true)
        try{
            const taskResult = await fetchData(`tasks?category=${cate}`)

            if (taskResult.error) {
                if(taskResult.status === 404){
                    const newCategoties = categories.filter((cat) => cat !== cate )
                    setCategories(newCategoties)
                }
                else{
                    throw new Error(taskResult.error || "Something went wromg.")
                }
            }
        }
        catch(e){
            setDataResponse(e.message)
        }
        finally{
            setIsDataLoading(false)
        }
    }

    return (
        <DataContext.Provider 
            value={{
                data,
                setData,
                createProject,
                createTask,

                isDataLoading,
                setIsDataLoading,
                dateResponse,
                setDataResponse,
                
                categories,
                setCategories,
                updateCategry
            }}
        >
            {children}
        </DataContext.Provider>
    )
}
