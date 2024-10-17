import React, { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'

import Loading from '../components/Loading'

import { DataContext } from '../contexts/DataProvider'
import { ErrorAndFetchingContext } from '../contexts/ErrorAndFetchingProvider'
import { fetchData } from '../api/api'

import classes from '../styles/Project.module.css'
import ProjectContainer from '../components/ProjectContainer'
const { projectCon, addProjectCon } = classes

const INITIAL_PROJECT = { 
  title: "",
  description: "",
  subtasks: []
}

const ReadProjectPage = () => {
  const params =useParams()
  const { singleData, isDataLoading, setIsDataLoading, setSingleData, patchUpdateData } = useContext(DataContext)
  const { setResponseMessage } = useContext(ErrorAndFetchingContext)

  useEffect(() => {
    const fetchProjectData = async () => {
        const url= `projects/${params.projectId}`
        setIsDataLoading(true)
        try{
            const result = await fetchData(url)

            if (result.error){
              throw new Error(result.error || "Unable to fetch data.");
            }

            console.log(result)
            setSingleData(result.data[0])
        }
        catch(e){
            setSingleData(null)
            setResponseMessage(e.message)
        }
        finally{
            setIsDataLoading(false)
        }
    }

    fetchProjectData()
  }, [])

  const handleSave = async (data) => {
    await patchUpdateData(`projects/${params.projectId}`, data)
  }

  return (
    <div className={projectCon}>
      {(isDataLoading && !singleData) && <Loading />} 
      {(!isDataLoading && singleData) && <ProjectContainer 
        containerClass={addProjectCon}
        containerButtons='read'
        fetchProjectData={singleData ? singleData : INITIAL_PROJECT}
        handleSave={handleSave}
      />}
    </div>
  )
}

export default ReadProjectPage
