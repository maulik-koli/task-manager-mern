import { useContext } from "react";
import { useNavigate } from "react-router-dom"

import { UserContext } from "../contexts/UserProvider"

export const useUser = () => {
    const { user, userError, userLoading, setUserErrorAndLoading, navigatePath, fetchUser } = useContext(UserContext)

    const navigate = useNavigate()

    const redirectToLogin = () => {
        navigate(navigatePath)
    };

    return {
        user,
        userError,
        userLoading,
        setUserErrorAndLoading,
        redirectToLogin,
        fetchUser
    }
}