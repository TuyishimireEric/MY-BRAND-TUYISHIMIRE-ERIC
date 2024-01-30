export const regExPatterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  fullName: /^[a-zA-Z\s]{3,30}$/,
  message: /^.{3,500}$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=!]).{6,}$/,
  blogTitle: /^.{3,100}$/,
  blogContent: /^.{3,10000}$/
};
