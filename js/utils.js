export const regExPatterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  fullName: /^[a-zA-Z\s]{3,30}$/,
  message: /^.{3,500}$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=!]).{6,}$/,
  blogTitle: /^.{3,100}$/,
  blogContent: /^[\s\S]{3,1000}$/,
};

// export const API_URL = 'http://localhost:5000';
export const API_URL = 'https://mybrand-be-95he.onrender.com';

export const formatedDate = (date) => {
  const dateCreated = new Date(date);
  return `${dateCreated.getDate()}/${
    dateCreated.getMonth() + 1
  }/${dateCreated.getFullYear()}`;
};

export const formattedPastDate = (date) => {
  const now = new Date();
  const dateCreated = new Date(date);
  const diffInMilliseconds = now - dateCreated;

  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays > 0) {
    return `${diffInDays} days`;
  } if (diffInHours > 0) {
    return `${diffInHours} hours`;
  } if (diffInMinutes > 0) {
    return `${diffInMinutes} min`;
  }
  return `${diffInSeconds} sec`;
};