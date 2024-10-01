import { setCookie } from "../utils/fuctions";

export const createUser = async (BASE_URL, userData) => {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }

        const responseData = await response.json();
        setCookie('authToken', responseData.token, 2);
        return responseData;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};
