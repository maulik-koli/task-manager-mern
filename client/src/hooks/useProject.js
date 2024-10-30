import { useEffect, useState } from "react";
import { fetchData, updateData, deleteData } from "../api/api";

const usePorject = (projectId) => {
    const [projectHook, setProjectHook] = useState(null)
    const [isProjectLoading, setIsProjectLoading] = useState(true)
    const [projectError, setProjectError] = useState(null)  

    const handleProjectError = () => {
        setTimeout(() => {
            setProjectError(null)
        }, 100)
    }
    
    const fetchProjectData = async () => {
        setIsProjectLoading(true)
        try{
            const project = await fetchData(`projects/${projectId}`)

            if(project.error){
                throw new Error(project.error || "Unable to fetch project.")
            }
            
            setProjectHook(project.data[0])
            setProjectError(null)
        }
        catch(e){
            setProjectError(e.message)
            setProjectHook(null)
        }
        finally{
            setIsProjectLoading(false)
            handleProjectError()
        }
    }
    
    useEffect(() => {
        fetchProjectData()
    }, [projectId])
    
    const updateProjectData = async (url, data) => {
        setIsProjectLoading(true)
        try{
            const project = await updateData(url, data)
            
            if(project.error){
                throw new Error(project.error || "Unable to update project.")
            }
            
            setProjectHook(project.data.project)
            setProjectError(project.data.message)
        }
        catch(e){
            setProjectError(e.message)
            setProjectHook(null)
        }
        finally{
            setIsProjectLoading(false)
            handleProjectError()
        }
    }
    
    const deleteProjectData = async (url) => {
        setIsProjectLoading(true)
        try{
            const project = await deleteData(url)
            
            if(project.error){
                throw new Error(project.error || "Unable to delete project.")
            }

            setProjectHook(null)
            setProjectError(project.data.message)
        }
        catch(e){
            setProjectError(e.message)
        }
        finally{
            setIsProjectLoading(false)
            handleProjectError()
        }
    }

    return { projectHook, setProjectHook, isProjectLoading, projectError, setProjectError,  handleProjectError, fetchProjectData, updateProjectData, deleteProjectData }
}

export default usePorject
