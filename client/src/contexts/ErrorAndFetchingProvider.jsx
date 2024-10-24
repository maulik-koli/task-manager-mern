import { createContext, useState } from "react"

export const ErrorAndFetchingContext = createContext()

export const ErrorAndFetchingProvider = ({ children }) => {
    const [responseMessage, setResponseMessage] = useState(null)
    const [isFetching, setIsFetching] = useState(false)

    return (
        <ErrorAndFetchingContext.Provider 
            value={{ responseMessage, isFetching, setResponseMessage, setIsFetching }}
        >
            {children}
        </ErrorAndFetchingContext.Provider>
    )
}
