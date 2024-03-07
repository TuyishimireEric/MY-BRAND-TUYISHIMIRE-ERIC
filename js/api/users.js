import { API_URL } from "../utils.js";

export const signUp = async (user) => {
    try {
        const response = await fetch(`${API_URL}/api/users/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        const result = await response.json();
        return result;
    } catch (error) {
        return error.message;
    }
}

export const signIn = async (user) => {
    try {
        const response = await fetch(`${API_URL}/api/users/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        const result = await response.json();
        return result;
    } catch (error) {
        return error.message;
    }
}