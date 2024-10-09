import { createContext, useState } from "react";
import { fetchData, postData } from "../api/api";

export const DataContext = createContext()

export const DataProvider = ({ children }) => {
    const [responseData, setResponseData] = useState(null)
    const [singleData, setSingleData] = useState(null)
    const [responseDataMessage, setResponseDataMessage] = useState(null)
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
            setResponseDataMessage(e.message);
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
            setResponseDataMessage(e.message);
            setSingleData(null);
        } finally {
            setIsDataLoading(false);
        }
    }

    return (
        <DataContext.Provider 
            value={{ 
                responseData,
                setResponseData,
                responseDataMessage,
                isDataLoading,
                setResponseDataMessage,
                setIsDataLoading,
                fetchResponseData,
                postCreatedData,
                singleData, 
                setSingleData
            }}
        >
            {children}
        </DataContext.Provider>
    )
}
