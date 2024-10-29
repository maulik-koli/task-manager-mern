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

            if (result.error) {
                throw new Error(result.error || "Unable to fetch data.")
            }

            if (Array.isArray(result.data) && result.data.length > 0) {
                if (result.data.length === 1) {
                    setSingleResponseData(result.data[0]);
                } else {
                    setResponseData(result.data);
                }
            }
            finalData = result.data
        } 
        catch (e) {
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

            if(data.category) setDataResponse(`Task is add at ${data.category}`)
            else setDataResponse(result.data.message)
            return result.data
        }
        catch(e){
            console.log("Error posting response data", e.message)
            setDataResponse(e.message)
            setSingleResponseData(null)
        } finally {
            setIsDataLoading(false)
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

    const updateCategry = async (cate) => {
        console.log(cate)
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
                setCategories,
                updateCategry
            }}
        >
            {children}
        </DataContext.Provider>
    )
}
