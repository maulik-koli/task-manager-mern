import { useState, useEffect, useContext } from "react";
import { fetchData, updateData, deleteData } from "../api/api";
import { DataContext } from "../contexts/DataProvider";

const useTasks = (completedStatus) => {
    const { categories, updateCategry } = useContext(DataContext)
    const [tasks, setTasks] = useState([])
    const [isTaskLoading, setIsTaskLoading] = useState(true)
    const [taskError, setTaskError] = useState(null)

    const fetchTasks = async () => {
        setIsTaskLoading(true)

        if(!categories && categories.length === 0){
            setTasks([])
            return
        }
        let fetchTaskUrl = `tasks?category=${categories[0]}`
        if(completedStatus  !== null) fetchTaskUrl += `&completed=${completedStatus}`

        try{
            const result = await fetchData(fetchTaskUrl)

            if (result.error) {
                throw new Error(result.error || "Unable to fetch tasks.")
            }

            setTasks(result.data)
            setTaskError(null)
        }
        catch(e){
            setTaskError(e.message)
            setTasks([])
        }
        finally{
            setIsTaskLoading(false)
        }
    }

    useEffect(() => {
        const sideEffect = async () => {
            await fetchTasks()
        }
        sideEffect()
    }, [categories])

    const updateTask = async (id, completed) => {
        setIsTaskLoading(true)
        try{
            const result = await updateData(`tasks/${id}`, { completed: !completed })

            if (result.error) {
                throw new Error(result.error || "Unable to update task.")
            }

            await fetchTasks()
        }
        catch(e){
            setTaskError(e.message)
        }
        finally{
            setIsTaskLoading(false)
        }
    }

    const editTask = async (id, data) => {
        setIsTaskLoading(true)
        try{
            const result = await updateData(`tasks/${id}`, { description: data })

            if (result.error) {
                throw new Error(result.error || "Unable to update task.")
            }

            await fetchTasks()
        }
        catch(e){
            setTaskError(e.message)
        }
        finally{
            setIsTaskLoading(false)
        }
    }

    const deleteTask = async (id) => {
        setIsTaskLoading(true)
        try{
            const result = await deleteData(`tasks/${id}`)

            if (result.error) {
                throw new Error(result.error || "Unable to delete task.")
            }

            await fetchTasks()
            if(tasks.length === 1){
                updateCategry(categories[0])
            }
        }
        catch(e){
            setTaskError(e.message)
        }
        finally{
            setIsTaskLoading(false)
        }
    }

    return { tasks, isTaskLoading, taskError, updateTask, editTask, deleteTask }
}

export default useTasks
