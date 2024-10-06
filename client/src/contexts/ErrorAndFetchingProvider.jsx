import { createContext, useState } from "react";

export const ErrorAndFetchingContext = createContext()

export const ErrorAndFetchingProvider = ({ children }) => {
    const [errorMessage, setErrorMessage] = useState(null)
    const [isFetching, setIsFetching] = useState(false)

    return (
        <ErrorAndFetchingContext.Provider 
            value={{ errorMessage, isFetching, setErrorMessage, setIsFetching }}
        >
            {children}
        </ErrorAndFetchingContext.Provider>
    )
}
