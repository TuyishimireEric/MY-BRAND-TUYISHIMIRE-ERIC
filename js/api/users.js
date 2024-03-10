import { API_URL } from '../utils.js';

export const signUp = async (user) => {
  try {
    const response = await fetch(`${API_URL}/api/users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
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

export const logIn = async (user) => {
  try {
    const response = await fetch(`${API_URL}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
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

export const validateToken = async () => {
  const token = JSON.parse(localStorage.getItem('token') || '') || '';
  try {
    const response = await fetch(`${API_URL}/api/users/validate`, {
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
