import { regExPatterns } from './utils.js';

const fullName = document.querySelector('#fullNameInput');
const email = document.querySelector('#emailInput');
const message = document.querySelector('#messageInput');
const password = document.querySelector('#passwordInput');
const confirmPassword = document.querySelector('#confirmPassword');
const blogTitle = document.querySelector('#blogTitle');

const checkInput = (regEx, input) => {
  const nearestCorrectIcon = input.closest('.input-text');

  if (regEx.test(input.value) && input.value !== '') {
    nearestCorrectIcon.classList.add('correct');
    nearestCorrectIcon.classList.remove('notCorrect');
  } else if (!regEx.test(input.value) && input.value.length > 0) {
    nearestCorrectIcon.classList.add('notCorrect');
    nearestCorrectIcon.classList.remove('correct');
  } else {
    nearestCorrectIcon.classList.remove('correct');
    nearestCorrectIcon.classList.remove('notCorrect');
  }
};

const checkConfirmPassword = (regEx, input, password) => {
  const nearestCorrectIcon = input.closest('.input-text');

  if (regEx.test(input.value.trim()) && input.value === password) {
    nearestCorrectIcon.classList.add('correct');
    nearestCorrectIcon.classList.remove('notCorrect');
  } else if (input.value !== password && input.value.length > 0) {
    nearestCorrectIcon.classList.add('notCorrect');
    nearestCorrectIcon.classList.remove('correct');
  } else {
    nearestCorrectIcon.classList.remove('correct');
    nearestCorrectIcon.classList.remove('notCorrect');
  }
};

if (fullName) {
  fullName.addEventListener('input', (e) => {
    checkInput(regExPatterns.fullName, e.target);
  });
}

if (email) {
  email.addEventListener('input', (e) => {
    checkInput(regExPatterns.email, e.target);
  });
}

if (message) {
  message.addEventListener('input', (e) => {
    checkInput(regExPatterns.message, e.target);
  });
}

if (password) {
  password.addEventListener('input', (e) => {
    checkInput(regExPatterns.password, e.target);
  });
}

if (confirmPassword) {
  confirmPassword.addEventListener('input', (e) => {
    checkConfirmPassword(regExPatterns.password, e.target, password.value);
  });
}

if (blogTitle) {
  blogTitle.addEventListener('input', (e) => {
    checkInput(regExPatterns.blogTitle, e.target);
  });
}

export default checkInput;