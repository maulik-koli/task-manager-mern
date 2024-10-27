import { createContext, useState } from "react"
import { fetchData, postData, updateData, deleteData } from "../api/api"

export const DataContext = createContext()

export const DataProvider = ({ children }) => {
    const [responseData, setResponseData] = useState(null)
    const [singleResponseData, setSingleResponseData] = useState(null)
    const [isDataLoading, setIsDataLoading] = useState(false)
    const [dateResponse, setDataResponse] = useState(null)
    const [categories, setCategories] = useState([])


    const fetchResponseData = async (pathUrl) => {
        setIsDataLoading(true)
        let finalData = null
        try {
            const result = await fetchData(pathUrl)
            console.log(result)
    
            if (result.error) {
                throw new Error(result.error || "Unable to fetch data.")
            }
    
            if (result.data && typeof result.data === 'object') {
                if (Array.isArray(result.data)) {
                    setResponseData(result.data)
                    finalData = result.data
                } else {
                    setSingleResponseData(result.data)
                    finalData = result.data
                }
            }
        } 
        catch (e) {
            console.log("Error fetching response data", e.message)
            setDataResponse(e.message)
            setResponseData(null)
            setSingleResponseData(null)
        } finally {
            setIsDataLoading(false)
            return finalData
        }
    }

    const postCreatedData = async (pathUrl, data) => {
        setIsDataLoading(true)
        try{
            const result = await postData(pathUrl, data)
            console.log(result)
            if (result.error) {
                throw new Error(result.error || "Unable to post data.")
            }

            setSingleResponseData(result.data.project)
            setDataResponse(result.data.message)
        }
        catch(e){
            console.log("Error posting response data", e.message)
            setDataResponse(e.message)
            setSingleResponseData(null)
        } finally {
            setIsDataLoading(false)
            return result.data
        }
    }

    const patchUpdateData = async (pathUrl, data) => {
        setIsDataLoading(true)
        try{
            if(data.createdAt ) delete data.createdAt
            if(data.owner ) delete data.owner
            if(data.updatedAt ) delete data.updatedAt
            if(data.__v ) delete data.__v
            if(data._id ) delete data._id
            
            const result = await updateData(pathUrl, data)
            console.log(result)

            if (result.error) {
                throw new Error(result.error || "Unable to update data.");
            }

            setSingleResponseData(result.data.project);
        }
        catch(e){
            console.log("Error posting response data", e.message);
            setDataResponse(e.message)
        } finally {
            setIsDataLoading(false);
        }
    }

    const deleteTheData = async (pathUrl) => {
        setIsDataLoading(true)
        try{
            const result = await deleteData(pathUrl)
            console.log(result)

            if (result.error) {
                throw new Error(result.error || "Unable to delete data.")
            }

            setResponseData(result.data.message)
        }
        catch(e){
            console.log("Error fetching response data", e.message)
            setDataResponse(e.message)
            setResponseData(null)
        } finally {
            setIsDataLoading(false)
        }
    }

    return (
        <DataContext.Provider 
            value={{ 
                responseData,
                setResponseData,
                singleResponseData,
                setSingleResponseData,
                isDataLoading,
                setIsDataLoading,
                dateResponse,
                setDataResponse,
                
                fetchResponseData,
                postCreatedData,
                patchUpdateData,
                deleteTheData,

                categories,
                setCategories
            }}
        >
            {children}
        </DataContext.Provider>
    )
}
