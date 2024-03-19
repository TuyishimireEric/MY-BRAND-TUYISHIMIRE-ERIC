import {
  validateToken,
} from '../api/index.js';

const humberger = document.getElementById('humberger');
const extraMenu = document.querySelector('.extra-menu');
const navigation = document.querySelector('.navigation');
const loader = document.querySelector('.loader');
const userContainer = document.querySelector('#currentUser');
const userIcon = document.querySelector('#user');
const changeMode = document.querySelector('#changeMode');

userIcon.addEventListener('click', (e) => {
  e.preventDefault();
  const user = JSON.parse(localStorage.getItem('user')) || '';
  if (user) {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '../index.html';
  } else {
    window.location.href = './login.html';
  }
});

let blogId = '';
humberger.addEventListener('click', () => {
  extraMenu.classList.toggle('active');
  navigation.classList.toggle('active');
});

extraMenu.addEventListener('click', () => {
  extraMenu.classList.remove('active');
  navigation.classList.remove('active');
});

window.onload = async () => {
  document.getElementById('preLoader').style.display = 'none';
  const currentUrl = new URL(window.location.href);
  const searchParams = new URLSearchParams(currentUrl.search);
  blogId = searchParams.get('id');

  const token = JSON.parse(localStorage.getItem('token')) || '';
  if (token) {
    const validated = await validateToken();
    if (!validated.data) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    } else {
      const user = {
        userName: validated.data.userName,
        email: validated.data.email,
      };
      userContainer.innerHTML = 'Logout';

      localStorage.setItem('user', JSON.stringify(user));
      if (validated.data.role === 'admin') {
        changeMode.innerHTML = '<a href="./admin/dashboard.html" target="_blank">Dashboard</a>';
      }
    }
  }

};
