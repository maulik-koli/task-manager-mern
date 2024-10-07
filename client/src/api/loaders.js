import { userProfile } from "./userApi"; 
import { formatDate } from "../utils/fuctions"; 

export const userLoader = async () => {
    try{
        const result = await userProfile('me')

        if (result.error) {
            if (result.status === 401) {
                return { redirect: '/auth/login' };
            }
            throw new Response(result.error || "Something went wrong", { status: result.status })
        }

        result.data.createdAt = formatDate(result.data.createdAt);
        result.data.updatedAt = formatDate(result.data.updatedAt);
        
        return { status: result.status, data: result.data };
    } catch (e) {
        console.log("Error fetching user data:", e);
        return { redirect: '/auth/login' };
    }
};  