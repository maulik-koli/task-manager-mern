import { createContext, useState, useEffect } from "react";

import { userProfile } from "../api/userApi";
import { formatDate } from "../utils/fuctions";

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [userError, setUserError] = useState(null)
    const [userLoading, setUserLoading] = useState(false)

    const fetchUser = async () => {
        setUserLoading(true);
        try {
            const result = await userProfile("me");

            if (result.status === 401) {
                throw new Error(result.error || "Please Authorize");
            }

            result.data.createdAt = formatDate(result.data.createdAt);
            result.data.updatedAt = formatDate(result.data.updatedAt);
            setUser(result.data);
        } catch (e) {
            console.log("Error fetching user data", e.message);
            setUserError(e.message);
            setUser(null); // Ensure user is null on error
        } finally {
            setUserLoading(false); // Update loading state
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    
    return (
        <UserContext.Provider value={{ 
            user,
            setUser,
            userError,
            userLoading,
            setUserError,
            setUserLoading,
            fetchUser
        }}>
            {children}
        </UserContext.Provider>
    )
}
