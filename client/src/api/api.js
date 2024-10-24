import { getCookie } from "../utils/fuctions"

const url = "http://localhost:3000/"

export const fetchData = async (BASE_URL) => {
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
            const errorData = await response.json()
            return { status: response.status, error: errorData.message || 'Something went wrong' }
        }

        const responseData = await response.json()
        return { status: response.status, data: responseData }
    }
    catch(e){
        console.log(e.message)
        return { status: 500, error: 'Internal server error' }
    }
}

export const postData = async (BASE_URL, reqData) => {
    const routeUrl = url + BASE_URL
    const token = getCookie('authToken')

    try {
        const response = await fetch(routeUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(reqData),
        })

        console.log(response)
        if (!response.ok) {
            const errorData = await response.json()
            console.log(errorData, response.status)
            return { status: response.status, error: errorData.message || 'Something went wrong.' }
        }
        
        const responseData = await response.json();
        console.log(responseData)
        return { status: response.status, data: responseData };
    } 
    catch(e) {
        console.log(e.message)
        return { status: 500, error: 'Internal server error' }
    }
};

export const updateData = async (BASE_URL, reqData) => {
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
        })

        console.log(response)

        if (!response.ok) {
            const errorData = await response.json()
            return { status: response.status, error: errorData.message || 'Something went wrong' }
        }
        
        const responseData = await response.json()
        return { status: response.status, data: responseData }
    } 
    catch(e) {
        console.log(e.message);
        return { status: 500, error: 'Internal server error' }
    }
}

export const deleteData = async (BASE_URL) => {
    const routeUrl = url + BASE_URL
    const token = getCookie('authToken')

    try {
        const response = await fetch(routeUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })

        if (!response.ok) {
            const errorData = await response.json();
            return { status: response.status, error: errorData.message || 'Something went wrong' }
        }
        
        const responseData = await response.json();
        return { status: response.status, data: responseData }
    } 
    catch(e) {
        console.log(e.message);
        return { status: 500, error: 'Internal server error' }
    }
};
