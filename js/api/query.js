import { API_URL } from '../utils.js';

export const addQuery = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/api/query/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return error.message;
  }
};

export const getQueries = async () => {
  const token = JSON.parse(localStorage.getItem('token')) || '';
  try {
    const response = await fetch(`${API_URL}/api/query/`, {
      method: 'GET',
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
