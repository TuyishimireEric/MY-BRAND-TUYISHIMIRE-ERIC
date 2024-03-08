import { API_URL } from '../utils.js';

export const getAllBlogs = async () => {
    try {
        const response = await fetch(`${API_URL}/api/blogs`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        return result;
    } catch (error) {
        return error.message;
    }
}

export const getABlog = async (blogId) => {
    const response = await fetch(`${API_URL}/api/blogs/${blogId}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const result = await response.json();
    return result;
}

export const deleteABlog = async (blogId) => {
    try {
        const token = JSON.parse(localStorage.getItem('token')) || "";
        const response = await fetch(`${API_URL}/api/blogs/${blogId}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const result = await response.json();
        return result;
    }
    catch (error) {
        return error.message;
    }
}

export const createABlog = async (blogData) => {
    try {
        const token = JSON.parse(localStorage.getItem('token')) || "";
        const response = await fetch(`${API_URL}/api/blogs`,{
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: blogData
        });
        const result = await response.json();
        return result;
    }
    catch (error) {
        return error.message;
    }
}

export const updateABlog = async (blogData, blogId) => {
    try {
        const token = JSON.parse(localStorage.getItem('token')) || "";
        const response = await fetch(`${API_URL}/api/blogs/${blogId}`,{
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: blogData
        });
        const result = await response.json();
        return result;
    }
    catch (error) {
        return error.message;
    }
}