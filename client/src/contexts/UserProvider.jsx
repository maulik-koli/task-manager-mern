import { createContext, useState, useEffect } from "react"

import { userProfile } from "../api/userApi"
import { formatDate } from "../utils/fuctions"

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [userResponse, setUserResponse] = useState(null)
    const [userLoading, setUserLoading] = useState(true)

    const fetchUser = async () => {
        setUserLoading(true);
        try {
            const result = await userProfile("me")

            if (result.status === 401) {
                throw new Error(result.error || "Please Authorize")
            }

            result.data.createdAt = formatDate(result.data.createdAt)
            result.data.updatedAt = formatDate(result.data.updatedAt)
            setUser(result.data)
        } catch (e) {
            setUserResponse(e.message)
            setUser(null)
        } finally {
            setUserLoading(false)
        }
    };

    useEffect(() => {
        fetchUser()
    }, [])
    
    return (
        <UserContext.Provider value={{ 
            user,
            setUser,
            userLoading,
            setUserLoading,
            userResponse,
            setUserResponse,
            fetchUser
        }}>
            {children}
        </UserContext.Provider>
    )
}
