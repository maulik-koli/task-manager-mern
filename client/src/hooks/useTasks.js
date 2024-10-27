import { useState, useEffect, useContext } from "react";
import { DataContext } from "../contexts/DataProvider";

const useTasks = (completedStatus) => {
    const { fetchResponseData, categories, patchUpdateData, setDataResponse, deleteTheData, postCreatedData } = useContext(DataContext)
    const [tasks, setTasks] = useState([])
    const [isTaskLoading, setIsTaskLoading] = useState(true)

    const fetchTasks = async () => {
        setIsTaskLoading(true)
        let url = `tasks?category=${categories[0]}`
        if(completedStatus  !== null)  url += `&completed=${completedStatus}`

        const response = await fetchResponseData(url)
        if(!response) {
            setDataResponse("Unable to fetch data.")
        }
        setTasks(response)
        setIsTaskLoading(false)
    }

    const updateTask = async (id, completed) => {
        setIsTaskLoading(true)

        await patchUpdateData(`tasks/${id}`, { completed: !completed })
        await fetchTasks()

        setIsTaskLoading(false)
    }

    const editTask = async (id, description) => {
        setIsTaskLoading(true)

        await patchUpdateData(`tasks/${id}`, { description: description })
        await fetchTasks()

        setIsTaskLoading(false)
    }

    const deleteTask = async (id) => {
        setIsTaskLoading(true)

        await deleteTheData(`tasks/${id}`)
        await fetchTasks()

        setIsTaskLoading(false)
    }

    const createTask = async (data) => {
        setIsTaskLoading(true)

        await postCreatedData(`tasks`, data)
        await fetchTasks()

        setIsTaskLoading(false)
    }

    useEffect(() => {
        fetchTasks();
    }, [completedStatus, categories])

    return { tasks, isTaskLoading, updateTask, editTask, deleteTask, createTask }
}

export default useTasks
