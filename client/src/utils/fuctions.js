
export const isValidPassword = (password) => {
    if (password.length < 8) {
        return false;
    }

    let hasNumber = false;
    let hasSpecialChar = false;
    const specialCharacters = new Set("!@#$%^&*(),.?\":{}|<>");

    for (const char of password) {
        if (char >= '0' && char <= '9') {
            hasNumber = true;
        }
        if (specialCharacters.has(char)) {
            hasSpecialChar = true;
        }
        
        if (hasNumber && hasSpecialChar) {
            return true;
        }
    }

    return hasNumber && hasSpecialChar;
}

// set cookie
export const setCookie = (name, value, days, path = '/') => {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 86400000)); // 86400000 ms in a day
        expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=${path}`;
    console.log(`Cookie set: ${name} = ${value}, path: ${path}`);
};

// return cookie, if no then undefiend
export const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
        return decodeURIComponent(parts.pop().split(';').shift());
    }
    console.log(`Cookie "${name}": undefined`);
    return undefined;
};

export const deleteCookie = (name, path = '/') => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}`;
    console.log(`Cookie deleted: ${name}`);
};

export const formatDate = (dateString) => {
    const months = [
        'Jan', 'Feb', 'March', 'April', 'May', 'June',
        'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();

    return `${day} ${month} ${year}`;
}

export const sortCategoriesArray = (categoriesArray, cate) => {
    const indexOfCate = categoriesArray.indexOf(cate)

    if (indexOfCate === -1 || indexOfCate === 0) {
        return [...categoriesArray]
    }

    const updatedCategories = categoriesArray.filter((_, index) => index !== indexOfCate)
    return [cate, ...updatedCategories]
}
