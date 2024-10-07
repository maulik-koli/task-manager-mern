import { createContext, useEffect, useState } from "react";

import { userProfile } from "../api/userApi";
import { formatDate } from "../utils/fuctions";
import { userLoader } from "../api/loaders";

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const { data } = userLoader()
    const [user, setUser] = useState(null)
    const [userErrorAndLoading, setUserErrorAndLoading] = useState({
        error: null,
        loading: true
    })

    const fetchUser = async () => {
        setUserErrorAndLoading({ error: null, loading: true });
        try{
            const result = await userProfile("me")

            if(result.status === 401){
                throw new Error(result.error || "Please Authorized")
            }

            console.log(result)
            result.data.createdAt = formatDate(result.data.createdAt)
            result.data.updatedAt = formatDate(result.data.updatedAt)
            setUser(result.data || null)
        }
        catch(e){
            console.log("--->" ,e.message)
            setUserErrorAndLoading((prevState) => ({
                ...prevState,
                error: e.message
            }))
        }
        finally{
            setUserErrorAndLoading((prevState) => ({
                ...prevState,
                loading: false
            }))
        }
    }

    useEffect(() => {
        if(data){
            setUser(data)
            setUserErrorAndLoading((prevState) => ({
                ...prevState,
                loading: false
            }))
        }
    }, [userLoader])

    
    return (
        <UserContext.Provider value={{ 
            user,
            userError: userErrorAndLoading.error,
            userLoading: userErrorAndLoading.loading,
            setUserErrorAndLoading,
            fetchUser
        }}>
            {children}
        </UserContext.Provider>
    )
}
