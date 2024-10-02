import { createContext, useState } from "react";

export const ErrorAndFetchingContext = createContext()

export const ErrorAndFetchingProvider = ({ children }) => {
    const [error, setError] = useState(null)
    const [isFetching, setIsFetching] = useState(false)

    return (
        <ErrorAndFetchingContext.Provider 
            value={{ error, isFetching, setError, setIsFetching }}
        >
            {children}
        </ErrorAndFetchingContext.Provider>
    )
}
