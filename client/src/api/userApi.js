import { setCookie, getCookie, deleteCookie } from "../utils/fuctions"

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
        })

        if (!response.ok) {
            const errorData = await response.json()
            if(response.status !== 500){
                return { status: response.status, error: errorData.message || 'Unable to login.' }
            }
            else{
                return { status: response.status, error: 'Unable to login.' }
            }
        }
        
        const responseData = await response.json()
        setCookie('authToken', responseData.token, 2)
        return { status: response.status, data: responseData }
    } 
    catch(e) {
        return { status: 500, error: 'Internal server error' }
    }
}

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
            const errorData = await response.json()
            return { status: response.status, error: errorData.message || 'Something went wrong' }
        }

        const responseData = await response.json()
        return { status: response.status, data: responseData }
    }
    catch(e){
        return { status: 500, error: 'Internal server error' }
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
        })

        if (!response.ok) {
            const errorData = await response.json()
            return { status: response.status, error: errorData.message || 'Something went wrong' }
        }
        
        const responseData = await response.json()
        return { status: response.status, data: responseData }
    } 
    catch(e) {
        return { status: 500, error: 'Internal server error' }
    }
}

export const logoutUser = async (BASE_URL) => {
    const routeUrl = url + BASE_URL
    const token = getCookie('authToken')
    
    try {
        const response = await fetch(routeUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
        
        if (!response.ok) {
            const errorData = await response.json()
            return { status: response.status, error: errorData.message || 'Something went wrong' }
        }

        if (response.status === 204) {
            deleteCookie('authToken')
            return { status: 204 }
        }

        const responseData = await response.json()
        deleteCookie('authToken')
        return { status: responseData.status }
    } 
    catch(e) {
        return { status: 500, error: 'Internal server error' }
    }
}

export const deleteUser = async (BASE_URL) => {
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
            const errorData = await response.json()
            return { status: response.status, error: errorData.message || 'Something went wrong' }
        }
        
        const responseData = await response.json()
        return { status: response.status, data: responseData }
    } 
    catch(e) {
        return { status: 500, error: 'Internal server error' }
    }
}
