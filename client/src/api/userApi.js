import { setCookie } from "../utils/fuctions";

export const sigupLoginUser = async (BASE_URL, reqData) => {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reqData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { status: response.status, error: errorData.message || 'Something went wrong' };
        }
        
        const responseData = await response.json();
        setCookie('authToken', responseData.token, 2);
        return { status: response.status, data: responseData };
    } 
    catch(error) {
        console.log(error.message);
        return { status: 500, error: 'Internal server error' }; 
    }
};
