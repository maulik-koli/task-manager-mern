import { createContext, useState } from "react"
import { fetchData, postData, updateData, deleteData } from "../api/api"

export const DataContext = createContext()

export const DataProvider = ({ children }) => {
    const [responseData, setResponseData] = useState(null)
    const [singleResponseData, setSingleResponseData] = useState(null)
    const [isDataLoading, setIsDataLoading] = useState(false)
    const [dateResponse, setDataResponse] = useState(null)

    const fetchResponseData = async (pathUrl) => {
        setIsDataLoading(true)
        try{
            const result = await fetchData(pathUrl)
            console.log(result)

            if (result.error) {
                throw new Error(result.error || "Unable to fetch data.")
            }

            if (Array.isArray(result.data) && result.data.length > 0) {
                // If it's an array with a single element, set that element as single response data
                if (result.data.length === 1) {
                    setSingleResponseData(result.data[0]);
                } else {
                    setResponseData(result.data);
                }
            }
        }
        catch(e){
            console.log("Error fetching response data", e.message)
            setDataResponse(e.message)
            setResponseData(null)
        } finally {
            setIsDataLoading(false)
        }
    }

    const postCreatedData = async (pathUrl, data) => {
        setIsDataLoading(true)
        try{
            const result = await postData(pathUrl, data)

            if (result.error) {
                throw new Error(result.error || "Unable to post data.")
            }

            setSingleResponseData(result.data);
        }
        catch(e){
            console.log("Error posting response data", e.message)
            setDataResponse(e.message)
            setSingleResponseData(null)
        } finally {
            setIsDataLoading(false);
        }
    }

    const patchUpdateData = async (pathUrl, data) => {
        setIsDataLoading(true)
        try{
            delete data.createdAt
            delete data.owner
            delete data.updatedAt
            delete data.__v
            delete data._id
            
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
                deleteTheData
            }}
        >
            {children}
        </DataContext.Provider>
    )
}
