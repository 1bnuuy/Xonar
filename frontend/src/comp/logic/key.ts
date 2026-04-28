// NEXT_PUBLIC_API_PROD=https://strom-jo72.onrender.com/api

// NEXT_PUBLIC_API_DEV=http://localhost:8080/api

export const API_URL = process.env.NEXT_PUBLIC_API_PROD;

export const QUERY_KEYS = {
    AUTH: ["auth"],
    DATA: ["data"],
    POST: ["post"],
    PATCH: ["patch"],
    DELETE: ["delete"],
    LOGIN: ["login"],
    REGISTER: ["register"],
    LOGOUT: ["logout"]
}

export const TOAST_DELAY = 150
export const HREF_DELAY = 750