import { createContext, useState, useContext } from "react";
import { fetchData, postData, updateData } from "../api/api";
import { ErrorAndFetchingContext } from "./ErrorAndFetchingProvider";

export const DataContext = createContext()

export const DataProvider = ({ children }) => {
    const { setResponseMessage } = useContext(ErrorAndFetchingContext)
    const [responseData, setResponseData] = useState(null)
    const [singleData, setSingleData] = useState(null)
    const [isDataLoading, setIsDataLoading] = useState(false)

    const fetchResponseData = async (pathUrl) => {
        setIsDataLoading(true)
        try{
            const result = await fetchData(pathUrl)

            if (result.error) {
                throw new Error(result.error || "Unable to fetch data.");
            }

            setResponseData(result.data);
        }
        catch(e){
            console.log("Error fetching response data", e.message);
            setResponseMessage(e.message);
            setResponseData(null);
        } finally {
            setIsDataLoading(false);
        }
    }

    const postCreatedData = async (pathUrl, data) => {
        setIsDataLoading(true)
        try{
            const result = await postData(pathUrl, data)

            if (result.error) {
                throw new Error(result.error || "Unable to post data.");
            }

            setSingleData(result.data);
        }
        catch(e){
            console.log("Error posting response data", e.message);
            setResponseMessage(e.message);
            setSingleData(null);
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

            if (result.error) {
                throw new Error(result.error || "Unable to update data.");
            }

            setSingleData(result.data);
        }
        catch(e){
            console.log("Error posting response data", e.message);
            setResponseMessage(e.message)
        } finally {
            setIsDataLoading(false);
        }
    }

    return (
        <DataContext.Provider 
            value={{ 
                responseData,
                setResponseData,
                isDataLoading,
                setIsDataLoading,
                fetchResponseData,
                postCreatedData,
                singleData, 
                setSingleData,
                patchUpdateData
            }}
        >
            {children}
        </DataContext.Provider>
    )
}
