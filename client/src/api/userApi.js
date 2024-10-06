import { setCookie, getCookie } from "../utils/fuctions";

const url = "http://localhost:3000/users/"

export const sigupLoginUser = async (BASE_URL, reqData) => {
    const routeUrl = url + BASE_URL

    try {
        const response = await fetch(routeUrl, {
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
    catch(e) {
        console.log(e.message);
        return { status: 500, error: 'Internal server error' }; 
    }
};

export const userProfile = async (BASE_URL) => {
    const routeUrl = url + BASE_URL
    const token = getCookie('authToken')

    try{
        const response = await fetch(routeUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })

        if(!response.ok) {
            const errorData = await response.json();
            return { status: response.status, error: errorData.message || 'Something went wrong' };
        }

        const responseData = await response.json();
        return { status: response.status, data: responseData };
    }
    catch(e){
        console.log(e.message);
        return { status: 500, error: 'Internal server error' }; 
    }
}

export const editUser = async (BASE_URL, reqData) => {
    const routeUrl = url + BASE_URL
    const token = getCookie('authToken')

    try {
        const response = await fetch(routeUrl, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(reqData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { status: response.status, error: errorData.message || 'Something went wrong' };
        }
        
        const responseData = await response.json();
        return { status: response.status, data: responseData };
    } 
    catch(e) {
        console.log(e.message);
        return { status: 500, error: 'Internal server error' }; 
    }
}
