import { API_URL } from '../utils.js';

export const getBlogLikes = async (blogId) => {
  try {
    const response = await fetch(`${API_URL}/api/blogs/${blogId}/likes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return error.message;
  }
};

export const likeABlog = async (blogId) => {
  const token = JSON.parse(localStorage.getItem('token')) || '';
  try {
    const response = await fetch(`${API_URL}/api/blogs/${blogId}/likes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return error.message;
  }
};