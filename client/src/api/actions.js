import { useContext } from "react"; 
import { UserContext } from "../contexts/UserProvider";

export const userAction = async ({ request }) => {
    const userData = await request.json(); // Assuming the loader provides JSON data
    const { setUser } = useContext(UserContext); // Access context function

    // Update context with user data
    setUser(userData);

    return null; // No specific response is needed
};