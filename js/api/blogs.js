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
