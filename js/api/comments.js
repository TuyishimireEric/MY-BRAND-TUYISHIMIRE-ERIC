import { API_URL } from '../utils.js';

export const addBlogComment = async (blogId, formData) => {
  try {
    const response = await fetch(`${API_URL}/api/blogs/${blogId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`${data.message}`);
    }else{
      return { ok: true, data };
    }
  } catch (error) {
    return {ok: false, error: error.message};
  }
};

export const getBlogComments = async (blogId) => {
  try {
    const response = await fetch(`${API_URL}/api/blogs/${blogId}/comments`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`${data.message}`);
    }else{
      return { ok: true, data };
    }
  } catch (error) {
    return {ok: false, error: error.message};
  }
};

export const updateAComment = async (commentId, blogId) => {
  const formData = {
    visible: false,
  };
  try {
    const token = JSON.parse(localStorage.getItem('token')) || '';
    const response = await fetch(
      `${API_URL}/api/blogs/${blogId}/comments/${commentId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      },
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`${data.message}`);
    }else{
      return { ok: true, data };
    }
  } catch (error) {
    return {ok: false, error: error.message};
  }
};
