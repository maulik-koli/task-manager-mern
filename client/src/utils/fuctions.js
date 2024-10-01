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
export const setCookie = (name, value, days) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

// return cookie, if no then undefiend
export const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
        return decodeURIComponent(parts.pop().split(';').shift());
    }
}
