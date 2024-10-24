import { userProfile } from "./userApi"
import { formatDate } from "../utils/fuctions"
import { fetchData } from "./api"

export const userLoader = async () => {
    try{
        const result = await userProfile('me')
        console.log("in loader", result)

        if (result.error) {
            if (result.status === 401) {
                return { redirect: '/auth/login' };
            }
            throw new Response(result.error || "Something went wrong", { status: result.status })
        }
        
        result.data.createdAt = formatDate(result.data.createdAt)
        result.data.updatedAt = formatDate(result.data.updatedAt)

        return { status: result.status, data: result.data }
    } 
    catch (e) {
        console.log("Error fetching user data:", e)
        return { redirect: '/auth/login' }
    }
}

export const dataLoader = async (pathUrl) => {
    try{
        const result = await fetchData(pathUrl)
        console.log(result, "in loader")

        if (result.error) {
            throw new Response(result.error || "Unable to fetch data.", { status: result.status })
        }

        // Handle case where the user doesn't own the data
        if (result.data && result.data.length === 0) {
            return { status: 403, error: "You do not own any data." }
        }

        return { status: result.status, data: result.data }
    } 
    catch (e) {
        console.log("Error fetching data:", e)
        return { status: e.status || 500, error: e.message || "An error occurred" }
    }
}