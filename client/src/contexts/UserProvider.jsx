import { createContext, useEffect, useState } from "react";

import { userProfile } from "../api/userApi";
import { formatDate } from "../utils/fuctions";

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [userErrorAndLoading, setUserErrorAndLoading] = useState({
        error: null,
        loading: true
    })
    let navigatePath = '/'

    const fetchUser = async () => {
        setUserErrorAndLoading({ error: null, loading: true });
        try{
            const url = "me"
            const result = await userProfile(url)

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
            navigatePath = './login'
        }
        finally{
            setUserErrorAndLoading((prevState) => ({
                ...prevState,
                loading: false
            }))
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])
    
    return (
        <UserContext.Provider value={{ 
            user,
            userError: userErrorAndLoading.error,
            userLoading: userErrorAndLoading.loading,
            setUserErrorAndLoading,
            navigatePath,
            fetchUser
        }}>
            {children}
        </UserContext.Provider>
    )
}
