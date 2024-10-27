import { useState, useEffect, useContext } from "react";
import { DataContext } from "../contexts/DataProvider";

const useTasks = (completedStatus) => {
    const { fetchResponseData, categories, patchUpdateData, setDataResponse } = useContext(DataContext)
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

    useEffect(() => {
        fetchTasks();
    }, [completedStatus, categories])

    return { tasks, isTaskLoading, updateTask }
}

export default useTasks
