import { createContext, useState } from "react";

export const TaskContext = createContext()

export const TaskProvider = ({ children }) => {
    const [categories, setCategories] = useState([])

    return (
        <TaskContext.Provider
            value={{ 
                categories,
                setCategories
            }}
        >
            {children}
        </TaskContext.Provider>
    )
}
